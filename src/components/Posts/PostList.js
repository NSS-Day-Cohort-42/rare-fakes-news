//child of HomeList, list of all posts, user can delete only their own post
import React, { useContext, useEffect } from "react"
import {Link} from "react-router-dom"
import { PostContext } from "./PostProvider"



export const PostList = (props) => {
    const {posts, getPosts} = useContext(PostContext)

    useEffect(() => {
       getPosts()
    },[])

    return (
        <>
        <h2>Posts</h2>
        <Link to={{pathname:`posts/create`}}>
        create post
        </Link>
        {
            posts !== [] ? posts.map(p => {
                return <div key={p.id} className="container__card">
                    <div className="container__cardContent">    
                        <Link to={{pathname:`/posts/${p.id}`}}>
                        <p>{p.title}</p>
                        </Link>
                        <p>{p.user.user.first_name}</p>
                        {p.category==null? "" :<p>{p.category.label}</p>}
                    </div>
                </div>
            }).reverse() : null
        }
        </>
    )
}