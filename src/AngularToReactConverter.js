var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var nodeFetch = require('node-fetch');
var OpenAI = require("openai");
require("dotenv").config();
var AngularToReactConverter = /** @class */ (function () {
    function AngularToReactConverter(component) {
        this.component = component;
        var newConfig = {
            apiKey: process.env.OPENAI_SECRET_KEY
        };
        this.openai = new OpenAI(newConfig);
    }
    AngularToReactConverter.prototype.callGPT4API = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var GPTOutput, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.openai.chat.completions.create({
                                model: "gpt-3.5-turbo",
                                messages: [
                                    {
                                        role: "user",
                                        content: data.prompt
                                    }
                                ]
                            })];
                    case 1:
                        GPTOutput = _a.sent();
                        return [2 /*return*/, GPTOutput.choices[0].message.content.trim()];
                    case 2:
                        err_1 = _a.sent();
                        if (err_1 instanceof OpenAI.APIError) {
                            console.error(err_1.status);
                            console.error(err_1.message);
                            console.error(err_1.code);
                            console.error(err_1.type);
                        }
                        else {
                            console.log(err_1); // Non-API error
                        }
                        throw new Error("Error connecting to GPT API.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AngularToReactConverter.prototype.convertToReact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prompt, convertedComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prompt = "Convert the following Angular component to React: ".concat(this.component);
                        return [4 /*yield*/, this.callGPT4API({ prompt: prompt })];
                    case 1:
                        convertedComponent = _a.sent();
                        return [2 /*return*/, convertedComponent];
                }
            });
        });
    };
    return AngularToReactConverter;
}());
// Test the class
(function () { return __awaiter(_this, void 0, void 0, function () {
    var myAngularComponent, converter, reactComponent, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                myAngularComponent = "\n    @Component({\n        selector: 'app-root',\n        template: '<div>Hello Angular</div>',\n    })\n    export class AppComponent {}\n    ";
                converter = new AngularToReactConverter(myAngularComponent);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, converter.convertToReact()];
            case 2:
                reactComponent = _a.sent();
                console.log(reactComponent);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();
