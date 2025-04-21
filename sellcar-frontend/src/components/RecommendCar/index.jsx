import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CapacityIcon from "../../assets/bi_people.svg";
import ScheduleIcon from "../../assets/iwwa_year.svg";
import "./RecommendCar.css";

const RecommendCar = (props) => {
  const { listCar, setPage, page } = props;
  const navigate = useNavigate();

  // State cho Tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          {listCar?.content?.map((it) => (
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
  count={listCar?.totalPages} 
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
