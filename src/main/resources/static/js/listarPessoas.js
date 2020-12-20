$(document).ready(function() {

	const buscarRegistros = () => {
		
		$("#TabelaOs tbody").html('')
		
		let data = ''
		let metodo = 'get'
		let url = "/user/listar"

		if($("#buscar").val() != ''){

			metodo = 'post'
			data = {
				name: $("#buscar").val()
			}
			url = "/user/buscarPorNome"
	
		}

		$.ajax({
			method: metodo,
			dataType: 'json',
			url: url,
			data: data,
			before: () => console.log('before'),
			complete: () => console.log('complete'),
			success: (dados) => {
				
				document.querySelector("#feedbackConsulta").style.display = 'none'
				
				if(dados.length <= 0){
					document.querySelector("#feedbackConsulta").style.display = 'block'
				}

				dados.map((item, indice) => {
	
					$("#TabelaOs tbody").append
					(`
				  <tr id='linha-${item.id}'>
					 <th scope="row"><small>${item.id}</small></th>
					 <td id='name-${item.id}'>${item.name}</th>
					 <td id='email-${item.id}'>${item.email}</td>
					 <td>
						 <button class="btn btn-info description" id="editar-${item.id}">Editar</button>
						 <button class="btn d-none btn-warning description" id="salvar-${item.id}">Salvar</button>
						 <button class="btn btn-danger description" id="deletar-${item.id}">Deletar</button>
					 </td>
				  </tr>
					`)
	
					let btnEditar = document.getElementById(`editar-${item.id}`)
					let btnSalvar = document.getElementById(`salvar-${item.id}`)
					let btnDeletar = document.getElementById(`deletar-${item.id}`)
	
					let email = document.getElementById(`email-${item.id}`)
					let name = document.getElementById(`name-${item.id}`)
	
					btnEditar.addEventListener('click', (e) => {
	
						email.innerHTML = `<input class="form-control" style='align: center' id="input-email-${item.id}" value="${item.email}"></textarea>`;
						name.innerHTML = `<input class="form-control" style='align: center' id="input-name-${item.id}" value="${item.name}"></textarea>`;
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

						btnSalvar.classList.add("d-none");
						btnEditar.classList.remove("d-none");
						email.innerHTML = `<td id='email-${item.id}'>${item.email}</td>`
						name.innerHTML = `<td id='name-${item.id}'>${item.name}</td>`
	
					})
	
					btnSalvar.addEventListener('click', (e) => {
						
						let confirma = confirm(`Tem certeza que deseja atualizar o cadastro de ${item.name} ?`);
	
						if(confirma){
	
							let emailAtualizado = document.querySelector(`#input-email-${item.id}`).value
							emailAtualizado.length >= 5 ? item.email = emailAtualizado : ""
							let nomeAtualizado = document.querySelector(`#input-name-${item.id}`).value
							nomeAtualizado.length >= 5 ? item.name = nomeAtualizado : ""
	
							$.ajax({
								method: 'PUT',
								dataType: 'json',
								data: {
									id: item.id,
									email: emailAtualizado,
									name: nomeAtualizado
								},
								url: `/user/edit/${item.id}`,
								before: console.log('before'),
								complete: (resposta) => {
									if(resposta.status == 500){
										alert("O email e o nome devem ter no mínimo 5 caracteres")
									}
								}
							})
	
						}
	
						
						btnSalvar.classList.add("d-none");
						btnEditar.classList.remove("d-none");
						email.innerHTML = `<td id='email-${item.id}'>${item.email}</td>`
						name.innerHTML = `<td id='name-${item.id}'>${item.name}</td>`
						
					})
	
				})
				$('#spinners').fadeOut();
				$('#TabelaOs').fadeIn();
	
				
			},
			error: (erro) => console.log(erro),
			dataExpression: true
		})
	}
	
	$("#buscar").on('keyup', () => {
		$("#TabelaOs tbody").html('')
		buscarRegistros()
	})

	$("#btn-cadastrar").on('click', () => {
		
		$('#CadastrarModal').modal('show')

		$.ajax({
			method: 'get',
			url: '/add',
			success (dados){
				$("#modal-ajax").html(dados);
			}
		})

	})

	$('#CadastrarModal').on('hide.bs.modal', function (e) {
		buscarRegistros()
	})

	buscarRegistros()
    
});