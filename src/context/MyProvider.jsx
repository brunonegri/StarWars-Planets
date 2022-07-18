import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';
import planetsApi from '../services/PlanetsApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  // Requesito 1
  useEffect(() => {
    async function fetchApi() {
      const results = await planetsApi();
      setData(results);
    }
    fetchApi();
  }, []);

  const [filterList, setFilterList] = useState(data);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  // console.log(filterByName);
  // Requesito 2
  const handleFilterByName = ({ target: { value } }) => {
    setFilterByName(value.toLowerCase());
  };
  // Requesito 2
  useEffect(() => {
    const setPlanets = () => setFilterList(data
      .filter((planet) => planet.name.toLowerCase()
        .includes(filterByName.toLowerCase())));
    setPlanets();
  }, [data, filterByName]);
  // Requesito 3
  useEffect(() => {
    const setPlanets = () => {
      setFilterList(data);
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        setFilterList((oldList) => oldList
          .filter((e) => {
            if (comparison === 'maior que') {
              return e[column] > Number(value);
            }

            if (comparison === 'menor que') {
              return e[column] < Number(value);
            }

            return e[column] === value;
          }));
      });
    };
    setPlanets();
  }, [data, filterByNumericValues]);
  // Requesito 4
  const addFilter = (newFilter) => {
    setFilterByNumericValues((oldList) => {
      if (oldList.length) {
        return [...oldList, newFilter];
      }
      return [newFilter];
    });
  };
  // Requesito 7
  const removeFilter = (column) => {
    setFilterByNumericValues(
      (planetList) => planetList.filter((planet) => planet.column !== column),
    );
  };

  const contextValue = {
    filterList,
    filterByNumericValues,
    addFilter,
    removeFilter,
    setFilterByNumericValues,
    handleFilterByName,
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
