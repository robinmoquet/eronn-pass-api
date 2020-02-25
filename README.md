# Eronn Pass API

### Installation

* Téléchargement du projet
```
$ git clone https://github.com/robinmoquet/eronn-pass-api.git
```

* Intallation des dépendance
```
$ npm install
```

* Lancement du projet 
```
$ npm run start
```
* Generer les clés de chiffrement pour les JWT (les clés priver `jwtRS256.key` et public `jwtRS256.key.pub` doivent être dans un dossier `cert/` à la racine du projet)
_il ne faut pas entré de pass phrase_
```
$ ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```
puis generer la clés public
```
$ openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```


### Commandes utiles

* Lance le projet en mode dev
    * _NOTE_: Il faut au préalable avoir lancé `npm run start` la première fois pour la compilation.
```
$ npm run dev
```

* Lance les test JEST
```
$ npm run test
```

* Lance les test en mode _watch_
```
$ npm run test:watch
```
