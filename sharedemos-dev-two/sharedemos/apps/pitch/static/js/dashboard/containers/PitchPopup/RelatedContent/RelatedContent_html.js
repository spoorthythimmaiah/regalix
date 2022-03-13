import React from 'react'

const selectedChapters = {
    marginTop: "50px"
}
const listItem = {
    display: "flex",
    marginBottom: "20px"
}
const counter = {
    color: "#302f34",
    minWidth: "35px",
    height: "35px",
    lineHeight: "35px",
    textAlign: "center",
    background: "#ebebeb",
    borderRadius: "50%",
    marginRight: "20px"
}
const title = {
    marginBottom: "10px",
    color: "#010006",
    display: "block",
}
const button = {
    color: "#9da3a6",
    background: "no-repeat",
    textTransform: "capitalize",
    padding: 0
}
const titleNoPointer = {
    marginBottom: "10px",
    color: "#010006",
    display: "block",
    cursor: "default"
}

const RelatedContent_html = (props) => {
    let chapters = props.relatedContent.map((chapter, i) => {
        return (
            <li style={listItem} key={i}>
                <div style={counter}>{i+1}</div>
                <div>
                    <h6>
                        {
                            chapter.url ?
                            <a style={title} href={chapter.url} target="_blank">{chapter.name}</a> :
                            <span style={title}>{chapter.name}</span>
                        }
                    </h6>
                    <button style={button} onClick={() => props.removeSelectedAsset(chapter.id)}>remove</button>
                </div>
            </li>
        )
    })
    return (
        <ul style={selectedChapters}>
            {chapters}
        </ul>
    )
}

export default RelatedContent_html
