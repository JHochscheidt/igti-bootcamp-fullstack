import React, { Component } from 'react';

import css from './inputs.module.css';

export default class InputSalary extends Component {
  onChangeInput = (event) => {
    const numberValue = +event.target.value;
    this.props.onChangeSalary(numberValue);
  };
  render() {
    const { label, inputLabel, fullSalary } = this.props;
    return (
      <div className={css.salary}>
        <label htmlFor={label}>{inputLabel}</label>
        <input
          min="0"
          step="100"
          type="number"
          placeholder={inputLabel}
          id={label}
          value={fullSalary}
          onChange={this.onChangeInput}
        />
      </div>
    );
  }
}
