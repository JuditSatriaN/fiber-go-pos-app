$(function () {
    initTblProductCart();
});

function addProductCartFmt() {
    return '<a class="add-product-cart" title="Tambah Barang"><i class="fa fa-plus-circle"></i></a>'
}

window.addProductCartEventAction = {
    'click .add-product-cart': function (e, value, row, index) {
        let textString = 'Apakah anda yakin ingin menambahkan item ini?'
        alertify.confirm('Dialog Konfirmasi', textString, function () {
            addProductToTblCart(row);
            $('#modalAddProductCart').modal('hide');
            $('#table-add-product-cart').bootstrapTable('resetView');
        }, null).setting({'labels': {ok: 'Ya', cancel: 'Tidak'}});
    }
}

function initTblProductCart() {
    $('#table-add-product-cart').bootstrapTable({
        locale: $('#locale').val(),
        formatNoMatches: function () {
            return 'No data found';
        },
        columns: [
            [
                {
                    width: 200,
                    field: 'plu',
                    align: 'left',
                    widthUnit: "px",
                    valign: 'middle',
                    title: 'PLU',
                },
                {
                    width: 200,
                    field: 'unit_name',
                    align: 'left',
                    widthUnit: "px",
                    valign: 'middle',
                    title: 'Nama Satuan',
                },
                {
                    width: 150,
                    title: 'PCS',
                    align: 'left',
                    widthUnit: "px",
                    valign: 'middle',
                    field: 'multiplier',
                },
                {
                    width: 250,
                    align: 'left',
                    title: 'Harga',
                    widthUnit: "px",
                    valign: 'middle',
                    field: 'total_real_price',
                    formatter: priceFormatter,
                },
                {
                    width: 200,
                    align: 'left',
                    widthUnit: "px",
                    valign: 'middle',
                    title: 'Harga/PCS',
                    field: 'real_price',
                    formatter: priceFormatter
                },
                {
                    width: 200,
                    title: 'Action',
                    field: 'action',
                    align: 'center',
                    clickToSelect: false,
                    formatter: addProductCartFmt,
                    events: window.addProductCartEventAction,
                }
            ],
        ]
    });
}

// function headerTblAddMember(column) {
//     return {
//         id: {
//             css: {
//                 background: '#34b9f9',
//                 color: '#FFFFFF'
//             }
//         },
//         name: {
//             css: {
//                 background: '#34b9f9',
//                 color: '#FFFFFF'
//             }
//         },
//         action: {
//             css: {
//                 background: '#34b9f9',
//                 color: '#FFFFFF'
//             }
//         }
//     }[column.field]
// }