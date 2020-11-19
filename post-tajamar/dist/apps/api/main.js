(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/promise-mysql/index.js":
/*!**********************************************!*\
  !*** ../node_modules/promise-mysql/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'D:\\Archivos\\GIT\\Tajamar\\Angular\\node_modules\\promise-mysql\\index.js'");

/***/ }),

/***/ "./apps/api/src/app/app.controller.ts":
/*!********************************************!*\
  !*** ./apps/api/src/app/app.controller.ts ***!
  \********************************************/
/*! exports provided: AppController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppController", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _post_tajamar_interfaces_sql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @post-tajamar/interfaces-sql */ "./libs/interfaces-sql/src/index.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.service */ "./apps/api/src/app/app.service.ts");
var _a, _b, _c, _d, _e;




let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData(params) {
        return this.appService.get(params.query);
    }
    getOne(params) {
        return this.appService.getOne(params.tabla, params.id);
    }
    getAll(params) {
        return this.appService.getAll(params.tabla);
    }
    post(JsonInsert) {
        return this.appService.post(JsonInsert);
    }
    postSelect(JsonInsertSelect) {
        return this.appService.postSelect(JsonInsertSelect);
    }
    put(JsonUpdate) {
        return this.appService.put(JsonUpdate);
    }
    delete(params) {
        return this.appService.delete(JSON.parse(params.json));
    }
    procedure(procedure) {
        return this.appService.procedure(procedure);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(':query'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "getData", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('one/:tabla/:id'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "getOne", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('all/:tabla'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "getAll", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _post_tajamar_interfaces_sql__WEBPACK_IMPORTED_MODULE_2__["SqlInsert"] !== "undefined" && _post_tajamar_interfaces_sql__WEBPACK_IMPORTED_MODULE_2__["SqlInsert"]) === "function" ? _a : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "post", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('select'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof _post_tajamar_interfaces_sql__WEBPACK_IMPORTED_MODULE_2__["SqlInsertSelect"] !== "undefined" && _post_tajamar_interfaces_sql__WEBPACK_IMPORTED_MODULE_2__["SqlInsertSelect"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "postSelect", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Put"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_c = typeof _post_tajamar_interfaces_sql__WEBPACK_IMPORTED_MODULE_2__["SqlUpdate"] !== "undefined" && _post_tajamar_interfaces_sql__WEBPACK_IMPORTED_MODULE_2__["SqlUpdate"]) === "function" ? _c : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "put", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Delete"])(':json'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "delete", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('procedure'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_d = typeof _post_tajamar_interfaces_sql__WEBPACK_IMPORTED_MODULE_2__["SqlProcedure"] !== "undefined" && _post_tajamar_interfaces_sql__WEBPACK_IMPORTED_MODULE_2__["SqlProcedure"]) === "function" ? _d : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], AppController.prototype, "procedure", null);
AppController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof _app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"] !== "undefined" && _app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"]) === "function" ? _e : Object])
], AppController);



/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/*!****************************************!*\
  !*** ./apps/api/src/app/app.module.ts ***!
  \****************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.controller */ "./apps/api/src/app/app.controller.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.service */ "./apps/api/src/app/app.service.ts");
/* harmony import */ var _sql_concat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sql-concat.service */ "./apps/api/src/app/sql-concat.service.ts");





let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_2__["AppController"]],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"], _sql_concat_service__WEBPACK_IMPORTED_MODULE_4__["SqlConcatService"]],
    })
], AppModule);



/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/*!*****************************************!*\
  !*** ./apps/api/src/app/app.service.ts ***!
  \*****************************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./database */ "./apps/api/src/app/database.ts");
/* harmony import */ var _sql_concat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sql-concat.service */ "./apps/api/src/app/sql-concat.service.ts");
var _a;




