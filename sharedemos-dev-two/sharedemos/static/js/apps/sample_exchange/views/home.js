"use strict";

import Backbone from "backbone";
import $ from "jquery";
import _ from "underscore";

import Common from "../../../tenant/common";
import HomeTemplate from "../templates/home.handlebars";
import SampleExchange from "../models/sample_exchange";
import SamplePreview from "../templates/sample_preview.handlebars";


class HomeView extends Backbone.View {

    constructor() {
        super();
        this.sampleDataSet = {}
        this.samplesList = []
    }

    el() {
        return "#block_container";
    }

    events() {
        return {
            "click .actions .download": Common.downloadSample,
            "click ul.sorting-options li": "sortSamplesBy",
            "click .filter-options tr td input": "selectFilter",
            "mouseleave .filter-options": "selectAllSamples"
        }
    }

    initialize() {
        this.load();
    }

    load() {
        let samples = new SampleExchange();
        let root = this;
        root.$el.html(
            `<img class="loading-icon" src="/static/images/vmware/loading.gif" />`
        );
        samples.fetch({
          success(response) {
            if (response.attributes.all_samples.length) {
                // sampleDataset is object used to filter and render the data.
                root.sampleDataSet = {}
                for (let sample of response.attributes.all_samples || []) {
                  root.sampleDataSet = {...root.sampleDataSet, ...sample}
                }
                root.$el.html(HomeTemplate(response.attributes.samples_api_data));
                root.loadSamples();
            }
            else {
                root.$el.html(
                    `<div class='no-content'>NO CONTENT</div>`);
            }
            Common.logSampleExchangeActivity();
          },
          error(xhr, status_code, message){
            console.log(xhr, status_code, message);
          },
        })
    }

    loadSamples() {
        let filters = this.getFilters();
        this.samplesList = [];
        for (let filter of filters) {
          this.samplesList =[...this.samplesList, ...this.sampleDataSet[filter] || []]
        }
        this.samplesList = _.uniq(this.samplesList, "id");
        this.sortSamples();
        this.renderSamples();
    }

    getFilters() {
        //get filter parameters name which are checked.
        return _.map(this.$(".filter-list .tags:checked"), _el => _el.value);
    }

    sortSamples() {
        let filterAttr = this.$("ul.sorting-options li.active").attr("data-item");
        if (filterAttr == "author-name")
          this.samplesList = _.chain(this.samplesList)
            .sortBy(sample => sample.author.fullName.toLowerCase())
            .value();
        else {
          this.samplesList = _.sortBy(this.samplesList, filterAttr);
        }
        if (filterAttr == "downloadCount" || filterAttr == "lastUpdated") {
          this.samplesList.reverse();
        }

        for (let sample of this.samplesList) {
          sample.name = sample.name.trim();
          sample.recentlyUpdated = Common.getDateDifference(
            new Date(sample.lastUpdated)
          );
          sample.createdAt = Common.getDateDifference(new Date(sample.created));
        }
    }

    sortSamplesBy(event) {
        this.$("ul.sorting-options li").removeClass("active");
        this.$(event.currentTarget).addClass("active");
        this.sortSamples();
        this.renderSamples();
    }

    renderSamples() {
        this.$(`.sample_count span`).text(`${this.samplesList.length}`);
        this.$(".sample-holder").html(
          SamplePreview({ samples: this.samplesList })
        );
    }

    selectAllSamples() {
        /*If 'All samples' is deselected and and leave from the dropdown,
              show all the samples by default*/
        if (!this.$("input[name=filter]:checked").length) {
          this.$(`#selected-filter`).text("All Samples");
          this.$("input[name=filter]").prop("checked", true);
        }
        this.loadSamples();
    }

    selectFilter(event) {
        const filtersAvailable = this.$("input[data-filter]").length;
        let filtersChecked = 0;
        if (this.$(event.target).attr("id") === "all") {
          this.$("input[data-filter]").prop(
            "checked",
            this.$("#all").prop("checked")
          );
        } else {
          filtersChecked = this.$("input[data-filter]:checked").length;
          this.$("#all").prop("checked", filtersAvailable === filtersChecked);
        }
        if (this.$("#all").prop("checked")) {
          this.$(`#selected-filter`).text("All Samples");
        } else {
          filtersChecked = this.$("input[data-filter]:checked").length;
          if (filtersChecked === 1) {
            this.$(`#selected-filter`).text(
              this.$("input[data-filter]:checked").val()
            );
          } else {
            this.$(`#selected-filter`).text(`${filtersChecked} selected`);
          }
        }
        this.loadSamples();
        }
}

export default HomeView;
