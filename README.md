# Material Design

## Description
This project has two separated layers communicate through jSon Callbacks Tokenized with JWT between CLIENT APP and WEB API.
- Frontend (Angular APP)
- Backend (.NET Core API) + SQL Server Database  

This architecture keeps separate the business logic layer and data access layer from the UI (User Interface).
We offer a code with Software Quality Standards including maintainability, dependability, efficiency and usability.


## Security
Our architecture is based in a Frontend App connecting with a RESTful API through JSON callbacks.
This Callbacks are protected by encripted token generated in Login Process.  
It means: Only tokenized callbacks are allowed to request API responses.   



This documentation address the Frontend development.

## INSTALLATION

### System Requirements
Installed previously
* [NodeJs] (https://nodejs.org/)
* [Angular 6] (https://cli.angular.io/)
* IDE (WebStorm, VisualStudio Code, etc)

### Development Server
1.Copy the project in a folder
  
2. Run `npm install` in the project folder to start and install dependencies.
```javascript
npm install
```
  
2. Run `ng serve` from terminal. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
```javascript
ng serve
```

##  DEVELOPMENT
### Folder structure
 The project has a structure of directories opportunely designed to be friendly and very accessible for developers familiar with angular structures. 
 However, below we show a small scheme to graph the nested folders:
   
   
src  
  ├──app  
  │ &nbsp; &nbsp; ├──classes  
  │ &nbsp; &nbsp; ├──components  
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──gestion  
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──breadcrumb  
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──container-listados  
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──listado-arbol    (1)   
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──listado-esat     (1)  
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──listado-usuarios (1)    
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──menu-superior    
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──sidenav    
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; └──wrap-gestion  
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──login   
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──page-not-found   
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──header    
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; ├──login      
  │ &nbsp; &nbsp; │&nbsp; &nbsp; &nbsp; &nbsp; └──sidebar     
  │ &nbsp; &nbsp; ├──guard  
  │ &nbsp; &nbsp; ├──loader  
  │ &nbsp; &nbsp; ├──pipes  
  │ &nbsp; &nbsp; └──services  
  ├──assets   
  │ &nbsp; &nbsp; └──i18n  (2)   
  └──environments  
  
  (1) Inside this folder are located all the modals windows of actions  
  (2) This folder contains 4 files containing the translations for English, Spanish, Portuguese and French


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Documentation

Run `compodoc -p tsconfig.json` in project folder and documentation is generated.  
You can see the new Documentation file in documentation folder


## USER MANUAL 
You can found a detailed specs and user manual of each section in:  

 
