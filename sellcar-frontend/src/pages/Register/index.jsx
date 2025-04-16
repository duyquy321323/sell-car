import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import InputWithIcon from "../../components/InputTextField";
import LogoLogin from "../../components/LogoLogin";

const Register = () => {

    const navigate = useNavigate();

    const [registerForm, setRegisterForm] = useState(null);
    
    async function handleSubmit(e){
        e.preventDefault()
        try{
            await api.post("/user/register", registerForm);
            window.alert("Đăng ký tài khoản thành công!!!");
            navigate("/login");
        }catch(e){
            console.error(e);
            window.alert("Đăng ký tài khoản thất bại!!!");
        }
    }

    function handleChange(e){
        const { name, value } = e.target;
        setRegisterForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <section className="login-page">
            <form className="container--login" onSubmit={handleSubmit}>
                <InputWithIcon type="text" onChange={handleChange} name="fullName" placeHolder={"Nguyễn Văn A"} label={"Họ và tên"}/>
                <InputWithIcon className="inp2" onChange={handleChange} name="email" type="email" placeHolder={"name@mail.com"} label={"Email"}/>
                <InputWithIcon className="inp2" onChange={handleChange} name="phoneNumber" type="number" placeHolder={"0123456789"} label={"Số điện thoại"}/>
                <InputWithIcon className="inp" onChange={handleChange} name="password" type="password" placeHolder={"password"} label={"Mật khẩu"}/>
                <Button fullWidth type="submit" sx={{
                    padding: '15px 0px',
                    textAlign: "center",
                    fontSize: '15px',
                    fontWeight: '600',
                    }} variant="contained">Đăng ký</Button>
                <p className="foot">Đã có tài khoản? <span onClick={() => navigate("/login")}>Đăng nhập tại đây</span></p>
            </form>
            <LogoLogin title="Đăng ký"/>
        </section>
    );
}

export default Register;