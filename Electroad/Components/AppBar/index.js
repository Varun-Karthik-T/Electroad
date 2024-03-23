import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = () => (
  <Appbar.Header statusBarHeight={0}>
    <Appbar.Content title="Electroad" />
  </Appbar.Header>
);

export default AppBar;