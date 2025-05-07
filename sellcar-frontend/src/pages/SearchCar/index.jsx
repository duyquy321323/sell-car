import { useParams } from "react-router-dom";
import Hero from "../../components/Hero";

const SearchCar = () => {

    const { title, condition, priceFrom, priceTo } = useParams("title", "condition", "priceFrom", "priceTo");
    const listBreadcrumb = [
        {
            path: '/home',
            name: 'Trang chủ'
        },
        {
            path: '/home',
            name: 'Tìm kiếm'
        },
        {
            path: '/search-car',
            name: 'Kết quả tìm kiếm'
        },
    ];

    return (
        <>
            <Hero title={"Kết quả tìm kiếm"} breadcrumbList={listBreadcrumb}/>
            <section>
                <div>
                    <h3>Bộ lọc</h3>
                    <form>
                        
                    </form>
                </div>
            </section>
        </>
    );
}

export default SearchCar;