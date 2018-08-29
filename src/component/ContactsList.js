import React from 'react'
import PropTypes from 'prop-types';
import { ListView, Text } from 'react-native'
import { Spinner, List, ListItem, Content, Button, Icon } from 'native-base';

const ContactsListView = ({ dataSource, onAddNewRow, deleteSelectedRow }) => {
  if (!dataSource || dataSource.length < 1) return <Spinner size="large" color='green' />
  else {

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    return (
      <Content>
        <List
          enableEmptySections
          dataSource={ds.cloneWithRows(dataSource)}
          renderRow={data => (
            <ListItem>
              <Text> {data.val().name}</Text>
            </ListItem>
          )}
          renderLeftHiddenRow={data => (
            <Button full onPress={() => onAddNewRow(data)}>
              <Icon name="information-circle" />
            </Button>
          )}

          renderRightHiddenRow={(data, secId, rowId, rowMap) => (
            <Button full danger onPress={() => deleteSelectedRow(secId, rowId, rowMap, data)}>
              <Icon name="trash" />
            </Button>
          )}

          leftOpenValue={-75}
          rightOpenValue={-75}
        />
      </Content>
    )
  }
}

ContactsListView.propTypes = {
  dataSource: PropTypes.array,
  onAddNewRow: PropTypes.func,
  deleteSelectedRow: PropTypes.func,
}
export default ContactsListView;