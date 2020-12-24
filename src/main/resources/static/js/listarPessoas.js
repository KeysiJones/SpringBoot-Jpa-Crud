$(document).ready(function() {

	const buscarRegistros = (pagina) => {

		$("#TabelaOs tbody").html('')
		let url = `/user/listar/${window.location.search}`
		let data = {}
		let metodo = 'get'
		data.pagina = 0;
		//A página é passada por parâmetro ao chamar o método buscarRegistros, por isso precisa desta condição
		if(pagina) {
			data.pagina = pagina
		}

		if($("#buscar").val() != '') {
			data.name = $("#buscar").val()
		}

		$.ajax({
			method: metodo,
			dataType: 'json',
			url: url,
			data: data,
			before: () => console.log('before'),
			complete: () => console.log('complete'),
			success: (dados) => {
				
				$('#paginacao').html('');

				//Mostra a paginação quando existem mais de uma página
				if(dados.totalPages > 1) {
					
					let parametros = window.location.search;

					parametros = parametros.split("&");
					let url = ''
					parametros.map((item, indice) => {
						if(item.includes('pagina')) {
							parametros[indice] = ''
						}
					})

					parametros.map((item, indice) => {
						url += item
					})

					console.log(url)
					let classe = dados.number <= 0  ? 'disabled' : ''

					$('#paginacao').append(`
					<li class="page-item ${classe}" id='previous'>
						<button class="page-link" aria-label="Previous">
					  		<span aria-hidden="true">&laquo;</span>
					  		<span class="sr-only">Previous</span>
						</button>
					  </li>
					`);

					for (let i = 0; i < dados.totalPages; i++) {
						$('#paginacao').append(`<li class="page-item"><button class="page-link" id="pagina-${i+1}">${i+1}</button></li>`)
					}


					classe = dados.number + 1 >= dados.totalPages ? 'disabled' : ''

					$('#paginacao').append(`
					<li class="page-item ${classe}" id='next'">
						<button class="page-link" aria-label="Next">
					  		<span aria-hidden="true">&raquo;</span>
					  		<span class="sr-only">Next</span>
						</button>
				  	</li>
					`)

				}
				
				document.querySelector("#feedbackConsulta").style.display = 'none'
				
				if (dados.content.length <= 0) {
					document.querySelector("#feedbackConsulta").style.display = 'block'
				}

				if (document.querySelector(`#pagina-1`)) {
					for (let i = 0; i < dados.totalPages; i++) {
						document.querySelector(`#pagina-${i+1}`).addEventListener('click', () => {
							buscarRegistros(i)
						})
					}

					$("#previous").on('click', () => {
						if(dados.number > 0){
							buscarRegistros(dados.number - 1)
						}
					})

					$("#next").on('click', () => {
						if(dados.number + 1 < dados.totalPages){
							buscarRegistros(dados.number + 1)
						}
					})
					
					document.querySelector(`#pagina-${dados.number+1}`).style.backgroundColor = '#5bff81'
					document.querySelector(`#pagina-${dados.number+1}`).style.color = 'white'
				}

				let filtros = document.querySelectorAll("#filter > button");
					
				filtros.forEach((item) => {
					item.addEventListener('click', () => {
						let name = $("#buscar").val()
						let url = `/?limite=${item.innerText}`
						if(name != '') {
							url = `/?limite=${item.innerText}&name=${name}`
						}

						window.location.href = url
					})
				})

				dados.content.map((item, indice) => {
	
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