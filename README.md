# Webpack tuto

## Step 1: Ajouter Webpack et Babel.

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

## Step 2: On importe nos librairies.

On importe nos librairies depuis le js plutôt que les inclure alamain dans le html:

### Étapes

#### Ajouter les librairies
```bash
yarn add lodash
yarn add jquery
```

#### Importer les librairies
```js index.js
import _ from 'lodash'
import $ from 'jquery'
```

#### Les supprimer du html

Tout marche, on peut recharger notre page et le JS marche encore :)

## Step 3: On utilise webpack-dev-server.

Plutôt qu'utiliser un `--watch` qui recompile tout. On va passer par un "server".
Ça a deux avantages:
- La page est rechargée automatiquement dans notre navigateur a chaque changement;
- On peut mettre des breakpoint et debug directement dans le JS moderne.

### Étapes

#### Ajouter la librairie
```bash
yarn add -D webpack-dev-server
```

#### Changer la configuration de webpack

On ajoute une section devServer dans `webpack.common.babel.js` indiquant au server qu'il doit servir les fichiers se trouvant dans le dossier `dist`:

```js webpack.common.babel.js
devServer: {
  contentBase: './dist',
}
```

#### Changer nos scripts dans le package.json

On remplace les scripts précédents par ceux ci:
```json package.json
"scripts": {
  "dev:babel": "babel webpack.common.babel.js > webpack.common.js",
  "dev": "yarn dev:babel && webpack-dev-server -d --progress --config webpack.common.js",
  "dev:build": "yarn dev:babel && webpack --config webpack.common.js --progress -d --watch"
}
```

- `dev:babel`: transpile avec babel le fichier de config de webpack;
- `dev:build`: Est notre commande précédente (mais utilise la tache `dev:babel`);
- `dev`: Lance notre webpack-dev-server avec des options similaires a notre tache précédente.

On peut maintenant lancer `yarn dev` et visiter `localhost:8080` pour voir notre page.
Maintenant avec le chrome devtool, dans les sources, dans le dossier webpack on peut trouver nos sources Javascript de base (et elles sont débugables).

## Step 4: Séparer la prod et la dev.

Avoir un environnent de développent et un de production. En dev on veut un environnent pratique pour coder. En prod on veut un environment optimisé et rapide pour l'utilisateur.

### Étapes

#### Ajouter des fichiers

Pour séparer la prod et le dev on va faire deux nouveaux fichiers un pour chaque config (vous comprenez maintenant pourquoi l'autre s'appelait common ;) ).

Dans webpack.dev.babel.js:
```js webpack.dev.babel.js
import merge from 'webpack-merge'

import common from './webpack.common'

const client = {
  mode: 'development',
  output: {
    filename: 'js/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
}

export default merge(common, client)
```

Dans webpack.prod.babel.js:
``` webpack.prod.babel.js
import merge from 'webpack-merge'

import common from './webpack.common'

const client = {
  mode: 'production',
  output: {
    filename: 'js/index.js',
  },
  devtool: 'source-map',
}

export default merge(common, client)
```

La grande différence va être dans le Mode et dans le type de sourcemap. Les sourcesmap c'est ce qui vous sert a visualiser vos sources initiales dans chrome.

#### On modifie le common

Dans le common on retire ce qui avait trait au dev:

```js webpack.common.babel.js
import path from 'path'

export default {
  name: 'app',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
}
```

#### On ajoute webpack-merge

```bash
yarn add -D webpack-merge
```

#### On modifie les scripts

```json package.json
  "scripts": {
    "common:babel": "babel webpack.common.babel.js > webpack.common.js",
    "dev:babel": "yarn common:babel && babel webpack.dev.babel.js > webpack.dev.js",
    "prod:babel": "yarn common:babel && babel webpack.prod.babel.js > webpack.prod.js",
    "dev": "yarn dev:babel && webpack-dev-server -d --progress --config webpack.dev.js",
    "dev:build": "yarn dev:babel && webpack --config webpack.dev.js --progress -d --watch",
    "prod:build": "yarn prod:babel && webpack --config webpack.prod.js --progress -p"
  },
```

2 seront utiles au jour le jour:

- **dev**: Qui lance le serveur de development accessible sur localhost:8080
- **prod:build**: Qui build dans le dossier `dist` le site de production.

PS: J'ai oublié de commit a cette étape…

## Step 5: On process tous les fichiers à travers webpack

Dans un environement de prod a destination d'un meilleur cache on ajoute a chaque le hashcode du fichier a la fin de leur nom.
Cependant pour faire ça il va falloir injecter les-dits nouveaux noms fichiers dans le html directement.
On peut aussi en profiter pour minifier le css.

### Étapes

#### Deplacer tous les fichiers dans src

Déplacer les fichiers `index.html`, `frustration.gif` et `index.css` dans le dossier `src`

Webpack process les fichiers a partir de ce dossier donc on va tout y mettre.

#### Ajouter les loaders

On ajoute les différents loaders pour chaque type de fichier:

##### Le HTML

```bash
yarn add -D html-loader
```

Puis on ajoute dans les règles:

```js webpack.common.babel.js
{
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
  }
},
```

