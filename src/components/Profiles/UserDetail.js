//displays user information and allows user to subscribe and unsubscribe
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import defaultImg from "./Images/default.png"
import { Button, Box, Heading } from "grommet"
import { SubscriptionContext } from "../Subscriptions/SubscriptionProvider"



export const UserDetail = (props) => {
    const { user, getUserById, getCurrentUser, setUser } = useContext(UserContext)
    const { getSubscriptionByAuthor, unsubscribe, createSubscription } = useContext(SubscriptionContext)

    const [subscription, setSubscription] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const [subStatus, setSubStatus] = useState(false) //subscription state set to false

    useEffect(() => {
        if (props.match.params.hasOwnProperty("userId")) {
            getUserById(parseInt(props.match.params.userId))
            .then(setUser)
            //get the most recent sub OBJECT
            //this determines whether the current user follows the author of the UserDetail page
            .then(() => {
                getSubscriptionByAuthor(parseInt(props.match.params.userId))
                .then(setSubscription)
            })
            } else {
                //get an ARRAY of objects to show how many people follow YOU
                getCurrentUser()
                .then((user) => {
                    setUser(user)
                    getSubscriptionByAuthor(user.id)
                    .then(setSubscriptions)
                })
            }
        }, [])
        
        useEffect(() => {
            if (subscription.ended_on !== null) { 
                setSubStatus(false)
            } else {
                setSubStatus(true)
            }
    },[subscription])

    const changeSubStatus = (subscription) => {
        const authorID = parseInt(props.match.params.userId)
        if(subscription.ended_on === null) { //if end === null, user is still subscribed and can unsubscribe
            unsubscribe(authorID)
            .then(() => {
                window.alert("You are now UNsubscribed!")
                props.history.push('/home')
            })
        } else {
            createSubscription({ //user can create a subscription
                author_id: authorID
            })
            .then(() => {
                window.alert("You are now subscribed!")
                props.history.push('/home')
            })
        }
    }

   
    return (
        <>
            <Box>
                {props.match.params.hasOwnProperty("userId") ?
                    <Heading level="1">{user.user.username}'s Profile</Heading> :<Box>
                        <Heading level="1" style={{margin: "2rem 0rem 2rem 0rem"}}>My Profile</Heading>
                        <Box>{user.user.first_name} {user.user.last_name}</Box>
                        <Box>subscribers: {subscriptions.length}</Box>
                    </Box>}
                {user.user.profile_image_url === "" || user.user.profile_image_url === undefined
                    ? <img src={defaultImg} style={{ width: `115px` }}></img>
                    : <img src={user.user.profile_image_url} style={{ width: `115px` }}></img>
                }
                <div>{user.user.profile_image_url}</div>
                <div>Username: {user.user.username}</div>
                <div>email: {user.user.email}</div>
                <div>Creation Date: {new Date(user.user.date_joined).toLocaleDateString('en-US')}</div>
            </Box>
            <div>
                {props.match.params.hasOwnProperty("userId") ?
                    subStatus ?
                        <Button primary margin="small" label="unsubscribe!" onClick={() => {
                            changeSubStatus(subscription)
                        }} /> :
                        <Button primary margin="small" label="subscribe" onClick={() => {
                            changeSubStatus(subscription)
                        }}/>
                    : ""
                }
            </div>
        </>
    )
}



