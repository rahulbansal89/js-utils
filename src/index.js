/**
 * Common utils function
 */

const dateFormat = require('dateformat');

const Utils = {
    isNotNumeric: (value) => {
        if (Utils.isUndefinedOrNullOrEmpty(value)) {
            return true;
        }
        return Utils.isNaN(Number(value));
    },

    isBoolean: (value) => typeof value === 'boolean',

    isNumber: (value) => typeof value === 'number',

    isFunction: (value) => typeof value === 'function',

    isUndefined: (value) => typeof value === 'undefined',

    isObejct: (value) => typeof value === 'object',

    isArray: (value) => Array.isArray(value),

    isNull: (value) => value === null,

    isEmpty: (value) => value === '',

    isEmptyList: (value) => value.length === 0,

    isEmptyObject: (value) => {
        if (value === null) {
            return true;
        }

        if (Utils.isBoolean(value) || Utils.isNumber(value) || Utils.isFunction(value) || Utils.isArray(value)) {
            return false;
        }

        if (value instanceof Set && !Utils.isUndefined(value.size) && value.size != 0) { // eslint-disable-line
            return false;
        }

        return Object.keys(value).length === 0;
    },

    isUndefinedOrNull: (value) => Utils.isUndefined(value) || Utils.isNull(value),

    isUndefinedOrNullOrEmpty: (value) => Utils.isUndefinedOrNull(value) || Utils.isEmpty(value),

    isUndefinedOrNullOrEmptyObject: (value) => Utils.isUndefinedOrNullOrEmpty(value) || !Utils.isObejct(value) || Utils.isEmptyObject(value),

    isUndefinedOrNullOrEmptyList: (value) => Utils.isUndefinedOrNull(value) || !Utils.isArray(value) || Utils.isEmptyList(value),

    isUndefinedOrNullOrEmptyOrEmptyObjectOrEmptyList: (value) =>
        Utils.isUndefinedOrNullOrEmpty(value) || Utils.isEmptyObject(value) || Utils.isUndefinedOrNullOrEmptyList(value),

    isString: (string) => Object.prototype.toString.call(string) === '[object String]',

    copy: (value) => ({ ...value }),

    logPerformance: (func, args) => {
        if (typeof func !== 'function') {
            throw 'A valid javascript function required, for logging performance'; // eslint-disable-line
        }

        const t0 = performance.now();
        func.apply(this, args);
        const t1 = performance.now();
        console.log(`Call to function took ${t1 - t0} milliseconds.`);
    },

    getFileExtensionFromName: (fileName) => {
        const fileNameParts = fileName.split('.');
        return fileNameParts.length > 0 ? fileNameParts.pop() : null;
    },

    getFilenameFromUrl: (url) => {
        if (url) {
            let paths = decodeURIComponent(url).split('?');
            if (paths && paths.length > 0) {
                paths = paths[0].split('/')
            }
            if (paths && paths.length > 0) {
                return paths[paths.length - 1];
            }
        }
        return "";
    },

    getMimeTypeFromExtension: (extension) => {
        let mimeType = null;
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
    isImage: (fileName) => {
        const mimeType = Utils.getMimeTypeFromExtension(Utils.getFileExtensionFromName(fileName));
        return !Utils.isUndefinedOrNullOrEmpty(mimeType) && mimeType.startsWith('image');
    },

    sleep: async (ms) => {
        await new Promise((resolve) => setTimeout(resolve, ms));
    },

    /**
     * Performs equality by iterating through keys on an object and returning false
     * when any key has values which are not strictly equal between the arguments.
     * Returns true when the values of all keys are strictly equal.
     */
    shallowEqual: (objA, objB) => {
        if (objA === objB) {
            return true;
        }

        if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
            return false;
        }

        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) {
            return false;
        }

        // Test for A's keys different from B.
        const bHasOwnProperty = hasOwnProperty.bind(objB);
        for (let i = 0; i < keysA.length; i++) {
            if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                return false;
            }
        }

        return true;
    },

    isValidDate: (date) => {
        if (date && Object.prototype.toString.call(date) === '[object Date]' && !Utils.isNaN(date)) {
            return true;
        }
        return false;
    },

    getStartOfDay: (date) => {
        if (!Utils.isValidDate(date)) {
            throw new Error('`date` is not a valid `Date` object');
        }
        if (Object.prototype.toString.call(date) !== '[object Date]') {
            date = new Date(date);
        }
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return startOfDay;
    },

    getEndOfDay: (date) => {
        if (!Utils.isValidDate(date)) {
            throw new Error('`date` is not a valid `Date` object');
        }
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return new Date(startOfDay.getTime() + 86399999);
    },

    // default `_` will be replaced with ` `
    convertToCamelCase: (value = '', splitOn = '_', replaceWith = ' ') =>
        value
            .split(splitOn)
            .map((it) => it.charAt(0).toUpperCase() + it.substr(1).toLowerCase())
            .join(replaceWith),

    generateKeywords: (strArr, excludeBlank) => {
        if (!strArr || Utils.isUndefinedOrNullOrEmptyList(strArr)) {
            return [];
        }
        const cleanStr = (str) =>
            str
                .replace(/[^a-zA-Z0-9 ]/g, '')
                .replace(/  +/g, ' ')
                .toLowerCase()
                .trim();
        let arrName = [];
        const newArr = strArr.concat(strArr.join(' '));
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i]) {
                const str = cleanStr(newArr[i]);
                const newArr2 = str.split(' ');
                const arrStr = []
                for (let j = 0; j < newArr2.length; j++) {
                    if (arrStr.length) {
                        arrStr.push(`${arrStr[j - 1]} ${newArr2[j]}`);
                    } else {
                        arrStr.push(newArr2[j]);
                    }
                }
                arrName = arrName.concat(arrStr).concat(newArr2);
            }
        }
        if (excludeBlank) {
            return [...new Set([...arrName.filter(Utils.onlyUniqueFilter)])];
        }
        return [...new Set(['', ...arrName.filter(Utils.onlyUniqueFilter)])];
    },

    deepCopy: (value) => {
        if (!value) {
            return value;
        }

        return JSON.parse(JSON.stringify(value));
    },

    asyncDispatch: (action, dispatch) => {
        const promise = new Promise((resolve, reject) => {
            dispatch({
                ...action,
                resolve,
                reject,
            });
        });
        return promise;
    },

    makeQueryString: (params) => {
        if (Utils.isUndefinedOrNullOrEmptyObject(params)) {
            return '';
        }
        const query = [];
        Object.keys(params).forEach((index) => {
            if (!Utils.isUndefinedOrNullOrEmpty(params[index]) && typeof params[index] === 'object') {
                const filters = params[index];
                Object.keys(filters).forEach((key) => {
                    if (filters[key] instanceof Array) {
                        query.push(`${index}=${key}:${filters[key].join('|')}`);
                    }
                });
            } else if (!Utils.isUndefinedOrNullOrEmpty(params[index])) {
                query.push(`${index}=${params[index]}`);
            }
        });
        return query.join('&');
    },

    debounce: (func, delay) => {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    },

    formatDate: (dateLong, format) => {
        if (Utils.isUndefinedOrNull(dateLong) || dateLong === 0) {
            return '-';
        }
        const newFormat = format || 'dd mmm yyyy';
        const date = new Date(dateLong);
        return dateFormat(date, newFormat);
    },

    formatDateAndTime: (dateLong, format) => {
        const newFormat = format || 'dd mmm yyyy h:MM TT';
        return Utils.formatDate(dateLong, newFormat);
    },

    formatCurrency: (number, addRupeeSymbol) => {
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

    formatAddress: (address) => {
        if (!address) {
            return null;
        }
        try {
            let formatAddress = [];
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

    sortList: (list, field, dir = 'asc') => {
        if (Utils.isUndefinedOrNullOrEmptyList(list) || Utils.isUndefinedOrNullOrEmpty(field)) {
            return list;
        }
        return list.sort((a, b) => {
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

    getVesionTotal: (version = '0.0.0') => {
        try {
            return Number(`${version}`.split('.').join(''));
        } catch (e) {
            return 0;
        }
    },

    isJson: (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    onlyUniqueFilter: (value, index, self) => {
        return self.indexOf(value) === index;
    },

    // identify update notification
    isValidNotificationData: (remoteMessage) =>
        !Utils.isUndefinedOrNullOrEmptyObject(remoteMessage) &&
        !Utils.isUndefinedOrNullOrEmptyObject(remoteMessage.notification) &&
        !Utils.isUndefinedOrNullOrEmptyObject(remoteMessage.data),

    // identify update notification
    isUpdateNotification: (remoteMessage) => remoteMessage && remoteMessage.data && remoteMessage.data.version && remoteMessage.data.type,

    stringToKey: (str) => {
        if (Utils.isUndefinedOrNullOrEmpty(str)) {
            return null;
        }
        return str.toLowerCase().replace(/ /g, '-');
    },

    // for ScrollView compoent react-native
    isCloseToBottom: ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    },

    // get file name from path
    getFileName: (path) => {
        if (!path) {
            return path;
        }
        try {
            return decodeURIComponent(path)
                .replace(/^.*[\\\/]/, '')
                .split('?')[0];
        } catch (e) {
            return path;
        }
    },

    // get min/hour time
    formatTimeString: (minutes) => {
        if (!Number(minutes)) {
            return minutes;
        }

        if (minutes < 60) {
            return `${minutes} (min)`;
        }
        return `${(minutes / 60).toFixed(2).replace('.00', '')} hr`;
    },

    getDistanceFromLatLonInKm(coordinates1, coordinates2) {
        if (Utils.isUndefinedOrNullOrEmptyList(coordinates1) || Utils.isUndefinedOrNullOrEmptyList(coordinates2)) {
            return null;
        }

        const [lat1, lon1] = coordinates1;
        const [lat2, lon2] = coordinates2; 
        var R = 6371; // Radius of the earth in km
        var dLat = Utils.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = Utils.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Utils.deg2rad(lat1)) * Math.cos(Utils.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d ? `${Math.ceil(d)} km${d > 1 ? 's' : ''}` : d;
    },

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    },
    
    logObject(obj) {
        console.log(JSON.stringify(obj, null, 2));
    },

    removeSpecialChar(str) {
        return str.replace(/[^a-zA-Z1-9]/g, "")
    },

    escapeRegex(string) {
        return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },

    searchANDQuery(string) {
        return string.split(' ').map(str => `"${str}"`).join(' ');
    },

    strToCode(...str) {
        try {
            return str.reduce((total, item) => {
                return total + item.trim().split('').reduce((total2, item2) => {
                    return total2 + item2.charCodeAt(0)
                }, 0);
            }, 0)
        } catch(e) {
            return null;
        }
    },

    generateProductId(sku, createdById, subCategory) {
        const productId = `${sku}-${createdById}-${subCategory}`;
        return productId;
    },

    flatten(object, separator = '.') {

        const isValidObject = value => {
            if (!value) {
                return false
            }
    
            const isArray  = Array.isArray(value)
            const isObject = Object.prototype.toString.call(value) === '[object Object]'
            const hasKeys  = !!Object.keys(value).length
    
            return !isArray && isObject && hasKeys
        }
    
        const walker = (child, path = []) => {
    
            return Object.assign({}, ...Object.keys(child).map(key => isValidObject(child[key])
                ? walker(child[key], path.concat([key]))
                : { [path.concat([key]).join(separator)] : child[key] })
            )
        }
    
        return Object.assign({}, walker(object))
    },

    asyncDispatch(action, dispatch) {
        const promise = new Promise((resolve, reject) => {
            dispatch({
                ...action,
                resolve,
                reject,
            });
        });
        return promise;
    },

    getRandomKey(length = 5, chars = 'aA') {
        let mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; i -= 1) result += mask[Math.round(Math.random() * (mask.length - 1))];
        return result;
    },

    timeToMeridiem(hour) {
        if (Utils.isUndefinedOrNullOrEmpty(hour)) {
            return '';
        }
        return hour >= 12 ? "PM" : "AM";
    },

    hrToTimeMeridiem(hour) {
        if (!hour) {
            return '';
        }
        return `${+hour > 12 ? +hour - 12 : hour} ${Utils.timeToMeridiem(+hour)}`;
    },

    toTitleCase(str) {
        return str.split('_').join(' ').split('-').join(' ').replace(/\s+/g, ' ').replace(
            /\w\S*/g,
            function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        )
    },
};

module.exports = Utils;
