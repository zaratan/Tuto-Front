import _ from 'lodash'
import $ from 'jquery'

import './index.scss'

const users = [
    { 'name': 'fred',   'age': 48 },
    { 'name': 'barney', 'age': 34 },
    { 'name': 'fred',   'age': 40 },
    { 'name': 'barney', 'age': 36 },
    { 'name': 'denis', 'age': 29 },
    { 'name': 'denis', 'age': 30 },
];

const to_print = _.orderBy(users, ['name', 'age'], ['asc', 'desc']).map((e) => (`<li><span class="user-name">${e.name}</span>: ${e.age}</li>`)).join('')

$('#container').append(`<ul>${to_print}</ul>`)
