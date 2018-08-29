import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { Permissions, Notifications } from 'expo'
import { ContactForm, ContactsListView } from '../../component';
import firebase, { dataBase } from '../../../utilies/firebase'

class Contacts extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
      newContact: '',
      listViewData: [],
      currentUser: ""
    }
  }

  componentDidMount() {
    let currentUser;
    const listener = firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        currentUser = user
        this.registerNotificationAsync(currentUser)
      }
      listener();
    });

    firebase.database().ref('/contacts').on('child_added', data => {
      let newData = [...this.state.listViewData]
      newData.push(data)
      this.setState({ listViewData: newData })
    })
  }

  onFieldChanges = value => this.setState({ newContact: value });

  onAddNewContact = () => {
    const { newContact } = this.state;
    const key = dataBase.ref('/contacts').push().key;
    dataBase.ref('/contacts').child(key).set({ name: newContact }).catch(err => console.log(err))
  }

  onAddNewContactRow = data => {
    const key = dataBase.ref('/contacts').push().key;
    dataBase.ref('/contacts').child(key).set({ name: data })
  }

  deleteSelectedRow = async (secId, rowId, rowMap, data) => {
    await dataBase.ref('contacts/' + data.key).set(null)
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });
  }

  registerNotificationAsync = async (currentUser) => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    let updates = {}
    updates['/expoToken'] = token
    await database.ref('/users/' + currentUser.uid).update(updates)
  }

  render() {
    const { listViewData } = this.state;
    const { onAddNewContact, onAddNewContactRow, onFieldChanges, deleteSelectedRow } = this;
    return (
      <Container style={styles.container}>
        <ContactForm
          onAddNewContact={onAddNewContact}
          onFieldChanges={onFieldChanges}
        />

        <ContactsListView
          dataSource={listViewData}
          onAddNewRow={onAddNewContactRow}
          deleteSelectedRow={deleteSelectedRow}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4c4c3',
  },
});

export default Contacts;