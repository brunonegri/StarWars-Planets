import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';
import planetsApi from '../services/PlanetsApi';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const results = await planetsApi();
      console.log(results);
      setPlanets(results);
    }
    fetchApi();
  }, []);

  const contextValue = {
    planets,
  };
  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
