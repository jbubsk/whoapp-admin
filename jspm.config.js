System.config({
  "baseURL": "./",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.16",
    "angular-animate": "github:angular/bower-angular-animate@1.3.16",
    "angular-cookies": "github:angular/bower-angular-cookies@1.3.16",
    "angular-foundation": "github:pineconellc/angular-foundation@0.6.0",
    "angular-resource": "github:angular/bower-angular-resource@1.3.16",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.4.1",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "app.config": "./src/app.config.json",
    "babel": "npm:babel-core@5.5.6",
    "babel-runtime": "npm:babel-runtime@5.5.6",
    "bootstrap": "github:twbs/bootstrap@3.3.4",
    "core-js": "npm:core-js@0.9.15",
    "foundation-css": "github:zurb/foundation@5.5.2",
    "jquery": "github:components/jquery@2.1.4",
    "json": "github:systemjs/plugin-json@0.1.0",
    "socket.io-client": "github:Automattic/socket.io-client@1.3.5",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.3.16"
    },
    "github:angular/bower-angular-animate@1.3.16": {
      "angular": "github:angular/bower-angular@1.3.16"
    },
    "github:angular/bower-angular-cookies@1.3.16": {
      "angular": "github:angular/bower-angular@1.3.16"
    },
    "github:angular/bower-angular-sanitize@1.4.1": {
      "angular": "github:angular/bower-angular@1.3.16"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:twbs/bootstrap@3.3.4": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:babel-runtime@5.5.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.15": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

