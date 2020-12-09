import { string, number, shape } from "./schema";

describe("@string", () => {
  it("returns the correct describe object", () => {
    const { describe } = string({ required: true, defaultValue: "default" });
    expect(describe).toBeDefined();
    expect(describe).toMatchObject({
      type: "string",
      required: true,
      defaultValue: "default",
    });
  });
});

describe("@number", () => {
  it("returns the correct describe object", () => {
    const { describe } = number({ required: true, defaultValue: "default" });
    expect(describe).toBeDefined();
    expect(describe).toMatchObject({
      type: "number",
      required: true,
      defaultValue: "default",
    });
  });
});

describe("@shape", () => {
  it("@method validate: valid", () => {
    const schema = shape({
      name: string({ required: true }),
    });
    const input = { name: "string" };
    expect(() => {
      schema.validate(input);
    }).not.toThrow();
  });

  it("@method validate: invalid", () => {
    const schema = shape({
      name: string({ required: true }),
    });
    const input = { name: 1 };
    expect(() => {
      schema.validate(input);
    }).toThrow();
  });

  it("@method description", () => {
    const schema = shape({
      name: string({ required: true, defaultValue: "default" }),
    });
    const expected = {
      name: {
        defaultValue: "default",
        opts: undefined,
        required: true,
        type: "string",
      },
    };
    expect(schema.description()).toStrictEqual(expected);
  });
});
