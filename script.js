document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById('materiaInput');
  const addBtn = document.getElementById('addBtn');
  const lista = document.getElementById('listaMaterias');
  const mensagem = document.getElementById('mensagem');

  function criarMateria(texto) {
    const li = document.createElement('li');

    // Ícone PNG/PDF
    const img = document.createElement('img');
    img.src = 'livro.png'; // ou 'arquivo.pdf' se for PDF visualizável como ícone
    img.alt = 'Livro';
    li.appendChild(img);

    // Texto da matéria
    const span = document.createElement('span');
    span.textContent = texto;
    span.classList.add('pendente');
    li.appendChild(span);

    const botoes = document.createElement('div');
    botoes.classList.add('botoes');

    // Editar
    const editar = document.createElement('button');
    editar.textContent = '✏️';
    editar.onclick = () => {
      const novoTexto = prompt('Edite a matéria:', span.textContent);
      if(novoTexto && novoTexto.length >= 5) {
        span.textContent = novoTexto;
      } else if(novoTexto) {
        alert('Erro: menos que 5 letras');
      }
    }

    // Excluir
    const excluir = document.createElement('button');
    excluir.textContent = '🗑️';
    excluir.onclick = () => li.remove();

    // Concluir
    const concluir = document.createElement('button');
    concluir.textContent = '✅';
    concluir.onclick = () => {
      span.classList.remove('pendente');
      span.classList.add('concluido');
    }

    // Pendente
    const pendenteBtn = document.createElement('button');
    pendenteBtn.textContent = '🔴';
    pendenteBtn.onclick = () => {
      span.classList.remove('concluido');
      span.classList.add('pendente');
    }

    // Subir
    const subir = document.createElement('button');
    subir.textContent = '⬆️';
    subir.classList.add('subir');

    // Descer
    const descer = document.createElement('button');
    descer.textContent = '⬇️';
    descer.classList.add('descer');

    [editar, excluir, concluir, pendenteBtn, subir, descer].forEach(btn => botoes.appendChild(btn));
    li.appendChild(botoes);

    lista.appendChild(li);
  }

  // Delegação de eventos para subir e descer
  lista.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('subir')) {
      const prev = li.previousElementSibling;
      if(prev) lista.insertBefore(li, prev);
    } else if (e.target.classList.contains('descer')) {
      const next = li.nextElementSibling;
      if(next) lista.insertBefore(next, li);
    }
  });

  addBtn.onclick = () => {
    const texto = input.value.trim();
    if(texto.length < 5) {
      mensagem.textContent = 'Erro: menos que 5 letras';
      return;
    }
    mensagem.textContent = '';
    criarMateria(texto);
    input.value = '';
    input.focus();
  }
});