import React from 'react'
import { orderBy } from 'lodash'

import User from './user'
import UserForm from './user-form'

class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: props.users,
    }

    this.addUser = this.addUser.bind(this)
  }

  addUser({name, age}) {
    this.setState({
      users: [...this.state.users, {name, age}]
    })
  }

  orderedUsers() {
    return orderBy(this.state.users, ['name', 'age'], ['asc', 'desc'])
  }

  render() {
    return ([
      <ul key="list">
        {
          this.orderedUsers().map((e) => (
            <User
              key={`${e.name}-${e.age}`}
              name={e.name}
              age={e.age}
            />
          ))
        }
      </ul>,
      <UserForm addUser={this.addUser} key="form"/>
    ])
  }
}

export default UserList
