const btnForm = document.querySelectorAll('.btnForm');
const formularios = document.querySelectorAll('.transacao');
const editoresBg = document.querySelector('#editores');

function addAtivo(item) {
  btnForm.forEach((i) => {
    if (i !== item) {
      i.classList.remove('ativo');
    }
  });
  item.classList.add('ativo');
  document.body.style.overflow = 'hidden';

  formularios.forEach((formulario) => {
    if (formulario.getAttribute('value') == item.value) {
      formulario.classList.toggle('ativo');
    } else {
      formulario.classList.remove('ativo');
    }
  });
}

btnForm.forEach((item) => {
  item.addEventListener('click', () => {
    addAtivo(item);
  });
});

// remover ativo

formularios.forEach((i, n) => {
  const formTransacao = document.querySelectorAll('.transacao');
  const financas = formTransacao[n].querySelector('.financas');
  formTransacao[n].addEventListener('click', (event) => {
    const itemClicado = event.target;
    if (!financas.contains(itemClicado)) {
      itemClicado.classList.remove('ativo');
      document.body.style.overflow = 'auto';
    }
    if (itemClicado.id === 'fecharForm') {
      itemClicado.offsetParent.offsetParent.classList.remove('ativo');
      document.body.style.overflow = 'auto';
    }
  });
});

// ativar form de edição

const labeldeAtivação = document.querySelector('#movimentacoes-conteudo');

labeldeAtivação.addEventListener('click', function (e) {
  let itemClicado = e.target;

  if (itemClicado.classList.contains('movimentacoesLista')) {
    const numero = itemClicado.getAttribute('numero');
    const formEdit = document.querySelector(`.numero${numero}`);
    formEdit.classList.add('ativo');
    return;
  }
  itemClicado = itemClicado.parentElement;
  if (itemClicado.classList.contains('movimentacoesLista')) {
    const numero = itemClicado.getAttribute('numero');
    const formEdit = document.querySelector(`.numero${numero}`);
    formEdit.classList.add('ativo');
    return;
  }
});

// remover ativo do editor

editoresBg.addEventListener('click', function (e) {
  const itemClicado = e.target;

  let formAtivo = editoresBg.querySelector('.editValueBg.ativo');
  let div = formAtivo.querySelector('.editValue');
  const fechar = formAtivo.querySelector('#fecharEdit');
  const numero = div.getAttribute('numero');
  const formDelete = document.querySelector(`#form${numero}`);

  if (!div.contains(itemClicado) && !formDelete.contains(itemClicado)) {
    formDelete.classList.remove('ativo');
    formAtivo.classList.remove('ativo');
    return;
  } else if (fechar.contains(e.target)) {
    formDelete.classList.remove('ativo');
    formAtivo.classList.remove('ativo');
    return;
  }
});
