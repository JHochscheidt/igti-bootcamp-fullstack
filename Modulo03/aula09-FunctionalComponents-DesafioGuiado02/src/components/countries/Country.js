import React from 'react';

import css from './countries.module.css';

export default function Country({ country: { name, flag } }) {
  return (
    <div className={`${css.country} ${css.border}`}>
      <img className={css.flag} src={flag} alt={name} />
      <span className={css.countryName}>{name}</span>
    </div>
  );
}
