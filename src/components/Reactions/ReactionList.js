//child component of PostDetails, renders list of reactions by mapping through all found in the DB
import React, { useContext, useEffect } from "react"
import { ReactionContext } from "./ReactionProvider"
import { Reaction } from "./Reaction"
import "./Reaction.css"


export const ReactionList = (props) => {
    const { getReactions, reactions } = useContext(ReactionContext)

    // Initialization effect hook -> Go get tag data
    useEffect(() => {
        getReactions()
    }, [])

    return (
        <div style={{ margin: "1rem" }} className="reactionContainer">
            <div className="reactions">
                { //map through the reactions and pass the reaction obj and props down to the child component
                    reactions.map(reaction => <Reaction key={reaction.id} {...props} reaction={reaction} />)
                }
            </div>
        </div>
    )
}