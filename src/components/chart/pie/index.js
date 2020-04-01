import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const COLORS = ['#e195fc', '#878bff'];

const Pie = ({ data: propData, innerRadius, outerRadius, width, height }) => {
  const ref = useRef(null);
  const cache = useRef(propData);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  useEffect(() => {
    const data = createPie(propData);
    const prevData = createPie(cache.current);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll('g.arc').data(data);

    // 데이터가 g.arc 요소 수 보다 적은 경우 요소를 삭제
    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append('g')
      .attr('class', 'arc');

    // groupWithUpdate와 groupWithData를 합쳐 selection 리턴
    const path = groupWithUpdate.append('path').merge(groupWithData.select('path.arc'));

    const arcTween = (d, i) => {
      const interpolator = d3.interpolate(prevData[i], d);
      return t => createArc(interpolator(t));
    };

    path
      .attr('class', 'arc')
      .attr('fill', (d, i) => COLORS[i])
      .transition()
      .attrTween('d', arcTween);

    cache.current = data;
  }, [propData]);

  return (
    <svg width={width} height={height}>
      <g ref={ref} transform={`translate(${outerRadius} ${outerRadius})`} />
    </svg>
  );
};

export default Pie;
