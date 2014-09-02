function BaseTool(){
	this.getBaseUrl = function() {
		return "http://10.20.71.62:8056/KennyStudio/server/";
	},
	
	this.uuid = function() {
	    // http://www.ietf.org/rfc/rfc4122.txt
	    var s = [];
	    var hexDigits = "0123456789ABCDEF";
	    for (var i = 0; i < 32; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[12] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	    s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

	    var uuid = s.join("");
	    return uuid;
	},
	
	this.ajax = function( params ){
		var type = params.type ? params.type : "GET";
		var data = params.data ? params.data : {};
		var dataType = params.dataType ? params.dataType : "json";
		var async = params.async ? params.async : true;
		var successCallback = params.success ? params.success : function(){ };
		var errorCallback = params.error ? params.error : function(){ };
		var _super = this;
		$.ajax({
			   type: params.type,
			   url: _super.getBaseUrl() + params.url,
			   dataType: dataType,
			   data: data,
			   async: async,
			   success: successCallback,
			   error: errorCallback
			});
	}
	
}