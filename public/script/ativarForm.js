const btnForm = document.querySelectorAll('.btnForm');
const formularios = document.querySelectorAll('.transacao');

function addAtivo(item) {
  btnForm.forEach((i) => {
    if (i !== item) {
      i.classList.remove('ativo');
    }
  });
  item.classList.add('ativo');
  document.body.style.overflow = 'hidden';

  formularios.forEach((formulario) => {
    console.log(formulario);
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
