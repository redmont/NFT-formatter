Object.defineProperty(exports, "__esModule", {value: true});

var buffer = require("buffer");
var splToken = require("@solana/spl-token");
var web3_js = require("@solana/web3.js");
var Stream = require("stream");
var http = require("http");
var Url = require("url");
var https = require("https");
var zlib = require("zlib");

function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
}

var Stream__default = /*#__PURE__*/ _interopDefaultLegacy(Stream);
var http__default = /*#__PURE__*/ _interopDefaultLegacy(http);
var Url__default = /*#__PURE__*/ _interopDefaultLegacy(Url);
var https__default = /*#__PURE__*/ _interopDefaultLegacy(https);
var zlib__default = /*#__PURE__*/ _interopDefaultLegacy(zlib);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
    __assign =
        Object.assign ||
        function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P
            ? value
            : new P(function (resolve) {
                  resolve(value);
              });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = {
            label: 0,
            sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: [],
        },
        f,
        y,
        t,
        g;
    return (
        (g = {next: verb(0), throw: verb(1), return: verb(2)}),
        typeof Symbol === "function" &&
            (g[Symbol.iterator] = function () {
                return this;
            }),
        g
    );
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (
                    ((f = 1),
                    y &&
                        (t =
                            op[0] & 2
                                ? y["return"]
                                : op[0]
                                ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                : y.next) &&
                        !(t = t.call(y, op[1])).done)
                )
                    return t;
                if (((y = 0), t)) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return {value: op[1], done: false};
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (
                            !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                            (op[0] === 6 || op[0] === 2)
                        ) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];
                y = 0;
            } finally {
                f = t = 0;
            }
        if (op[0] & 5) throw op[1];
        return {value: op[0] ? op[1] : void 0, done: true};
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * extensions based on OpenSea metadata standards
 * https://docs.opensea.io/docs/metadata-standards
 */
var OPENSEA_AUDIO_EXTENSIONS = ["mp3", "wav", "oga"];
var OPENSEA_VIDEO_EXTENSIONS = ["gltf", "glb", "webm", "mp4", "m4v", "ogv", "ogg", "mov"];
var SUPPORTED_VIDEO_EXTENSIONS = ["webm", "mp4", "ogv", "ogg", "mov"];
var SUPPORTED_3D_EXTENSIONS = ["gltf", "glb"];
var NON_IMAGE_EXTENSIONS = __spreadArray(
    __spreadArray([], OPENSEA_VIDEO_EXTENSIONS, true),
    OPENSEA_AUDIO_EXTENSIONS,
    true
);
var NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
var isAssetImage = function (asset) {
    return [
        asset.image_url,
        asset.image_original_url,
        asset.image_preview_url,
        asset.image_thumbnail_url,
    ].some(function (url) {
        return (
            url &&
            NON_IMAGE_EXTENSIONS.every(function (ext) {
                return !url.endsWith(ext);
            })
        );
    });
};
var areUrlExtensionsSupportedForType = function (asset, extensions) {
    var animation_url = asset.animation_url,
        animation_original_url = asset.animation_original_url,
        image_url = asset.image_url,
        image_original_url = asset.image_original_url,
        image_preview_url = asset.image_preview_url,
        image_thumbnail_url = asset.image_thumbnail_url;
    return [
        animation_url || "",
        animation_original_url || "",
        image_url,
        image_original_url,
        image_preview_url,
        image_thumbnail_url,
    ].some(function (url) {
        return (
            url &&
            extensions.some(function (ext) {
                return url.endsWith(ext);
            })
        );
    });
};
var isAssetVideo = function (asset) {
    return areUrlExtensionsSupportedForType(asset, SUPPORTED_VIDEO_EXTENSIONS);
};
var isAssetThreeDAndIncludesImage = function (asset) {
    return areUrlExtensionsSupportedForType(asset, SUPPORTED_3D_EXTENSIONS) && isAssetImage(asset);
};
var isAssetGif = function (asset) {
    var _a, _b, _c, _d;
    return !!(
        ((_a = asset.image_url) === null || _a === void 0 ? void 0 : _a.endsWith(".gif")) ||
        ((_b = asset.image_original_url) === null || _b === void 0
            ? void 0
            : _b.endsWith(".gif")) ||
        ((_c = asset.image_preview_url) === null || _c === void 0 ? void 0 : _c.endsWith(".gif")) ||
        ((_d = asset.image_thumbnail_url) === null || _d === void 0 ? void 0 : _d.endsWith(".gif"))
    );
};
var isAssetValid = function (asset) {
    return (
        isAssetGif(asset) ||
        isAssetThreeDAndIncludesImage(asset) ||
        isAssetVideo(asset) ||
        isAssetImage(asset)
    );
};
/**
 * Returns a collectible given an asset object from the OpenSea API
 *
 * A lot of the work here is to determine whether a collectible is a gif, a video, or an image
 *
 * If the collectible is a gif, we set the gifUrl, and we process a frame from the gifUrl which we set as its frameUrl
 *
 * If the collectible is a video, we set the videoUrl, and we check whether the asset has an image
 * - if it has an image, we check whether the image url is an actual image or a video (sometimes OpenSea returns
 *   videos in the image url properties of the asset)
 *   - if it's an image, we set it as the frameUrl
 *   - otherwise, we unset the frameUrl
 * - if not, we do not set the frameUrl
 * Video collectibles that do not have a frameUrl will use the video paused at the first frame as the thumbnail
 * in the collectibles tab
 *
 * Otherwise, we consider the collectible to be an image, we get the image url and make sure that it is not
 * a gif or a video
 * - if it's a gif, we follow the above gif logic
 * - if it's a video, we unset the frameUrl and follow the above video logic
 * - otherwise, we set the frameUrl and the imageUrl
 *
 * @param asset
 */
var assetToCollectible = function (asset) {
    return __awaiter(void 0, void 0, void 0, function () {
        var mediaType,
            frameUrl,
            imageUrl,
            videoUrl,
            threeDUrl,
            gifUrl,
            animation_url,
            animation_original_url,
            imageUrls,
            res,
            hasGifFrame,
            res,
            isVideo,
            isGif,
            res,
            isGif,
            isVideo,
            e_1;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    frameUrl = null;
                    imageUrl = null;
                    videoUrl = null;
                    threeDUrl = null;
                    gifUrl = null;
                    animation_url = asset.animation_url;
                    animation_original_url = asset.animation_original_url;
                    imageUrls = [
                        asset.image_url,
                        asset.image_original_url,
                        asset.image_preview_url,
                        asset.image_thumbnail_url,
                    ];
                    _o.label = 1;
                case 1:
                    _o.trys.push([1, 10, , 11]);
                    if (!isAssetGif(asset)) return [3 /*break*/, 2];
                    mediaType = "GIF";
                    // frame url for the gif is computed later in the collectibles page
                    frameUrl = null;
                    gifUrl = imageUrls.find(function (url) {
                        return url === null || url === void 0 ? void 0 : url.endsWith(".gif");
                    });
                    return [3 /*break*/, 9];
                case 2:
                    if (!isAssetThreeDAndIncludesImage(asset)) return [3 /*break*/, 4];
                    mediaType = "THREE_D";
                    threeDUrl = __spreadArray(
                        [animation_url, animation_original_url],
                        imageUrls,
                        true
                    ).find(function (url) {
                        return (
                            url &&
                            SUPPORTED_3D_EXTENSIONS.some(function (ext) {
                                return url.endsWith(ext);
                            })
                        );
                    });
                    frameUrl = imageUrls.find(function (url) {
                        return (
                            url &&
                            NON_IMAGE_EXTENSIONS.every(function (ext) {
                                return !url.endsWith(ext);
                            })
                        );
                    });
                    return [4 /*yield*/, fetch(frameUrl, {method: "HEAD"})];
                case 3:
                    res = _o.sent();
                    hasGifFrame =
                        (_a = res.headers.get("Content-Type")) === null || _a === void 0
                            ? void 0
                            : _a.includes("gif");
                    if (hasGifFrame) {
                        gifUrl = frameUrl;
                        // frame url for the gif is computed later in the collectibles page
                        frameUrl = null;
                    }
                    return [3 /*break*/, 9];
                case 4:
                    if (!isAssetVideo(asset)) return [3 /*break*/, 7];
                    mediaType = "VIDEO";
                    frameUrl =
                        (_b = imageUrls.find(function (url) {
                            return (
                                url &&
                                NON_IMAGE_EXTENSIONS.every(function (ext) {
                                    return !url.endsWith(ext);
                                })
                            );
                        })) !== null && _b !== void 0
                            ? _b
                            : null;
                    if (!frameUrl) return [3 /*break*/, 6];
                    return [4 /*yield*/, fetch(frameUrl, {method: "HEAD"})];
                case 5:
                    res = _o.sent();
                    isVideo =
                        (_c = res.headers.get("Content-Type")) === null || _c === void 0
                            ? void 0
                            : _c.includes("video");
                    isGif =
                        (_d = res.headers.get("Content-Type")) === null || _d === void 0
                            ? void 0
                            : _d.includes("gif");
                    if (isVideo || isGif) {
                        frameUrl = null;
                    }
                    _o.label = 6;
                case 6:
                    videoUrl = __spreadArray(
                        [animation_url, animation_original_url],
                        imageUrls,
                        true
                    ).find(function (url) {
                        return (
                            url &&
                            SUPPORTED_VIDEO_EXTENSIONS.some(function (ext) {
                                return url.endsWith(ext);
                            })
                        );
                    });
                    return [3 /*break*/, 9];
                case 7:
                    mediaType = "IMAGE";
                    frameUrl = imageUrls.find(function (url) {
                        return !!url;
                    });
                    return [4 /*yield*/, fetch(frameUrl, {method: "HEAD"})];
                case 8:
                    res = _o.sent();
                    isGif =
                        (_e = res.headers.get("Content-Type")) === null || _e === void 0
                            ? void 0
                            : _e.includes("gif");
                    isVideo =
                        (_f = res.headers.get("Content-Type")) === null || _f === void 0
                            ? void 0
                            : _f.includes("video");
                    if (isGif) {
                        mediaType = "GIF";
                        gifUrl = frameUrl;
                        // frame url for the gif is computed later in the collectibles page
                        frameUrl = null;
                    } else if (isVideo) {
                        mediaType = "VIDEO";
                        frameUrl = null;
                        videoUrl = imageUrls.find(function (url) {
                            return !!url;
                        });
                    } else {
                        imageUrl = imageUrls.find(function (url) {
                            return !!url;
                        });
                    }
                    _o.label = 9;
                case 9:
                    return [3 /*break*/, 11];
                case 10:
                    e_1 = _o.sent();
                    console.error("Error processing collectible", e_1);
                    mediaType = "IMAGE";
                    frameUrl = imageUrls.find(function (url) {
                        return !!url;
                    });
                    imageUrl = frameUrl;
                    return [3 /*break*/, 11];
                case 11:
                    return [
                        2 /*return*/,
                        {
                            id:
                                asset.token_id +
                                ":::" +
                                ((_h =
                                    (_g = asset.asset_contract) === null || _g === void 0
                                        ? void 0
                                        : _g.address) !== null && _h !== void 0
                                    ? _h
                                    : ""),
                            tokenId: asset.token_id,
                            name:
                                (_k =
                                    asset.name ||
                                    ((_j =
                                        asset === null || asset === void 0
                                            ? void 0
                                            : asset.asset_contract) === null || _j === void 0
                                        ? void 0
                                        : _j.name)) !== null && _k !== void 0
                                    ? _k
                                    : "",
                            description: asset.description,
                            mediaType: mediaType,
                            frameUrl: frameUrl,
                            imageUrl: imageUrl,
                            videoUrl: videoUrl,
                            threeDUrl: threeDUrl,
                            gifUrl: gifUrl,
                            isOwned: true,
                            dateCreated: null,
                            dateLastTransferred: null,
                            externalLink: asset.external_link,
                            permaLink: asset.permalink,
                            assetContractAddress:
                                (_m =
                                    (_l = asset.asset_contract) === null || _l === void 0
                                        ? void 0
                                        : _l.address) !== null && _m !== void 0
                                    ? _m
                                    : null,
                            chain: "eth",
                            wallet: asset.wallet,
                        },
                    ];
            }
        });
    });
};
var creationEventToCollectible = function (event) {
    return __awaiter(void 0, void 0, void 0, function () {
        var asset, created_date, collectible;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    asset = event.asset;
                    created_date = event.created_date;
                    return [4 /*yield*/, assetToCollectible(asset)];
                case 1:
                    collectible = _a.sent();
                    return [
                        2 /*return*/,
                        __assign(__assign({}, collectible), {
                            dateCreated: created_date,
                            isOwned: false,
                        }),
                    ];
            }
        });
    });
};
var transferEventToCollectible = function (event, isOwned) {
    if (isOwned === void 0) {
        isOwned = true;
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var asset, created_date, collectible;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    asset = event.asset;
                    created_date = event.created_date;
                    return [4 /*yield*/, assetToCollectible(asset)];
                case 1:
                    collectible = _a.sent();
                    return [
                        2 /*return*/,
                        __assign(__assign({}, collectible), {
                            isOwned: isOwned,
                            dateLastTransferred: created_date,
                        }),
                    ];
            }
        });
    });
};
var isFromNullAddress = function (event) {
    return event.from_account.address === NULL_ADDRESS;
};

