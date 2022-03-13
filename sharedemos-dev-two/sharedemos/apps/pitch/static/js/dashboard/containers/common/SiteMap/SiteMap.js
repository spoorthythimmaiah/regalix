import React, { Component, Fragment } from 'react';
import { each, omit, difference } from 'underscore';
import axios from '../AxiosConfig/axios';
import './sitemap.css';
import Category from './Category';

export default class SiteMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            siteMap: [],
            updatedSiteMapData: [],
            restrictedToGroupIds: [],
            pitchAssetIds: [],
            relatedContent: this.props.related_content
        }
        this.selectedContent = []
    }

    componentDidMount() {
        this.props.restrictedToGroupIds()
        .then((restrictedToGroupIds) => {
            this.setState({
                restrictedToGroupIds
            }, () => {
                this.getSiteMapData()
            })
        })
    }

    async fetchSiteMapData() {
        await axios.get('/api/product-tree')
        .then(response => {
            this.setState({
                siteMap: response.data
            })
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    getSiteMapData() {
        this.fetchSiteMapData()
        .then(() => {
            let {siteMap, restrictedToGroupIds, relatedContent} = this.state
            let updatedSiteMapData = this.updateSitemapData([...siteMap], [...restrictedToGroupIds]);
            
            // preselecting the Pitch assets in tree structure
            let pitchAsset = relatedContent && relatedContent.length && [...relatedContent]
            let pitchAssetIds = [];
            each(pitchAsset, (asset) => {
                pitchAssetIds.push(asset.id);
            })
            updatedSiteMapData = pitchAssetIds && this.preSelectPitchAssets(updatedSiteMapData, pitchAssetIds);

            this.setState({
                dataLoaded: true,
                updatedSiteMapData,
                pitchAssetIds
            })
        })
        .catch((e) => {
            console.log(e)
        })
    }

    updateSitemapData(siteMapData, restrictedToGroupIds) {
        each(siteMapData, (elem, index) =>{
            var isAllowed = difference(restrictedToGroupIds, elem.groups).length === 0;
            if (!isAllowed) {
                elem.disabled = true;
                elem = omit(elem, "children", "playlists", "demos");
            } else {
                if( elem.children && elem.children.length > 0 ){
                    elem.children = this.updateSitemapData(elem.children, restrictedToGroupIds);
                } else if( elem.playlists && elem.playlists.length > 0 ){
                    elem.playlists = this.updateSitemapData(elem.playlists, restrictedToGroupIds);
                } else if( elem.demos && elem.demos.length > 0 ){
                    elem.demos = this.updateSitemapData(elem.demos, restrictedToGroupIds);
                }
            };
        });
        return siteMapData;
    }

    preSelectPitchAssets(updatedSiteMapData, pitchAssetIds){
        each(updatedSiteMapData, (data) => {
            if(data.children && data.children.length){
                data.children = this.preSelectPitchAssets(data.children, pitchAssetIds);
            }
            each(data.playlists, (playlist) => {
                each(playlist.demos, (chapter) => {
                    if(pitchAssetIds.includes(chapter.walkthrough_id))
                        chapter.is_selected = true;
                });
            });
        });
        return updatedSiteMapData;
    }

    updateRelatedContentId(e) {
        let selectedAssetId = parseInt(e.currentTarget.parentNode.offsetParent.dataset.id);
        let pitchAssetIds = [...this.state.pitchAssetIds]
        if(pitchAssetIds.includes(selectedAssetId)) {
            pitchAssetIds = pitchAssetIds.filter((id) => id != selectedAssetId)
        } else {
            pitchAssetIds.push(selectedAssetId)
        }
        this.setState({
            pitchAssetIds
        })
    }

    updateRelatedContent() {
        let relatedContent = null
        if(this.state.pitchAssetIds.length) {
            this.getRelatedChapter(this.state.siteMap)
            this.setState({
                relatedContent: this.selectedContent
            }, () => {
                this.props.updateRelatedContent([...this.state.pitchAssetIds], this.state.relatedContent)
            })
        } else {
            this.props.updateRelatedContent([], null)
        }
        
    }

    getRelatedChapter(siteMap){
        each(siteMap, (data) => {
            if(data.children && data.children.length){
                data.children = this.getRelatedChapter(data.children);
            }
            each(data.playlists, (playlist) => {
                each(playlist.demos, (chapter) => {
                    if(this.state.pitchAssetIds.includes(chapter.walkthrough_id)) {
                        let selectedChapter = {
                            id: chapter.walkthrough_id,
                            name: chapter.name
                        }
                        this.selectedContent.push(selectedChapter)
                    }
                });
            });
        });
    }

    render() {
        let updatedSiteMapData = this.state.dataLoaded ?
                                    this.state.updatedSiteMapData.length ? 
                                        <Category
                                            siteMapData={this.state.updatedSiteMapData}
                                            updateRelatedContentId={(e) => this.updateRelatedContentId(e)}
                                            pitchAssetIds={this.state.pitchAssetIds}
                                        /> :
                                        <div>No Data</div> :
                                    <div className="loading-data"></div>
        return (
            <Fragment>
                <ul id="chapters-list-wrap" className="sitemap-tree">
                    {updatedSiteMapData}
                    <div className="choose-assets" onClick={() => this.state.dataLoaded && this.updateRelatedContent()}>choose</div>
                </ul>
            </Fragment>
        )
    }
}