function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings){
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('Pragma', 'no-cache');
        var csrftoken = $('meta[name=csrf-token]').attr('content');
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            xhr.setRequestHeader('X-CSRFToken', csrftoken);
        }
    }
});

$('[data-cta-id]').click(function(e){
    if(!document.isOffline){
        var args = {'cta_id': e.currentTarget.dataset.ctaId}
        if(document.product){
            args['product'] = document.product
        }
        if(document.section && document.product !== document.section){
            args['section'] = document.section
        }
        $.ajax({
            type: 'POST',
            url: '/cta-analytics',
            data: JSON.stringify(args),
            dataType: 'json',
            contentType: "application/json"
        });
    }
});

if(!document.isOffline){
    var visit_args = {}
    if(document.product){
        visit_args['product'] = document.product
    }
    if(document.section){
        visit_args['section'] = document.section
    }
    $.ajax({
        type: 'POST',
        url: '/visit-activity',
        data: JSON.stringify(visit_args),
        dataType: 'json',
        contentType: "application/json"
    });
}