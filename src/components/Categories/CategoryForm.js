//Form to let user create a new category
import React, { useEffect, useContext, useState, useHistory } from "react";
import { CategoryContext } from "./CategoryProvider";
import { Button, Box } from "grommet"
import "../utils/CategoryForm.css";


export const CategoryForm = (props) => {
  const { getCategories, createCategory, editCategory, getCategoryById } = useContext(CategoryContext)
  
  const editMode = props.match.url.split("/")[1] === "editcategory" //checks url to see if editMode

  const [currentCategory, setCurrentCategory] = useState({})

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const showHideClassName = open ? "modal display-block" : "modal display-none";

  //gets the categories from the database
  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (editMode) {
      getCategoryById(parseInt(props.match.params.categoryId))
        .then(category => {
          setCurrentCategory({
            label: category.label
          })
        })
    }
  }, [props.match.params.categoryId])

  //function that is called when a change happens in the form. It sets the state variable that is imported via context.
  //whatever the value that goes in the input (the evt) is being written as single property object with a key of 'type'
  //and the value of the form input
  const handleChange = (event) => {
    const newCategoryState = Object.assign({}, currentCategory)
    newCategoryState[event.target.name] = event.target.value
    setCurrentCategory(newCategoryState)
  }

  return (

    <fieldset>
      <label htmlFor="label">
        <div className="label">Category</div>
        <input
          type="text"
          name="label"
          value={currentCategory.label}
          onChange={handleChange}
        />
      </label>
      {editMode ? <Button primary margin="small" label="EDIT" className="new_category_btn" onClick={onOpen}/> : ""}

      {open && (

        <div className={showHideClassName}>
          <div className="modal-main">
            <h3>Confirm</h3>
            <p>Are you sure you want to make these changes?</p>
            <div>
              <Button primary label="Edit" onClick={() => {
                editCategory({
                  id: props.match.params.categoryId,
                  label: currentCategory.label
                }).then(() => {
                  props.history.push("/categories")
                })
              }}/>
           
              <Button margin="small" secondary label="Cancel" onClick={onClose}/>
            </div>
          </div>
        </div>


      )}
      {editMode ? "" :
        <Button primary label = "Create New Category"
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            createCategory({
              label: currentCategory.label
            })
              .then(() => props.history.push("/categories"))
          }}
         
        />
      }
    </fieldset>

  );
};
