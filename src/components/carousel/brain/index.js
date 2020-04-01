import React, { useState, useEffect } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import range from 'lodash/range';

import '@brainhubeu/react-carousel/lib/style.css';

import { Wrap, Card } from './styled';

const CNT = 7;

export const Brain = ({ view = 2 }) => {
  const [idx, setIdx] = useState(0);

  const onChangeIdx = e => {
    const tempIdx = idx + view;
    console.log(e, idx, tempIdx);

    if (tempIdx > CNT - view) {
      return false;
    } else {
      setIdx(tempIdx);
    }
  };

  return (
    <Wrap>
      <Carousel slidesPerPage={2} arrows itemWidth={580} value={idx} onChange={onChangeIdx}>
        {range(CNT).map((item, key) => {
          const isLast = key === CNT - 1;
          return (
            <Card key={key} isLast={isLast}>
              {key}
            </Card>
          );
        })}
      </Carousel>
    </Wrap>
  );
};

export default Brain;
