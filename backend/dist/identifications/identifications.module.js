"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentificationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const identifications_controller_1 = require("./identifications.controller");
const identifications_service_1 = require("./identifications.service");
const identification_schema_1 = require("../schemas/identification.schema");
let IdentificationsModule = class IdentificationsModule {
};
exports.IdentificationsModule = IdentificationsModule;
exports.IdentificationsModule = IdentificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: identification_schema_1.Identification.name, schema: identification_schema_1.IdentificationSchema },
            ]),
        ],
        controllers: [identifications_controller_1.IdentificationsController],
        providers: [identifications_service_1.IdentificationsService],
        exports: [identifications_service_1.IdentificationsService],
    })
], IdentificationsModule);
//# sourceMappingURL=identifications.module.js.map