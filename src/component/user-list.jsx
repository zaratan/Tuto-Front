import React from 'react'
import { orderBy } from 'lodash'

import User from './user'
import UserForm from './user-form'

class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: this.props.users,
    }

    this.addUser = this.addUser.bind(this)
  }

  addUser(user) {
    this.setState({
      users: [...this.state.users, user],
    })
  }

  orderedUsers() {
    return orderBy(this.state.users, ['name', 'age'], ['asc', 'desc'])
  }

  render() {
    return [
      <ul key="list">
        {this.orderedUsers().map(e => (
          <User name={e.name} age={e.age} key={`${e.name}-${e.age}`} />
        ))}
      </ul>,
      <UserForm key="form" addUser={this.addUser} />,
    ]
  }
}

export default UserList
