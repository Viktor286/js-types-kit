const type = require("../js-types-kit");

const tryFalseMsg = "Try false: %s";
const tryTrueMsg = "Try true: %s";

describe("number", () => {
  it("loading make.number", () => expect(type.make).toContainKey("number"));

  // Data-driven tests
  describe("data-driven-tests false", () => {
    test.each(type.list.allTypesExcept("numbers", "ints", "floats", "undefined", "NaN", "specialVoids"))(
      tryFalseMsg,
      x => {
        try {
          expect(type.make.number(x, x)).toThrow(TypeError); // seems, .throw doesn't work with inner-functions exceptions
        } catch (e) {
          expect(e.name === "TypeError").toBeTrue();
        }
      }
    );
  });

  describe("data-driven-tests true", () => {
    test.each([...type.list.numbers, ...type.list.ints, ...type.list.floats])(tryTrueMsg, x =>
      expect(type.isNumber(type.make.number(x, x))).toBeTrue()
    );
  });

  // Custom tests
  describe("custom-tests true", () => {
    it("number params 1-5 < 6", () => expect(type.make.number(1, 5)).toBeLessThan(6));
    it("number params 5-5 < 6", () => expect(type.make.number(5, 5)).toBeLessThan(6));
    it("number params 10-5 < 6", () => expect(type.make.number(10, 5)).toBeLessThan(6));
    it("number params 0-0 === 0", () => expect(type.make.number(0, 0)).toBe(0));
    it("number params -3-1 < 0", () => expect(type.make.number(-3, -1)).toBeLessThan(0));
  });

  // Random test with default method execution
  describe("random-tests", () => {
    test.each(type.make.arrayRange(7))("rt #%s", () => expect(type.isNumber(type.make.number())).toBeTrue());
  });
});

describe("int", () => {
  it("loading make.int", () => expect(type.make).toContainKey("int"));

  // Data-driven tests
  describe("data-driven-tests false", () => {
    test.each(type.list.allTypesExcept("numbers", "ints", "NaN", "specialVoids"))(tryFalseMsg, x => {
      try {
        expect(type.make.int(x, x));
      } catch (e) {
        expect(e.name === "TypeError").toBeTrue();
      }
    });
  });

  describe("data-driven-tests true", () => {
    test.each(type.list.numbers)(tryTrueMsg, x => expect(type.isInt(type.make.int(x, x))).toBeTrue());
  });

  // Custom tests
  describe("custom-tests true", () => {
    it("int params 1-5 < 6", () => expect(type.make.int(1, 5)).toBeLessThan(6));
    it("int params 5-5 < 6", () => expect(type.make.int(5, 5)).toBeLessThan(6));
    it("int params 10-5 < 6", () => expect(type.make.int(10, 5)).toBeLessThan(6));
    it("int params 0-0 === 0", () => expect(type.make.int(0, 0)).toBe(0));
    it("int params -3-1 < 0", () => expect(type.make.int(-3, -1)).toBeLessThan(0));
  });

  // Random test with default method execution
  describe("random-tests", () => {
    test.each(type.make.arrayRange(7))("rt #%s", () => {
      expect(type.isInt(type.make.int())).toBeTrue();
    });
  });
});

describe("float", () => {
  it("loading make.float", () => expect(type.make).toContainKey("float"));

  // Data-driven tests
  describe("data-driven-tests false", () => {
    test.each(type.list.allTypesExcept("floats", "ints"))(tryFalseMsg, x => {
      try {
        expect(type.make.float(x, x));
      } catch (e) {
        expect(e.name === "TypeError").toBeTrue();
      }
    });
  });

  describe("data-driven-tests true", () => {
    test.each(type.list.numbers)(tryTrueMsg, x => expect(type.isFloat(type.make.float(x, x))).toBeTrue());
  });

  // Custom tests
  describe("custom-tests true", () => {
    it("float params 1-5 < 6", () => expect(type.make.float(1, 5)).toBeLessThan(6));
    it("float params 5-5 < 6", () => expect(type.make.float(5, 5)).toBeLessThan(6));
    it("float params 10-5 < 6", () => expect(type.make.float(10, 5)).toBeLessThan(6));
    it("float params 0-0 === 0.1", () => expect(type.make.float(0, 0)).toBe(0.1));
    it("float params -3-1 < 0", () => expect(type.make.float(-3, -1)).toBeLessThan(0));
  });

  // Random test with default method execution
  describe("random-tests", () => {
    test.each(type.make.arrayRange(7))("rt #%s", () => expect(type.isFloat(type.make.float())).toBeTrue());
  });
});

