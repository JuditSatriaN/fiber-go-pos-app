let totalPay = 0;
let totalItemGlobalVal = 0;
let totalPPNGlobalVal = 0;
let totalPriceGlobalVal = 0;
let totalPurchaseGlobalVal = 0;
let totalDiscountGlobalVal = 0;


function setTotalPayGlobal(total) {
    totalPay = total
}

function getTotalPayGlobal() {
    return totalPay
}

function setTotalPPNGlobal(total) {
    totalPPNGlobalVal = total
}

function getTotalPPNGlobal() {
    return totalPPNGlobalVal
}

function setTotalItemGlobalVal(total) {
    totalItemGlobalVal = total
}

function getTotalItemGlobalVal() {
    return totalItemGlobalVal
}

function setTotalPriceGlobalVal(total) {
    totalPriceGlobalVal = total
}

function getTotalPriceGlobalVal() {
    return totalPriceGlobalVal
}

function setTotalPurchaseGlobalVal(total) {
    totalPurchaseGlobalVal = total
}

function getTotalPurchaseGlobalVal() {
    return totalPurchaseGlobalVal
}

function setTotalDiscountGlobalVal(total) {
    totalDiscountGlobalVal = total
}

function getTotalDiscountGlobalVal() {
    return totalDiscountGlobalVal
}

function resetAllGlobalVal() {
    totalPay = 0;
    totalPPNGlobalVal = 0;
    totalItemGlobalVal = 0;
    totalPriceGlobalVal = 0;
    totalPurchaseGlobalVal = 0;
    totalDiscountGlobalVal = 0;
}