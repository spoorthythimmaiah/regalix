import React, { Fragment } from 'react'
import Playlist from './Playlist'

const Section = (props) => {

    const toggleSection = (e) => {
        e.currentTarget.classList.toggle('expanded');
        e.currentTarget.parentElement.nextElementSibling.classList.toggle('asset-item');
    }

    let section = props.sections.map(({disabled, slug, name, children, playlists}, i) => {
        return  (<li key={slug} className={`${disabled ? 'disabled' : ''}`} data-item="section" data-slug={slug} data-name={name}>
                    <div className="parentblock">
                        <span className="expandSection" onClick={toggleSection}></span>
                        <span className="siteMapTitle">{name}</span>
                    </div>

                    <ul className="section asset-item" id={slug}>
                        {children ? <Section pitchAssetIds={props.pitchAssetIds} updateRelatedContentId={props.updateRelatedContentId} sections={children} /> : null} 
                        {playlists ? <Playlist pitchAssetIds={props.pitchAssetIds} updateRelatedContentId={props.updateRelatedContentId} slug={slug} playlists={playlists} /> : null} 
                    </ul>
                </li>)
    });

    return (
        <Fragment>
            {section}
        </Fragment>
    )      
}

export default Section
