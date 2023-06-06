const Editores = document.querySelectorAll('.editValue');
const EditoresBg = document.querySelector('#editores');
const despesaUl = document.querySelector('.categoriaEscolhaDespesa');
const receitaUl = document.querySelector('.categoriaEscolhaReceita');
const despesaEdit = document.querySelectorAll('#despesaLabelEdit');
const receitaEdit = document.querySelectorAll('#receitaLabelEdit');
const movimentacoesLista = document.querySelectorAll('.movimentacoesLista');
const sobrenome = document.querySelector('.sobrenome');

const sobrenomeTexto = sobrenome.innerText.slice(0, 1) + '.';

sobrenome.innerText = sobrenomeTexto;

if (despesaUl) {
  const lisDespesa = despesaUl.querySelectorAll('li');
  despesaEdit.forEach((edit) => {
    const select = edit.querySelector('#categoriaEdit');
    lisDespesa.forEach((li) => {
      const opt = document.createElement('option');

      opt.innerText = li.innerText;

      select.appendChild(opt);
    });
  });
}

if (receitaUl) {
  const lisReceitas = receitaUl.querySelectorAll('li');

  receitaEdit.forEach((edit) => {
    const select = edit.querySelector('#categoriaEdit');

    lisReceitas.forEach((li) => {
      const opt = document.createElement('option');

      opt.innerText = li.innerText;

      select.appendChild(opt);
    });
  });
}

Editores.forEach((editor) => {
  const btn = editor.querySelector('#editar');
  const inputs = editor.querySelectorAll('input');
  const selects = editor.querySelectorAll('select');
  const btnEnvio = editor.querySelector('#enviar');

  btn.addEventListener('click', function (e) {
    e.preventDefault();

    btn.classList.toggle('ativo');

    if (btn.classList.contains('ativo')) {
      btn.removeAttribute('type');
      inputs.forEach((i) => {
        i.removeAttribute('readonly');
        if (i.getAttribute('type') === 'date') {
          i.style.pointerEvents = 'all';
        }
        selects.forEach((i) => i.removeAttribute('disabled'));
        btn.style.display = 'none';
        btnEnvio.style.display = 'block';
      });
    }
  });
});

EditoresBg.addEventListener('click', (e) => {
  const itemClicado = e.target;
  if (itemClicado.id === 'deletar') {
    const numero =
      itemClicado.parentElement.parentElement.getAttribute('numero');
    const formDelete = document.querySelector(`#form${numero}`);
    formDelete.classList.add('ativo');
    return;
  }

  if (itemClicado.id === 'nao') {
    const formDelete = itemClicado.parentElement;
    formDelete.classList.remove('ativo');
    return;
  }
});

// edita ao vivo os valores na parte de edição
const EmprestimoLabelEdicao = document.querySelectorAll('#emprestimoLabelEdit');

EmprestimoLabelEdicao.forEach((i) => {
  const valor = i.querySelector('#valorEdit');
  let valorFinal = i.querySelector('#valorFinEdit');
  const parcelas = i.querySelector('#parcelasEdit');
  const juros = i.querySelector('#jurosEdit');
  const jurosAoMes = i.querySelector('#jurosCompEdit');
  const diferenca = i.querySelector('#diferencaEdit');
  const selects = i.querySelectorAll('select');

  selects.forEach((select) => {
    const value = select.getAttribute('value');
    select.selectedIndex = value;
  });
  const valorFinalText = valorFinal.value.replace('Total ', '');
  valorFinal.value = valorFinalText;
  const diferencaInit = +valorFinal.value - +valor.value;

  diferenca.value = diferencaInit.toFixed(2);

  function alterarValor() {
    const jurosTotal =
      (jurosAoMes.selectedIndex * parcelas.selectedIndex +
        juros.selectedIndex) /
      100;

    const valorJuros = +(valor.value * jurosTotal);
    const valorTotal = (+valor.value.replace(',', '.') + valorJuros).toFixed(2);
    let diferencaEdit = (valorTotal - +valor.value.replace(',', '.')).toFixed(
      2,
    );

    diferenca.value = diferencaEdit;
    valorFinal.value = valorTotal;
  }
  valor.addEventListener('keyup', alterarValor);
  parcelas.addEventListener('change', alterarValor);
  juros.addEventListener('change', alterarValor);
  jurosAoMes.addEventListener('change', alterarValor);
});

// estilizar o valor
movimentacoesLista.forEach((lista) => {
  const valor = lista.querySelector('#valor');
  if (lista.id === 'receitaLabel') {
    const valorTexto = valor.innerText;
    valor.innerText = `+${valorTexto}`;
  } else {
    const valorTexto = valor.innerText;
    valor.innerText = `-${valorTexto}`;
  }
});
