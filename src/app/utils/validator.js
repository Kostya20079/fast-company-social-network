export function validator(data, config) {
  //! to validate a special regular expression - https://regex101.com
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired": {
        statusValidate = data.trim() === "";
        break;
      }
      case "isEmail": {
        const emailRegExp = /^\S+\@\S+\.\S+$/g; //regular expression for checking an email addresses
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]+/g; //regular expression for checking the contents of capital letters
        statusValidate = !capitalRegExp.test(data);
        break;
      }
      case "isContainDigit": {
        const digitRegExt = /\d+/g; //regular expression for checking the contents of digits
        statusValidate = !digitRegExt.test(data);
        break;
      }
      case "min": {
        statusValidate = data.length < config.value;
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      let error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
