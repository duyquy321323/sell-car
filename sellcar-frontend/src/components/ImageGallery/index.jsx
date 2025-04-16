import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./ImageGallery.css";
import "swiper/css/thumbs";

function ImageGallery(props) {

    const images = props.imageUrls;

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
    return (
      <div className="gallery-container">
        {/* Ảnh lớn */}
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="main-slider"
          style={{ zIndex: 0 }} 
        >
          {images?.map((src, index) => (
            <SwiperSlide key={index}>
                <div className="large-image">
              <img src={src.imageUrl} alt={`Slide ${index}`} />
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
  
        {/* Danh sách ảnh nhỏ */}
        <Swiper
          modules={[Thumbs]}
          slidesPerView={6}
          spaceBetween={36}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          className="thumb-slider"
        >
          {images?.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src.imageUrl} alt={`Thumbnail ${index}`} className="thumb-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
  
  export default ImageGallery;