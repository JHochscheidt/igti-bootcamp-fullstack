import React, { useState, useEffect } from 'react';
import PreLoader from './components/PreLoader';
import Form from './components/Form';
import Installments from './components/Installments';

export default function App() {
  const [initialCapital, setInitialCapital] = useState(0);
  const [monthlyInterestRate, setMonthlyInterestRate] = useState(0.0);
  const [period, setPeriod] = useState(0);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    // effect;
    return () => {
      // cleanup;
    };
  }, [initialCapital, monthlyInterestRate, period]);

  const handleChangeInputs = () => {};

  return (
    <div className="container">
      <Form
        className="center"
        initialCapital={initialCapital}
        monthlyInterestRate={monthlyInterestRate}
        period={period}
        onChangeInputs={handleChangeInputs}
      />
      <Installments />
    </div>
  );
}
