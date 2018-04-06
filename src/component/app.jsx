import React from 'react'

import frustrationGif from '../frustration.gif'

export default ({ users }) => (
  <div className="app">
    <h1>my nice title</h1>
    <div className="with-margin">
      <p>Here goes the JS</p>
      <div id="container">
        <ul>
          {users.map(e => (
            <li>
              <span className="user-name">{e.name}</span>: {e.age}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="with-margin">
      <img src={frustrationGif} alt="ECHEC" />
      <div class="fru"></div>
    </div>
    <p>no color here</p>
  </div>
)
