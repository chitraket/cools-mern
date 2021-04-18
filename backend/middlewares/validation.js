exports.isEmailValids = (email)=> {
    var errors = {};
    if (email.trim() === ''){
        errors = 'login.login_validation.email_required'
    }
    else{
        const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if(!email.match(emailRegex)){
            errors = 'login.login_validation.email_invaliad'
        }
    }
    return {
        errors,isEmail:Object.keys(errors).length < 1
    }
}
exports.isPasswordValide = (password)=> {
    var errors = {};
    if (password.trim() === ''){
        errors = 'login.login_validation.password_required'
    }else if(password.length<=8){
        errors = 'login.login_validation.password_characters'
    }
    else{
        const passwrodRegex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/;
        if(!password.match(passwrodRegex)){
            errors = 'login.login_validation.password_invaliad'
        }
    }
    return {
        errors,isPassword:Object.keys(errors).length < 1
    }
}
