import React, { useEffect } from 'react';
import * as d3 from 'd3';

import { Chart } from './styled';

const DATA = [
  {
    model_name: '월',
    field1: 67,
    field2: 93,
  },
  {
    model_name: '화',
    field1: 10,
    field2: 56,
  },
  {
    model_name: '수',
    field1: 98,
    field2: 43,
  },
  {
    model_name: '목',
    field1: 28,
    field2: 4,
  },
  {
    model_name: '금',
    field1: 48,
    field2: 13,
  },
  {
    model_name: '토',
    field1: 18,
    field2: 28,
  },
  {
    model_name: '일',
    field1: 19,
    field2: 83,
  },
];

const Bar = ({ data = DATA }) => {
  useEffect(() => {
    var container = d3.select('#d3id'),
      width = 586,
      height = 155,
      margin = { top: 20, right: 22, bottom: 20, left: 22 },
      barPadding = 0,
      axisTicks = { qty: 6, outerSize: 1, dateFormat: '%m-%d' };

    var svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`);

    var xScale0 = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
      .padding(barPadding);
    var xScale1 = d3.scaleBand();
    var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

    var xAxis = d3.axisBottom(xScale0).tickSize(1);
    var yAxis = d3
      .axisLeft(yScale)
      .ticks(axisTicks.qty)
      .tickSize(0);

    xScale0.domain(DATA.map(d => d.model_name));
    xScale1.domain(['field1', 'field2']).range([0, xScale0.bandwidth()]);
    yScale.domain([0, d3.max(DATA, d => (d.field1 > d.field2 ? d.field1 : d.field2))]);

    var model_name = svg
      .selectAll('.model_name')
      .data(DATA)
      .enter()
      .append('g')
      .attr('class', 'model_name')
      .attr('transform', d => `translate(${xScale0(d.model_name)}, 0)`);

    /* Add field1 bars */
    model_name
      .selectAll('.bar.field1')
      .data(d => [d])
      .enter()
      .append('rect')
      .attr('class', 'bar field1')
      .style('fill', '#8f6dff')
      .attr('x', d => xScale1('field2') - 4)
      .attr('y', d => yScale(d.field1))
      .attr('width', 4)
      .attr('height', d => {
        return height - margin.top - margin.bottom - yScale(d.field1);
      });

    /* Add field2 bars */
    model_name
      .selectAll('.bar.field2')
      .data(d => [d])
      .enter()
      .append('rect')
      .attr('class', 'bar field2')
      .style('fill', '#62bbf5')
      .attr('x', d => xScale1('field2') + 2)
      .attr('y', d => yScale(d.field2))
      .attr('width', 4)
      .attr('height', d => {
        return height - margin.top - margin.bottom - yScale(d.field2);
      });

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(xAxis)
      .attr('y', 15)
      .style('fill', '#888888')
      .style('font-size', '16px')
      .selectAll('.domian')
      .style('opcity', 0);

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .selectAll('text')
      .style('fill', '#888888')
      .style('font-size', '14px')
      .style('font-weight', 300);
  }, [data]);

  return <Chart id="d3id"></Chart>;
};

export default Bar;
