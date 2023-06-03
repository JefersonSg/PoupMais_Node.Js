const InputValor = document.querySelectorAll('#valorInput');
const valor = document.querySelectorAll('#total');
const categoria = document.querySelectorAll('#categoriaInit');
const categoriaSelect = document.querySelectorAll('.valorCategoria');
const adicionar = document.querySelectorAll('#botao-add');
const jurosComp = document.getElementById('juros-compostos');
const juros = document.getElementById('emprestimo-juros');
const nomeMov = document.querySelectorAll('#movimentacao');
const dataInfo = document.querySelectorAll('#dataInfo');
const totalPago = document.getElementById('totalPago');
const table = document.getElementById('tabela');
const edits = document.getElementById('editores');

// storages

let transacaoAtual = [];
let number = 0;

function novaDiv(type) {
  type = this.value;
  let div = document.createElement('li');
  let edit = document.createElement('div');
  div.classList.add('movimentacoesLista');
  div.setAttribute('label', number);
  div.id = `${type}Label`;
  edit.id = `${type}LabelEdit`;
  edit.classList.add('editValueBg');
  if (
    type === 'compra' &&
    nomeMov[0].value !== '' &&
    InputValor[0].value !== '' &&
    categoriaSelect[0].value !== 'Categoria' &&
    dataInfo[0].value !== ''
  ) {
    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/compra icon.svg">
    </div>
    <p id="nomeMov">${nomeMov[0].value}</p>
    <p id="valor">-R$ ${(+InputValor[0].value).toFixed(2)}</p>
    <p id="categoria">${categoriaSelect[0].value}</p>
    <p id="data">${dataInfo[0].value}</p>
    <p id="parcelasTotal">${valor[0].value}</p>
    `;
    edit.innerHTML = `
      <div class="editValue" numero="${number}">
        <div class="form-img">
          <p>Editar Despesa</p>
        </div>
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="text" name='nome' id="nomeEdit">
      
            <label for="valor">Valor</label>
            <input readonly type="number" id="valorEdit">

        <label for="data">Data</label>
        <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

        <label for="categoria">Categoria</label>
        <select disabled id="categoriaEdit" name="categoria" >
        </select>

        <label for="parcelas">Parcelas</label>
        <select disabled readonly name="parcelas" id="parcelasEdit">
          <option  style="display:none ;" value="0">parcelas 0x</option>
          <option value="1">Parcelas 1x</option>
          <option value="2">Parcelas 2x</option>
          <option value="3">Parcelas 3x</option>
          <option value="4">Parcelas 4x</option>
          <option value="5">Parcelas 5x</option>
          <option value="6">Parcelas 6x</option>
          <option value="7">Parcelas 7x</option>
          <option value="8">Parcelas 8x</option>
          <option value="9">Parcelas 9x</option>
          <option value="10">Parcelas 10x</option>
          <option value="11">Parcelas 11x</option>
          <option value="12">Parcelas 12x</option>
        </select>

      <div class='botaoEdit'>
       <button type="button" id="editar"></button>
        <button type="button" id="deletar">Deletar</button>
      </div>

    </div>
    <div class="confirmar">
      <span>Deseja mesmo deletar?</span>
      <button type="button" id="sim">Sim</button>
      <button type="button" id="nao">Não</button>
    </div>
    `;
    table.insertBefore(div, table.firstChild);
    edits.appendChild(edit);
    const select = edit.querySelector('#categoriaEdit');
    const options = informacoesLs[6];
    options.forEach((i) => {
      const opt = document.createElement('option');
      opt.innerText = i;
      select.appendChild(opt);
    });
    transacaoAtual.push(+InputValor[0].value * -1);
    number++;

    storage();
    valorAoVivo();

    nomeMov[0].value = '';
    InputValor[0].value = '';
    categoriaSelect.value = 'Categoria';
    dataInfo[0].value = '';
    this.offsetParent.offsetParent.offsetParent.classList.remove('ativo');

    document.body.style.overflow = 'auto';
  } else if (
    type === 'venda' &&
    nomeMov[1].value !== '' &&
    InputValor[1].value !== '' &&
    categoriaSelect[1].value !== 'Categoria' &&
    dataInfo[1].value !== ''
  ) {
    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/venda icon.svg">
    </div>

    <p id="nomeMov">${nomeMov[1].value}</p>
    <p id="valor">+R$ ${(+InputValor[1].value.replace(',', '.')).toFixed(2)}</p>
    <p id="categoria">${categoriaSelect[1].value}</p>
    <p class='parcelas-venda' id="parcelasTotal">${valor[1].value}</p>
    <p id="data">${dataInfo[1].value}</p>
    `;
    edit.innerHTML = `
    <div class="editValue"  numero="${number}">
      <div class="form-img">
       <p>Editar Receita</p>
      </div>
      <span id="fecharEdit">X</span>
      <label for="nome">Nome</label>
      <input readonly type="nome" id="nomeEdit">

      <label for="valor">Valor</label>
      <input readonly type="number" id="valorEdit">

      <label for="data">Data</label>
      <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

      <label for="categoria">Categoria</label>
      <select disabled id="categoriaEdit" name="categoria" >

      </select>

      <label for="parcelas">Parcelas</label>
      <select disabled readonly name="parcelas" id="parcelasEdit">
        <option value="1">Parcelas 1x</option>
        <option value="2">Parcelas 2x</option>
        <option value="3">Parcelas 3x</option>
        <option value="4">Parcelas 4x</option>
        <option value="5">Parcelas 5x</option>
        <option value="6">Parcelas 6x</option>
        <option value="7">Parcelas 7x</option>
        <option value="8">Parcelas 8x</option>
        <option value="9">Parcelas 9x</option>
        <option value="10">Parcelas 10x</option>
        <option value="11">Parcelas 11x</option>
        <option value="12">Parcelas 12x</option>
      </select>

      <div class='botaoEdit'>
        <button type="button" id="editar"></button>
        <button type="button" id="deletar">Deletar</button>
      </div>
    </div>
    <div class="confirmar">
      <span>Deseja mesmo deletar?</span>
      <button type="button" id="sim">Sim</button>
      <button type="button" id="nao">Não</button>
    </div>
`;
    table.insertBefore(div, table.firstChild);
    edits.appendChild(edit);
    const select = edit.querySelector('#categoriaEdit');
    const options = informacoesLs[7];
    options.forEach((i) => {
      const opt = document.createElement('option');
      opt.innerText = i;
      select.appendChild(opt);
    });
    transacaoAtual.push(+InputValor[1].value);
    number++;
    storage();
    valorAoVivo();

    nomeMov[1].value = '';
    InputValor[1].value = '';
    dataInfo[1].value = '';
    categoria[1].selectedIndex = 0;
    this.offsetParent.offsetParent.offsetParent.classList.remove('ativo');
    document.body.style.overflow = 'auto';
  } else if (
    type === 'transferencia' &&
    nomeMov[2].value !== '' &&
    categoria[2].selectedIndex !== 0 &&
    InputValor[2].value !== '' &&
    dataInfo[2].value !== ''
  ) {
    div.innerHTML = `
    <div class='icon icon-transacao'>
      <img class='icon-transacao' src="./img/Movimentacoes/pix icon.svg">
    </div>
    
    <p id="condicao">${
      categoria[2].value === '+'
        ? 'Transferencia recebida'
        : 'Transferencia enviada'
    }</p>
    <p style="color: ${
      categoria[2].value === '+' ? 'green' : ''
    }; font-weight: ${
      categoria[2].value === '+' ? 'bold' : ''
    }" font id="valor">${categoria[2].value}R$ ${(+InputValor[2].value.replace(
      ',',
      '.',
    )).toFixed(2)}</p>
    <p class='transferencia' id="nomeMov">${nomeMov[2].value}</p>
    <p id="data">${dataInfo[2].value}</p>
    `;
    edit.innerHTML = `
      <div class="editValue" numero="${number}">
        <div class="form-img">
          <p>Editar Transferencia</p>
        </div>
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">

        <label for="valor">Valor</label>
        <input readonly type="number" id="valorEdit">

        <label for="data">Data</label>
        <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

        <div class='botaoEdit'>
          <button type="button" id="editar"></button>
          <button type="button" id="deletar">Deletar</button>
      </div>
      </div>
      <div class="confirmar">
        <span>Deseja mesmo deletar?</span>
        <button type="button" id="sim">Sim</button>
        <button type="button" id="nao">Não</button>
      </div>
    `;
    table.insertBefore(div, table.firstChild);
    edits.appendChild(edit);
    transacaoAtual.push(
      categoria[2].value === '+'
        ? +InputValor[2].value
        : +InputValor[2].value * -1,
    );
    number++;
    storage();
    valorAoVivo();

    nomeMov[2].value = '';
    categoria[2].selectedIndex = 0;
    InputValor[2].value = '';
    dataInfo[2].value = '';

    this.offsetParent.offsetParent.offsetParent.classList.remove('ativo');

    document.body.style.overflow = 'auto';
  } else if (
    type === 'emprestimo' &&
    nomeMov[3].value !== '' &&
    InputValor[3].value !== '' &&
    dataInfo[3].value !== ''
  ) {
    div.innerHTML = `
    <div class='icon icon-transacao'>
    <img class='icon-transacao' src="./img/Movimentacoes/EmprestimoIcon 1.svg"alt="banco"> 
    </div>

    <p id="nomeMov" class = "nomeMov">${
      'Emprestou para ' + nomeMov[3].value
    }</p>
    <p class="parcelasTotal" id="parcelasTotal">${valor[3].value}</p>
    <p class = "diferenca" id="diferenca">R$ ${(
      totalPago.value.replace('Total ', '') -
      +InputValor[3].value.replace(',', '.')
    ).toFixed(2)}</p>
    <p id="valor" class='valorInit'>-R$ ${(+InputValor[3].value.replace(
      ',',
      '.',
    )).toFixed(2)}</p>
    <p class = "valorFinal" id="valorFinal">${(+totalPago.value.replace(
      'Total ',
      '',
    )).toFixed(2)}</p>
    <p class = "data"id="data">${dataInfo[3].value}</p>
    <p id='jurosLs'>${juros.value}</p>
    <p id='jurosMesLs'>${jurosComp.value}</p>
    `;
    edit.innerHTML = `
      <div class="editValue" numero="${number}">
        <div class="form-img">
          <p>Editar Emprestimo</p>
        </div>
        <span id="fecharEdit">X</span>
        <label for="nome">Nome</label>
        <input readonly type="nome" id="nomeEdit">
        
                <label for="valor">Valor</label>
                <input readonly type="number" id="valorEdit">

        <label for="data">Data</label>
        <input readonly type="date" lang="pt-BR" format="dd/mm/yyyy" ;" id="dataInfo" name="data" />

      <select disabled readonly name="parcelas" id="parcelasEdit">
        <option value="1">Parcelas 1x</option>
        <option value="2">Parcelas 2x</option>
        <option value="3">Parcelas 3x</option>
        <option value="4">Parcelas 4x</option>
        <option value="5">Parcelas 5x</option>
        <option value="6">Parcelas 6x</option>
        <option value="7">Parcelas 7x</option>
        <option value="8">Parcelas 8x</option>
        <option value="9">Parcelas 9x</option>
        <option value="10">Parcelas 10x</option>
        <option value="11">Parcelas 11x</option>
        <option value="12">Parcelas 12x</option>
      </select>
      <select disabled name="juros" id="jurosEdit">
        <option value="0">0% de juros</option>
        <option value="1">1% de juros</option>
        <option value="2">2% de juros</option>
        <option value="3">3% de juros</option>
        <option value="4">4% de juros</option>
        <option value="5">5% de juros</option>
        <option value="6">6% de juros</option>
        <option value="7">7% de juros</option>
        <option value="8">8% de juros</option>
        <option value="9">9% de juros</option>
        <option value="10">10% de juros</option>
        <option value="11">11% de juros</option>
        <option value="12">12% de juros</option>
        <option value="13">13% de juros</option>
        <option value="14">14% de juros</option>
        <option value="15">15% de juros</option>
        <option value="16">16% de juros</option>
        <option value="17">17% de juros</option>
        <option value="18">18% de juros</option>
        <option value="19">19% de juros</option>
        <option value="20">20% de juros</option>
        <option value="21">21% de juros</option>
        <option value="22">22% de juros</option>
        <option value="23">23% de juros</option>
        <option value="24">24% de juros</option>
        <option value="25">25% de juros</option>
        <option value="26">26% de juros</option>
        <option value="27">27% de juros</option>
        <option value="28">28% de juros</option>
        <option value="29">29% de juros</option>
        <option value="30">30% de juros</option>
      </select>
      <select disabled name="juros-compostos" id="jurosCompEdit">
        <option value="0">0% ao mes</option>
        <option value="1">1% ao Mês</option>
        <option value="2">2% ao Mês</option>
        <option value="3">3% ao Mês</option>
        <option value="4">4% ao Mês</option>
        <option value="5">5% ao Mês</option>
        <option value="6">6% ao Mês</option>
        <option value="7">7% ao Mês</option>
        <option value="8">8% ao Mês</option>
        <option value="9">9% ao Mês</option>
        <option value="10">10% ao Mês</option>
        <option value="11">11% ao Mês</option>
        <option value="12">12% ao Mês</option>
      </select>
        <label for="diferenca">Lucro</label>
        <input readonly type="diferenca" id="diferencaEdit">
        <label for="valor-final">Valor Final</label>
        <input readonly type="number" id="valorFinEdit">

      <div class='botaoEdit'>
        <button type="button" id="editar"></button>
        <button type="button" id="deletar">Deletar</button>
      </div>
        
      </div>
      <div class="confirmar">
        <span>Deseja mesmo deletar?</span>
        <button type="button" id="sim">Sim</button>
        <button type="button" id="nao">Não</button>
      </div>
  `;
    table.insertBefore(div, table.firstChild);
    edits.appendChild(edit);
    transacaoAtual.push(+InputValor[3].value * -1);
    number++;

    storage();
    valorAoVivo();

    nomeMov[3].value = '';
    InputValor[3].value = '';
    dataInfo[3].value = '';
    jurosComp.selectedIndex = 0;
    juros.selectedIndex = 0;

    this.offsetParent.offsetParent.offsetParent.classList.remove('ativo');

    document.body.style.overflow = 'auto';
  } else {
    alert('preencha todos os campos');
  }

  const nomeEditInit = edit.querySelector('#nomeEdit');
  const dataEditInit = edit.querySelector('#dataInfo');
  const valorEditInit = edit.querySelector('#valorEdit');
  const categoriaEditInit = edit.querySelector('#categoriaEdit');
  const diferencaeEditInit = edit.querySelector('#diferencaEdit');
  const parcelasEditInit = edit.querySelector('#parcelasEdit');
  const jurosEditInit = edit.querySelector('#jurosEdit');
  const jurosMesEditInit = edit.querySelector('#jurosCompEdit');
  const valorFinalEditInit = edit.querySelector('#valorFinEdit');
  const btnEdit = edit.querySelector('#editar');

  valorEditInit.addEventListener('keydown', (event) => {
    if (
      !/[\d\s.,]/.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete'
    ) {
      event.preventDefault();
    }
  });

  let Editar = {
    nome: div.querySelector('#nomeMov'),
    data: div.querySelector('#data'),
    valor: div.querySelector('#valor'),
    categoria: div.querySelector('#categoria'),
    valorFinal: div.querySelector('#valorFinal'),
    diferencaInit: div.querySelector('#diferenca'),
    parcelasInit: div.querySelector('#parcelasTotal'),
    jurosInit: div.querySelector('#jurosLs'),
    jurosMesInit: div.querySelector('#jurosMesLs'),
    condicao: div.querySelector('#condicao'),
  };
  function changeValue() {
    nomeEditInit.value = Editar.nome.innerText;
    dataEditInit.value = Editar.data.innerText;
    let valorLimpo = Editar.valor.innerText
      .replace('+R$ ', '')
      .replace('-R$ ', '');
    valorEditInit.value = (+valorLimpo).toFixed(2);
    if (categoriaEditInit && Editar.categoria) {
      categoriaEditInit.value = Editar.categoria.innerText;
    }
    if (parcelasEditInit && Editar.parcelasInit) {
      parcelasEditInit.value = Editar.parcelasInit.innerText.slice(0, 1);
    }
    if (jurosEditInit && Editar.jurosInit) {
      jurosEditInit.value = Editar.jurosInit.innerText;
      jurosMesEditInit.value = Editar.jurosMesInit.innerText;
      nomeEditInit.value = Editar.nome.innerText.replace('Emprestou para ', '');
    }

    if (diferencaeEditInit && Editar.diferencaInit) {
      diferencaeEditInit.value = Editar.diferencaInit.innerText;
    }
    if (valorFinalEditInit && Editar.valorFinal) {
      valorFinalEditInit.value = Editar.valorFinal.innerText;
    }
  }

  if (btnEdit) {
    btnEdit.addEventListener('click', function () {
      if (btnEdit.classList.contains('ativo')) {
        Editar.nome.innerText = nomeEditInit.value;
        Editar.data.innerText = dataEditInit.value;

        if (btnEdit.offsetParent.offsetParent.id === 'compraLabelEdit') {
          Editar.valor.innerText = `-R$ ${(+valorEditInit.value.replace(
            ',',
            '.',
          )).toFixed(2)}`;
        } else if (btnEdit.offsetParent.offsetParent.id == 'vendaLabelEdit') {
          Editar.valor.innerText = `+R$ ${(+valorEditInit.value.replace(
            ',',
            '.',
          )).toFixed(2)}`;
        } else if (
          btnEdit.offsetParent.offsetParent.id == 'transferenciaLabelEdit'
        ) {
          if (Editar.condicao.innerText === 'Transferencia enviada') {
            Editar.valor.innerText = `-R$ ${(+valorEditInit.value.replace(
              ',',
              '.',
            )).toFixed(2)}`;
          } else if (Editar.condicao.innerText === 'Transferencia recebida') {
            Editar.valor.innerText = `+R$ ${(+valorEditInit.value.replace(
              ',',
              '.',
            )).toFixed(2)}`;
          }
        } else if (
          btnEdit.offsetParent.offsetParent.id == 'emprestimoLabelEdit'
        ) {
          Editar.nome.innerText = `Emprestou para ${nomeEditInit.value}`;
          Editar.valor.innerText = `-R$ ${(+valorEditInit.value.replace(
            ',',
            '.',
          )).toFixed(2)}`;
        }

        if (Editar.categoria) {
          Editar.categoria.innerText = categoriaEditInit.value;
        }
        if (parcelasEditInit && Editar.parcelasInit) {
          Editar.parcelasInit.innerText = parcelasEditInit.value;
        }
        if (jurosEditInit && Editar.jurosInit) {
          jurosEditInit.innerText = jurosEditInit.value;
        }
        if (jurosMesEditInit && Editar.jurosMesInit) {
          Editar.jurosMesInit.innerText = jurosMesEditInit.value;
        }
        if (diferencaeEditInit && Editar.diferencaInit) {
          Editar.diferencaInit.innerText = diferencaeEditInit.value;
        }
        if (valorFinalEditInit && Editar.valorFinal) {
          Editar.valorFinal.innerText = valorFinalEditInit.value;
        }
        transacaoAtual.push(valorEditInit.value);
        storage();
        valorAoVivo();
        this.offsetParent.offsetParent.classList.remove('ativo');
      }
    });
  }
  function alterarValor() {
    const jurosTotal =
      (jurosMesEditInit.selectedIndex * (parcelasEditInit.selectedIndex + 1) +
        jurosEditInit.selectedIndex) /
      100;

    const valorJuros = +(valorEditInit.value * jurosTotal);
    const valorTotal = (
      +valorEditInit.value.replace(',', '.') + valorJuros
    ).toFixed(2);
    let diferencaEdit = (
      valorTotal - +valorEditInit.value.replace(',', '.')
    ).toFixed(2);

    console.log(jurosMesEditInit.selectedIndex);
    console.log(jurosEditInit.selectedIndex);
    console.log(valorJuros);
    console.log(valorTotal);
    console.log(valorEditInit.value);
    console.log(diferencaEdit);
    diferencaeEditInit.value = diferencaEdit;
    valorFinalEditInit.value = valorTotal;
  }
  if (edit.id === 'emprestimoLabelEdit') {
    valorEditInit.addEventListener('keyup', alterarValor);
    parcelasEditInit.addEventListener('change', alterarValor);
    jurosEditInit.addEventListener('change', alterarValor);
    jurosMesEditInit.addEventListener('change', alterarValor);
  }
  div.addEventListener('click', changeValue);
}