let AppService = class AppService {
    constructor(concatSql) {
        this.concatSql = concatSql;
    }
    get(sqlSelect) {
        const query = sqlSelect;
        console.log("\x1b[32m", query);
        return _database__WEBPACK_IMPORTED_MODULE_2__["default"].query(query);
    }
    getOne(tabla, id) {
        const query = `SELECT * FROM ${tabla} WHERE id = ${id}`;
        console.log("\x1b[32m", query);
        return _database__WEBPACK_IMPORTED_MODULE_2__["default"].query(query);
    }
    getAll(tabla) {
        const query = `SELECT * FROM ${tabla}`;
        console.log("\x1b[32m", query);
        return _database__WEBPACK_IMPORTED_MODULE_2__["default"].query(query);
    }
    post(sqlInsert) {
        const query = this.concatSql.hacerInsert(sqlInsert);
        console.log("\x1b[32m", query);
        return _database__WEBPACK_IMPORTED_MODULE_2__["default"].query(query);
    }
    postSelect(sqlInsert) {
        const query = this.concatSql.hacerInsertConSelect(sqlInsert);
        console.log("\x1b[32m", query);
        return _database__WEBPACK_IMPORTED_MODULE_2__["default"].query(query);
    }
    put(sqlUpdate) {
        const query = this.concatSql.hacerUpdate(sqlUpdate);
        console.log("\x1b[32m", query);
        return _database__WEBPACK_IMPORTED_MODULE_2__["default"].query(query);
    }
    delete(sqldelete) {
        const query = this.concatSql.hacerDelete(sqldelete);
        console.log("\x1b[32m", query);
        return _database__WEBPACK_IMPORTED_MODULE_2__["default"].query(query);
    }
    procedure(sqlProcedure) {
        const query = this.concatSql.hacerProcedure(sqlProcedure);
        console.log("\x1b[32m", query);
        return _database__WEBPACK_IMPORTED_MODULE_2__["default"].query(query);
    }
};
AppService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _sql_concat_service__WEBPACK_IMPORTED_MODULE_3__["SqlConcatService"] !== "undefined" && _sql_concat_service__WEBPACK_IMPORTED_MODULE_3__["SqlConcatService"]) === "function" ? _a : Object])
], AppService);



/***/ }),

/***/ "./apps/api/src/app/database.ts":
/*!**************************************!*\
  !*** ./apps/api/src/app/database.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var promise_mysql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! promise-mysql */ "../node_modules/promise-mysql/index.js");
/* harmony import */ var promise_mysql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(promise_mysql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys */ "./apps/api/src/app/keys.ts");



const pool = promise_mysql__WEBPACK_IMPORTED_MODULE_1__["createPool"](_keys__WEBPACK_IMPORTED_MODULE_2__["default"].database);
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    _nestjs_common__WEBPACK_IMPORTED_MODULE_0__["Logger"].log("BBDD conectada: " + _keys__WEBPACK_IMPORTED_MODULE_2__["default"].database.host);
});
/* harmony default export */ __webpack_exports__["default"] = (pool);


/***/ }),

/***/ "./apps/api/src/app/keys.ts":
/*!**********************************!*\
  !*** ./apps/api/src/app/keys.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    database: {
        host: '37.11.169.247',
        // host: '192.168.1.2',
        user: 'dbaTajamarManuel',
        password: 'WhatEverPass',
        database: 'posttajamar'
    }
});


/***/ }),

/***/ "./apps/api/src/app/sql-concat.service.ts":
/*!************************************************!*\
  !*** ./apps/api/src/app/sql-concat.service.ts ***!
  \************************************************/
