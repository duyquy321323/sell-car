import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { loginAction } from "../../redux/action";
import "./Login.css";

const Login = () => {

    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState(null);

    const dispatch = useDispatch();

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await api.post("/user/login", loginForm);
            dispatch(loginAction(response.data));
            window.alert("Đăng nhập thành công!!!");
            navigate("/home");
        } catch (e){
            console.error(e);
            window.alert("Đăng nhập thất bại!!!");
        }
    }

    function handleChange(e){
        const { name, value } = e.target;
        setLoginForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    
    return (
        <>
            Login
        </>
    );
}

export default Login;