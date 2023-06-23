import React, { createContext, useContext, useReducer } from 'react';

// Definimos las acciones para el reducer
const ACTIONS = {
  ALL_ON: 'ALL_ON',
  ALL_OFF: 'ALL_OFF',
  TOGGLE: 'TOGGLE',
};

// Definimos el reducer
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ALL_ON:
      return { lights: state.lights.map(() => true) };
    case ACTIONS.ALL_OFF:
      return { lights: state.lights.map(() => false) };
    case ACTIONS.TOGGLE:
      return {
        lights: state.lights.map((light, index) =>
          index === action.payload ? !light : light
        ),
      };
    default:
      return state;
  }
};

// Creamos el contexto
const SmartHomeContext = createContext();

const SmartHomeProvider = ({ children }) => {
  const initialState = { lights: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleLight = (index) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: index });
  };

  const turnAllOn = () => {
    dispatch({ type: ACTIONS.ALL_ON });
  };

  const turnAllOff = () => {
    dispatch({ type: ACTIONS.ALL_OFF });
  };

  return (
    <SmartHomeContext.Provider
      value={{ lights: state.lights, toggleLight, turnAllOn, turnAllOff }}
    >
      {children}
    </SmartHomeContext.Provider>
  );
};

const App = () => {
  return (
    <SmartHomeProvider>
      <SmartHome />
    </SmartHomeProvider>
  );
};

const SmartHome = () => {
  const { lights, turnAllOn, turnAllOff } = useContext(SmartHomeContext);

  return (
    <div>
      <h1>Smart Home</h1>
      <button onClick={turnAllOn}>Turn All Lights On</button>
      <button onClick={turnAllOff}>Turn All Lights Off</button>
      <Light index={0} />
      <Light index={1} />
    </div>
  );
};

const Light = ({ index }) => {
  const { lights, toggleLight } = useContext(SmartHomeContext);

  return (
    <div>
      <h2>Light Component {index}</h2>
      <button onClick={() => toggleLight(index)}>
        {lights[index] ? 'Turn Off' : 'Turn On'}
      </button>
    </div>
  );
};

export default App;
