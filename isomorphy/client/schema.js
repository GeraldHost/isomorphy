class ValidationError extends Error {}

// Tests
const ofType = (type) => (value, name) => {
  if (typeof value !== type) {
    throw new ValidationError(`validation error: ${name} must be a ${type}`);
  }
};

const stringTest = ofType("string");
const numberTest = ofType("number");

const maxTest = (value, name) => {
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

const minTest = (value, name) => {
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

const requiredTest = (value, name) => {
  if (!Boolean(value)) {
    throw new ValidationError(
      `validation error: ${name} is a required field`
    );
  }
};

// Schema
const createSchema = (testFn, fns) => (tests) => () => {
  const mergeTests = [...tests, testFn];
  console.log("fns", fns);
  const obj = fns ? Object.keys(fns).reduce((acc, key) => ({
    ...acc, [key]: fns[key](mergeTests)
  }), {}) : {};
  return {...obj, getTests: () => mergeTests};
}

// TODO: fix the fact you can't have .min().max()
const minSchema = createSchema(minTest);
const maxSchema = createSchema(maxTest);
const stringSchema = createSchema(stringTest, { min: minSchema, max: maxSchema });
const numberSchema = createSchema(numberTest, { min: minSchema, max: maxSchema });

export const schema = ({ required }) => {
    const tests = required ? [requiredTest] : [];
    return {
      string: stringSchema(tests),
      number: numberSchema(tests),
    }
};

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
