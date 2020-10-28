//shows user their own posts in MyPosts view, allows them to delete a post
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { UserContext } from "../Profiles/UserProvider"
import { DeleteItem } from "../utils/DeleteItem";

export const UsersPosts = (props) => {
  const { posts, getPostByUser } = useContext(PostContext);
  const { loggedInUser } = useContext(UserContext);


  const [usersPosts, setUsersPosts] = useState([]);

  useEffect(() => {
    getPostByUser(loggedInUser)
  }, []);

  

  useEffect(() => {
    const filteredPostsByUser = posts.filter(
      (post) => post.user_id === loggedInUser
    );
    setUsersPosts(filteredPostsByUser);
  }, [posts, loggedInUser]);

  return (
    <>
      <h2>My Posts</h2>
      {posts.map((p) => {
        return (
          <div key={p.id}>
            <p>
              <strong>{p.title}</strong>
            </p>
            <p>{p.user.display_name}</p>
            <p>{p.category.type}</p>
            {p.user_id === loggedInUser ? <DeleteItem postId= {p.id}/> : <></>}
          </div>
        );
      }).reverse()}
    </>
  );
};
