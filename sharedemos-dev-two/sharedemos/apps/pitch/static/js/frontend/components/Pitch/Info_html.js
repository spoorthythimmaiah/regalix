import React, { Fragment, useEffect } from "react";
import Tags from "../List/Tags";
import RelatedContent_html from "./RelatedContent_html";
import axios from '../../../dashboard/containers/common/AxiosConfig/axios'

const Info_html = (props) => {

    useEffect(() => {
        handlePitchActivity()
    },[])

    const handlePitchActivity = () => {
        let {uuid, version} = props
        let data = {
            uuid,
            version
        }
        axios({
            method: 'POST',
            url: '/api/pitch-activity',
            data: data
        })
        .catch(response => console.log(response));
    }

    return (
        <Fragment>
            <a className="go-back" href='/pitch'>
                <img src="/static/images/pitch/nav-arrow.png" />
            </a>
            <div className="logo">
                <img title="logo" src={document.logo} />
            </div>
            <article className="container info-wrapper">
                <section className="row">
                    <section className="info-left col-xs-12 col-md-5">
                        <div className="info-logo">
                            <img className="img-responsive img-rounded" src={`${props.thumbnail ? props.thumbnail.url : '/static/images/pitch/default-icon.png'}`} />
                        </div>
                        <div className="info-sections-list">
                            <h4>Sections in This Pitch ({props.sections.length})</h4>
                            <p className="text-muted">These are the sections you'll need to cover in 
                            this pitch.</p>
                            <ul>
                                {props.sections.map(({title}, i) => (
                                    <li key={i}>
                                        - {title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    <section className="info-right info-left col-xs-12 col-md-7">
                        <Tags tags={props.tags} />
                        <h1>{props.title}</h1>
                        <p>{props.description}</p>
                        <RelatedContent_html content={props.relatedContent} />
                        <div onClick={() => props.toggleInfoPage()} className="start-pitch-btn">
                            <span>Start Pitch</span>
                            <img src="/static/images/pitch/nav-arrow.png" />
                        </div>
                    </section>
                </section>
            </article>
        </Fragment>
    )
}

export default Info_html

