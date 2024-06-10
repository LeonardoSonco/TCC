import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";
import PdfDocument from "../PdfViewerImage";

const Carousel = ({ fileOne, fileTwo = [] }: any) => {
  var images: any = [];

  if (fileTwo.length > 0 && fileOne.length > 0) {
    images = Array.from({ length: 5 }, (_, index) => (
      <SwiperSlide key={index} className="my-5 mb-8">
        <div className="flex justify-center items-center gap-4 max-sm++:flex-col">
          <div className="text-center">
            <PdfDocument
              pdfFile={fileOne[index]}
              doubleImage={true}
            ></PdfDocument>
            <h3>CM_Real_KNN_k{index + 1}</h3>
          </div>

          <div>
            <PdfDocument
              pdfFile={fileTwo[index]}
              doubleImage={true}
            ></PdfDocument>
            <h3>CM_Synthetic_KNN_k{index + 1}</h3>
          </div>
        </div>
      </SwiperSlide>
    ));
  } else if (fileOne) {
    images = Array.from({ length: 5 }, (_, index) => (
      <SwiperSlide key={index} className="my-5 mb-8">
        <div className="flex justify-center items-center gap-4 max-sm++:flex-col ">
          <div className="text-center">
            <PdfDocument pdfFile={fileOne[index]}></PdfDocument>
            <h3 className="">Curve_training_error_k_{index + 1}</h3>
          </div>
        </div>
      </SwiperSlide>
    ));
  }

  return (
    <Swiper
      className="myswiper mx-5"
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      {images}
    </Swiper>
  );
};

export default Carousel;
