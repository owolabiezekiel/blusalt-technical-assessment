"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Billing = void 0;
var typeorm_1 = require("typeorm");
var decimal_transformer_1 = require("../util/decimal_transformer");
var Billing = /** @class */ (function () {
    function Billing() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Billing.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Billing.prototype, "customer_id", void 0);
    __decorate([
        (0, typeorm_1.Column)("numeric", {
            precision: 7,
            scale: 2,
            transformer: new decimal_transformer_1.ColumnNumericTransformer(),
        }),
        __metadata("design:type", Number)
    ], Billing.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "pending" }),
        __metadata("design:type", String)
    ], Billing.prototype, "status", void 0);
    Billing = __decorate([
        (0, typeorm_1.Entity)()
    ], Billing);
    return Billing;
}());
exports.Billing = Billing;
