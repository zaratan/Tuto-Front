import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'

import './index.scss'
import App from './component/app'

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 34 },
  { name: 'fred', age: 40 },
  { name: 'barney', age: 36 },
  { name: 'denis', age: 29 },
  { name: 'denis', age: 30 },
]

const to_print = _.orderBy(users, ['name', 'age'], ['asc', 'desc'])

render(<App users={to_print} />, document.getElementById('app'))
