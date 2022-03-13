import React from 'react'

const RelatedContent_html = (props) => {
    const relatedContentWrapper = {
        marginTop: "28px"
    }
    const title = {
        color: "#3e4462",
        fontSize: "12px",
        fontWeight: "700",
        textTransform: "uppercase"
    }
    const item = {
        borderRadius: "8px",
        backgroundColor: "#eff2f6",
        color: "#18214d",
        fontSize: "20px",
        fontWeight: "700",
        display: "block",
        padding: "20px 26px",
        cursor: "pointer",
        marginTop: "9px",
    }
    const chapters = props.content && props.content.map((chapter) => {
        return (
            <li key={chapter.slug}>
                <a target="_blank" href={chapter.url} style={item}>
                    {chapter.name}
                </a>
            </li>
        )
    })
    return (
        props.content && props.content.length ?
            <div style={relatedContentWrapper}>
                <h6 style={title}>Related Content</h6>
                <ul>
                    {chapters}
                </ul>
            </div> :
            null
    )
}

export default RelatedContent_html
