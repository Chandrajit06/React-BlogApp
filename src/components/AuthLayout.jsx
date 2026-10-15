import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

function Authlayout({ children, authentication = true}){

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login");
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, authentication, navigate])

    return loader ? null : <>{children}</>
}

export default Authlayout

/*
This is a route guard component.It decides whether the visitor is allowed to see that page based on whether they’re logged in.
children is whatever page or component wrapped inside <Authlayout>.
authentication says whether that page requires a logged-in user. It defaults to true.
authStatus comes from your Redux store. It’s true if the user is logged in, false if not.
loader is a state flag that starts as true, meaning “still checking.”
authentication && authStatus !== authentication: This page needs a login, and the user doesn’t have one. They get sent to /login.
!authentication && authStatus !== authentication: the page is meant for logged-out users only (like login or signup), but the user is already logged in. They get sent to /.
While loader is true, it renders null (nothing).
Once the check is done, it renders the children.
*/