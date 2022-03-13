import React, { Fragment } from 'react'
import Section from './Section';
import Playlist from './Playlist';

const Category = (props) => {

    const toggleSection = (e) => {
        e.currentTarget.classList.toggle('expanded');
        e.currentTarget.parentElement.nextElementSibling.classList.toggle('asset-item');
    }

    let category = props.siteMapData.map(({disabled, slug, name, children, playlists}, i) => {
            return  (<li key={slug} className={`sitemap-item ${disabled ? 'disabled' : ''}`} data-item="category" data-slug={slug} data-name={name}>
                        <div className="parentblock">
                            <span className="expandSection" onClick={toggleSection}></span>
                            <span className="siteMapTitle">{name}</span>     
                        </div>

                        <ul className="category asset-item" id={slug}>
                            {children ? <Section pitchAssetIds={props.pitchAssetIds} updateRelatedContentId={props.updateRelatedContentId} sections={children} /> : null} 
                            {playlists ? <Playlist pitchAssetIds={props.pitchAssetIds} updateRelatedContentId={props.updateRelatedContentId} slug={slug} playlists={playlists} /> : null} 
                        </ul>
                    </li>)
        });
    
    return (
        <Fragment>
            {category}
        </Fragment>
    )
}

export default Category
