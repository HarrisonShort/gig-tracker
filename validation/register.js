const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    // Username validation
    if (validator.isEmpty(data.username)) {
        errors.username = "Username is required!";
    }

    // Email validation
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required!";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Invalid email!";
    }

    // Password validation
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required!"
    }

    if (validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirmation password is required!";
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters!";
    }

    if (!validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};