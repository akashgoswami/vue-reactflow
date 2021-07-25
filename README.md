# vue-reactflow

This a demo project to showcase a React component [React Flow](https://reactflow.dev/) using [Vuera](https://github.com/akxcv/vuera) inside the Vue.js application. 
Using React inside Vue is definitely an anti-pattern, however sometimes it may be required to use it. 

[Live Demo](https://akashgoswami.github.io/vue-reactflow/dist/index.html)


![image](https://user-images.githubusercontent.com/1212881/126913408-2e8d47a0-bb99-4d7f-8122-0bfc250e70b4.png)

In this case I tried putting together a child React class component inside a Vue application. Unfortunately, the property and event propogation between react child and Vue parent is not pretty seemless. I tried putting together a small event bus to make it smooth. 

# Important 
This is a proof of concept experiment, do not use in production without properly understanding the implication. 
Any suggestions to improve the integration or streamline the codebase are more than welcome. 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
