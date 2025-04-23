import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import ReactSlider from "react-slider";
import { toast } from "sonner";
import api from "../../api";
import NewCarIC from "../../assets/ion_car-sport-outline.svg";
import AdImg2 from "../../assets/Rectangle 103 (1).png";
import AdImg1 from "../../assets/Rectangle 103.png";
import AdImg3 from "../../assets/Rectangle 104.png";
import AdImg4 from "../../assets/Rectangle 105.png";
import AdImg5 from "../../assets/Rectangle 106.png";
import AdImg6 from "../../assets/Rectangle 107.png";
import CarAboutUs from "../../assets/Rectangle 110.png";
import SellCarIC from "../../assets/Vector (1).svg";
import UsedCarIC from "../../assets/Vector.svg";
import CarRecommendCard from "../../components/CarRecommendCard";

const formattedNumber = (v) =>
    new Intl.NumberFormat("vi-VN").format(v);

const formattedDate = (d) =>
    dayjs(d).format("DD/MM/YYYY");

const Home = () => {
    const [carList, setCarList] = useState([]);
    const [page, setPage] = useState(1);
    const [carsPerPage, setCarsPerPage] = useState(3); // Số lượng xe trên mỗi trang
    const underlineRef = useRef(null)
    const containerRef = useRef(null)
    const underline2Ref = useRef(null)
    const container2Ref = useRef(null)
    const [condition2, setCondition2] = useState("NEW");
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    const {
        register,
        watch,
        handleSubmit,
        control,
    } = useForm({
        defaultValues: {
            title: "",
            condition: "",
            priceRange: [0, 6000000000],
        }
    });

    const {
        register: registerContact,
        handleSubmit: handleSubmitContact,
        formState: { errors: errorsContact }
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            comment: "",
        }
    });

    const priceRange = watch("priceRange");

    const condition = watch("condition");

    async function onSubmitContact(data) {
        try {
            await api.post("/contact", data);
            toast("Gửi liên hệ thành công! Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất.");
        } catch (e) {
            console.log(e)
            if(e.response.data){
                toast(e.response.data.message);
            } else if (e.status === 401) {
                toast("Vui lòng đăng nhập và thử lại sau!!!")
            } else {
                toast("Đã có lỗi xảy ra!!!");
            }
        }
    }

    async function handleSearch(data) {
        const payload = {
            title: data?.title || "",
            condition: data?.condition || "",
            priceFrom: data?.priceRange ? Array.from(data.priceRange).at(0) : null,
            priceTo: data?.priceRange ? Array.from(data.priceRange).at(1) : null,
        }

        try {
            const response = await api.post(`/car?pageNo=${page - 1}&pageSize=${carsPerPage}`, payload);
            setCarList(response.data.content);
        } catch (e) {
            toast("Lỗi kết nối!!!");
        }
    }

    async function getRecommendCars(){
        try{
            const response = await api.get(`car/recommend/${condition2}`);
            setCarList(response.data);
        } catch (e){
            toast("Lỗi kết nối!!!");
        }
    }

    useEffect(() => {
        getRecommendCars();
    }, [condition2]);

    const serviceList = [
        {
            icon: NewCarIC,
            name: "Mua xe mới",
        },
        {
            icon: UsedCarIC,
            name: "Mua xe đã sử dụng",
        },
        {
            icon: SellCarIC,
            name: "Bán xe của bạn",
        },
    ];

    const adList = [AdImg1, AdImg2, AdImg3, AdImg4, AdImg5, AdImg6];

    async function getNews() {
        try {
            const response = await api.get("news/recent");
            setNews(response.data);
        } catch (e) {
            toast("Lỗi kết nối!!!");
        }
    }

    useEffect(() => {
        getNews();
    }, [])

    useEffect(() => {
        const activeEl = containerRef.current.querySelector(`[data-state="active"]`)
        const underlineEl = underlineRef.current
        const active2El = container2Ref.current.querySelector(`[data-state="active"]`)
        const underline2El = underline2Ref.current

        if (activeEl && underlineEl) {
            const { offsetLeft, offsetWidth } = activeEl
            underlineEl.style.left = `${offsetLeft}px`
            underlineEl.style.width = `${offsetWidth}px`
        }
        if (active2El && underline2El) {
            const { offsetLeft, offsetWidth } = active2El
            underline2El.style.left = `${offsetLeft}px`
            underline2El.style.width = `${offsetWidth}px`
        }
    }, [condition, condition2])

    return (
        <>
            {/* phần Hero + Search */}
            <section className="hero absolute top-0 left-0 h-[630px] w-full bg-no-repeat bg-cover bg-center bg-fixed bg-[url('/Banner.png')]">
                <div className="mt-36 ml-52 font-semibold max-w-[422px] max-lg:mt-28 max-xl:ml-[24px] max-md:mt-20 max-md:max-w-40">
                    <h1 className="text-5xl max-2xl:text-4xl max-lg:text-3xl max-sm:text-2xl">Hãy tìm chiếc xe mơ ước của bạn</h1>
                    <p className="text-2xl max-xl:text-xl max-sm:text-xs">Tăng tốc trải nghiệm - Chinh phục mọi cung đường!</p>
                </div>
                <form onSubmit={handleSubmit(handleSearch)}>
                    <div className="p-6 absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 rounded-[3px] w-[1040px] max-xl:w-4xl max-lg:w-2xl max-md:w-xs mx-auto mt-auto bg-(--Secondary-accent)">
                        <Controller
                            control={control}
                            name="condition"
                            defaultValue={""}
                            render={({ field }) =>
                                <Tabs onValueChange={field.onChange} defaultValue={field.value}>
                                    <TabsList ref={containerRef} className="mx-auto relative text-(--Primary-Color) !rounded-none transition-all duration-300">
                                        <TabsTrigger className="text-[20px] max-md:text-[14px] font-black relative data-[state=active]:!opacity-100 cursor-pointer !rounded-none opacity-50 px-10 max-md:px-4 pb-2.5" value="">Tất cả</TabsTrigger>
                                        <TabsTrigger className="text-[20px] max-md:text-[14px] font-black relative data-[state=active]:!opacity-100 cursor-pointer !rounded-none opacity-50 px-10 max-md:px-4 pb-2.5" value="NEW">Xe mới</TabsTrigger>
                                        <TabsTrigger className="text-[20px] max-md:text-[14px] font-black relative data-[state=active]:!opacity-100 cursor-pointer !rounded-none opacity-50 px-10 max-md:px-4 pb-2.5" value="OLD">Xe đã dùng</TabsTrigger>
                                        <div
                                            ref={underlineRef}
                                            className="absolute bottom-0 h-0.5 bg-(--Primary-Color) rounded-[1px] transition-all duration-300"
                                        />
                                    </TabsList>
                                </Tabs>
                            }
                        />
                        <div className="mt-6 grid grid-cols-12 gap-6 py-[33px]">
                            <div className="relative col-start-1 col-end-5 max-lg:col-end-7 max-md:col-end-13">
                                <FaSearch size={24} className="opacity-75 absolute translate-y-1/2 left-4" />
                                <Input {...register("title")} className="px-14 h-12 text-[18px] font-normal rounded-[3px] bg-(--Light-Secondary) all-unset" placeholder="Tìm kiếm" />
                            </div>
                            <div className="relative col-start-5 max-lg:col-start-7 col-end-10 max-lg:col-end-13 max-md:col-start-1 flex gap-x-4">
                                <div className="flex absolute flex-col gap-[5px]">
                                    <label htmlFor="priceRange" className="text-[18px] font-semibold">Mức giá</label>
                                    <p className="text-[14px] font-medium text-nowrap">{formattedNumber(priceRange.at(0))}VND - {formattedNumber(priceRange.at(1))}VND</p>
                                </div>
                                <div className="ml-auto w-52 max-md:w-40 h-12 max-w-md">
                                    <Controller
                                        name="priceRange"
                                        control={control}
                                        defaultValue={[0, 6000000000]}
                                        render={({ field }) =>
                                            <ReactSlider
                                                className="h-2 bg-gray-300 rounded-full top-1/4 translate-y-[-50%]"
                                                thumbClassName="w-5 h-5 bg-(--Primary-Color) translate-y-[-50%] top-1/2 rounded-full cursor-pointer"
                                                trackClassName="bg-(--Light-Secondary) h-2 rounded-full"
                                                defaultValue={field.value}
                                                min={0}
                                                max={6000000000}
                                                step={1}
                                                id="priceRange"
                                                pearling
                                                onChange={field.onChange}
                                                minDistance={10}
                                                withTracks={true}
                                                renderThumb={(props, state) => <div {...props} />}
                                            />
                                        }
                                    />
                                </div>
                            </div>
                            <Button className="col-start-10 max-lg:col-start-1 max-lg:col-end-13 col-end-13 rounded-[3px] bg-(--Primary-Color) h-12 text-[15px] font-semibold cursor-pointer hover:opacity-80 active:opacity-70" type="submit">Tìm</Button>
                        </div>
                    </div>
                </form>
            </section>

            {/* phần recommend car */}
            <section className="mt-[756px] p-6 w-[1040px] max-xl:w-4xl max-lg:w-2xl max-md:w-xs mx-auto">
                <h3 className="text-2xl font-bold">Xe được đề xuất</h3>
                <Tabs onValueChange={setCondition2} defaultValue={"NEW"} className="mt-6">
                    <TabsList ref={container2Ref} className="p-0 relative text-(--Primary-Color) !rounded-none transition-all duration-300">
                        <TabsTrigger className="text-[20px] max-md:text-[14px] font-black relative data-[state=active]:!opacity-100 cursor-pointer !rounded-none opacity-50 px-10 max-md:px-4 pb-2.5" value="NEW">Xe mới</TabsTrigger>
                        <TabsTrigger className="text-[20px] max-md:text-[14px] font-black relative data-[state=active]:!opacity-100 cursor-pointer !rounded-none opacity-50 px-10 max-md:px-4 pb-2.5" value="OLD">Xe đã dùng</TabsTrigger>
                        <div
                            ref={underline2Ref}
                            className="absolute bottom-0 h-0.5 bg-(--Primary-Color) rounded-[1px] transition-all duration-300"
                        />
                    </TabsList>
                </Tabs>
                <div className="grid grid-cols-3 gap-6 mt-6 max-xl:grid-cols-2 max-md:grid-cols-1">
                    {carList?.map(car =>
                        <CarRecommendCard car={car} />
                    )}
                </div>
            </section>

            {/* phần tin tức */}
            <section className="mt-[72px] p-6 w-[1040px] max-xl:w-4xl max-lg:w-2xl max-md:w-xs mx-auto">
                <h3 className="font-bold text-2xl">Tin tức</h3>
                <div className="grid grid-cols-12 gap-x-[20px] gap-y-[30px] mt-6 h-full xl:grid-rows-2 max-xl:grid-cols-1">
                    {news.length > 0 && <article onClick={() => navigate(`/news/${news[0].id}`)} className="cursor-pointer relative overflow-hidden rounded-[3px] bg-(--Secondary-Color) xl:col-start-1 xl:col-end-6 xl:row-start-1 xl:row-end-3">
                        <div className="absolute bg-(--Primary-Color) rounded-[3px] px-3 py-2 font-semibold text-lg top-6 right-6">{formattedDate(news[0].createdDate)}</div>
                        <img src={news[0].posterUrl} className="w-full h-48 object-cover" alt={news[0].posterUrl} />
                        <div className="p-6">
                            <h4 className="text-[28px] font-bold text-(--Primary-Color)">{news[0].title}</h4>
                            <p className="mt-4 text-base font-semibold">{news[0].description}</p>
                            <div className="mt-9 flex gap-3 items-center">
                                <FaUserCircle size={48} />
                                <span className="text-sm font-semibold">{news[0].author.fullName}</span>
                            </div>
                        </div>
                    </article>}
                    {news.length > 1 && <article onClick={() => navigate(`/news/${news[1].id}`)} className="cursor-pointer relative xl:flex overflow-hidden rounded-[3px] bg-(--Secondary-Color) xl:col-start-6 xl:col-end-13 xl:row-start-1 xl:row-end-2">
                        <div className="absolute xl:hidden bg-(--Primary-Color) rounded-[3px] px-3 py-2 font-semibold text-lg top-6 right-6">{formattedDate(news[0].createdDate)}</div>
                        <img src={news[0].posterUrl} className="xl:w-48 w-full h-48 object-cover" alt={news[0].posterUrl} />
                        <div className="xl:p-5 p-6">
                            <h4 className="xl:text-2xl text-[28px] font-bold text-(--Primary-Color)">{news[0].title}</h4>
                            <p className="xl:mt-2 mt-4 xl:text-lg text-base font-semibold">{news[0].description}</p>
                            <div className="xl:mt-4 mt-9 flex gap-3 items-center">
                                <FaUserCircle size={48} />
                                <span className="text-sm font-semibold text-nowrap">{news[0].author.fullName}<p className="max-xl:hidden"> - {formattedDate(news[0].createdDate)}</p></span>
                            </div>
                        </div>
                    </article>}
                    {news.length > 2 && <article onClick={() => navigate(`/news/${news[2].id}`)} className="cursor-pointer relative xl:flex overflow-hidden rounded-[3px] bg-(--Secondary-Color) xl:col-start-6 xl:col-end-13 xl:row-start-2 xl:row-end-3">
                        <div className="absolute xl:hidden bg-(--Primary-Color) rounded-[3px] px-3 py-2 font-semibold text-lg top-6 right-6">{formattedDate(news[0].createdDate)}</div>
                        <img src={news[0].posterUrl} className="xl:w-48 w-full h-48 object-cover" alt={news[0].posterUrl} />
                        <div className="xl:p-5 p-6">
                            <h4 className="xl:text-2xl text-[28px] font-bold text-(--Primary-Color)">{news[0].title}</h4>
                            <p className="xl:mt-2 mt-4 xl:text-lg text-base font-semibold">{news[0].description}</p>
                            <div className="xl:mt-4 mt-9 flex gap-3 items-center">
                                <FaUserCircle size={48} />
                                <span className="text-sm font-semibold text-nowrap">{news[0].author.fullName}<p className="max-xl:hidden"> - {formattedDate(news[0].createdDate)}</p></span>
                            </div>
                        </div>
                    </article>}
                </div>
            </section>

            {/* phần about us */}
            <section className="flex flex-wrap justify-between mt-[135px] 2xl:px-36 xl:py-16 xl:px-26 max-xl:py-12 lg:px-20 md:px-16 max-md:px-14 bg-(--Secondary-Color)">
                <div className="2xl:w-[39%]">
                    <h3 className="text-4xl font-bold text-(--Gray-3) max-2xl:text-center">Về chúng tôi</h3>
                    <p className="mt-6 text-xl font-normal text-(--Gray-3)">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel aliquet tortor ut sit sit. Velit imperdiet integer elementum a scelerisque pulvinar venenatis sodales. Quis nulla euismod feugiat at interdum in. Venenatis arcu semper lectus quis sit in rhoncus auctor.</p>
                    <div className="mt-[74px] grid grid-cols-2 grid-rows-2 gap-14 font-semibold max-2xl:justify-items-center">
                        <div className="py-3 flex max-2xl:w-52 max-2xl:items-center flex-col gap-4">
                            <span className="max-2xl:w-full text-center text-5xl relative after:absolute after:content-[''] after:w-full after:h-0.5 after:bg-(--Dark-Primary) after:bottom-[-5px] after:left-0">150</span>
                            <span className="max-2xl:w-full text-center text-lg relative after:absolute after:content-[''] after:w-1/2 after:h-0.5 after:bg-(--Dark-Primary) after:top-[-5px] after:left-0">Xe hiện có</span>
                        </div>
                        <div className="py-3 flex max-2xl:w-52 max-2xl:items-center flex-col gap-4">
                            <span className="max-2xl:w-full text-center text-5xl relative after:absolute after:content-[''] after:w-full after:h-0.5 after:bg-(--Dark-Primary) after:bottom-[-5px] after:left-0">40</span>
                            <span className="max-2xl:w-full text-center text-lg relative after:absolute after:content-[''] after:w-1/2 after:h-0.5 after:bg-(--Dark-Primary) after:top-[-5px] after:left-0">Xe đã bán</span>
                        </div>
                        <div className="py-3 flex max-2xl:w-52 max-2xl:items-center flex-col gap-4">
                            <span className="max-2xl:w-full text-center text-5xl relative after:absolute after:content-[''] after:w-full after:h-0.5 after:bg-(--Dark-Primary) after:bottom-[-5px] after:left-0">38</span>
                            <span className="max-2xl:w-full text-center text-lg relative after:absolute after:content-[''] after:w-1/2 after:h-0.5 after:bg-(--Dark-Primary) after:top-[-5px] after:left-0">Khách hàng hài lòng</span>
                        </div>
                        <div className="py-3 flex max-2xl:w-52 max-2xl:items-center flex-col gap-4">
                            <span className="max-2xl:w-full text-center text-5xl relative after:absolute after:content-[''] after:w-full after:h-0.5 after:bg-(--Dark-Primary) after:bottom-[-5px] after:left-0">5</span>
                            <span className="max-2xl:w-full text-center text-lg relative after:absolute after:content-[''] after:w-1/2 after:h-0.5 after:bg-(--Dark-Primary) after:top-[-5px] after:left-0">Giải thưởng</span>
                        </div>
                    </div>
                </div>
                <img src={CarAboutUs} className="max-2xl:mx-auto" alt="CarAboutUs" />
            </section>

            {/* phần dịch vụ của chúng tôi */}
            <section className="p-6 mt-[72px] w-[1040px] max-xl:w-4xl max-lg:w-2xl max-md:w-xs mx-auto font-bold">
                <h3 className="text-2xl">Dịch vụ của chúng tôi</h3>
                <div className="mt-6 flex gap-[44px] flex-wrap">
                    {serviceList.map(service =>
                        <div className="cursor-pointer min-w-[300px] max-sm:min-w-64 p-8 flex flex-col justify-center items-center gap-y-2 border rounded-[3px] border-[2px] border-(--Primary-Color)">
                            <img className="w-12 h-12" src={service.icon} alt={"Icon"} />
                            <span className="text-lg text-nowrap">{service.name}</span>
                        </div>
                    )}
                </div>
            </section>

            {/* phần contact */}
            <section className="flex flex-wrap items-center max-2xl:justify-center gap-6 2xl:justify-between px-48 max-2xl:px-38 max-lg:px-28 max-md:px-18 max-sm:px-12 py-16 bg-no-repeat bg-fixed bg-cover bg-center bg-[url(/ContactImg.png)]">
                <div className={"h-[640px] max-xl:h-96 max-lg:h-80 max-sm:h-72 aspect-square"}>
                    <MapContainer
                        center={{ lat: 10.88859436062284, lng: 106.76065518066493 }}
                        zoom={13}
                        scrollWheelZoom={true}
                        className="h-full w-full rounded-md z-5"
                    >
                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={{ lat: 10.88859436062284, lng: 106.76065518066493 }} />
                    </MapContainer>
                </div>
                <form className="w-[535px]" onSubmit={handleSubmitContact(onSubmitContact)}>
                    <h3 className="text-4xl font-bold">Liên hệ</h3>
                    <div className="mt-10">
                        <Label className="text-lg font-medium" htmlFor="nameContact">Họ và tên</Label>
                        <Input className="h-12 px-4 py-[15px] rounded-[3px] bg-(--Light-Secondary) text-(--Gray-2) text-[15px] font-semibold all-unset mt-[5px]" placeholder="Nhập họ và tên" id="nameContact" type="text" {...registerContact("name")}/>
                    </div>
                    <div className="mt-6">
                        <Label className="text-lg font-medium" htmlFor="emailContact">Email</Label>
                        <Input className="h-12 px-4 py-[15px] rounded-[3px] bg-(--Light-Secondary) text-(--Gray-2) text-[15px] font-semibold all-unset mt-[5px]" placeholder="Nhập email" id="emailContact" type="email" {...registerContact("email", {required: "Email là bắt buộc!"})} />
                    </div>
                    {errorsContact.email && <p className="mt-1 error-field">{errorsContact.email.message}</p>}
                    <div className="mt-6">
                        <Label className="text-lg font-medium" htmlFor="phoneNumberContact">Số điện thoại</Label>
                        <Input className="h-12 px-4 py-[15px] rounded-[3px] bg-(--Light-Secondary) text-(--Gray-2) text-[15px] font-semibold all-unset mt-[5px]" placeholder="Nhập số điện thoại" id="phoneNumberContact" type="text" {...registerContact("phoneNumber", {required: "Số điện thoại là bắt buộc!"})}/>
                    </div>
                    {errorsContact.phoneNumber && <p className="mt-1 error-field">{errorsContact.phoneNumber.message}</p>}
                    <div className="mt-6">
                        <Label className="text-lg font-medium" htmlFor="commentContact">Vấn đề cần hỗ trợ</Label>
                        <Textarea className="px-4 py-[15px] rounded-[3px] bg-(--Light-Secondary) text-(--Gray-2) text-[15px] font-semibold all-unset mt-[5px]" placeholder="Hãy viết vấn đề của bạn vào đây..." id="commentContact" {...registerContact("comment")}/>
                    </div>
                    <Button className="cursor-pointer rounded-[3px] bg-(--Primary-Color) w-full px-[61px] py-[15px] text-[15px] font-semibold h-12 mt-[34px]" type="submit">Gửi</Button>
                </form>
            </section>

            {/* phần ngoài lề */}
            <section className="flex justify-around w-full py-3 mx-auto mt-[81px] mb-[93px]">
                {adList.map(ad => 
                    <div className="flex justify-center items-center px-[15px] py-3.5">
                        <img src={ad} alt={"Ad"}/>
                    </div>
                )}
            </section>
        </>
    );
};

export default Home;
