import React, { useState, useContext, useEffect } from "react"
import { ReactionContext } from "./ReactionProvider"
import {Reaction} from "./Reaction"



export const ReactionList = (props) => {
    const { getReactions, reactions} = useContext(ReactionContext)
   

    // Initialization effect hook -> Go get tag data
    useEffect(() => {
        getReactions()
       
    }, [])

    return (
        <div style={{ margin: "1rem"}} className="reactionContainer">
            <h3>Reactions:</h3>
            <div className="tags">
                {
                    reactions.map(reaction => <Reaction key={reaction.id} {...props} reaction={reaction}/>)
                }
            </div>
           
        </div>
    )
}