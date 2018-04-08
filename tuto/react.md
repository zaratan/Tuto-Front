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
