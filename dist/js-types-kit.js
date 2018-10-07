const type = {
  isString(v) {
    return typeof v === "string" || v instanceof String;
  },

  isNumber(v) {
    return (!isNaN(v) && typeof v === "number") || v instanceof Number;
  },

  isInt(v) {
    return Number.isInteger(v); // isInteger(1.0) - true, JS don't have true float and int types
  },

  isFloat(v) {
    return typeof v === "number" && !Number.isInteger(v); // isFloat(1.0) - false, JS stores .0 as int
  },

  isBoolean(v) {
    return typeof v === typeof true;
  },

  isArray(v) {
    return Array.isArray(v);
  },

  isFunction(v) {
    // return typeof v === "function";
    return v && {}.toString.call(v) === "[object Function]";
  },

  isObject(v) {
    return v !== null && typeof v === "object";
  },

  isNull(v) {
    return v === null;
  },

  isUndefined(v) {
    return v === undefined;
  },

  isNumeric(n) {
    // TODO: *new integration
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  isEmpty(v) {
    // TODO: *new integration
    if (this.isArray(v) || this.isString(v)) {
      return v.length === 0;
    } else if (this.isObject(v)) {
      return Object.getOwnPropertyNames(v).length === 0;
    } else {
      return false;
    }
  },

  is: {
    // alias of .strict

    string(v) {
      return type.strict.string(v);
    },

    number(v) {
      return type.strict.number(v);
    },

    int(v) {
      return type.strict.int(v);
    },

    float(v) {
      return type.strict.float(v);
    },

    boolean(v) {
      return type.strict.boolean(v);
    },

    array(v) {
      return type.strict.array(v);
    },

    function(v) {
      return type.strict.function(v);
    },

    object(v) {
      return type.strict.object(v);
    },

    null(v) {
      return type.strict.null(v);
    },

    undefined(v) {
      return type.strict.undefined(v);
    }
  },

  strict: {
    errorMsg: `Strict type failed, needs to be `,

    number(v) {
      return this.typeOperator(v, "number");
    },

    int(v) {
      return this.typeOperator(v, "int");
    },

    float(v) {
      return this.typeOperator(v, "float");
    },

    string(v) {
      return this.typeOperator(v, "string");
    },

    boolean(v) {
      return this.typeOperator(v, "boolean");
    },

    array(v) {
      return this.typeOperator(v, "array");
    },

    function(v) {
      return this.typeOperator(v, "function");
    },

    object(v) {
      return this.typeOperator(v, "object");
    },

    null(v) {
      return this.typeOperator(v, "null");
    },

    undefined(v) {
      return this.typeOperator(v, "undefined");
    },

    typeOperator(v, typeName) {
      if (!type[`is${typeName.charAt(0).toUpperCase() + typeName.slice(1)}`](v)) {
        throw new TypeError(this.errorMsg + typeName);
      } else {
        return v;
      }
    }
  },

  make: {
    /**
     * @param from
     * @param to
     * @returns {number}
     */
    number(from = -999999, to = 999999) {
      type.is.number(from);
      type.is.number(to);

      from > to ? (from = to) : null;
      return Math.random() * (from - to) + to;
    },
  
    /**
     * @param from
     * @param to
     * @returns {number}
     */
    int(from = -999999, to = 999999) {
      type.is.int(from);
      type.is.int(to);

      from > to ? (from = to) : null;
      return Math.floor(Math.random() * (from - to + 1)) + to;
    },
  
    /**
     * @param from
     * @param to
     * @returns {*|number}
     */
    float(from = -999999, to = 999999) {
      // can't store float with .0, js stores Int in case of .0
      type.is.number(from);
      type.is.number(to);

      const float = this.number(from, to);
      return type.isInt(float) ? float + 0.1 : float;
    },
  
    /**
     * @param from
     * @param to
     * @returns {string}
     */
    string(from = 3, to = 5) {
      type.is.int(from);
      type.is.int(to);

      from <= 0 ? (from = 3) : null;
      to <= 0 ? (to = 3) : null;

      from > to ? (from = to) : null;

      return Math.random()
        .toString(36)
        .slice(2)
        .substr(0, this.int(from, to));
    },
  
    /**
     * @param wordsAmount
     * @returns {string}
     */
    stringLong(wordsAmount = 7) {
      type.is.int(wordsAmount);
      wordsAmount <= 0 ? (wordsAmount = 7) : null;

      let str = "";
      for (let i = 0; i < wordsAmount; i++) {
        str += `${this.string(1, 8)} `;
        if (i === 9999) {
          break;
        }
      }
      return str.trim();
    },
  
    /**
     * @returns {boolean}
     */
    boolean() {
      return Math.random() >= 0.5;
    },
  
    /**
     * @param from
     * @param to
     * @returns {*|Array}
     */
    array(from, to) {
      return this.arrayRange(from, to);
    },
  
    /**
     * @param from
     * @param to
     * @returns {number[]}
     */
    arrayRange(from = 0, to = 0) {
      type.is.int(from);

      if (to === 0) {
        to = from;
        from = 0;
      }

      from = parseInt(from, 10);
      to = parseInt(to, 10);
      from > to ? (from = to) : null;
      return Array(to - from + 1)
        .fill(0)
        .map((e, i) => i + from);
    },
  
    /**
     * @returns {*}
     */
    random() {
      const generateMethods = Object.keys(this);
      let pickMethod = generateMethods[this.int(0, generateMethods.length)];
      return this[pickMethod]();
    }
  },

  list: {
    get numbers() {
      return [1, -1, 0, -0, 242, -242];
    },

    get ints() {
      return [1, -1, 0, 1.0, -1.0, -0];
    },

    get floats() {
      return [1.42, -1.42];
    },

    get strings() {
      return ["0", "-0", "1", "0", "1.242", "-1.422", "$#@*&(", "null", "undefined", "false"];
    },

    get functions() {
      const emptyFunction = function() {};

      const simpleFunction = function(x) {
        x = x || 2;
        return x > 0;
      };

      return [emptyFunction, simpleFunction];
    },

    get objects() {
      const simpleObject = { obj: 1 };
      const emptyObject = {};
      return [emptyObject, simpleObject];
    },

    get arrays() {
      const simpleArray = ["array"];
      const emptyArray = [];
      return [emptyArray, simpleArray];
    },

    get booleans() {
      return [false, true];
    },

    get null() {
      return [null];
    },

    get undefined() {
      return [undefined];
    },

    get NaN() {
      return [NaN];
    },

    get specialVoids() {
      return [null, undefined, NaN];
    },

    allTypesExcept(...exceptMethods) {
      const reducedSet = Object.assign({}, this);
      exceptMethods.forEach(method => delete reducedSet[method]);

      let outputArr = [];
      for (let typeSetKey in reducedSet) {
        if (reducedSet.hasOwnProperty(typeSetKey) && typeSetKey !== "allTypesExcept") {
          const setArr = reducedSet[typeSetKey];
          outputArr = outputArr.concat(setArr);
        }
      }
      return outputArr;
    }
  },

  report: {
    stat: [],

    showValidationReport(flag) {
      const report = type.report.getReport(flag, "purge");

      if (report.reportTotal === report.reportSuccess) {
        console.log(
          `\nAll ${report.reportTotal} Input types validation is ok in scope '${type.getFunctionCallerName(2)}'`
        );
        if (flag !== "errors-only") {
          console.log(report.reportStr);
        }
      } else {
        console.log(
          `Test results for scope '${type.getFunctionCallerName(2)}' -- ${report.reportTotal}(${report.reportSuccess}/${
            report.reportFailed
          }) Total(Success/Failed)`
        );
        console.log(report.reportStr);
      }
    },

    addReport(reportString, binaryTestResult) {
      const statObj = {
        reportString: reportString,
        testResult: binaryTestResult
      };

      let report = type.report.stat.slice();
      report.push(statObj);
      type.report.stat = report;
    },

    getReport(flag, purge) {
      let reportStr;
      let reportTotal = 0;
      let reportSuccess = 0;
      let reportFailed = 0;

      let report = type.report.stat.slice();

      if (report.length > 0) {
        reportStr = "\n----- Input types validation report. -----\n";
        report.forEach(statObj => {
          if (flag === "errors-only") {
            if (statObj.testResult === 0) {
              reportStr += `${statObj.reportString}`;
            }
          } else {
            reportStr += `${statObj.reportString}`;
          }

          statObj.testResult === 1 ? reportSuccess++ : reportFailed++;
          reportTotal++;
        });
        reportStr += "\n\n--------------------\n";
      }

      if (purge === "purge") {
        type.report.stat = [];
      }

      return {
        reportStr: reportStr,
        reportTotal: reportTotal,
        reportSuccess: reportSuccess,
        reportFailed: reportFailed
      };
    },

    number(variable, mark = "") {
      if (!type.isNumber(variable)) {
        type.report.addReport(`\nINPUT IS NOT a Number: ${mark} == ${variable}`, 0);
      } else {
        type.report.addReport(`\nINPUT OK -- Number: ${mark} == ${variable}`, 1);
      }
      return variable;
    },

    string(variable, mark = "") {
      if (!type.isString(variable)) {
        type.report.addReport(`\nINPUT IS NOT a String: ${mark} == ${variable}`, 0);
      } else {
        type.report.addReport(`\nINPUT OK -- String: ${mark} == ${variable}`, 1);
      }
      return variable;
    },

    boolean(variable, mark = "") {
      if (!type.isBoolean(variable)) {
        type.report.addReport(`\nINPUT IS NOT a Boolean: ${mark} == ${variable}`, 0);
      } else {
        type.report.addReport(`\nINPUT OK -- Boolean: ${mark} == ${variable}`, 1);
      }
      return variable;
    },

    array(variable, mark = "") {
      if (!type.isArray(variable)) {
        type.report.addReport(`\nINPUT IS NOT a Array: ${mark} == ${variable}`, 0);
      } else {
        type.report.addReport(`\nINPUT OK -- Array: ${mark} == ${variable}`, 1);
      }
      return variable;
    },

    function(variable, mark = "") {
      if (!type.isFunction(variable)) {
        type.report.addReport(`\nINPUT IS NOT a Function: ${mark} == ${variable}`, 0);
      } else {
        type.report.addReport(`\nINPUT OK -- Function: ${mark} == ${variable}`, 1);
      }
      return variable;
    },

    object(variable, mark = "") {
      if (!type.isObject(variable)) {
        type.report.addReport(`\nINPUT IS NOT a Object: ${mark} == ${variable}`, 0);
      } else {
        type.report.addReport(`\nINPUT OK -- Object: ${mark} == ${JSON.stringify(variable)}`, 1);
      }
      return variable;
    },

    null(variable, mark = "") {
      if (!type.isNull(variable)) {
        type.report.addReport(`\nINPUT IS NOT a Null: ${mark} == ${variable}`, 0);
      } else {
        type.report.addReport(`\nINPUT OK -- Null: ${mark} == ${variable}`, 1);
      }
      return variable;
    },

    undefined(variable, mark = "") {
      if (!type.isUndefined(variable)) {
        type.report.addReport(`\nINPUT IS NOT a Undefined: ${mark} == ${variable}`, 0);
      } else {
        type.report.addReport(`\nINPUT OK -- Undefined: ${mark} == ${variable}`, 1);
      }
      return variable;
    }
  },

  getFunctionCallerName(level) {
    type.strict.number(level);
    level = level || 1;
    // https://stackoverflow.com/questions/1013239/can-i-get-the-name-of-the-currently-running-function-in-javascript
    let output = new Error().stack.match(/at (\S+)/g)[level].slice(3);

    if (output === "new") {
      output = new Error().stack.match(/at (\S+)/g)[level + 1].slice(3);
    }

    return output;
  },

  getLevelExecutionErrorData(level) {
    type.strict.number(level);
    let output = "";

    for (let i = 0; i < level; i++) {
      output += type.getFunctionCallerName(level);
    }

    return output;
  }
};

module.exports = type;
