import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DeviceMotion } from 'expo-sensors';

export const OrientationContext = React.createContext(null);

const OrientationProvider = ({ children }) => {
  const [orientation, setOrientation] = useState(0);

  const handleNewOrientation = ({ orientation: newOrientation }) => {
    setOrientation(newOrientation.toString().includes(90) ? newOrientation * -1 : newOrientation);
  };

  React.useEffect(() => {
    DeviceMotion.addListener(handleNewOrientation);
    DeviceMotion.setUpdateInterval(1500);
    return () => {
      DeviceMotion.removeAllListeners();
    };
  }, []);

  return (
    <OrientationContext.Provider value={{ orientation }}>{children}</OrientationContext.Provider>
  );
};

OrientationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrientationProvider;
