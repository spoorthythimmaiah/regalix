import Backbone from 'backbone';
import _ from 'underscore';
import Moment from 'moment';
import ReportApi from '../models/reports.js';
import ParticipantQuestionPopup from '../templates/reports/participant_question.handlebars';
import QuestionPopup from '../templates/reports/question_popup.handlebars';
import HomeTemplate from '../templates/reports/home.handlebars'
import ParticipantsTemplate from '../templates/reports/participants.handlebars'
import QuizReportTemplate from '../templates/reports/quiz.handlebars'

class ReportView extends Backbone.View{

    el() { return '#reports-block'}
 
    events() {
        return {
            'click [data-quiz-id]': 'selectQuiz',
            'click .back-to-report': 'renderHomePage',
            'click .close-question-popup': () => {
                this.$('.popup-overlay').removeClass('active')
            },
            'click .question-data-list .question-block a': () => {
                this.$('.popup-overlay').addClass('active').html(QuestionPopup())
            },
            'click .participants-info [data-sort-by]': 'sortParticipants',
            'click .dd-menu li': 'applyFilters'
        }
    }

    initialize() {
        let fromDateElem = this.$('#from-date'), toDateElem = this.$('#to-date');
        let root = this;
        fromDateElem.datepicker({
            language: 'en',
            dateFormat: "yyyy-mm-dd",
            maxDate: new Date(),
            autoClose: true,
            clearButton: true,
            onSelect: function(selectedDate, date){
                toDateElem.data('datepicker').update('minDate', date);
                if(root.quiz_id){
                    root.renderQuizReport();
                }else{
                    root.renderHomePage();
                }
            },
        });
        toDateElem.datepicker({
            language: 'en',
            dateFormat: "yyyy-mm-dd",
            maxDate: new Date(),
            autoClose: true,
            clearButton: true,
            onSelect: function(selectedDate, date){
                fromDateElem.data('datepicker').update('maxDate', date || new Date());
                if(root.quiz_id){
                    root.renderQuizReport();
                }else{
                    root.renderHomePage();
                }
            }
        });
        this.applyFilters();
    }

    getFilters() {
        let {attr: dateRange, title: dateTitle} = this.$('.dd-menu li.active')[0].dataset;
        let fromDate = Moment().startOf('day'), toDate = Moment().endOf('day');
        switch (dateRange){
            case 'yesterday':
                fromDate = fromDate.subtract(1, "days");
                toDate = toDate.subtract(1, "days");
                break;
            case 'week':
                fromDate = fromDate.subtract(1, "week");
                break;
            case 'month':
                fromDate = fromDate.subtract(1, "months");
                break;
            case 'quarter':
                fromDate = fromDate.subtract(3, "months");
                break;
            case 'half-year':
                fromDate = fromDate.subtract(6, "months");
                break;
            case 'year':
                fromDate = fromDate.subtract(1, "year");
                break;
            case 'custom':
                fromDate = this.$('#from-date').data('datepicker').lastSelectedDate;
                if(fromDate){
                    fromDate = Moment(fromDate).startOf('day')
                }
                toDate = this.$('#to-date').data('datepicker').lastSelectedDate;
                if(toDate){
                    toDate = Moment(toDate).endOf('day');
                }
                break;
        }

        let dates = {}
        if (fromDate){
            _.extend(dates, {from_date: fromDate.toISOString()})
        }
        if (toDate){
            _.extend(dates, {to_date: toDate.toISOString()})
        }

        return dates
    }

    renderHomePage() {
        this.quiz_id = null;
        const filters = this.getFilters();
        const report = new ReportApi();
        report.fetch({
            data: filters
        }).done(response => {
            this.$('.report-container').html(HomeTemplate(response.result));
            this.$('[data-toggle="popover"]').popover({html: true});
        })
        this.$('.back-to-report').hide();
    }

    renderQuizReport() {
        let attrs = this.getFilters();
        _.extend(attrs, {quiz_id: this.quiz_id})
        const report = new ReportApi();
        this.$('.back-to-report').show();
        report.fetch({
            data: attrs
        }).done(response => {
            this.$('.report-container').html(QuizReportTemplate(response.result));
            this.total_score = response.result.total_score;
            this.users = response.result.user.list;
            this.questions = response.result.question.list;
            this.renderParticipants();
        })
    }

    renderParticipants() {
        if(!this.sortBy) this.sortBy = "created_at";
        if(this.sortOrder === undefined) this.sortOrder = 1;
        this.$('.participants-info').html(ParticipantsTemplate({
            "users": this.users,
            "questions": this.questions,
            "total_score": this.total_score
        }));
        this.$('[data-toggle="popover"]').popover({html: true});
        this.$('.participants-data-list [sort-order]')
        .removeClass("arrow-down arrow-up")
        .addClass("arrow-down");
        this.$('.participants-data-list [data-sort-by=' + this.sortBy + '] [sort-order]')
        .removeClass("arrow-down arrow-up")
        .addClass(this.sortOrder ? "arrow-down" : "arrow-up");
    }

    selectQuiz(event) {
        this.quiz_id = event.currentTarget.dataset.quizId;
        this.renderQuizReport();
    }

    sortParticipants(event) {
        let sortBy = event.currentTarget.dataset.sortBy;
        if(this.sortBy !== sortBy){
            this.sortBy = sortBy;
            this.sortOrder = 0;
        }else{
            this.sortOrder = this.sortOrder == 0 ? 1 : 0;
        }

        this.users = _.sortBy(this.users, this.sortBy);
        if(this.sortOrder) this.users = this.users.reverse();
        this.renderParticipants();
    }

    applyFilters(event){
        let selectedDate = (event && event.currentTarget && event.currentTarget.dataset) || this.$('.dd-menu li.active')[0].dataset;
        let {attr:dateRange, title:dateTitle} = selectedDate;
        this.$('.time-interval-dd .interval').html(dateTitle);
        this.$('#metrics li').removeClass('active');
        this.$(".time-interval-dd [data-attr]").removeClass("active");
        this.$(".time-interval-dd [data-attr=" + dateRange + "]").addClass('active');
        this.dateRange = dateRange;
        if(this.dateRange === "custom"){
            this.$('.custome-date').show()
        }else{
            this.$('#from-date, #to-date').data('datepicker').clear();
            this.$('.custome-date').hide();
            if(this.quiz_id){
                this.renderQuizReport();
            }else{
                this.renderHomePage();
            }
        }
    }

};

export default ReportView;
