import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/bundle';
import './Swiper.scss';

interface SwiperProps {
  imageUrlArray: string[];
  onImageClick: (index: number) => void | null;
}

export default function SwiperContainer({ imageUrlArray, onImageClick }: SwiperProps) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      centeredSlides
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {imageUrlArray.map((url, index) => {
        return (
          <SwiperSlide key={url} onClick={() => onImageClick(index)}>
            <img src={url} alt="" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
