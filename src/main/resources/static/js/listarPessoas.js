$(document).ready(function() {
    $.ajax({
        method: 'get',
        dataType: 'json',
        url: "/user/listar",
        before: () => console.log('before'),
        complete: () => console.log('complete'),
        success: (dados) => {
            dados.map((item, indice) => {

                $("#TabelaOs tbody").append
			    (`
			  <tr id='linha-${item.id}'>
			     <th scope="row">${item.id}</th>
			     <th scope="row">${item.name}</th>
			     <td id='email-${item.id}'>${item.email}</td>
			     <td>
			     	<button class="btn btn-primary description" id="editar-${item.id}">Editar</button>
					 <button class="btn d-none btn-warning description" id="salvar-${item.id}">Salvar</button>
					 <button class="btn btn-danger description" id="deletar-${item.id}">Deletar</button>
			     </td>
			  </tr>
                `)

                let btnEditar = document.getElementById(`editar-${item.id}`)
				let btnSalvar = document.getElementById(`salvar-${item.id}`)
				let btnDeletar = document.getElementById(`deletar-${item.id}`)

			    let email = document.getElementById(`email-${item.id}`)

			    btnEditar.addEventListener('click', (e) => {

    		        email.innerHTML = `<textarea class="form-control" style='align: center' id="textarea-${item.id}" cols="10">${item.email}</textarea>`;
    		        btnEditar.classList.add('d-none');
                    btnSalvar.classList.remove('d-none');
            
				})
				
				btnDeletar.addEventListener('click', (e) => {

					let confirma = confirm(`Tem certeza que deseja deletar o cadastro de ${item.name} ?`);

					if(confirma){
						$.ajax({
							method: 'Delete',
							//dataType: 'json',
							data: {
								id: item.id,
							},
							url: `/user/delete/${item.id}`,
							before: console.log('before'),
							complete: console.log('complete'),
							success: $(`#linha-${item.id}`).fadeOut(),
							error: (erro) => console.log(erro)
						})
					}

				})

                btnSalvar.addEventListener('click', (e) => {
					
					let confirma = confirm(`Tem certeza que deseja atualizar o email de ${item.name} ?`);

					if(confirma){

						let emailAtualizado = document.querySelector(`#textarea-${item.id}`).value
						emailAtualizado.length >= 2 ? item.email = emailAtualizado : ""

	    				$.ajax({
	    					method: 'PUT',
	    					dataType: 'json',
	    					data: {
								id: item.id,
	    						email: emailAtualizado
	    					},
	    					url: `/user/edit/${item.id}`,
	    					before: console.log('before'),
	    					complete: (resposta) => {
								if(resposta.status == 500){
									alert("O email deve ter no mínimo 2 caracteres")
								}
							}
	    				})

					}

					
    				btnSalvar.classList.add("d-none");
					btnEditar.classList.remove("d-none");
					email.innerHTML = `<td id='email-${item.id}'>${item.email}</td>`
                    
                })

			})
			$('#spinners').fadeOut();
			$('#TabelaOs').fadeIn();

            
        },
        error: (erro) => console.log(erro),
    })
});