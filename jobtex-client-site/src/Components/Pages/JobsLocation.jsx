import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
const JobsLocation = () => {
  return (
    // bg-[#F5F5F2]
    <div className="my-20 px-3 sm:px-0">
      <div className="mb-12">
        <h2 className="text-center mb-3 font-bold text-4xl">Jobs by Location</h2>
        <p className="text-center text-slate-500">
          Find your favourite jobs and get the benefits of yourself
        </p>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        autoplay={{
          delay: 2000,
        }}
        pagination={{ clickable: true }}
        //   navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/wMM2RmF/lo1-369f27fe472a2a217074.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              India
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/tpVh1tK/lo2-a6965da7b25e9be27e01.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              Bangladesh
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/ygd6X12/lo3-e4520233ec0c951a428e.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              Japan
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/ssLZKPM/lo4-3f28328c5fd652bfccaa-1.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              USA
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/ssLZKPM/lo4-3f28328c5fd652bfccaa-1.jpghttps://i.ibb.co/ssLZKPM/lo4-3f28328c5fd652bfccaa-1.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              Canada
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/wMM2RmF/lo1-369f27fe472a2a217074.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              India
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/tpVh1tK/lo2-a6965da7b25e9be27e01.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              Bangladesh
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/ygd6X12/lo3-e4520233ec0c951a428e.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              Japan
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/ssLZKPM/lo4-3f28328c5fd652bfccaa-1.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              USA
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
            
          <div className="relative">
            <img className="rounded"
              src="https://i.ibb.co/ssLZKPM/lo4-3f28328c5fd652bfccaa-1.jpghttps://i.ibb.co/ssLZKPM/lo4-3f28328c5fd652bfccaa-1.jpg"
              alt=""
            />
            <span className="sm:text-2xl bg-white text-black opacity-50 block w-full text-center font-bold absolute bottom-0">
              Canada
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default JobsLocation;
