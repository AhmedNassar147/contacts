import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Content, Form, Input, Item, Button, Label } from 'native-base';

const LoginForm = ({ onSubmitLogin, onSignUp, onFieldChanges }) => {
  return (
    <Container style={styles.container}>
      <Form>
        <Item floatingLabel>
          <Label children="Email" />
          <Input autoCorrect={false} onChangeText={text => onFieldChanges('email', text)} />
        </Item>
        <Item floatingLabel>
          <Label children="Password" />
          <Input autoCorrect={false} secureTextEntry={true} onChangeText={text => onFieldChanges('password', text)} />
        </Item>
        <Button full rounded success style={styles.submitButton}>
          <Text style={styles.txt} children="Submit" onPress={onSubmitLogin} />
        </Button>
        <Button full rounded primary style={styles.submitButton}>
          <Text style={styles.txt} children="Sign Up" onPress={onSignUp} />
        </Button>
      </Form>
    </Container>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
  submitButton: {
    marginTop: 10,
  },
  txt: {
    color: '#fff'
  }
});

LoginForm.propTypes = {
  onSubmitLogin: PropTypes.func,
  onSignUp: PropTypes.func,
  onFieldChanges: PropTypes.func,
}
export default LoginForm;