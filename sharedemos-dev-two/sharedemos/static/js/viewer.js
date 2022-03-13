/* Metrics popup */
(function($){

    var settings = {
        type: "img",
        onClick: "",
        onClose: "",
        gallery: true
    };

    var modal = $('#popup-modal');
    var modalContent = $('#modal_data');
    
    var overlay = $("<div class='modal_overlay'>");

    var arrowsContainer = $('#arrows-container');
    var arrowLeft = $('#arrow-left');
    var arrowRight = $('#arrow-right');
    var report_api_url;

    var $selector;

    var methods = {
        init: function ($event)
        {
            $event.preventDefault();
            $selector = $(this);
            if(typeof settings.onClick == 'function')
            {
                settings.onClick.call($selector);
            }
            if(settings.gallery)
            {
                methods.addArrows($event);
            } 
            methods.addModal($event.currentTarget);
            $("body").on("keyup", $event.data, methods.handleKey);
            $('#close_modal').on('click',function() {
                methods.removePopup();
            })
        },
        /**
         * Add the modal to the page
         */
        addModal: function(current_ele)
        {
            report_api_url = '/api/reports/viewer-activity/' + $(current_ele).attr('uuid') + '/' + category_slug;

            if(date_range != 'week'){
                report_api_url += '/' + date_range
                if(date_range == 'custom'){
                    report_api_url += '/' + from_date + '/' + to_date
                }
            }

            $.ajax({
                type: 'GET',
                async: true,
                url: report_api_url,
                dataType: 'json',
                success: function(data){
                    $(".viewer_activity").contents().filter(function(){
                            return !$(this).is('#close_modal');
                    }).remove();
                    var tooltip_text, curIndex = methods.gallery.getCurrentIndex($selector);
                    methods.handleOverlay();
                    var content_thumbnails = {};
                    if(data.length){

                        userLocation = '';
                        if(data[0].city || data[0].state || data[0].country){
                            if(data[0].city){
                                userLocation += data[0].city + ', '
                            }
                            if(data[0].state){
                                userLocation += data[0].state + ', '
                            }
                            if(data[0].country){
                                userLocation += data[0].country;
                            }
                        }

                        var userElement =   '<div class="activity_block join">' +
                                                '<div class="description"><span>'+ data[0].first_name +' '+ data[0].last_name+ ' </span> joins your site as viewer.</div>' +
                                                '<div class="country">'+userLocation+'</div>'+
                                                '<div class="date">'+ dateFormat(data[0].user_created_at) +'</div>' +
                                        '</div>';

                        visit_elements = '';
                        for(var i=0; i < data.length; i++){
                            if(data[i].section){
                                visit_elements +=   '<div class="activity_block vertical_line"></div>' + 
                                                    '<div class="activity_block visit">' +
                                                        '<div class="description"><span>'+ data[i].section +'</span> is visited.</div>' +
                                                        '<div class="date">'+dateFormat(data[i].created_at)+'</div>' +
                                                    '</div>';
                            } else {
                                var defaultImage = "/static/images/video-thumb.jpg";
                                if(data[i].first_slide_content){
                                    document.footer_text = data[i].tenant_footer_text
                                    document.footer_image = data[i].tenant_footer_image
                                    content_thumbnails[i] = data[i].first_slide_content
                                } else if(data[i].first_slide_image || defaultImage){
                                    defaultImage = data[i].first_slide_image || defaultImage;
                                } if(data[i].walkthrough){
                                    visit_elements +=   '<div class="activity_block vertical_line"></div>' +
                                                        '<div class="activity_block visit">' +
                                                            '<img id=img_'+i+' src='+ defaultImage +'>' +
                                                            '<div class="description">The demo <span>'+data[i].walkthrough+'</span> is consumed.</div>' +
                                                            '<div class="completion">'+data[i].completion_rate +'% COMPLETION</div>' +
                                                            '<div class="date">'+dateFormat(data[i].created_at)+'</div>' +
                                                        '</div>';
                                }
                            }
                        }
                    $('.viewer_activity').append(userElement + visit_elements);
                   }
                    modal.show();
                    $.each(content_thumbnails, function(key, value) {
                        $('#img_'+key).attr('src', '/static/media/' + value);     
                    });
                }
            });
        },

        /**
         * Handle the action based on the overlay
         *
         * @param $event
         */
        handleOverlay: function($event)
        {
            methods.addOverlay($event);
        },
        /**
         * Add an overlay to the page
         *
         * @param $event
         */
        addOverlay: function($event)
        {
            $(".report-viewer").append(overlay);
        },
        /**
         * Add the arrows container with the arrows in the modal container
         * Also add the listeners
         * @param $event
         */
        addArrows: function($event)
        {
            arrowLeft.unbind().on("click", $event.data, methods.gallery.previous);
            arrowRight.unbind().on("click", $event.data, methods.gallery.next);
            modal.append(arrowsContainer.append(arrowLeft).append(arrowRight));
        },
        /**
         * Methods for the galelry
         */
        gallery: { 
            /**
             * Get the current gallery index
             *
             * @param selector
             * @returns {number}
             */
            getCurrentIndex: function(selector)
            {
                var currentIndex = 0;
                if(settings.gallery)
                {
                    currentIndex = selector.data("popup-index");
                }
                return currentIndex;
            },
            /**
             * Handling the previous gallery item
             *
             * @param $event
             */
            previous: function($event)
            {
                var settings = $event.data;
                console.log(settings)
                var curIndex = methods.gallery.getCurrentIndex($selector);
                var total = $(settings.selector).length;
                
                // if(total == 1 || curIndex - 1 < 0) return;
                
                curIndex = curIndex == 0 ? total - 1 : curIndex - 1;
                $selector = $(settings.selector + "[data-popup-index=" + curIndex + "]");

                if(settings.type == "img") methods.addModal($selector);
            },
            /**
             * Handling the next gallery item
             *
             * @param $event
             */
            next: function($event)
            {
                var settings = $event.data;
                console.log(settings)
                var curIndex = methods.gallery.getCurrentIndex($selector);
                var total = $(settings.selector).length;
                
                // if(total == 1 || page_limit == curIndex + 1) return;
                
                curIndex = curIndex == total - 1 ? 0 : curIndex + 1;
                $selector = $(settings.selector + "[data-popup-index=" + curIndex + "]");

                if(settings.type == "img") methods.addModal($selector);
            }
        },
        /**
         * Handle keyboard actions
         *
         * @param $event
         */
        handleKey: function($event)
        {
            var settings = $event.data;
            
            if($event.keyCode == 27) // ESC
            {
                methods.removePopup($event);
            }
            
            if($event.keyCode == 37 && settings.gallery) // LEFT
            {
                methods.gallery.previous($event);
            }
            
            if($event.keyCode == 39 && settings.gallery) // RIGHT
            {
                methods.gallery.next($event); 
            }
        },
        /**
         * Remove the popup and arrows
         * @param $event
         * @returns {boolean}
         */
        removePopup: function($event)
        { 
            // Remove the added elements
            overlay.detach();
            $(".viewer_activity").contents().filter(function(){
                return !$(this).is('#close_modal');
            }).remove();
            modal.hide();
        }
    };

    $.fn.jPop = function (options)
    {
        //Override settings with given options
        if (options) {
            settings = $.extend(settings, options);
        }
        var newSettings = {
            selector: this.selector
        };
        $.extend(newSettings, settings);

        var index = 0;
        this.each(function() {
            $(this).on("click", newSettings, methods.init);
            if(newSettings.gallery)
            {
                $(this).attr("data-popup-index", index++);
            }
        });
        
        //Return this for chaining
        return this;
    }
})(jQuery);