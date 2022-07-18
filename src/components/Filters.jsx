import React, { useContext, useState } from 'react';
import MyContext from '../context/Mycontext';

const filterOptions = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function Filters() {
  const {
    handleFilterByName,
    addFilter,
    filterByNumericValues,
    removeFilter,
    setFilterByNumericValues,
  } = useContext(MyContext);

  const [options, setOptions] = useState(filterOptions);
  // console.log(options);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const handleClick = () => {
    const newFilter = {
      column,
      comparison,
      value,
    };
    // Requesito 6
    const newOptions = options.filter((option) => option !== column);
    console.log(newOptions);

    setOptions(newOptions);
    setColumn(newOptions[0]);
    addFilter(newFilter);
  };
    // Requesito 7
  const deleteFilter = ({ target }) => {
    const newOptions = [...options, target.name];

    setOptions(newOptions);
    setColumn(newOptions[0]);
    removeFilter(target.name);
  };
    // Requesito 7
  const resetFilters = () => {
    setFilterByNumericValues([]);
    setOptions(filterOptions);
    setColumn('population');
  };

  return (
    <div>
      <div>
        <h1>STAR WARS PLANETS</h1>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ handleFilterByName }
          name="name-filter"
        />
      </div>
      <div>
        <label htmlFor="coluna">
          Coluna:
          <select
            onChange={ (event) => setColumn(event.target.value) }
            data-testid="column-filter"
            name="column-filter"
            id="coluna"
          >
            {options.map((key, i) => !filterByNumericValues
              ?.some((item) => item.column === key)
          && (
            <option
              value={ key }
              key={ i }
            >
              {key}
            </option>
          ))}

          </select>
        </label>
        <label htmlFor="operador">
          Operador:
          <select
            onChange={ (event) => setComparison(event.target.value) }
            data-testid="comparison-filter"
            name="comparison-filter"
            value={ comparison }
            id="operador"
          >
            <option value="menor que">menor que</option>
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          name="value-filter"
          value={ value }
          onChange={ (event) => setValue(event.target.value) }
          data-testid="value-filter"
        />
        <button
          onClick={ handleClick }
          data-testid="button-filter"
          type="button"
        >
          Filtrar

        </button>
        {filterByNumericValues.length >= 1
        && (
          <button
            data-testid="button-remove-filters"
            type="button"
            onClick={ resetFilters }
          >
            Reset Filters
          </button>)}

        {filterByNumericValues.map((filtro, i) => (
          <div key={ i }>
            <label htmlFor="applied-filter">
              <div data-testid="filter" id="applied-filter">
                <span>{`${filtro.column} ${filtro.comparison} ${filtro.value}`}</span>
                <button
                  name={ filtro.column }
                  type="button"
                  onClick={ deleteFilter }
                >
                  X
                </button>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
