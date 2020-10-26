import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { ReactionList } from "../Reactions/ReactionList"




export const PostDetails = (props) => {
    const { getPosts, getPostById, post, setPost } = useContext(PostContext)

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)


    }, [])



    return (
        <>
        <section className="post">
            <h3 className="post__title">{post.title}</h3>
            <div className="post__content">{post.content}</div>
            <div className="post_date">Published on: {new Date(post.date).toLocaleDateString('en-US')}</div>
            <div className="post_author">Author: {post.user.display_name}</div>

        
        </section>
        <ReactionList {...props}/>
        </>
    )
}