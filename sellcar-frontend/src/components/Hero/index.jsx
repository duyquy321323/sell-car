const Hero = (props) => {

    const { title, content } = props;

    return (
        <>
            <section className="h-80 bg-[#12232E] px-[124px]" style={{paddingInline: '124px'}}>
                <div className="">
                    <h1>{title}</h1>
                    <nav aria-label="breadcrumb">
                        <p>{content}</p>
                    </nav>
                </div>
            </section>
        </>
    );
}

export default Hero;