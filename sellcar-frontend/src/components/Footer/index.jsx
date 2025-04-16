import Logo from "../../assets/Logo.png";
import Facebook from "../../assets/facebook.svg";
import Youtube from "../../assets/youtube.svg";
import Instagram from "../../assets/instagram.svg";
import './Footer.css';

const Footer = () => {
    return (
        <>
            <div className="container--footer">
                <img src={Logo} alt={Logo}/>
                <div className="box-content">
                    <div>
                        <p>VỀ CHÚNG TÔI</p>
                        <p>CÁC CÂU HỎI THƯỜNG GẶP</p>
                        <p>LIÊN HỆ</p>
                    </div>
                    <div>
                        <p>CHĂM SÓC KHÁCH HÀNG</p>
                        <p>info@car.com</p>
                        <p>012-345-6789</p>
                    </div>
                    <div>
                        <span>
                            268 Lý Thường Kiệt, Phường 14, Quận 10 , Thành phố Hồ Chí Minh , Việt Nam
                        </span>
                        <div className="logo-list">
                            <img src={Facebook} alt={Facebook}/>
                            <img src={Instagram} alt={Instagram}/>
                            <img src={Youtube} alt={Youtube}/>
                        </div>
                    </div>
                </div>
                <p>2021 Autohunt. All Rights reserved</p>
            </div>
        </>
    );
}

export default Footer;