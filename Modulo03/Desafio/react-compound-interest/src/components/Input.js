import React from 'react';

import { formatNumber, formatCurrency } from '../helpers/formatHelper';

export default function Input({ label, labelText, step, value }) {
  return (
    <div className="input-field" style={styles.input}>
      <label htmlFor={label} className="active">
        {labelText}
      </label>
      <input type="number" id={label} step={step} value={formatNumber(value)} />
    </div>
  );
}
const styles = {
  input: {
    width: '250px',
    minWidth: '150px',
    maxWidth: '350px',
    margin: '10px',
  },
};
