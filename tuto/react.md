# React tuto

Fait le 06 avril 2018.

On part de la base de Webpack et on ajoute React par dessus. Le code final peut être trouvé ici: https://github.com/denispasin/Tuto-Webpack/tree/tuto-react

## Step 1: React minimal

On va commencer par intégrer React et sa syntaxe un peu différente dans Webpack.

### Étapes

#### Étape 1: On ajoute les dépendances de react

```bash
yarn add react react-dom # React et la lib pour incorporer react dans notre DOM.
yarn add -D @babel/preset-react # Pour que babel puisse traduire la syntaxe de React.
```

#### Étape 2: On dit a Webpack de process les components react (fichier .jsx)

* Ajouter une nouvelle section:
```js webpack.common.babel.js
resolve: {
  extensions: ['.js', '.jsx'],
},
```
* Changer légèrement le loader js: Remplacer `test: /\.js$/,` en `test: /\.jsx?$/,`

#### Étape 3: On ajoute le preset react au babelrc

```json .babelrc
"presets": [
  "@babel/preset-env",
  "@babel/preset-react"
],
```

#### Étape 4: On ajoute dans notre html une div contenante juste en dessous du `body`

```html
<div id="app">
</div>
```

#### Étape 5: On render quelque chose dans notre page

Dans le `index.js` ajouter
```js src/index.js
// Au début
import React from 'react'
import { render } from 'react-dom'

// À la fin
render(
  <p>It works</p>,
  document.getElementById('app'),
)
```

On remarque qu'on a pu ajouter quelque chose qui ressemble a du html directement dans notre Javascript.
C'est la syntaxe [jsx](https://reactjs.org/docs/introducing-jsx.html).
La majeure partie du temps, ça se comporte exactement comme du html sauf que tout ce qui sera compris entre `{}` sera interprété en JS (un peu comme les `<%= %>` de l'ERB).
Les exceptions notoires:

* `class` étant un mot clé de JS ça sera remplacé par `className`. Ex: 
```jsx
<p className="test">test</p>
```
* `for` étant un mot clé de JS ça sera remplacé par `htmlFor`.

## Step 2: Rendre toute notre app grace à React

### Un peu de théorie

React s'interface autour de la notion de component.
Un component est un composant de votre page web comme un p ou une image.
Ex:
```jsx
<p>lol</p>
```

Ou bien une composition de components plus petit, comme une page web entière.
```jsx
<div>
  <form className={nameOfClass}>
    <label htmlFor="name">Nom</label>
    <input name="name" type="text" />
    <MyNiceButton>{buttonLabel}</MyNiceButton>
  </form>
</div>
```

On peut construire nos propres components et les utiliser dans d'autres components plus gros (voir le `<MyNiceButton>` plus haut).

Il est de bon mœurs d'écrire chaque component tout seul dans un fichier portant son nom.

Mais comment écrit on un component ? Il existe 2 façons. On va s'attarder sur une façon et parler de l'autre plus tard.

La première façon est une simple fonction (ici dans `my-component.jsx`):

```jsx my-component.jsx
import React from 'react'

export default () => (
  <p>This is a component</p>
)
```

On l'utilisera ailleurs dans notre app de cette façon:
```jsx
import MyComponent from './my-component'

[...]
<MyComponent />
[...]
```

La fonction de définition de notre component prend un objet en argument exemple:

```jsx user.jsx
import React from 'react'

export default ({ name, age }) => (
  <li><span className="user-name">{name}</span>: {age}</li>
)
```

Qu'on appelle plus tard de cette façon:
```jsx
import User from './user'
[...]
<User name="charles" age="12" />
[...]
```

### De la pratique
On va donc transformer notre page entière en jsx.

##### index.html
On supprime tout le HTML de la page

```html index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>my beautifull app</title>
    <link rel="manifest" href="/manifest.json">
  </head>
  <body>
    <div id="app">
    </div>
  </body>
</html>
```

##### index.js
On injecte le component principal dans la page
```js index.js
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

render(<App users={users} />, document.getElementById('app'))
```

On remarque ici que j'ai supprimé lodash et tout le jquery.

* jquery n'est plus vraiment neccessaire puisse qu'on injecte tout dans le html directement depuis le JS.
* lodash parce que le tri se fera dans le component responsable d'afficher la liste.

##### component/app.jsx
```jsx
import React from 'react'

import frustrationGif from '../frustration.gif'
import UserList from './user-list'
import MarginDiv from './margin-div'

const App = ({ users }) => (
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
    </MarginDiv>
    <p>no color here</p>
  </div>
)

export default App
```

Dans les choses importantes à noter: Oui… Il faut importer le gif alamain.

##### component/user.jsx
```jsx
import React from 'react'

export default ({ name, age }) => (
  <li>
    <span className="user-name">{name}</span>: {age}
  </li>
)
```

##### component/user-list.jsx
```jsx
import React from 'react'
import { orderBy } from 'lodash'

const orderedUsers = (users) => (
  orderBy(users, ['name', 'age'], ['asc', 'desc'])
)

export default ({ users }) => (
  <ul>
    {orderedUsers(users).map(e => (
      <User name={e.name} age={e.age} key={`${e.name}-${e.age}`} />
    ))}
  </ul>
)
```

* En React chaque élément d'une liste doit avoir une key unique;
* On a importé juste orderBy de lodash. Car on utilise pas le reste;
* La methode orderedUsers est définie juste ici pour ne pas poluer le scope global.

##### component/margin-div.jsx
```jsx
import React from 'react'

export default ({ children }) => <div className="with-margin">{children}</div>
```

L'argument `children` est spécial et contient tous les enfants que vous définirez dedans.

### Conclusion

À ce moment là vous devriez avoir une page complètement en React.
Dans le monde React on appelle ces arguments des "propriétés" ou "props"

## Step 3: Vers une app dynamique

On va ajouter un formulaire pour ajouter un nouvel utilisateur ()
