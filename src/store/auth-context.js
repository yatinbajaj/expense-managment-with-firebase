import React from "react";

const authContext = React.createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
});

export const AuthProvider = (props) => {
    return (
        <authContext.Provider value={props.value}>
            {props.children}
        </authContext.Provider>
    )
}

export default authContext;

