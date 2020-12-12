$(document).ready(function() {



    $("#form-cadastrar").submit((evento) => {
        evento.preventDefault()


        let nameField = document.querySelector("#form-nome").value;
        let emailField = document.querySelector("#form-email").value;
        let nameError = '';
        let emailError = '';

        $.ajax({
            method: 'post',
            url: "http://localhost:8080/user/add",
            data: $("#form-cadastrar").serialize(),
            before: () => {
            },
            complete: () => {

                console.log(nameField.length, emailField.length)
                console.log("complete")
                if(nameField.length >= 5 && emailField.length >= 5){
                    $("#Cadastrar-Feedback").html("<div class='alert alert-success mt-2 ml-4 mr-4'>Cadastrado com sucesso !</div>");
                    $("#Cadastrar-Feedback").show()
                    return
                } 
                
                if(nameField.length < 5) {
                    nameError = "- O Nome deve ter no mínimo 5 caracteres !<br>"
                }

                if(emailField.length < 5) {
                    emailError = "- O Email deve ter no mínimo 5 caracteres !<br>"
                }

                $("#Cadastrar-Feedback").html(`<div class='alert alert-danger mt-2 ml-4 mr-4'>${emailError + nameError}</div>`);
                $("#Cadastrar-Feedback").show()


            },
            error: (resposta) => {
                console.log(resposta);
            }
        })
    })
        
})