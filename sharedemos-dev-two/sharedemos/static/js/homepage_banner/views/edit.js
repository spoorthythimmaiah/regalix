/*global define*/
define([
  "underscore",
  "jquery",
  "backbone",
  "../models/homepage_banner",
  "../../tenant/common",
  "../templates/create_form.handlebars",
  "../templates/cta.handlebars"
], function(
  _,
  $,
  Backbone,
  HomepageBanner,
  Common,
  createForm,
  CtaTemplate
) {
  "use strict";

  var editView = Backbone.View.extend({

    el: "#dashboard_settings",

    events: {
      'click input[name="enable_homepage_banner"]:not(.active)' : 'showForm',
      'submit form[name=homepage-banner]': 'submitDetails',
      'change form[name=homepage-banner] input[name="banner-resource"],form[name=homepage-banner] input[name="background-image"]':
        'validateMedia',
      'click #remove-img, #remove-resource': 'removeMedia',
      'click #add-cta': 'addCTA',
      'click .remove-cta': 'removeCTA',
      'click form[name=homepage-banner] .cancel': 'closeForm',
      'click .banner-edit.active': 'edit',
      'keyup input[type="url"]': 'updateCTAUrl'
    },

    actionFailed: function(target){
      setTimeout(()=>{
        this.$(`.${target} .adding`).removeClass("slide-in is-submitted");
        this.$(`.${target} .failed`).addClass("slide-in");
        setTimeout(()=>{
            this.$(`.${target} .failed`).removeClass("slide-in");
        }, 1000);
      }, 1000);
    },

    actionSuccess: function(target){
      this.$(`.${target} .adding`).removeClass("slide-in is-submitted");
      this.$(`.${target} .added`).addClass("slide-in");
      setTimeout(()=> {
        this.$(`.${target} .added`).removeClass("slide-in");
        this.closeForm();
      }, 1000);
    },

    actionInProgress: function(target){
      this.$(`.${target} .adding`).addClass("slide-in is-submitted");
      },

    addCTA: function(event) {
      this.removeCustomErrorMessage();
      let ctaUrl = this.$('input[name="banner-cta-link"]');
      if(!Common.validateUrl(ctaUrl.val())) {
        this.customErrorMessage('Please Enter a valid URL', ctaUrl);
        return false;
      }
      let ctaText = this.$('input[name="banner-cta-text"]')
      if (!ctaText.val()) {
        this.customErrorMessage('Please provide a name for CTA button', ctaText );
        return false;
      }
      let ctaData = {
          link: ctaUrl.val(),
          name: ctaText.val(),
          cta_id: null
      }
      this.$(ctaUrl).val('');
      this.$(ctaText).val('');
      this.$('#cta-container .cta-items').append(CtaTemplate(ctaData));
    },

    closeForm: function() {
      let popupName ='homepage-banner';
      this.$(`.dashboard-overlay .${popupName}`).addClass("bounceOutUp");
      setTimeout(()=>{
        this.$(`.dashboard-overlay .popup-box.${popupName}`).hide().removeClass("bounceOutUp");
        this.$(".dashboard-overlay").hide();
      }, 300);
    },

    customErrorMessage: function(message, target, elem){
      this.removeCustomErrorMessage();
      var editToolTip = `<div class="error-message">${message}</div>`;
      target.after(editToolTip);
      if(elem) elem.focus();
    },

    edit: function(event) {
      let banner = new HomepageBanner();
      banner.fetch({
        success: (modle, response)=> {
          this.showForm(event, response, true);
        },
        error: (response) => {
          console.log(response.message)
        }
      });
    },

    removeCTA: function(event) {
      let parent = this.$(event.currentTarget).parent();
      if (parent.attr('data-id')) {
        this.$(parent).addClass('hide').attr('attr-remove', true);
      }else {
        this.$(parent).remove();
      }
    },

    removeCustomErrorMessage(){
          this.$('.error-message').remove();
          this.$('.file-name, .resource-name').show();
    },

    removeMedia: function(event) {
      let fileNameClass = '.resource-name';
      let parentClass = 'resource-added';
      let target = $(event.currentTarget);
      let isBannerIcon = this.$(target).parent().hasClass('image-added');
      if(isBannerIcon) {
        fileNameClass = '.file-name';
        parentClass = 'image-added';
        if (event.currentTarget.hasAttribute('image-added')) { 
          this.$(target).attr('data-remove-image', true);
        }
      }else if (event.currentTarget.hasAttribute('resource-added')){
        this.$(target).attr('data-remove-resource', true);
      }
      this.$(target).parent().removeClass(parentClass).find(fileNameClass).empty();
      this.$(target).siblings('input[type=file]').val('');
      this.$(target).siblings('img').removeAttr('src');
    },

    submitDetails: function(event) {
      event.preventDefault();
      let currentFormName = this.$(event.currentTarget).attr('name');
      let formName = `form[name=${currentFormName}]`;
      let bannerTitle = this.$(`${formName} input[name='banner-title']`);
      let bgImageFile = this.$('#upload-banner-image').val();
       if (bannerTitle.val() && bannerTitle.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null){
        this.customErrorMessage(
          'Provide a name with atleast an alphanumeric character',
          this.$(bannerTitle).parent(),
          this.$(bannerTitle)
        );
        return;
      }
      this.removeCustomErrorMessage();
      this.saveDetails(formName);
    },

    saveDetails: function(formName) {
      let bannerData = new FormData();
      let bannerTitle = this.$(`${formName} input[name='banner-title']`).val();
      let bannerDescription = this.$(`${formName} textarea[name='banner-description']`).val();
      let ctaDetails = []
      let ctaItems = this.$(`${formName} #cta-container .cta-items li`);
      _.each(ctaItems, (ele, index) => {
          let action;
          let data = this.$(ele).data();
          if (this.$(ele).attr('attr-remove') == 'true') {
            action = 'remove';
          }else if (!data.id){
            action='add';
          }
          let cta = {
            name: data.title,
            options: {
              type: 'link',
              text: data.title,
              href: data.link
            },
            cta_id: data.id,
            action: action
          }
          ctaDetails.push(cta);
      });

      bannerData.append('title' ,bannerTitle);
      bannerData.append('description', bannerDescription);
      bannerData.append('cta_details', JSON.stringify(ctaDetails));

      if (this.$('#remove-img').attr('data-remove-image')) {
        bannerData.append('remove_background_image', true);
      }

      if (this.$('#remove-resource').attr('data-remove-resource')){
        bannerData.append('remove_resource', true);
      }

      bannerData.append('background_image', this.$('#upload-banner-image')[0].files[0]);
      bannerData.append('banner_resource', this.$('#upload-banner-resource')[0].files[0]);
      let banner_id = this.$(`${formName}`).attr('data-id') || null;
      let banner = new HomepageBanner({id: banner_id});
      this.actionInProgress('homepage-banner');
      var root = this;
      banner.save(bannerData,{
          processData: false,
          cache: false,
          contentType: false,
          data: bannerData,
          success:function(response) {
            root.actionSuccess('homepage-banner');
            root.$('#enable_homepage_banner').addClass('active');                  
            if(["NOT CREATED", "DELETED"].includes(response.attributes.status)){
                root.$(".banner-edit").removeClass("active");
                root.$("input#enable_homepage_banner")
                    .removeAttr("checked")
                    .removeClass("active");
            }
          },
          error:function(xhr, status, error) {
            console.log(status.responseText);
            root.actionFailed('homepage-banner');
          },
      });
    },

    showForm: function(event, data={}, is_edit=false) {
      data.is_edit = is_edit;
      data.imageAdded = true;
      if (!event.currentTarget.checked && !is_edit) return ;
      if(!data.background_image) {
          data.background_image = {
            path: `${document.cdn_url}/static/images/author/img-icon.png`,
            name: data.title
          }
          data.imageAdded = false;
      }
      this.$el.find('.popup-wrap').html(createForm(data));
      this.$(".dashboard-overlay").css({
        "display": "table"
      });
      let popupName ='homepage-banner';
      this.$(`.dashboard-overlay .popup-box.${popupName}`).show().addClass("bounceInDown");
      setTimeout(()=>{
        this.$(`.dashboard-overlay .popup-box.${popupName}`).removeClass("bounceInDown");
      }, 300);
    },

    updateCTAUrl: function(event){
            this.removeCustomErrorMessage();
            if(event.altKey || ([8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46]).indexOf(event.keyCode) !== -1) return;
            var value = $(event.target).val();
            if(value && value.length && value.length > 4 && value.indexOf('http') !== 0){
                $(event.target).val('https://' + value);
            }
        },

    validateMedia: function(event) {
      let message, validStatus = true;
      this.removeCustomErrorMessage();
      let media = event.target.files && event.target.files[0];
      let type = (media.type).split('/')[0];
      let fileSizeMB = type == 'video' ? (media.size / 1000000) : '';
      let target = $(event.currentTarget);
      if (this.$(target).attr('id') == 'upload-banner-image' && type !== 'image') {
        message = 'Oops! Please upload a valid image file.';
       this.customErrorMessage(message, this.$('.file-name'));
       this.$('.file-name').hide()
       return
      }

      if (!['image', 'video'].includes(type)) {
        validStatus = false;
        message =  `${type} file not supported`;
      }

      if (type == 'image') {
          if (!media || !(/\.(jfif|jpg|jpeg|png|gif)$/i).test(media.name)) {
              validStatus = false;
              message ="Oops! Please upload a valid image file.";
          }

      }else if (type == 'video') {
          if (!media || !(/\.(mp4|mkv|wmv|mpeg4|webm|ogg)$/i).test(media.name)) {
              validStatus = false;
              message ="Oops! Please upload a valid video file.";
          }else if (fileSizeMB > Common.VIDEO_FILE_MAX_SIZE) {
              validStatus = false;
              message = `File size is too large. Allowed limit: ${Common.VIDEO_FILE_MAX_SIZE}MB.`;
          }
      }
      if (this.$(target).attr('id') == 'upload-banner-image' && !validStatus) {
        this.customErrorMessage(message, this.$('.file-name'));
        this.$('.file-name').hide()
        return false;
      }else if(!validStatus) {
        this.customErrorMessage(message, this.$('.resource-name'));
        this.$('.resource-name').hide()
        return false;
      }

      if (this.$(target).attr('id') == 'upload-banner-image') {
        this.$('#banner-image-preview').attr('src', URL.createObjectURL(media));
        this.$(target).parent().addClass('image-added').find('.file-name').text(media.name);
      }else {
        if (type == 'image') this.$('#upload-resource-preview').attr('src', URL.createObjectURL(media));
        this.$(target).parent().addClass('resource-added').
          find('.resource-name').removeClass('hide').text(media.name);
        this.$('#resource-error-message').addClass('hide');
      }
    },    
    
  });

  return editView;
});
