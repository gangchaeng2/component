import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addWeeks from 'date-fns/addWeeks';

const Week = () => {
  const [amount, setAmount] = useState(0);
  const [start, setStart] = useState(startOfWeek(new Date()));
  const [end, setEnd] = useState(endOfWeek(new Date()));

  useEffect(() => {
    const week = addWeeks(new Date(), amount);
    console.log(week);

    setStart(startOfWeek(week));
    setEnd(endOfWeek(week));
  }, [amount]);

  return (
    <div>
      <p>amout: {amount}</p>
      <p>
        {format(start, 'yy.MM.dd')} ~ {format(end, 'yy.MM.dd')}
      </p>
      <button onClick={() => setAmount(state => state - 1)}>-</button>
      <button onClick={() => setAmount(state => state + 1)}>+</button>
    </div>
  );
};

export default Week;
