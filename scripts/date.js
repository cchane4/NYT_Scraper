//variable formatted date starts as empty string, then add month, then the date and full year
//return the full formatted date
var makeDate = function(){
    var d = new Date();
    var formattedDate = "";

//getMonth is a built in function that starts at a 0 index, so adding one is necessary
    formattedDate += (d.getMonth() + 1) + "_";

    formattedDate +=  d.getDate() + "_";

    formattedDate +=  d.getFullYear();

    return formattedDate;
};

//export the variable for use throughout the program
module.exports = makeDate;
