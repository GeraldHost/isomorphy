class ValidationError extends Error {}

const max = (tests) => (n) => {
  const newTest = (value, name) => {
    if (typeof value === "number") {
      if (value > n) {
        throw new ValidationError(`${name} must be less than ${max}`);
      }
    } else if (typeof value === "string") {
      if (value.length > n) {
        throw new ValidationError(
          `${name} must be less than ${max} characters`
        );
      }
    } else {
      throw new ValidationError("Max can only be called on a string or number");
    }
  };

  const mergedTests = [...tests, newTest];

  return {
    required: required(mergedTests),
    getTests: () => mergedTests,
  };
};

const min = (tests) => (n) => {
  const newTest = (value, name) => {
    if (typeof value === "number") {
      if (value < n) {
        throw new ValidationError(`${name} must be greater than ${max}`);
      }
    } else if (typeof value === "string") {
      if (value.length < n) {
        throw new ValidationError(
          `${name} must be more than ${max} characters`
        );
      }
    } else {
      throw new ValidationError("Max can only be called on a string or number");
    }
  };

  const mergedTests = [...tests, newTest];

  return {
    required: required(mergedTests),
    getTests: () => mergedTests,
  };
};

const required = (tests) => () => {
  const newTest = (value, name) => {
    if (!Boolean(value)) {
      throw new ValidationError(
        `validation error: ${name} is a required field`
      );
    }
  };

  // required should always be the first test
  const mergedTests = [newTest, ...tests];

  return {
    getTests: () => mergedTests,
  };
};

const string = (tests) => () => {
  const newTest = (value, name) => {
    if (typeof value !== "string") {
      throw new ValidationError(`validation error: ${name} must be a string`);
    }
  };

  const mergedTests = [...tests, newTest];

  return {
    min: min(mergedTests),
    max: max(mergedTests),
    required: required(mergedTests),
    getTests: () => mergedTests,
  };
};

const number = (tests) => () => {
  const newTest = (value, name) => {
    if (typeof value !== "number") {
      throw new ValidationError(`validation error: ${name} must be a number`);
    }
  };

  const mergedTests = [...tests, newTest];

  return {
    min: min(mergedTests),
    max: max(mergedTests),
    required: required(mergedTests),
    getTests: () => mergedTests,
  };
};

export const schema = () => ({
  string: string([]),
  number: number([]),
  getTests: () => [],
});

export const shape = (schemaObject) => {
  const validate = (object) => {
    Object.keys(schemaObject).forEach((key) => {
      const tests = schemaObject[key].getTests();
      tests.forEach((fn) => fn(object[key], key));
    });
  };

  return {
    validate,
  };
};
