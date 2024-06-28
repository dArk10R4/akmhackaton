function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    return true;
}

function validateName(name) {
    if (name.length < 2) {
        return false;
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
        return false;
    }
    return true;
}

function validateType(type) {
    if (type !== 'admin' && type !== 'user') {
        return false;
    }
    return true;
}

function validateUser(data) {
    const { username, email, password, first_name, last_name, type } = data;
    if (!username || !email || !password || !first_name || !last_name || !type) {
        return false;
    }
    if (!validateEmail(email)) {
        return false;
    }
    if (!validatePassword(password)) {
        return false;
    }

    if (!validateName(first_name) || !validateName(last_name)) {
        return false;
    }

    if (!validateType(type)) {
        return false;
    }

    return true;
}

function validateLogin(data) {
    const { username, password } = data;
    if (!username || !password) {
        return false;
    }

    return true;
}

function validateUserUpdate(data) {
    const { email, first_name, last_name } = data;
    if (!email && !first_name && !last_name) {
        return false;
    }
    if (email && !validateEmail(email)) {
        return false;
    }
    if (first_name && !validateName(first_name)) {
        return false;
    }
    if (last_name && !validateName(last_name)) {
        return false;
    }

    return true;
}

module.exports = {validateUser, validateLogin, validateUserUpdate, validatePassword, validateEmail, validateName, validateType};