/*! exports provided: SqlConcatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqlConcatService", function() { return SqlConcatService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "@angular/core");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_1__);


let SqlConcatService = class SqlConcatService {
    hacerInsert(JsonInsert) {
        const insert = "Insert into " + JsonInsert.tabla + "(" + JsonInsert.valores.map(x => x.campo).join(", ") + ")" + (JsonInsert.valores.length !== 0 ? 'values' : 'value') + "(" + JsonInsert.valores.map(x => this.formatoCampo(x.valor)).join(",") + ")";
        return insert;
    }
    hacerInsertConSelect(JsonInsert) {
        const insert = "Insert into " + JsonInsert.tabla + " " + JsonInsert.select;
        return insert;
    }
    hacerUpdate(JsonUpdate) {
        const update = "Update " + JsonUpdate.tabla + " set " + JsonUpdate.valores.map(x => x.campo + "=" + this.formatoCampo(x.valor)).join(", ");
        const where = JsonUpdate.where.length !== 0 ? this.formarWhere(JsonUpdate.where) : null;
        return update + where;
    }
    hacerDelete(JsonDelete) {
        const borrar = "Delete " + JsonDelete.tabla;
        const where = JsonDelete.where.length !== 0 ? this.formarWhere(JsonDelete.where) : null;
        return borrar + where;
    }
    hacerProcedure(JsonProcedure) {
        const nombre = JsonProcedure.nombre;
        const valores = JsonProcedure.valores.map(x => this.formatoCampo(x)).join();
        return "call " + nombre + " (" + valores + ")";
    }
    formarWhere(where) {
        let respuesta = ' where ';
        where.forEach((x, i) => {
            // Añadir el or o el and
            if (i !== 0) {
                if (x.or) {
                    respuesta = respuesta + " or ";
                }
                else {
                    respuesta = respuesta + " and ";
                }
            }
            // Añadir el primer parentesis
            if (x.parentesis === "(") {
                respuesta = respuesta + "(";
            }
            // Vemos el tipo de operación que necesitamos
            if (x.logico) {
                respuesta = respuesta + " " + x.campo + " " + x.logico + this.formatoCampo(x.valor);
            }
            else if (x.between) {
                const ordenBetween = x.between.sort((a, b) => a - b);
                respuesta = respuesta + "(between " + ordenBetween.join(" and ") + ")";
            }
            else if (x.like) {
                respuesta = respuesta + "like " + x.like.join();
            }
            else if (x.in) {
                respuesta = respuesta + "in (" + x.in.map(y => this.formatoCampo(y)).join(", ") + ")";
            }
            // Añadimos el segundo parentesis
            if (x.parentesis === ")") {
                respuesta = respuesta + ")";
            }
        });
        // Control de errores de parentesis
        let parentesisNecesitados = Object.keys(respuesta).filter(x => x === "(").length - Object.keys(respuesta).filter(x => x === ")").length;
        if (parentesisNecesitados > 0) {
            while (parentesisNecesitados !== 0) {
                respuesta = respuesta + ")";
                parentesisNecesitados = parentesisNecesitados - 1;
            }
        }
        return respuesta;
    }
    formatoCampo(valor) {
        if (typeof valor !== "number" && typeof valor !== "boolean") {
            valor = "'" + valor + "'";
        }
        return valor;
    }
};
SqlConcatService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], SqlConcatService);



/***/ }),

/***/ "./apps/api/src/main.ts":
/*!******************************!*\
  !*** ./apps/api/src/main.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./apps/api/src/app/app.module.ts");
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */




function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_2__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"]);
        const globalPrefix = 'api';
        app.enableCors();
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].log('Listening at http://localhost:' + port + '/' + globalPrefix);
            _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Logger"].log('Cors Habilitado');
        });
    });
}
bootstrap();


/***/ }),

/***/ "./libs/interfaces-sql/src/index.ts":
/*!******************************************!*\
  !*** ./libs/interfaces-sql/src/index.ts ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_interfacesSqlPrincipales__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/interfacesSqlPrincipales */ "./libs/interfaces-sql/src/lib/interfacesSqlPrincipales.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_interfacesSqlSecundarias__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/interfacesSqlSecundarias */ "./libs/interfaces-sql/src/lib/interfacesSqlSecundarias.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_interfacesSqlTerciarias__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/interfacesSqlTerciarias */ "./libs/interfaces-sql/src/lib/interfacesSqlTerciarias.ts");
/* empty/unused harmony star reexport */




/***/ }),

/***/ "./libs/interfaces-sql/src/lib/interfacesSqlPrincipales.ts":
/*!*****************************************************************!*\
  !*** ./libs/interfaces-sql/src/lib/interfacesSqlPrincipales.ts ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/interfaces-sql/src/lib/interfacesSqlSecundarias.ts":
/*!*****************************************************************!*\
  !*** ./libs/interfaces-sql/src/lib/interfacesSqlSecundarias.ts ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./libs/interfaces-sql/src/lib/interfacesSqlTerciarias.ts":
/*!****************************************************************!*\
  !*** ./libs/interfaces-sql/src/lib/interfacesSqlTerciarias.ts ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./apps/api/src/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Archivos\GIT\Tajamar\Angular\post-tajamar\apps\api\src\main.ts */"./apps/api/src/main.ts");


/***/ }),

/***/ "@angular/core":
/*!********************************!*\
  !*** external "@angular/core" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map