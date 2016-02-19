angular.module("ClearBladeApp")
.service('cb', ['$q', function ($q) {

	var cbObj = new ClearBlade();

	var init = function (email, password) {
		var deferred = $q.defer();

		var initOptions = {
			systemKey: "eeccc5eb0af8d5e6b5a4c094a474",
			systemSecret: "EECCC5EB0A90EBC6E09CEE95E65D",
			URI: "https://rtp.clearblade.com",

			callback: function (err, body) {
				if (err) {
					deferred.reject(body);
				} else {
					deferred.resolve(body);
				}
			}
		}
		if (typeof email != undefined){
			initOptions.email = email
		}
		if (typeof password != undefined){
			initOptions.password = password
		}

		cbObj.init(initOptions);

		return deferred.promise;
	}

	var runCode = function (funcName, params, retryCounter) {
		var deferred = $q.defer();
		if(typeof retryCounter == 'undefined'){
			retryCounter = 0;
		}
		var retryMax = 4;

		function go() {

			var statusCodes = {
				SUCCESS : '1',
				FAILURE : '2',
				LOGOUT : '3',
				UNAUTHORIZED: '4',
				ERROR_IN_SERVICE : '5'
			};

			cbObj.Code().execute(funcName, params, function (err, body) {
				if (err) {
					if(retryCounter<retryMax){
						retryCounter++;
						go();
					}else{
						if(body.message === 'Not Authorized'){
							code = 'code:' + statusCodes.UNAUTHORIZED;
							resp = body + '\n' + code
							deferred.reject(resp);
						}
						else {
							code = 'code:' + statusCodes.LOGOUT;
							resp = body + '\n' + code 
							deferred.reject(resp);
						}
					}
				} else {
                        //if service returned a status code - there was an error
                        if (body.results.code) {
                        	if(retryCounter<retryMax){
                        		retryCounter++;
                        		go();
                        	}else{
                        		deferred.reject(body.results.message);
                        	}
                        } else {
                        	if(body.results === 'not callable' && body.success === false)
                        		body.code = statusCodes.FAILURE;
                        	else if(body.results.search('SyntaxError')>=0 || body.success === false)
                        		body.code = statusCodes.ERROR_IN_SERVICE;
                        	else if(body.success === true)
                        		body.code = statusCodes.SUCCESS;
                        	console.log(body);
                        	deferred.resolve(body);
                        }
                    }
                });
}
if (!cbObj.user) {
	init().then(function () {
		go();
	}, function (err) {
		if(retryCounter<retryMax){
			retryCounter++;
                  runCode(funcName, params, retryCounter); //try again from the start
              }else{
              	deferred.reject(err);
              }
          });
} else {
	go()
}

return deferred.promise;
}

return {
	ClearBlade: cbObj,
	init: init,
	runCode: runCode
}
}])