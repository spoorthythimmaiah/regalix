'use strict';

import lazyLoad from 'lazyload';

(()=> {
	let images = document.querySelectorAll(".lazy-load");
	new lazyLoad(images);
})();
