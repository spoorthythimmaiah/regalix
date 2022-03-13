/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../models/reports',
        '../templates/site_traffic.handlebars',
        '../templates/trending_chapters.handlebars',
        '../templates/referrals.handlebars',
        '../templates/geography.handlebars'
], function (_, $, Backbone,
             ReportsApi,
             SiteTrafficTemplate,
             TrendingChaptersTemplate,
             ReferralsTemplate,
             GeographyTemplate) {
    'use strict';

    var ReportsView = Backbone.View.extend({

        el: '#library_reports',

        events: {
            'click .dd-menu li': 'filterReports',
            'click .load_more_reports': 'loadMore',
            'click .sort': 'sortPopularChapters'
        },

        initialize: function(){
            this.utcoffset = document.offset;
            this.initDates();
            this.render();
        },

        initDates: function(){
            var root = this;
            this.$('#from-date').datepicker({
                language: 'en',
                dateFormat: "yyyy-mm-dd",
                minDate: new Date(document.tenant_created_at),
                maxDate: new Date(),
                autoClose: true,
                clearButton: true,
                onSelect: function(selectedDate, date){
                    var toDate = root.$('#to-date').val();
                    if(date){
                        root.$('#to-date').datepicker().data('datepicker').update('minDate', date);
                    }
                    if(selectedDate && toDate){
                        var attrs = {
                            'date_range' : 'custom',
                            'start_date' : selectedDate,
                            'end_date' : toDate,
                            'offset': root.utcoffset
                        }
                        let product_id = root.$('#categories li.active').attr('data-attr');
                        if(product_id !== '0'){
                            attrs['product_id'] = product_id;
                        }
                        root.loadReports(attrs);
                    }
                },
            });
            this.$('#to-date').datepicker({
                language: 'en',
                dateFormat: "yyyy-mm-dd",
                minDate: new Date(document.tenant_created_at),
                maxDate: new Date(),
                autoClose: true,
                clearButton: true,
                onSelect: function(selectedDate, date){
                    var fromDate = root.$('#from-date').val();
                    root.$('#from-date').datepicker().data('datepicker').update('maxDate', date || new Date());
                    if(selectedDate && fromDate){
                        var attrs = {
                            'date_range' : 'custom',
                            'start_date' : fromDate,
                            'end_date' : selectedDate,
                            'offset': root.utcoffset
                        }
                        let product_id = root.$('#categories li.active').attr('data-attr');
                        if(product_id !== '0'){
                            attrs['product_id'] = product_id;
                        }
                        root.loadReports(attrs);   
                    }
                }
            });
        },

        render: function () {
            if(!document.isAuthor){
                this.$('#content_menu li').removeClass('active');
                this.$('#content_menu, .nav-pills li[role="overview"]').addClass('disabled');
            }

            this.loadReports({
                'date_range': 'week',
                'offset': this.utcoffset
            });
        },

        loadReports: function(data){
            $("<div id='loading_data'></div>").appendTo('#main_container');
            var reports_data = new ReportsApi();
            var root = this;
            reports_data.fetch({
                data: data
            }).done(function(response){
                root.$('#user_analytics').html(SiteTrafficTemplate(response))
                root.$('[data-toggle="popover"]').popover({
                    html: true
                });
                root.trending_chapters = response.trending_chapters;
                root.sort_chapters_by = 'views';
                root.loadMoreChapters = false;
                root.loadTrendingChapters();
                root.loadVisitorsVsViewsGraph(response.graphs.visitors_vs_views);
                root.loadTrendingCategories(response.graphs.trending_categories);
                root.loadReferrals(response.graphs.referrals);
                root.loadGeography(response.graphs.geography)
            }).fail(function(response){
                console.log('Loading reports failed...');
            }).always(function(){
                $('#loading_data')[0].remove();
            });
        },

        loadTrendingChapters: function(){
            var tr_ch = this.trending_chapters;
            var first_sort_by = this.sort_chapters_by == 'views'? 'completion_rate': 'views';
            var sec_sort_by = this.sort_chapters_by;
            tr_ch = _.chain(tr_ch).sortBy(first_sort_by).sortBy(sec_sort_by).reverse().value();
            tr_ch = _.first(tr_ch, 10);
            this.$('.most_popular_chapters .data_block').html(
                TrendingChaptersTemplate({
                    'trending_chapters': tr_ch,
                    'sort_by': this.sort_chapters_by,
                    'load_more': this.loadMoreChapters
                })
            )
        },

        filterReports: function(event){
            var date_range = 'week';
            var product_id = 0;

            if(event.target.parentElement.id == 'metrics'){
                date_range = event.target.getAttribute('data-attr');
                this.$('.time-interval-dd .interval').html(date_range);
                this.$('#metrics li').removeClass('active');
                this.$(event.target).addClass('active');
                
                if(date_range == 'custom'){
                    this.$('.custome-date').show();
                    return false;
                } else {
                    this.$('.custome-date').hide();
                }
                
                this.$('#from-date').data('datepicker').clear();
                this.$('#to-date').data('datepicker').clear();
                product_id = this.$('#categories li.active').attr('data-attr');
                
                this.$('.time-interval-dd .interval').html(event.target.getAttribute('data-title'));
                this.$('#metrics li').removeClass('active');
                this.$(event.target).addClass('active');
            }else if(event.target.parentElement.id == 'categories'){
                product_id = event.target.getAttribute('data-attr');
                date_range = this.$('#metrics li.active').attr('data-attr');
                this.$('.category-dd .category').html(event.target.textContent);
                this.$('#categories li').removeClass('active');
                this.$(event.target).addClass('active');
            }
            var attrs = {
                'date_range': date_range,
                'offset': this.utcoffset
            }
            if(product_id && product_id !== '0'){
                attrs['product_id'] = product_id
            }
            if(date_range == 'custom'){
                var from_date = this.$('#from-date').datepicker().data('datepicker');
                var to_date = this.$('#to-date').datepicker().data('datepicker');
                if(from_date.selectedDates.length && to_date.selectedDates.length){
                    attrs['start_date'] = this.$('#from-date').val()
                    attrs['end_date'] = this.$('#to-date').val()
                    this.loadReports(attrs)
                }
            }else{
               this.loadReports(attrs)
            }
        },

        sortPopularChapters: function(event){
            if(this.$(event.target).parent().hasClass('active')) return false;

            this.sort_chapters_by = this.sort_chapters_by == 'views'? 'completion_rate': 'views';
            this.loadTrendingChapters();
        },

        loadGeography: function(geography){
            var geography_list = _.map(geography, function(val, key) {
                return val;
            });

            this.$('.geography_chart_block').html(GeographyTemplate({'geography': geography_list}));

            if(!$.isEmptyObject(geography)){
                var mapGeoJSON = Highcharts.maps['custom/world'],
                data = [];
                // Generate non-random data for the map
                var country_iso_code_key = 'iso-a2';
                $.each(mapGeoJSON.features, function (index, feature) {
                    var countryISOCode = feature.properties[country_iso_code_key]
                    var visit_count = geography[countryISOCode] && geography[countryISOCode]['count'] || 0;
                    data.push({
                        key: countryISOCode,
                        value: visit_count
                    });
                });
                // Instantiate chart
                this.$("#geography").highcharts('Map', {
                    title: {
                        text: ''
                    },
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            enabled: false,
                        }
                    },
                    colorAxis: {
                        min: 0,
                        stops: [
                            [0, '#EFEFFF'],
                            [0.5, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
                        ]
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        data: data,
                        mapData: mapGeoJSON,
                        joinBy: [country_iso_code_key, 'key'],
                        name: 'Visits',
                        states: {
                            hover: {
                                color: Highcharts.getOptions().colors[2]
                            }
                        },
                    }, {
                        type: 'mapline',
                        name: "Separators",
                        data: Highcharts.geojson(mapGeoJSON, 'mapline'),
                        nullColor: 'gray',
                        showInLegend: false,
                        enableMouseTracking: false
                    }]
                });
            }
        },

        loadReferrals: function(referrals){
            this.$('.referral_chart_block').html(ReferralsTemplate({'referrals': referrals}));
            if(referrals.length > 0){
                var referral_list = [];
                _.each(referrals, function(val) {
                    referral_list.push({
                        data: val.count,
                        label: val.name
                    });
                });

                var col1 = "#0a316b",
                    col2 = "#0948a7",
                    col3 = "#0156d5",
                    col4 = "#066afe",
                    col5 = "#639bfc",
                    col6 = "#95b5f2",
                    col7 = "#b5ccf6",
                    col8 = "#cfddf7",
                    col9 = "#ebf1fc",
                    col10 = "#e9e9e9";

                // Instantiate Pie Chart
                $.plot("#referral",
                    referral_list,
                    {
                       series: {
                            pie: {
                                show: true,
                                innerRadius:.5,
                                shadow: {
                                    top: 5,
                                    left: 15,
                                    alpha: .3
                                },
                                stroke: {
                                    width: 0
                                },
                                label: {
                                    show: false,
                                    radius: 3/4,
                                    background: {
                                        opacity: 0,
                                        color: '#000'
                                    },
                                    threshold: 0.1
                                },
                                highlight: {
                                    opacity: .08
                                }
                            }
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        colors: [col1, col2, col3, col4, col5, col6, col7, col8, col9, col10],
                        legend: {
                            show: false
                        },
                    }
                );
                this.$("#referral").bind("plothover", function (event, pos, item) {
                    $("#tooltip").remove();
                    if(item){
                        var tooltip = item.series.label + ' : ' + parseFloat(item.series.percent).toFixed(2) + '%';
                        $('<div id="tooltip">' + tooltip + '</div>').css({
                            top: pos.pageY - 50,
                            left: pos.pageX - 70,
                        }).appendTo("body").fadeIn(200);
                    }
                });
            }
        },

        loadTrendingCategories: function(categories){
            if(categories.length > 0){
                var trending_categories = [];
                var x_axis_labels = [];

                $.each(categories, function (index, val) {
                    var word = ' View' + (val.views == 1 ? '' : 's');
                    trending_categories.push([
                        index,
                        val.views,
                        val.name + ' : ' + val.views + word
                    ])
                    if(val.name.length > 10){
                        val.name = val.name.substring(0,10) + '...';
                    }
                    x_axis_labels.push([index, val.name])
                });

                $.plot($("#top_trending_cat_chart"),
                    [{
                        data: trending_categories,
                        label: "Page Views"
                    }], {
                        series: {
                            bars: {
                                order:2,
                                align:"center",
                                show: true,
                                lineWidth:1,
                                barWidth:.6,
                                fill: true,
                                fillColor: {
                                    colors:[ {
                                        opacity: 1
                                    }, {
                                        opacity: 1
                                    }]
                                }
                            },
                            shadowSize: 2
                        },
                        legend: {
                            show: !1
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#ecf1f5",
                            borderWidth: 0,
                            margin: 30
                        }, 
                        colors:["#ffc40d"],
                        xaxis: {
                            autoscaleMargin: 0,
                            ticks: x_axis_labels,
                            tickDecimals: 0,
                            tickLength:0
                        }, 
                        yaxis: {
                            autoscaleMargin: .5,
                            ticks: 5,
                            tickDecimals: 0
                        }
                    }
                )

                this.$("#top_trending_cat_chart").bind("plothover", function (event, pos, item) {
                    $("#tooltip").remove();
                    if(item){
                        var tooltip = item.series.data[item.dataIndex][2];
                        $('<div id="tooltip">' + tooltip + '</div>').css({
                            top: item.pageY - 50,
                            left: item.pageX - 70,
                        }).appendTo("body").fadeIn(200);
                    }
                });
            }else{
                this.$('#top_trending_cat_chart').html(
                    TrendingChaptersTemplate({
                        'trending_chapters': []
                    })
                );
            }
        },

        loadVisitorsVsViewsGraph: function(response){
            var visitors = new Array();
            var views = new Array();

            var root = this;
            if(response.slots.length > 0){
                response.site_visitors.map(function(val, index) {
                    visitors.push([root.getGraphDate(response.slots[index]), val]);
                });
     
                response.demo_views.map(function(val, index) {
                    views.push([root.getGraphDate(response.slots[index]), val]);
                });

                var date_range = this.$('#metrics li.active').attr('data-attr');
                var tick_size = 'day';
                var unit_between = 1;
                var format = "%b\n\n%d";
                var Max = 0;
                var Min = 0;
                var multiplier = 2;

                switch (date_range){
                    case 'today':
                        multiplier = 0.5;
                        tick_size = 'day';
                        break;
                    case 'yesterday':
                        multiplier = 0.5;
                        tick_size = 'day';
                        break;
                    case 'week':
                        multiplier = 0.5;
                        tick_size = 'day';
                        unit_between = 1;
                        break;
                    case 'month':
                        multiplier = 1.5;
                        unit_between = 3;
                        break;
                    case 'quarter':
                        multiplier = 3.5;
                        unit_between = 7;
                        break;
                    case 'half-year':
                        multiplier = 7;
                        unit_between = 14;
                        break;
                    case 'year':
                        multiplier = 15.5;
                        tick_size = 'month';
                        format = "%b";
                        break;
                    case 'custom':
                        if( response.slots.length ) {
                            var dayone = root.getGraphDate(response.slots[0]);
                            var daytwo = root.getGraphDate(response.slots[response.slots.length - 1]);
                            var daysdiff = root.dayDifference(dayone, daytwo);
                            if (daysdiff >= 730) {//2years~
                                tick_size = 'year';
                                format = "%Y";
                                multiplier = 365;
                            } else if (daysdiff >= 365){//year
                                tick_size = 'month';
                                format = "%b";
                                multiplier = 15.5;
                            } else if (daysdiff >= 108) {//half-year~
                                unit_between = 14;
                                multiplier = 7;
                            } else if (daysdiff >= 54) { //Quarter~
                                unit_between = 7;
                                multiplier = 3.5;
                            } else if (daysdiff >= 28) { //Month~
                                unit_between = 3;
                                multiplier = 1.5;
                            } else {
                                multiplier = 2;
                            }
                        }
                        break;
                }
                Max = (root.getGraphDate(response.slots[response.slots.length - 1]) + (86400000*multiplier));
                Min = (root.getGraphDate(response.slots[0]) - (86400000*multiplier));

                $.plot("#spline_chart",
                    [{
                        data: visitors,
                        label: 'Site Visitors Curve',
                        curvedLines: {
                            apply: true,
                            monotonicFit: true
                        }
                    }, {
                        data: views,
                        label: 'Demo Views Curve',
                        curvedLines: {
                            apply: true,
                            monotonicFit: true
                        }
                    }, {
                        data: views,
                        label: 'Demo Views',
                        points: {
                            symbol: "circle",
                            fillColor: "#1e9fb4",
                            radius: 5,
                            show: true
                        },
                        lines: {
                            show: false
                        },
                    }, {
                        data: visitors,
                        label: 'Site Visitors',
                        points: {
                            symbol: "square",
                            fillColor: "#222838",
                            radius: 5,
                            show: true
                        },
                        lines: {
                            show: false
                        },
                    }], {
                    series: {
                        curvedLines: {
                            active: true
                        },
                        lines: {
                            show: true,
                            fill: true,
                            fillColor: {
                                colors:[{
                                    opacity: 1
                                },{
                                    opacity: 1
                                }]
                            }
                        },
                    },
                    grid: {
                         hoverable: true,
                         clickable: true,
                         tickColor: "#ecf1f5",
                         borderWidth: 0,
                         margin: 30
                    },
                    legend: false,
                    xaxis: {
                        max: Max,
                        min: Min,
                        mode: "time",
                        timeformat: format,
                        tickSize: [unit_between, tick_size],
                        tickLength:0,
                    }, 
                    colors:['rgba(34, 40, 56, 0.5)', 'rgba(30, 159, 180, 0.5)']
                });

                this.$("#spline_chart").bind("plothover", function (event, pos, item) {
                    $("#tooltip").remove();  
                    if(item) {
                        if( item.series.label === 'Site Visitors' || item.series.label === 'Demo Views' ) {
                            var tooltip = item.series.label + ': ' + item.series.data[item.dataIndex][1];
                            $('<div id="tooltip">' + tooltip + '</div>').css({
                                'top': item.pageY - 50,
                                'left': item.pageX - 70,
                            }).appendTo("body").fadeIn(200);
                        }
                     }
                });
            }else{
                this.$('#spline_chart').html(TrendingChaptersTemplate({
                    'trending_chapters': []
                }));
            }
        },

        dayDifference: function( time1, time2){
            var timeDiff = Math.abs(time2 - time1);
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        },

        loadMore: function(event){
            this.$(event.target).parent().children('.reports_data_row').removeClass('hidden');
            this.$(event.target).remove();
            this.loadMoreChapters = true;
        },

        getGraphDate: function(date_string){
            var date_string_list = date_string.split(',');
            var year = parseInt(date_string_list[0]);
            var month = parseInt(date_string_list[1]) - 1;
            var day = parseInt(date_string_list[2]);
            var tzOffset = new Date();
            tzOffset = tzOffset.getTimezoneOffset() * 60 * 1000;
            var time = new Date(year, month, day).getTime() - tzOffset;
            return time;
        },

    });

    return ReportsView;
});