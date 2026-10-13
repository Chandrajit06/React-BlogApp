import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";


function LogoutBtn(){

    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
        .then(() => {dispatch(logout())})
        .catch((error) => console.log("LogoutBtn :: logoutHandler :: error", error))
    }

    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn

/*
authService.logout() asks Appwrite to end the user’s session.
.then(...) runs only after Appwrite confirms the session is gone. Then dispatch the logout action to update the Redux store so the app knows nobody is logged in anymore.
.catch(...) logs an error if anything fails.
*/