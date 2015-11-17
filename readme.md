#gulpfile.js
---

Boilerplate  do gulp .

##Dpendências

Precisar ter inslado o NodeJS , NPM, Ruby e Compass;

Instalar o NodeJs basta escolher a melhor forma para você no próprio site.

Ruby

```
$ brew 
```

Instalar o Compass

```
$ gem install compass
```
##Folders

Entenda como estão as pastas que preicsa

```
dist
locate
src
-- styles
-- templates
-- scripts
-- fonts
```

## Módulos

* [Browser-sync](http://www.browsersync.io/docs/gulp/)
* [Del](https://www.npmjs.com/package/del) 
* [Gulp](https://www.npmjs.com/package/gulp) 
* [Gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) 
* [Gulp-cache](https://www.npmjs.com/package/gulp-cache) 
* [Gulp-compass](https://www.npmjs.com/package/gulp-compass) 
* [Gulp-data](https://www.npmjs.com/package/gulp-data) 
* [Gulp-if](https://www.npmjs.com/package/gulp-if) 
* [Gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) 
* [Gulp-imports](https://www.npmjs.com/package/gulp-imports)
* [Gulp-jade](https://www.npmjs.com/package/gulp-jade) 
* [Gulp-jshint](https://www.npmjs.com/package/gulp-jshint) 
* [Gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins) 
* [Gulp-notify](https://www.npmjs.com/package/gulp-notify) 
* [Gulp-plumber](https://www.npmjs.com/package/gulp-plumber) 
* [Gulp-uGlify](https://www.npmjs.com/package/gulp-uglify) 
* [Gulp-util](https://www.npmjs.com/package/gulp-util)
* [Minimist](https://www.npmjs.com/package/minimist) 
* [Run-sequence](https://www.npmjs.com/package/run-sequence)


##First

Dessa forma instalá todos os módulos necessários para o `gulp` funcionar. 

```
npm install
```
## Tasks

```
$ gulp : compila todos os arquivos
$ gulp serve : inicializa o serve em localhost:3000
$ gulp lint : execute js files in browserify mode
$ gulp jade : compilas os arquivos jades
$ gulp styles : compila os arquivos em sass
$ gulp optimize : comprime todas as imagens
$ gulp minify : minifica os arquivos js
$ gulp clean : apaga os arquivos compilados da pasta dist
$ gulp watch : chamada para verificar alterações nos arquivos
$ gulp -p : minifica todos os arquivos para produção
```

## Dicas

### Compilados

#### JS
Todos os arquivos terminarnos com a extensão `.js` mas serão ignorados todos os arquivos que comecem com `_`(ex: `_slider.js`).
#### SASS
#### Jade
#### Image
#### Fonts


### Locate Jade

### 

### Tranferir fonts

Ao executar a tarefa `gulp` não fará com os de fontes . Isso foi escolhido pois não é uma uma coisa que acontece com tanta frequeência. Então para transferir as fontes para pasta `dist` basta executar a tarefa `$ gulp fonts`. Lembrando que só compilará nos seguintes formatos: `.ttf`,`.eot`,`.svg`,`.woff` e `.woff2`. 


