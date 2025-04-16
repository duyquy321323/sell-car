import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import User from "../../assets/User.svg";
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
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
            path: "/sell",
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

    return (
        <>
            <div className="container--header">
                    <img src={Logo} alt={Logo} onClick={() => navigate("/home")}/>
                    <div className='tab-list'>
                        {tabList.map(it => 
                            <div className='tab' onClick={() => navigate(it.path)}>
                                {it.name}
                            </div>
                        )}
                    </div>
                    <div className='btn-sign-in' onClick={() => navigate(userData? "#" : "/login")}>
                    {userData? "" :<img src={User} alt={User}/>}
                        <p>{userData? ("Chào " + userData.fullName) : "Đăng Nhập"}</p>
                    </div>
                    {userData? <div className='btn-sign-in' onClick={() => dispatch(logoutAction())}>
                        <p>Đăng xuất</p>
                    </div> : <></>}
            </div>
        </>
    );
}

export default Header;