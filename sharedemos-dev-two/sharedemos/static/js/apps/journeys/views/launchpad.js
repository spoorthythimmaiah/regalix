/*global define*/
define(['underscore',
    'backbone',
    '../models/journeys',
    '../templates/launchpad.handlebars',
    'slick'
], function (_, Backbone, Journeys, Launchpad) {
    'use strict';


    var LaunchpadView = Backbone.View.extend({

        el: '#main_container',

        template: Launchpad,
        DEFAULT_LINK_ICON: `/static/images/${document.template}/journey/default_asset.jpg`,
        DEFAULT_HTML_ICON: `/static/images/${document.template}/journey/default_asset.jpg`,

        events: {
            'click .toggle-launch-pad-side-bar': () => {
                $('.launch-pad-player-wrapper').toggleClass('side-bar-open');
            },
            'click .journey-content p': 'changePage',
            'afterChange .journeys-holder': 'handleJourneyChange',
            'scroll .launch-page.active': 'launchPageScroll'
        },


        initialize(journeyId) {
            let journeys = new Journeys();
            this.journeySlug = journeyId;
            let initialSlide;
            let root = this;
            journeys.fetch({
                success(model, response) {
                    let journeyAvailable = response.some((journey,i) => {
                        initialSlide = i;
                        return journey.slug == root.journeySlug
                    });
                    if(!journeyAvailable){
                        window.location.href ='/';
                    }
                    _.each(response, journey => {
                        _.each(journey.assets, asset => {
                            if(!asset.thumbnail) {
                                asset.thumbnail = `${document.cdn_url + root.DEFAULT_LINK_ICON}`;
                                if(asset.first_slide == "html5") {
                                    asset.thumbnail = `${document.cdn_url + root.DEFAULT_HTML_ICON}`;
                                }
                            }
                        })
                    })
                    response.tenantLogo = root.$('#launch-pad-holder').data('logo');
                    root.$('#launch-pad-holder').html(root.template(response));
                    root.displayJourney();
                    root.$('.journeys-holder').slick({
                        prevArrow: $('.prev-launch-pad'),
                        nextArrow: $('.next-launch-pad'),
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        initialSlide: initialSlide
                    });
                }
            });
        },

        displayJourney() {
            this.$('.journey-content p, .launch-page.active, .next-chapter-pop, .side-bar-cta').removeClass('active');
            this.$('.launch-pad-title').html(this.$(`.journey-content[data-journey-slug=${this.journeySlug}]`).attr('data-journey-name'));
            this.$(`.journey-pages[data-journey-slug=${this.journeySlug}] .launch-page:nth-child(1)`).addClass('active');
            this.$(`.journey-content[data-journey-slug=${this.journeySlug}] p:nth-child(1)`).addClass('active');
            this.$(`.side-bar-cta[data-journey-slug=${this.journeySlug}]`).addClass('active');
        },

        changePage(e) {
            let root = this;
            let chapter = this.$(e.currentTarget).attr('data-chapter');
            root.$('.journey-content p, .launch-page.active, .next-chapter-pop').removeClass('active');
            root.$(`.journey-pages[data-journey-slug=${root.journeySlug}] .launch-page[data-chapter=${chapter}], .journey-content[data-journey-slug=${root.journeySlug}] p[data-chapter=${chapter}]`).addClass('active');
        },

        handleJourneyChange() {
            let root = this;
            root.journeySlug = root.$('.journey-content.slick-current').attr('data-journey-slug');
            Backbone.history.navigate(root.journeySlug, { replace : true } );
            root.displayJourney();
        },

        launchPageScroll(e) {
            let page = this.$(e.currentTarget);
            if (page.scrollTop() + page.innerHeight() >= page[0].scrollHeight) {
                page.find('.next-chapter-pop').addClass('active');
            } else {
                page.find('.next-chapter-pop').removeClass('active');
            }
        }
    });

    return LaunchpadView
});