var OPENSEA_API_URL = "https://api.opensea.io/api/v1";
var parseAssetEventResults = function (results, wallets) {
    return results
        .map(function (result, i) {
            return {result: result, wallet: wallets[i]};
        })
        .filter(function (_a) {
            var result = _a.result;
            return result.status === "fulfilled";
        })
        .map(function (_a) {
            var _b;
            var result = _a.result,
                wallet = _a.wallet;
            return (
                ((_b = result.value.asset_events) === null || _b === void 0
                    ? void 0
                    : _b.map(function (event) {
                          return __assign(__assign({}, event), {
                              asset: __assign(__assign({}, event.asset), {wallet: wallet}),
                              wallet: wallet,
                          });
                      })) || []
            );
        })
        .flat();
};
var parseAssetResults = function (results, wallets) {
    return results
        .map(function (result, i) {
            return {result: result, wallet: wallets[i]};
        })
        .filter(function (_a) {
            var result = _a.result;
            return result.status === "fulfilled";
        })
        .map(function (_a) {
            var _b;
            var result = _a.result,
                wallet = _a.wallet;
            return (
                ((_b = result.value.assets) === null || _b === void 0
                    ? void 0
                    : _b.map(function (asset) {
                          return __assign(__assign({}, asset), {wallet: wallet});
                      })) || []
            );
        })
        .flat();
};
var OpenSeaClient = /** @class */ (function () {
    function OpenSeaClient(props) {
        var _this = this;
        var _a, _b, _c, _d;
        this.url = OPENSEA_API_URL;
        this.apiKey = "";
        this.assetLimit = 50;
        this.eventLimit = 300;
        this.requestOptions = {};
        this.getTransferredCollectiblesForWallet = function (wallet, limit) {
            if (limit === void 0) {
                limit = _this.eventLimit;
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        fetch(
                            this.url +
                                "/events?account_address=" +
                                wallet +
                                "&limit=" +
                                limit +
                                "&event_type=transfer&only_opensea=false",
                            this.requestOptions
                        ).then(function (r) {
                            return r.json();
                        }),
                    ];
                });
            });
        };
        this.getTransferredCollectiblesForMultipleWallets = function (wallets, limit) {
            if (limit === void 0) {
                limit = _this.eventLimit;
            }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        Promise.allSettled(
                            wallets.map(function (wallet) {
                                return _this.getTransferredCollectiblesForWallet(wallet, limit);
                            })
                        ).then(function (results) {
                            return parseAssetEventResults(results, wallets);
                        }),
                    ];
                });
            });
        };
        this.getCreatedCollectiblesForWallet = function (wallet, limit) {
            if (limit === void 0) {
                limit = _this.eventLimit;
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        fetch(
                            this.url +
                                "/events?account_address=" +
                                wallet +
                                "&limit=" +
                                limit +
                                "&event_type=created&only_opensea=false",
                            this.requestOptions
                        ).then(function (r) {
                            return r.json();
                        }),
                    ];
                });
            });
        };
        this.getCreatedCollectiblesForMultipleWallets = function (wallets, limit) {
            if (limit === void 0) {
                limit = _this.eventLimit;
            }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        Promise.allSettled(
                            wallets.map(function (wallet) {
                                return _this.getCreatedCollectiblesForWallet(wallet, limit);
                            })
                        ).then(function (results) {
                            return parseAssetEventResults(results, wallets);
                        }),
                    ];
                });
            });
        };
        this.getCollectiblesForWallet = function (wallet, limit) {
            if (limit === void 0) {
                limit = _this.assetLimit;
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        fetch(
                            this.url + "/assets?owner=" + wallet + "&limit=" + limit,
                            this.requestOptions
                        ).then(function (r) {
                            return r.json();
                        }),
                    ];
                });
            });
        };
        this.getCollectiblesForMultipleWallets = function (wallets, limit) {
            if (limit === void 0) {
                limit = _this.assetLimit;
            }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        Promise.allSettled(
                            wallets.map(function (wallet) {
                                return _this.getCollectiblesForWallet(wallet, limit);
                            })
                        ).then(function (results) {
                            return parseAssetResults(results, wallets);
                        }),
                    ];
                });
            });
        };
        this.getAllCollectibles = function (wallets) {
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        Promise.all([
                            this.getCollectiblesForMultipleWallets(wallets),
                            this.getCreatedCollectiblesForMultipleWallets(wallets),
                            this.getTransferredCollectiblesForMultipleWallets(wallets),
                        ]).then(function (_a) {
                            var assets = _a[0],
                                creationEvents = _a[1],
                                transferEvents = _a[2];
                            return __awaiter(_this, void 0, void 0, function () {
                                var filteredAssets,
                                    collectibles,
                                    collectiblesMap,
                                    ownedCollectibleKeySet,
                                    firstOwnershipTransferEvents,
                                    latestTransferEventsMap;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            filteredAssets = assets.filter(function (asset) {
                                                return asset && isAssetValid(asset);
                                            });
                                            return [
                                                4 /*yield*/,
                                                Promise.all(
                                                    filteredAssets.map(function (asset) {
                                                        return __awaiter(
                                                            _this,
                                                            void 0,
                                                            void 0,
                                                            function () {
                                                                return __generator(
                                                                    this,
                                                                    function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                return [
                                                                                    4 /*yield*/,
                                                                                    assetToCollectible(
                                                                                        asset
                                                                                    ),
                                                                                ];
                                                                            case 1:
                                                                                return [
                                                                                    2 /*return*/,
                                                                                    _a.sent(),
                                                                                ];
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    })
                                                ),
                                            ];
                                        case 1:
                                            collectibles = _b.sent();
                                            collectiblesMap = collectibles.reduce(function (
                                                acc,
                                                curr
                                            ) {
                                                var _a;
                                                return __assign(
                                                    __assign({}, acc),
                                                    ((_a = {}), (_a[curr.id] = curr), _a)
                                                );
                                            },
                                            {});
                                            ownedCollectibleKeySet = new Set(
                                                Object.keys(collectiblesMap)
                                            );
                                            firstOwnershipTransferEvents = transferEvents
                                                .filter(function (event) {
                                                    return (
                                                        (event === null || event === void 0
                                                            ? void 0
                                                            : event.asset) &&
                                                        isAssetValid(event.asset) &&
                                                        isFromNullAddress(event)
                                                    );
                                                })
                                                .reduce(function (acc, curr) {
                                                    var _a;
                                                    var _b;
                                                    var _c = curr.asset,
                                                        token_id = _c.token_id,
                                                        asset_contract = _c.asset_contract;
                                                    var id =
                                                        token_id +
                                                        ":::" +
                                                        ((_b =
                                                            asset_contract === null ||
                                                            asset_contract === void 0
                                                                ? void 0
                                                                : asset_contract.address) !==
                                                            null && _b !== void 0
                                                            ? _b
                                                            : "");
                                                    if (
                                                        acc[id] &&
                                                        acc[id].created_date.localeCompare(
                                                            curr.created_date
                                                        ) > 0
                                                    ) {
                                                        return acc;
                                                    }
                                                    return __assign(
                                                        __assign({}, acc),
                                                        ((_a = {}), (_a[id] = curr), _a)
                                                    );
                                                }, {});
                                            return [
                                                4 /*yield*/,
                                                Promise.all(
                                                    Object.entries(
                                                        firstOwnershipTransferEvents
                                                    ).map(function (entry) {
                                                        return __awaiter(
                                                            _this,
                                                            void 0,
                                                            void 0,
                                                            function () {
                                                                var id, event, _a, _b;
                                                                return __generator(
                                                                    this,
                                                                    function (_c) {
                                                                        switch (_c.label) {
                                                                            case 0:
                                                                                id = entry[0];
                                                                                event = entry[1];
                                                                                if (
                                                                                    !ownedCollectibleKeySet.has(
                                                                                        id
                                                                                    )
                                                                                )
                                                                                    return [
                                                                                        3 /*break*/,
                                                                                        1,
                                                                                    ];
                                                                                collectiblesMap[
                                                                                    id
                                                                                ] = __assign(
                                                                                    __assign(
                                                                                        {},
                                                                                        collectiblesMap[
                                                                                            id
                                                                                        ]
                                                                                    ),
                                                                                    {
                                                                                        dateLastTransferred:
                                                                                            event.created_date,
                                                                                    }
                                                                                );
                                                                                return [
                                                                                    3 /*break*/, 3,
                                                                                ];
                                                                            case 1:
                                                                                ownedCollectibleKeySet.add(
                                                                                    id
                                                                                );
                                                                                _a =
                                                                                    collectiblesMap;
                                                                                _b = id;
                                                                                return [
                                                                                    4 /*yield*/,
                                                                                    transferEventToCollectible(
                                                                                        event,
                                                                                        false
                                                                                    ),
                                                                                ];
                                                                            case 2:
                                                                                _a[_b] = _c.sent();
                                                                                _c.label = 3;
                                                                            case 3:
                                                                                return [
                                                                                    2 /*return*/,
                                                                                    event,
                                                                                ];
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    })
                                                ),
                                                // Handle created events
                                            ];
                                        case 2:
                                            _b.sent();
                                            // Handle created events
                                            return [
                                                4 /*yield*/,
                                                Promise.all(
                                                    creationEvents
                                                        .filter(function (event) {
                                                            return (
                                                                (event === null || event === void 0
                                                                    ? void 0
                                                                    : event.asset) &&
                                                                isAssetValid(event.asset)
                                                            );
                                                        })
                                                        .map(function (event) {
                                                            return __awaiter(
                                                                _this,
                                                                void 0,
                                                                void 0,
                                                                function () {
                                                                    var _a,
                                                                        token_id,
                                                                        asset_contract,
                                                                        id,
                                                                        _b,
                                                                        _c;
                                                                    var _d;
                                                                    return __generator(
                                                                        this,
                                                                        function (_e) {
                                                                            switch (_e.label) {
                                                                                case 0:
                                                                                    _a =
                                                                                        event.asset;
                                                                                    token_id =
                                                                                        _a.token_id;
                                                                                    asset_contract =
                                                                                        _a.asset_contract;
                                                                                    id =
                                                                                        token_id +
                                                                                        ":::" +
                                                                                        ((_d =
                                                                                            asset_contract ===
                                                                                                null ||
                                                                                            asset_contract ===
                                                                                                void 0
                                                                                                ? void 0
                                                                                                : asset_contract.address) !==
                                                                                            null &&
                                                                                        _d !==
                                                                                            void 0
                                                                                            ? _d
                                                                                            : "");
                                                                                    if (
                                                                                        !!ownedCollectibleKeySet.has(
                                                                                            id
                                                                                        )
                                                                                    )
                                                                                        return [
                                                                                            3 /*break*/,
                                                                                            2,
                                                                                        ];
                                                                                    _b =
                                                                                        collectiblesMap;
                                                                                    _c = id;
                                                                                    return [
                                                                                        4 /*yield*/,
                                                                                        creationEventToCollectible(
                                                                                            event
                                                                                        ),
                                                                                    ];
                                                                                case 1:
                                                                                    _b[_c] =
                                                                                        _e.sent();
                                                                                    ownedCollectibleKeySet.add(
                                                                                        id
                                                                                    );
                                                                                    _e.label = 2;
                                                                                case 2:
                                                                                    return [
                                                                                        2 /*return*/,
                                                                                        event,
                                                                                    ];
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                        })
                                                ),
                                                // Handle transfers
                                            ];
                                        case 3:
                                            // Handle created events
                                            _b.sent();
                                            latestTransferEventsMap = transferEvents
                                                .filter(function (event) {
                                                    return (
                                                        (event === null || event === void 0
                                                            ? void 0
                                                            : event.asset) &&
                                                        isAssetValid(event.asset) &&
                                                        !isFromNullAddress(event)
                                                    );
                                                })
                                                .reduce(function (acc, curr) {
                                                    var _a;
                                                    var _b;
                                                    var _c = curr.asset,
                                                        token_id = _c.token_id,
                                                        asset_contract = _c.asset_contract;
                                                    var id =
                                                        token_id +
                                                        ":::" +
                                                        ((_b =
                                                            asset_contract === null ||
                                                            asset_contract === void 0
                                                                ? void 0
                                                                : asset_contract.address) !==
                                                            null && _b !== void 0
                                                            ? _b
                                                            : "");
                                                    if (
                                                        acc[id] &&
                                                        acc[id].created_date.localeCompare(
                                                            curr.created_date
                                                        ) > 0
                                                    ) {
                                                        return acc;
                                                    }
                                                    return __assign(
                                                        __assign({}, acc),
                                                        ((_a = {}), (_a[id] = curr), _a)
                                                    );
                                                }, {});
                                            return [
                                                4 /*yield*/,
                                                Promise.all(
                                                    Object.values(latestTransferEventsMap).map(
                                                        function (event) {
                                                            return __awaiter(
                                                                _this,
                                                                void 0,
                                                                void 0,
                                                                function () {
                                                                    var _a,
                                                                        token_id,
                                                                        asset_contract,
                                                                        id,
                                                                        _b,
                                                                        _c;
                                                                    var _d;
                                                                    return __generator(
                                                                        this,
                                                                        function (_e) {
                                                                            switch (_e.label) {
                                                                                case 0:
                                                                                    _a =
                                                                                        event.asset;
                                                                                    token_id =
                                                                                        _a.token_id;
                                                                                    asset_contract =
                                                                                        _a.asset_contract;
                                                                                    id =
                                                                                        token_id +
                                                                                        ":::" +
                                                                                        ((_d =
                                                                                            asset_contract ===
                                                                                                null ||
                                                                                            asset_contract ===
                                                                                                void 0
                                                                                                ? void 0
                                                                                                : asset_contract.address) !==
                                                                                            null &&
                                                                                        _d !==
                                                                                            void 0
                                                                                            ? _d
                                                                                            : "");
                                                                                    if (
                                                                                        !ownedCollectibleKeySet.has(
                                                                                            id
                                                                                        )
                                                                                    )
                                                                                        return [
                                                                                            3 /*break*/,
                                                                                            1,
                                                                                        ];
                                                                                    collectiblesMap[
                                                                                        id
                                                                                    ] = __assign(
                                                                                        __assign(
                                                                                            {},
                                                                                            collectiblesMap[
                                                                                                id
                                                                                            ]
                                                                                        ),
                                                                                        {
                                                                                            dateLastTransferred:
                                                                                                event.created_date,
                                                                                        }
                                                                                    );
                                                                                    return [
                                                                                        3 /*break*/,
                                                                                        3,
                                                                                    ];
                                                                                case 1:
                                                                                    if (
                                                                                        !wallets.includes(
                                                                                            event
                                                                                                .to_account
                                                                                                .address
                                                                                        )
                                                                                    )
                                                                                        return [
                                                                                            3 /*break*/,
                                                                                            3,
                                                                                        ];
                                                                                    ownedCollectibleKeySet.add(
                                                                                        id
                                                                                    );
                                                                                    _b =
                                                                                        collectiblesMap;
                                                                                    _c = id;
                                                                                    return [
                                                                                        4 /*yield*/,
                                                                                        transferEventToCollectible(
                                                                                            event
                                                                                        ),
                                                                                    ];
                                                                                case 2:
                                                                                    _b[_c] =
                                                                                        _e.sent();
                                                                                    _e.label = 3;
                                                                                case 3:
                                                                                    return [
                                                                                        2 /*return*/,
                                                                                        event,
                                                                                    ];
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    )
                                                ),
                                            ];
                                        case 4:
                                            _b.sent();
                                            return [
                                                2 /*return*/,
                                                Object.values(collectiblesMap).reduce(function (
                                                    result,
                                                    collectible
                                                ) {
                                                    var _a;
                                                    return __assign(
                                                        __assign({}, result),
                                                        ((_a = {}),
                                                        (_a[collectible.wallet] = (
                                                            result[collectible.wallet] || []
                                                        ).concat([collectible])),
                                                        _a)
                                                    );
                                                },
                                                {}),
                                            ];
                                    }
                                });
                            });
                        }),
                    ];
                });
            });
        };
        this.url =
            (_a = props === null || props === void 0 ? void 0 : props.apiEndpoint) !== null &&
            _a !== void 0
                ? _a
                : this.url;
        this.apiKey =
            (_b = props === null || props === void 0 ? void 0 : props.apiKey) !== null &&
            _b !== void 0
                ? _b
                : this.apiKey;
        this.assetLimit =
            (_c = props === null || props === void 0 ? void 0 : props.assetLimit) !== null &&
            _c !== void 0
                ? _c
                : this.assetLimit;
        this.eventLimit =
            (_d = props === null || props === void 0 ? void 0 : props.eventLimit) !== null &&
            _d !== void 0
                ? _d
                : this.eventLimit;
        if (this.apiKey) {
            this.requestOptions = {
                headers: new Headers({"X-API-KEY": this.apiKey}),
            };
        }
    }
    return OpenSeaClient;
})();

/**
 * NFT is a gif if it has a file with MIME type image/gif
 * if it's a gif, we compute an image frame from the gif
 */
var nftGif = function (nft) {
    return __awaiter(void 0, void 0, void 0, function () {
        var gifFile, url;
        var _a, _b;
        return __generator(this, function (_c) {
            gifFile = (
                (_b = (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !==
                    null && _b !== void 0
                    ? _b
                    : []
            ).find(function (file) {
                return typeof file === "object" && file.type === "image/gif";
            });
            if (gifFile) {
                url = gifFile.uri;
                return [
                    2 /*return*/,
                    {
                        collectibleMediaType: "GIF",
                        url: url,
                        frameUrl: null,
                    },
                ];
            }
            return [2 /*return*/, null];
        });
    });
};
/**
 * NFT is a 3D object if:
 * - its category is vr, or
 * - it has an animation url that ends in glb, or
 * - it has a file whose type is glb, or
 *
 * if the 3D has a poster/thumbnail, it would be:
 * - either in the image property, or
 * - the properties files with a type of image
 */
var nftThreeDWithFrame = function (nft) {
    return __awaiter(void 0, void 0, void 0, function () {
        var files, objFile, objUrl, is3DObject, frameUrl, imageFile, url;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            files =
                (_b = (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !==
                    null && _b !== void 0
                    ? _b
                    : [];
            objFile = files.find(function (file) {
                return typeof file === "object" && file.type.includes("glb");
            });
            objUrl = files.find(function (file) {
                return typeof file === "string" && file.endsWith("glb");
            });
            is3DObject =
                ((_c = nft.properties) === null || _c === void 0 ? void 0 : _c.category) === "vr" ||
                ((_d = nft.animation_url) === null || _d === void 0
                    ? void 0
                    : _d.endsWith("glb")) ||
                objFile ||
                objUrl;
            if (is3DObject) {
                frameUrl = void 0;
                if (!nft.image.endsWith("glb")) {
                    frameUrl = nft.image;
                } else {
                    imageFile =
                        files === null || files === void 0
                            ? void 0
                            : files.find(function (file) {
                                  return typeof file === "object" && file.type.includes("image");
                              });
                    if (imageFile) {
                        frameUrl = imageFile.uri;
                    }
                }
                if (frameUrl) {
                    url = void 0;
                    if (nft.animation_url && nft.animation_url.endsWith("glb")) {
                        url = nft.animation_url;
                    } else if (objFile) {
                        url = objFile.uri;
                    } else if (objUrl) {
                        url = objUrl;
                    } else {
                        return [2 /*return*/, null];
                    }
                    return [
                        2 /*return*/,
                        {
                            collectibleMediaType: "THREE_D",
                            url: url,
                            frameUrl: frameUrl,
                        },
                    ];
                }
            }
            return [2 /*return*/, null];
        });
    });
};
/**
 * NFT is a video if:
 * - its category is video, or
 * - it has an animation url that does not end in glb, or
 * - it has a file whose type is video, or
 * - it has a file whose url includes watch.videodelivery.net
 *
 * if the video has a poster/thumbnail, it would be in the image property
 * otherwise, we later use the first video frame as the thumbnail
 */
var nftVideo = function (nft) {
    return __awaiter(void 0, void 0, void 0, function () {
        var files, videoFile, videoUrl, isVideo, url;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            files =
                (_b = (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !==
                    null && _b !== void 0
                    ? _b
                    : [];
            videoFile = files.find(function (file) {
                return (
                    typeof file === "object" &&
                    file.type.includes("video") &&
                    !file.type.endsWith("glb")
                );
            });
            videoUrl = files.find(function (file) {
                return (
                    typeof file === "string" &&
                    // https://github.com/metaplex-foundation/metaplex/blob/397ceff70b3524aa0543540584c7200c79b198a0/js/packages/web/src/components/ArtContent/index.tsx#L107
                    file.startsWith("https://watch.videodelivery.net/")
                );
            });
            isVideo =
                ((_c = nft.properties) === null || _c === void 0 ? void 0 : _c.category) ===
                    "video" ||
                (nft.animation_url && !nft.animation_url.endsWith("glb")) ||
                videoFile ||
                videoUrl;
            if (isVideo) {
                url = void 0;
                if (nft.animation_url && !nft.animation_url.endsWith("glb")) {
                    url = nft.animation_url;
                } else if (videoFile) {
                    url = videoFile.uri;
                } else if (videoUrl) {
                    url = videoUrl;
                } else if (files.length) {
                    // if there is only one file, then that's the video
                    // otherwise, the second file is the video (the other files are image/audio files)
                    // https://github.com/metaplex-foundation/metaplex/blob/397ceff70b3524aa0543540584c7200c79b198a0/js/packages/web/src/components/ArtContent/index.tsx#L103
                    if (files.length === 1) {
                        url = typeof files[0] === "object" ? files[0].uri : files[0];
                    } else {
                        url = typeof files[1] === "object" ? files[1].uri : files[1];
                    }
                } else {
                    return [2 /*return*/, null];
                }
                return [
                    2 /*return*/,
                    {
                        collectibleMediaType: "VIDEO",
                        url: url,
                        frameUrl: nft.image || null,
                    },
                ];
            }
            return [2 /*return*/, null];
        });
    });
};
/**
 * NFT is an image if:
 * - its category is image, or
 * - it has a file whose type is image, or
 * - it has an image property
 */
var nftImage = function (nft) {
    return __awaiter(void 0, void 0, void 0, function () {
        var files, imageFile, isImage, url;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            files =
                (_b = (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !==
                    null && _b !== void 0
                    ? _b
                    : [];
            imageFile = files.find(function (file) {
                return typeof file === "object" && file.type.includes("image");
            });
            isImage =
                ((_c = nft.properties) === null || _c === void 0 ? void 0 : _c.category) ===
                    "image" ||
                nft.image.length ||
                imageFile;
            if (isImage) {
                url = void 0;
                if (nft.image.length) {
                    url = nft.image;
                } else if (imageFile) {
                    url = imageFile.uri;
                } else if (files.length) {
                    if (files.length === 1) {
                        url = typeof files[0] === "object" ? files[0].uri : files[0];
                    } else {
                        url = typeof files[1] === "object" ? files[1].uri : files[1];
                    }
                } else {
                    return [2 /*return*/, null];
                }
                return [
                    2 /*return*/,
                    {
                        collectibleMediaType: "IMAGE",
                        url: url,
                        frameUrl: url,
                    },
                ];
            }
            return [2 /*return*/, null];
        });
    });
};
/**
 * If not easily discoverable tha nft is gif/video/image, we check whether it has files
 * if it does not, then we discard the nft
 * otherwise, we fetch the content type of the first file and check its MIME type:
 * - if gif, we also compute an image frame from it
 * - if video, we later use the first video frame as the thumbnail
 * - if image, the image url is also the frame url
 */
var nftComputedMedia = function (nft) {
    return __awaiter(void 0, void 0, void 0, function () {
        var files, url, headResponse, contentType;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    files =
                        (_b =
                            (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !==
                            null && _b !== void 0
                            ? _b
                            : [];
                    if (!files.length) {
                        return [2 /*return*/, null];
                    }
                    url = typeof files[0] === "object" ? files[0].uri : files[0];
                    return [4 /*yield*/, fetch(url, {method: "HEAD"})];
                case 1:
                    headResponse = _c.sent();
                    contentType = headResponse.headers.get("Content-Type");
                    if (
                        contentType === null || contentType === void 0
                            ? void 0
                            : contentType.includes("gif")
                    ) {
                        // frame url for the gif is computed later in the collectibles page
                        return [
                            2 /*return*/,
                            {
                                collectibleMediaType: "GIF",
                                url: url,
                                frameUrl: null,
                            },
                        ];
                    }
                    if (
                        contentType === null || contentType === void 0
                            ? void 0
                            : contentType.includes("video")
                    ) {
                        return [
                            2 /*return*/,
                            {
                                collectibleMediaType: "VIDEO",
                                url: url,
                                frameUrl: null,
                            },
                        ];
                    }
                    if (
                        contentType === null || contentType === void 0
                            ? void 0
                            : contentType.includes("image")
                    ) {
                        return [
                            2 /*return*/,
                            {
                                collectibleMediaType: "IMAGE",
                                url: url,
                                frameUrl: url,
                            },
                        ];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
};
var metaplexNFTToCollectible = function (nft, address) {
    return __awaiter(void 0, void 0, void 0, function () {
        var identifier, collectible, _a, url, frameUrl, collectibleMediaType, _b, _c, _d, _e;
        var _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    identifier = [nft.symbol, nft.name, nft.image].filter(Boolean).join(":::");
                    collectible = {
                        id: identifier,
                        tokenId: identifier,
                        name: nft.name,
                        description: nft.description,
                        externalLink: nft.external_url,
                        isOwned: true,
                        chain: "sol",
                    };
                    if (
                        ((_g =
                            (_f = nft.properties) === null || _f === void 0
                                ? void 0
                                : _f.creators) !== null && _g !== void 0
                            ? _g
                            : []
                        ).some(function (creator) {
                            return creator.address === address;
                        })
                    ) {
                        collectible.isOwned = false;
                    }
                    return [4 /*yield*/, nftGif(nft)];
                case 1:
                    _e = _h.sent();
                    if (_e) return [3 /*break*/, 3];
                    return [4 /*yield*/, nftThreeDWithFrame(nft)];
                case 2:
                    _e = _h.sent();
                    _h.label = 3;
                case 3:
                    _d = _e;
                    if (_d) return [3 /*break*/, 5];
                    return [4 /*yield*/, nftVideo(nft)];
                case 4:
                    _d = _h.sent();
                    _h.label = 5;
                case 5:
                    _c = _d;
                    if (_c) return [3 /*break*/, 7];
                    return [4 /*yield*/, nftImage(nft)];
                case 6:
                    _c = _h.sent();
                    _h.label = 7;
                case 7:
                    _b = _c;
                    if (_b) return [3 /*break*/, 9];
                    return [4 /*yield*/, nftComputedMedia(nft)];
                case 8:
                    _b = _h.sent();
                    _h.label = 9;
                case 9:
                    _a = _b;
                    url = _a.url;
                    frameUrl = _a.frameUrl;
                    collectibleMediaType = _a.collectibleMediaType;
                    collectible.frameUrl = frameUrl;
                    collectible.mediaType = collectibleMediaType;
                    if (collectibleMediaType === "GIF") {
                        collectible.gifUrl = url;
                    } else if (collectibleMediaType === "THREE_D") {
                        collectible.threeDUrl = url;
                    } else if (collectibleMediaType === "VIDEO") {
                        collectible.videoUrl = url;
                    } else if (collectibleMediaType === "IMAGE") {
                        collectible.imageUrl = url;
                    }
                    return [2 /*return*/, collectible];
            }
        });
    });
};
var starAtlasNFTToCollectible = function (nft) {
    return __awaiter(void 0, void 0, void 0, function () {
        var identifier, collectible, is3DObj, hasImageFrame;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            identifier = [nft._id, nft.symbol, nft.name, nft.image].filter(Boolean).join(":::");
            collectible = {
                id: identifier,
                tokenId: nft._id,
                name: nft.name,
                description: nft.description,
                isOwned: true,
                chain: "sol",
            };
            is3DObj = [
                nft.image,
                (_a = nft.media) === null || _a === void 0 ? void 0 : _a.thumbnailUrl,
            ]
                .filter(Boolean)
                .some(function (item) {
                    return ["glb", "gltf"].some(function (extension) {
                        return item.endsWith(extension);
                    });
                });
            hasImageFrame = [
                nft.image,
                (_b = nft.media) === null || _b === void 0 ? void 0 : _b.thumbnailUrl,
            ]
                .filter(Boolean)
                .some(function (item) {
                    return ["glb", "gltf"].every(function (extension) {
                        return !item.endsWith(extension);
                    });
                });
            if (is3DObj && hasImageFrame) {
                collectible.mediaType = "THREE_D";
                collectible.threeDUrl = ["glb", "gltf"].some(function (extension) {
                    return nft.image.endsWith(extension);
                })
                    ? nft.image
                    : (_c = nft.media) === null || _c === void 0
                    ? void 0
                    : _c.thumbnailUrl;
                collectible.frameUrl = ["glb", "gltf"].every(function (extension) {
                    return !nft.image.endsWith(extension);
                })
                    ? nft.image
                    : (_d = nft.media) === null || _d === void 0
                    ? void 0
                    : _d.thumbnailUrl;
            } else {
                collectible.mediaType = "IMAGE";
                collectible.imageUrl = nft.image;
                collectible.frameUrl = (
                    (_f = (_e = nft.media) === null || _e === void 0 ? void 0 : _e.thumbnailUrl) ===
                        null || _f === void 0
                        ? void 0
                        : _f.length
                )
                    ? nft.media.thumbnailUrl
                    : nft.image;
            }
            collectible.dateCreated = nft.createdAt;
            return [2 /*return*/, collectible];
        });
    });
};
var solanaNFTToCollectible = function (nft, address, type) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (type) {
                case "METAPLEX":
                    return [2 /*return*/, metaplexNFTToCollectible(nft, address)];
                case "STAR_ATLAS":
                    return [2 /*return*/, starAtlasNFTToCollectible(nft)];
                default:
                    return [2 /*return*/, null];
            }
        });
    });
};

var SOLANA_CLUSTER_ENDPOINT = "https://api.mainnet-beta.solana.com";
var METADATA_PROGRAM_ID_PUBLIC_KEY = new web3_js.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
var SolanaClient = /** @class */ (function () {
    function SolanaClient(props) {
        var _this = this;
        var _a;
        this.endpoint = SOLANA_CLUSTER_ENDPOINT;
        this.connection = null;
        /**
         * for each given wallet:
         * - get and parse its token accounts to get the mint addresses
         * - filter out tokens whose decimal places are not 0
         * - find the metadata PDAs for the mint addresses
         * - get the account infos for the PDAs if they exist
         * - get the metadata urls from the account infos and fetch the metadatas
         * - transform the nft metadatas to Audius-domain collectibles
         */
        this.getAllCollectibles = function (wallets) {
            return __awaiter(_this, void 0, void 0, function () {
                var connection_1,
                    tokenAccountsByOwnerAddress,
                    potentialNFTsByOwnerAddress,
                    nfts,
                    solanaCollectibles,
                    e_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            if (this.connection === null) throw new Error("No connection");
                            connection_1 = this.connection;
                            return [
                                4 /*yield*/,
                                Promise.all(
                                    wallets.map(function (address) {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                return [
                                                    2 /*return*/,
                                                    connection_1.getParsedTokenAccountsByOwner(
                                                        new web3_js.PublicKey(address),
                                                        {
                                                            programId: splToken.TOKEN_PROGRAM_ID,
                                                        }
                                                    ),
                                                ];
                                            });
                                        });
                                    })
                                ),
                            ];
                        case 1:
                            tokenAccountsByOwnerAddress = _a.sent();
                            potentialNFTsByOwnerAddress = tokenAccountsByOwnerAddress
                                .map(function (ta) {
                                    return ta.value;
                                })
                                // value is an array of parsed token info
                                .map(function (value) {
                                    var mintAddresses = value
                                        .map(function (v) {
                                            return {
                                                mint: v.account.data.parsed.info.mint,
                                                tokenAmount: v.account.data.parsed.info.tokenAmount,
                                            };
                                        })
                                        .filter(function (_a) {
                                            var tokenAmount = _a.tokenAmount;
                                            // Filter out the token if we don't have any balance
                                            var ownsNFT = tokenAmount.amount !== "0";
                                            // Filter out the tokens that don't have 0 decimal places.
                                            // NFTs really should have 0
                                            var hasNoDecimals = tokenAmount.decimals === 0;
                                            return ownsNFT && hasNoDecimals;
                                        })
                                        .map(function (_a) {
                                            var mint = _a.mint;
                                            return mint;
                                        });
                                    return {mintAddresses: mintAddresses};
                                });
                            return [
                                4 /*yield*/,
                                Promise.all(
                                    potentialNFTsByOwnerAddress.map(function (_a) {
                                        var mintAddresses = _a.mintAddresses;
                                        return __awaiter(_this, void 0, void 0, function () {
                                            var programAddresses,
                                                accountInfos,
                                                nonNullInfos,
                                                metadataUrls,
                                                results,
                                                metadatas;
                                            var _this = this;
                                            var _b;
                                            return __generator(this, function (_c) {
                                                switch (_c.label) {
                                                    case 0:
                                                        return [
                                                            4 /*yield*/,
                                                            Promise.all(
                                                                mintAddresses.map(function (
                                                                    mintAddress
                                                                ) {
                                                                    return __awaiter(
                                                                        _this,
                                                                        void 0,
                                                                        void 0,
                                                                        function () {
                                                                            return __generator(
                                                                                this,
                                                                                function (_a) {
                                                                                    switch (
                                                                                        _a.label
                                                                                    ) {
                                                                                        case 0:
                                                                                            return [
                                                                                                4 /*yield*/,
                                                                                                web3_js.PublicKey.findProgramAddress(
                                                                                                    [
                                                                                                        buffer.Buffer.from(
                                                                                                            "metadata"
                                                                                                        ),
                                                                                                        METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
                                                                                                        new web3_js.PublicKey(
                                                                                                            mintAddress
                                                                                                        ).toBytes(),
                                                                                                    ],
                                                                                                    METADATA_PROGRAM_ID_PUBLIC_KEY
                                                                                                ),
                                                                                            ];
                                                                                        case 1:
                                                                                            return [
                                                                                                2 /*return*/,
                                                                                                _a.sent()[0],
                                                                                            ];
                                                                                    }
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                })
                                                            ),
                                                        ];
                                                    case 1:
                                                        programAddresses = _c.sent();
                                                        return [
                                                            4 /*yield*/,
                                                            connection_1.getMultipleAccountsInfo(
                                                                programAddresses
                                                            ),
                                                        ];
                                                    case 2:
                                                        accountInfos = _c.sent();
                                                        nonNullInfos =
                                                            (_b =
                                                                accountInfos === null ||
                                                                accountInfos === void 0
                                                                    ? void 0
                                                                    : accountInfos.filter(
                                                                          Boolean
                                                                      )) !== null && _b !== void 0
                                                                ? _b
                                                                : [];
                                                        metadataUrls = nonNullInfos
                                                            .map(function (x) {
                                                                return _this._utf8ArrayToNFTType(
                                                                    x.data
                                                                );
                                                            })
                                                            .filter(Boolean);
                                                        return [
                                                            4 /*yield*/,
                                                            Promise.all(
                                                                metadataUrls.map(function (item) {
                                                                    return __awaiter(
                                                                        _this,
                                                                        void 0,
                                                                        void 0,
                                                                        function () {
                                                                            return __generator(
                                                                                this,
                                                                                function (_a) {
                                                                                    return [
                                                                                        2 /*return*/,
                                                                                        fetch(
                                                                                            item.url
                                                                                        )
                                                                                            .then(
                                                                                                function (
                                                                                                    res
                                                                                                ) {
                                                                                                    return res.json();
                                                                                                }
                                                                                            )
                                                                                            .catch(
                                                                                                function () {
                                                                                                    return null;
                                                                                                }
                                                                                            ),
                                                                                    ];
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                })
                                                            ),
                                                        ];
                                                    case 3:
                                                        results = _c.sent();
                                                        metadatas = results
                                                            .filter(Boolean)
                                                            .map(function (metadata, i) {
                                                                return {
                                                                    metadata: metadata,
                                                                    type: metadataUrls[i].type,
                                                                };
                                                            });
                                                        return [
                                                            2 /*return*/,
                                                            metadatas.filter(function (r) {
                                                                return !!r.metadata;
                                                            }),
                                                        ];
                                                }
                                            });
                                        });
                                    })
                                ),
                            ];
                        case 2:
                            nfts = _a.sent();
                            return [
                                4 /*yield*/,
                                Promise.all(
                                    nfts.map(function (nftsForAddress, i) {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            var collectibles;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        return [
                                                            4 /*yield*/,
                                                            Promise.all(
                                                                nftsForAddress.map(function (nft) {
                                                                    return __awaiter(
                                                                        _this,
                                                                        void 0,
                                                                        void 0,
                                                                        function () {
                                                                            return __generator(
                                                                                this,
                                                                                function (_a) {
                                                                                    switch (
                                                                                        _a.label
                                                                                    ) {
                                                                                        case 0:
                                                                                            return [
                                                                                                4 /*yield*/,
                                                                                                solanaNFTToCollectible(
                                                                                                    nft.metadata,
                                                                                                    wallets[
                                                                                                        i
                                                                                                    ],
                                                                                                    nft.type
                                                                                                ),
                                                                                            ];
                                                                                        case 1:
                                                                                            return [
                                                                                                2 /*return*/,
                                                                                                _a.sent(),
                                                                                            ];
                                                                                    }
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                })
                                                            ),
                                                        ];
                                                    case 1:
                                                        collectibles = _a.sent();
                                                        return [
                                                            2 /*return*/,
                                                            collectibles.filter(Boolean),
                                                        ];
                                                }
                                            });
                                        });
                                    })
                                ),
                            ];
                        case 3:
                            solanaCollectibles = _a.sent();
                            return [
                                2 /*return*/,
                                solanaCollectibles.reduce(function (result, collectibles, i) {
                                    var _a;
                                    return __assign(
                                        __assign({}, result),
                                        ((_a = {}), (_a[wallets[i]] = collectibles), _a)
                                    );
                                }, {}),
                            ];
                        case 4:
                            e_1 = _a.sent();
                            console.error("Unable to get collectibles", e_1);
                            return [2 /*return*/, Promise.resolve({})];
                        case 5:
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Decode bytes to get url for nft metadata
         * Check urls based on nft standard e.g. metaplex, or nft collection e.g. solamander, or known domains e.g. ipfs
         * This is because there may be multiple different collections of nfts on e.g. metaplex (arweave), also
         * a given nft collection can have nfts living in different domains e.g. solamander on cloudfront or arweave or etc., also
         * nfts may live in ipfs or other places
         */
        this._utf8ArrayToNFTType = function (array) {
            var text = new TextDecoder().decode(array);
            // for the sake of simplicty/readability/understandability, we check the decoded url
            // one by one against metaplex, star atlas, and others
            return (
                _this._metaplex(text) ||
                _this._starAtlas(text) ||
                _this._jsonExtension(text) ||
                _this._ipfs(text)
            );
        };
        this._metaplex = function (text) {
            var query = "https://";
            var startIndex = text.indexOf(query);
            if (startIndex === -1) return null;
            // metaplex standard nfts live in arweave, see link below
            // https://github.com/metaplex-foundation/metaplex/blob/81023eb3e52c31b605e1dcf2eb1e7425153600cd/js/packages/web/src/contexts/meta/processMetaData.ts#L29
            var isMetaplex = text.includes("arweave");
            var foundNFTUrl = startIndex > -1 && isMetaplex;
            if (!foundNFTUrl) return null;
            var suffix = "/";
            var suffixIndex = text.indexOf(suffix, startIndex + query.length);
            if (suffixIndex === -1) return null;
            var hashLength = 43;
            var endIndex = suffixIndex + suffix.length + hashLength;
            var url = text.substring(startIndex, endIndex);
            return {
                type: "METAPLEX",
                url: url,
            };
        };
        this._starAtlas = function (text) {
            var query = "https://";
            var startIndex = text.indexOf(query);
            if (startIndex === -1) return null;
            // star atlas nfts live in https://galaxy.staratlas.com/nfts/...
            var isStarAtlas = text.includes("staratlas");
            var foundNFTUrl = startIndex > -1 && isStarAtlas;
            if (!foundNFTUrl) return null;
            var suffix = "/nfts/";
            var suffixIndex = text.indexOf(suffix, startIndex + query.length);
            if (suffixIndex === -1) return null;
            var hashLength = 44;
            var endIndex = suffixIndex + suffix.length + hashLength;
            var url = text.substring(startIndex, endIndex);
            return {
                type: "STAR_ATLAS",
                url: url,
            };
        };
        this._jsonExtension = function (text) {
            // Look for 'https://<...>.json' and that will be the metadata location
            // examples:
            // https://d1b6hed00dtfsr.cloudfront.net/9086.json
            // https://cdn.piggygang.com/meta/3ad355d46a9cb2ee57049db4df57088f.json
            var query = "https://";
            var startIndex = text.indexOf(query);
            if (startIndex === -1) return null;
            var extension = ".json";
            var extensionIndex = text.indexOf(extension);
            var foundNFTUrl = startIndex > -1 && extensionIndex > -1;
            if (!foundNFTUrl) return null;
            var endIndex = extensionIndex + extension.length;
            var url = text.substring(startIndex, endIndex);
            return {
                type: "METAPLEX",
                url: url,
            };
        };
        this._ipfs = function (text) {
            // Look for 'https://ipfs.io/ipfs/<...alphanumeric...>' and that will be the metadata location
            // e.g. https://ipfs.io/ipfs/QmWJC47JYuvxYw63cRq81bBNGFXPjhQH8nXg71W5JeRMrC
            var query = "https://";
            var startIndex = text.indexOf(query);
            if (startIndex === -1) return null;
            var isIpfs = text.includes("ipfs");
            var foundNFTUrl = startIndex > -1 && isIpfs;
            if (!foundNFTUrl) return null;
            var suffix = "/ipfs/";
            var suffixIndex = text.indexOf(suffix, startIndex + query.length);
            if (suffixIndex === -1) return null;
            var endIndex = suffixIndex + suffix.length;
            while (/[a-zA-Z0-9]/.test(text.charAt(endIndex++))) {}
            var url = text.substring(startIndex, endIndex);
            return {
                type: "METAPLEX",
                url: url,
            };
        };
        this.endpoint =
            (_a = props === null || props === void 0 ? void 0 : props.rpcEndpoint) !== null &&
            _a !== void 0
                ? _a
                : this.endpoint;
        try {
            this.connection = new web3_js.Connection(this.endpoint, "confirmed");
        } catch (e) {
            console.error("Could not create Solana RPC connection", e);
            this.connection = null;
        }
    }
    return SolanaClient;
})();

var commonjsGlobal =
    typeof globalThis !== "undefined"
        ? globalThis
        : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
        ? self
        : {};

function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var a = Object.defineProperty({}, "__esModule", {value: true});
    Object.keys(n).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(n, k);
        Object.defineProperty(
            a,
            k,
            d.get
                ? d
                : {
                      enumerable: true,
                      get: function () {
                          return n[k];
                      },
                  }
        );
    });
    return a;
}

var nodePonyfill = {exports: {}};

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream__default["default"].Readable;

const BUFFER = Symbol("buffer");
const TYPE = Symbol("type");

class Blob {
    constructor() {
        this[TYPE] = "";

        const blobParts = arguments[0];
        const options = arguments[1];

        const buffers = [];
        let size = 0;

        if (blobParts) {
            const a = blobParts;
            const length = Number(a.length);
            for (let i = 0; i < length; i++) {
                const element = a[i];
                let buffer;
                if (element instanceof Buffer) {
                    buffer = element;
                } else if (ArrayBuffer.isView(element)) {
                    buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
                } else if (element instanceof ArrayBuffer) {
                    buffer = Buffer.from(element);
                } else if (element instanceof Blob) {
                    buffer = element[BUFFER];
                } else {
                    buffer = Buffer.from(typeof element === "string" ? element : String(element));
                }
                size += buffer.length;
                buffers.push(buffer);
            }
        }

        this[BUFFER] = Buffer.concat(buffers);

        let type = options && options.type !== undefined && String(options.type).toLowerCase();
        if (type && !/[^\u0020-\u007E]/.test(type)) {
            this[TYPE] = type;
        }
    }
    get size() {
        return this[BUFFER].length;
    }
    get type() {
        return this[TYPE];
    }
    text() {
        return Promise.resolve(this[BUFFER].toString());
    }
    arrayBuffer() {
        const buf = this[BUFFER];
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        return Promise.resolve(ab);
    }
    stream() {
        const readable = new Readable();
        readable._read = function () {};
        readable.push(this[BUFFER]);
        readable.push(null);
        return readable;
    }
    toString() {
        return "[object Blob]";
    }
    slice() {
        const size = this.size;

        const start = arguments[0];
        const end = arguments[1];
        let relativeStart, relativeEnd;
        if (start === undefined) {
            relativeStart = 0;
        } else if (start < 0) {
            relativeStart = Math.max(size + start, 0);
        } else {
            relativeStart = Math.min(start, size);
        }
        if (end === undefined) {
            relativeEnd = size;
        } else if (end < 0) {
            relativeEnd = Math.max(size + end, 0);
        } else {
            relativeEnd = Math.min(end, size);
        }
        const span = Math.max(relativeEnd - relativeStart, 0);

        const buffer = this[BUFFER];
        const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        const blob = new Blob([], {type: arguments[2]});
        blob[BUFFER] = slicedBuffer;
        return blob;
    }
}

Object.defineProperties(Blob.prototype, {
    size: {enumerable: true},
    type: {enumerable: true},
    slice: {enumerable: true},
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    value: "Blob",
    writable: false,
    enumerable: false,
    configurable: true,
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
    Error.call(this, message);

    this.message = message;
    this.type = type;

    // when err.type is `system`, err.code contains system error code
    if (systemError) {
        this.code = this.errno = systemError.code;
    }

    // hide custom error implementation details from end-users
    Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = "FetchError";

let convert;
try {
    convert = require("encoding").convert;
} catch (e) {}

const INTERNALS = Symbol("Body internals");

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream__default["default"].PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
    var _this = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$size = _ref.size;

    let size = _ref$size === undefined ? 0 : _ref$size;
    var _ref$timeout = _ref.timeout;
    let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

    if (body == null) {
        // body is undefined or null
        body = null;
    } else if (isURLSearchParams(body)) {
        // body is a URLSearchParams
        body = Buffer.from(body.toString());
    } else if (isBlob(body));
    else if (Buffer.isBuffer(body));
    else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        // body is ArrayBuffer
        body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
        // body is ArrayBufferView
        body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream__default["default"]);
    else {
        // none of the above
        // coerce to string then buffer
        body = Buffer.from(String(body));
    }
    this[INTERNALS] = {
        body,
        disturbed: false,
        error: null,
    };
    this.size = size;
    this.timeout = timeout;

    if (body instanceof Stream__default["default"]) {
        body.on("error", function (err) {
            const error =
                err.name === "AbortError"
                    ? err
                    : new FetchError(
                          `Invalid response body while trying to fetch ${_this.url}: ${err.message}`,
                          "system",
                          err
                      );
            _this[INTERNALS].error = error;
        });
    }
}

Body.prototype = {
    get body() {
        return this[INTERNALS].body;
    },

    get bodyUsed() {
        return this[INTERNALS].disturbed;
    },

    /**
     * Decode response as ArrayBuffer
     *
     * @return  Promise
     */
    arrayBuffer() {
        return consumeBody.call(this).then(function (buf) {
            return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        });
    },

    /**
     * Return raw response as Blob
     *
     * @return Promise
     */
    blob() {
        let ct = (this.headers && this.headers.get("content-type")) || "";
        return consumeBody.call(this).then(function (buf) {
            return Object.assign(
                // Prevent copying
                new Blob([], {
                    type: ct.toLowerCase(),
                }),
                {
                    [BUFFER]: buf,
                }
            );
        });
    },

    /**
     * Decode response as json
     *
     * @return  Promise
     */
    json() {
        var _this2 = this;

        return consumeBody.call(this).then(function (buffer) {
            try {
                return JSON.parse(buffer.toString());
            } catch (err) {
                return Body.Promise.reject(
                    new FetchError(
                        `invalid json response body at ${_this2.url} reason: ${err.message}`,
                        "invalid-json"
                    )
                );
            }
        });
    },

    /**
     * Decode response as text
     *
     * @return  Promise
     */
    text() {
        return consumeBody.call(this).then(function (buffer) {
            return buffer.toString();
        });
    },

    /**
     * Decode response as buffer (non-spec api)
     *
     * @return  Promise
     */
    buffer() {
        return consumeBody.call(this);
    },

    /**
     * Decode response as text, while automatically detecting the encoding and
     * trying to decode to UTF-8 (non-spec api)
     *
     * @return  Promise
     */
    textConverted() {
        var _this3 = this;

        return consumeBody.call(this).then(function (buffer) {
            return convertBody(buffer, _this3.headers);
        });
    },
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
    body: {enumerable: true},
    bodyUsed: {enumerable: true},
    arrayBuffer: {enumerable: true},
    blob: {enumerable: true},
    json: {enumerable: true},
    text: {enumerable: true},
});

Body.mixIn = function (proto) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)) {
        // istanbul ignore else: future proof
        if (!(name in proto)) {
            const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
            Object.defineProperty(proto, name, desc);
        }
    }
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
    var _this4 = this;

    if (this[INTERNALS].disturbed) {
        return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
    }

    this[INTERNALS].disturbed = true;

    if (this[INTERNALS].error) {
        return Body.Promise.reject(this[INTERNALS].error);
    }

    let body = this.body;

    // body is null
    if (body === null) {
        return Body.Promise.resolve(Buffer.alloc(0));
    }

    // body is blob
    if (isBlob(body)) {
        body = body.stream();
    }

    // body is buffer
    if (Buffer.isBuffer(body)) {
        return Body.Promise.resolve(body);
    }

    // istanbul ignore if: should never happen
    if (!(body instanceof Stream__default["default"])) {
        return Body.Promise.resolve(Buffer.alloc(0));
    }

    // body is stream
    // get ready to actually consume the body
    let accum = [];
    let accumBytes = 0;
    let abort = false;

    return new Body.Promise(function (resolve, reject) {
        let resTimeout;

        // allow timeout on slow response body
        if (_this4.timeout) {
            resTimeout = setTimeout(function () {
                abort = true;
                reject(
                    new FetchError(
                        `Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`,
                        "body-timeout"
                    )
                );
            }, _this4.timeout);
        }

        // handle stream errors
        body.on("error", function (err) {
            if (err.name === "AbortError") {
                // if the request was aborted, reject with this Error
                abort = true;
                reject(err);
            } else {
                // other errors, such as incorrect content-encoding
                reject(
                    new FetchError(
                        `Invalid response body while trying to fetch ${_this4.url}: ${err.message}`,
                        "system",
                        err
                    )
                );
            }
        });

        body.on("data", function (chunk) {
            if (abort || chunk === null) {
                return;
            }

            if (_this4.size && accumBytes + chunk.length > _this4.size) {
                abort = true;
                reject(
                    new FetchError(
                        `content size at ${_this4.url} over limit: ${_this4.size}`,
                        "max-size"
                    )
                );
                return;
            }

            accumBytes += chunk.length;
            accum.push(chunk);
        });

        body.on("end", function () {
            if (abort) {
                return;
            }

            clearTimeout(resTimeout);

            try {
                resolve(Buffer.concat(accum, accumBytes));
            } catch (err) {
                // handle streams that have accumulated too much data (issue #414)
                reject(
                    new FetchError(
                        `Could not create Buffer from response body for ${_this4.url}: ${err.message}`,
                        "system",
                        err
                    )
                );
            }
        });
    });
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
    if (typeof convert !== "function") {
        throw new Error(
            "The package `encoding` must be installed to use the textConverted() function"
        );
    }

    const ct = headers.get("content-type");
    let charset = "utf-8";
    let res, str;

    // header
    if (ct) {
        res = /charset=([^;]*)/i.exec(ct);
    }

    // no charset in content type, peek at response body for at most 1024 bytes
    str = buffer.slice(0, 1024).toString();

    // html5
    if (!res && str) {
        res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    }

    // html4
    if (!res && str) {
        res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
        if (!res) {
            res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(
                str
            );
            if (res) {
                res.pop(); // drop last quote
            }
        }

        if (res) {
            res = /charset=(.*)/i.exec(res.pop());
        }
    }

    // xml
    if (!res && str) {
        res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    }

    // found charset
    if (res) {
        charset = res.pop();

        // prevent decode issues when sites use incorrect encoding
        // ref: https://hsivonen.fi/encoding-menu/
        if (charset === "gb2312" || charset === "gbk") {
            charset = "gb18030";
        }
    }

    // turn raw buffers into a single utf-8 buffer
    return convert(buffer, "UTF-8", charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
    // Duck-typing as a necessary condition.
    if (
        typeof obj !== "object" ||
        typeof obj.append !== "function" ||
        typeof obj.delete !== "function" ||
        typeof obj.get !== "function" ||
        typeof obj.getAll !== "function" ||
        typeof obj.has !== "function" ||
        typeof obj.set !== "function"
    ) {
        return false;
    }

    // Brand-checking and more duck-typing as optional condition.
    return (
        obj.constructor.name === "URLSearchParams" ||
        Object.prototype.toString.call(obj) === "[object URLSearchParams]" ||
        typeof obj.sort === "function"
    );
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
    return (
        typeof obj === "object" &&
        typeof obj.arrayBuffer === "function" &&
        typeof obj.type === "string" &&
        typeof obj.stream === "function" &&
        typeof obj.constructor === "function" &&
        typeof obj.constructor.name === "string" &&
        /^(Blob|File)$/.test(obj.constructor.name) &&
        /^(Blob|File)$/.test(obj[Symbol.toStringTag])
    );
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
    let p1, p2;
    let body = instance.body;

    // don't allow cloning a used body
    if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
    }

    // check that body is a stream and not form-data object
    // note: we can't clone the form-data object without having it as a dependency
    if (body instanceof Stream__default["default"] && typeof body.getBoundary !== "function") {
        // tee instance body
        p1 = new PassThrough();
        p2 = new PassThrough();
        body.pipe(p1);
        body.pipe(p2);
        // set instance body to teed body and return the other teed body
        instance[INTERNALS].body = p1;
        body = p2;
    }

    return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
    if (body === null) {
        // body is null
        return null;
    } else if (typeof body === "string") {
        // body is string
        return "text/plain;charset=UTF-8";
    } else if (isURLSearchParams(body)) {
        // body is a URLSearchParams
        return "application/x-www-form-urlencoded;charset=UTF-8";
    } else if (isBlob(body)) {
        // body is blob
        return body.type || null;
    } else if (Buffer.isBuffer(body)) {
        // body is buffer
        return null;
    } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        // body is ArrayBuffer
        return null;
    } else if (ArrayBuffer.isView(body)) {
        // body is ArrayBufferView
        return null;
    } else if (typeof body.getBoundary === "function") {
        // detect form data input from form-data module
        return `multipart/form-data;boundary=${body.getBoundary()}`;
    } else if (body instanceof Stream__default["default"]) {
        // body is stream
        // can't really do much about this
        return null;
    } else {
        // Body constructor defaults other things to string
        return "text/plain;charset=UTF-8";
    }
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
    const body = instance.body;

    if (body === null) {
        // body is null
        return 0;
    } else if (isBlob(body)) {
        return body.size;
    } else if (Buffer.isBuffer(body)) {
        // body is buffer
        return body.length;
    } else if (body && typeof body.getLengthSync === "function") {
        // detect form data input from form-data module
        if (
            (body._lengthRetrievers && body._lengthRetrievers.length == 0) || // 1.x
            (body.hasKnownLength && body.hasKnownLength())
        ) {
            // 2.x
            return body.getLengthSync();
        }
        return null;
    } else {
        // body is stream
        return null;
    }
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
    const body = instance.body;

    if (body === null) {
        // body is null
        dest.end();
    } else if (isBlob(body)) {
        body.stream().pipe(dest);
    } else if (Buffer.isBuffer(body)) {
        // body is buffer
        dest.write(body);
        dest.end();
    } else {
        // body is stream
        body.pipe(dest);
    }
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
    name = `${name}`;
    if (invalidTokenRegex.test(name) || name === "") {
        throw new TypeError(`${name} is not a legal HTTP header name`);
    }
}

function validateValue(value) {
    value = `${value}`;
    if (invalidHeaderCharRegex.test(value)) {
        throw new TypeError(`${value} is not a legal HTTP header value`);
    }
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
    name = name.toLowerCase();
    for (const key in map) {
        if (key.toLowerCase() === name) {
            return key;
        }
    }
    return undefined;
}

const MAP = Symbol("map");
class Headers$1 {
    /**
     * Headers class
     *
     * @param   Object  headers  Response headers
     * @return  Void
     */
    constructor() {
        let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        this[MAP] = Object.create(null);

        if (init instanceof Headers$1) {
            const rawHeaders = init.raw();
            const headerNames = Object.keys(rawHeaders);

            for (const headerName of headerNames) {
                for (const value of rawHeaders[headerName]) {
                    this.append(headerName, value);
                }
            }

            return;
        }

        // We don't worry about converting prop to ByteString here as append()
        // will handle it.
        if (init == null);
        else if (typeof init === "object") {
            const method = init[Symbol.iterator];
            if (method != null) {
                if (typeof method !== "function") {
                    throw new TypeError("Header pairs must be iterable");
                }

                // sequence<sequence<ByteString>>
                // Note: per spec we have to first exhaust the lists then process them
                const pairs = [];
                for (const pair of init) {
                    if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
                        throw new TypeError("Each header pair must be iterable");
                    }
                    pairs.push(Array.from(pair));
                }

                for (const pair of pairs) {
                    if (pair.length !== 2) {
                        throw new TypeError("Each header pair must be a name/value tuple");
                    }
                    this.append(pair[0], pair[1]);
                }
            } else {
                // record<ByteString, ByteString>
                for (const key of Object.keys(init)) {
                    const value = init[key];
                    this.append(key, value);
                }
            }
        } else {
            throw new TypeError("Provided initializer must be an object");
        }
    }

    /**
     * Return combined header value given name
     *
     * @param   String  name  Header name
     * @return  Mixed
     */
    get(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key === undefined) {
            return null;
        }

        return this[MAP][key].join(", ");
    }

    /**
     * Iterate over all headers
     *
     * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
     * @param   Boolean   thisArg   `this` context for callback function
     * @return  Void
     */
    forEach(callback) {
        let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        let pairs = getHeaders(this);
        let i = 0;
        while (i < pairs.length) {
            var _pairs$i = pairs[i];
            const name = _pairs$i[0],
                value = _pairs$i[1];

            callback.call(thisArg, value, name, this);
            pairs = getHeaders(this);
            i++;
        }
    }

    /**
     * Overwrite header values given name
     *
     * @param   String  name   Header name
     * @param   String  value  Header value
     * @return  Void
     */
    set(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        this[MAP][key !== undefined ? key : name] = [value];
    }

    /**
     * Append a value onto existing header
     *
     * @param   String  name   Header name
     * @param   String  value  Header value
     * @return  Void
     */
    append(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        if (key !== undefined) {
            this[MAP][key].push(value);
        } else {
            this[MAP][name] = [value];
        }
    }

    /**
     * Check for header name existence
     *
     * @param   String   name  Header name
     * @return  Boolean
     */
    has(name) {
        name = `${name}`;
        validateName(name);
        return find(this[MAP], name) !== undefined;
    }

    /**
     * Delete all header values given name
     *
     * @param   String  name  Header name
     * @return  Void
     */
    delete(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key !== undefined) {
            delete this[MAP][key];
        }
    }

    /**
     * Return raw headers (non-spec api)
     *
     * @return  Object
     */
    raw() {
        return this[MAP];
    }

    /**
     * Get an iterator on keys.
     *
     * @return  Iterator
     */
    keys() {
        return createHeadersIterator(this, "key");
    }

    /**
     * Get an iterator on values.
     *
     * @return  Iterator
     */
    values() {
        return createHeadersIterator(this, "value");
    }

    /**
     * Get an iterator on entries.
     *
     * This is the default iterator of the Headers object.
     *
     * @return  Iterator
     */
    [Symbol.iterator]() {
        return createHeadersIterator(this, "key+value");
    }
}
Headers$1.prototype.entries = Headers$1.prototype[Symbol.iterator];

