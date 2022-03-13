'use strict';

import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';

import '../../../helpers/handlebars/i18n';
import Common from '../../../tenant/common';
import SampleExchange from '../models/sample_exchange';
import sampleTemplate from '../templates/sample.handlebars';

class SampleView extends Backbone.View {

    constructor (sampleId) {
        super(sampleId);
    }

    el() {return '#main_container';}

    events() {
        return {
            'click .sample-holder .download': Common.downloadSample
        }
    }

    initialize(sampleId) {
        this.$("#block_container").html(
            `<img class="loading-icon" src="/static/images/vmware/loading.gif" />`
        );
        let root = this;
        let sample = new SampleExchange({id: sampleId});
        sample.fetch({
            success(model, response) {
                if (!response) {
                    root.$("#block_container").html(
                        `<div class='no-content'>NO CONTENT</div>`);
                    return;
                }
                response.lastUpdated = Common.getDateDifference(new Date(response.lastUpdated));
                root.$('#block_container').html(sampleTemplate({
                    'sample' : response,
                    'sample_page_title': document.sample_page_title
                }));

                root.$('#block_container .sample-content').append(
                    $.parseHTML(
                        `${response.readmeHtml || ''}${response.repositoryReadmeHtml || ''}`)
                );
                root.$('.sample-content a').attr('target','_blank');

                for (let tag of response.tags || []) {
                    root.$('.tag-holder').append(`<div class="tag">  ${tag.name} </div>`);
                }

                root.fixImages();
                Common.logSampleExchangeActivity({
                    sample_id: response.id,
                    sample_name: response.name,
                    sample_author: response.author.fullName
                });
            }
        });
    }

    async fixImages() {
        await this.$('.sample-content').find('img').each((index, ele)=> {
            let src = $(ele).attr('src');
            if(src.indexOf('https://') == -1 && src.indexOf('http://') == -1 ){
                 $(ele).attr('src', `https://code.vmware.com${src}`);
            }
        });
    }
}

export default SampleView;
