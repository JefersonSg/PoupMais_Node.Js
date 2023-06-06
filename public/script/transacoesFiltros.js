const table = document.querySelector('.tabela-transacoes');

const edits = document.getElementById('editores');
const transacoesTotaisBg = document.querySelector('.transacoesTotais-bg');

const filtroDespesa = transacoesTotaisBg.querySelector('.filtro-despesa');
const filtroReceita = transacoesTotaisBg.querySelector('.filtro-receita');
const filtroTransferencia = transacoesTotaisBg.querySelector(
  '.filtro-transferencia',
);
const filtroEmprestimo = transacoesTotaisBg.querySelector('.filtro-emprestimo');
const movimentacoesListas = transacoesTotaisBg.querySelectorAll(
  '.movimentacoesLista',
);
const barraPesquisa = document.querySelector('.pesquisa');
const lupa = document.querySelector('.lupa ');

let categoriaAtual = '';
let ultimoDigito = '';

barraPesquisa.addEventListener('keydown', () => {
  if (barraPesquisa.value === '') {
    lupa.style.display = 'none';
  }
});

barraPesquisa.addEventListener('keyup', () => {
  ultimoDigito = barraPesquisa.value;

  function filter(categoria, label) {
    if (categoriaAtual === categoria && barraPesquisa.value !== '') {
      movimentacoesListas.forEach((i) => {
        if (i.id === label) {
          const nome = i.querySelector('#nomeMov').innerText;

          if (!nome.includes(ultimoDigito)) {
            i.style.display = 'none';
          } else {
            i.style.display = 'grid';
          }
        }
      });
    } else if (categoriaAtual === categoria && barraPesquisa.value === '') {
      lupa.style.display = 'block';
      movimentacoesListas.forEach((i) => {
        if (i.id === label) {
          i.style.display = 'grid';
        }
      });
    }
  }
  function filterAll() {
    if (barraPesquisa.value !== '') {
      movimentacoesListas.forEach((i) => {
        const nome = i.querySelector('#nomeMov').innerText;

        if (!nome.includes(ultimoDigito)) {
          i.style.display = 'none';
        } else {
          i.style.display = 'grid';
        }
      });
    } else if (categoriaAtual === '' && barraPesquisa.value === '') {
      lupa.style.display = 'block';
      movimentacoesListas.forEach((i) => {
        i.style.display = 'grid';
      });
    }
  }

  if (categoriaAtual === 'despesa') {
    filter('despesa', 'despesaLabel');
  } else if (categoriaAtual === 'receita') {
    filter('receita', 'receitaLabel');
  } else if (categoriaAtual === 'transferencia') {
    filter('transferencia', 'transferenciaLabel');
  } else if (categoriaAtual === 'emprestimo') {
    filter('emprestimo', 'emprestimoLabel');
  } else {
    filterAll();
  }
});

function filter(categoria, label) {
  if (categoriaAtual !== categoria) {
    movimentacoesListas.forEach((i) => {
      i.style.display = 'none';
      const digitos = i.querySelector('#nomeMov');
      if (i.id === label) {
        i.style.display = 'grid';
        if (
          barraPesquisa.value !== '' &&
          !digitos.innerText.includes(barraPesquisa.value)
        ) {
          i.style.display = 'none';
        }
      }
    });
    categoriaAtual = categoria;
  } else if (categoriaAtual === categoria) {
    movimentacoesListas.forEach((i) => {
      const digitos = i.querySelector('#nomeMov');
      if (barraPesquisa.value === '' && i.id !== label) {
        i.style.display = i.style.display == 'grid' ? 'none' : 'grid';
      } else if (
        barraPesquisa.value !== '' &&
        i.id !== label &&
        digitos.innerText.includes(barraPesquisa.value)
      ) {
        i.style.display = 'grid';
      }
    });
    categoriaAtual = '';
  }
}

function addAtivo(item) {
  filtroBtn.forEach((i) => {
    if (i !== item) {
      i.classList.remove('ativo');
    }
  });
  item.classList.toggle('ativo');
}

const filtroBtn = document.querySelectorAll('.filtroBtn');

filtroBtn.forEach((item) => {
  item.addEventListener('click', () => {
    addAtivo(item);
  });
});

filtroDespesa.addEventListener('click', function () {
  filter('despesa', 'despesaLabel');
});
filtroReceita.addEventListener('click', () => {
  filter('receita', 'receitaLabel');
});
filtroTransferencia.addEventListener('click', () => {
  filter('transferencia', 'transferenciaLabel');
});
filtroEmprestimo.addEventListener('click', () => {
  filter('emprestimo', 'emprestimoLabel');
});

// Editar os selects

const despesaCategorias = document.querySelector('.categoriasGasto');
const ReceitaCategorias = document.querySelector('.categoriasReceita');
const despesaLabelEdit = document.querySelectorAll('#despesaLabelEdit');
const receitaLabelEdit = document.querySelectorAll('#receitaLabelEdit');

despesaLabelEdit.forEach((label) => {
  const selectCategoria = label.querySelector('#categoriaEdit');

  const categorias = despesaCategorias.querySelectorAll('li');

  categorias.forEach((categoria) => {
    const opt = document.createElement('option');
    opt.innerText = categoria.innerText;

    selectCategoria.appendChild(opt);
  });
});

receitaLabelEdit.forEach((label) => {
  const selectCategoria = label.querySelector('#categoriaEdit');

  const categorias = ReceitaCategorias.querySelectorAll('li');

  categorias.forEach((categoria) => {
    const opt = document.createElement('option');
    opt.innerText = categoria.innerText;

    selectCategoria.appendChild(opt);
  });
});
