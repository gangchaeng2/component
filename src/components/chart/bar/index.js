import React, { useEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import * as d3 from 'd3';

import { Wrap, Chart } from './styled';

const DATA = [
  {
    model_name: '월',
    date: '15',
    field1: 67,
    field2: 93,
  },
  {
    model_name: '화',
    date: '16',
    field1: 10,
    field2: 56,
  },
  {
    model_name: '수',
    date: '17',
    field1: 98,
    field2: 43,
  },
  {
    model_name: '목',
    date: '18',
    field1: 28,
    field2: 4,
  },
  {
    model_name: '금',
    date: '19',
    field1: 48,
    field2: 13,
  },
  {
    model_name: '토',
    date: '20',
    field1: 18,
    field2: 28,
  },
  {
    model_name: '일',
    date: '21',
    field1: 19,
    field2: 83,
  },
];

const WEEK = ['월', '화', '수', '목', '금', '토', '일'];

const animationDuration = 150;
const animationConfig = {
  to: async (next, cancel) => {
    await next({ t: 1 });
  },
  from: { t: 0 },
  config: { duration: animationDuration },
  reset: true,
};

const XAxis = ({ top, bottom, left, right, height, scale }) => {
  const axis = useRef(null);

  useEffect(() => {
    d3.select(axis.current)
      .call(d3.axisBottom(scale).tickSize(0))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('line').remove())
      .selectAll('text')
      .attr('y', '10')
      .append('tspan')
      .data(WEEK)
      .attr('x', 0)
      .attr('y', 35)
      .text(d => d)
      .transition()
      .duration(animationDuration);
  });

  return <g className="x" ref={axis} transform={`translate(${left}, ${height - bottom})`} />;
};

const YAxis = ({ width, top, bottom, left, right, scale }) => {
  const axis = useRef(null);

  useEffect(() => {
    d3.select(axis.current)
      .call(
        d3
          .axisLeft(scale)
          .tickSize(-(width - left - right))
          .ticks(6),
      )
      .call(g => g.select('.domain').remove())
      .transition()
      .duration(animationDuration);
  });

  return <g className="y" ref={axis} transform={`translate(${left}, ${top})`} />;
};

const Rect = ({ index, data, prev, next, x, y, height, top, bottom }) => {
  const [animatedProps, setAnimatedProps] = useSpring(() => animationConfig);
  setAnimatedProps(animationConfig);

  const prevIndex = prev.findIndex(d => d.date === next[index].date);
  // const interpolator = d3.interpolate(prev[index], data);
  const shouldUpdate = prev[index].model_name === data.model_name && prev[index].field1 !== data.field1;
  const interpolatorX = d3.interpolate(x(prev[prevIndex].date), x(data.date));
  const interpolatorY = d3.interpolate(y(shouldUpdate ? prev[index].field1 : data.field1), y(data.field1));

  return (
    <animated.g
      key={data.index}
      transform={animatedProps.t.interpolate(t => {
        return `translate(${interpolatorX(t)}, ${interpolatorY(t)})`;
      })}>
      <animated.rect
        width={x.bandwidth() / 4}
        height={animatedProps.t.interpolate(t => {
          return height - bottom - top - interpolatorY(t);
        })}
        fill={'#bbb'}
      />
    </animated.g>
  );
};

const Bar = ({ list = DATA, width = 522, height = 155, top = 20, bottom = 40, left = 28, right = 0 }) => {
  const cache = useRef(list);
  const data = useRef(list);

  useEffect(() => {
    cache.current = data.current;
  });

  const x0 = d3
    .scaleBand()
    .range([left, width])
    .domain(DATA.map(d => d.date))
    .padding(0.5);
  const x1 = d3.scaleBand().domain(['field1', 'field2']).range([0, x0.bandwidth()]);
  const y = d3
    .scaleLinear()
    .range([height - top - bottom, 0])
    .domain([0, d3.max(DATA, d => (d.field1 > d.field2 ? d.field1 : d.field2))])
    .nice();

  useEffect(() => {
    cache.current = data.current;
  });

  return (
    <Chart>
      <svg width={width} height={height}>
        <XAxis scale={x0} top={top} bottom={bottom} left={left} right={right} height={height} />
        <YAxis scale={y} top={top} bottom={bottom} left={left} right={right} width={width} />
        <g transform={`translate(${left}, ${top})`}>
          {list.map((d, i) => (
            <Rect
              key={i}
              index={i}
              data={d}
              prev={cache.current}
              next={data.current}
              x={x0}
              y={y}
              top={top}
              bottom={bottom}
              height={height}
            />
          ))}
        </g>
      </svg>
    </Chart>
  );
};

export default Bar;
