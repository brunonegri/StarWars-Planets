import React, { useContext, useState } from 'react';
import MyContext from '../context/Mycontext';

function Table() {
  const valueContext = useContext(MyContext);
  const { planets } = valueContext;
  console.log(planets);

  const [filterByName, setFilterByName] = useState('');

  const handleFilterByName = ({ target: { value } }) => {
    setFilterByName(value.toLowerCase());
    console.log(filterByName);
  };

  const filterPlanet = planets.filter((planet) => (
    planet.name.toLowerCase().includes(filterByName)));
  console.log(filterPlanet);

  return (
    <main>
      <div>
        <h1>STAR WARS PLANETS</h1>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ handleFilterByName }
          name="name-filter"
          value={ filterByName }
        />

      </div>
      <table className="table-expenses">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterByName !== '' ? (filterPlanet).map((planet, i) => (
            <tr key={ i }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          )) : planets.map((planet, i) => (
            <tr key={ i }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          )) }
        </tbody>
      </table>
    </main>
  );
}

export default Table;