Object.defineProperty(Headers$1.prototype, Symbol.toStringTag, {
    value: "Headers",
    writable: false,
    enumerable: false,
    configurable: true,
});

Object.defineProperties(Headers$1.prototype, {
    get: {enumerable: true},
    forEach: {enumerable: true},
    set: {enumerable: true},
    append: {enumerable: true},
    has: {enumerable: true},
    delete: {enumerable: true},
    keys: {enumerable: true},
    values: {enumerable: true},
    entries: {enumerable: true},
});

function getHeaders(headers) {
    let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "key+value";

    const keys = Object.keys(headers[MAP]).sort();
    return keys.map(
        kind === "key"
            ? function (k) {
                  return k.toLowerCase();
              }
            : kind === "value"
            ? function (k) {
                  return headers[MAP][k].join(", ");
              }
            : function (k) {
                  return [k.toLowerCase(), headers[MAP][k].join(", ")];
              }
    );
}

const INTERNAL = Symbol("internal");

function createHeadersIterator(target, kind) {
    const iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
        target,
        kind,
        index: 0,
    };
    return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf(
    {
        next() {
            // istanbul ignore if
            if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
                throw new TypeError("Value of `this` is not a HeadersIterator");
            }

            var _INTERNAL = this[INTERNAL];
            const target = _INTERNAL.target,
                kind = _INTERNAL.kind,
                index = _INTERNAL.index;

            const values = getHeaders(target, kind);
            const len = values.length;
            if (index >= len) {
                return {
                    value: undefined,
                    done: true,
                };
            }

            this[INTERNAL].index = index + 1;

            return {
                value: values[index],
                done: false,
            };
        },
    },
    Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()))
);

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    value: "HeadersIterator",
    writable: false,
    enumerable: false,
    configurable: true,
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
    const obj = Object.assign({__proto__: null}, headers[MAP]);

    // http.request() only supports string as Host header. This hack makes
    // specifying custom Host header possible.
    const hostHeaderKey = find(headers[MAP], "Host");
    if (hostHeaderKey !== undefined) {
        obj[hostHeaderKey] = obj[hostHeaderKey][0];
    }

    return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
    const headers = new Headers$1();
    for (const name of Object.keys(obj)) {
        if (invalidTokenRegex.test(name)) {
            continue;
        }
        if (Array.isArray(obj[name])) {
            for (const val of obj[name]) {
                if (invalidHeaderCharRegex.test(val)) {
                    continue;
                }
                if (headers[MAP][name] === undefined) {
                    headers[MAP][name] = [val];
                } else {
                    headers[MAP][name].push(val);
                }
            }
        } else if (!invalidHeaderCharRegex.test(obj[name])) {
            headers[MAP][name] = [obj[name]];
        }
    }
    return headers;
}

