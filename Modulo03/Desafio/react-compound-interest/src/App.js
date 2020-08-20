import React, { useState, useEffect } from "react";
import { formatCurrency, formatNumber } from "./helpers/formatHelper";

export default function App() {
  const [initialCapital, setInitialCapital] = useState(0);
  const [monthlyInterestRate, setMonthlyInterestRate] = useState(0);
  const [period, setPeriod] = useState(0);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    let newInstallments = [];
    let capital = initialCapital;
    // let yield = 0;
    for (let i = 1; i <= period; i++) {
      let newInstallment = {};
      newInstallment.period = i;
      newInstallment.capital = (capital / 100) * monthlyInterestRate + capital;
      newInstallment.yield = newInstallment.capital - initialCapital;
      newInstallment.yieldPercent =
        (newInstallment.yield * 100) / initialCapital;
      capital = newInstallment.capital;
      newInstallments.push(newInstallment);
    }
    setInstallments(newInstallments);
  }, [initialCapital, monthlyInterestRate, period]);

  const handleOnSubmitForm = (event) => {
    event.preventDefault();
  };

  const handleCapital = (event) => {
    setInitialCapital(+event.target.value);
    // handleInstallments();
  };

  const handleInterestRate = (event) => {
    setMonthlyInterestRate(+event.target.value);
    // handleInstallments();
  };

  const handlePeriod = (event) => {
    setPeriod(+event.target.value);
    // handleInstallments();
  };

  return (
    <div className="container center">
      <header>
        <h1>React - Compound Interest</h1>
      </header>
      <form
        onSubmit={handleOnSubmitForm}
        style={styles.form}
        className="container center"
      >
        <div className="input-field" style={styles.input}>
          <label htmlFor="initialCapital" className="active">
            Initial Capital
          </label>
          <input
            type="number"
            id="initialCapital"
            value={initialCapital}
            onChange={handleCapital}
            step={100}
            min={0}
          />
        </div>
        <div className="input-field" style={styles.input}>
          <label htmlFor="interestRate" className="active">
            Interest Rate (Monthly):
          </label>
          <input
            type="number"
            id="interestRate"
            value={monthlyInterestRate}
            onChange={handleInterestRate}
            step={0.1}
          />
        </div>
        <div className="input-field" style={styles.input}>
          <label htmlFor="period" className="active">
            Period (Monthly):
          </label>
          <input
            type="number"
            id="period"
            value={period}
            onChange={handlePeriod}
            step={1}
            min={0}
          />
        </div>
      </form>

      <div style={styles.installments}>
        {installments.map((installment) => {
          return (
            <div style={styles.installment} key={installment.period}>
              <div style={styles.ith}>
                <span>{installment.period}</span>
              </div>

              <div
                style={monthlyInterestRate < 0 ? styles.negative : styles.info}
              >
                <span>{formatCurrency(installment.capital)}</span>
                <span>{formatCurrency(installment.yield)}</span>
                <span style={styles.yieldPercent}>
                  {`${formatNumber(installment.yieldPercent)} %`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "25px 0",
  },
  input: {
    width: "250px",
    minWidth: "150px",
    maxWidth: "350px",
    margin: "10px",
  },
  installments: {
    border: "solid 1px lightgray",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  installment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    border: "solid 1px lightgray",
    borderRadius: "5px",
    margin: "20px",
    minWidth: "100px",
  },
  ith: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "5px",
    fontWeight: "bold",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px",
    color: "green",
    fontWeight: "bold",
  },
  yieldPercent: {
    color: "blue",
    fontWeight: "normal",
  },
  negative: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px",
    color: "red",
    fontWeight: "bold",
  },
};
