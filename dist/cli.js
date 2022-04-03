#!/usr/bin/env node
"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var yargs_1 = __importDefault(require("yargs"));
var fs_1 = require("ipfs-car/pack/fs");
var upload_1 = require("./upload");
var API_TOKEN = process.env.NFT_STORAGE_API_TOKEN;
function makeLink(s) {
    return "https://".concat(s, ".ipfs.dweb.link");
}
// eslint-disable-next-line no-var
yargs_1.default
    .scriptName('nft')
    .command('pack <directory>', 'pack a directory into a .car file', function (y) {
    y.option('output', { type: 'string', default: 'index.car' });
}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var input, output, _a, root, filename;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                input = argv.directory;
                output = argv.output;
                return [4 /*yield*/, pack({ input: input, output: output })];
            case 1:
                _a = _b.sent(), root = _a.root, filename = _a.filename;
                // tslint:disable-next-line: no-console
                console.log("root CID: ".concat(root.toString()));
                // tslint:disable-next-line: no-console
                console.log("  output: ".concat(filename));
                return [2 /*return*/];
        }
    });
}); })
    .command('upload <car>', 'upload .car file to nft.storage.\nExpects env variable `NFT_STORAGE_API_TOKEN` or --api-key', function (y) {
    y.positional('car', {
        describe: 'path to car file to be uploaded',
        default: 'index.car',
    }).option('api-key', {
        type: 'string',
    });
}, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, CID, link;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                apiKey = ((_a = argv['api-key']) !== null && _a !== void 0 ? _a : API_TOKEN);
                if (!apiKey) {
                    throw new Error('API key missing. Need `--api-key` or NFT_STORAGE_API_TOKEN env');
                }
                return [4 /*yield*/, (0, upload_1.storeCarFile)(argv.car, apiKey)];
            case 1:
                CID = _b.sent();
                link = makeLink(CID);
                console.log(CID);
                console.log(link);
                return [2 /*return*/];
        }
    });
}); })
    .fail(function (_msg, _err, yargs) {
    // if (err) throw err // preserve stack
    console.log(chalk_1.default.blue(figlet_1.default.textSync('NFT CLI')));
    console.error(yargs.help());
    process.exit(1);
}).argv;
function pack(_a) {
    var output = _a.output, input = _a.input;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, (0, fs_1.packToFs)({
                    input: input,
                    output: output,
                    wrapWithDirectory: false,
                })];
        });
    });
}
