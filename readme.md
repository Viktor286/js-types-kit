

#Javascript types toolkit

A set of semantic methods which intend to make work with javascript variable types more handy.

It's kind of a tricky topic about some type detection in javascript and it still has no consistent interface for that daily routine action.
(stackoverflow cases: [string](https://stackoverflow.com/a/9436948/4820094), [number](https://stackoverflow.com/a/8935649/4820094), [object](https://stackoverflow.com/a/8511332/4820094), [empty object](https://stackoverflow.com/a/32108184/4820094), [function](https://stackoverflow.com/a/7356528/4820094), [numeric](https://stackoverflow.com/questions/9716468/pure-javascript-a-function-like-jquerys-isnumeric), [float](https://stackoverflow.com/a/3886106/4820094), [bool](https://stackoverflow.com/a/28814615/4820094)).

It's interesting situation about all that confusion because the interpreter itself definitely knows each variable type when typeError executes.

&nbsp;
_*all further methods examples saved in one short js file at docs/usage-examples.js_

## Kit #1 – Basic type check with 'type.isType' semantic
Set of methods returns bool test response.

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

It could be used for simple exams as conditions.
```javascript
if (type.isArray(myArr) || type.isString(myStr)) {
  return true;
}
```


&nbsp;
## Kit #2 – Declares required types which cause error if fails.
This methods performs strict type verification from the runtime point of view.

It will throw type error in case of wrong type provided otherwise just return the original variable itself.

This set could be used as an additional runtime testing layer that checks input variables.

This especially important for network applications where input data could differentiate from time to time or could be spoofed.

It might be considered like 'static types' imitation on runtime.

```javascript
type.is.array(notAnArray); // throws error and stops the script

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
// Real-life example usage

loginMethod(username, password, data, notCriticalString, notCriticalCallback) {
  type.is.string(username); // declaration of strict runtime input data type
  type.is.string(password); // will throw error in case of not expected type
  type.is.object(data); // no additional if-else checks needed to just to be sure that input variable arrived in proper type 
  
  // All methods returns an original object, so we can check and assign input vars at the same time
  const myObj = {
    name: type.is.string(username),
    pass: type.is.string(password),
    payload: type.is.object(data)
  };
  
  // we always can handle the specific scenario depend on input test result
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
We also can collect a report of variables test results for debug purpose. So at the end of the script session we could just monitor some type errors.
```javascript
type.report.array(notAnArray); // saves a result in a report
type.report.string(myString); // saves a result in a report
type.report.float(myFloat); // saves a result in a report

showValidationReport('errors-only'); // displays a report with 'errors-only' in any place of the code with results collected before.
```


&nbsp;
## Kit #4 – Generate a variable of certain type
This set of methods generates particular data type variable and pre-defined collections of values of certain types.

It could be used in automated data-driven tests based on data types.

Collections could be used separately and altogether excluding specific ones with method 'allTypesExcept'.

_For more tests examples check out jest test files in dev/__tests___

```javascript
// trying to pass generated array to function
it("arrayRange params 1,5 < 6", () => expect(type.make.arrayRange(1, 5).length).toBeLessThan(6));

// data collections in data-driven test could save a lot of time provided a huge range combination test.
describe("data-driven-tests false", () => {
test.each(type.list.allTypesExcept("numbers", "booleans", "NaN", "specialVoids"))(tryFalseMsg, () => {
  try {
    expect(type.make.boolean());
  } catch (e) {
    expect(e.name === "TypeError").toBeTrue();
  }
});
});

```

I hope such approach could speed up type control work and add additional testing layer in the system.

 

