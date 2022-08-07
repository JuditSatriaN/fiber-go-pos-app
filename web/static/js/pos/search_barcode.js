document.querySelector('#search_product').addEventListener('keypress', function (e) {
    e.stopImmediatePropagation();
    if (e.key === 'Enter') {
        getProductFromTextField(this.value)
    }
});


function getProductFromTextField(search) {
    let serverURL = $('#serverURL').text();
    $.ajax({
        'method': "GET",
        'contentType': 'application/json',
        'url': serverURL + "api/search_inventory",
        "data": {
            "search": search,
        },
    }).done(function (data) {
        $.each(data, function( index, value ) {
            value["real_price"] = ($("#member-id").val() === "") ? value["price"] : value["member_price"];
            value["total_real_price"] = value["real_price"] * value["multiplier"];
        });
        addProductFromSearch(data)
    }).catch(function (a) {
        alertify.alert('Pesan Dialog', buildErrorMessage(a.responseJSON["message"]));
    });
}

function addProductFromSearch(row) {
    $('#search_product').val('');
    if (row.length === 1) {
        addProductToTblCart(row[0]);
        return false
    }
    $('#modalAddProductCart').modal('show');
    $("#table-add-product-cart").bootstrapTable('load', row)

}