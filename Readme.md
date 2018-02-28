
# ipm package: angular-integration

## Overview

ClearBlade integration for AngularJS 3

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## Setup

1. Add to AngularJS dependencies

```
'use strict';

// Declare app level module which depends on views, and components
angular.module('ClearBladeApp', ['ClearBladeController']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
```

2. Run `npm start`

## API

<a name="ClearBlade"></a>

## ClearBlade
ClearBlade Service

**Kind**: global variable  

* [ClearBlade](#ClearBlade)
    * [.runCode(funcName, params, retryCounter)](#ClearBlade.runCode)
    * [.init(email, password)](#ClearBlade.init)

<a name="ClearBlade.runCode"></a>

### ClearBlade.runCode(funcName, params, retryCounter)
Execute a code service within the Cloud Platform

**Kind**: static method of [<code>ClearBlade</code>](#ClearBlade)  

| Param | Type | Description |
| --- | --- | --- |
| funcName | <code>string</code> | Code Service Name to run |
| params | <code>Object</code> | params object to be ingested by Code Service |
| retryCounter | <code>number</code> | number of times to retry executing a code service |

<a name="ClearBlade.init"></a>

### ClearBlade.init(email, password)
Initialize ClearBlade Service

**Kind**: static method of [<code>ClearBlade</code>](#ClearBlade)  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | ClearBlade System's User Email |
| password | <code>string</code> | ClearBlade System's User's Password |


## Usage

$scope.logins = [{
		User: {name : 'Rohan'},
		Age: 20
	},
	{
		User: {name : 'John'},
		Age: 18 
	}
	];

	var promise = cb.init('test@clearblade.com','rohanbendre');
	promise.then(function(resp) {
		$scope.response = resp;

	});

	$scope.sendRequest = function() {
		var promise = cb.runCode('ServicePart4','' , 2);
		promise.then(function(resp) {
			$scope.result = resp;
		}, function(reason) {
			$scope.result = reason;
		});
	};

## Thank you

Powered by ClearBlade Enterprise IoT Platform: [https://platform.clearblade.com](https://platform.clearblade.com)
- Then start server by doing npm start.

- SampleCode folder has clearblades angular service and example html/controller files. 