const INTERNALS$1 = Symbol("Response internals");

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__default["default"].STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
    constructor() {
        let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        Body.call(this, body, opts);

        const status = opts.status || 200;
        const headers = new Headers$1(opts.headers);

        if (body != null && !headers.has("Content-Type")) {
            const contentType = extractContentType(body);
            if (contentType) {
                headers.append("Content-Type", contentType);
            }
        }

        this[INTERNALS$1] = {
            url: opts.url,
            status,
            statusText: opts.statusText || STATUS_CODES[status],
            headers,
            counter: opts.counter,
        };
    }

    get url() {
        return this[INTERNALS$1].url || "";
    }

    get status() {
        return this[INTERNALS$1].status;
    }

    /**
     * Convenience property representing if the request ended normally
     */
    get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
    }

    get redirected() {
        return this[INTERNALS$1].counter > 0;
    }

    get statusText() {
        return this[INTERNALS$1].statusText;
    }

    get headers() {
        return this[INTERNALS$1].headers;
    }

    /**
     * Clone this response
     *
     * @return  Response
     */
    clone() {
        return new Response(clone(this), {
            url: this.url,
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
            ok: this.ok,
            redirected: this.redirected,
        });
    }
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
    url: {enumerable: true},
    status: {enumerable: true},
    ok: {enumerable: true},
    redirected: {enumerable: true},
    statusText: {enumerable: true},
    headers: {enumerable: true},
    clone: {enumerable: true},
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
    value: "Response",
    writable: false,
    enumerable: false,
    configurable: true,
});

