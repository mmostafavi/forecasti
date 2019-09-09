const validator = (value, validation) => {
    let isValid = true;

    if (validation.isCity) {
        isValid = isValid && value !== ""
    }

    return isValid;
};

export default validator;
