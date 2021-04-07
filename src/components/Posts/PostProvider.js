//handles all Post data- getPosts, getPostsById, getPostsByUser, getPostByTag, getTagsByPost, getPostByCat, addPost, updatePost, deletePost
import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([{"category":{"id":"90D0BD6F-BA4F-4594-BEFD-A1927CB6A2EA","label":"Science"},"content":"this is a test post to see if this thing is working","publicationDate":"2021-03-29T00:00:00Z","id":"77CA60D4-1893-42FA-9692-22CD0FE04773","author":{"username":"conall@gmail.com","profileImageUrl":"NA","id":"1CB2F169-E173-44D3-B6EB-AB17E21B1A73","bio":"Conall","passwordHash":"$2b$12$l29j84xUSjis\/aZYR.AH3e2fQPNCyrVIcyyKTT5AM8QBupQvlRV3a"},"title":"my first test post","approved":true,"imageUrl":"www.apple.com"}])
      
    const [post, setPost] = useState({user:{user:{}}})
    const [postTags, setPostTags] = useState([{tag:{}}])

    const getPosts = () => {
        return fetch("http://127.0.0.1:8080/posts" , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostById = (id) => {
        return fetch(`http://127.0.0.1:8080/posts/${id}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
    }

    const getPostByUser = (userId) => {
        return fetch(`http://127.0.0.1:8080/posts?user_id=${userId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",   
            }
          
          })
            .then(res => res.json())
    }

    const getPostByTag = (tagId) => {
        return fetch(`http://127.0.0.1:8080/posts?tag_id=${tagId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            .then(setPostTags)
    }

    const getTagsByPost = (postId) => {
        return fetch(`http://127.0.0.1:8080/posttags?post_id=${postId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            .then(setPostTags)
    }

    const getPostByCat = (categoryId) => {
        return fetch(`http://127.0.0.1:8080/posts?category_id=${categoryId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            //.then(setPosts)
    }

    const addPost = post => {
        return fetch("http://127.0.0.1:8080/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
              },
            body: JSON.stringify(post)
        })
          .then(res => res.json())     
    }

    const updatePost = post => {
        return fetch(`http://127.0.0.1:8080/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const deletePost = (postId) => {
        return fetch(`http://127.0.0.1:8080/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            },
        body: JSON.stringify(postId)
        })
            .then(getPosts)
    }
    const approvePost = (postId) => {
      return fetch(`http://localhost:8000/posts/${postId}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,  
        },
      })
      .then(getPosts)
    }

    return (
        <PostContext.Provider value={{
            post, setPost, posts, addPost, approvePost,  getPosts, setPosts,
            getPostById, updatePost, getPostByTag, getPostByCat, getPostByUser,
            deletePost, postTags, getTagsByPost      
        }}>
            {props.children}
        </PostContext.Provider>
    )
}