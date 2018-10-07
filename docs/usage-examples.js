const type = require("../dist/js-types-kit");

// 1. Simple type testing methods in one place.
type.isString("1"); // true
type.isNumber(1); // true
type.isInt(2); // true
type.isFloat(3.4); // true
type.isBoolean(true); // true
type.isArray(["array"]); // true
type.isFunction(function() {}); // true
type.isObject({ field: 1 }); // true
type.isNull(null); // true
type.isUndefined(undefined); // true

// 2. Strict requirement of particular variable type, otherwise will rise TypeError. Useful as input/output verification.
type.strict.number(1); // returns origin
// type.strict.number('1'); // throws TypeError

// 'type.is' is alias of type.strict
type.is.string("1"); // true
type.is.number(1); // returns origin input
type.is.int(2);
type.is.float(3.4);
type.is.boolean(true);
type.is.array(["array"]);
type.is.function(function() {});
type.is.object({ field: 1 });
type.is.null(null);
type.is.undefined(undefined);

// 3. Generate value of particular type. All params has default values in empty case. Useful in random tests.
type.make.string(); // c4sy9
type.make.stringLong(); // c4sy9 c4 c4sy9c4sy9 c4 c4sy9
type.make.number(-10, 10); // -0.3635977789198641
type.make.int(-10, 10); // 4
type.make.float(-10, 10); // 6.805221193506257
type.make.boolean(); // false
type.make.array(); // [ -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
type.make.arrayRange(-10, 10); // [ -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
type.make.random(); // returns random type: e.g 'string', false, ['array']

// 4. Get the collection(list as array) of predefined type's values that could be useful in data-driven tests.
type.list.numbers; // [1, -1, 0, -0, 242, -242]
type.list.ints; // [1, -1, 0, 1.0, -1.0, -0]
type.list.floats; // [1.42, -1.42]
type.list.strings; // ["0", "-0", "1", "0", "1.242", "-1.422", "$#@*&(", "null", "undefined", "false"]
type.list.functions; // [emptyFunction, simpleFunction]
type.list.objects; // [emptyObject, simpleObject]
type.list.arrays; // [emptyArray, simpleArray]
type.list.booleans; // [false, true]
type.list.null; // [null]
type.list.undefined; // [undefined]
type.list.NaN; // [NaN]
type.list.specialVoids; // [null, undefined, NaN]

// TODO: add type.report examples
