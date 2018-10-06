/** Data-driven tests for isType methods validation */
const type = require("../js-types-kit");

const tryFalseMsg = "Try false: %s";
const tryTrueMsg = "Try true: %s";

describe("isString", () => {
  it("loading isString", () => expect(type).toContainKey("isString"));
  test.each(type.list.allTypesExcept("strings"))(tryFalseMsg, x => expect(type.isString(x)).toBeFalse());
  test.each([...type.list.strings])(tryTrueMsg, x => expect(type.isString(x)).toBeTrue());
});

describe("isNumber", () => {
  it("loading isNumber", () => expect(type).toContainKey("isNumber"));
  test.each(type.list.allTypesExcept("numbers", "ints", "floats", "NaN", "specialVoids"))(tryFalseMsg, x =>
    expect(type.isNumber(x)).toBeFalse()
  );
  test.each(type.list.numbers)(tryTrueMsg, x => expect(type.isNumber(x)).toBeTrue());
});

describe("isInt", () => {
  it("loading isInt", () => expect(type).toContainKey("isInt"));
  test.each(type.list.allTypesExcept("numbers", "ints"))(tryFalseMsg, x => expect(type.isInt(x)).toBeFalse());
  test.each(type.list.ints)(tryTrueMsg, x => expect(type.isInt(x)).toBeTrue());
});

describe("isFloat", () => {
  it("loading isFloat", () => expect(type).toContainKey("isFloat"));
  test.each(type.list.allTypesExcept("floats", "NaN", "specialVoids"))(tryFalseMsg, x =>
    expect(type.isFloat(x)).toBeFalse()
  );
  test.each(type.list.floats)(tryTrueMsg, x => expect(type.isFloat(x)).toBeTrue());
});

describe("isBoolean", () => {
  it("loading isBoolean", () => expect(type).toContainKey("isBoolean"));
  test.each(type.list.allTypesExcept("booleans"))(tryFalseMsg, x => expect(type.isBoolean(x)).toBeFalse());
  test.each(type.list.booleans)(tryTrueMsg, x => expect(type.isBoolean(x)).toBeTrue());
});

describe("isArray", () => {
  it("loading isArray", () => expect(type).toContainKey("isArray"));
  test.each(type.list.allTypesExcept("arrays"))(tryFalseMsg, x => expect(type.isArray(x)).toBeFalse());
  expect(type.isArray([1, 2, 3])).toBeTrue();
  expect(type.isArray([])).toBeTrue();
});

describe("isFunction", () => {
  it("loading isFunction", () => expect(type).toContainKey("isFunction"));
  test.each(type.list.allTypesExcept("functions"))(tryFalseMsg, x => expect(type.isFunction(x)).toBeFalse());
  test.each(type.list.functions)(tryTrueMsg, x => expect(type.isFunction(x)).toBeTrue());
});

describe("isObject", () => {
  it("loading isObject", () => expect(type).toContainKey("isObject"));
  test.each(type.list.allTypesExcept("functions", "objects", "arrays"))(tryFalseMsg, x =>
    expect(type.isObject(x)).toBeFalse()
  );
  test.each(type.list.objects)(tryTrueMsg, x => expect(type.isObject(x)).toBeTrue());
});

describe("isNull", () => {
  it("loading isNull", () => expect(type).toContainKey("isNull"));
  test.each(type.list.allTypesExcept("specialVoids", "null"))(tryFalseMsg, x => expect(type.isNull(x)).toBeFalse());
  test.each(type.list.null)(tryTrueMsg, x => expect(type.isNull(x)).toBeTrue());
});

describe("isUndefined", () => {
  it("loading isUndefined", () => expect(type).toContainKey("isUndefined"));
  test.each(type.list.allTypesExcept("specialVoids", "undefined"))(tryFalseMsg, x =>
    expect(type.isUndefined(x)).toBeFalse()
  );
  test.each(type.list.undefined)(tryTrueMsg, x => expect(type.isUndefined(x)).toBeTrue());
});
