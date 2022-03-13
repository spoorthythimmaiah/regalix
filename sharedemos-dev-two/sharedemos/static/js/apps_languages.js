$(document).on('click', '[data-overlay]', showOverlay);
$('body').on('click', '[data-close]', closeOverlay);
$('body').on('click', '[data-language-options] .lang-box', (e) => {
        e.preventDefault();
        var locale = $(e.currentTarget).attr('lvalue');
        SDCookies.setItem('user_locale', locale, null, '/');
        document.location.reload();
    });
function whichAnimationEvent(){
    var t,
        el = document.createElement("fakeelement");

    var animations = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations){
        if (el.style[t] !== undefined){
            return animations[t];
        }
    }
}
var animationEvent = whichAnimationEvent();

function showOverlay(event) {
        event.preventDefault();
        var popupTarget = $(event.currentTarget).data('overlay');
        var popupHTML = $($('#' + popupTarget).html());
            popupHTML.find('[data-current-language] .lang-box').attr('lvalue', document.locales.selected.locale).text(document.locales.selected.name)
            let availableTranslations = JSON.parse(event.currentTarget.dataset.languageOptions);
            let languageList = []
            $.each(availableTranslations['languages'], (count, element) => {
                languageList.push(element['locale']);
            })
            $.each(languageList, (count, l_id) => {
                let language = $.grep(document.locales.languages, (l) => {
                    return l_id !== document.locales.selected.locale && l.locale == l_id
                })
                if(language.length){
                    popupHTML.find('[data-language-options]').append(`<li><a href='javascript:;' class='lang-box' lvalue='${language[0].locale}'> ${language[0].name} </a></li>`)
                }
            })
        $('.language-popup-wrapper').html(popupHTML);
        $('.language-popup-wrapper .custom-popup').addClass('popup-in');
        $(".custom-popup.popup-in").one(animationEvent, () => {
            $('#translation-options').niceScroll({cursorwidth: 7})
        });
    }

function closeOverlay(event){
        var el = $(event.target).parents('.popup-in');
        $(el).getNiceScroll().remove();
        $(el).removeClass('popup-in').addClass('popup-out');
        $(el).one(animationEvent, () => {
            $('.language-popup-wrapper').empty();
            $(el).removeClass('popup-out');
        });
    }