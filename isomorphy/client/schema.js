class ValidationError extends Error {}

const typeOf = (type) => (name, value) => {
  if (typeof value !== type) {
    throw new ValidationError(`validation error: ${name} must be a ${type}`);
  }
};

const minStringTest = (name, value, n) => {
  if (value.length < n) {
    throw new ValidationError(`${name} must be greater than ${n} characters`);
  }
};

const maxStringTest = (name, value, n) => {
  if (value.length > n) {
    throw new ValidationError(`${name} must be less than ${n} characters`);
  }
};

const minNumberTest = (name, value, n) => {
  if (value < n) {
    throw new ValidationError(`${name} must be greater than ${n}`);
  }
};

const maxNumberTest = (name, value, n) => {
  if (value > n) {
    throw new ValidationError(`${name} must be less than than ${n}`);
  }
};

const requiredTest = (name, value) => {
  if (!Boolean(value)) {
    throw new ValidationError(`validation error: ${name} is a required field`);
  }
};

const schema = (initialTests, type) => ({ required, defaultValue, opts }) => {
  const tests = initialTests;
  const describe = { type, null: required, defaultValue, opts };

  if (required) {
    tests.push({ fn: requiredTest });
  }

  const methods = () => ({
    min: addTest(minNumberTest),
    max: addTest(maxNumberTest),
    getTests: () => tests,
  });

  const addTest = (fn, ...args) => () => {
    tests.push({ fn, args });
    return methods();
  };

  return methods();
};

export const string = schema([{ fn: typeOf("string") }], "string");
export const number = schema([{ fn: typeOf("number") }], "number");

export const shape = (schemaObject) => {
  const validate = (object) => {
    Object.keys(schemaObject).forEach((key) => {
      const tests = schemaObject[key].getTests();
      tests.forEach(({ fn, args }) => {
        const a = args && args.length > 0 ? args : [];
        fn(key, object[key], ...a);
      });
    });
  };

  return {
    validate,
  };
};
