import React from 'react'

import User from './user'

export default ({ users }) => (
  <ul>
    {users.map(e => (
      <User name={e.name} age={e.age} key={`${e.name}-${e.age}`} />
    ))}
  </ul>
)
