/*global define*/
define(['jquery',
        'backbone',
        '../../tenant/common',
        '../templates/pdf_viewer.handlebars',
        'pdf-js',
        'pdf-js-viewer',
        'pdf-viewer-css',
        'bootstrap'
], function ($, Backbone, Common, PdfViewerTemplate, pdfjsLib, pdfjsViewer) {
    'use strict';

    var PdfView = Backbone.View.extend({

        el: '#pdf-viewer-block',

        events: {
            "click .close-pdf-viewer": "closePDF",
            "click a.internalLink": "scrollTop",
            "click #download-pdf-link": (event)=> {Common.downloadResource(event)}
        },

        initialize: function () {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `${document.cdn_url || ""}/static/js/build/pdf.worker.min.js`;            
            this.pdfLinkService = new pdfjsViewer.PDFLinkService({
                externalLinkTarget: 2
            });
            this.pdfFindController = new pdfjsViewer.PDFFindController({
                linkService: this.pdfLinkService,
            });
            return this;
        },

        launchPdfViewer: function(data) {
            this.$el.html(PdfViewerTemplate(data))
            if(data.is_asset){
                this.$el.find('.close-pdf-viewer').addClass('hide');
                this.$el.find('p.pdf-title, p.breadcrum').addClass('asset-linked');
                Common.logVisitActivity(data.product_slug, data.section_slug);
            }else {
                this.$el.removeClass('hide').addClass('animated slideInUp')
                this.$el.on('animationend', ()=> {
                    this.$el.removeClass('animated slideInUp').addClass('show-pdf-viewer').scrollTop(0);
                });
            }

            let container = this.$el.find('#viewerContainer')[0];
            let pdfViewer = new pdfjsViewer.PDFViewer({
                container: container,
                linkService: this.pdfLinkService,
                findController: this.pdfFindController,
            });
            this.pdfLinkService.setViewer(pdfViewer);
            $(container).on('pagesinit', ()=> {
                pdfViewer.currentScaleValue = 'page-width';
                this.$el.scrollTop(0);
            });
            this.$el.find('#pdf-loading').removeClass('hide');
            // IIFE syntax with async and await.
            (async ()=> {
                try {
                    let pdfDocument = await pdfjsLib.getDocument({
                        url: data.pdf.source_url,
                        cMapUrl: `${document.cdn_url || ""}/static/js/build/pdfjs_cmaps/`,
                        cMapPacked: true,
                        crossDomain: true
                    });           
                    pdfViewer.setDocument(pdfDocument);
                    this.pdfLinkService.setDocument(pdfDocument, null);
                    this.$el.find('#pdf-loading').addClass('hide');
                } catch(error) {
                    this.$el.find('#pdf-loading').addClass('hide');
                    this.$el.find('#error').removeClass('hide');
                    console.log(error);
                }
            })();
        },

        closePDF: function() {
            this.$el.addClass('animated slideInDown');
            setTimeout(() => {
                this.$el.removeClass('active animated slideInDown show-pdf-viewer').addClass('hide'); 
            }, 1000)
        },

        scrollTop: function(e) {
            setTimeout(() => {
                this.$el.animate({
                    scrollTop: this.$el.scrollTop() - 100
                },100);
            }, 100);
        },

    });

    return PdfView;
});
