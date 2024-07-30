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
var Moralis = require("moralis").default;
var DOMAIN = "oseandao.com";
var STATEMENT = "Sign this message to connect your wallet to OseanDAO";
var URI = "https://oseandao.com";
var EXPIRATION_TIME = "2025-01-01T00:00:00.000Z";
var TIMEOUT = 15;
var beforeApiRequest = function (ts1, ts2, ts3) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
var getErrorMessage = function (error, endpoint) {
    if (error.message) {
        return error.message;
    }
    if (error.error) {
        return error.error;
    }
    return "Error occurred while calling ".concat(endpoint);
};
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
{
    Parse.Cloud.define("getBlock", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getBlock")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.block.getBlock(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_1 = _b.sent();
                        throw new Error(getErrorMessage(error_1, "getBlock"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getDateToBlock", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getDateToBlock")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.block.getDateToBlock(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_2 = _b.sent();
                        throw new Error(getErrorMessage(error_2, "getDateToBlock"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getLogsByAddress", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getLogsByAddress")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.events.getContractLogs(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_3 = _b.sent();
                        throw new Error(getErrorMessage(error_3, "getLogsByAddress"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNFTTransfersByBlock", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNFTTransfersByBlock")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTTransfersByBlock(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_4 = _b.sent();
                        throw new Error(getErrorMessage(error_4, "getNFTTransfersByBlock"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTransaction", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTransaction")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.transaction.getTransaction(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_5 = _b.sent();
                        throw new Error(getErrorMessage(error_5, "getTransaction"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getContractEvents", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getContractEvents")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.events.getContractEvents(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_6 = _b.sent();
                        throw new Error(getErrorMessage(error_6, "getContractEvents"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("runContractFunction", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "runContractFunction")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.utils.runContractFunction(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_7 = _b.sent();
                        throw new Error(getErrorMessage(error_7, "runContractFunction"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTransactions", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTransactions")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.transaction.getWalletTransactions(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_8 = _b.sent();
                        throw new Error(getErrorMessage(error_8, "getTransactions"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNativeBalance", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNativeBalance")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.balance.getNativeBalance(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_9 = _b.sent();
                        throw new Error(getErrorMessage(error_9, "getNativeBalance"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTokenBalances", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTokenBalances")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.token.getWalletTokenBalances(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_10 = _b.sent();
                        throw new Error(getErrorMessage(error_10, "getTokenBalances"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTokenTransfers", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTokenTransfers")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.token.getWalletTokenTransfers(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_11 = _b.sent();
                        throw new Error(getErrorMessage(error_11, "getTokenTransfers"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNFTs", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNFTs")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getWalletNFTs(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_12 = _b.sent();
                        throw new Error(getErrorMessage(error_12, "getNFTs"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNFTTransfers", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNFTTransfers")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getWalletNFTTransfers(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_13 = _b.sent();
                        throw new Error(getErrorMessage(error_13, "getNFTTransfers"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getWalletNFTCollections", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getWalletNFTCollections")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getWalletNFTCollections(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_14 = _b.sent();
                        throw new Error(getErrorMessage(error_14, "getWalletNFTCollections"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNFTsForContract", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNFTsForContract")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getWalletNFTs(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_15 = _b.sent();
                        throw new Error(getErrorMessage(error_15, "getNFTsForContract"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTokenMetadata", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_16;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTokenMetadata")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.token.getTokenMetadata(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_16 = _b.sent();
                        throw new Error(getErrorMessage(error_16, "getTokenMetadata"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNFTTrades", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_17;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNFTTrades")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTTrades(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_17 = _b.sent();
                        throw new Error(getErrorMessage(error_17, "getNFTTrades"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNFTLowestPrice", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_18;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNFTLowestPrice")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTLowestPrice(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_18 = _b.sent();
                        throw new Error(getErrorMessage(error_18, "getNFTLowestPrice"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTokenMetadataBySymbol", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_19;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTokenMetadataBySymbol")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.token.getTokenMetadataBySymbol(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_19 = _b.sent();
                        throw new Error(getErrorMessage(error_19, "getTokenMetadataBySymbol"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTokenPrice", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_20;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTokenPrice")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.token.getTokenPrice(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_20 = _b.sent();
                        throw new Error(getErrorMessage(error_20, "getTokenPrice"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTokenAddressTransfers", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_21;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTokenAddressTransfers")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.token.getTokenTransfers(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_21 = _b.sent();
                        throw new Error(getErrorMessage(error_21, "getTokenAddressTransfers"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTokenAllowance", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_22;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTokenAllowance")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.token.getTokenAllowance(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_22 = _b.sent();
                        throw new Error(getErrorMessage(error_22, "getTokenAllowance"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("searchNFTs", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_23;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "searchNFTs")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.searchNFTs(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_23 = _b.sent();
                        throw new Error(getErrorMessage(error_23, "searchNFTs"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNftTransfersFromToBlock", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_24;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNftTransfersFromToBlock")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTTransfersFromToBlock(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_24 = _b.sent();
                        throw new Error(getErrorMessage(error_24, "getNftTransfersFromToBlock"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getAllTokenIds", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_25;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getAllTokenIds")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getContractNFTs(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_25 = _b.sent();
                        throw new Error(getErrorMessage(error_25, "getAllTokenIds"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getContractNFTTransfers", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_26;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getContractNFTTransfers")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTContractTransfers(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_26 = _b.sent();
                        throw new Error(getErrorMessage(error_26, "getContractNFTTransfers"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNFTOwners", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_27;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNFTOwners")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTOwners(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_27 = _b.sent();
                        throw new Error(getErrorMessage(error_27, "getNFTOwners"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getNFTMetadata", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_28;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getNFTMetadata")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTContractMetadata(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_28 = _b.sent();
                        throw new Error(getErrorMessage(error_28, "getNFTMetadata"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("reSyncMetadata", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_29;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "reSyncMetadata")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.reSyncMetadata(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_29 = _b.sent();
                        throw new Error(getErrorMessage(error_29, "reSyncMetadata"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("syncNFTContract", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_30;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "syncNFTContract")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.syncNFTContract(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_30 = _b.sent();
                        throw new Error(getErrorMessage(error_30, "syncNFTContract"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTokenIdMetadata", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_31;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTokenIdMetadata")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTMetadata(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_31 = _b.sent();
                        throw new Error(getErrorMessage(error_31, "getTokenIdMetadata"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getTokenIdOwners", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_32;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getTokenIdOwners")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTTokenIdOwners(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_32 = _b.sent();
                        throw new Error(getErrorMessage(error_32, "getTokenIdOwners"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getWalletTokenIdTransfers", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_33;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getWalletTokenIdTransfers")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.nft.getNFTTransfers(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_33 = _b.sent();
                        throw new Error(getErrorMessage(error_33, "getWalletTokenIdTransfers"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("resolveDomain", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_34;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "resolveDomain")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.resolve.resolveDomain(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_34 = _b.sent();
                        throw new Error(getErrorMessage(error_34, "resolveDomain"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("resolveAddress", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_35;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "resolveAddress")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.resolve.resolveAddress(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_35 = _b.sent();
                        throw new Error(getErrorMessage(error_35, "resolveAddress"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getPairReserves", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_36;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getPairReserves")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.defi.getPairReserves(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_36 = _b.sent();
                        throw new Error(getErrorMessage(error_36, "getPairReserves"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("getPairAddress", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_37;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "getPairAddress")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.defi.getPairAddress(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_37 = _b.sent();
                        throw new Error(getErrorMessage(error_37, "getPairAddress"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("uploadFolder", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_38;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "uploadFolder")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.ipfs.uploadFolder(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_38 = _b.sent();
                        throw new Error(getErrorMessage(error_38, "uploadFolder"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("web3ApiVersion", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_39;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "web3ApiVersion")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.utils.web3ApiVersion(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_39 = _b.sent();
                        throw new Error(getErrorMessage(error_39, "web3ApiVersion"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Parse.Cloud.define("endpointWeights", function (_a) {
        var params = _a.params, user = _a.user, ip = _a.ip;
        return __awaiter(_this, void 0, void 0, function () {
            var result, error_40;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, beforeApiRequest(user, ip, "endpointWeights")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Moralis.EvmApi.utils.endpointWeights(params)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.raw];
                    case 3:
                        error_40 = _b.sent();
                        throw new Error(getErrorMessage(error_40, "endpointWeights"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
}
function requestMessage(_a) {
    var address = _a.address, chain = _a.chain, networkType = _a.networkType;
    return __awaiter(this, void 0, void 0, function () {
        var result, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Moralis.Auth.requestMessage({
                        address: address,
                        chain: chain,
                        networkType: networkType,
                        domain: DOMAIN,
                        statement: STATEMENT,
                        uri: URI,
                        expirationTime: EXPIRATION_TIME,
                        timeout: TIMEOUT,
                    })];
                case 1:
                    result = _b.sent();
                    message = result.toJSON().message;
                    return [2 /*return*/, message];
            }
        });
    });
}
Parse.Cloud.define("requestMessage", function (_a) {
    var params = _a.params;
    return __awaiter(_this, void 0, void 0, function () {
        var address, chain, networkType, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    address = params.address, chain = params.chain, networkType = params.networkType;
                    return [4 /*yield*/, requestMessage({
                            address: address,
                            chain: chain,
                            networkType: networkType,
                        })];
                case 1:
                    message = _b.sent();
                    return [2 /*return*/, { message: message }];
            }
        });
    });
});
Parse.Cloud.define("getPluginSpecs", function () {
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    return [];
});
Parse.Cloud.define("getServerTime", function () {
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    return null;
});
/**
 * Types
 */
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
Parse.Cloud.define("generateQuoteEth", function (request) { return __awaiter(_this, void 0, void 0, function () {
    var amountUsd, user, Quote, quote;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amountUsd = request.params.amountUsd;
                user = request.user;
                Quote = Parse.Object.extend("QuoteQueue");
                quote = new Quote();
                quote.set("amountUsd", amountUsd);
                quote.set("status", "pending");
                quote.set("user", user);
                return [4 /*yield*/, quote.save(null, { useMasterKey: true })];
            case 1:
                _a.sent();
                return [2 /*return*/, quote.toJSON()];
        }
    });
}); });
Parse.Cloud.define("createOrder", function (request) { return __awaiter(_this, void 0, void 0, function () {
    var yachtId, user, Order_1, query, existingOrder, expiryDate, Order, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                yachtId = request.params.yachtId;
                user = request.user;
                Order_1 = Parse.Object.extend("Order");
                query = new Parse.Query(Order_1);
                query.notEqualTo("status", "settled");
                query.equalTo("user", user);
                return [4 /*yield*/, query.first()];
            case 1:
                existingOrder = _a.sent();
                // If exists, throw an error
                if (existingOrder) {
                    throw new Error("User already has an order in pending state");
                }
                expiryDate = new Date();
                expiryDate.setMinutes(expiryDate.getMinutes() + 15);
                Order = Parse.Object.extend("Order");
                order = new Order();
                order.set("yachtId", yachtId);
                order.set("status", "pending");
                order.set("quoteExpiryDate", expiryDate);
                order.set("user", user);
                return [4 /*yield*/, order.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, order.toJSON()];
        }
    });
}); });