const INTERNALS$2 = Symbol("Request internals");

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url__default["default"].parse;
const format_url = Url__default["default"].format;

const streamDestructionSupported = "destroy" in Stream__default["default"].Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
    return typeof input === "object" && typeof input[INTERNALS$2] === "object";
}

function isAbortSignal(signal) {
    const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
    return !!(proto && proto.constructor.name === "AbortSignal");
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
    constructor(input) {
        let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        let parsedURL;

        // normalize input
        if (!isRequest(input)) {
            if (input && input.href) {
                // in order to support Node.js' Url objects; though WHATWG's URL objects
                // will fall into this branch also (since their `toString()` will return
                // `href` property anyway)
                parsedURL = parse_url(input.href);
            } else {
                // coerce input to a string before attempting to parse
                parsedURL = parse_url(`${input}`);
            }
            input = {};
        } else {
            parsedURL = parse_url(input.url);
        }

        let method = init.method || input.method || "GET";
        method = method.toUpperCase();

        if (
            (init.body != null || (isRequest(input) && input.body !== null)) &&
            (method === "GET" || method === "HEAD")
        ) {
            throw new TypeError("Request with GET/HEAD method cannot have body");
        }

        let inputBody =
            init.body != null
                ? init.body
                : isRequest(input) && input.body !== null
                ? clone(input)
                : null;

        Body.call(this, inputBody, {
            timeout: init.timeout || input.timeout || 0,
            size: init.size || input.size || 0,
        });

        const headers = new Headers$1(init.headers || input.headers || {});

        if (inputBody != null && !headers.has("Content-Type")) {
            const contentType = extractContentType(inputBody);
            if (contentType) {
                headers.append("Content-Type", contentType);
            }
        }

        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) signal = init.signal;

        if (signal != null && !isAbortSignal(signal)) {
            throw new TypeError("Expected signal to be an instanceof AbortSignal");
        }

        this[INTERNALS$2] = {
            method,
            redirect: init.redirect || input.redirect || "follow",
            headers,
            parsedURL,
            signal,
        };

        // node-fetch-only options
        this.follow =
            init.follow !== undefined
                ? init.follow
                : input.follow !== undefined
                ? input.follow
                : 20;
        this.compress =
            init.compress !== undefined
                ? init.compress
                : input.compress !== undefined
                ? input.compress
                : true;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
    }

    get method() {
        return this[INTERNALS$2].method;
    }

    get url() {
        return format_url(this[INTERNALS$2].parsedURL);
    }

    get headers() {
        return this[INTERNALS$2].headers;
    }

    get redirect() {
        return this[INTERNALS$2].redirect;
    }

    get signal() {
        return this[INTERNALS$2].signal;
    }

    /**
     * Clone this request
     *
     * @return  Request
     */
    clone() {
        return new Request(this);
    }
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
    value: "Request",
    writable: false,
    enumerable: false,
    configurable: true,
});

