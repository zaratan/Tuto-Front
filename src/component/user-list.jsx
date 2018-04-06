import React from 'react'
import { orderBy } from 'lodash'

import User from './user'

const orderedUsers = users => orderBy(users, ['name', 'age'], ['asc', 'desc'])

export default ({ users }) => (
  <ul>
    {orderedUsers(users).map(e => (
      <User name={e.name} age={e.age} key={`${e.name}-${e.age}`} />
    ))}
  </ul>
)
