import { Box, Button, Grid, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import api from "../../api";
import PhoneIC from "../../assets/akar-icons_phone.svg";
import EmailIC from "../../assets/carbon_email.svg";
import Description from "../../components/Description";
import FeatureCheckboxes from "../../components/FeatureCheckboxes";
import ImageGallery from "../../components/ImageGallery";
import InputWithIcon from "../../components/InputTextField";
import "./DetailCar.css";

const formattedNumber = (v) =>
    new Intl.NumberFormat("vi-VN").format(v) + " VND";
const DetailCar = () => {

    const [formContact, setFormContact] = useState();
    const { id } = useParams("id");
    const [detailCar, setDetailCar] = useState(null);

    function handleChange(e){
        const { name, value } = e.target;
        setFormContact(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await api.post(`/contact/dealer?id=${detailCar?.dealerInfo?.id}`, formContact);
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
            console.error(e);
        }
    } 

    useEffect(() => {
        getDetailCar();
    }, [])

    console.log(detailCar);
    
    return (
        <>
            <section className="detail--main__container">
                <h1>{detailCar?.title || ""}</h1>
                <p>Trang chủ - Chi tiết xe</p>
                <ImageGallery imageUrls={detailCar?.imageUrls || null} />
            </section>
            <section className="detail--description">
                <Box sx={{
                    marginLeft: '124px',
                    marginRight: "124px",
                    marginTop: "72px",
                }}>
                <Grid container>
                    <Grid item xs={8}>
                        <Description description={detailCar?.description || ""}/>
                        <FeatureCheckboxes features={detailCar?.features || null}/>
                            <h3>Thông tin của người bán</h3>
                        <div className="dealer--box">
                            <div className="info--dealer">
                                <div className="role">
                                    <FaCircleUser size={56}/>
                                    <div>
                                        <p>{detailCar?.dealerInfo?.fullName || ""}</p>
                                        <p>{detailCar?.dealerInfo?.role || ""}</p>
                                    </div>
                                </div>
                                <div className="phone">
                                    <img src={PhoneIC} alt={PhoneIC}/>
                                    <p>{detailCar?.dealerInfo?.phoneNumber || ""}</p>
                                </div>
                                <div className="email">
                                    <img src={EmailIC} alt={EmailIC}/>
                                    <p>{detailCar?.dealerInfo?.email || ""}</p>
                                </div>
                            </div>
                        </div>
                        <form className="form--contact__dealer" onSubmit={handleSubmit}>
                            <h2>Liên hệ</h2>
                            <Grid container gap={3.5}>
                                <Grid item xs={5.75}>
                                    <InputWithIcon onChange={handleChange} className={"hvt"} label="Họ và tên" placeHolder="Nguyễn Văn A" type="text" name="name"/>
                                    <InputWithIcon onChange={handleChange} label="Số điện thoại" placeHolder="0123456789" type="number" name="phoneNumber"/>
                                </Grid>
                                <Grid item xs={5.75}>
                                    <InputWithIcon onChange={handleChange} label="Email" placeHolder="email@mail.com" type="email" name="email"/>
                                </Grid>
                            </Grid>
                            <InputWithIcon onChange={handleChange} className={"gc"} label="Ghi chú" placeHolder="Viết yêu cầu của bạn tại đây" type="textarea" name="comment"/>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    padding: "15px 0px",
                                    textAlign: "center",
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    marginTop: '49px',
                                }}
                                variant="contained"
                                >
                                Liên hệ người bán
                                </Button>
                        </form>
                        <div className="address--contact__dealer">
                            <h3>Vị trí</h3>
                            <p>{detailCar?.address || ""}</p>
                            <div className="map--dealer">
                            <iframe
                                style={{ width: "100%", height: '100%' }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.577731862711!2d106.7695372142139!3d10.850261760047032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f8d0e993b05%3A0x8abf4c480f8b822b!2zOTcgTWFuIFRoacOqbiwgUGjDuiBIaeG7h3AgSMaw4budYywgbmjhuq10IHPDumMgVHJ1w6JuIFbEg25nLCBWaeG7h3QgTmFt!5e0!3m2!1sen!2s!4v1652520257601!5m2!1sen!2s"
                                width="600"
                                height="450"
                                allowFullScreen=""
                                loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="box--right">
                            <div className="price">
                                {formattedNumber(detailCar?.price || 0)}
                            </div>
                            <div className="car--dts">
                                <h4>Chi tiết</h4>
                                <div className="field--dts">
                                    <div>
                                        <p>Điều kiện</p>
                                        <p>{detailCar?.condition === "OLD"? "Đã sử dụng" : "Mới" || ""}</p>
                                    </div>
                                    <div>
                                        <p>Năm</p>
                                        <p>{detailCar?.year || ""}</p>
                                    </div>
                                    <div>
                                        <p>Số chỗ ngồi</p>
                                        <p>{detailCar?.capacity || ""}</p>
                                    </div>
                                </div>
                                <div className="box--review">
                                <Rating
                                    readOnly
                                    name="half-rating"
                                    value={(detailCar?.rates || 0)}
                                    precision={0.1}
                                    sx={{
                                    color: "#FFF",
                                    fontSize: 32,
                                    "& .MuiRating-iconEmpty": {
                                        color: "#FFF", // Màu viền
                                        WebkitTextStroke: "1px #FFF", // Viền sao
                                    },
                                    }}
                                />
                                <p>{"(" + (detailCar?.quantityEvaluate || 0) + " lượt đánh giá)"}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                </Box>
            </section>
        </>
    );
}

export default DetailCar;