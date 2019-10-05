/* eslint no-extend-native: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
// core-js comes with Next.js. So, you can import it like below
import includes from "core-js/es/string/virtual/includes";
import repeat from "core-js/es/string/virtual/repeat";
import assign from "core-js/es/object/assign";

// Add your polyfills
// This files runs at the very beginning (even before React and Next.js core)
// eslint-disable-next-line no-console
console.log("Load thenlo polyfills");

String.prototype.includes = includes;
String.prototype.repeat = repeat;
Object.assign = assign;
