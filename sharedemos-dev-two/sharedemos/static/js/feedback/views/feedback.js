/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../models/feedback-reports',
        '../models/feedback',
        '../templates/main.handlebars',
        '../templates/feedback-categories.handlebars',
        '../templates/breadcrumb.handlebars',
        '../templates/feedbacks.handlebars',
        '../../helpers/handlebars/i18n'
], function (_, $, Backbone, FeedbackReports, Feedback, Template, FeedbackCategories, Breadcrumb, FeedbacksTemplate, Translate) {
    'use strict';

    var FeedbackView = Backbone.View.extend({

        el: '#feedback_wrap',
        DATA : {},

        events: {
            'click .dd-menu li, .breadcrumb .home-page': 'filterRatings',
            'click [load-ratings]':'loadRatings',
            'click .feedback-wrap .chapter-link': 'loadChapterRatings',
            'click .page-item': 'loadRatingsByPage',
            'click .feedback-sorting-wrap div': 'sortFeedback',
        },

        initialize: function () {
            var fromDateElem = this.$('#from-date'), toDateElem = this.$('#to-date');
            fromDateElem.datepicker({
                language: 'en',
                dateFormat: "yyyy-mm-dd",
                maxDate: new Date(),
                autoClose: true,
                clearButton: true,
                onSelect: (selectedDate, date) => {
                    var toDate = toDateElem.val();
                    toDateElem.datepicker().data('datepicker').update('minDate', date);
                    if(selectedDate && toDate){
                        this.loadFeedback({
                            'date_range' : 'custom',
                            'from_date' : selectedDate,
                            'to_date' : toDate,
                            'category_id' : this.$('#categories li.active').attr('data-attr')
                        })
                    }
                },
            });

            toDateElem.datepicker({
                language: 'en',
                dateFormat: "yyyy-mm-dd",
                maxDate: new Date(),
                autoClose: true,
                clearButton: true,
                onSelect: (selectedDate, date) => {
                    var fromDate = fromDateElem.val();
                    fromDateElem.datepicker().data('datepicker').update('maxDate', date || new Date());
                    if(selectedDate && fromDate){
                        this.loadFeedback({
                            'date_range' : 'custom',
                            'from_date' : fromDate,
                            'to_date' : selectedDate,
                            'category_id' : this.$('#categories li.active').attr('data-attr')
                        })   
                    }
                }
            });

            this.render();
        },

        render: function () {
            this.loadFeedback({
                date_range: 'week',
                category_id: 'all'
            });
        },

        filterRatings: function(event){
            var date_range = this.$(".time-interval-dd .interval").attr("data-attr");
            var category_id = 'all';

            if(event.currentTarget.parentElement.id == 'metrics'){
                date_range = event.currentTarget.getAttribute('data-attr');
                this.$('#metrics li').removeClass('active');
                this.$(event.currentTarget).addClass('active');
                this.$('.time-interval-dd .interval').attr('data-attr', date_range).html(event.currentTarget.getAttribute('data-title'));
                if(date_range == 'custom'){
                    this.$('.custome-date').show();
                    return false;
                } else {
                    this.$('.custome-date').hide();
                }
                
                this.$('#from-date').data('datepicker').clear();
                this.$('#to-date').data('datepicker').clear();
                category_id = this.$('#categories li.active').attr('product_id');
                
                this.$('#metrics li').removeClass('active');
                this.$(event.currentTarget).addClass('active');
            }else if(event.currentTarget.parentElement.id == 'categories'){
                category_id = event.currentTarget.getAttribute('product_id');
                if(category_id) this.$(".breadcrumb").attr("product_id", parseInt(category_id));
                date_range = this.$('#metrics li.active').attr('data-attr');
                if(category_id == 'all'){
                    this.$('.category-dd .category').html('All Categories');
                }else{
                    this.$('.category-dd .category').html(event.currentTarget.textContent);
                }
                this.$('#categories li').removeClass('active');
                this.$(event.currentTarget).addClass('active');
            }
            let attrs = {
                'date_range': date_range,
                'category_id': category_id || "all"
            }
            if(date_range == 'custom'){
                var from_date = this.$('#from-date').datepicker().data('datepicker');
                var to_date = this.$('#to-date').datepicker().data('datepicker');
                if(from_date.selectedDates.length && to_date.selectedDates.length){
                    attrs['from_date'] = this.$('#from-date').val()
                    attrs['to_date'] = this.$('#to-date').val()
                    this.loadFeedback(attrs)
                }
            }else{
                if (event.currentTarget.id == 'home-page') {
                    this.$('#categories li').removeClass('active');
                    this.$('.category-dd span.category').text('All Categories');
                    this.$('[data-attr=all]').addClass('active');
                }
               this.loadFeedback(attrs)
            }
        },

        loadFeedback: function(data){
            var feedbackReports = new FeedbackReports();
            this.$('.feedback-search-wrap').addClass('loading');
            feedbackReports.fetch({data: data}).done((response) => {
                this.$('.feedback-list-wrap').empty();
                this.$('.breadcrumb').html(Breadcrumb(response));
                this.$('.feedback-cards-wrap').html(Template(response));
                this.$('.feedback-search-result-wrap').html(FeedbackCategories(response));
                this.$('.feedback-search-wrap').removeClass('loading');
            }).fail( (response) =>{
                console.log('Loading numbers data failed...');
            });            
        },

        loadRatings: function(event){   
            let data = {};
            let {sectionId, productId, chapterId} = event.currentTarget.dataset;
            var targetElement = this.$(event.currentTarget);
            var date_range = this.$('.interval').attr('data-attr');
            data.page = 1;
            data.star_filtering = data.date_filtering ="descending";
            data.date_filtering = "descending";
            data.section_id = sectionId;
            data.product_id = productId;
            data.chapter_id = chapterId;

            if (date_range == "custom") {
                let from_date = this.$('#from-date').datepicker().data('datepicker');
                let to_date = this.$('#to-date').datepicker().data('datepicker');
                if(from_date.selectedDates.length && to_date.selectedDates.length){
                    data.from_date = this.$('#from-date').val()
                    data.to_date = this.$('#to-date').val()
               } else {
                    data.date_range = "week"
               }
            } else {
                data.date_range =  date_range;
            }
            this.DATA = data;
            this.renderRatings(data);           
        },

        loadChapterRatings: function(event){
            this.DATA.chapter_id = parseInt(this.$(event.currentTarget).attr("chapter_id"));
            // reset page no to 1 while for new chapter ratings loading.
            this.DATA.page = 1;
            this.renderRatings(this.DATA);
        },

        loadRatingsByPage: function(event){
            this.DATA.page = parseInt(this.$(event.currentTarget).attr("data-page"));
            this.renderRatings(this.DATA);
        },

        sortFeedback: function(event){
            var arrow = this.$(event.currentTarget);
            var dataSorting = arrow.attr('data-sorting');
            this.$('.feedback-sorting-wrap div').removeClass('active');
            if(arrow.hasClass('up')){
                arrow.removeClass('up').addClass('down active');
                dataSorting =="rating" ? this.DATA.star_filtering = "descending" : this.DATA.date_filtering = "descending";
            } else {
                arrow.removeClass('down').addClass('up active');
                dataSorting =="rating" ? this.DATA.star_filtering = "ascending" : this.DATA.date_filtering = "ascending";            
            }
            this.renderRatings(this.DATA);
        },

        renderRatings: function(data){
            let feedback = new Feedback();
            this.$('.feedback-search-wrap').addClass('loading');
            feedback.fetch({data: data}).done((response) => {
                this.$('.breadcrumb').html(Breadcrumb(response));
                if(response.is_leaf_node){
                    response.pagination = this.buildPagination(response.page, response.total_rating);
                    this.$('.feedback-search-result-wrap').empty();;
                    this.$('.feedback-list-wrap').html(FeedbacksTemplate(response));
                    this.setSortingArrows();
                } else {
                    this.$('.feedback-list-wrap').empty();
                    this.$('.feedback-search-result-wrap').html(FeedbackCategories(response));
                }
                this.$('.feedback-search-wrap').removeClass('loading');
            }).fail((response) => {
              console.log("Feedbacks loading failed..");
            })
        },

        buildPagination: function(pageNo, totalRatings){
            var pagination = {
                is_paginated : true
            };
            var noOfPages = parseInt(totalRatings/10);
            if(noOfPages == 0){
                pagination.is_paginated = false;
            } else if(noOfPages != 0 && totalRatings%10 > 0){
                noOfPages += 1 ;
            }
            if (pageNo == 1) {
                pagination.prevDisable = true ;
            } else if(pageNo == noOfPages){
                pagination.nextDisable = true ;
            };
            pagination.pagePrev = pageNo - 1;
            pagination.pageNext = pageNo + 1;
            let startPageNo, endPageNo;
            if(noOfPages <= 10){
                startPageNo = 1;
                endPageNo = noOfPages;
            } else {
                if (pageNo <= 4) {
                    startPageNo = 1;
                    endPageNo = 10;
                } else {
                    if (pageNo + 5 >= noOfPages) {
                        startPageNo = noOfPages - 9;
                        endPageNo = noOfPages;
                    } else {
                        startPageNo = pageNo - 4;
                        endPageNo = pageNo + 5;
                    }
                }
            }
            pagination.pages = [];
            for (var i = startPageNo; i <= endPageNo; i++) {
                var page = {
                     "pageNo": i
                }
                if (i == pageNo) {
                    page.currentPage = true;
                };
                pagination["pages"].push(page);
            };
            return pagination;
        },

        setSortingArrows: function(){  
            this.DATA.star_filtering == "ascending" ? this.$('.sort-by-ratings').addClass('up') : this.$('.sort-by-ratings').addClass('down');
            this.DATA.date_filtering == "ascending" ? this.$('.sort-by-date').addClass('up') : this.$('.sort-by-date').addClass('down');
        },

    });

    return FeedbackView;
});
