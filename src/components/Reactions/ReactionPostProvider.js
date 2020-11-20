//module to handle all data manipulation of ReactionPost objects- getReactionPosts, createReactionPosts
import React, { useState } from "react"
export const ReactionPostContext = React.createContext()

export const ReactionPostProvider = (props) => {
    const [ReactionPosts, setReactionPosts] = useState([])
    const [ReactionPost, setReactionPost] = useState({})

    const getReactionPosts = () => {
        return fetch("http://localhost:8000/postreactions", { 
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(setReactionPosts)
    }

    const createReactionPost = ReactionPost => {
        return fetch("http://localhost:8000/postreactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(ReactionPost)
        })
            .then(res => res.json())
            .then(getReactionPosts)
    }

    return (
        <ReactionPostContext.Provider value={{
            ReactionPost, setReactionPost, ReactionPosts, getReactionPosts,
            setReactionPosts, createReactionPost
        }}>
            {props.children}
        </ReactionPostContext.Provider>
    )
}