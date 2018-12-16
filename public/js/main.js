$(document).ready(function () {
    $(".deleteUser").on('click', deleteUser);
});

function deleteUser() {
    var confirmation = confirm("Are you sure you want to delete user " + $(this).data("id"));

    if (confirmation) {
        $.ajax({
            type: 'delete',
            url: 'users/delete/' + $(this).data('id'),
            dataType: 'text',
        })
        .error(err => console.log(err))
        .complete((res) => {
            alert("DELETED");
            console.log("Deleted user " + res);
        });

        window.location.replace('/');
    } else {
        return false;
    }
}