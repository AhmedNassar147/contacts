import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Header, Content, Input, Item, Icon, Button } from 'native-base';

const ContactForm = ({ onAddNewContact, onFieldChanges }) => {
  return (
    <Header style={{ marginTop: StatusBar.currentHeight }}>
      <Content>
        <Item>
          <Input
            autoCorrect={false}
            onChangeText={text => onFieldChanges(text)}
            placeholder="new contact"
          />
          <Button onPress={onAddNewContact}>
            <Icon name="add" />
          </Button>
        </Item>
      </Content>
    </Header>
  )
};


ContactForm.propTypes = {
  onAddNewContact: PropTypes.func,
  onFieldChanges: PropTypes.func,
}
export default ContactForm;