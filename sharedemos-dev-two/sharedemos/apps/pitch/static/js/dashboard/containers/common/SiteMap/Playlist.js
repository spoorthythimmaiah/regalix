import React, { Fragment } from 'react'
import Demo from './Demo'

const Playlist = (props) => {
    let playlist = props.playlists.map(({disabled, playlist_id, name, demos}, i) => {
        return  (
            <li key={i} data-item="playlist" className={`${disabled ? 'disabled' : ''}`} data-slug={playlist_id} data-name={name}>
                <div className="parentblock">
                    <span className="playlistIcon"></span>
                    <span className="siteMapTitle">{name}</span>
                </div>
                <ul className="playlist" id={`${props.slug}_${playlist_id}`}>
                    {demos ? <Demo pitchAssetIds={props.pitchAssetIds} updateRelatedContentId={props.updateRelatedContentId} demos={demos} /> : null}
                </ul>
            </li>
        )
    });

    return (
        <Fragment>
            {playlist}
        </Fragment>
    ) 
}

export default Playlist
