import React from 'react'
import { orderBy } from 'lodash'

import User from './user'

class UserList extends React.Component {
  constructor(props) {
    super(props)
  }

  orderedUsers() {
    return orderBy(this.props.users, ['name', 'age'], ['asc', 'desc'])
  }

  render() {
    return [
      <ul key="list">
        {this.orderedUsers().map(e => (
          <User name={e.name} age={e.age} key={`${e.name}-${e.age}`} />
        ))}
      </ul>,
      <form key="form">
        <label htmlFor="name">Nom:</label>
        <input type="text" name="name" />
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" />
        <input type="submit" />
      </form>,
    ]
  }
}

export default UserList
