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
    var report_api_url, filter_by;

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
            if(report_api_url){
                var filter_args = report_api_url.split('?')
                if(filter_args.length > 1){
                    filter_by = filter_args[1].split('=')[1];
                }
            }
            report_api_url = '/api/reports/demo/' + $(current_ele).attr('product') + '/' + $(current_ele).attr('section') + '/' + $(current_ele).attr('walkthrough')

            if(date_range != 'week'){
                report_api_url += '/' + date_range
                if(date_range == 'custom'){
                    report_api_url += '/' + from_date + '/' + to_date
                }
            }
            if(filter_by){
                report_api_url += '?filter_by=' + filter_by;
            }

            $.ajax({
                type: 'GET',
                async: true,
                url: report_api_url,
                dataType: 'json',
                success: function(data){
                    var tooltip_text, curIndex = methods.gallery.getCurrentIndex($selector);
                    methods.plotFunnel(data.funnel_data);
                    if(filter_by && filter_by == 'completion_rate'){
                        tooltip_text = 'Completion Rate'
                    }else{
                        tooltip_text = 'Visitors'
                    }
                    methods.plotTimeline(data.timeline_data, tooltip_text);
                    methods.handleOverlay()
                    $("#modal_data h1").text(data.walkthrough);
                    $("#modal_data p").text(data.product + ' > ' + data.section + ' > ' + data.walkthrough);
                    $("#modal_data .demos_cnt span").text(data.percentage_contribution);
                    modal.show();
                }
            });
        },
        plotFunnel: function(funnel_data) {
            $('#funnel_container').highcharts({
                chart: {
                    type: 'funnel',
                    marginRight: 100
                },
                title: {
                    text: 'Drop-off Funnel',
                    x: -50
                },
                plotOptions: {
                    funnel: {
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y}</b>',
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        },
                        neckWidth: '30%',
                        neckHeight: '25%',
                        tooltip: {
                            pointFormat: 'Visitors : <b>{point.y}</b>'
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'Num. of users dropped',
                    data: funnel_data
                }]
            });
        },
        plotTimeline: function(timeline_data, tooltip_text) {
            $('#demo_report_container').highcharts({
                title: {
                    text: ''
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0,
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        tooltip: {
                            pointFormat: tooltip_text + ' : <b>{point.y}</b>'
                        },
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },

                series: [{
                    type: 'area',
                    data: timeline_data
                }]
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
        	$(".report-demos").append(overlay);
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
                var curIndex = methods.gallery.getCurrentIndex($selector);
                var total = $(settings.selector).length;
                
                if(total == 1 || curIndex - 1 < 0) return;
                
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
                var curIndex = methods.gallery.getCurrentIndex($selector);
                var total = $(settings.selector).length;
                
                if(total == 1 || page_limit == curIndex + 1) return;
                
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
    $('#modal_data .time-interval-dd .dd-menu li').on('click', function(e) {
            if(!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            }
            var tooltip_text, filter_by = $(this).attr('value');
            $(this).parents('.time-interval-dd').children('span').attr('value', filter_by).text($(this).text());
            report_api_url = report_api_url.split('?')[0] + '?filter_by=' + filter_by;
            if(filter_by == 'completion_rate'){
                tooltip_text = 'Completion Rate'
            }else{
                tooltip_text = 'Visitors'
            }
            $.ajax({
                type: 'GET',
                async: true,
                url: report_api_url,
                dataType: 'json',
                success: function(data){
                    methods.plotTimeline(data.timeline_data, tooltip_text);
                }
            });
    });
})(jQuery);