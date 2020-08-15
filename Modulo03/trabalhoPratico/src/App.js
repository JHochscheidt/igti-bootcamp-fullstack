import React, { Component } from 'react';
import InputSalary from './components/inputs/InputSalary';
import InputReadOnly from './components/inputs/InputReadOnly';

import {
  calculateSalaryFrom,
  calculatePercentageProgressBar,
} from './helpers/salaryHelpers';
import ProgressBar from './components/inputs/ProgressBar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 100,
    };
  }

  handleChangeSalary = (newSalary) => {
    this.setState({ fullSalary: newSalary });

    calculateSalaryFrom(this.state.fullSalary);
  };

  render() {
    const { fullSalary } = this.state;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);

    const {
      percentDiscountINSS,
      percentDiscountIRPF,
      percentNetSalary,
    } = calculatePercentageProgressBar(
      fullSalary,
      discountINSS,
      discountIRPF,
      netSalary
    );

    return (
      <div style={styles.container}>
        <h1>React Salary</h1>
        <InputSalary
          label={'fullSalary'}
          inputLabel={'Full Salary'}
          fullSalary={this.state.fullSalary}
          onChangeSalary={this.handleChangeSalary}
        />

        <InputReadOnly
          label={'baseINSS'}
          inputLabel={'Base INSS'}
          value={baseINSS}
          fullSalary={fullSalary}
        />
        <InputReadOnly
          label={'discountINSS'}
          inputLabel={'Discount INSS'}
          value={discountINSS}
          fullSalary={fullSalary}
          bgcolor={'e67e22'}
        />
        <InputReadOnly
          label={'baseIRPF'}
          inputLabel={'Base IRPF'}
          value={baseIRPF}
          fullSalary={fullSalary}
        />
        <InputReadOnly
          label={'discountIRPF'}
          inputLabel={'Discount IRPF'}
          value={discountIRPF}
          fullSalary={fullSalary}
          bgcolor={'c0392b'}
        />
        <InputReadOnly
          label={'netSalary'}
          inputLabel={'Net Salary'}
          value={netSalary}
          fullSalary={fullSalary}
          bgcolor={'16a085'}
        />

        <ProgressBar
          discountINSS={percentDiscountINSS}
          discountIRPF={percentDiscountIRPF}
          netSalary={percentNetSalary}
        />
      </div>

      // <div>
      //   <h1>Horizontal Bar</h1>
      //   <h3>Percentual de desconto de INSS</h3>
      //   <h3>Percentual de desconto do IRPF</h3>
      //   <h3>Salário líquido</h3>
      // </div>
    );
  }
}

const styles = {
  container: {
    margin: '25px',
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'wrap',
    justifyContent: 'space-between',
  },
};
