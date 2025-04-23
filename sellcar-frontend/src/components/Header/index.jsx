import { useEffect, useState } from "react";
import { FaBlogger, FaCarAlt, FaCarCrash, FaMicroblog } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo.png";
import User from "../../assets/User.svg";
import { logoutAction } from '../../redux/action';
import { AppSidebar } from './SideBar';

const Header = () => {

    const userData = useSelector(state => state.accountReducer);
    const [scrolled, setScrolled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tabList = [
        {
            path: "/new-cars",
            name: "Xe Mới",
            icon: <FaCarAlt/>
        },
        {
            path: "/used-cars",
            name: "Xe Đã Sử Dụng",
            icon: <FaCarCrash/>
        },
        {
            path: "/sell-car",
            name: "Bán Xe",
            icon: <MdSell/>
        },
        {
            path: "/add-news",
            name: "Thêm tin tức",
            icon: <FaMicroblog/>
        },
        {
            path: "/news",
            name: "Tin tức",
            icon: <FaBlogger/>
        },
    ]

    const location = document.location.pathname;

    useEffect(() => {
        function handleScroll(){
            const offset = window.scrollY;
            setScrolled(offset > 20);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={'sticky z-6 top-0 flex xl:justify-center relative xl:gap-x-[72px] max-xl:px-5 max-xl:gap-x-14 max-sm:gap-x-4 text-sm font-[600] h-14 items-center transition-all duration-400 ' + (tabList.map(item => item.path).includes(location)? "bg-(--Dark-Secondary)" : (scrolled? "bg-(--Secondary-Color)" : ""))}>
                <img src={Logo} alt={Logo} className='cursor-pointer max-xl:justify-self-start max-md:w-20 max-md:h-5' onClick={() => navigate("/home")}/>
                <div className='flex justify-center gap-x-[72px] items-center max-xl:hidden'>
                    {tabList.map((it, id) => 
                        <div key={id} className='cursor-pointer py-1' onClick={() => navigate(it.path)}>
                            {it.name}
                        </div>
                    )}
                </div>
                <div className='cursor-pointer py-1 flex justify-center gap-x-2 max-xl:ml-auto' onClick={() => navigate(userData? "#" : "/login")}>
                {userData? "" :<img className='max-md:hidden' src={User} alt={User}/>}
                    <p>{userData? ("Chào " + userData.fullName) : "Đăng Nhập"}</p>
                </div>
                {userData? <div className='cursor-pointer py-1 max-xl:ml-auto' onClick={() => dispatch(logoutAction())}>
                    <p>Đăng xuất</p>
                </div> : <></>}
                <AppSidebar tabList={tabList}/>
            </header>
        </>
    );
}

export default Header;