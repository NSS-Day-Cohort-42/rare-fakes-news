//deletecategory component with confirmation modal
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../Categories/CategoryProvider";
import { Box, Button, Heading, Layer, Text } from "grommet";
import { Trash } from "grommet-icons";

export const DeleteCategory = ({ categoryId }) => {
  const { deleteCategory } = useContext(CategoryContext);
  const history = useHistory();

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  //function that is called when the delete button is clicked.
  //This function deletes an entry in the TagPost table.
  //Lastly the function calls the close function which resets our modal state.
  const deleteThisCategory = () => {
    deleteCategory(categoryId).then(() => {
      history.push("/categories");
    });
  };

  return (
    <>
      <Button icon={<Trash />} onClick={onOpen} />
      {open && (
        <Layer
          onEsc={onClose}
          onClickOutside={onClose}
          responsive={true}
          position="center"
        >
          <Box width="medium" size="small" margin="small">
            <Heading size="3" margin="xsmall">
              Confirm
            </Heading>
            <Text margin="xsmall">Are you sure you want to delete?</Text>
            <Box size="small" direction="row-responsive">
              <Button
                size="small"
                primary
                margin="small"
                onClick={deleteThisCategory}
                label="Delete"
              />

              <Button
                size="small"
                secondary
                margin="small"
                onClick={onClose}
                label="Cancel"
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
