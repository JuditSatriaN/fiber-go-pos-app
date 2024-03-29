function openPaymentModal() {
    if (getTotalDataCarts() === 0) {
        alertify.alert('Pesan Dialog', "Harap lakukan transaksi terlebih dahulu");
        return false
    }
    $('#modalPayment').modal('show');
    getInvoicePayment();
    $('#modalPayment #totalTransaction').val($("#totalPembelian").text());
    $("#modalPayment #totalPayment").val("0");
    $("#modalPayment #totalPayment").trigger("change");

    let totalPayment = convertIDRToNumber($("#modalPayment #totalPayment").val());
    let totalTransaction = convertIDRToNumber($("#modalPayment #totalTransaction").val());
    let change = totalPayment - totalTransaction;
    addStructItem();
    $("#modalPayment #numeric_change").val(change);
    $("#modalPayment #change").val(formatIDR(change));
}

function buttonConsumerMoney(money) {
    $("#modalPayment #totalPayment").val(money)
    $("#modalPayment #totalPayment").trigger("change")
}

$("#modalPayment #totalPayment").on("change", function () {
    $(this).val(formatPrice($(this).val()))

    let totalPayment = convertIDRToNumber($(this).val());
    let totalTransaction = convertIDRToNumber($("#modalPayment #totalTransaction").val());

    let change = totalPayment - totalTransaction
    $("#modalPayment #numeric_change").val(change)
    $("#modalPayment #change").val(formatIDR(change))
});

$("#modalPayment #totalPayment").on("keydown", function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function getInvoicePayment() {
    let serverURL = $('#serverURL').text();
    axios.get(serverURL + 'api/invoice/generate_invoice').then(function (result) {
        $("#modalPayment #invoice").html("Faktur : " + result.data.data);
        $("#modalPayment #invoice-value").val(result.data.data)
    }).catch(function (err) {
        $('#modalPayment').modal('hide');
        buildErrorPopup("Gagal mendapatkan faktur, Harap hubungi admin");
    });
}

function processPayment() {
    let change = parseFloat($("#modalPayment #numeric_change").val().trim());
    if (change < 0) {
        alert("Transaksi invalid. Uang yang anda masukkan kurang dari total pembelian");
        return false
    }
    sendDataToAPI()
}

function addStructItem() {
    let htmlStruct = ``
    for (let index in getAllDataCarts()) {
        let cart = getDataCartByIndex(index)
        htmlStruct += `<div class="row">  
                       <div class="col-3">` + cart["name"].toString() + `</div>
                       <div class="col-2" style="text-align: center;">` + cart["unit_name"].toString() + `</div>
                       <div class="col-2" style="text-align: right;">` + formatQty(cart["qty"]) + `</div>
                       <div class="col-2" style="text-align: right;">` + priceFormatter(cart["price_used"]) + `</div>
                       <div class="col-3" style="text-align: right;">` + priceFormatter(cart["final_total"]) + `</div>
                        </div>`
    }
    $("#modalPayment #content-items").html(htmlStruct);
    let date = new Date();
    let dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + "/" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
    $("#modalPayment #dateNow").html(dateStr);
    $("#modalPayment #cashier-struct").html("Kasir : " + sessionStorage.getItem("full_name").toString());
}

function sendDataToAPI() {
    let salesDetail = [];
    let userID = sessionStorage.getItem("user_id");
    let memberID = $("#member-id").val()
    let invoice = $("#modalPayment #invoice-value").val()

    let memberIDInt = 0
    if (memberID !== "") {
        memberIDInt = parseInt(memberID)
    }

    for (let i = 0; i < getTotalDataCarts(); i++) {
        let product = getDataCartByIndex(i)
        salesDetail.push({
            "invoice": invoice,
            "user_id": userID,
            "plu": product["plu"],
            "name": product["name"],
            "unit_name": product["unit_name"],
            "barcode": product["barcode"],
            "ppn": product["ppn"],
            "qty": product["qty"],
            "price": product["price_used"],
            "purchase": product["purchase"],
            "discount": product["discount"],
            "inventory_id": product["id"],
            "member_id": memberIDInt,
        });
    }

    let salesHead = {
        "invoice": invoice,
        "user_id": userID,
        "total_tax": getTotalPPNGlobal(),
        "total_pay": getTotalPayGlobal(),
        "total_item": getTotalItemGlobalVal(),
        "total_price": getTotalPriceGlobalVal(),
        "total_purchase": getTotalPurchaseGlobalVal(),
        "total_discount": getTotalDiscountGlobalVal(),
    }

    let data = {"sales_head": salesHead, "sales_detail": salesDetail}
    processSalesAjaxRequest(data)
}

async function sendSalesRequest(data) {
    let serverURL = $('#serverURL').text();
    return await axios({
        url: serverURL + "api/sales",
        data: data,
        method: 'POST',
    })
}

function processSalesAjaxRequest(data) {
    let loadingIndicator = $('body').loadingIndicator().data("loadingIndicator");

    sendSalesRequest(data).then(function (results) {
        alertify.success("Transaksi Berhasil");
        $('#modalPayment').modal('hide');
        resetCurrentTransaction()
    }).catch(function (err) {
        buildErrorPopup(err.response.data.message);
    }).finally(function () {
        loadingIndicator.hide();
    });
}