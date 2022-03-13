$(document).ready(function() {

    $('.tl_details').on('click', function () {
        $(this).toggleClass('expanded');
    });

    var fromDateElem = $('#from-date'), toDateElem = $('#to-date');
    var root = this;
    fromDateElem.datepicker({
        language: 'en',
        dateFormat: "yyyy-mm-dd",
        maxDate: new Date(),
        autoClose: true,
        clearButton: true,
        onSelect: function(selectedDate, date){
            var toDate = toDateElem.val();
            toDateElem.datepicker().data('datepicker').update('minDate', date);
            if(selectedDate && toDate && selectedDate != document.from_date){
                var pathId = $('.select-paths .active').attr('data-attr');
                window.location = `${document.pathfinderReportsUrl}custom/${pathId}/${selectedDate}/${toDate}`;
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
            var fromDate = fromDateElem.val();
            fromDateElem.datepicker().data('datepicker').update('maxDate', date || new Date());
            if(selectedDate && fromDate && selectedDate != document.to_date){
                var pathId = $('.select-paths .active').attr('data-attr');
                window.location = `${document.pathfinderReportsUrl}custom/${pathId}/${fromDate}/${selectedDate}`;
            }
        }
    });

    if(document.date_range == 'custom'){
        $('.custom-from-to-date').show();

        fromDateElem.val(document.from_date).datepicker().data('datepicker').selectDate(getDate(document.from_date));
        toDateElem.val(document.to_date).datepicker().data('datepicker').selectDate(getDate(document.to_date));
    }

	$('.select-date li').on('click', function(event){
		var dateRange = $(event.currentTarget).attr('data-attr');
		var pathId = $('.select-paths .active').attr('data-attr');
		if(dateRange == 'custom'){
			$('.custom-from-to-date').show();
			$('.select-date li').removeClass('active');
			$(event.currentTarget).addClass('active');
			$('.interval.date-range').text('Custom');
		}else{
			window.location =  `${document.pathfinderReportsUrl}${dateRange}/${pathId}`;
		}
	});

	$('.select-paths li').on('click', function(event){
		var pathId = $(event.currentTarget).attr('data-attr');
		var dateRange = $('.select-date .active').attr('data-attr');
		if(dateRange != 'custom'){
			window.location = `${document.pathfinderReportsUrl}${dateRange}/${pathId}`;
		}else{
            var fromDate = $('#from-date').val();
            var toDate = $('#to-date').val();
            window.location = `${document.pathfinderReportsUrl}custom/${pathId}/${fromDate}/${toDate}`;
        }
	})

    var mostPopularPathElem = $('.popular_paths_list .pplist_data');
    if (mostPopularPathElem.length >  5){
        $('.popular_paths_list .pplist_data').slice(5).hide();
         $('.popular_paths_list').append('<div class="load_more_ppaths text-center col-xs-12">load more</div>');
     }

    $('.load_more_ppaths').on('click', function (event) {
        $(event.target).parent().children('.pplist_data').show();
        $(event.target).remove();
    });

    $('.sort').on('click', function (event) {
        var target_class = $(event.target).parent().attr('class').split(' ')[0];

        if($(event.target).parent().hasClass('active')){
            return true;
        }

        $('.paths_header').removeClass('active');
        $('.' + target_class).addClass('active');

        var popular_paths_list = [];
        $('.popular_paths_list .pplist_data').each(function(){
            var name = $(this).children('.paths_title').html();
            var clicks = $(this).children('.paths_clicks').html();
            var completion_rate = $(this).children('.paths_comp_rate').html().split('%')[0];

            popular_paths_list.push({
                'name' : name,
                'clicks' : parseInt(clicks),
                'completion_rate': parseFloat(completion_rate)
            }); 
        });

        var parent_class = $(event.target).parent().attr('class');
        if(parent_class.includes('click')){
            popular_paths_list.sort(function(first_elem, second_elem) {
                return second_elem.clicks - first_elem.clicks;
            });
        }else{
            popular_paths_list.sort(function(first_elem, second_elem) {
                return second_elem.completion_rate - first_elem.completion_rate;
            });
        }

            $('.popular_paths_list').empty();

        $.each(popular_paths_list, function(index, value) {
            var row = '<div class="pplist_data col-xs-12">' + 
                          '<div class="paths_title col-xs-7">' + value.name  + '</div>' +
                          '<div class="paths_clicks col-xs-2 text-center">' + value.clicks.toLocaleString() + '</div>' +
                          '<div class="paths_comp_rate col-xs-3 text-center">' + value.completion_rate.toLocaleString() + '%</div>' +
                      '</div>'
            $('.popular_paths_list').append(row);
        });

    });

    $('.inner-traveled-list').on('click', '.close-inner-tl', function(event){
        $(event.target).parent().remove();
        var last_option = $(".inner-tl-data:last");
        var option_id = $(last_option).attr('option-id');

        if(last_option.length > 0){
            var date_range = $('ul.select-date.dd-menu li.active').attr('data-attr');
            var path_id = $('ul.dd-menu.select-paths li.active').attr('data-id');
            var data;

            if(date_range == 'custom'){
                var from_date = $('#from-date').val();
                var to_date = $('#to-date').val();
                data = {'date_range': date_range,
                        'path_id': path_id,
                        'option_id': option_id,
                        'from_date' : from_date,
                        'to_date' : to_date}; 
            }else{
                data = {'date_range': date_range,
                        'path_id': path_id,
                        'option_id': option_id};
            }

            getfilterOptionsData(data);
        }else{
            window.location.reload();
        }
    });

    function getfilterOptionsData(data){
        $.ajax({
            type: 'GET',
            async: false,
            url: '/api/reports/path',
            data: data,
            dataType: 'json',
            contentType: "application/json;",
            success: function(response, status, jqXHR){
                $('.traveled_lines_list').empty();
                if(response.STATUS != false){
                    var question_elem = '<div class="traveled_lines_data">' + 
                        '<div class="tl_summary">' + 
                            '<h6>' + response.question + '</h6>' +
                            '<div class="most-tl-answers" option-id="'+ response.options[0].option_id +'">' +
                                    response.options[0].name + 
                            '</div>' + 
                            '<div class="tl_no_clicks">' + response.options[0].clicks  + ' clicks</div>' +
                        '</div>' +
                        '<div class="tl_desc">' +
                        '</div>';
                    $('.traveled_lines_list').append(question_elem);

                    if(response.options[0].icon){
                        $('.tl_summary h5').prepend('<img src="/static/media/' + response.options[0].icon + '"><br>')
                    }

                    response.options.shift();

                    if(response.options.length > 0){
                        var other_answers_elem = '<div id="tl_details" class="tl_desc_details collapse in" style="">' +
                                                        '<h5>Other Answers:</h5>' + 
                                                        '<br>' +
                                                 '</div>';
                        $('.tl_desc').append(other_answers_elem);
                        $.each(response.options, function(index, value) {
                            var option_elem = '<div class="most-tl-answers" option-id="' + value.option_id + '">' + value.name + ' - ' + value.clicks + ' Clicks</div><br>'
                            $('.tl_desc_details').append(option_elem);
                            if(value.icon){
                                $('.most-tl-answers[option-id="' + value.option_id + '"]').prepend('<img src="/static/media/' + value.icon + '">');  
                            }
                        });

                    }
                    
                    $('.most-tl-answers').on('click', function(event){
                        filterOptions(event);
                    });
                
                }else{
                    $('.traveled_lines_list').append('<div class="traveled_lines_data">'+
                        '<div class="tl_summary"><h6>No Further Question or Options</h6></div></div>');
                }
            }
        });
    }

    $('.most-tl-answers').on('click', function(event){
        filterOptions(event);
    });

    function filterOptions(event){
        event.preventDefault();
        var option_id;
        if(event.target.tagName == 'IMG'){
            option_id = $(event.target).parent().attr('option-id');
        }else{
            option_id = $(event.target).attr('option-id');
        }
        if($(event.currentTarget)[0].tagName == 'IMG') {
            var getEle = '<img src='+$(event.currentTarget)[0].src+'/>';
        } else {
            var getEle = $(event.currentTarget)[0].innerHTML;
        }
        if(getEle.match(' Clicks') != null){
            getEle = getEle.substring(0, getEle.indexOf('- '));
        }
        var ele = '<li class="inner-tl-data" option-id="' + option_id + '">'+'<span class="close-inner-tl"></span>'+getEle+'</li>';
        $('.inner-traveled-list').append(ele);

        var date_range = $('ul.select-date.dd-menu li.active').attr('data-attr');
        var path_id = $('ul.dd-menu.select-paths li.active').attr('data-id');
        var data;

        if(date_range == 'custom'){
            var from_date = $('#from-date').val();
            var to_date = $('#to-date').val();
            data = {'date_range': date_range,
                    'path_id': path_id,
                    'option_id': option_id,
                    'from_date' : from_date,
                    'to_date' : to_date}; 
        }else{
            data = {'date_range': date_range,
                    'path_id': path_id,
                    'option_id': option_id};
        }

        getfilterOptionsData(data);
    }


    function getDate(date_string){
        var date_string = date_string.split('-');

        var year = parseInt(date_string[0]);
        var month = parseInt(date_string[1]) - 1;
        var day = parseInt(date_string[2]);

        return new Date(year, month, day);
    }

});
