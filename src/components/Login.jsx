import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as storeLogin } from "../store/authSlice"
import { Button, Logo, Input} from "./index.js"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth.js"
import { useForm } from "react-hook-form"

function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const login = async(data) => {
        setError("");
        try{
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                    dispatch(storeLogin({userData}));
                    navigate("/");
                }
            }
        } catch(error){
            setError(error.message);
        }
    }

    return(
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form 
                    onSubmit={handleSubmit(login)} className="mt-8"
                >
                    <div className="space-y-5">
                        <Input 
                            label="Email: "
                            placeholder="Enter Your Email: "
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
                                     || "Email Address must be a valid",
                                }
                            })}
                        />
                        <Input 
                            label="PassWord: "
                            placeholder="Enter PassWord: "
                            type="password"
                            {...register("password", { required: true})}
                        />
                        <Button type="submit" className="w-full">
                            Sign in{" "}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

/*
It shows a sign-in form, sends the credentials to Appwrite, and, if that works, saves the user in Redux and sends them to the home page.
register connects an input to the form, and handleSubmit wraps submit function.
login function calls authService.login(data), where data is { email, password } from the form. This creates a session in Appwrite.
If a session comes back, it calls getCurrentUser() to fetch the user’s details.
If user data exists, it dispatches storeLogin(userData) so the whole app knows someone is logged in.
It navigates to /.
{error && <p>...} shows the error in red only when error isn’t empty.
The <form> uses onSubmit={handleSubmit(login)}. React Hook Form first validates the fields, and only then calls your login function.
Email input: required, and must match a regex pattern. If it fails, the message is “Email Address must be a valid”.
Password input: just required.
{...register("email", ...)} spreads the props (name, onChange, ref, etc.) onto the input so react-hook-form can track it.
*/