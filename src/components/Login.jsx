import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from "../store/authSlice"
import { Button, Logo, Input} from "./index.js"
import { useDispatch } from "react-redux"
import service from "../appwrite/config.js"
import { useForm } from "react-hook-form"


function Login(){
    return(
        <div>

        </div>
    )
}

export default Login