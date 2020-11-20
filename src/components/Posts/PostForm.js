//form that allows users to create and edit a post
import React, { useEffect, useContext, useState } from "react"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../Categories/CategoryProvider"
import { TagContext } from "../Tags/TagProvider"
import { TagPostContext } from "../Tags/TagPostProvider"


export const PostForm = (props) => {
    const { addPost, updatePost, getPostById, postTags, getTagsByPost } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { tag, tags, getTags } = useContext(TagContext)
    const { createTagPost, deleteTagPost } = useContext(TagPostContext)

    const [postObj, setPostObj] = useState({}) //defines and sets the state of the postObj in this module
    const [checkedState, setCheckedState] = useState([])

    const editMode = props.match.url.split("/")[2] === "edit" //checks url to see if editMode
    const postId = parseInt(props.match.params.postId)
    let filteredTrue = []
    let checkedTagsArray = []
    const postTagsArrayToObj = {}

    useEffect(() => {
        getCategories()
        getTags()
        if (editMode) {
            getPostById(postId)
            .then(setPostObj)
            
            getTagsByPost(postId)
            .then(postTags.forEach(pt => {
                postTagsArrayToObj[pt.tag_id] = true
            }))
            .then(setCheckedState(postTagsArrayToObj))

            console.log("checkedState >>",checkedState)
        } 
    }, [])
    
    console.log("checkedState >>",checkedState)
    
            
    const handleControlledInputChange = (browserEvent) => {
        const newPost = Object.assign({}, postObj)
        newPost[browserEvent.target.name] = browserEvent.target.value
        setPostObj(newPost)
    }
          

    function handleTagChange(event) {
        const value = event.target.checked

        setCheckedState({
            ...checkedState,
            [event.target.name]: value
        })
    }


    const constructPost = (evt) => {
        evt.preventDefault()

        if (editMode) {
            updatePost({
                id: postObj.id,
                title: postObj.title,
                content: postObj.content,
                category_id: parseInt(postObj.category_id),
                publication_date: postObj.publication_date,
                image_url: postObj.image_url
            })
            .then(
                postTags.forEach(tagPostObj => {
                        deleteTagPost(tagPostObj.id, tagPostObj.post_id)}))
            .then(() => {
                const tagPostPromises = [] //empty array of possible TagPosts
                
                Object.keys(checkedState).forEach(key => 
                    checkedTagsArray.push({
                        tagId: parseInt(key),
                        checked: checkedState[key]
                    }))     
                    
                filteredTrue = checkedTagsArray.filter(t => t.checked === true)
                
                checkedTagsArray.filter(filteredObj => {
                    return filteredObj.tagId
                })                        
                        
                filteredTrue.map(t => {
                    tagPostPromises.push(
                        createTagPost({
                            tag_id: parseInt(t.tagId),
                            post_id: postObj.id
                        })
                    ) //push any newly created tags to promises array
                })                    

                Promise.all(tagPostPromises)
                .then(() => {
                    props.history.push(`/posts/${postId}`)
                })
            })
        } else {
            const jsonDate = ((new Date(Date.now())).toJSON()).slice(0, 10)
            addPost({
                title: postObj.title,
                content: postObj.content,
                category_id: parseInt(postObj.category_id),
                publication_date: jsonDate,
                image_url: postObj.image_url
            })
            .then((postObj) => {
                const tagPostPromises = [] //empty array of possible TagPosts
                
                Object.keys(checkedState).forEach(key => 
                    checkedTagsArray.push({
                        tagId: key,
                        checked: checkedState[key]
                })) 

                filteredTrue = checkedTagsArray.filter(t => t.checked === true)
                
                filteredTrue.map(t => {
                    tagPostPromises.push(
                        createTagPost({
                            tag_id: parseInt(t.tagId),
                            post_id: postObj.id
                        })
                    ) //push any newly created tags to promises array
                })

                Promise.all(tagPostPromises)
                .then(() => {
                    props.history.push(`/posts/${postObj.id}`)
                })            
            })
        }
    }

    return (
        <>
            {editMode
                ? <h2>Edit Post</h2>
                : <h2>New Post</h2>
            }
            
            <form>
                <fieldset>
                    <div className="form-group">
                        <input type="text" name="title" className="form-control"
                            placeholder="Title" value={postObj.title}
                            onChange={handleControlledInputChange}
                        >
                        </input>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <input type="text" name="image_url" className="form-control"
                            placeholder="Image URL" value={postObj.image_url}
                            onChange={handleControlledInputChange}
                        >
                        </input>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <textarea type="text" name="content" className="form-control"
                            placeholder="Article content" value={postObj.content}
                            onChange={handleControlledInputChange}
                        >
                        </textarea>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <select name="category_id" className="form-control"
                            value={postObj.category_id}
                            onChange={handleControlledInputChange}
                        >
                            <option value="0">Category Select</option>
                            {
                                categories.map(c => {
                                    return <option key={c.id} value={c.id}>{c.label}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>


                {editMode   //if in edit mode, displays a Save button, otherwise displays a Publish button
                    ? 
                        <button onClick={(evt) => {constructPost(evt)}}>
                            Save
                        </button>    
                    :
                        <button onClick={(evt) => {constructPost(evt)}}>
                            Publish
                        </button>
                }
                

                <div className="container--checkboxes">
                    {tags.map((t) => (
                        <div className="checkboxGroup">
                            <input
                                type="checkbox"
                                name={t.id}
                                value={t.id}
                                checked={checkedState[t.id]}
                                onChange={handleTagChange}
                            />
                            <label>
                                {" #"}{t.label}
                            </label>
                        </div>
                    ))}
                </div>

            </form>
        </>
    )

}