import React, { useEffect, useState } from "react";
import api from "../../api";
import NewCarIC from "../../assets/ion_car-sport-outline.svg";
import SellCarIC from "../../assets/Vector (1).svg";
import UsedCarIC from "../../assets/Vector.svg";
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
        Home
    </>
  );
};

export default Home;
