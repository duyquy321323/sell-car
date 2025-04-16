import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Slider,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../api";
import NewCarIC from "../../assets/ion_car-sport-outline.svg";
import NF2 from "../../assets/Rectangle 103 (1).png";
import NF1 from "../../assets/Rectangle 103.png";
import NF3 from "../../assets/Rectangle 104.png";
import NF4 from "../../assets/Rectangle 105.png";
import NF5 from "../../assets/Rectangle 106.png";
import NF6 from "../../assets/Rectangle 107.png";
import AboutUsImage from "../../assets/Rectangle 110.png";
import SellCarIC from "../../assets/Vector (1).svg";
import UsedCarIC from "../../assets/Vector.svg";
import AboutUsCPN from "../../components/AboutUsCPN";
import InputWithIcon from "../../components/InputTextField";
import RecommendCar from "../../components/RecommendCar";
import "./Home.css";

const formattedNumber = (v) =>
  new Intl.NumberFormat("vi-VN").format(v) + " VND";

const Home = () => {
  const [value, setValue] = useState(0);
  const [value1, setValue1] = React.useState([0,6000000000]);
  const [formContact, setFormContact] = useState(null);
  const [search, setSearch] = useState(null);
  const [carList, setCarList] = useState([]);
  const [page, setPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(10); // Số lượng xe trên mỗi trang

  function handleChangeContact(e) {
    const { name, value } = e.target;
    setFormContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmitContact(e) {
    e.preventDefault();
    try{
      await api.post("/contact", formContact);
      window.alert("Gửi liên hệ thành công! Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất.");
    } catch (e) {
      console.error(e);
      window.alert("Gửi liên hệ thất bại! Vui lòng thử lại sau.")
    }
  }

  async function handleSearch(){
    const payload = {
      title: search,
      condition: value === 0? null : value === 1? "NEW" : "OLD",
      priceFrom: value1? Array.from(value1).at(0) : null,
      priceTo: value1? Array.from(value1).at(1) : null,
    }

    console.log(page);

    try{
      const response = await api.post(`/car?pageNo=${page - 1}&pageSize=${carsPerPage}`, payload);
      setCarList(response.data);
    } catch (e){
      console.error(e);
    }
  }

  useEffect(() => {
    handleSearch()
  }, [search, value, page, carsPerPage]);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  return (
    <>
      <section className="home-page">
        <div className="template">
          <div className="super--title">
            <h1>Hãy tìm chiếc xe mơ ước của bạn</h1>
            <p>Tăng tốc trải nghiệm - Chinh phục mọi cung đường!</p>
          </div>
          <div className="search--home">
            <Tabs value={value} onChange={handleChange} centered>
              <Tab
                label="Tất cả"
                sx={{
                  textTransform: "none",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "900",
                  lineHeight: "normal",
                  color: " rgba(0, 123, 199, 0.5)",
                  "&.Mui-selected": { color: "#007CC7" }, // Khi được chọn // Chọn màu chữ theo value
                }}
              />
              <Tab
                label="Mới"
                sx={{
                  textTransform: "none",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "900",
                  lineHeight: "normal",
                  color: " rgba(0, 123, 199, 0.5)",
                  "&.Mui-selected": { color: "#007CC7" }, // Khi được chọn // Chọn màu chữ theo value
                }}
              />
              <Tab
                label="Đã dùng"
                sx={{
                  textTransform: "none",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "900",
                  lineHeight: "normal",
                  color: "rgba(0, 123, 199, 0.5)",
                  "&.Mui-selected": { color: "#007CC7" }, // Khi được chọn // Chọn màu chữ theo value
                }}
              />
            </Tabs>
            <Box
              sx={{
                marginTop: "24px",
                paddingTop: "33px",
                paddingBottom: "33px",
              }}
            >
              <Grid container gap={1.5}>
                <Grid item xs={3.75}>
                  <TextField
                    fullWidth
                    id="outlined-search"
                    type="search"
                    placeholder="Tìm kiếm"
                    variant="outlined"
                    onChange={(e) => setSearch(e.target.value)}
                    label="" // Bỏ label
                    sx={{
                      borderRadius: "3px",
                      background: "#152836",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": { borderColor: "#A9A9A9" },
                      },
                      "& input": {
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal",
                        color: "#A9A9A9",
                        paddingLeft: "20px", // Đẩy chữ vào để chứa icon
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ fontSize: 32, color: "#A9A9A9" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <div className="price">
                    <div className="title--price">
                      <h3>Mức giá</h3>
                      <p>0đ - 6.000.000.000đ</p>
                    </div>
                    <Box sx={{ width: "70%" }}>
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={value1}
                        min={0}
                        max={6000000000}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        getAriaValueText={formattedNumber}
                      />
                    </Box>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    fullWidth
                    sx={{
                      height: "100%",
                      fontSize: "15px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                      textTransform: "none",
                    }}
                    variant="contained"
                    onClick={handleSearch}
                  >
                    Tìm kiếm
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
          <RecommendCar listCar={carList} setPage={setPage} page={page} carsPerPage={carsPerPage} />
        </div>
      </section>
      <section className="about-us">
        <div className="content--about__us">
          <h1>Về Chúng Tôi</h1>
          <p>
            Chúng tôi tự hào mang đến cho khách hàng những mẫu xe chất lượng từ
            các thương hiệu hàng đầu, đáp ứng mọi nhu cầu từ xe gia đình, xe thể
            thao đến xe sang trọng. Với đội ngũ chuyên gia giàu kinh nghiệm,
            chúng tôi cam kết cung cấp dịch vụ tư vấn chuyên nghiệp, hỗ trợ
            khách hàng tìm được chiếc xe ưng ý với mức giá tốt nhất.
          </p>
          <div>
            <AboutUsCPN number={150} title={"Xe Có Sẵn"} />
            <AboutUsCPN number={40} title={"Xe Đã Bán"} />
            <AboutUsCPN number={38} title={"Khách Hàng Hài Lòng"} />
            <AboutUsCPN number={5} title={"Giải Thưởng"} />
          </div>
        </div>
        <img src={AboutUsImage} alt={AboutUsImage} />
      </section>
      <section className="our-service">
        <h4>Dịch vụ của chúng tôi</h4>
        <div className="tab-list">
          {serviceList.map((it) => {
            return (
              <div>
                <img src={it.icon} alt={it.icon} />
                <p>{it.name}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="contact">
        <div className="contact--map">
        <iframe
              style={{ width: "100%", height: '100%' }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.577731862711!2d106.7695372142139!3d10.850261760047032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f8d0e993b05%3A0x8abf4c480f8b822b!2zOTcgTWFuIFRoacOqbiwgUGjDuiBIaeG7h3AgSMaw4budYywgbmjhuq10IHPDumMgVHJ1w6JuIFbEg25nLCBWaeG7h3QgTmFt!5e0!3m2!1sen!2s!4v1652520257601!5m2!1sen!2s"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
        </div>
        <div className="form--contact">
          <h4>Liên hệ</h4>
          <form onSubmit={handleSubmitContact}>
            <InputWithIcon
              label={"Họ và tên"}
              onChange={handleChangeContact}
              name="name"
              placeHolder={"Nguyễn Văn A"}
              type={"text"}
            />
            <InputWithIcon
              label={"Email"}
              onChange={handleChangeContact}
              name="email"
              placeHolder={"email@mail.com"}
              type={"email"}
            />
            <InputWithIcon
              label={"Số điện thoại"}
              onChange={handleChangeContact}
              name="phoneNumber"
              placeHolder={"0123456789"}
              type={"number"}
            />
            <InputWithIcon
              label={"Ghi chú"}
              onChange={handleChangeContact}
              name="comment"
              placeHolder={"Viết yêu cầu hỗ trợ tại đây"}
              type={"textarea"}
            />
            <Button
              fullWidth
              type="submit"
              sx={{
                padding: "15px 0px",
                textAlign: "center",
                fontSize: "15px",
                fontWeight: "600",
                marginTop: '28px',
              }}
              variant="contained"
            >
              Gửi
            </Button>
          </form>
        </div>
      </section>
      <section className="near--footer">
        <img src={NF1} alt={NF1}/>
        <img src={NF2} alt={NF2}/>
        <img src={NF3} alt={NF3}/>
        <img src={NF4} alt={NF4}/>
        <img src={NF5} alt={NF5}/>
        <img src={NF6} alt={NF6}/>
      </section>
    </>
  );
};

export default Home;
