import LogoBig from "../../assets/LogoBig.png";
import Facebook from "../../assets/facebook.svg";
import Youtube from "../../assets/youtube.svg";
import Instagram from "../../assets/instagram.svg";
import "./LogoLogin.css";

const LogoLogin = (props) => {

    const { title } = props;

    return(
        <>
            <div className="container--logo__login">
                <div className="box--logo__login">
                    <img src={LogoBig} alt={LogoBig}/>
                    <div className="box--content__logo--login">
                        <h1>{title}</h1>
                        <p>Chào mừng đã đến với Autohunt</p>
                    </div>
                    <div className="network--list">
                    <img src={Facebook} alt={Facebook}/>
                            <img src={Instagram} alt={Instagram}/>
                            <img src={Youtube} alt={Youtube}/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LogoLogin;