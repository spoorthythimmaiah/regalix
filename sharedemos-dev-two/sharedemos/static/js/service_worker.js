(function() {

    var CACHE_VERSION = 1;
    var CURRENT_CACHES = {
        staticAssets: 'sd-walkthroughs' + CACHE_VERSION
    };
    //https://googlechrome.github.io/samples/service-worker/offline-analytics/
    // The files we want to cache
    var staticCache = [
        '/',
        '/service-worker-js',
        '/static/css/fonts/icomoon.ttf?-a33z5b',
        '/static/css/fonts/icomoon.woff',
        '/static/css/login.css',
        '/static/css/player.css',
        '/static/css/style.css',
        '/static/css/walkthrough_styles.css',
        '/static/images/audio-backword.png',
        '/static/images/audio-farward.png',
        '/static/images/audio-on.png',
        '/static/images/audio-pause.png',
        '/static/images/audio-play.png',
        '/static/images/author/thumb-audio.png',
        '/static/images/author/icon-slide-handle.png',
        '/static/images/favicon.ico',
        '/static/images/icon-language-selected.png',
        '/static/images/icon-search.png',
        '/static/images/icon-search-close.png',
        '/static/images/language-neutral-hover.png',
        '/static/images/language-neutral.png',
        '/static/images/left-white-arrow.png',
        '/static/images/link-icon.png',
        '/static/images/login-logo.png',
        '/static/images/menu-up.png',
        '/static/images/playlist-download-error.png',
        '/static/images/search-close.png',
        '/static/images/section-default-icon.png',  
        '/static/images/sandbox_loading_img.gif',
        '/static/images/topArrow.png',
        '/static/js/build/main.js',
        '/static/js/build/4.4.js',
        '/static/js/login.js',
        '/static/js/ripple.js',
        '/static/libs/add-to-homescreen/addtohomescreen.js',
        '/static/libs/bootstrap/css/bootstrap.css',
        '/static/libs/froala/css/froala_style.css',        
        '/static/libs/jquery/jquery-1.11.1.min.js',
        '/static/libs/jquery-qtip/jquery.qtip.css',
    ];

    function stashInCache(cacheName, request, response) {
        caches.open(cacheName).then(function(cache){
            cache.put(request, response);
        })
    }

    // Remove caches whose name is no longer valid
    function clearOldCaches() {
        return caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key){
                caches.delete(key);
            }))
        })
    }

    // Set the callback for the install step
    self.addEventListener('install', function(event) {
        event.waitUntil(self.skipWaiting());
    });

    self.addEventListener('activate', event => {
        event.waitUntil(clearOldCaches().then(function(){
                self.clients.claim()
            })
        )
    });

    self.addEventListener('fetch', function(event) {
        var request = event.request;
        if (request.method == 'GET') {
            if(request.url.indexOf('?_cb') !== -1){
                var url = event.request.url.split("?")[0];
                request = new Request(url, {
                    method: 'GET',
                    headers: request.headers,
                    mode: request.mode == 'navigate' ? 'cors' : request.mode,
                    credentials: request.credentials,
                    redirect: request.redirect
                });
            }
            event.respondWith(
                fetch(request).catch(function() {
                  return caches.match(request);
                })
            )
        }
    });

    function staticCacheUpdate() {
        caches.open(CURRENT_CACHES['staticAssets']).then(function(cache) {
            return Promise.all(staticCache.map(function(url) {
                fetch(url, {credentials: 'include'}).then(function(response) {
                    cache.put(url, response);
                })
            }))
        })
    }

    function deleteSelectedSection(sectionSlugs) {
        return Promise.all(sectionSlugs.map(function(sectionSlug) {
            deleteCacheKeys(CURRENT_CACHES[sectionSlug]);
        }))
    }

    function cacheSelectedSection(event, sectionSlug) {
        var apiPath = event.data.domain + '/api/section/' + event.data.section;
        fetch('/api/section/' + event.data.section, {credentials: 'include'})
        .then(function(response) {
            var copy = response.clone();
            stashInCache(CURRENT_CACHES[sectionSlug], apiPath, copy);
             return response.json();
        }).then(function(response){
            var themeId = response.tenant.theme_id
              if(themeId && event.data.themeCache){
                var themeurl = '/static/media/theme/'+themeId+'.css';
                fetch(themeurl).then(function(themResponse){
                    var themResponse = themResponse.clone();
                    stashInCache(CURRENT_CACHES['staticAssets'], themeurl, themResponse);
                })
              }
        }).catch(function(e){
            event.ports[0].postMessage({
                    'error_entity': 'section',
                    'is_error': true
            })
            console.log(e); // "oh, no!"
        })
    }


    self.addEventListener('message', function(event) {
        //create section slug cache 
        // cache-pkg name is domain + section slug name
        var sectionSlug = event.data.domain + '_' + event.data.section
        if (sectionSlug in CURRENT_CACHES) {
            // Do nothing here
        } else {
            CURRENT_CACHES[sectionSlug] = sectionSlug;
        }
        if(event.data.is_staticAssets){
            staticCacheUpdate();
        }
        if(event.data.is_section){
            cacheSelectedSection(event, sectionSlug);
        }
        if(event.data.is_walkthrough){
            var apiPath = event.data.domain + '/api/walkthrough/' + event.data.walkthrough;
            fetch('/api/walkthrough/' + event.data.walkthrough)
            .then(function(response) {
                var req = event.data.domain + '/api/walkthrough/' + event.data.walkthrough;
                var resp = response.clone();
                stashInCache(CURRENT_CACHES[sectionSlug], req, resp);
                return response.json();
            }).then(function(response) {
                var i = 1;
                var slideContribution = (100 / response.slides.length)
                return Promise.all(response.slides.map(function(slide) {
                    // before calling primary resource check out the content type then call get_slide details
                    if (slide.primary_resource.type === 'content') {
                        imagePaths = get_all_image_paths(event, slide.primary_resource.content);
                        if (event.data.tenantFooterImage) {
                            path = '/static/media/' + event.data.tenantFooterImage
                            imagePaths.push(path);
                        }
                        var resourceLength = slideContribution / imagePaths.length;
                        imagePaths.forEach(function(resourcePath, index) {
                            var resourceCached = (slideContribution * (i - 1)) + resourceLength * (index + 1);
                            get_slide_details(event, resourcePath, resourceCached)
                        })
                    } else if(slide.primary_resource.type === '360'){
                        var imagePaths = [];
                        for(var frameNo=1; frameNo <= slide.primary_resource.meta_data.count; frameNo++){
                            path = '/static/media/' + slide.primary_resource.path + '/' + frameNo + '.jpg  '
                            imagePaths.push(path)
                        }
                        var resourceLength = slideContribution / imagePaths.length;
                        imagePaths.forEach(function(resourcePath, index) {
                            var resourceCached = (slideContribution * (i - 1)) + resourceLength * (index + 1);
                            get_slide_details(event, resourcePath, resourceCached)
                        })

                    }  else if(slide.primary_resource.type === 'sandbox'){
                        var mediaPaths = [];
                        var frames = slide.primary_resource.meta_data.frames;
                        frames.forEach(function(eachFrame){
                            var frameNo = eachFrame.index.toString();
                            if (frameNo.length == 1) {
                                frameNo = "000"+frameNo;
                            } else if (frameNo.length == 2) {
                                 frameNo = "00"+frameNo;   
                            } else if (frameNo.length == 3) {
                                 frameNo = "0"+frameNo;   
                            }
                            var path;
                            if(eachFrame.type == 'image'){
                                path = '/frame-' + frameNo + '.jpg';
                            }else if(eachFrame.type == 'video'){
                                path = '/video-' + frameNo + '.mp4';
                            }
                            path = slide.primary_resource.meta_data.path + path;
                            mediaPaths.push(path)
                        })
                        var resourceLength = slideContribution / mediaPaths.length;
                        mediaPaths.forEach(function(resourcePath, index) {
                            var resourceCached = (slideContribution * (i - 1)) + resourceLength * (index + 1);
                            get_slide_details(event, resourcePath, resourceCached)
                        })
                    }  else {
                        if (slide.secondary_resource) {
                            var resourceLength = slideContribution / 2.0;
                            [slide.primary_resource.path, slide.secondary_resource.path].forEach(function(resourcePath, index) {
                                var resourceCached = (slideContribution * (i - 1)) + resourceLength * (index + 1)
                                path = '/static/media/' + resourcePath
                                get_slide_details(event, path, resourceCached);
                            })
                        } else {
                            path = '/static/media/' + slide.primary_resource.path;
                            var resourceCached = slideContribution * i
                            get_slide_details(event, path, resourceCached);
                        }
                    }
                i = i + 1;
                }))
            })
        }

        if(event.data.delete_section){
            var sectionSlugs = event.data.cacheNames
            deleteSelectedSection(sectionSlugs).then(function(){
                caches.delete(sectionSlugs);
            })
        }

        if(event.data.clearCacheStorage){
            caches.keys().then(function(keys){
                deleteSelectedSection(keys).then(function(){
                    clearOldCaches();
                    // send msg to unregister the service worker
                    event.ports[0].postMessage({
                        'unregister': true
                    })
                })
            })
        }

        if(event.data.allProducts){
            fetch('/api/section', {credentials: 'include'}).then(function(response){
                var requestURL = event.data.domain + '/api/section';
                var resp = response.clone();
                stashInCache(CURRENT_CACHES['staticAssets'], requestURL, resp);
                return response.json();
            }).then(function(response){
                return Promise.all(response.all_products.map(function(eachProduct){
                    if(eachProduct.icon){
                        var fullPath = event.data.domain + '/static/media/' + eachProduct.icon.path;
                        fetch('/static/media/' + eachProduct.icon.path).then(function(response) {
                            stashInCache(CURRENT_CACHES['staticAssets'], fullPath, response);
                        })
                    }
                }))
            })
        }

        if(event.data.prductTree){
            var cacheName = event.data.domain + '_' + event.data.section_slug;
            var productTreeUrl = event.data.domain + '/api/product-tree/' + event.data.product_slug + '/' + event.data.section_slug;
            fetch('/api/product-tree/' + event.data.product_slug + '/' + event.data.section_slug).then(function(response){
                var productTreeResponse = response.clone()
                stashInCache(cacheName, productTreeUrl, productTreeResponse)
                return response.json();
            }).then(function(sections){
                Promise.all(sections.path.map(function(section){
                    var sectionApi = event.data.domain + '/api/section/' + section.slug;
                    fetch('/api/section/' + section.slug, {credentials: 'include'}).then(function(apiResponse){
                        var apiResp = apiResponse.clone();
                        stashInCache(cacheName, sectionApi, apiResp)
                        return apiResponse.json();
                    }).then(function(apiResponse){
                        Promise.all(apiResponse.children.map(function(child){
                            if(child.icon){
                                var fullPath = event.data.domain + '/static/media/' + child.icon.path;
                                fetch('/static/media/'+child.icon.path).then(function(iconResponse){
                                    stashInCache(cacheName, fullPath, iconResponse);
                                })
                            }
                        }))
                    })
                }))
                return sections.path;
            // this is used to cache all sections-product tree caching    
            }).then(function(sectionsList){
                Promise.all(sectionsList.map(function(section){
                    var productTreeUrl = event.data.domain + '/api/product-tree/' + event.data.product_slug + '/' + section.slug;
                    fetch('/api/product-tree/' + event.data.product_slug + '/' + section.slug).then(function(response){
                    var productTreeResponse = response.clone()
                    stashInCache(cacheName, productTreeUrl, productTreeResponse)
                    return response;
                    })
                }))
            })
        }
    });


    function get_slide_details(event, path, dataCached) {
        return fetch(path)
            .then(function(response) {
                var responseToCache = response.clone();
                cacheName = event.data.domain + '_' + event.data.section
                    if(!path.includes(event.data.domain)){
                        var cacheRequest = path;
                    }else{
                        var cacheRequest = event.data.domain + path;
                    }
                    stashInCache(cacheName, cacheRequest, responseToCache);
                    event.ports[0].postMessage({
                        'data_cached_in_percentage': Math.round(dataCached),
                        'slug': event.data.walkthrough,
                        'is_error': false
                    })
            }).catch(function(e) {
                console.log('Slide Fetch Error', e)
                event.ports[0].postMessage({
                    'data_cached_in_percentage': Math.round(dataCached),
                    'error_entity': 'walkthrough',
                    'is_error': true,
                    'walkthrough_slug': event.data.walkthrough
                })
            });
    }


    // extract all src atttributes from html string content -- text editor
    function get_all_image_paths(event, content) {
        var imagePaths = [];
        var rex = /<img[^>]*src="([^"]*)"/g;
        while (matchedUrl = rex.exec(content)) {
            imagePaths.push(matchedUrl[1]);
        }
        return imagePaths;
    }

     function deleteCacheKeys(cacheName){
        return caches.open(cacheName).then(function(cache){
            cache.keys().then(function(keys){
                return Promise.all(
                    keys.map(function(key) {
                        isKeyMatchCache(key);
                        cache.delete(key);
                    })
                );
            })
        })
    }
    function isKeyMatchCache(key){
        caches.match(key.url).then(function(response){
            if(response){
                return true;
            }else{
                return false;
            }
        })
    }
})();