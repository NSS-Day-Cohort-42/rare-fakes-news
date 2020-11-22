//form that allows users to create and edit a post
import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "./PostProvider";
import { CategoryContext } from "../Categories/CategoryProvider";
import { TagContext } from "../Tags/TagProvider";
import { TagPostContext } from "../Tags/TagPostProvider";
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Heading,
  Select,
  TextArea,
  TextInput,
} from "grommet";
import { Edit, Save } from "grommet-icons";

export const PostForm = (props) => {
  const {
    addPost,
    updatePost,
    getPostById,
    postTags,
    getTagsByPost,
  } = useContext(PostContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { tag, tags, getTags } = useContext(TagContext);
  const { createTagPost, deleteTagPost } = useContext(TagPostContext);

  const [postObj, setPostObj] = useState({}); //defines and sets the state of the postObj in this module
  const [checkedState, setCheckedState] = useState([]);

  const editMode = props.match.url.split("/")[2] === "edit"; //checks url to see if editMode
  const postId = parseInt(props.match.params.postId);
  let filteredTrue = [];
  let checkedTagsArray = [];
  const postTagsArrayToObj = {};

  useEffect(() => {
    getCategories();
    getTags();
    if (editMode) {
      getPostById(postId).then(setPostObj);

      getTagsByPost(postId)
        .then(
          postTags.forEach((pt) => {
            postTagsArrayToObj[pt.tag_id] = true;
          })
        )
        .then(setCheckedState(postTagsArrayToObj));
    }
  }, []);

  const handleControlledInputChange = (browserEvent) => {
    const newPost = Object.assign({}, postObj);
    browserEvent.target.name === "category_id"
      ? (newPost[browserEvent.target.name] = browserEvent.value)
      : (newPost[browserEvent.target.name] = browserEvent.target.value);
    setPostObj(newPost);
  };

  function handleTagChange(event) {
    const value = event.target.checked;

    setCheckedState({
      ...checkedState,
      [event.target.name]: value,
    });
  }

  const constructPost = (evt) => {
    evt.preventDefault();

    if (editMode) {
      updatePost({
        id: postObj.id,
        title: postObj.title,
        content: postObj.content,
        category_id: parseInt(postObj.category_id),
        publication_date: postObj.publication_date,
        image_url: postObj.image_url,
      })
        .then(
          postTags.forEach((tagPostObj) => {
            deleteTagPost(tagPostObj.id, tagPostObj.post_id);
          })
        )
        .then(() => {
          const tagPostPromises = []; //empty array of possible TagPosts

          Object.keys(checkedState).forEach((key) =>
            checkedTagsArray.push({
              tagId: parseInt(key),
              checked: checkedState[key],
            })
          );

          filteredTrue = checkedTagsArray.filter((t) => t.checked === true);

          checkedTagsArray.filter((filteredObj) => {
            return filteredObj.tagId;
          });

          filteredTrue.map((t) => {
            tagPostPromises.push(
              createTagPost({
                tag_id: parseInt(t.tagId),
                post_id: postObj.id,
              })
            ); //push any newly created tags to promises array
          });

          Promise.all(tagPostPromises).then(() => {
            props.history.push(`/posts/${postId}`);
          });
        });
    } else {
      const jsonDate = new Date(Date.now()).toJSON().slice(0, 10);
      addPost({
        title: postObj.title,
        content: postObj.content,
        category_id: parseInt(postObj.category_id),
        publication_date: jsonDate,
        image_url: postObj.image_url,
      }).then((postObj) => {
        const tagPostPromises = []; //empty array of possible TagPosts

        Object.keys(checkedState).forEach((key) =>
          checkedTagsArray.push({
            tagId: key,
            checked: checkedState[key],
          })
        );

        filteredTrue = checkedTagsArray.filter((t) => t.checked === true);

        filteredTrue.map((t) => {
          tagPostPromises.push(
            createTagPost({
              tag_id: parseInt(t.tagId),
              post_id: postObj.id,
            })
          ); //push any newly created tags to promises array
        });

        console.log("tagPostPromises", tagPostPromises);
        Promise.all(tagPostPromises).then(() => {
          props.history.push(`/posts/${postObj.id}`);
        });
      });
    }
  };

  console.log(postObj);

  return (
    <>
      {editMode ? (
        <Heading level="2">Edit Post</Heading>
      ) : (
        <Heading level="2">New Post</Heading>
      )}

      <Form>
        <Box width="medium">
          <FormField>
            <TextInput
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={postObj.title}
              onChange={handleControlledInputChange}
            ></TextInput>
          </FormField>
        </Box>
        <Box width="large">
          <FormField>
            <TextInput
              type="text"
              name="image_url"
              className="form-control"
              placeholder="Image URL"
              value={postObj.image_url}
              onChange={handleControlledInputChange}
            ></TextInput>
          </FormField>
        </Box>
        <Box width="xlarge" height="medium">
          <FormField contentProps={{ width: "xlarge", height: "medium" }}>
            <TextArea
              fill="true"
              type="text"
              name="content"
              className="form-control"
              placeholder="Article content"
              value={postObj.content}
              onChange={handleControlledInputChange}
            ></TextArea>
          </FormField>
        </Box>
        <Box name="categoriesAndTags" direction="row-responsive">
          <Box margin="small" width="small" basis="1/3">
            <FormField>
              <Select
                id={categories.id}
                name="category_id"
                placeholder="Categories"
                labelKey="label"
                valueKey={{ key: "id", reduce: true }}
                options={categories}
                onChange={handleControlledInputChange}
              />
            </FormField>
          </Box>
          <Box
            className="container--checkboxes"
            direction="row-responsive"
            margin="medium"
            wrap={true}
          >
            {tags.map((t) => (
              <Box
                key={t.id}
                className="checkboxGroup"
                margin="xsmall"
                direction="row-responsive"
              >
                <CheckBox
                  label={t.label}
                  type="checkbox"
                  name={t.id}
                  value={t.id}
                  checked={checkedState[t.id]}
                  onChange={handleTagChange}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box justify="end" margin="medium" width="small">
          {editMode ? ( //if in edit mode, displays a Save button, otherwise displays a Publish button
            <Button
              fill={false}
              primary
              icon={<Save />}
              label="Save"
              onClick={(evt) => {
                constructPost(evt);
              }}
            />
          ) : (
            <Button
              fill={false}
              primary
              icon={<Edit />}
              label="Publish"
              onClick={(evt) => {
                constructPost(evt);
              }}
            />
          )}
        </Box>
      </Form>
    </>
  );
};
