import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../../api";
import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";
import Logo from "../../assets/LogoBig.png";
import Youtube from "../../assets/youtube.svg";
import { loginAction } from "../../redux/action";

const Login = () => {

    const navigate = useNavigate();

    const [isPassword, setIsPassword] = useState(true);

    const dispatch = useDispatch();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues:{
            email: "",
            password: "",
        }
    });

    async function onSubmit(data){
        try{
            const response = await api.post("/user/login", data);
            dispatch(loginAction(response.data));
            toast("Đăng nhập thành công!!!");
            navigate("/home");
        } catch (e){
            console.error(e);
            toast("Đăng nhập thất bại!!!");
        }
    }
    
    return (
        <>
            <div className="flex justify-center gap-x-24 items-center my-28">
                <form onSubmit={handleSubmit(onSubmit)} className="w-lg max-xl:w-sm max-lg:w-full max-lg:mx-20 max-md:mx-6">
                    <div>
                        <Label className="text-base font-medium" htmlFor="email">Email</Label>
                        <Input placeholder="Nhập email" className="all-unset rounded-[3px] mt-2 h-12 px-4 py-[15px] bg-(--Light-Secondary)" {...register("email", {required: 'Email là bắt buộc!'})} id="email" type="email"/>
                    </div>
                        {errors?.email && <p className="error-field mt-2">{errors?.email?.message}</p>}
                    <div className="relative mt-6">
                        <Label className="text-base font-medium" htmlFor="password">Mật khẩu</Label>
                        <Input placeholder="Nhập mật khẩu" className="all-unset rounded-[3px] mt-2 h-12 px-4 py-[15px] bg-(--Light-Secondary)" {...register("password", {required: 'Mật khẩu là bắt buộc!'})} id="password" type={isPassword? "password" : "text"}/>
                        <button
                            type="button"
                            onClick={() => setIsPassword(!isPassword)}
                            className="absolute right-4 cursor-pointer top-9/13 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                        >
                            {isPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                        </button>
                    </div>
                        {errors?.password && <p className="error-field mt-2">{errors?.password?.message}</p>}
                    <Button className="mt-12 rounded-[3px] cursor-pointer active:bg-[#007bc7cb] bg-(--Primary-Color) py-3.5 px-14 h-12 w-full" type="submit">Đăng nhập</Button>
                    <nav className="text-center mt-6">
                        <span>Chưa có tài khoản? </span>
                        <a href="/register" className="text-(--Primary-Accent-Color) text-base font-semibold active:text-[#007bc7cb] hover:underline">Đăng ký</a>
                    </nav>
                </form>
                <aside className="w-[472px] h-[451px] bg-(--Secondary-Color) max-lg:hidden p-11">
                    <div className="border border-4 border-(--Primary-Color) h-full">
                        <img className="mt-10 mx-auto" src={Logo} alt="Logo" />
                        <h1 className="mt-16 text-center text-4xl font-semibold">Đăng nhập</h1>
                        <p className="mt-2 text-center text-2xl font-normal">Chào mừng đến với Autohunt</p>
                        <nav className='flex gap-x-6 mt-14 justify-center items-center'>
                            <a href='https://facebook.com'><img src={Facebook} alt='Facebook' /></a>
                            <a href='https://instagram.com'><img src={Instagram} alt='Instagram' /></a>
                            <a href='https://youtube.com'><img src={Youtube} alt='Youtube' /></a>
                        </nav>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Login;