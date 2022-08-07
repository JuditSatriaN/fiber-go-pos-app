let dataCarts = []

function getAllDataCarts() {
    return dataCarts
}

function getDataCartByIndex(index) {
    return dataCarts[index]
}

function getTotalDataCarts() {
    return dataCarts.length
}

function checkDataCartFromID(id) {
    const checkID = element => element.id === id;
    return dataCarts.some(checkID)
}

function insertDataCart(data) {
    dataCarts[dataCarts.length] = data;
}

function updateQtyDataCart(index, qty) {
    dataCarts[index]["qty"] = qty;

    let data = dataCarts[index];
    dataCarts[index]["total"] = data["price_used"] * data["qty"];
}

function removeAllDataCart() {
    dataCarts = []
}
