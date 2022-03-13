// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
    IN && IN.Event.on(IN, "auth", getProfileData);
}

// Handle the successful return from the API call
function onSuccess(data) {
    Backbone && Backbone.trigger('linkedin_login', data);
}

// Handle an error response from the API call
function onError(error) {
    console.log(error);
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
    IN.API.Raw("/people/~:(id,email-address,first-name,last-name,formatted-name,picture-url)?format=json").result(onSuccess).error(onError);
}

$('.social-sharing .fa-twitter, .social-sharing .fa-linkedin,\
 .social-sharing .fa-facebook, .social-sharing .fa-reddit').click((event) => {
    let shareIn = $(event.currentTarget).attr("social-share"),
        url = encodeURIComponent(window.location.href),
        title = encodeURIComponent($('meta[property="og:title"]').attr("content")),
        summary = encodeURIComponent($('meta[property="og:description"]').attr("content")),
        getScreenWidth = window.outerWidth,
        width = 575,
        height = 400,
        left = (getScreenWidth - width) / 2,
        options = `width=${width},height=${height},top=${top},left=${left}`;

    let data = {
        'chapter_slug': document.chapter,
        'section_slug': document.section,
        'product_slug': document.product,
        'media_type': shareIn
    }    
    $.ajax({
        type: 'POST',
        url: '/api/social-share',
        data: JSON.stringify(data),
        headers: {
        "X-CSRFToken": $('meta[name=csrf-token]').attr('content')
        },
        dataType: 'json',
        contentType: "application/json"
    });
    if(shareIn == "twitter") {
        window.open(`http://twitter.com/share?text=${title}&url=${url}`, 'twitter_share', `status=1,${options}`);
    } else if(shareIn == "linkedin") {
        window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '',options);
    } else if(shareIn == "facebook") {
        window.open(`http://www.facebook.com/sharer/sharer.php?&u=${url}&title=${title}`, 'facebook_share', options);
    } else if(shareIn == "reddit") {
        window.open(`http://www.reddit.com/submit?url=${url}&title=${title}`, 'reddit_share', options);
    }
})