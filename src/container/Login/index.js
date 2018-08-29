import React, { Component } from 'react'
import { LoginForm } from '../../component';
import firebase from '../../../utilies/firebase'
class LoginPage extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
      email: '',
      password: ''
    }
  }

  updateFormState = (propName, value) => this.setState({ [propName]: value });

  onSubmitLogin = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      console.log('user', user)
    })
  }

  onSignUp = () => {
    const { email, password } = this.state;
    try {
      if (!email) {
        alert('please set the email !');
        return;
      } else if (!password || password.length < 6) {
        alert('password length can not less than 6 char !');
        return;
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log('error', error.toString())
    }
  }

  render() {
    const { updateFormState, onSignUp, onSubmitLogin } = this;
    return (
      <LoginForm
        onSubmitLogin={onSubmitLogin}
        onSignUp={onSignUp}
        onFieldChanges={updateFormState}
      />
    );
  }
}

export default LoginPage;