Object.defineProperties(Request.prototype, {
    method: {enumerable: true},
    url: {enumerable: true},
    headers: {enumerable: true},
    redirect: {enumerable: true},
    clone: {enumerable: true},
    signal: {enumerable: true},
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
    const parsedURL = request[INTERNALS$2].parsedURL;
    const headers = new Headers$1(request[INTERNALS$2].headers);

    // fetch step 1.3
    if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
    }

    // Basic fetch
    if (!parsedURL.protocol || !parsedURL.hostname) {
        throw new TypeError("Only absolute URLs are supported");
    }

    if (!/^https?:$/.test(parsedURL.protocol)) {
        throw new TypeError("Only HTTP(S) protocols are supported");
    }

    if (
        request.signal &&
        request.body instanceof Stream__default["default"].Readable &&
        !streamDestructionSupported
    ) {
        throw new Error(
            "Cancellation of streamed requests with AbortSignal is not supported in node < 8"
        );
    }

    // HTTP-network-or-cache fetch steps 2.4-2.7
    let contentLengthValue = null;
    if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
        contentLengthValue = "0";
    }
    if (request.body != null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number") {
            contentLengthValue = String(totalBytes);
        }
    }
    if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
    }

    // HTTP-network-or-cache fetch step 2.11
    if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
    }

    // HTTP-network-or-cache fetch step 2.15
    if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate");
    }

    let agent = request.agent;
    if (typeof agent === "function") {
        agent = agent(parsedURL);
    }

    if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
    }

    // HTTP-network fetch step 4.2
    // chunked encoding is handled by Node.js

    return Object.assign({}, parsedURL, {
        method: request.method,
        headers: exportNodeCompatibleHeaders(headers),
        agent,
    });
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
    Error.call(this, message);

    this.type = "aborted";
    this.message = message;

    // hide custom error implementation details from end-users
    Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = "AbortError";

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream__default["default"].PassThrough;
const resolve_url = Url__default["default"].resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch$2(url, opts) {
    // allow custom promise
    if (!fetch$2.Promise) {
        throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
    }

    Body.Promise = fetch$2.Promise;

    // wrap http.request into fetch
    return new fetch$2.Promise(function (resolve, reject) {
        // build request object
        const request = new Request(url, opts);
        const options = getNodeRequestOptions(request);

        const send = (
            options.protocol === "https:" ? https__default["default"] : http__default["default"]
        ).request;
        const signal = request.signal;

        let response = null;

        const abort = function abort() {
            let error = new AbortError("The user aborted a request.");
            reject(error);
            if (request.body && request.body instanceof Stream__default["default"].Readable) {
                request.body.destroy(error);
            }
            if (!response || !response.body) return;
            response.body.emit("error", error);
        };

        if (signal && signal.aborted) {
            abort();
            return;
        }

        const abortAndFinalize = function abortAndFinalize() {
            abort();
            finalize();
        };

        // send request
        const req = send(options);
        let reqTimeout;

        if (signal) {
            signal.addEventListener("abort", abortAndFinalize);
        }

        function finalize() {
            req.abort();
            if (signal) signal.removeEventListener("abort", abortAndFinalize);
            clearTimeout(reqTimeout);
        }

        if (request.timeout) {
            req.once("socket", function (socket) {
                reqTimeout = setTimeout(function () {
                    reject(new FetchError(`network timeout at: ${request.url}`, "request-timeout"));
                    finalize();
                }, request.timeout);
            });
        }

        req.on("error", function (err) {
            reject(
                new FetchError(
                    `request to ${request.url} failed, reason: ${err.message}`,
                    "system",
                    err
                )
            );
            finalize();
        });

        req.on("response", function (res) {
            clearTimeout(reqTimeout);

            const headers = createHeadersLenient(res.headers);

            // HTTP fetch step 5
            if (fetch$2.isRedirect(res.statusCode)) {
                // HTTP fetch step 5.2
                const location = headers.get("Location");

                // HTTP fetch step 5.3
                const locationURL = location === null ? null : resolve_url(request.url, location);

                // HTTP fetch step 5.5
                switch (request.redirect) {
                    case "error":
                        reject(
                            new FetchError(
                                `uri requested responds with a redirect, redirect mode is set to error: ${request.url}`,
                                "no-redirect"
                            )
                        );
                        finalize();
                        return;
                    case "manual":
                        // node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
                        if (locationURL !== null) {
                            // handle corrupted header
                            try {
                                headers.set("Location", locationURL);
                            } catch (err) {
                                // istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
                                reject(err);
                            }
                        }
                        break;
                    case "follow":
                        // HTTP-redirect fetch step 2
                        if (locationURL === null) {
                            break;
                        }

                        // HTTP-redirect fetch step 5
                        if (request.counter >= request.follow) {
                            reject(
                                new FetchError(
                                    `maximum redirect reached at: ${request.url}`,
                                    "max-redirect"
                                )
                            );
                            finalize();
                            return;
                        }

                        // HTTP-redirect fetch step 6 (counter increment)
                        // Create a new Request object.
                        const requestOpts = {
                            headers: new Headers$1(request.headers),
                            follow: request.follow,
                            counter: request.counter + 1,
                            agent: request.agent,
                            compress: request.compress,
                            method: request.method,
                            body: request.body,
                            signal: request.signal,
                            timeout: request.timeout,
                            size: request.size,
                        };

                        // HTTP-redirect fetch step 9
                        if (
                            res.statusCode !== 303 &&
                            request.body &&
                            getTotalBytes(request) === null
                        ) {
                            reject(
                                new FetchError(
                                    "Cannot follow redirect with body being a readable stream",
                                    "unsupported-redirect"
                                )
                            );
                            finalize();
                            return;
                        }

                        // HTTP-redirect fetch step 11
                        if (
                            res.statusCode === 303 ||
                            ((res.statusCode === 301 || res.statusCode === 302) &&
                                request.method === "POST")
                        ) {
                            requestOpts.method = "GET";
                            requestOpts.body = undefined;
                            requestOpts.headers.delete("content-length");
                        }

                        // HTTP-redirect fetch step 15
                        resolve(fetch$2(new Request(locationURL, requestOpts)));
                        finalize();
                        return;
                }
            }

            // prepare response
            res.once("end", function () {
                if (signal) signal.removeEventListener("abort", abortAndFinalize);
            });
            let body = res.pipe(new PassThrough$1());

            const response_options = {
                url: request.url,
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: headers,
                size: request.size,
                timeout: request.timeout,
                counter: request.counter,
            };

            // HTTP-network fetch step 12.1.1.3
            const codings = headers.get("Content-Encoding");

            // HTTP-network fetch step 12.1.1.4: handle content codings

            // in following scenarios we ignore compression support
            // 1. compression support is disabled
            // 2. HEAD request
            // 3. no Content-Encoding header
            // 4. no content response (204)
            // 5. content not modified response (304)
            if (
                !request.compress ||
                request.method === "HEAD" ||
                codings === null ||
                res.statusCode === 204 ||
                res.statusCode === 304
            ) {
                response = new Response(body, response_options);
                resolve(response);
                return;
            }

            // For Node v6+
            // Be less strict when decoding compressed responses, since sometimes
            // servers send slightly invalid responses that are still accepted
            // by common browsers.
            // Always using Z_SYNC_FLUSH is what cURL does.
            const zlibOptions = {
                flush: zlib__default["default"].Z_SYNC_FLUSH,
                finishFlush: zlib__default["default"].Z_SYNC_FLUSH,
            };

            // for gzip
            if (codings == "gzip" || codings == "x-gzip") {
                body = body.pipe(zlib__default["default"].createGunzip(zlibOptions));
                response = new Response(body, response_options);
                resolve(response);
                return;
            }

            // for deflate
            if (codings == "deflate" || codings == "x-deflate") {
                // handle the infamous raw deflate response from old servers
                // a hack for old IIS and Apache servers
                const raw = res.pipe(new PassThrough$1());
                raw.once("data", function (chunk) {
                    // see http://stackoverflow.com/questions/37519828
                    if ((chunk[0] & 0x0f) === 0x08) {
                        body = body.pipe(zlib__default["default"].createInflate());
                    } else {
                        body = body.pipe(zlib__default["default"].createInflateRaw());
                    }
                    response = new Response(body, response_options);
                    resolve(response);
                });
                return;
            }

            // for br
            if (
                codings == "br" &&
                typeof zlib__default["default"].createBrotliDecompress === "function"
            ) {
                body = body.pipe(zlib__default["default"].createBrotliDecompress());
                response = new Response(body, response_options);
                resolve(response);
                return;
            }

            // otherwise, use response as-is
            response = new Response(body, response_options);
            resolve(response);
        });

        writeToStream(req, request);
    });
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch$2.isRedirect = function (code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch$2.Promise = global.Promise;

var lib = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    default: fetch$2,
    Headers: Headers$1,
    Request: Request,
    Response: Response,
    FetchError: FetchError,
});

