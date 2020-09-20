/**
 * @type {string[]}
 */
const disallowedQueryStrings = ["fbclid"];

/**
 * @typedef {string} capturingPattern
 * @typedef {string} replacingPattern
 * @typedef {"i" | "g" | "gi" | "ig"} flags
 * @typedef {[capturingPattern, flags]} replaceableRegExp
 * @typedef {[capturingPattern, replaceableRegExp, replacingPattern]} rules
 * @typedef {rules[]} URLReplacingRules
 * @type {URLReplacingRules}
 */
// const urlReplacingRules = [["imagetwist.com", ["/th/", "i"], "/i/"]]; // example
const urlReplacingRules = [];
