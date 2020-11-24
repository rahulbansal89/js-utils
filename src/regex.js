import Utils from "./index";

export const Regex = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    mobile: /^[6789]{1}\d{9}$/,
    year: /^\d{4}$/,
    pincode: /^\d{6}$/,
    pancard: /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/,
    gst: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/,
    plainEmail: /.+@.+/,
    longText: /^(?!\.)(?=.*[a-zA-Z]).{1,80}$/,
    accountName: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    name: /^([a-zA-Z. ]){1,}[a-zA-Z0-9]{1,20}$/,
    stringOnly: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
    percentage: /^[0-9]{0,2}(?:\.[0-9]{1,2})?$|^(100)(?:\.[0]{0,2})?$/,
    location: /(^[1-9][0-9]{5}$)|(.*[a-zA-Z].*[a-zA-Z].*)/,
    otp: /^[0-9]{6}$/,
    amount: /^([1-9]{1},?.?){1,50}$/,
    turnover: /^(,?\d{1},?){0,8}$/,
    PAGING_REGEX_QUERY: /page=[0-9]+/,
    numberOnly: /^[0-9]*$/
};

export const Refinements = (t) => ({
    emailEmptyAllowed: t.refinement(t.maybe(t.String), (s) => Utils.isUndefinedOrNullOrEmpty(s) || Regex.plainEmail.test(s)),
    email: t.refinement(t.String, (s) => Regex.email.test(s)),
    mobile: t.refinement(t.String, (s) => Regex.mobile.test(s)),
    pinCode: t.refinement(t.String, (s) => Regex.pincode.test(s)),
    year: t.refinement(t.String, (s) => Regex.year.test(s)),
    pancard: t.refinement(t.String, (s) => Regex.pancard.test(s)),
    gst: t.refinement(t.maybe(t.String), (s) => (!Utils.isUndefinedOrNullOrEmpty(s) ? Regex.gst.test(s) : true)),
    longText: t.refinement(t.String, (s) => Regex.longText.test(s)),
    accountName: t.refinement(t.String, (s) => Regex.accountName.test(s)),
    name: t.refinement(t.String, (s) => Regex.name.test(s)),
    stringOnly: t.refinement(t.String, (s) => Regex.stringOnly.test(s)),
    hasPositiveNumericValue: t.refinement(t.Number, (s) => s > 0),
    percentage: t.refinement(t.String, (s) => !Utils.isUndefinedOrNullOrEmpty(s) && Regex.percentage.test(s)),
    amount: t.refinement(t.Number, (s) => Regex.amount.test(s)),
    turnover: t.refinement(t.Number, (s) => Regex.turnover.test(s)),
    validOtp: t.refinement(t.String, (s) => Regex.otp.test(s)),
    amountExceptZero: t.refinement(t.Number, (s) => {
        if (!s) {
            return false;
        }
        const num = Number(Utils.replaceString(s, ',', ''));
        if (Number.isNaN(num)) {
            return false;
        }
        return num > 0;
    }),
})