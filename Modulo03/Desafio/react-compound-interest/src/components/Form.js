import React from 'react';
import Input from './Input';

export default function Form({
  setInitialCapital,
  setMonthlyInterestRate,
  setPeriod,
}) {
  const handleOnSubmitForm = (event) => {
    event.preventDefault();
  };

  const handleChangeCapitalInput = (newValue) => {
    setInitialCapital(+newValue);
  };

  const handleChangeMonthlyInterestRate = (newValue) => {
    setMonthlyInterestRate(+newValue);
  };

  const handleChangePeriod = (newValue) => {
    setPeriod(+newValue);
  };

  return (
    <div className="center">
      <h1>React - Compound Interest</h1>
      <form
        onSubmit={handleOnSubmitForm}
        style={styles.form}
        className="center"
      >
        <Input
          label={'initialCapitalInput'}
          labelText={'Initial Capital'}
          step={100}
          value={1000.01}
          onChangeCapitalInput={handleChangeCapitalInput}
        />
        <Input
          label={'interestRateInput'}
          labelText={'Rate Interest (Monthly):'}
          step={0.1}
          value={0.5}
          onChangeInterestRateInput={handleChangeMonthlyInterestRate}
        />
        <Input
          label={'periodInput'}
          labelText={'Period (Monthly):'}
          step={1}
          value={12}
          onChangePeriodInput={handleChangePeriod}
        />
      </form>
    </div>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '25px 0',
  },
};
