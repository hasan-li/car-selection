import React, { useState, useEffect } from 'react';

import {
  getMakes,
  getModels,
  getVehicles,
} from 'src/services/cars';

import './App.scss';

const App = () => {
  const [selectedMake, setSelectedMake] = useState(undefined);
  const [selectedModel, setSelectedModel] = useState(undefined);
  const [makes, setMakes] = useState([]);
  const [makesRequestError, setMakesRequestError] = useState(false);
  const [modelsRequestError, setModelsRequestError] = useState(false);
  const [vehiclesRequestError, setVehiclesRequestError] = useState(false);
  const [models, setModels] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getAllMakes();
  }, []);

  const getAllMakes = async () => {
    const { data, status } = await getMakes();
    if (status !== 200) {
      setMakesRequestError(true);
      return;
    }
    setMakes(data);
    setMakesRequestError(false);
  };

  const getMakeModels = async (make) => {
    setVehicles([]);
    setSelectedMake(make);
    const { data, status } = await getModels(make);
    if (status !== 200) {
      setModelsRequestError(true);
      return;
    }
    setModels(data);
    setModelsRequestError(false);
  };

  const getModelVehicles = async (model) => {
    setSelectedModel(model);
    const { data, status } = await getVehicles(selectedMake, model);
    if (status !== 200) {
      setVehiclesRequestError(true);
      return;
    }
    setVehicles(data);
    setVehiclesRequestError(false);
  };

  const tryAgain = (source) => {
    let fetchSource = undefined;

    switch (source) {
      case 'make': {
        fetchSource = getAllMakes;
        break;
      }
      case 'model': {
        fetchSource = () => getMakeModels(selectedMake);
        break;
      }
      case 'vehicle': {
        fetchSource = () => getModelVehicles(selectedModel);
        break;
      }

      default:
        fetchSource = getAllMakes;
    }
    return (
      <>
        <p>Something went wrong</p>
        <button
          className="button__neutral"
          onClick={fetchSource}
        >
          Try again
        </button>
      </>
    );
  };

  return (
    <div className="App">
      {makesRequestError ? (
        tryAgain('make')
      ) : (
        makes.length !== 0 && (
          <select name="makes" onChange={(e) => getMakeModels(e.target.value)}>
            {makes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        )
      )}

      {modelsRequestError ? (
        tryAgain('model')
      ) : (
        models.length !== 0 && (
          <select name="models" onChange={(e) => getModelVehicles(e.target.value)}>
            {models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        )
      )}

      {vehiclesRequestError ? (
        tryAgain('vehicle')
      ) : (
        vehicles.length !== 0 && (
          vehicles.map((vehicle, i) => (
            <div
              key={`${vehicle.enginePowerPS}${vehicle.engineCapacity}${i}`}
              className="vehicle"
            >
              <p className="vehicle__name">{vehicle.make} {vehicle.model}</p>
              <div className="vehicle__data-item">
                <p className="vehicle__data-item__label">Engine power (PS)</p>
                <p className="vehicle__data-item__value">{vehicle.enginePowerPS}</p>
              </div>
              <div className="vehicle__data-item">
                <p className="vehicle__data-item__label">Engine power (KW)</p>
                <p className="vehicle__data-item__value">{vehicle.enginePowerKW}</p>
              </div>
              <div className="vehicle__data-item">
                <p className="vehicle__data-item__label">Fuel type</p>
                <p className="vehicle__data-item__value">{vehicle.fuelType}</p>
              </div>
              <div className="vehicle__data-item">
                <p className="vehicle__data-item__label">Body type</p>
                <p className="vehicle__data-item__value">{vehicle.bodyType}</p>
              </div>
              <div className="vehicle__data-item">
                <p className="vehicle__data-item__label">Engine capacity</p>
                <p className="vehicle__data-item__value">{vehicle.engineCapacity}</p>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default App;
