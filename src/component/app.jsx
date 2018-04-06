import React from 'react'

import frustrationGif from '../frustration.gif'
import UserList from './user-list'
import MarginDiv from './margin-div'

export default ({ users }) => (
  <div className="app">
    <h1>my nice title</h1>
    <MarginDiv>
      <p>Here goes the JS</p>
      <div id="container">
        <UserList users={users} />
      </div>
    </MarginDiv>
    <MarginDiv>
      <img src={frustrationGif} alt="ECHEC" />
      <div class="fru"></div>
    </MarginDiv>
    <p>no color here</p>
  </div>
)
