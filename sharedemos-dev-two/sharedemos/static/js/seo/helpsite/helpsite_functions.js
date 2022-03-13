$(document).ready(function () {
    let mobileCheck = (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);

    /* IE browser warning popup */
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf('MSIE '); // IE 10 or older
    let scrollUp = true;

    /* Events */
    $('.navbar-toggle').on('click', () => $('body').toggleClass('slide-menu'));
    $(window).on('scroll', makeHeaderTransparent);

    (mobileCheck)? $('.menu-item').on('click', toggleDeviceSubMenu) : $('.menu-item').on('mouseover mouseout', toggleDesktopSubMenu);

    $('.journeys-slider').addClass('loading');
        // ajax call for journey
        $.ajax({
            url: '/api/journey',
            dataType: 'json',
            success: function(resp) {
                if(resp['ret_url']) {
                    let args = {
                        next: window.location.pathname + window.location.hash
                    }
                    resp['ret_url'] += '?' + $.param(args);
                    window.location.href = window.location.origin + resp['ret_url'];
                }
                var journeyTemplate = '';
                resp.forEach((journey) => {
                    let icon = (journey.icon_path) ? '/static/media/'+journey.icon_path : '/static/images/bmc/person_suitcase.png';
                    journeyTemplate +=  `<div class="col-xs-12 col-md-3 col-lg-3 journey-block-wrapper">
                                            <div class="journey-block">
                                                <a href="/j/${journey.slug}">
                                                    <div class="journey-icon">
                                                        <img src="${icon}">
                                                        <h6>${journey.name}</h6>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>`;
                })
                $('.journeys-slider').removeClass('loading').html(journeyTemplate);
                $('.journeys-slider').slick({
                        prevArrow: $('.left-journey'),
                        nextArrow: $('.right-journey'),
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        initialSlide: 0
                    });
            },
            error: function( req, status, err ) {
                $('.journeys-slider').removeClass('loading');
                console.log( 'something went wrong', status, err );
            }
        });

    function makeHeaderTransparent(evt) {
        let scrolltop = $(this).scrollTop();
        let navBar = $('.fixed-header');
        (scrolltop)? navBar.removeClass('nav-transp-style') : navBar.addClass('nav-transp-style');
        stickyArticleNavigation(scrolltop);
    }

    function toggleDeviceSubMenu(e) {
        let link = $(e.currentTarget);
        link.siblings().removeClass('show-submenu');
        link.toggleClass('show-submenu');
    }

    function toggleDesktopSubMenu(e) {
        let link = $(e.currentTarget);
        link.siblings().removeClass('show-submenu');
        (e.type === 'mouseover')? link.addClass('show-submenu') : link.removeClass('show-submenu');
    }

    function stickyArticleNavigation(scrolltop) {
        let isArticlePage = $('body').hasClass('article-page');
        let myPos = window.pageYOffset;
        if(isArticlePage) {
            if ((scrolltop > myPos && !scrollUp) || (scrolltop == 0)) {
                $('.article_navigation').stop().slideUp();
                scrollUp = !scrollUp;
            } else if(scrolltop < myPos && scrollUp) {
                $('.article_navigation').stop().slideDown();
                scrollUp = !scrollUp;
            }
            myPos = scrolltop;
        }
    }

    $('.popular-chapter').on('click', (event) => {
        searchInput = $('.search-input');
        searchInput.val($.trim($(event.currentTarget).text()));
        searchInput.focus();
        filterResults();
    });


    function filterResults() {
        const searchInput = $('.search-input');
        (searchInput.val())? searchInput.addClass('notEmpty') : searchInput.removeClass('notEmpty');
        let filter = searchInput.val().toUpperCase();
        let $searchResults = $(".search-results");
        $searchResults.children("a").each(function( index ) {
            ($(this).text().toUpperCase().indexOf(filter) > -1)? $(this).show(): $(this).hide();
        });
    }
});