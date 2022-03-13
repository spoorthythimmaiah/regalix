import React from 'react'
import Initial from 'react-initial'
 
const initial = (props) => {
    if(!props.authors.length) {
        return null;
    }
    const authors = props.authors.map((author, i) => {
        return (
            <Initial 
                key={i}
                charCount={props.charCount}
                height={props.height}
                width={props.width}
                fontSize={props.fontSize}
                fontWeight={props.fontWeight}
                name={author} />
        )
    });
    return (
        <div className="authors">
            {authors}
        </div>
    )
}
 
export default initial;