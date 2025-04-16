import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import InputWithIcon from "../../components/InputTextField";
import LogoLogin from "../../components/LogoLogin";
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
        <section className="login-page">
            <form className="container--login" onSubmit={handleSubmit}>
                <InputWithIcon type="email" onChange={handleChange} placeHolder={"name@mail.com"} name="email" label={"Email"}/>
                <InputWithIcon className="inp" onChange={handleChange} type="password" placeHolder={"password"} name="password" label={"Mật khẩu"}/>
                <Button fullWidth type="submit" sx={{
                    padding: '15px 0px',
                    textAlign: "center",
                    fontSize: '15px',
                    fontWeight: '600',
                    }} variant="contained">Đăng nhập</Button>
                <p className="foot">Chưa có tài khoản? <span onClick={() => navigate("/register")}>Đăng ký tại đây</span></p>
            </form>
            <LogoLogin title="Đăng nhập"/>
        </section>
    );
}

export default Login;