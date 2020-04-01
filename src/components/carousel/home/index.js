import React from 'react';
import range from 'lodash/range';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { Wrap, CardWrap, Card, Btn } from './styled';

const CNT = 7;
const GAP = 20;

const BtnComponent = () => {
  return <Btn>back</Btn>;
};

const Carousel = ({ currentSlide }) => {
  console.log(580 * CNT - 20 * (CNT - 1));
  return (
    <Wrap>
      <CarouselProvider totalSlides={CNT} step={2} visibleSlides={2.3} dragEnabled={false} naturalSlideWidth={580} naturalSlideHeight={410}>
        <div style={{ overflow: 'hidden' }}>
          <Slider>
            {range(CNT).map((item, key) => {
              return (
                <Slide key={key} index={key}>
                  <Card>{key}</Card>
                </Slide>
              );
            })}
            {/* <Slide index={0}>
              <Card>0</Card>
            </Slide>

            <Slide index={1}>
              <Card>1</Card>
            </Slide>

            <Slide index={2}>
              <Card>2</Card>
            </Slide>

            <Slide index={3}>
              <Card>3</Card>
            </Slide>

            <Slide index={4}>
              <Card>4</Card>
            </Slide> */}
          </Slider>
        </div>
        {/* <Btn>back</Btn> */}
        {/* <ButtonNext children={() => BtnComponent()} /> */}
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </Wrap>
  );
};

export default Carousel;