describe("string", () => {
  it("loading make.string", () => expect(type.make).toContainKey("string"));

  // Data-driven tests
  describe("data-driven-tests false", () => {
    test.each(type.list.allTypesExcept("strings"))(tryFalseMsg, x => {
      try {
        expect(type.make.string(x, x));
      } catch (e) {
        expect(e.name === "TypeError").toBeTrue();
      }
    });
  });

  describe("data-driven-tests true", () => {
    test.each(type.list.numbers)(tryTrueMsg, x => expect(type.isString(type.make.string(x, x))).toBeTrue());
  });

  // Custom tests
  describe("custom-tests true", () => {
    it("string params 1,5 < 6", () => expect(type.make.string(1, 5).length).toBeLessThan(6));
    it("string params 5,5 < 6", () => expect(type.make.string(5, 5).length).toBeLessThan(6));
    it("string params 10,5 < 6", () => expect(type.make.string(10, 5).length).toBeLessThan(6));
    it("string params 0,0 < 6", () => expect(type.make.string(0, 0).length).toBeLessThan(6));
    it("string params 10,5 < 6", () => expect(type.make.string(-5, -5).length).toBeLessThan(6));
  });

  // Random test with default method execution
  describe("random-tests", () => {
    test.each(type.make.arrayRange(7))("rt #%s", () => {
      expect(type.isString(type.make.string())).toBeTrue();
    });
  });
});

describe("stringLong", () => {
  it("loading make.stringLong", () => expect(type.make).toContainKey("stringLong"));

  // Data-driven tests
  describe("data-driven-tests false", () => {
    test.each(type.list.allTypesExcept("strings"))(tryFalseMsg, x => {
      try {
        expect(type.make.stringLong(x));
      } catch (e) {
        expect(e.name === "TypeError").toBeTrue();
      }
    });
  });

  describe("data-driven-tests true", () => {
    test.each(type.list.numbers)(tryTrueMsg, x => expect(type.isString(type.make.stringLong(x))).toBeTrue());
  });

  // Custom tests
  describe("custom-tests true", () => {
    it("stringLong params 5, length > 15", () => expect(type.make.stringLong(5).length).toBeGreaterThan(15));
    it("stringLong params 0, length > 15", () => expect(type.make.stringLong(0).length).toBeGreaterThan(19));
    it("stringLong params 10,5 < 6", () => expect(type.make.stringLong(-3).length).toBeGreaterThan(19));
  });

  // Random test with default method execution
  describe("random-tests", () => {
    test.each(type.make.arrayRange(7))("rt #%s", () => {
      expect(type.isString(type.make.stringLong())).toBeTrue();
    });
  });
});

describe("boolean", () => {
  it("loading make.boolean", () => expect(type.make).toContainKey("boolean"));

  // Data-driven tests
  describe("data-driven-tests false", () => {
    test.each(type.list.allTypesExcept("numbers", "booleans", "NaN", "specialVoids"))(tryFalseMsg, () => {
      try {
        expect(type.make.boolean());
      } catch (e) {
        expect(e.name === "TypeError").toBeTrue();
      }
    });
  });

  describe("data-driven-tests true", () => {
    test.each(type.list.numbers)(tryTrueMsg, x => expect(type.isBoolean(type.make.boolean(x, x))).toBeTrue());
  });

  // Random test with default method execution
  describe("random-tests", () => {
    test.each(type.make.arrayRange(7))("rt #%s", () => {
      expect(type.isBoolean(type.make.boolean())).toBeTrue();
    });
  });
});

describe("arrayRange", () => {
  it("loading make.arrayRange", () => expect(type.make).toContainKey("arrayRange"));

  // Data-driven tests
  describe("data-driven-tests false", () => {
    test.each(type.list.allTypesExcept("arrays"))(tryFalseMsg, x => {
      try {
        expect(type.make.arrayRange(x, x));
      } catch (e) {
        expect(e.name === "TypeError").toBeTrue();
      }
    });
  });

  describe("data-driven-tests true", () => {
    test.each(type.list.numbers)(tryTrueMsg, x => expect(type.isArray(type.make.arrayRange(x, x))).toBeTrue());
  });

  // Custom tests
  describe("custom-tests true", () => {
    it("arrayRange params 1,5 < 6", () => expect(type.make.arrayRange(1, 5).length).toBeLessThan(6));
    it("arrayRange params 5,5 < 6", () => expect(type.make.arrayRange(5, 5).length).toBeLessThan(6));
    it("arrayRange params 10,5 < 6", () => expect(type.make.arrayRange(10, 5).length).toBeLessThan(6));
    it("arrayRange params 0,0 < 6", () => expect(type.make.arrayRange(0, 0).length).toBeLessThan(6));
    it("arrayRange params 10,5 < 6", () => expect(type.make.arrayRange(-5, -5).length).toBeLessThan(6));
    it("arrayRange params 10,5 < 6", () => expect(type.make.arrayRange(-5, 5).length).toBeGreaterThan(6));
  });

  // Random test with default method execution
  describe("random-tests", () => {
    test.each(type.make.arrayRange(7))("rt #%s", () => {
      expect(type.isArray(type.make.arrayRange())).toBeTrue();
    });
  });
});

// random
