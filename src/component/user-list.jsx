import React from 'react'
import { orderBy } from 'lodash'

import User from './user'

const orderedUsers = users => orderBy(users, ['name', 'age'], ['asc', 'desc'])

export default ({ users }) => [
  <ul key="list">
    {orderedUsers(users).map(e => (
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
