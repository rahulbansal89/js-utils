const Utils = require(".");
const { SETTING_TYPES, AVAILABILITY, DAYS_MAP } = require("./constants");

const Helper = {
    isStoreActive: ({ settings = {} } = {}) => {
        if (Utils.isUndefinedOrNullOrEmptyObject(settings)) {
            return true;
        }
        return settings[SETTING_TYPES.STORE_STATUS] === AVAILABILITY.YES;
    },
    checkIfStoreOpen: ({ settings = {} } = {}) => {
        if (!Helper.isStoreActive({ settings })) {
            return false;
        }
        if (Utils.isUndefinedOrNullOrEmptyObject(settings)) {
            return true;
        }
        if (!settings[SETTING_TYPES.BUSINESS_HOURS]) {
            return true;
        }
        const currHour = new Date().getHours();
        const { open, close, days } = settings[SETTING_TYPES.BUSINESS_HOURS];
        if (Utils.isUndefinedOrNullOrEmpty(open) || Utils.isUndefinedOrNullOrEmpty(close)) {
            return false;
        }
        const inHours = currHour >= open && currHour <= close;
        if (Utils.isUndefinedOrNullOrEmptyList(days) && inHours) {
            return true;
        }
        const currDay = new Date().getDay();
        const inDays = days.indexOf(DAYS_MAP[currDay]) !== -1;
        if (inDays && inHours) {
            return true;
        }
        return false;
    },
    isDeliveryActive: ({ settings = {} } = {}) => {
        if (Utils.isUndefinedOrNullOrEmptyObject(settings)) {
            return true;
        }
        return settings[SETTING_TYPES.STORE_DELIVERY_STATUS] === AVAILABILITY.YES;
    },
    checkIfDeliveryOpen: (supplier = {}) => {
        if (!Helper.isDeliveryActive(supplier)) {
            return false;
        }
        if (Utils.isUndefinedOrNullOrEmptyObject(supplier)) {
            return false;
        }
        const { settings = {} } = supplier;
        // if no settings then always open
        if (Utils.isUndefinedOrNullOrEmptyObject(settings)) {
            return true;
        }
        // if no delivery settings then always open
        if (!settings[SETTING_TYPES.DELIVERY_TIME]) {
            return true;
        }
        const currHour = new Date().getHours();
        const { open, close } = settings[SETTING_TYPES.DELIVERY_TIME];
        if (Utils.isUndefinedOrNullOrEmpty(open) || Utils.isUndefinedOrNullOrEmpty(close)) {
            return false;
        }
        const inHours = currHour >= open && currHour <= close;
        if (inHours) {
            return true;
        }
        return false;
    },
    checkIfDeliveryServicable: (supplier = {}, selectedLocation = {}) => {
        if (!Helper.checkIfStoreOpen(supplier)) {
            return false;
        }
        if (!Helper.checkIfDeliveryOpen(supplier)) {
            return false;
        }
        if (Utils.isUndefinedOrNullOrEmptyObject(supplier)) {
            return false;
        }
        const { settings = {} } = supplier;
        // if no settings then always open
        if (Utils.isUndefinedOrNullOrEmptyObject(settings)) {
            return true;
        }
        // if no restricted delivery setting
        if (!settings[SETTING_TYPES.RESTRITCTED_DELIVERY]) {
            return true;
        }
        // if restricted delivery is here
        // then check if distance is valid
        const { availability, range } = settings[SETTING_TYPES.RESTRITCTED_DELIVERY];
        if (availability === AVAILABILITY.YES) {
            const distance = parseInt(Helper.getDistance(supplier, selectedLocation));
            const restrictedDelivery = parseInt(range);
            if (distance && restrictedDelivery >= distance) {
                return true;
            }
            return false;
        }
        return false;
    },
    getDistance: (supplier = {}, selectedLocation = {}) => {
        if (Utils.isUndefinedOrNullOrEmptyObject(supplier) || Utils.isUndefinedOrNullOrEmptyObject(selectedLocation)) {
            return '';
        }
    
        return Utils.getDistanceFromLatLonInKm(
            supplier.supplierProfile.location && supplier.supplierProfile.location.coordinates,
            selectedLocation && selectedLocation.coordinates,
        ) || '';
    },
    getTaxData: (supplier = {}, product = {}) => {
        if (Utils.isUndefinedOrNullOrEmptyObject(supplier)) {
            return 0;
        }
        const { settings = {} } = supplier;
        if (Utils.isUndefinedOrNullOrEmptyObject(settings)) {
            return 0;
        }
        if (Utils.isUndefinedOrNullOrEmptyObject(product)) {
            return 0;
        }
        const taxRates = settings[SETTING_TYPES.TAX_RATES];
        if (Utils.isUndefinedOrNullOrEmptyList(taxRates)) {
            return 0;
        }
        const { category, subCategory } = product;
        if (!category || !subCategory) {
            return 0;
        }
        return taxRates.find(item => item && item.category && item.subCategory && item.category === category && item.subCategory === subCategory);
    },
};

module.exports = Helper;