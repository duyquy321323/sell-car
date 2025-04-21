import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo.png";
import User from "../../assets/User.svg";
import { logoutAction } from '../../redux/action';

const Header = () => {

    const userData = useSelector(state => state.accountReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tabList = [
        {
            path: "/new-cars",
            name: "Xe Mới"
        },
        {
            path: "/used-cars",
            name: "Xe Đã Sử Dụng"
        },
        {
            path: "/sell-car",
            name: "Bán Xe"
        },
        {
            path: "/add-news",
            name: "Thêm tin tức"
        },
        {
            path: "/news",
            name: "Tin tức"
        },
    ]

    const location = document.location.pathname;

    return (
        <>
            <header className={'flex xl:justify-center max-xl:gap-x-[72px] max-lg:gap-x-14 max-sm:gap-x-4 text-sm font-[600] h-14 items-center ' + (tabList.map(item => item.path).includes(location)? "" : "bg-(--Secondary-Color)")}>
                <img src={Logo} alt={Logo} className='cursor-pointer max-xl:justify-self-start' onClick={() => navigate("/home")}/>
                <div className='flex justify-center gap-x-[72px] items-center max-xl:hidden'>
                    {tabList.map((it, id) => 
                        <div key={id} className='cursor-pointer py-1' onClick={() => navigate(it.path)}>
                            {it.name}
                        </div>
                    )}
                </div>
                <div className='cursor-pointer py-1 flex justify-center gap-x-2 max-xl:justify-self-end' onClick={() => navigate(userData? "#" : "/login")}>
                {userData? "" :<img src={User} alt={User}/>}
                    <p>{userData? ("Chào " + userData.fullName) : "Đăng Nhập"}</p>
                </div>
                {userData? <div className='cursor-pointer py-1 max-xl:justify-self-end' onClick={() => dispatch(logoutAction())}>
                    <p>Đăng xuất</p>
                </div> : <></>}
            </header>
        </>
    );
}

export default Header;