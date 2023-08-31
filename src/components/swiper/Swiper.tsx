import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/bundle';
import FlexContainer from '../containers/FlexContainer';

interface SwiperProps {
  imageUrlArray: string[];
}

export default function SwiperContainer({ imageUrlArray }: SwiperProps) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      centeredSlides
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {imageUrlArray.map((url) => {
        return (
          <SwiperSlide key={url}>
            <FlexContainer
              style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none',
                overflow: 'hidden',
              }}
            >
              <img style={{ maxInlineSize: '100%', blockSize: 'auto', objectFit: 'contain' }} src={url} alt="" />
            </FlexContainer>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
