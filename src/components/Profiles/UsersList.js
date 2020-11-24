import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./UsersList.css"
import { UsersTable } from "./UsersTable"
import { Heading } from "grommet"



export const UsersList = () => {
    const { users, getUsers, user, getCurrentUser, setUser } = useContext(UserContext)

    useEffect(() => {
        getUsers()
        getCurrentUser()
            .then(setUser)
    }, [])


    return (
        <>
            <Heading level="1">All Users</Heading>
            { //DETERMINE VIEW BASED ON ADMIN/AUTHOR PRIVILEGES
                user.user.is_staff ?
                    <div>
                        <UsersTable users={users}/>
                        {/* VIEW FOR STAFF
                        {  //map through users to generate content 
                            users.map(u => {
                                return <div className="userContainer">
                                    <div className="nameColumn">
                                    { //different route for current user than other users
                                        u.id === user.id ?
                                        <Link to={{ pathname: "/profile" }}>
                                                <p>{u.user.first_name} {u.user.last_name}</p>
                                            </Link> :
                                            <Link to={{ pathname: `/profiles/${u.id}` }}>
                                                <p>{u.user.first_name} {u.user.last_name}</p>
                                            </Link>
                                    }
                                    </div>
                                    <div className="activeColumn"> 
                                    Active:
                                        {//check for active yes or no
                                            u.user.is_active ? <p>✅</p> : <p>❎</p>
                                        }
                                    </div>
                                    <div className="staffColumn">
                                        {//check for author/admin
                                            u.user.is_staff ? <p>admin</p> : <p>author</p>
                                        }
                                    </div>
                                </div>
                            })
                        } */}
                    </div> :
                    <div>
                        {/* VIEW FOR AUTHORS */}
                        { /* map through users to generate content */
                            users.map(u => {
                                return <div className="userContainer">
                                    { //different route for current user than other users
                                        u.id === user.id ?
                                            <Link to={{ pathname: "/profile" }}>
                                                <p>{u.user.first_name} {u.user.last_name}</p>
                                            </Link> :
                                            <Link to={{ pathname: `/profiles/${u.id}` }}>
                                                <p>{u.user.first_name} {u.user.last_name}</p>
                                            </Link>
                                    }
                                </div>
                            })
                        }
                    </div>
            }
        </>
    )
}