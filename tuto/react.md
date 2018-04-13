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

* Dans le monde React on appelle ces arguments des "propriétés" ou "props";
* On a vu ce qu'était un (pure) component en React;
* Un component c'est un petit bout d'app qui contient tout ce dont il a besoin pour se "render" ie s'afficher.

À ce moment là vous devriez avoir une page complètement en React.

## Step 3: Vers une app dynamique

On va ajouter un formulaire pour ajouter un nouvel utilisateur (tout en conservant le tri ;) ) histoire que la page ne soit pas "que" statique.

### Un peu de théorie (bis)

On a vu les components sous la forme de fonctions simple.
C'est très bien tant que le component est statique et ne dépend que de propriété qu'on lui passe.

Si jamais on a besoin de:
* Lui faire faire des appels AJAX
* Lui faire gerer des evenements de type clic/formulaire
* Gérer un state

On va devoir le transformer en classe.

Une classe de component en React à la forme suivante:
```jsx
import React from 'react'

class MonComponent extends React.Component {
  constructor(props) {
    super(props)
    …
  }

  render() {
    …
    return (
      <…>…</…>
    )
  }
}

export default MonComponent
```

On l'appelle dans le reste de l'app comme on appelait notre fonction d'avant.

C'est bien cool… Mais qu'est-ce que ça change tout ça ?

#### Le state

Le state c'est l'état du component, c'est à dire un ensemble de variable qui lui permettent de s'afficher.
C'est différent des props dans le sens où c'est initialisé dans le constructor du component (et donc chaque instance de votre component aura un state différent) 
et géré par lui ensuite (pensez variable d'instance) là où les props ne peuvent pas être changées par le component en lui-même.


Par exemple
```jsx
import React from 'react'

class MonComponent extends React.Component {
  constructor(props) {
    super(props)
    …
    this.state = {
      message: "I PLAY POKEMON GO EVERYDAY"
    }
  }

  render() {
    …
    return (
      <p>{this.state.message}</p>
    )
  }
}

export default MonComponent
```

Quand je dis que le state peut être modifié par le component… C'est vrai avec un bémol.
Un component ne peut pas modifier une value de son state de cette manière:
```jsx
this.state.message = "NOPE"
```

Par contre il peut **remplacer** une value en faisant:
```
this.setState({
  message: "Yep",
})
```
#### On peut ajouter plein de fonctions dans le component

Genre pour handle le tri d'une props (:wink:) ou pour faire un appel API.

#### Un petit point sur le render

Le render est appelé A CHAQUE FOIS qu'une props ou un state change et donc UN BOUT (et pas la page entière) de votre app se met a jour.

### La pratique

Ajoutons un formulaire d'ajout d'utilisateur à notre user-list

#### On fait une classe

```jsx
import React from 'react'
import { orderBy } from 'lodash'

class UserList extends React.Component {
  constructor(props) {
    super(props)
  }

  orderedUsers() {
    return orderBy(this.props.users, ['name', 'age'], ['asc', 'desc'])
  }

  render() {
    return (
      <ul>
        {this.orderedUsers().map(e => (
          <User name={e.name} age={e.age} key={`${e.name}-${e.age}`} />
        ))}
      </ul>
    )
  }
}

export default UserList
```

Ça fait exactement la même chose qu'avant mais c'est plus lourd :D

#### On ajoute le formulaire

```jsx
  render() {
    return ([
      <ul key="list">
        {this.orderedUsers().map(e => (
          <User name={e.name} age={e.age} key={`${e.name}-${e.age}`} />
        ))}
      </ul>,
      <form key="form">
        <label htmlFor="name">Nom:</label>
        <input type="text" name="name" />
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" />
        <input type="submit" />
      </form>
    ])
  }
```

A cette étape là si on clic sur le bouton ça recharge la page mais ça ne fait rien
(Dans les choses a noter, j'ai ajouter une key à chaque element de la liste qu'on return)

#### On envoi le state de notre formulaire

Pour l'instant notre formulaire a beau être magnifique, React n'a aucune connaissance de ce qui est tapé dedans.
On va donc lier chaque champ a un state

* On ajoute le state
```jsx
  constructor(props) {
    super(props)

    this.state = {
      age: 0,
      name: '',
    }
  }
```

Et on en profite pour lui donner des valeurs par défaut.

* On update le render avec les valeurs du state:
```jsx
<input type="text" name="name" value={this.state.name}/>
[…]
<input type="number" name="age" value={this.state.age}/>
```

A cette étape là, la value de chaque input est complètement gérée par React. Comment on gère l'update du state ?

* Update du state
  * On ajoute des fonctions pour gerer chaque update
```jsx
  handleChangeName(name) {
    this.setState({
      name,
    })
  }

  handleChangeAge(age) {
    this.setState({
      age: age ? parseInt(age) : '',
    })
  }
```
  * On les trigger:
```jsx
 	<input
          type="text"
          name="name"
          value={this.state.name}
          onChange={e => {
            this.handleChangeName(e.target.value)
          }}
        />
        […]
        <input
          type="number"
          name="age"
          value={this.state.age}
          onChange={e => {
            this.handleChangeAge(e.target.value)
          }}
        />
```

Le code final du component (a ce moent ressemble à):

```jsx
import React from 'react'
import { orderBy } from 'lodash'

import User from './user'

class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      age: 0,
    }
  }

  handleChangeName(name) {
    this.setState({
      name,
    })
  }

  handleChangeAge(age) {
    this.setState({
      age: age ? parseInt(age) : '',
    })
  }

  orderedUsers() {
    return orderBy(this.props.users, ['name', 'age'], ['asc', 'desc'])
  }

  render() {
    return [
      <ul key="list">
        {this.orderedUsers().map(e => (
          <User name={e.name} age={e.age} key={`${e.name}-${e.age}`} />
        ))}
      </ul>,
      <form key="form">
        <label htmlFor="name">Nom:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={e => {
            this.handleChangeName(e.target.value)
          }}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          value={this.state.age}
          onChange={e => {
            this.handleChangeAge(e.target.value)
          }}
        />
        <input type="submit" />
      </form>,
    ]
  }
}

export default UserList
```

A cet instant précis, notre formulaire se comporte comme un formulaire normal mais est complètement géré par React qui stocke au passage les valeurs dans son state.

#### On gère le submit

Pour ajouter des utilisateurs… Il va falloir que les utilisateurs se trouvent dans le state du component:

```jsx
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      age: 0,
      users: this.props.users,
    }
  }
```

Puis qu'on affiche bien la liste du state et pas celle des props:
```jsx
  orderedUsers() {
    return orderBy(this.state.users, ['name', 'age'], ['asc', 'desc'])
  }

```

Puis on ajoute une fonction qui update le state avec un nouvel utilisateur:
```jsx
  handleSubmit(e) {
    e.preventDefault() // On empèche la page de se recharger :D
    this.setState({
      users: [
        ...this.state.users,
        { name: this.state.name, age: this.state.age },
      ], // Ceci est une façon de construire un tableau contenant tout les éléments du tableau this.state.users en ajoutant un de plus à la fin
    })
  }
```

Et enfin, on ajoute l'appel de fonction quand on submit le controller:
```jsx
  <form
    key="form"
    onSubmit={e => {
      this.handleSubmit(e)
    }}
  >
```

### Conclusion

Voilà, vous pouvez maintenant avoir une super app dynamique :)

