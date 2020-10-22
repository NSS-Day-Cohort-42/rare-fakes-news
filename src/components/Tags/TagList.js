import React, { useState, useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import Tag from "./Tag"
import {Link} from "react-router-dom"


export const TagList = ({ props }) => {
    const { getTags, tags} = useContext(TagContext)

    //do I need a useState hook??

    // Initialization effect hook -> Go get tag data
    useEffect(() => {
        getTags()
    }, [])

    return (
        <div style={{ marginTop: "2rem"}}>
            <h3>Tags</h3>
            <div className="tags">
                {
                    tags.map(tag => <Tag key={tag.id} tag={tag} />)
                }
            </div>
            <Link className="tagform__link" to="/tags/create">Create a new tag</Link>
        </div>
    )
}