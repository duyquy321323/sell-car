import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function ImageGallery(props) {

    const images = props.imageUrls;

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
    return (
      <div className="w-full m-auto">
        {/* Ảnh lớn */}
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="w-full z-0"
        >
          {images?.map((src, index) => (
            <SwiperSlide key={index}>
                <div className="w-full overflow-hidden flex justify-center items-center h-[700px]">
                    <img className="w-full h-auto object-cover z-0" src={src.imageUrl} alt={`Slide ${index}`} />
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
          className="mt-9 px-[124px]"
        >
          {images?.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src.imageUrl} alt={`Thumbnail ${index}`} className="w-full cursor-pointer rounded-[5px] duration-300 transition-all hover:opacity-70" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
  
  export default ImageGallery;