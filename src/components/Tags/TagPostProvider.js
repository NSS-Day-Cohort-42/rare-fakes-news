//handles all TagPost object data- getTagPosts, createTagPost, deleteTagPost
import React, { useContext, useState } from "react";
import {PostContext} from "../Posts/PostProvider"

export const TagPostContext = React.createContext();


export const TagPostProvider = (props) => {
  const [TagPosts, setTagPosts] = useState([]);
  const [TagPost, setTagPost] = useState({}); 
  
  const {getTagsByPost} = useContext(PostContext)

  const getTagPosts = () => {
    return fetch("http://localhost:8000/posttags", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setTagPosts);
  };

  const createTagPost = (TagPost) => {
    return fetch("http://localhost:8000/posttags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      },
      body: JSON.stringify(TagPost),
    })
      .then((res) => res.json())
  };

  const deleteTagPost = (tagPostId, postId) => {
    return fetch(`http://localhost:8000/posttags/${tagPostId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        }
    })
    .then(getTagPosts)
    .then(getTagsByPost(postId))
}




  return (
    <TagPostContext.Provider
      value={{
        TagPost,
        setTagPost,
        TagPosts,
        getTagPosts,
        setTagPosts,
        createTagPost,
        deleteTagPost
      }}
    >
      {props.children}
    </TagPostContext.Provider>
  );
};
