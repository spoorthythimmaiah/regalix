import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import welcomeTemplate from '../templates/welcome.handlebars';
import addRepositoryTemplate from '../templates/create.handlebars';
import Repository from '../models/repositories';
import listRepositoriesTemplate from '../templates/list.handlebars';
import successTemplate from '../templates/success.handlebars';
import deleteTemplate from '../templates/delete.handlebars';
import errorMessageTemplate from '../templates/error_message.handlebars';
import loadingTemplate from '../templates/loading.handlebars';

const mainView = Backbone.View.extend({

    el: 'body',

    events: {
        "click .repository-type": "activateButton",
        "click .create-new.repositories, .edit-repository": "createRepositoryPopup",
        "click .close_full_popup": "closePopUp",
        "click .details-tabs [data-tab]": "toggleEditTabs",
        "click .details-tabs [data-tab=platform]": "platformTab",
        "keyup #create-repository input": "validateBasicInfoTab",
        "keyup #create-repository .email-validate": "validateEmail",
        "click #submit-button" : "navigateToBasicInfo",
        "submit form[name=create-repository]": "saveRepositories",
        "click .repository-detail .delete": "showDeleteRepositoryPopup",
        "click .delete-repository-popup  .delete": "deleteRepository",
        "click .form-footer .cancel": function() { this.$('.overlay').removeClass('popup-active')},
        "click #right-arrow": "goToPreviousTab"
    },  

    initialize() {
        this.listRepositories();
    },

    createRepositoryPopup(event) {
        let ele = $(event.currentTarget);
        let respositoryData = {
            isEdit : false,
        }

        if(ele.hasClass('edit-repository')){
            let connectorId = this.$(ele).parent().data("repository-slug");
            let repository = new Repository({id: connectorId});
         
            $.when(repository.fetch({
                async: false,
            })).done(function(response){
                const {name,  root_folder: rootFolder, site_url: siteUrl, username: email, notify_enabled: notify, sync_enabled: sync} = response;

                respositoryData = {name, rootFolder, siteUrl, email, notify, sync, isEdit: true, connectorId};
            })
      
        }
        this.$(".create-repository-wrap").html(addRepositoryTemplate(respositoryData));
        this.$('.full_popup_block, .full_popup_box').addClass('active');
        if(ele.hasClass('edit-repository')){
            this.$('[data-tab=platform]').removeClass('active');
            this.$('[data-tab=info-basic]').addClass('active');
            this.$('#submit-button').attr({value: 'configure', disabled: false}).addClass('active');
            this.$('.previous-button').hide();
        }
    },

    closePopUp() {
        this.$('.full_popup_block, .full_popup_box').removeClass('active');
        this.listRepositories();
    },

    platformTab(event) {
        this.$('input[value="basic info"], .repository-type').addClass('active');
        this.$('#submit-button').prop("disabled", false);
        this.$('#right-arrow').hide();
    },

    activateButton(){
        this.$('input[value="basic info"], .repository-type').addClass('active');
        this.$('#submit-button').prop("disabled", false);
    },

    toggleEditTabs(event) {
        let selectedTab = this.$(event.currentTarget).data('tab');
        this.$('[data-tab]').removeClass('active');
        this.$(`[data-tab=${selectedTab}]`).addClass('active');
        if(selectedTab == 'platform') {
            this.$('#submit-button').val('basic info');
        } else if(selectedTab == 'info-basic') {
            this.$('#submit-button').val('configure').removeClass('active');
            this.$('#right-arrow').css({'display': 'inline-flex'});
        } else {
           this.$('#submit-button').val('add integration').addClass('active');
        }
    },

    validateBasicInfoTab(event) {
        const fieldToValidate = this.$(event.currentTarget);
        const nickName = $(" input[name='nickname']");
        const url = $(" input[name='url']");
        const rootFolder = $(" input[name='root-folder']");
        const email = $(" input[name='email']");
        this.$('#submit-button').prop('disabled', true);

        fieldToValidate.val().length < 1 ? fieldToValidate.next().show() : fieldToValidate.next().hide();

        if (nickName.val().trim() && url.val().trim() && rootFolder.val().trim() && email.val().trim()) {
            this.$('[data-tab]').removeClass('active');
            this.$('[data-tab="info-basic"]').addClass('active');
            this.$('#submit-button').attr({value: 'configure', disabled: false}).addClass('active');
        } else {
            this.$('#submit-button').prop('disabled', true);
        }
    },

    validateEmail(e) {
        let emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;

        (emailRegex.test(this.$('.email-validate').val())) ? this.$('.email-validation').addClass('active') :this.$('.email-validation').removeClass('active');
    },

    navigateToBasicInfo(event){
        event.preventDefault();
        let selectedTab =  (this.$('#submit-button').val() == 'basic info') ? "info-basic" : "config-data";
        this.$('[data-tab]').removeClass('active');
        this.$(`[data-tab=${selectedTab}]`).addClass('active');
        if(selectedTab == 'platform') {
            this.$('[data-tab=info-basic]').addClass('active');
            this.$('#submit-button').val('basic-info').addClass('active');
        } else if(selectedTab == 'info-basic') {
            this.$('#submit-button').attr({value: 'configure', disabled: true}).removeClass('active');
            this.$('#right-arrow').css({'display': 'inline-flex'});
        } else {
            this.$('#submit-button').val('add integration').addClass('active');
            $(this).unbind(event);
        }
    },

    listRepositories() {
        let root = this;
        let repository = new Repository();

        repository.fetch({
            success(model, response) {
                if(response.length == 0) {
                    root.$('#repositories').html(welcomeTemplate());
                    return;
                } 
                root.$('#repositories').html(listRepositoriesTemplate(response));
            },
            error(model, response){
                console.log("error");
            }
            
        })
    },
    saveRepositories(event) {
        event.preventDefault();
        const name = $("input[name='nickname']").val();
        const url = $("input[name='url']").val();
        const rootFolder = $("input[name='root-folder']").val();
        const email = $("input[name='email']").val();
        const password = $("input[name='password']").val();
        const sync = $("#auto-sync").is(":checked");
        const notify = $("#notifications").is(":checked");
        const platform = this.$('#create-repository .platform-data .platform-name').text();
        const connectorId = this.$('#create-repository').data('repository-slug');
        let args = {
            name: name,
            site_url: url,
            root_folder: rootFolder,
            username: email,
            password,
            sync_enabled: sync,
            notify_enabled: notify,
            platform: platform,
        };
        if (connectorId){
            args.id = connectorId
        }
    
        // saving a repository
        let repository = new Repository(args);

        this.$('.full_popup_content').html(loadingTemplate());
        this.$('.overlay').addClass('popup-active');
        let root = this;
        repository.save(null, {
            success(model, response){
                if(response){
                    root.$('.full_popup_content').html(successTemplate());
                    root.$('.overlay').addClass('popup-active');
                    setTimeout(() => {
                        root.$('.overlay').removeClass('popup-active');
                        root.closePopUp();
                        window.location.reload();
                    }, 2000);
                }
            }, error(model, response){
                let message = response.responseJSON.message;
                if(response.responseJSON.message === "403 Forbidden"){
                    message = "Please varify your credentials";
                } else if(response.responseJSON.message == "404 Not Found") {
                    message = "site url not found";
                }
                root.$('.full_popup_content').html(errorMessageTemplate(message));
                root.$('.overlay').addClass('popup-active');
                
                setTimeout(() => {
                    root.$('.overlay').removeClass('popup-active');
                    root.closePopUp();
                    window.location.reload();
                }, 2000);
            }
        })
    },

    showDeleteRepositoryPopup(event){
        this.deleteId = this.$(event.currentTarget).parent().data("repository-slug");
        this.$('.overlay').html(deleteTemplate()).addClass('popup-active');
    },


    deleteRepository(event) {
        let repository = new Repository({id : this.deleteId});
        this.actionInProgress('delete-repository-popup');
        let root = this;
        repository.destroy({
            success(){
                root.actionSuccess('delete-repository-popup', false);
                root.listRepositories();               
            },
            error(xhr, status_code, error_message){
                root.actionFailed('delete-repository-popup');
            }
        })
    },

    // On submit - Animate progress
    actionInProgress(target){
        this.$(`.${target} .adding`).addClass("slide-in is-submitted");
    },
    
    // On submit - Failed
    actionFailed(target, status = 'failed', duration = 1000){
        setTimeout(() => {
            this.$(`.${target} .adding`).removeClass("slide-in is-submitted");
            this.$(`.${target} .${status}`).addClass("slide-in");
            setTimeout(() => {
                this.$(`.${target} .${status}`).removeClass("slide-in");
            }, duration);
        }, 1000);
    },
    
    // On submit - success
    actionSuccess(target, retain_popup){
        let root = this;
        this.$(`.${target} .adding`).removeClass("slide-in is-submitted");
        this.$(`.${target} .added`).addClass("slide-in");
        setTimeout(() => {
            this.$(`.${target} .added`).removeClass("slide-in");
            if(!retain_popup) root.$('.overlay').removeClass('popup-active');
        }, 1000);
    },

    goToPreviousTab(event) {
        let selectedTab = (this.$('#submit-button').val() == 'add integration') ? "basic-info" : "config-data";

        if(selectedTab == 'config-data'){
            this.$('[data-tab=info-basic]').removeClass('active');
            this.$('[data-tab=platform]').addClass('active');
            this.$('#submit-button').val('basic info');
            this.platformTab();
        } else {
            this.$('[data-tab=config-data]').removeClass('active');
            this.$('[data-tab=info-basic]').addClass('active');
            this.$('#submit-button').val('configure');
        }

    }
});

export default mainView;
