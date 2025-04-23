import { useNavigate } from "react-router-dom";
import PeopleIcon from "../../assets/bi_people.svg";
import CalendarIcon from "../../assets/iwwa_year.svg";
import ReadOnlyRating from "./Rating";
const formattedNumber = (v) =>
    new Intl.NumberFormat("vi-VN").format(v);

const CarRecommendCard = (props) => {

    const { car } = props;

    const navigate = useNavigate();

    return (
        <article className="p-4 flex flex-col gap-4 max-sm:w-72 w-[314px] rounded-[3px] border border-[2px] border-(--Secondary-Color) cursor-pointer" onClick={() => navigate(`/car/${car.id}`)}>
            <img className="w-[282px] h-[189px] rounded-[3px]" src={car.firstImage} alt={car.firstImage} />
            <div className="flex flex-col gap-3 items-start">
                <div className="px-3 py-2 text-(--Primary-Color) font-bold text-sm border border-(--Primary-Color) rounded-[3px]">{car.condition === "NEW"? "Mới" : "Đã dùng"}</div>
                <div className="text-xl font-semibold">{car.title}</div>
                <div className="font-bold text-2xl text-(--Primary-Color)">{formattedNumber(car.price)} VND</div>
                <div className="font-semibold text-base">{car.address}</div>
                <div className="flex gap-12 justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <img src={CalendarIcon} alt="CalendarIcon"/>
                        <span>{car.year}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <img src={PeopleIcon} alt="PeopleIcon"/>
                        <span>{car.capacity}</span>
                    </div>
                </div>
                <div></div>
                <div className="w-full relative after:absolute after:content-[''] after:h-px after:top-[-12px] after:left-0 after:w-full after:bg-[#989898] flex justify-start gap-1 items-baseline flex-wrap">
                    <ReadOnlyRating value={car.rates}/>
                    <p className="font-bold text-base">({car.quantityEvaluate} Lượt đánh giá)</p>
                </div>
            </div>
        </article>
    );
}

export default CarRecommendCard;