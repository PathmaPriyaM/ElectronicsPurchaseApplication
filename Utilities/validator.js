exports.ValidatePassword=function (password){
    if(password.length>=5){ return true }
    else {return false}
}
exports.ValidatePhoneNum=function(phonenum){
    if(phonenum.toString().length==10){return true}
    else{return false}
}
