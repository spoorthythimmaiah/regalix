import React, { useState, useEffect } from "react";
import axios from 'axios';

const Recommendations = () => {

    const [recommendations, setRecommendations] = useState()
    const [loadingStatus, setLoadingStatus] = useState(true)

    useEffect(() => {
        const csrfToken = document.querySelector("meta[name=csrf-token]").getAttribute('content');
        axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
        axios.get('/api/recommendations')
		.then(response => {
            if(response.data.status && response.data.status == 'FAILED') {
                setLoadingStatus(false)
            } else {
                setRecommendations(response.data)
            }
		})
		.catch(response => console.log(response));
    }, [])

    return recommendations ? (
            <ul>
                {recommendations.map(({breadcrumb, name, slug, thumbnail, url}) => (
                    <li key={slug}>
                        <figure>
                            <img src={thumbnail} />
                        </figure>
                        <div className="text-info">
                            <h3><a href={url} title={name}>{name}</a></h3>
                            <p title={breadcrumb}>{breadcrumb}</p>
                        </div>
                    </li>
                ))}
            </ul>
        ):(
            loadingStatus ? <div className="loading"></div> : <div className="pager text-muted">No Recommendations available!</div>
        )
}

export default Recommendations
