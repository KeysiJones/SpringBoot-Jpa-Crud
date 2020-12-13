$(document).ready(function() {
    $.ajax({
        url: "/user/listar"
    }).then(function(data) {
       console.log(data);
    });
});