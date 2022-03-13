/* global define */
define(['underscore',
        'jquery',
        'backbone',
        '../templates/data_slider_navbar.handlebars',
        '../templates/data_slider.handlebars',
        'slick'
    ], 

function(_, $, Backbone, sliderNavBar, sliderTemplate){

    var sliderView = Backbone.View.extend({

        el: '#data-slider',

        navbarTemplate: sliderNavBar,
        template: sliderTemplate,
        DEFAULT_AUDIO_ICON: '/static/images/thumb-audio.png',
        DEFAULT_CHAPTER_ICON: '/static/images/default_chapter_icon.jpg',
        DEFAULT_EXTERNAL_LINK_ICON: '/static/images/thumb-external.jpg',
        DEFAULT_FILE_ICON: '/static/images/dell/thumb-file.jpg',
        DEFAULT_LINKED_ASSET_ICON: '/static/images/thumb-pdf.jpg',
        DEFAULT_LINK_ICON: '/static/images/author/thumb-link.jpg',
        DEFAULT_IFRAME_ICON:'/static/images/author/thumb-iframe.jpg',
        DEFAULT_SECTION_ICON: '/static/images/dell/default-thumbnail.jpg',

        SLIDER_DATA_MAP: {
            'featured': document.featuredChapters,
            'recent': document.recentChapters,
            'trending': document.trendingChapters
        },
        SLIDER_OPTIONS: {
            'featured': 'featured',
            'recent': 'recently added',
            'trending': 'trending'
        },

        events: {
            "click .slider-content-type": 'toggleOptions',
            "click .slider-type-options li": 'selectOption'
        },

        initialize() {
            if(this.SLIDER_DATA_MAP['featured'].length ||
               this.SLIDER_DATA_MAP['recent'].length || 
               this.SLIDER_DATA_MAP['trending'].length){
                    this.render();
               }
        },
        render: function() {
            this.$el.find('#data-slider-navbar').html(this.navbarTemplate);
            let chapters = [];
            let selectedOption = 'featured';

            if (this.SLIDER_DATA_MAP['featured'].length){
                chapters = this.SLIDER_DATA_MAP['featured'];
            }else if(this.SLIDER_DATA_MAP['recent'].length){
                chapters = this.SLIDER_DATA_MAP['recent'];
                selectedOption = 'recent';   
            }else if(this.SLIDER_DATA_MAP['trending'].length){
                chapters = this.SLIDER_DATA_MAP['trending'];
                selectedOption = 'trending';
            }
            this.renderSlider(selectedOption);
            return this;
        },
        initSlider(chapters) {
            _.each(chapters, (chapter) => {
                let image_src = chapter.image_src;
                let link_type = chapter.link_type;
                if (link_type === 'external') {
                    image_src = this.DEFAULT_EXTERNAL_LINK_ICON;
                }else if(link_type === 'internal' && chapter.is_linked_asset && !image_src) {
                    image_src = this.DEFAULT_LINKED_ASSET_ICON;
                }else if(!image_src) {
                    switch(true){
                        case chapter.slide_type == 'asset':
                            image_src = this.DEFAULT_LINKED_ASSET_ICON;
                            break;
                        case chapter.slide_type == 'audio':
                            image_src = this.DEFAULT_AUDIO_ICON;
                            break;
                        case chapter.slide_type == 'file':
                            image_src = this.DEFAULT_FILE_ICON;
                            break;
                        case chapter.slide_type == 'link' || chapter.slide_type == 'embed':
                            image_src = this.DEFAULT_LINK_ICON;
                            break;
                        case chapter.slide_type == 'iframe' || chapter.slide_type == 'html5':
                            image_src = this.DEFAULT_IFRAME_ICON;
                            break;
                        case chapter.slide_type == 'section':
                            image_src = this.DEFAULT_SECTION_ICON;
                            break;
                        default:
                            image_src = this.DEFAULT_CHAPTER_ICON;
                    }
                }
                chapter.image_src = image_src;
            });
            this.$el.find('#data-slider-content').html(this.template({chapters: chapters}));

            var root = this;
            this.$el.find('.slider-content').slick({
                infinite: false,
                appendArrows: root.$el.find('.slider-nav'),
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: false,
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]
            });                 
        },

        renderSlider: function(selectedOption){
            this.$el.find('.slider-type-options li').removeClass('active-slider-type');
            this.$el.find(`.slider-type-options li[data-value=${selectedOption}]`).addClass('active-slider-type');
            this.$el.find('.selected-slider-type').html(this.SLIDER_OPTIONS[selectedOption]);
            this.initSlider(this.SLIDER_DATA_MAP[selectedOption]);
        },

        selectOption: function(e){
            let selectedOption = this.$(e.currentTarget).data('value');
            this.renderSlider(selectedOption);
        },
        toggleOptions: function(e) {
          let filterElem = this.$el.find('.slider-content-type');
          (!filterElem.hasClass('active')) ? filterElem.addClass('active') : filterElem.removeClass('active')
        }

    });

    return sliderView;

})