utils = (function(){
    var utils = {
        SECTION_IMAGE_PATH : '/static/images/vmware/default-category-icon.png',

        setSEOData: function(title, url, description, image){
            var image_path = window.location.origin;
            if(image){
                image_path += '/static/media/' + image;
            }else{
                image_path += this.SECTION_IMAGE_PATH;
            }
            description = description || "";
            this.setPageTitle(title);
            this.setMetaDescription(description);
            this.setOpenGraphValues(title, url, description, image_path)
            this.setTwitterValues(title, url, description, image_path);
        },

        setMetaDescription: function(description){
            $("meta[name='description']").attr("content", description);
        },

        setOpenGraphValues: function(title, url, description, image){
            $('meta[property="og:type"]').attr("content", "website");
            $('meta[property="og:title"]').attr("content", title);
            $('meta[property="og:description"]').attr("content", description);
            $('meta[property="og:url"]').attr("content", url);
            $('meta[property="og:image"]').attr("content", image);
        },

        setPageTitle: function(title){
            $("title").text(title);
        },

        setTwitterValues: function(title, url, description, image){
            $('meta[name="twitter:card"]').attr("content", "summary");
            $('meta[name="twitter:title"]').attr("content", title);
            $('meta[name="twitter:url"]').attr("content", url);
            $('meta[name="twitter:description"]').attr("content", description);
            $('meta[name="twitter:image"]').attr("content", image);
        },

        removeSEOData: function(){
            $("title").text("");
            $('meta[name="description"], meta[property^="og"], meta[name^="twitter"]').attr("content", "");
        },

    }
    return utils;
})();