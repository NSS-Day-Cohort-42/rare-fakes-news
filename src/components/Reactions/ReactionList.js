import React, { useState, useContext, useEffect } from "react"
import { ReactionContext } from "./ReactionProvider"
import Reaction from "./Reaction"



export const ReactionList = ({ props }) => {
    const { getReactions, reactions} = useContext(ReactionContext)
    const test = "\u1F44D"
    //do I need a useState hook??

    // Initialization effect hook -> Go get tag data
    useEffect(() => {
        getReactions()
    }, [])

    return (
        <div style={{ marginTop: "2rem"}}>
            <h3>Reactions</h3>
            <div>{test}</div>
            <div className="tags">
                {
                    reactions.map(reaction => <Reaction key={reaction.id} reaction={reaction} />)
                }
            </div>
           
        </div>
    )
}