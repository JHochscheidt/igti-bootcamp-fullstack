import React, { Component } from 'react';

import css from './inputs.module.css';
import { formatNumber, formatCurrency } from '../../helpers/formatHelpers';

export default class InputReadOnly extends Component {
  render() {
    const { label, inputLabel, value, fullSalary, bgcolor } = this.props;
    return (
      <div className={`${css.salary} ${css.infoSalary}`}>
        <label htmlFor={label}>{inputLabel}</label>
        <input
          type="text"
          readOnly
          id={label}
          value={`${formatCurrency(value)} (${formatNumber(
            (value * 100) / fullSalary
          )} %)`}
          style={{
            fontWeight: 'bold',
            color: bgcolor ? `#${bgcolor}` : 'black',
          }}
        />
      </div>
    );
  }
}
