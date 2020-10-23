import React, { useEffect, useContext } from "react"
import {PostContext} from "./PostProvider"
import {CategoryContext} from "../Categories/CategoryProvider"
import { TagContext } from "../Tags/TagProvider"
import { TagPostContext } from "../Tags/TagPostProvider"


export const PostForm = () => {
    const {post, setPost, addPost} = useContext(PostContext)
    const {categories, getCategories} = useContext(CategoryContext)
    const {tags, getTags} = useContext(TagContext)
    const {TagPosts, TagPost, setTagPost, getTagPosts} = useContext(TagPostContext)

    useEffect(() => {
        getCategories()
        getTags()
    },[])

    const handleControlledInputChange = (browserEvent) => {
        const newPost = Object.assign({}, post)          
        newPost[browserEvent.target.name] = browserEvent.target.value 
        setPost(newPost)                                 
    }

    const constructPost = () => {
        addPost({
            title: post.title,
            content: post.content,
            category_id: post.category_id,
            date: Date.now(),
            user_id: parseInt(localStorage.getItem("rare_user_id")),
            approved: 1
        })
    }

return (
    <>
    <h2>hey</h2>
    <form>
        <fieldset>
            <div className="form-group">
                <label>Title:</label>
                <input type="text" name="title" className="form-control" 
                        placeholder="Post Title" value={post.title}
                        onChange={handleControlledInputChange}></input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label>Content:</label>
                <textarea type="text" name="content" className="form-control" 
                        placeholder="write your thoughts and feelings" value={post.content}
                        onChange={handleControlledInputChange}></textarea>
            </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="status">Category: </label>
                    <select name="status_id" value={post.category_id} className="form-control" onChange={handleControlledInputChange} >
                        <option value="0">select a category</option>
                        {
                            categories.map(c =>{
                                return <option key={c.id} value={c.id}>{c.type}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="status">Tags: </label>
                    <select name="status_id" value={TagPost.tag_id} className="form-control" onChange={handleControlledInputChange} >
                        <option value="0">select some tags</option>
                        {
                            tags.map(t =>{
                                return <option key={t.id} value={t.id}>{t.tag}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

        <button onClick={(evt) => {
                // evt.preventDefault()
                constructPost()
            }}>add post</button>
        </form>
    </>
)

}