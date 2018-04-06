import React from 'react'

export default ({ name, age }) => (
  <li>
    <span className="user-name"> {name}</span>: {age}
  </li>
)
