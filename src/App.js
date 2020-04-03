import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as d3 from 'd3';
import styled from 'styled-components';

import Header from './components/header';
import { Home } from './components/carousel';
import { Pie, Stacked, Bar as BarChart } from './components/chart';

const Wrap = styled.div`
  display: flex;
`;

const AnimatedPie = () => {
  const generateData = (value, length = 2) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value,
    }));
  const [data, setData] = useState(generateData(0));

  useEffect(() => {
    setData(generateData());
  }, [!data]);

  return <Pie data={data} width={200} height={200} innerRadius={60} outerRadius={100} />;
};

const Bar = () => {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      index: index,
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value,
    }));

  const [data, setData] = useState(generateData());

  return <BarChart data={data} width={300} height={200} top={20} bottom={30} left={30} right={0} />;
};

function App() {
  return (
    <Wrap>
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/bar-chart" component={BarChart} />
          <Route path="/pie-chart" component={AnimatedPie} />
          <Route path="/stacked-chart" component={Stacked} />
        </Switch>
      </Router>
    </Wrap>
  );
}

export default App;
