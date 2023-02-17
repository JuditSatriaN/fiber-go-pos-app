function buttonPopupVoidModal(){
    alertify.confirm('Dialog Konfirmasi', 'Apakah anda yakin ingin membatalkan transaksi ini?', function () {
        openPopupVoidPrompt()
    }, null).setting({'labels': {ok: 'Ya', cancel: 'Tidak'}});
}

function openPopupVoidPrompt(){
    $('#modalPayment').modal('hide');

    let serverURL = $('#serverURL').text();

    Swal.fire({
        input: 'text',
        title: 'Masukkan password void',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonText: 'Submit',
        preConfirm: (request) => {
            return axios.get(serverURL + 'api/get_key_void').then(function (response) {
                if (response.data["value"] !== request){
                    Swal.showValidationMessage('Password yang anda masukkan tidak sesuai!');
                    return
                }
                alertify.success("Transaksi ini berhasil di hapus");
                resetCurrentTransaction()
            }).catch(function (err) {
                Swal.showValidationMessage('Error mendapatkan data ke server');
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
}