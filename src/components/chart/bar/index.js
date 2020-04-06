import React, { useEffect } from 'react';
import * as d3 from 'd3';

import { Chart } from './styled';

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

const Bar = ({ data = DATA }) => {
  useEffect(() => {
    const container = d3.select('#bar'),
      width = 522,
      height = 155,
      margin = { top: 30, right: 0, bottom: 30, left: 0 },
      barPadding = 0,
      axisTicks = { qty: 6, outerSize: 1 };

    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(30, 20)`);

    const xScale0 = d3
      .scaleBand()
      .range([margin.left, width])
      .padding(barPadding);
    const xScale1 = d3.scaleBand();
    const yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

    xScale0.domain(DATA.map(d => d.model_name));
    xScale1.domain(['field1', 'field2']).range([0, xScale0.bandwidth()]);
    yScale.domain([0, d3.max(DATA, d => (d.field1 > d.field2 ? d.field1 : d.field2))]).nice();

    const xAxis = g =>
      g
        .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(xScale0).tickSize(0))
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('line').remove());

    const yAxis = g =>
      g
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(
          d3
            .axisLeft(yScale)
            .tickSize(-(width - margin.left - margin.right))
            .ticks(axisTicks.qty),
        )
        .call(g => g.select('.domain').remove());

    // X축
    svg
      .append('g')
      .attr('class', 'x')
      .call(xAxis)
      .selectAll('text')
      .attr('y', 10)
      .append('tspan')
      .data(DATA)
      .attr('x', 0)
      .attr('y', 35)
      .text(d => d.date);

    // Y축
    svg
      .append('g')
      .attr('class', 'y')
      .call(yAxis)
      .selectAll('text')
      .attr('x', -5);

    const model_name = svg
      .selectAll('.model_name')
      .data(DATA)
      .enter()
      .append('g')
      .attr('class', 'model_name')
      .attr('transform', d => `translate(${xScale0(d.model_name)}, 0)`);

    // 문의접수
    model_name
      .selectAll('.bar.field1')
      .data(d => [d])
      .enter()
      .append('rect')
      .style('fill', '#8f6dff')
      .attr('x', d => xScale1('field2') - 4)
      .attr('y', d => yScale(d.field1))
      .attr('width', 4)
      .attr('height', d => {
        return height - margin.top - margin.bottom - yScale(d.field1);
      });

    // 응답완료
    model_name
      .selectAll('.bar.field2')
      .data(d => [d])
      .enter()
      .append('rect')
      .style('fill', '#62bbf5')
      .attr('x', d => xScale1('field2') + 2)
      .attr('y', d => yScale(d.field2))
      .attr('width', 4)
      .attr('height', d => {
        return height - margin.top - margin.bottom - yScale(d.field2);
      });
  }, [data]);

  return <Chart id="bar"></Chart>;
};

export default Bar;
