import React, {createContext, useState}from 'react'

export const userContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    const handleUserChange = (user) => {
        setUser(user);
    }
    return (
        <UserContextProvider value={user, handleUserChange}>
            {props.children}
        </UserContextProvider>
    )
}

export default UserContextProvider
