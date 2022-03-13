import _ from 'underscore';

const getSearchResults = (root) => {
    var searchText = root.$('input[name=search-site]').val();
    if(searchText.trim().length < 2) return root.renderSearchResults();
    let client = algoliasearch(document.algolia_app_id, document.algolia_search_key);
    var index = client.initIndex(document.algolia_tenant_index);
    var hitsPerPage = 20;
    var localeId = SDCookies.getItem('locale');
    if(localeId != document.defaultLocaleID){
        hitsPerPage = 120;
    }
    var searchParams = {
        hitsPerPage: hitsPerPage,
        filters: 'is_enabled=1'
    };

    // If usergroups then modify the filters as 'groups=1 OR groups=2 AND is_enabled=1'.
    if(document.userGroups){
        let groupsFilterList = [];
        _.each(document.userGroups, (grpId, idx) =>{
            groupsFilterList.push(`groups=${grpId}`);
        });
        let groupsFilterText = groupsFilterList.join(' OR ');
        searchParams.filters += ` AND ${groupsFilterText}`;
    }

    if (document.apps && document.apps.length){
        let appsList = [];
        _.each(document.apps, (app, index) => {
            appsList.push(`category:${app['unique_id']}`); 
        });
        searchParams.facetFilters = [appsList];
    }

    if(document.isUserAnonymous && document.isPrivate){
        searchParams.filters += " AND is_public=1";
    }

    if(searchText && searchText.startsWith("tags: ")){
        searchText = searchText.replace("tags: ", "");
        searchParams.restrictSearchableAttributes = 'tags';
        index.search(searchText, searchParams, (err, content) => {
            root.renderSearchResults(content);
            if(err) console.log(err.message);
        });
    }
    else{
        index.search(searchText, searchParams, (err, content) => {
            root.renderSearchResults(content);
            if(err) console.log(err.message);
        });
    }
}

export default getSearchResults;