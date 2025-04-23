import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";
import Logo from "../../assets/Logo.png";
import Youtube from "../../assets/youtube.svg";

const Footer = () => {
    return (
        <>
            <footer className='mt-auto min-h-80 p-6 bg-(--Secondary-Color) flex flex-col gap-14 items-center'>
                <img src={Logo} alt='Logo' />
                <div className="footer__content grid grid-cols-3 gap-y-4 max-lg:gap-y-2 max-sm:gap-y-1 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-[363px] max-2xl:gap-x-64 max-lg:gap-x-40 max-sm:gap-16 relative after:content-[''] after:absolute after:w-full after:h-px after:top-[-36px] after:left-0 before:content-[''] before:absolute before:w-full before:h-px before:bottom-[-36px] before:left-0">
                    <span>ABOUT US</span>
                    <span>CUSTOMER SERVICE</span>
                    <span className='lg:row-start-1 lg:row-end-3 lg:col-start-3'>
                        3926 Calvin Street,
                        Baltimore, Maryland,
                        21201,
                        United State
                    </span>
                    <span>FAQ</span>
                    <span>info@car.com</span>
                    <span>CONTACT</span>
                    <span>240-865-3730</span>
                    <nav className='flex gap-x-3.5 items-center'>
                        <a href='https://facebook.com'><img src={Facebook} alt='Facebook' /></a>
                        <a href='https://instagram.com'><img src={Instagram} alt='Instagram' /></a>
                        <a href='https://youtube.com'><img src={Youtube} alt='Youtube' /></a>
                    </nav>
                </div>
                <span className='max-w-[500px]'>2021 Autohunt. All Rights reserved</span>
            </footer>
        </>
    );
}

export default Footer;