import React from 'react';

export default function Installment() {
  return (
    <div className="container" style={styles.installment}>
      <div style={styles.ith}>
        <span>{1}</span>
      </div>
      <div style={styles.info}>
        <span style={styles.capital}>capital</span>
        <span style={styles.yield}>rendimento</span>
        <span style={styles.yieldPercent}>rendimentoPercentagem</span>
      </div>
    </div>
  );
}

const styles = {
  installment: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: 'solid 1px lightgray',
    borderRadius: '5px',
    margin: '20px',
    maxWidth: '250px',
  },
  ith: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '5px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: '5px',
  },
  capital: {
    color: 'green',
    fontWeight: 'bold',
  },
  yield: { color: 'green', fontWeight: 'bold' },
  yieldPercent: {
    color: 'blue',
  },
};