##### Les images/polices/gifs/etc

```bash
yarn add -D url-loader file-loader
```

Puis, dans les règles:
```js webpack.common.babel.js
{
  test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
  loader: 'url-loader', // On essaye de transformer le fichier en string directement dans le html
  options: {
    limit: 8192, // Si sa taille est < a 8192 bytes
    fallback: 'file-loader', // Sinon on en fait un fichier
  }
},

```

##### Le css

```bash
yarn add -D style-loader css-loader
```

Puis dans les règles:
```js webpack.common.babel.js
{
  test: /\.css$/,
  use: ExtractTextPlugin.extract( // Je reviens là dessus plus bas
    {
      fallback: 'style-loader', // Si l'extraction se passe mal on inclus le css dans le head du html
      use: 'css-loader', // Sinon on essaye d'en faire un fichier css
    },
  ),
},
```

#### Ajouter le plugin pour injecter dans le html
```bash
yarn add -D html-webpack-plugin
```

Puis on modifie le fichier common de webpack:

On importe en haut du fichier:
```js
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
```

Puis on ajoute une section plugins:

```js
plugins: [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new CleanWebpackPlugin(['dist']), // J'y reviens plus bas
  new HtmlWebpackPlugin({
    template: './src/index.html' // On part du fichier index.html
  }),
],
```

#### On ajoute le fichier css dans le js

Pour que le css soit pris en compte par webpack il faut que celui-ci soit referencé dans le fichier js… On ajoute donc dans `index.js`:

```js
import './index.css'
```

#### On extrait le css du bundle js

L'étape précédente a ajouté le css a l'interieur du fichier js généré. On va donc le ré-extraire dans un fichier css à part (**RANT** SERIOUSLY JS?)

```bash
yarn add -D extract-text-webpack-plugin@next 
```

On prend la version beta parce que sinon ça ne marche pas avec la version courante de webpack…

On l'inclus en haut du common:
```js
import ExtractTextPlugin from 'extract-text-webpack-plugin'
```

puis on l'utilise pour indiquer quel fichier devra être extrait:

La ligne `use: ExtractTextPlugin.extract(` plus haut.

Ensuite, on indique dans le dev et le prod comment nommer le fichier css:

En dev:
```js
plugins: [
  new ExtractTextPlugin({
    filename: 'css/styles.css',
    allChunks: true
  }),
]
```

En prod:
```js
plugins: [
  new ExtractTextPlugin({
    filename: '/css/styles.[hash].css', // [hash] ajoute le hashcode du fichier dans le nom. A chaque changement du contenu de celui-ci le cache sera donc rafraichi.
    allChunks: true
  }),
]
```

#### On clean le dossier dist automatiquement a chaque fois
```bash
yarn add -D clean-webpack-plugin
```

Ça va vider le dossier `dist` entre chaque build. Les deux lignes nécessaires ont déjà été ajoutées dans des étapes précédentes.

#### On update les noms généré de chaque fichiers
On va ajouter le hashcode dans le nom des fichiers js aussi:

En dev:
```js
output: {
  filename: 'js/[name].js',
},
```

En prod:
```js
output: {
  filename: 'js/[name].[chunkhash].js',
},
```

#### On enlève le <link> du html

Il ne nous reste "plus qu'a" retirer le link du haut du fichier `src/index.html` puisse que celui-ci sera injecté automatiquement par webpack

A la fin de cette étape vous avez un site qui se build proprement, qui fera du caching d'asset et qui sera pratique a utiliser en dev.

## Step 6: Sass

On va ajouter un preprocesseur de [sass](https://sass-lang.com/) directement dans webpack parce que du css avec des variables c'est mieux.

### Étapes

#### Modifier le css

On change `src/index.css` en `src/index.scss` et son contenu en:
```scss
$blue: #4b62f9;
$grey: #eaeaea;

h1 {
  color: $blue;
}

.with-margin {
  margin: 10px;
  padding: 10px;
  background-color: $grey;

  p {
    color: $blue;
  }
}
```

#### Ajouter le loader
```bash
yarn add -D sass-loader node-sass 
```

Puis on modifie le common avec une règle différente pour le scss:
```js
{
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        url: false,
        minimize: true,
        sourceMap: true
      }
    }, 
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
  })
},
```

#### On change l'import dans le js

Ne pas oublier de changer le nom du fichier dans `index.js`
```js
import './index.scss'
```

Voilà, votre fichier sass sera automatiquement compilé en css par webpack.

## Step 7: On divise le js en deux
Comme on met toutes les librairies dans le `index.js` généré, a chaque petit changement de ce dernier son hash change et donc l'utilisateur doit retélécharger toutes les librairies. C'est pas vraiment une bonne idée. On va donc le diviser en deux un avec notre code et un avec les librairies.

### Étapes

#### On ajoute une section dans common

Dans le fichier common, on ajoute une section optimization:
```js
optimization: {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all'
      }
    }
  }
},
```

Qui indique: tout ce qui se trouve dans `node_modules` vas dans le fichier `vendor`.

Voilà a chaque changement dans votre code, l'utilisateur ne retélécharge pas toutes les libs :)
