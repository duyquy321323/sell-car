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
                <div className="w-full overflow-hidden flex justify-center items-center h-[700px] max-2xl:h-[500px] max-lg:h-[400px] max-md:h-[300px] max-sm:h-[200px]">
                    <img className="w-full h-auto object-cover z-0" src={src.imageUrl} alt={`Slide ${index}`} />
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
  
        {/* Danh sách ảnh nhỏ */}
        <Swiper
          modules={[Thumbs]}
          slidesPerView={6}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          className="swiper-container mt-9 px-[124px] flex max-2xl:px-24 max-lg:px-16 max-sm:px-8"
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