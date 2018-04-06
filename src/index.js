import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'

import './index.scss'
import frustrationGif from './frustration.gif'

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 34 },
  { name: 'fred', age: 40 },
  { name: 'barney', age: 36 },
  { name: 'denis', age: 29 },
  { name: 'denis', age: 30 },
]

const to_print = _.orderBy(users, ['name', 'age'], ['asc', 'desc'])

render(
  <div className="app">
    <h1>my nice title</h1>
    <div className="with-margin">
      <p>Here goes the JS</p>
      <div id="container">
        <ul>
          {to_print.map(e => (
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
  </div>,
  document.getElementById('app'),
)
