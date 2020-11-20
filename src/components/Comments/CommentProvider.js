import React, {useState} from "react"

export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])
    
    const getComments = (postId) => {
        return fetch(`http://localhost:8000/comments?post_id=${postId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }})
            .then(res => res.json())
            .then(setComments)
    }

    const getCommentById = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }})
            .then(res => res.json())
            .then(setComments)
    }

    const addComment = comment => {
        return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        },
        body: JSON.stringify(comment)
    })
    .then(getComments)
}

    const deleteComment = (commentId) => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
        })
            .then(getComments)
    }

    const updateComment = comment => {
        return fetch(`http://localhost:8000/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
    }

return (
    <CommentContext.Provider value={{
        addComment, getComments, comments, setComments, deleteComment, getCommentById, updateComment
    }}>
        {props.children}
        </CommentContext.Provider>
)
}