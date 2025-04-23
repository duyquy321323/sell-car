import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import api from "../../api";
import ImageGallery from "./ImageGallery";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import ReadOnlyRating from "../../components/CarRecommendCard/Rating";

const formattedNumber = (v) =>
    new Intl.NumberFormat("vi-VN").format(v) + " VND";
const DetailCar = () => {

    const { id } = useParams("id");
    const [detailCar, setDetailCar] = useState(null);
    const [isMore, setIsMore] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues:{
            name: "",
            email: "",
            phoneNumber: "",
            comment: "",
        }
    })

    async function onSubmit(data){
        try{
            await api.post(`/contact/dealer?id=${detailCar?.dealerInfo?.id}`, data);
            window.alert("Gửi liên hệ thành công! Người bán sẽ phản hồi bạn trong thời gian sớm nhất.")
        } catch (e) {
            window.alert("Gửi liên hệ thất bại!!!");
            console.error(e);
        }
    }

    async function getDetailCar(){
        try{
            const response = await api.get(`/car/${id}`);
            setDetailCar(response.data);
        } catch (e) {
            toast("Lỗi kết nối!!!");
        }
    } 

    useEffect(() => {
        getDetailCar();
    }, [])

    const breadcrumbs = [
        {
            path: "/home", 
            name: "Trang chủ"
        }, 
        {
            path: "/home", 
            name: "Danh cách xe đang hot"
        }, 
        {
            path: `/car/${id}`, 
            name: "Chi tiết xe"
        }
    ];

    const textRef = useRef();
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > 171);
    }
  }, []);

    return (
        <>
            {/* phần tiêu đề (hero) */}
            <section className="flex flex-col gap-6 px-[124px] mt-[46px] mb-[51px]">
                <h1 className="text-5xl font-semibold">{detailCar?.title}</h1>
                <Breadcrumb>
                    <BreadcrumbList className="text-white text-lg font-semibold">
                        {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb, index) => 
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={breadcrumb.path}>{breadcrumb.name}</BreadcrumbLink>
                            <BreadcrumbSeparator/>
                        </BreadcrumbItem>
                        )}

                        <BreadcrumbItem>
                            <BreadcrumbLink href={breadcrumbs[2].path}>{breadcrumbs[2].name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            {/* phần ảnh xe */}
            <ImageGallery imageUrls={detailCar?.imageUrls}/>

            {/* phần nội dung chia 2 cột */}
            <section className="mx-[124px] mb-[86px] grid grid-cols-12 mt-[72px] gap-x-[133px]">
                <div className="col-start-1 col-end-8">

                    {/* phần description */}
                    <section>
                        <h3 className="text-2xl font-bold text-(--Gray-3)">Mô tả</h3>
                        <p onClick={() => setIsMore(prev => !prev)} ref={textRef} className={((isOverflowing && !isMore)? "text-description h-[171px]" : "") + " cursor-pointer mt-4 overflow-hidden font-normal text-base"}>{detailCar?.description}</p>
                        <span onClick={() => setIsMore(prev => !prev)} className={"mt-3 text-base font-normal text-(--Primary-Color) hover:underline cursor-pointer " + (!isOverflowing? "hidden" : "")} >{isMore? "Thu gọn" : "Xem thêm"}</span>
                    </section>

                    {/* phần feature */}
                    <section className="mt-[72px]">
                        <h3 className="text-2xl text-(--Gray-3) font-bold">Tính năng</h3>
                        <div className="mt-4 flex flex-wrap gap-3">
                            {detailCar? Array.from(detailCar?.features).map((feature, index) => 
                            <div className="p-4 rounded-[3px] flex gap-3 bg-(--Secondary-Color)">
                                <Checkbox id={"feature" + index} className="text-black border-white w-[22px] h-[22px] rounded-[2px]" checked={true} key={index}/>
                                <label className="text-lg font-normal" htmlFor={"feature" + index}>{feature?.name}</label>
                            </div>
                            ) : <></>}
                        </div>
                    </section>

                    {/* phần thông tin dealer */}
                    <section className="mt-[115px]">
                        <h3 className="text-2xl text-(--Gray-3) font-bold">Thông tin của người bán</h3>
                        <div className="mt-4 py-4 flex justify-evenly bg-(--Secondary-accent)">
                            <div className="flex gap-4 justify-center items-center">
                                <FaUserCircle size={56}/>
                                <div>
                                    <p className="text-lg font-semibold">{detailCar?.dealerInfo.fullName}</p>
                                    <p className="text-sm font-normal">Nguời bán</p>
                                </div>
                            </div>
                            <div className="relative after:absolute after:content-[''] after:w-px after:h-full after:bg-white"></div>
                            <div className="flex gap-4 justify-center items-center">
                                <FaPhone size={24}/>
                                <p className="text-lg font-semibold">{detailCar?.dealerInfo.phoneNumber}</p>
                            </div>
                            <div className="relative after:absolute after:content-[''] after:w-px after:h-full after:bg-white"></div>
                            <div className="flex gap-4 justify-center items-center">
                                <IoIosMail size={24}/>
                                <p className="text-lg font-semibold">{detailCar?.dealerInfo.email}</p>
                            </div>
                        </div>
                    </section>

                    {/* phần liên hệ với người bán */}
                    <section className="mt-[72px]">
                        <h3 className="text-2xl text-(--Gray-3) font-bold">Liên hệ với người bán</h3>
                        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label className="mb-2 text-base font-medium" htmlFor="name">Họ và tên</Label>
                                    <Input className="px-4 h-12 bg-(--Light-Secondary) py-[15px] text-(--Gray-2) text-[15px] rounded-[3px] all-unset font-semibold" id="name" placeholder="Nhập họ và tên" type="text" {...register("name")}/>
                                </div>
                                <div>
                                    <Label className="mb-2 text-base font-medium" htmlFor="email">Email</Label>
                                    <Input className="px-4 h-12 bg-(--Light-Secondary) py-[15px] text-(--Gray-2) text-[15px] rounded-[3px] all-unset font-semibold" id="email" placeholder="Nhập email" type="email" {...register("email", {required: "Email là bắt buộc!"})}/>
                                {errors.email && <p className="error-field mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <Label className="mb-2 text-base font-medium" htmlFor="phoneNumber">Số điện thoại</Label>
                                    <Input className="px-4 h-12 bg-(--Light-Secondary) py-[15px] text-(--Gray-2) text-[15px] rounded-[3px] all-unset font-semibold" id="phoneNumber" placeholder="Nhập số điện thoại" type="text" {...register("phoneNumber", {required: "Số điện thoại là bắt buộc!"})}/>
                                {errors.phoneNumber && <p className="error-field mt-1">{errors.phoneNumber.message}</p>}
                                </div>
                            </div>
                            <div className="mt-6">
                                <Label className="mb-2 text-base font-medium" htmlFor="comment">Ghi chú</Label>
                                <Textarea className="px-4 bg-(--Light-Secondary) py-[15px] text-(--Gray-2) text-[15px] rounded-[3px] all-unset font-semibold" placeholder="Viết ghi chú của bạn" id="comment" {...register("comment")}/>
                            </div>
                            <Button className="w-full h-12 hover:opacity-80 active:opacity-70 cursor-pointer mt-[50px] bg-(--Primary-Color) px-[61px] py-[15px] rounded-[3px] text-[15px] font-semibold" type="submit">Gửi</Button>
                        </form>
                    </section>

                    {/* phần vị trí */}
                    <section className="mt-[72px]">
                        <h3 className="text-2xl text-(--Gray-3) font-bold">Vị trí</h3>
                        <p className="mt-4 text-sm font-normal">{detailCar?.address}</p>
                        <div className={"h-[323px] max-xl:h-96 mt-2 max-lg:h-80 max-sm:h-72"}>
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
                    </section>
                </div>
                <div className="col-start-8 col-end-13">
                    <p className="text-2xl font-bold px-[61px] py-[15px] text-center text-(--Primary-Color) border rounded-[3px] border-(--Primary-Color)">{formattedNumber(detailCar?.price)}</p>
                    <div className="mt-[72px] p-6 rounded-[3px] bg-(--Secondary-accent)">
                        <h3 className="text-xl font-bold">Các thông tin chi tiết của xe</h3>
                        <div className="mt-[18px] flex justify-between">
                            <h4 className="text-(--Gray-2) text-base font-medium">Điều kiện</h4>
                            <span className="text-lg font-normal">{detailCar?.condition === "NEW"? "Xe mới" : "Xe cũ"}</span>
                        </div>
                        <div className="mt-2 flex justify-between">
                            <h4 className="text-(--Gray-2) text-base font-medium">Năm</h4>
                            <span className="text-lg font-normal">{detailCar?.year}</span>
                        </div>
                        <div className="mt-2 flex justify-between">
                            <h4 className="text-(--Gray-2) text-base font-medium">Số chỗ ngồi</h4>
                            <span className="text-lg font-normal">{detailCar?.capacity}</span>
                        </div>
                        <div className="mt-[18px] relative after:absolute after:content-[''] after:w-full after:h-px after:bg-white"></div>
                        <div className="mt-9 flex justify-between items-center">
                            <ReadOnlyRating size={32} value={detailCar?.rates}/>
                            <p className="text-base font-bold">({detailCar?.quantityEvaluate} Lượt đánh giá)</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default DetailCar;