adicionar.forEach((i) => {
  i.addEventListener('click', novaDiv);
});

function arrumarNome() {
  const nomeLogin = document.querySelector('.nome-login');
  nomeLogin.innerText = `Olá, ${
    nomeUsuarioAtivo.nome
  } ${nomeUsuarioAtivo.sobrenome.slice(0, 1)}.`;
}
function valorAoVivo() {
  const valorStatus = document.querySelector('.valor');
  const status = document.querySelector('.status');
  let Ls = localStorage.getItem(`informacoes_id${usuarioAtivo.ID}`);
  let informacoesLs = JSON.parse(Ls);
  let InputValor = informacoesLs[0];

  let soma = InputValor.reduce(
    (acumulador, valorAtual) => +acumulador + valorAtual,
    0,
  );

  let valorAtual = +soma.toFixed(2);

  let numero = 0;
  const incremento = +(valorAtual / 100).toFixed(2);
  let valorAnterior = valorAtual - transacaoAtual.pop() || 0;
  let start = valorAnterior;
  //Efeitos Numericos
  if (valorAtual > 0) {
    if (valorAtual > start) {
      const timer = setInterval(() => {
        start += incremento;
        numero = start;
        if (start > valorAtual) {
          numero = valorAtual;
          clearInterval(timer);
        }
        valorStatus.innerText = `R$ ${numero.toLocaleString('pt-BR')}`;
      }, 15);
    } else if (valorAtual < start) {
      const timer = setInterval(() => {
        start += -incremento;
        numero = start;

        if (valorAtual > start) {
          numero = valorAtual;
          clearInterval(timer);
        }
        valorStatus.innerText = `R$ ${numero.toLocaleString('pt-BR')}`;
      }, 15);
    }
  } else if (valorAtual < 0) {
    const timer = setInterval(() => {
      start += -incremento * -1;
      numero = start;
      if (valorAtual > start) {
        numero = valorAtual;
        clearInterval(timer);
      }

      valorStatus.innerText = `-R$ ${numero
        .toLocaleString('pt-BR')
        .replace('-', '')}`;
    }, 15);
  } else if (valorAtual === 0) {
    valorStatus.innerText = `R$ ${valorAtual.toLocaleString('pt-BR')}`;
  } else alert('erro');

  // Efeitos Visuais

  if (valorAtual > 0) {
    status.style.backgroundColor = ' rgb(227, 247, 236)';
    status.classList.add('positivo');
    status.classList.remove('negativo');
    status.innerText = 'Positivo';
  }
  if (valorAtual === 0) {
    status.classList.remove('negativo');
    status.classList.remove('positivo');
    status.innerText = 'Neutro';
    status.style.backgroundColor = ' rgba(142, 208, 236, 0.80)';
  }
  if (valorAtual < 0) {
    status.style.backgroundColor = 'rgba(239, 123, 123, 0.5)';
    status.classList.add('negativo');
    status.classList.remove('positivo');
    status.innerText = 'Negativo';
  }
}
