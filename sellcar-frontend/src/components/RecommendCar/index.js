import { Link, Rating, Tab, Tabs, Pagination } from "@mui/material";
import { useState } from "react";
import ScheduleIcon from "../../assets/iwwa_year.svg";
import CapacityIcon from "../../assets/bi_people.svg";
import "./RecommendCar.css";
import { useNavigate } from "react-router-dom";

const RecommendCar = (props) => {
  const { listCar } = props;
  const navigate = useNavigate();

  // State cho Tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // State cho phân trang
  const [page, setPage] = useState(1);
  const carsPerPage = 6; // Số lượng xe hiển thị mỗi trang

  // Tính toán danh sách xe cho trang hiện tại
  const indexOfLastCar = page * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = listCar.slice(indexOfFirstCar, indexOfLastCar);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const formattedNumber = (v) =>
    new Intl.NumberFormat("vi-VN").format(v) + " VND";

  return (
    <>
      <div className="recommended--car">
        <h2>Xe đang bán</h2>
        <div className="nav--list__rcm">
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label="Trong nước"
              sx={{
                textTransform: "none",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "900",
                lineHeight: "normal",
                color: " rgba(0, 123, 199, 0.5)",
                "&.Mui-selected": { color: "#007CC7" },
              }}
            />
            <Tab
              label="Toàn quốc"
              sx={{
                textTransform: "none",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "900",
                lineHeight: "normal",
                color: "rgba(0, 123, 199, 0.5)",
                "&.Mui-selected": { color: "#007CC7" },
              }}
            />
          </Tabs>
        </div>

        <div className="list--car">
          {currentCars.map((it) => (
            <div key={it.id}>
              <div
                className="container--recommend__car"
                onClick={() => navigate(`/detail/${it.id}`)}
              >
                <img src={it?.firstImage || ""} alt={it?.firstImage || ""} />
                <div className="content">
                  <span>{it.condition === "OLD" ? "Đã sử dụng" : "Mới"}</span>
                  <p>{it.title}</p>
                  <p>{formattedNumber(it.price)}</p>
                  <p>{it.address}</p>
                  <div className="box">
                    <div className="box__box">
                      <img src={ScheduleIcon} alt="Year Icon" />
                      <p>{it.year}</p>
                    </div>
                    <div className="box__box">
                      <img src={CapacityIcon} alt="Capacity Icon" />
                      <p>{it.capacity}</p>
                    </div>
                  </div>
                  <div>
                    <Rating
                      readOnly
                      name="half-rating"
                      defaultValue={it.rates}
                      precision={0.1}
                      sx={{
                        color: "#FFF",
                        "& .MuiRating-iconEmpty": {
                          color: "#FFF",
                          WebkitTextStroke: "1px #FFF",
                        },
                      }}
                    />
                    <p>{"(" + it.quantityEvaluate + " lượt đánh giá)"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <Pagination
  count={Math.ceil(listCar.length / carsPerPage)}
  page={page}
  onChange={handlePageChange}
  sx={{
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    "& .MuiPaginationItem-root": {
      color: "#007CC7", // Màu số trang bình thường
      fontWeight: "bold",
    },
    "& .Mui-selected": {
      backgroundColor: "#007CC7 !important", // Màu nền khi được chọn
      color: "#fff !important", // Màu chữ khi được chọn
    },
    "& .MuiPaginationItem-root:hover": {
      backgroundColor: "rgba(0, 124, 199, 0.1)", // Màu nền khi hover
    },
  }}
/>

      </div>
    </>
  );
};

export default RecommendCar;
