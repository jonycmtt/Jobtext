import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation, Pagination,FreeMode } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
const Brands = () => {
  return (
    <div className="bg-[#123841] pb-12 px-5 rounded-xl">
      <h1 className="text-center pt-6 text-slate-400 font-bold mb-6 text-xl">Over 100,000 Recruiters Use Jobtex To Modernize Their Hiring</h1>
      <Swiper
      autoplay={{
        delay: 2000,
      }}
        spaceBetween={50}
        slidesPerView={5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay, Pagination, Navigation,FreeMode]}
      >
        <SwiperSlide><img className="sm:w-40" src="https://i.ibb.co/163Fjf4/download-7.png" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-40" src="https://i.ibb.co/s1r1TKc/download-5.png" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-40" src="https://i.ibb.co/163Fjf4/download-7.png" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-40" src="https://i.ibb.co/jTKYMQf/download-3.png" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-40" src="https://i.ibb.co/tDNgrry/download-2.png" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-40" src="https://i.ibb.co/zHNsB02/download-1.png" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-40" src="https://i.ibb.co/163Fjf4/download-7.png" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-40" src="https://i.ibb.co/jTKYMQf/download-3.png" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-40" src="https://i.ibb.co/tDNgrry/download-2.png" alt="" /></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Brands;
