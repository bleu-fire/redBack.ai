"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const learning_controller_1 = require("./learning.controller");
const learning_service_1 = require("./learning.service");
const learning_topic_schema_1 = require("../schemas/learning-topic.schema");
let LearningModule = class LearningModule {
};
exports.LearningModule = LearningModule;
exports.LearningModule = LearningModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: learning_topic_schema_1.LearningTopic.name, schema: learning_topic_schema_1.LearningTopicSchema },
            ]),
        ],
        controllers: [learning_controller_1.LearningController],
        providers: [learning_service_1.LearningService],
        exports: [learning_service_1.LearningService],
    })
], LearningModule);
//# sourceMappingURL=learning.module.js.map