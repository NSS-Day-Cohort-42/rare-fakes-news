import React, { useContext, useState, useEffect } from "react"
import { TagContext } from "./TagProvider"



export const TagForm = (props) => {
    // Use the required context providers for data
    const { tags, getTags, createTag } = useContext(LocationContext)

    // Component state
    const [tag, setTag] = useState({})

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newTag = Object.assign({}, tag)          // Create copy
        newTag[event.target.name] = event.target.value    // Modify copy
        setTag(newTag)                                 // Set copy as new state
    }

    // Get animals from API when component initializes
    useEffect(() => {
        getAnimals()
        getLocations()
    }, [])


    const constructNewTag = () => {
                // POST
                createTag({
                    tag: tag
                })
                    .then(() => props.history.push("/tags")) //takes user to tag list page
            }
        }
    

    return (
        <form className="tagForm">
            <h2 className="tagForm__title">Create a tag</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tag">Enter tag name: </label>
                    <input type="text" name="tag" required autoFocus className="form-control"
                        placeholder="ex: sports, politics, etc"
                        defaultValue={tag.tag}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewTag()
                }}
                className="btn btn-primary">
                "Save Updates"
            </button>
        </form>
    )
}