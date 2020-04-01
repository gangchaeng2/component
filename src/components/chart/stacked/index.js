import React from 'react';

import { StackedBar, Stack } from './styled';

const COLORS = ['#e195fc', '#878bff'];

const Stacked = ({ data, width = 176, height = 4 }) => {
  data = Array(2)
    .fill()
    .map(() => Math.floor(Math.random() * 100));
  const total = data.reduce((prev, curr) => prev + curr);

  return (
    <StackedBar width={width} height={height}>
      {data.map((item, key) => {
        const per = (item / total) * 100;
        return <Stack key={key} per={per} color={COLORS[key]}></Stack>;
      })}
    </StackedBar>
  );
};

export default Stacked;
