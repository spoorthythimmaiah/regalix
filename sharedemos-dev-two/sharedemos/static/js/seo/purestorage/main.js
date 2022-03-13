$(document).ready(function(){

    hideRestCategories('trending');

    $('#nda .nda-agreed').on('click', sendNdaStatus);

    $('.tab-container > div').on('click', function (event) {
        var id = $(event.currentTarget).attr('data-attr');
        $(event.currentTarget).parents('.pure-demo-header').find('p span').text(id);
        $('.tab-container div.active').removeClass('active');
        $(event.currentTarget).addClass('active');
        $('.demos').addClass('hidden');
        $('#'+id).removeClass('hidden');
        hideRestCategories(id);
    });

    function hideRestCategories(id){
        var demos = $('#'+id).children();
        if(demos.length > 3){
            $('#'+id).children('.demo:nth-child(3)').nextAll().addClass('hidden');
             $('.load-more-demos').removeClass('hidden')
        } else {
            $('.load-more-demos').addClass('hidden');
        }

    }

    $('.load-more-demos').on('click', function (event) {
        $('.demo.hidden').removeClass('hidden');
        $(event.currentTarget).addClass('hidden');
    });

    /**
    * Show Custom Popup:
    * Function to call a show custom popup, pass popupTarget(id) to display that block in the popup style.
    */
    var showCustomPopup =  (popupTarget) => $('#'+popupTarget).addClass('popup-in');
    
    /**
    * Close custom Popup:
    * Function to close any opened custom popup by passing the popupTarget(id).
    */
    var closeCustomPopup = (popupTarget) => {
        let target = $('#'+popupTarget);
        target.removeClass('popup-in').addClass('popup-out');
        target.one(animationEvent, function() {
            $('.ps-custom-popup-wrapper').empty();
            target.removeClass('popup-out');
        });
    }

    /**
    * Non Disclosure Agreement popup
    */
    showCustomPopup('nda');

    function sendNdaStatus(event){
        if($(event.currentTarget).hasClass('disabled')) return;

        $(event.currentTarget).addClass('disabled');
        var formData = new FormData();
        formData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
        formData.append('email', document.user_email);
        formData.append('set_consent_status', true);
        $.ajax({
            url: '/api/user/',
            type: 'PATCH',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response, status, xhr){
                closeCustomPopup('nda');
            },
            error: function(){
                window.reload();
            }
        });
    }

    /** 
    * Generate dynamic thumbnail for category:
    * Draw multiple images on multiple canvas from one main source image with different coordinates.  
    */
    function GenerateRandomThumbnail(obj) {
        this.canvas = obj.canvas;
        this.srcImgEle = obj.srcImgEle;
        this.srcImg = obj.srcImgEle.getAttribute('src');
        this.getThumbnail = function() {
            this.img = new Image();
            this.img.onload = this.drawThumbnail.call(this);
            this.img.src = this.srcImg;
        }
        this.drawThumbnail = function() {
            for(let i=0;i<this.canvas.length;i++){
                let sx = Math.round(Math.random() * this.srcImgEle.naturalWidth);
                let sy = Math.round(Math.random() * this.srcImgEle.naturalHeight);
                const dw = this.canvas[i].width;
                const dh = this.canvas[i].height;
                // If coordinates + canvas-width/height is more than source image width/height 
                if(sx + dw > this.srcImgEle.naturalWidth) {
                    sx = this.srcImgEle.naturalWidth - dw;
                }
                if(sy + dh > this.srcImgEle.naturalHeight) {
                    sy = this.srcImgEle.naturalHeight - dh;
                }
                let ctx = this.canvas[i].getContext('2d');
                ctx.drawImage(this.srcImgEle, sx, sy, dw, dh, 0, 0, dw, dh);
            }
        }
    }
    /* Initiate GenerateRandomThumbnail class only on source image and cateogry available */
    if( document.getElementById('thumbnail-source-img') && 
        document.getElementsByClassName('cateogry-thumbnail').length ) {
        var generateCategoryThumbnail = new GenerateRandomThumbnail({
                srcImgEle: document.getElementById('thumbnail-source-img').firstElementChild,
                canvas: document.getElementsByClassName('cateogry-thumbnail')
            }
        );
        generateCategoryThumbnail.getThumbnail();
    }

});