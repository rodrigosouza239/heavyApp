import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const containerRef = React.createRef();

export function navigate(name, params) {
  return containerRef.current?.navigate(name, params);
}

export function push(...args) {
  return containerRef.current?.dispatch(StackActions.push(...args));
}
