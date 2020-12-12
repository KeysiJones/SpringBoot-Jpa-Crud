$(document).ready(function() {

    $("#form-cadastrar").submit((evento) => {

        evento.preventDefault()

        $.ajax({
            method: 'post',
            url: "http://localhost:8080/user/add",
            data: $("#form-cadastrar").serialize(),
            before: (resposta) => console.log(resposta),
            complete: (resposta) => console.log(resposta),
            success: (resposta) => console.log(resposta),
            error: (resposta) => console.log(resposta)
        })
    })
        
})