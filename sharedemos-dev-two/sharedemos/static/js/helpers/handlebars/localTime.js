module.exports = function(dateTime, options) {
    var localTime = new Date(dateTime);
    if(options && typeof(options) == "string"){
    	options = JSON.parse(options);
    }
    var formattedDate = localTime.toUTCString();
    formattedDate = new Date(formattedDate).toLocaleString('en-US', options);
    return formattedDate;
};