var require$$0 = /*@__PURE__*/ getAugmentedNamespace(lib);

(function (module, exports) {
    const nodeFetch = require$$0;
    const realFetch = nodeFetch.default || nodeFetch;

    const fetch = function (url, options) {
        // Support schemaless URIs on the server for parity with the browser.
        // Ex: //github.com/ -> https://github.com/
        if (/^\/\//.test(url)) {
            url = "https:" + url;
        }
        return realFetch.call(this, url, options);
    };

    fetch.ponyfill = true;

    module.exports = exports = fetch;
    exports.fetch = fetch;
    exports.Headers = nodeFetch.Headers;
    exports.Request = nodeFetch.Request;
    exports.Response = nodeFetch.Response;

    // Needed for TypeScript consumers without esModuleInterop.
    exports.default = fetch;
})(nodePonyfill, nodePonyfill.exports);

const fetchNode = nodePonyfill.exports;
const fetch$1 = fetchNode.fetch.bind({});

fetch$1.polyfill = true;

if (!commonjsGlobal.fetch) {
    commonjsGlobal.fetch = fetch$1;
    commonjsGlobal.Response = fetchNode.Response;
    commonjsGlobal.Headers = fetchNode.Headers;
    commonjsGlobal.Request = fetchNode.Request;
}

