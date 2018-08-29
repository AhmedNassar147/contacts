import React from 'react';
import { LoginPage, ContactsPage, StatusBar } from './src';
import { Root } from 'native-base';
export default class App extends React.Component {
  render() {
    return (
      <Root>
        <StatusBar />
        <ContactsPage />
      </Root>
    );
  }
}