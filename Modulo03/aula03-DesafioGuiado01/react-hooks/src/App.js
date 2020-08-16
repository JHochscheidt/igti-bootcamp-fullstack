import React, { Component, useState, useEffect } from 'react';
// import ProjetoBase from './components/ProjetoBase/ProjetoBase';

import { getNewTimestamp } from './helpers/datetimeHelpers';

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length;
  });

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getNewTimestamp());

    setClickArray(newClickArray);
    // this.setState({ clickArray: newClickArray });
  };

  return (
    <div>
      <h1>
        React com <em>Hooks</em>
      </h1>
      <button onClick={handleClick}>Clique Aqui</button>
      <ul>
        {clickArray.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