## Step 4: Bon… Notre component UserList est un peu trop. Division !

On va refactorer ce code pour avoir 2 components un pour notre UserList et un pour le UserForm.

### Étape 1: UserForm

On crée un component simple de form. Le seul problème c'est que le state `users` sera pas géré par lui mais par la UserList.
Du coup le submit va devoir update le state d'un autre component…
Comment on fait ça? Le UserList en créant le UserForm va lui passer la fonction d'update:

```jsx
handleSubmit(e) {
  e.preventDefault()
  this.props.addUser(this.state)
}
```

Le reste est globalement identique à ce qu'on avait avant je ne le détaille donc pas.

### Étape 2: UserList
On remplace le form par:
```jsx
<UserForm addUser={this.addUser} />,
```

On crée la fonction addUser:
```jsx
addUser(user) {
  this.setState({
    users: [...this.state.users, user],
  })
}
```

Et finalement le bout étrange, dans le constructeur on link le this de addUser a celui de la UserList.
```jsx

  constructor(props) {
    super(props)

    this.state = {
      users: this.props.users,
    }

    this.addUser = this.addUser.bind(this) // Ça. Oui c'est bizarre. Je sais. Mais pensez y, ça marche.
  }
```

### Conclusion

Voilà vous savez maintenant comment updater le state d'un élément parent (ie: Il faut que celui-ci nous fournisse la fonction pour le faire).

## Step 5 (optional): Hot Module Reload

Le fait que ça recharge toute la page a chaque update de n'importe que bout du code c'est chiant. On ajoute donc du reload a chaud de module:

Je vous laisse regarder ce [commit](https://github.com/denispasin/Tuto-Webpack/commit/67863e7075c2ff09c408cb46a785611118ee887e) qui le montre assez bien :)

## Step 6: Bootstrap \o/

On va ajouter Bootstrap dans React. En quoi c'est différent d'un bootstrap classique ?

1. Comme on a du sass, on va pour le customiser facilement
2. On va pouvoir profiter des components custom de React pour ne pas avoir a definir toutes les classes de bootstrap

### Étape 1: on ajoute les libs

```bash
yarn add bootstrap popper.js reactstrap@next
```

### Étape 2: on ajoute bootstrap dans le scss
Tout en haut du fichier scss on ajoute:

```scss
@import "~bootstrap/scss/bootstrap";
```

Voilà. A ce point vous avez déjà une app avec bootstrap. Vous pouvez le customiser en suivant le début de ce [guide](https://getbootstrap.com/docs/4.0/getting-started/webpack/#importing-precompiled-sass).

### Étape 3: On utilise Reactstrap

Je vous invite a aller jeter un œil à la doc: https://reactstrap.github.io/components/buttons/
Si vous avez bien compris comment marchaient les components, utiliser reactstrap devrait être un jeu d'enfant.
[Ici](https://github.com/denispasin/Tuto-Webpack/blob/2f613ec84910fb4cb4007f6092a56f06d7e8efb2/src/component/user-form.jsx) par exemple j'ai transformé le UserForm avec Bootstrap.

## Conclusion

Voilà. Vous pouvez dors et déjà voler de vos propres ailes et faires des apps en React relativement complexes (les appels API seront les bouts qui seront encore un peu bizarre pour l'instant).

## Liens bonus

* semantic-ui en react: https://react.semantic-ui.com/
* La doc de React: https://reactjs.org/
* Reactstrap: https://reactstrap.github.io/
