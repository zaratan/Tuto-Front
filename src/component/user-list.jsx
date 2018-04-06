import React from 'react'
import { orderBy } from 'lodash'

import User from './user'

class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: this.props.users,
      name: '',
      age: 0,
    }
  }

  handleChangeName(name) {
    this.setState({
      name,
    })
  }

  handleChangeAge(age) {
    this.setState({
      age: age ? parseInt(age) : '',
    })
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
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={e => {
            this.handleChangeName(e.target.value)
          }}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          value={this.state.age}
          onChange={e => {
            this.handleChangeAge(e.target.value)
          }}
        />
        <input type="submit" />
      </form>,
    ]
  }
}

export default UserList
