const categoriaValor = document.querySelectorAll('.valorCategoria');
const categoriaUl = document.querySelectorAll('.categoriaEscolha');

let categoriasArrayDespesa = [
  'Produtos Eletronicos',
  'Roupas',
  'Contas',
  'Transporte',
  'Despesas médicas',
  'Cuidados pessoais',
  'Entretenimento',
  'Remédio',
  'Alimentação',
  'Cosmeticos',
];
let categoriasArrayReceita = [
  'Salário',
  'Investimentos',
  'Vendas',
  'Comissões',
  'Aluguel',
  'Reembolso',
  'Juros',
];

// adicionar novas categorias a despesas e receitas

categoriaValor.forEach((i, n) => {
  i.addEventListener('click', function () {
    this.classList.toggle('ativo');
    categoriaUl[n].classList.toggle('ativo');
  });
});

categoriasArrayDespesa.forEach((i) => {
  const li = document.createElement('li');
  li.classList.add('valoresCategoria');
  li.innerText = i;
  categoriaUl[0].append(li);
});
categoriasArrayReceita.forEach((i) => {
  const li = document.createElement('li');
  li.classList.add('valoresCategoria');
  li.innerText = i;
  categoriaUl[1].append(li);
});

categoriaUl.forEach((i) => {
  // FUNCAO PARA ADICIONAR UM NOVO LI NA CATEGORIA
  const botaoAdicionar = i.querySelector('#novaCategoria');
  const btnDeletar = i.querySelector('#ApagarCategoria');
  const Lis = i.querySelectorAll('li');
  // FUNCAO PARA ADICIONAR O INPUT DE TEXTO
  i.addEventListener('click', function (e) {
    if (e.target.id === 'novaCategoria') {
      const input = document.createElement('input');
      input.classList.add('novoValor');

      botaoAdicionar.classList.toggle('ativo');
      btnDeletar.toggleAttribute('disabled');
      if (botaoAdicionar.classList.contains('ativo')) {
        this.appendChild(input);
      }
      if (!botaoAdicionar.classList.contains('ativo')) {
        const novoInput = this.querySelector('.novoValor');

        // REMOVE INPUT PREENCHIDO E ADICIONA A lI COM O VALOR
        if (novoInput.value !== '' && novoInput.value !== ' ') {
          const li = document.createElement('li');
          li.classList.add('valoresCategoria');
          const valorDoInput = novoInput.value;
          li.innerText = valorDoInput;
          this.appendChild(li);
          novoInput.remove();
          storage();
        } else {
          // REMOVE INPUT VAZIO
          novoInput.remove();
        }
      }
    }
  });

  // FUNCAO PARA ADICIONAR A LIXEIRA AO LADO DO LI
  i.addEventListener('click', function (e) {
    const Lis = i.querySelectorAll('li');

    if (e.target.id === 'ApagarCategoria') {
      btnDeletar.classList.toggle('ativo');
      Lis.forEach((i) => {
        i.classList.toggle('ativo');
      });
      botaoAdicionar.toggleAttribute('disabled');
    }
  });

  // FUNCAO PARA APAGAR LIS
  i.addEventListener('click', function (e) {
    if (btnDeletar.classList.contains('ativo') && e.target.nodeName === 'LI') {
      e.target.remove();
      storage();
    }
  });

  // FUNCAO PARA ADICIONAR O VALOR CLICADO NO INPUT
  i.addEventListener('click', function (e) {
    if (!btnDeletar.classList.contains('ativo') && e.target.nodeName === 'LI') {
      const input =
        e.target.offsetParent.offsetParent.querySelector('.valorCategoria');
      const valorClicado = e.target.innerText;
      input.value = valorClicado;

      this.classList.remove('ativo');
      input.classList.remove('ativo');
    }
  });
});
