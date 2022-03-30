"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnNumericTransformer = void 0;
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
