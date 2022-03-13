'use strict';
import $ from 'jquery';
import Backbone from 'backbone';
import AllProducts from  '../models/all_products';
import allChapters from  '../templates/all_chapters.handlebars';

const HomeView = Backbone.View.extend({

    el: '#main_container',

    events: {
        'click .category-nav li' : 'changeCategory'
    },

    template: '',

    initialize() {
        this.load();
        $(window).on("resize", () => {this.$('.resized').removeClass('.resized');this.adjustSize()});
    },

    adjustSize() {
        const $categoryBlocks = this.$(".playlists.active .help-category-block");
        if(!($categoryBlocks.hasClass('resized'))){
            let maxHeight = Math.max.apply(null, $categoryBlocks.map(function () {
                return $(this).height();
            }).get()) + 30;
            $categoryBlocks.css('height', maxHeight);
            $categoryBlocks.addClass('resized');
        }
    },

    changeCategory(event) {
        let category = this.$(event.currentTarget).text();
        this.$('.category-nav li.active,.playlists.active').removeClass('active');
        this.$(event.currentTarget).addClass('active');
        this.$(`.playlists[data-category="${category}"]`).addClass('active');
        this.$('h2.category-title').text(category);
        this.adjustSize();
    },

    load() {
        var allProducts = new AllProducts();
        var root = this;
        allProducts.fetch({
            success: function (model, products) {
                root.$('.playlist-holder').html(allChapters(products));
                root.adjustSize();
            }
        });
    },
});

export default HomeView;
