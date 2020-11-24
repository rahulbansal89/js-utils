'use strict';

var _Utils;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Common utils function
 */

var dateFormat = require('dateformat');

var Utils = (_Utils = {
    isNotNumeric: function isNotNumeric(value) {
        if (Utils.isUndefinedOrNullOrEmpty(value)) {
            return true;
        }
        return Utils.isNaN(Number(value));
    },

    isBoolean: function isBoolean(value) {
        return typeof value === 'boolean';
    },

    isNumber: function isNumber(value) {
        return typeof value === 'number';
    },

    isFunction: function isFunction(value) {
        return typeof value === 'function';
    },

    isUndefined: function isUndefined(value) {
        return typeof value === 'undefined';
    },

    isObejct: function isObejct(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
    },

    isArray: function isArray(value) {
        return Array.isArray(value);
    },

    isNull: function isNull(value) {
        return value === null;
    },

    isEmpty: function isEmpty(value) {
        return value === '';
    },

    isEmptyList: function isEmptyList(value) {
        return value.length === 0;
    },

    isEmptyObject: function isEmptyObject(value) {
        if (value === null) {
            return true;
        }

        if (Utils.isBoolean(value) || Utils.isNumber(value) || Utils.isFunction(value) || Utils.isArray(value)) {
            return false;
        }

        if (value instanceof Set && !Utils.isUndefined(value.size) && value.size != 0) {
            // eslint-disable-line
            return false;
        }

        return Object.keys(value).length === 0;
    },

    isUndefinedOrNull: function isUndefinedOrNull(value) {
        return Utils.isUndefined(value) || Utils.isNull(value);
    },

    isUndefinedOrNullOrEmpty: function isUndefinedOrNullOrEmpty(value) {
        return Utils.isUndefinedOrNull(value) || Utils.isEmpty(value);
    },

    isUndefinedOrNullOrEmptyObject: function isUndefinedOrNullOrEmptyObject(value) {
        return Utils.isUndefinedOrNullOrEmpty(value) || !Utils.isObejct(value) || Utils.isEmptyObject(value);
    },

    isUndefinedOrNullOrEmptyList: function isUndefinedOrNullOrEmptyList(value) {
        return Utils.isUndefinedOrNull(value) || !Utils.isArray(value) || Utils.isEmptyList(value);
    },

    isUndefinedOrNullOrEmptyOrEmptyObjectOrEmptyList: function isUndefinedOrNullOrEmptyOrEmptyObjectOrEmptyList(value) {
        return Utils.isUndefinedOrNullOrEmpty(value) || Utils.isEmptyObject(value) || Utils.isUndefinedOrNullOrEmptyList(value);
    },

    isString: function isString(string) {
        return Object.prototype.toString.call(string) === '[object String]';
    },

    copy: function copy(value) {
        return _extends({}, value);
    },

    logPerformance: function logPerformance(func, args) {
        if (typeof func !== 'function') {
            throw 'A valid javascript function required, for logging performance'; // eslint-disable-line
        }

        var t0 = performance.now();
        func.apply(undefined, args);
        var t1 = performance.now();
        console.log('Call to function took ' + (t1 - t0) + ' milliseconds.');
    },

    getFileExtensionFromName: function getFileExtensionFromName(fileName) {
        var fileNameParts = fileName.split('.');
        return fileNameParts.length > 0 ? fileNameParts.pop() : null;
    },

    getFilenameFromUrl: function getFilenameFromUrl(url) {
        if (url) {
            var m = url.toString().match(/.*\/(.+?)\./);
            if (m && m.length > 1) {
                return m[1];
            }
        }
        return "";
    },

    getMimeTypeFromExtension: function getMimeTypeFromExtension(extension) {
        var mimeType = null;
        switch (extension.toLowerCase()) {
            case 'doc':
                mimeType = 'application/msword';
                break;
            case 'pdf':
                mimeType = 'application/pdf';
                break;
            case 'xlsx':
            case 'xls':
                mimeType = 'application/vnd.ms-excel';
                break;
            case 'jpg':
            case 'jpeg':
                mimeType = 'image/jpg';
                break;
            case 'png':
                mimeType = 'image/png';
                break;
            case 'gif':
                mimeType = 'image/gif';
        }

        return mimeType;
    },
    isImage: function isImage(fileName) {
        var mimeType = Utils.getMimeTypeFromExtension(Utils.getFileExtensionFromName(fileName));
        return !Utils.isUndefinedOrNullOrEmpty(mimeType) && mimeType.startsWith('image');
    },

    sleep: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ms) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return new Promise(function (resolve) {
                                return setTimeout(resolve, ms);
                            });

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function sleep(_x) {
            return _ref.apply(this, arguments);
        };
    }(),

    /**
     * Performs equality by iterating through keys on an object and returning false
     * when any key has values which are not strictly equal between the arguments.
     * Returns true when the values of all keys are strictly equal.
     */
    shallowEqual: function shallowEqual(objA, objB) {
        if (objA === objB) {
            return true;
        }

        if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
            return false;
        }

        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) {
            return false;
        }

        // Test for A's keys different from B.
        var bHasOwnProperty = hasOwnProperty.bind(objB);
        for (var i = 0; i < keysA.length; i++) {
            if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                return false;
            }
        }

        return true;
    },

    isValidDate: function isValidDate(date) {
        if (date && Object.prototype.toString.call(date) === '[object Date]' && !Utils.isNaN(date)) {
            return true;
        }
        return false;
    },

    getStartOfDay: function getStartOfDay(date) {
        if (!Utils.isValidDate(date)) {
            throw new Error('`date` is not a valid `Date` object');
        }
        if (Object.prototype.toString.call(date) !== '[object Date]') {
            date = new Date(date);
        }
        var startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return startOfDay;
    },

    getEndOfDay: function getEndOfDay(date) {
        if (!Utils.isValidDate(date)) {
            throw new Error('`date` is not a valid `Date` object');
        }
        var startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return new Date(startOfDay.getTime() + 86399999);
    },

    // default `_` will be replaced with ` `
    convertToCamelCase: function convertToCamelCase() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var splitOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
        var replaceWith = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
        return value.split(splitOn).map(function (it) {
            return it.charAt(0).toUpperCase() + it.substr(1).toLowerCase();
        }).join(replaceWith);
    },

    generateKeywords: function generateKeywords(strArr, excludeBlank) {
        if (!strArr || Utils.isUndefinedOrNullOrEmptyList(strArr)) {
            return [];
        }
        var cleanStr = function cleanStr(str) {
            return str.replace(/[^a-zA-Z0-9 ]/g, '').replace(/  +/g, ' ').toLowerCase().trim();
        };
        var arrName = [];
        var newArr = strArr.concat(strArr.join(' '));
        for (var i = 0; i < newArr.length; i++) {
            if (newArr[i]) {
                var str = cleanStr(newArr[i]);
                var newArr2 = str.split(' ');
                var arrStr = [];
                for (var j = 0; j < newArr2.length; j++) {
                    if (arrStr.length) {
                        arrStr.push(arrStr[j - 1] + ' ' + newArr2[j]);
                    } else {
                        arrStr.push(newArr2[j]);
                    }
                }
                arrName = arrName.concat(arrStr).concat(newArr2);
            }
        }
        if (excludeBlank) {
            return [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(arrName.filter(Utils.onlyUniqueFilter))))));
        }
        return [].concat(_toConsumableArray(new Set([''].concat(_toConsumableArray(arrName.filter(Utils.onlyUniqueFilter))))));
    },

    deepCopy: function deepCopy(value) {
        if (!value) {
            return value;
        }

        return JSON.parse(JSON.stringify(value));
    },

    asyncDispatch: function asyncDispatch(action, dispatch) {
        var promise = new Promise(function (resolve, reject) {
            dispatch(_extends({}, action, {
                resolve: resolve,
                reject: reject
            }));
        });
        return promise;
    },

    makeQueryString: function makeQueryString(params) {
        if (Utils.isUndefinedOrNullOrEmptyObject(params)) {
            return '';
        }
        var query = [];
        Object.keys(params).forEach(function (index) {
            if (!Utils.isUndefinedOrNullOrEmpty(params[index]) && _typeof(params[index]) === 'object') {
                var filters = params[index];
                Object.keys(filters).forEach(function (key) {
                    if (filters[key] instanceof Array) {
                        query.push(index + '=' + key + ':' + filters[key].join('|'));
                    }
                });
            } else if (!Utils.isUndefinedOrNullOrEmpty(params[index])) {
                query.push(index + '=' + params[index]);
            }
        });
        return query.join('&');
    },

    debounce: function debounce(func, delay) {
        var debounceTimer = void 0;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function () {
                return func.apply(context, args);
            }, delay);
        };
    },

    formatDate: function formatDate(dateLong, format) {
        if (Utils.isUndefinedOrNull(dateLong) || dateLong === 0) {
            return '-';
        }
        var newFormat = format || 'dd mmm yyyy';
        var date = new Date(dateLong);
        return dateFormat(date, newFormat);
    },

    formatDateAndTime: function formatDateAndTime(dateLong, format) {
        var newFormat = format || 'dd mmm yyyy h:MM TT';
        return Utils.formatDate(dateLong, newFormat);
    },

    formatCurrency: function formatCurrency(number, addRupeeSymbol) {
        if (Utils.isUndefinedOrNullOrEmpty(number)) {
            return number;
        }
        try {
            return (addRupeeSymbol ? '₹ ' : '') + (Math.round(number * 100) / 100).toLocaleString('en-IN');
        } catch (error) {
            return null;
            throw new Error(error);
        }
    },

    formatAddress: function formatAddress(address) {
        if (!address) {
            return null;
        }
        try {
            var formatAddress = [];
            if (!Utils.isUndefinedOrNullOrEmpty(address.addressLine1)) {
                formatAddress.push(address.addressLine1);
            }
            if (!Utils.isUndefinedOrNullOrEmpty(address.addressLine2)) {
                formatAddress.push(address.addressLine2);
            }
            if (!Utils.isUndefinedOrNullOrEmpty(address.city)) {
                formatAddress.push(address.city);
            }
            if (!Utils.isUndefinedOrNullOrEmpty(address.state)) {
                formatAddress.push(address.state);
            }
            if (!Utils.isUndefinedOrNullOrEmpty(address.pincode)) {
                formatAddress.push(address.pincode);
            }
            return formatAddress.join(', ');
        } catch (error) {
            throw new Error(error);
        }
    },

    sortList: function sortList(list, field) {
        var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';

        if (Utils.isUndefinedOrNullOrEmptyList(list) || Utils.isUndefinedOrNullOrEmpty(field)) {
            return list;
        }
        return list.sort(function (a, b) {
            if (!a[field] || !b[field]) {
                return 0;
            }
            if (a[field] > b[field]) {
                return dir === 'desc' ? -1 : 1;
            }
            if (a[field] < b[field]) {
                return dir === 'desc' ? 1 : -1;
            }
            return 0;
        });
    },

    getVesionTotal: function getVesionTotal() {
        var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.0.0';

        try {
            return Number(('' + version).split('.').join(''));
        } catch (e) {
            return 0;
        }
    },

    isJson: function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    onlyUniqueFilter: function onlyUniqueFilter(value, index, self) {
        return self.indexOf(value) === index;
    },

    // identify update notification
    isValidNotificationData: function isValidNotificationData(remoteMessage) {
        return !Utils.isUndefinedOrNullOrEmptyObject(remoteMessage) && !Utils.isUndefinedOrNullOrEmptyObject(remoteMessage.notification) && !Utils.isUndefinedOrNullOrEmptyObject(remoteMessage.data);
    },

    // identify update notification
    isUpdateNotification: function isUpdateNotification(remoteMessage) {
        return remoteMessage && remoteMessage.data && remoteMessage.data.version && remoteMessage.data.type;
    },

    stringToKey: function stringToKey(str) {
        if (Utils.isUndefinedOrNullOrEmpty(str)) {
            return null;
        }
        return str.toLowerCase().replace(/ /g, '-');
    },

    // for ScrollView compoent react-native
    isCloseToBottom: function isCloseToBottom(_ref2) {
        var layoutMeasurement = _ref2.layoutMeasurement,
            contentOffset = _ref2.contentOffset,
            contentSize = _ref2.contentSize;

        var paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    },

    // get file name from path
    getFileName: function getFileName(path) {
        if (!path) {
            return path;
        }
        try {
            return decodeURIComponent(path).replace(/^.*[\\\/]/, '').split('?')[0];
        } catch (e) {
            return path;
        }
    },

    // get min/hour time
    formatTimeString: function formatTimeString(minutes) {
        if (!Number(minutes)) {
            return minutes;
        }

        if (minutes < 60) {
            return minutes + ' (min)';
        }
        return (minutes / 60).toFixed(2).replace('.00', '') + ' hr';
    },

    getDistanceFromLatLonInKm: function getDistanceFromLatLonInKm(coordinates1, coordinates2) {
        if (Utils.isUndefinedOrNullOrEmptyList(coordinates1) || Utils.isUndefinedOrNullOrEmptyList(coordinates2)) {
            return null;
        }

        var _coordinates = _slicedToArray(coordinates1, 2),
            lat1 = _coordinates[0],
            lon1 = _coordinates[1];

        var _coordinates2 = _slicedToArray(coordinates2, 2),
            lat2 = _coordinates2[0],
            lon2 = _coordinates2[1];

        var R = 6371; // Radius of the earth in km
        var dLat = Utils.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = Utils.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Utils.deg2rad(lat1)) * Math.cos(Utils.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d ? Math.ceil(d) + ' km' + (d > 1 ? 's' : '') : d;
    },
    deg2rad: function deg2rad(deg) {
        return deg * (Math.PI / 180);
    },
    logObject: function logObject(obj) {
        console.log(JSON.stringify(obj, null, 2));
    },
    removeSpecialChar: function removeSpecialChar(str) {
        return str.replace(/[^a-zA-Z1-9]/g, "");
    },
    escapeRegex: function escapeRegex(string) {
        return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },
    searchANDQuery: function searchANDQuery(string) {
        return string.split(' ').map(function (str) {
            return '"' + str + '"';
        }).join(' ');
    },
    strToCode: function strToCode() {
        try {
            for (var _len = arguments.length, str = Array(_len), _key = 0; _key < _len; _key++) {
                str[_key] = arguments[_key];
            }

            return str.reduce(function (total, item) {
                return total + item.trim().split('').reduce(function (total2, item2) {
                    return total2 + item2.charCodeAt(0);
                }, 0);
            }, 0);
        } catch (e) {
            return null;
        }
    },
    generateProductId: function generateProductId(sku, createdById, subCategory) {
        var productId = sku + '-' + createdById + '-' + subCategory;
        return productId;
    },
    flatten: function flatten(object) {
        var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';


        var isValidObject = function isValidObject(value) {
            if (!value) {
                return false;
            }

            var isArray = Array.isArray(value);
            var isObject = Object.prototype.toString.call(value) === '[object Object]';
            var hasKeys = !!Object.keys(value).length;

            return !isArray && isObject && hasKeys;
        };

        var walker = function walker(child) {
            var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


            return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.keys(child).map(function (key) {
                return isValidObject(child[key]) ? walker(child[key], path.concat([key])) : _defineProperty({}, path.concat([key]).join(separator), child[key]);
            }))));
        };

        return Object.assign({}, walker(object));
    }
}, _defineProperty(_Utils, 'asyncDispatch', function asyncDispatch(action, dispatch) {
    var promise = new Promise(function (resolve, reject) {
        dispatch(_extends({}, action, {
            resolve: resolve,
            reject: reject
        }));
    });
    return promise;
}), _defineProperty(_Utils, 'getRandomKey', function getRandomKey() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
    var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aA';

    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; i -= 1) {
        result += mask[Math.round(Math.random() * (mask.length - 1))];
    }return result;
}), _defineProperty(_Utils, 'timeToMeridiem', function timeToMeridiem(hour) {
    if (Utils.isUndefinedOrNullOrEmpty(hour)) {
        return '';
    }
    return hour >= 12 ? "PM" : "AM";
}), _defineProperty(_Utils, 'hrToTimeMeridiem', function hrToTimeMeridiem(hour) {
    if (!hour) {
        return '';
    }
    return (+hour > 12 ? +hour - 12 : hour) + ' ' + Utils.timeToMeridiem(+hour);
}), _Utils);

module.exports = Utils;