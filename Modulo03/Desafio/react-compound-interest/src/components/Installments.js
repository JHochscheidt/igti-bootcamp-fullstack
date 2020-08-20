import React from 'react';
import Installment from './Installment';

export default function Installments() {
  return (
    <div style={styles.installments}>
      <Installment />
      <Installment />
      <Installment />
      <Installment />
      <Installment />
    </div>
  );
}

const styles = {
  installments: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
};
