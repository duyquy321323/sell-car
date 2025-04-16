import "./AboutUsCPN.css";

const AboutUsCPN = (props) => {

    const { number, title } = props;

    return (
        <>
            <div className="about__us--container">
                <h3>{number}</h3>
                <p>{title}</p>
            </div>
        </>
    );
}

export default AboutUsCPN;