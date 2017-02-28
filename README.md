From the creator of useless beauty handicrafts such as "myPartial", now comes... getProperty (!?)

Another "*educational*" [FP](https://en.wikipedia.org/wiki/Functional_programming) utility.

It's a mix of underscore/lodash `_.property` and `_.get` (previously called `_.result`)

A "middleware" for a functional pipeline.

Usage:

```javascript
var getTarget = getProperty("target");
form.addEventListener("submit", compose(getTarget, validateForm));
function validateForm(form) {
    // ...
}

// or deeper
var getValue = getProperty("target.value");
input.addEventListener("change", compose(getValue, submitValue));
function submitValue(value) {
    alert("input value is " + value);
}
```
Without combining with a `compose` (or `_.flow`) function I don't see it of much utility.

But the commits history of how I got there seem to me like pretty ejemplyfiers.

# Testing

Just run

`$ node getProperty.test.js`

# License

MIT licensed
