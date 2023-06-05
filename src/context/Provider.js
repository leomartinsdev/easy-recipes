import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from './Context';

const INITIAL_STATE = { nome: 'Xablau' };

export default function Provider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  return (
    <Context.Provider value={ state }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element,
}.isRequired;
