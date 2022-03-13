import React from 'react'

const Tags = (props) => {
    let tags = [], uniqueTags = []
    props.tags.map((tag) => {
        tags = [...tags,...tag.values]
    })
    uniqueTags = Array.from(new Set(tags))
    return tags.length ? (
        <ul className="tags">
            {
                uniqueTags.map((tag, i) => (
                    <li key={i}>
                        {tag}
                    </li>
                ))
            }
        </ul>
    ) : null
}

export default Tags
