// global require

import Backbone from 'backbone';

const mainView = Backbone.View.extend({

    el: '#content-section',
    
    events: {
        'click .toggle-side-bar, .toggle-icon': 'toggleSidemenu',
        "click .slide": 'showContentPopup',
        "click .close-slide": 'closeContentPopup',
        "click .next-content, .previous-content": 'moveSliderContent',
    },
    
    toggleSidemenu() {
        if(this.$(".left-side-panel").is(":visible")){
            this.$('.left-side-panel').hide();
            this.$('.toggle-side-bar').removeClass('toggle-icon');
        } else{
            this.$('.left-side-panel').show();
            this.$('.toggle-side-bar').addClass('toggle-icon');
            this.$('.right-side-panel').addClass('toggle');
        }
    },

    showContentPopup(event){
        this.$('.previous-content').hide();
        this.$('.overlay').addClass('popup-active');
        if(this.$(event.currentTarget).hasClass('latest-content')){
            this.$('.latest.content-stack').addClass('active')
            this.$('.featured.content-stack').removeClass('active');
        }else{
            this.$('.latest.content-stack').removeClass('active');
            this.$('.featured.content-stack').addClass('active');
        }
        this.updateContentSlide()
    },

    updateContentSlide(slideNo = 1){
        this.$('.progress-line.active').addClass('visited');   
        this.$('.content-stack:visible .progress-line, .content-stack:visible .content-item').removeClass('active');
        this.$(`.content-stack.active .content-item[data-slide=${slideNo}], .content-stack.active .progress-line[data-slide=${slideNo}]`).addClass('active');
        let totalSlides = this.$('.content-stack.active .content-slider > .content-item').length;
        this.setPopupSlideNav(slideNo, totalSlides);
        this.popupTimer = setTimeout(() => {
            if(slideNo == totalSlides){
                this.closeContentPopup();
                return;
            }       
            this.updateContentSlide(slideNo += 1);
        }, 10000)
    },

    closeContentPopup(){
        clearTimeout(this.popupTimer);
        this.$('.overlay').removeClass('popup-active');
        this.$('.content-item, .progress-line').removeClass('active');
        this.$('.progress-line').removeClass('visited');
        this.$('.next-content').show();
    },

    moveSliderContent(event){
        clearTimeout(this.popupTimer);
        let currentSlideno = parseInt(this.$('.content-item.active').data('slide'));
        if(this.$(event.currentTarget).hasClass('next-content')){
            currentSlideno += 1;
        }
        if(this.$(event.currentTarget).hasClass('previous-content')) {
            currentSlideno -= 1;
            this.$('.content-stack.active .progress-line').removeClass('active');
            this.$(`.content-stack.active .progress-line[data-slide=${currentSlideno}]`).removeClass('visited');
        }        
        this.updateContentSlide(currentSlideno);
    },

    setPopupSlideNav(slideNo, totalSlides){
        this.$('.previous-content, .next-content').show();
        if(slideNo == 1) {
            this.$('.previous-content').hide();
        }
        if(slideNo  == totalSlides) {
            this.$('.next-content').hide();
        }
    }
});

export default mainView;
