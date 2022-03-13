import React, { Fragment } from 'react'

const Demo = (props) => {

    let demo = props.demos.map(({disabled, slug, walkthrough_id, name, is_selected}, i) => {
        return  (
            <li key={slug} className={`${disabled ? 'disabled' : ''}`} data-item="chapter" data-id={walkthrough_id} data-slug={slug} data-name={name}>
                <div className="parentblock">
                    <span className="demoIcon"></span>
                    <span className="siteMapTitle">{name}</span>
                    <input onChange={props.updateRelatedContentId} id={`tree-${slug}`} slug-id={slug} type="checkbox" checked={`${props.pitchAssetIds.includes(walkthrough_id) ? 'checked' : ''}`} className="css-checkbox" />
                    <label htmlFor={`tree-${slug}`} className="css-label"></label>
                </div>
            </li>
        )
    });

    return (
        <Fragment>
            {demo}
        </Fragment>
    ) 
}

export default Demo
