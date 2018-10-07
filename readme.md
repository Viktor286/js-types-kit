
# Javascript types toolkit

js-types-kit is a set of semantic methods which are meant to make work with javascript variable types faster and simpler.

Contents:
1. Bool verification of variable type
2. Strict requirement of the type for a provided variable
3. Collect type-tests results in a report for debug mode
4. Generate variables of a specific type for random tests
5. Provide a sets of the specific type for data-driven tests

It's kind of a tricky topic about type workflow and type verification in javascript and still there is no consistent interface for that daily routine task.
Stackoverflow cases: [string](https://stackoverflow.com/a/9436948/4820094), [number](https://stackoverflow.com/a/8935649/4820094), [object](https://stackoverflow.com/a/8511332/4820094), [empty object](https://stackoverflow.com/a/32108184/4820094), [function](https://stackoverflow.com/a/7356528/4820094), [numeric](https://stackoverflow.com/questions/9716468/pure-javascript-a-function-like-jquerys-isnumeric), [float](https://stackoverflow.com/a/3886106/4820094), [bool](https://stackoverflow.com/a/28814615/4820094) and so on.

This library is an experiment toolkit of methods which dedicated to cover some aspects of 'types control' issues which appear during daily work.

BTW, it's an interesting situation about javascript types confusion because the interpreter definitely knows variable type when typeError executes.

### Installation
_ES6 used_

Web-page: copy 'dist/js-types-kit.min.js' to your javascript directory and include script into page.
It will set a global variable 'type' to provide access to working methods globally.
```javascript
<script src="js-types-kit.min.js"></script>
```

Node: npm install js-types-kit
```javascript
const type = require("js-types-kit");
```


&nbsp;
_* further methods examples located in one short .js file at docs/usage-examples.js_

&nbsp;
## Kit #1 – Basic type check with 'type.isType' semantics
Set of methods returns a bool test result.

```javascript
// Set #1 methods. Simple type testing in one place.
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
```

It could be used for simple exams in conditions.
```javascript
if (type.isArray(myArr) || type.isString(myStr)) {
  return true;
}
```


&nbsp;
## Kit #2 – Declares required types which cause an error if fails.
This methods performs strict type verification from the runtime point of view.

It will throw type error in case of the wrong type provided otherwise just return the original variable itself.

This set could be used as an additional runtime testing layer that checks input variables.
This especially important for network applications where input data could differentiate from time to time or could be spoofed.

It also might be considered like 'static types' imitation on runtime.

```javascript
type.is.array(notAnArray); // throws type error and stops the script

// handle type-check fail, logs error and continue the script
try{
	type.is.string(notString); 
} catch {
	console.log('Wrong input, but still continue...')
}
```
```javascript
// Set #2 methods list.
type.is.string("1"); // 'type.is.' is an alias of similar method 'type.strict'
type.is.number(1); // returns origin input
type.is.int(2);
type.is.float(3.4);
type.is.boolean(true);
type.is.array(["array"]);
type.is.function(function() {});
type.is.object({ field: 1 });
type.is.null(null);
type.is.undefined(undefined);
```

```javascript
// Example usage

loginMethod(username, password, data, notCriticalString, notCriticalCallback) {
  type.is.string(username); // declaration of strict runtime input data type
  type.is.string(password); // will throw an error in case of unexpected type
  type.is.object(data); // no additional if-else checks needed to just to be sure that input variable arrived in the proper type 
  
  // All methods return an original object, so we can check and assign input vars at the same time
  const myObj = {
    name: type.is.string(username),
    pass: type.is.string(password),
    payload: type.is.object(data)
  };
  
  // we always can handle the specific scenario depend on the input test result
  try{
  	type.is.string(notCriticalString); 
  	type.is.function(notCriticalCallback);
  } catch {
  	console.log('Wrong input, but still continue...')
  }

  // Rest of the method goes here...
}

```


&nbsp;
## Kit #3 – Report collection of type checks results
We also can collect a report of variables test results for debug purpose. So at the end of the script session we could monitor some type errors.
```javascript
type.report.array(notAnArray); // saves a result in a report
type.report.string(myString); // saves a result in a report
type.report.float(myFloat); // saves a result in a report

showValidationReport('errors-only'); // displays a report with 'errors-only' in any place of the code with results collected before.
```


&nbsp;
## Kit #4 – Generates a variable of a certain type
This set of methods generates particular data type variable and pre-defined collections (lists) of values of certain types.

It could be used in automated data-driven tests based on data types.


```javascript
// Kit #4 methods list. All params have default values. Could be useful in random tests.
type.make.string(); // c4sy9
type.make.stringLong(); // c4sy9 c4 c4sy9c4sy9 c4 c4sy9
type.make.number(-10, 10); // -0.3635977789198641
type.make.int(-10, 10); // 4
type.make.float(-10, 10); // 6.805221193506257
type.make.boolean(); // false
type.make.array(); // [ -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
type.make.arrayRange(-10, 10); // [ -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
type.make.random(); // returns random type: e.g 'string', false, ['array']
```

&nbsp;
## Kit #5 – Provides a sets of the specific type for data-driven tests

To use a range of several variable types as one array we can use 'type.list.*' as a base of iteration for a test.

```javascript
// Get the collection (list as an array) of predefined type's values that could be useful in data-driven tests.
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
```
Collections of types could be used separately or all at once with method 'allTypesExcept' which will exclude specific lists.

_For more tests examples checkout jest test files in dev/__tests___

```javascript
// In this examples 'jest-each' module used (https://www.npmjs.com/package/jest-each)

describe("isString", () => { // this spec generates about 35 test
  it("loading isString", () => expect(type).toContainKey("isString"));
  
  // The data-driven test could effectively cover a lot of possible values for both 'true' and 'false' expected results.
 
  // We can iterate test assertions based on values from 'type.list.strings' array which returns
  // ["0", "-0", "1", "0", "1.242", "-1.422", "$#@*&(", "null", "undefined", "false"]
  test.each(type.list.strings)("Try true: %s", x => expect(type.isString(x)).toBeTrue());
  // As a step further, it's easy to combine 'strings' with 'objects' if needed with concat.
    
  // 'type.list.allTypesExcept' returns all collections in a kit as one array except specified collections.
  test.each(type.list.allTypesExcept("strings"))("Try false: %s", x => expect(type.isString(x)).toBeFalse());
});
```

Hopefully 'js-types-kit' speed up type control workflow and add an additional testing layer in the system.


