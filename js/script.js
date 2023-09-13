const listaDeRecados = document.querySelector('.messages-list');

async function deletarRecado(messageId) {
  try {
    await api.delete(`/messages/${messageId}`)
  } catch (error) {
    console.log('Erro no delete!');
  }
}

async function listarRecados() {
  try {
    const response = await api.get('/messages/76bb1fc7-bbd5-400a-950c-0a4e5f74eaa6')
    const buscarRecados = response.data

    buscarRecados.forEach(buscarRecado => {
      const mostrarRecado = document.createElement('div');
      mostrarRecado.classList.add('card');

      console.log(buscarRecado)

      mostrarRecado.innerHTML = `
        <h2 class="card-title">${buscarRecado.title}</h2>
        <p class="card-description">${buscarRecado.description}</p>
        <div class="card-icons">
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash" data-id="${buscarRecado.id}"></i>
        </div>
        `
      listaDeRecados.appendChild(mostrarRecado)

      const iconDelete = mostrarRecado.querySelector('.fa-trash')

      iconDelete.addEventListener(('click'), function () {
        const messageId = iconDelete.getAttribute('data-id')
        deletarRecado(messageId)
      })
    })
  } catch (error) {
    console.log(`Erro ao buscar: ${error}`)
  }
}

listarRecados()