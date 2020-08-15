import React, { Component } from 'react';

import css from './inputs.module.css';

export default class ProgressBar extends Component {
  render() {
    const { discountINSS, discountIRPF, netSalary } = this.props;
    return (
      <div className={css.progressBar}>
        <div
          style={{ width: `${discountINSS}%`, backgroundColor: '#e67e22' }}
        ></div>
        <div
          style={{ width: `${discountIRPF}%`, backgroundColor: '#c0392b' }}
        ></div>
        <div
          style={{ width: `${netSalary}%`, backgroundColor: '#16a085' }}
        ></div>
      </div>
    );
  }
}
