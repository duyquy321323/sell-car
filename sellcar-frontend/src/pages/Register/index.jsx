import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

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
        <>
            Register
        </>
    );
}

export default Register;