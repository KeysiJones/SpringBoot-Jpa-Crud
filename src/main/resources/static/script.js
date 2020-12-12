$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/user/listar"
    }).then(function(data) {
       console.log(data);
    });
});