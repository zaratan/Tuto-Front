## Step 1: Ajouter Webpack et Babel

Dans cette étape on fait en sorte que Webpack (outil de build) utilise Babel (outil qui transpile du nouveau JS en JS compatible) automatiquement pour transformer notre index.js en vieux JS. J'utilise `yarn` à la place de `npm` surtout pour des raisons d'habitude et d'agréabilité de commande: https://yarnpkg.com/fr/

### Étapes a suivre

#### Ajout de package.json:
```bash
yarn init # Répondre aux questions
```

#### Ajout de webpack
```bash
yarn add -D webpack webpack-cli
```

#### Ajout de babel
```bash
yarn add -D @babel/cli # Permet de lancer des commandes comme babel fichier_en_nouveau.js
yarn add -D @babel/core # Cœur de la librairie Babel
yarn add -D @babel/preset-env # Module babel qui gère la transformation ES2015 > JS compatible
```

#### Ajout du loader babel pour webpack
```bash
yarn add -D babel-loader
```

#### On écrit le fichier webpack.common.babel.js

```js
import path from 'path'

export default {
  // Nom de l'app (pas utile)
  name: 'app',
  // Fichier de départ
  entry: './src/index.js',
  // Fichier d'arrivée
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  // module que webpack doit utiliser
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  }
}
```

#### On édite le .babelrc pour configurer notre babel
```json
{
  "presets": ["@babel/preset-env"]
}
```

#### On ajoute browserslist dans le package.json
```json
"browserslist": [
  "> 1%"
],
```
Cette config nous permet de dire a babel quel niveau de compatibilité il doit rechercher.
Ici: Toutes les versions de navigateurs qui sont utilisées par plus de 1% de la population.

#### On peut maintenant essayer notre configuration

**JS RANT**: Le 31 mars 2018 webpack-cli ne donne aucune méthode d'utiliser le nouveau babel pour son fichier de configuration on doit donc le traduire avec babel avant…

```bash
babel webpack.common.babel.js > webpack.common.js && \ # transforme la configuration grace a babel
webpack \ # webpack-cli
--config webpack.common.js \ # notre configuration générée
--progress \ # une jolie barre de progression
-d \ # mode development
--watch # Il recompile automatiquement a chaque changement
```

Ça marche \o/. Le fichier `dist/index.js` est généré.

##### Deplacement des fichiers

On déplace tous les autres fichiers dans le dossier `dist` (pour l'instant).

Ça marche \o/. On peut ouvrir le fichier `dist/index.html` et tout se comporte bien.

##### Ajout d'un alias de commande dans package.json

Comme la commande de lancement de webpack est particulièrement compliquée on va ajouter un alias dans le fichier package.json

```json
"scripts": {
  "dev": "babel webpack.common.babel.js > webpack.common.js && webpack --config webpack.common.js --progress -d --watch"
},
```

On peut donc maintenant l'exécuter en faisant:

```bash
yarn dev
```
