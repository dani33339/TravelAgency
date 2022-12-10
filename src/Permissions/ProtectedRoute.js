import React from "react"
import { Route, Redirect } from "react-router-dom"

function ProtectedRoute({ isAuth: IsAuth, component: Component}) {
    return(
        <Route
            render={(props) => {
                if (IsAuth){
                return <Component />;
            } else {
            return (
                <Redirect to = {{pathname:"/", state: {from: props.location} }}/>
            );
            }
        }}
        />
    );
}

export default ProtectedRoute;