var FetchNFTClient = /** @class */ (function () {
    function FetchNFTClient(props) {
        var _this = this;
        var _a, _b;
        this.getEthereumCollectibles = function (wallets) {
            return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!wallets.length) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.ethClient.getAllCollectibles(wallets)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = {};
                            _b.label = 3;
                        case 3:
                            return [2 /*return*/, _a];
                    }
                });
            });
        };
        this.getSolanaCollectibles = function (wallets) {
            return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!wallets.length) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.solClient.getAllCollectibles(wallets)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = {};
                            _b.label = 3;
                        case 3:
                            return [2 /*return*/, _a];
                    }
                });
            });
        };
        this.getCollectibles = function (args) {
            return __awaiter(_this, void 0, void 0, function () {
                var _a, ethCollectibles, solCollectibles, e_1;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            return [
                                4 /*yield*/,
                                Promise.all([
                                    this.getEthereumCollectibles(
                                        (_b = args.ethWallets) !== null && _b !== void 0 ? _b : []
                                    ),
                                    this.getSolanaCollectibles(
                                        (_c = args.solWallets) !== null && _c !== void 0 ? _c : []
                                    ),
                                ]),
                            ];
                        case 1:
                            (_a = _d.sent()), (ethCollectibles = _a[0]), (solCollectibles = _a[1]);
                            return [
                                2 /*return*/,
                                {
                                    ethCollectibles: ethCollectibles,
                                    solCollectibles: solCollectibles,
                                },
                            ];
                        case 2:
                            e_1 = _d.sent();
                            console.error(e_1.message);
                            return [2 /*return*/, e_1];
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.ethClient = new OpenSeaClient(
            (_a = props === null || props === void 0 ? void 0 : props.openSeaConfig) !== null &&
            _a !== void 0
                ? _a
                : {}
        );
        this.solClient = new SolanaClient(
            (_b = props === null || props === void 0 ? void 0 : props.solanaConfig) !== null &&
            _b !== void 0
                ? _b
                : {}
        );
    }
    return FetchNFTClient;
})();

exports.FetchNFTClient = FetchNFTClient;
//# sourceMappingURL=index.js.map
