"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalToString = exports.ColumnNumericTransformer = exports.DecimalTransformer = void 0;
var decimal_js_1 = require("decimal.js");
var DecimalTransformer = /** @class */ (function () {
    function DecimalTransformer() {
    }
    /**
     * Used to marshal Decimal when writing to the database.
     */
    DecimalTransformer.prototype.to = function (decimal) {
        return decimal === null || decimal === void 0 ? void 0 : decimal.toString();
    };
    /**
     * Used to unmarshal Decimal when reading from the database.
     */
    DecimalTransformer.prototype.from = function (decimal) {
        return decimal ? new decimal_js_1.default(decimal) : null;
    };
    return DecimalTransformer;
}());
exports.DecimalTransformer = DecimalTransformer;
var ColumnNumericTransformer = /** @class */ (function () {
    function ColumnNumericTransformer() {
    }
    ColumnNumericTransformer.prototype.to = function (data) {
        return data;
    };
    ColumnNumericTransformer.prototype.from = function (data) {
        return parseFloat(data);
    };
    return ColumnNumericTransformer;
}());
exports.ColumnNumericTransformer = ColumnNumericTransformer;
var DecimalToString = function (decimals) {
    if (decimals === void 0) { decimals = 2; }
    return function (decimal) { var _a; return ((_a = decimal === null || decimal === void 0 ? void 0 : decimal.toFixed) === null || _a === void 0 ? void 0 : _a.call(decimal, decimals)) || decimal; };
};
exports.DecimalToString = DecimalToString;
