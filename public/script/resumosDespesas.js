const despesasLabel = document.querySelectorAll('#despesaLabel');
const graficoResumoDespesa = document.getElementById('graficoDespesa');
const resumoDespesa = graficoResumoDespesa.querySelector('.valorResumido');
const divResumo = graficoResumoDespesa.querySelector('.resumosDivs');
const dives = divResumo.querySelectorAll('.informacoesDaCategoria');
const usuarioAti = JSON.parse(localStorage.usuarioAtivo);
const info = JSON.parse(localStorage.getItem(`informacoes_id${usuarioAti.ID}`));

// função para coletar as categorias
const arrayResumoDespesa = [];

despesasLabel.forEach((label) => {
  const categ = label.querySelector('#categoria').innerText;

  if (!arrayResumoDespesa.includes(categ)) {
    arrayResumoDespesa.push(categ);
  }
});
// ao Click mudar as informacoes na tela por dias
function atualizaH3Gastos(dias) {
  const valoresTotais = [];

  despesasLabel.forEach((Despesa) => {
    const Data = new Date();
    Data.setDate(Data.getDate() - dias);
    const diasInseridos = Data.toISOString().slice(0, 10);
    const dataDaDespesa = Despesa.querySelector('#data').innerText;

    if (dataDaDespesa > diasInseridos) {
      const valor = Despesa.querySelector('#valor').innerText.replace(
        'R$ ',
        '',
      );
      valoresTotais.push(+valor);
    }
    let valoresTotaisAnvaloresAnteriores = valoresTotais.reduce(
      (acomulador, valorAtual) => +acomulador + valorAtual,
      0,
    );

    resumoDespesa.innerText = `R$ ${Math.abs(
      valoresTotaisAnvaloresAnteriores,
    ).toLocaleString('pt-BR')}`;
  });
}

// atualiza o spam das porcentagens de gastos comparados
function valoresComparadosGasto(dias) {
  const valoresAtuais = [];
  despesasLabel.forEach((receita) => {
    const Data = new Date();
    Data.setDate(Data.getDate() - dias);
    const diasInseridos = Data.toISOString().slice(0, 10);

    const dataDaReceita = receita.querySelector('#data').innerText;

    if (dataDaReceita > diasInseridos) {
      const valor = receita
        .querySelector('#valor')
        .innerText.replace('R$ ', '');
      valoresAtuais.push(Math.abs(+valor));
    }
  });
  let valoresAtuaisSomados = valoresAtuais.reduce(
    (acomulador, valoresAtuaisSomados) => +acomulador + valoresAtuaisSomados,
    0,
  );

  const diasComparados = dias * 2;

  const Data = new Date();
  const DataComparativa = new Date();
  Data.setDate(Data.getDate() - dias);
  DataComparativa.setDate(DataComparativa.getDate() - diasComparados);
  const diasInseridos = Data.toISOString().slice(0, 10);
  const dataComparativaLimpa = DataComparativa.toISOString().slice(0, 10);

  // coletar os valores
  const valores = [];
  despesasLabel.forEach((receita) => {
    const data = receita.querySelector('#data').innerText;
    const valor = receita.querySelector('#valor').innerText.replace('R$ ', '');

    if (data < diasInseridos && data > dataComparativaLimpa) {
      valores.push(Math.abs(+valor));
    } else {
      valores.push(0);
    }
  });

  // inserir os valores

  let valoresAnterioresSomados = valores.reduce(
    (acomulador, valoresAnterioresSomados) =>
      +acomulador + valoresAnterioresSomados,
    0,
  );

  const porcentagemComparada = graficoResumoDespesa.querySelector(
    '.porcentagemComparada',
  );
  const diasSpan = graficoResumoDespesa.querySelector('.diasComparados');
  const diferencaComparada = graficoResumoDespesa.querySelector(
    '.diferencaComparada',
  );
  const porcentagem = +(
    (Math.abs(valoresAtuaisSomados) / Math.abs(valoresAnterioresSomados)) *
    100
  ).toFixed(0);

  if (valoresAnterioresSomados < valoresAtuaisSomados) {
    const diferenca = valoresAtuaisSomados - valoresAnterioresSomados;

    if (porcentagem !== Infinity) {
      porcentagemComparada.innerText = `${porcentagem}% a mais que nos`;
    } else if (porcentagem === Infinity) {
      porcentagemComparada.innerText = `100% a mais que nos`;
    } else {
      porcentagemComparada.innerText = `deu erro mais foi no maior`;
    }

    diasSpan.innerText = `${dias} dias anteriores`;
    diferencaComparada.innerText = `(R$ ${diferenca.toLocaleString('pt-BR')})`;
  } else if (valoresAnterioresSomados > valoresAtuaisSomados) {
    const porcentagem = +(
      (valoresAnterioresSomados / valoresAtuaisSomados) *
      100
    ).toFixed(0);

    const diferenca = valoresAtuaisSomados - valoresAnterioresSomados;

    if (porcentagem !== Infinity) {
      porcentagemComparada.innerText = `${porcentagem}% a menos que nos`;
    } else if (porcentagem === Infinity) {
      porcentagemComparada.innerText = `100% a menos que nos`;
    } else {
      porcentagemComparada.innerText = `deu erro mais foi no menor`;
    }

    diasSpan.innerText = `${dias} dias anteriores`;
    diferencaComparada.innerText = `(-R$ ${diferenca
      .toLocaleString('pt-BR')
      .replace('-', '')})`;
  } else if (valoresAnterioresSomados === valoresAtuaisSomados) {
    porcentagemComparada.innerText = `0% que nos`;
    diasSpan.innerText = `${dias} dias anteriores`;
    diferencaComparada.innerText = '(R$ 0,00)';
  } else {
    porcentagemComparada.innerText = `deu erro mais foi no igual`;
  }
}

let valoresTotaisGastos = [];
let valoresTotaisGastosResumoTotal = [];

// função para adicionar valor a valoresTotais
let arrayValoresColetadosGastos = [];
let arrayValoresColetadosGastosResumoTotal = [];

function coletarValoresGasto(dias) {
  despesasLabel.forEach((despesa) => {
    const Data = new Date();
    Data.setDate(Data.getDate() - dias);
    const diasInseridos = Data.toISOString().slice(0, 10);
    const dataDadespesa = despesa.querySelector('#data').innerText;

    if (dataDadespesa > diasInseridos) {
      const valor = +despesa
        .querySelector('#valor')
        .innerText.replace('R$ ', '');

      valoresTotaisGastos.push(Math.abs(valor));
      valoresTotaisGastosResumoTotal.push(Math.abs(valor));
    }
  });
}

function ValoresFiltradosPorDiasGasto(dias) {
  arrayResumoDespesa.forEach((categoria) => {
    const valores = [];
    const Data = new Date();
    Data.setDate(Data.getDate() - dias);
    const diasInseridos = Data.toISOString().slice(0, 10);

    despesasLabel.forEach((despesa) => {
      const valor = +despesa
        .querySelector('#valor')
        .innerText.replace('R$ ', '');
      const comparador = despesa.querySelector('#categoria').innerText;
      const dataDadespesa = despesa.querySelector('#data').innerText;

      if (comparador === categoria && dataDadespesa > diasInseridos) {
        valores.push(valor);
      }
    });
    let valoresSomados = valores.reduce(
      (acomulador, valoresSomados) => +acomulador + valoresSomados,
      0,
    );
    arrayValoresColetadosGastos.push([Math.abs(valoresSomados), categoria]);
    arrayValoresColetadosGastosResumoTotal.push([
      Math.abs(valoresSomados),
      categoria,
    ]);
  });
}
// setar os valores
function setarValoresGasto() {
  arrayValoresColetadosGastos.sort((a, b) => b[0] - a[0]);
  const novoArrayValoresTop4 = arrayValoresColetadosGastos.map((item) => item);
  novoArrayValoresTop4.length = 4;

  dives.forEach((div, n) => {
    const valorDiv = div.querySelector('.valorTotalDaCategoria');
    const graficoVermelho = div.querySelector('.graficoPorcentagem');
    const porcentagemNumerica = div.querySelector('.porcentagemNumero');
    const nomeDaCategoria = div.querySelector('.nomeDaCategoria');

    let valoresSomados = valoresTotaisGastos.reduce(
      (acomulador, valoresSomados) => +acomulador + valoresSomados,
      0,
    );
    let porcentagem = 0;
    if (novoArrayValoresTop4[n]) {
      porcentagem = (
        (novoArrayValoresTop4[n][0] / valoresSomados) *
        100
      ).toFixed(0);
      nomeDaCategoria.innerText = novoArrayValoresTop4[n][1];
      valorDiv.innerText = novoArrayValoresTop4[n][0].toLocaleString('pt-BR');
      graficoVermelho.style.width = `${porcentagem}%`;
      porcentagemNumerica.innerText = `${porcentagem}%`;
    } else {
      nomeDaCategoria.innerText = '';
      valorDiv.innerText = 0;
      graficoVermelho.style.width = `${porcentagem}%`;
      porcentagemNumerica.innerText = `${porcentagem}%`;
    }

    // deixar divs zeradas ocultas

    valorDiv.parentElement.classList.remove('ocultar');
    if (valorDiv.innerText == 0) {
      valorDiv.parentElement.classList.add('ocultar');
    }
  });
  arrayValoresColetadosGastos = [];
  valoresTotaisGastos = [];
}

// cria as divs
function criaAsDivsGastos() {
  const novoArrayValores = arrayResumoDespesa.map((item) => item);
  novoArrayValores.forEach(() => {
    const divPaiGasto = document.querySelector('#todasAsAtividadesDespesa');

    const div = document.createElement('div');
    div.classList.add('informacoesDaCategoria');

    div.innerHTML = `<h4 class="nomeDaCategoria"></h4>
    <span class="graficoPorcentagem"></span>
    <span class="porcentagemNumero"></span>
    <span class="valorTotalDaCategoria"></span>`;
    divPaiGasto.appendChild(div);
  });
}
criaAsDivsGastos();

// adiciona ativo e abre o bg
const divPaiGasto = document.querySelector('#todasAsAtividadesDespesa');

function addAtivoGastos() {
  divPaiGasto.parentElement.classList.add('ativo');
  adicionaValoresATodasAsAtividadesGastos();
  document.body.style.overflow = 'hidden';
}

// fechar o bg

atividadesBg[1].addEventListener('click', function (event) {
  const itemIgnorado = atividadesBg[1].querySelector('.todasAsAtividades');
  const fechar = atividadesBg[1].querySelector('.fechar');

  if (!itemIgnorado.contains(event.target) || fechar.contains(event.target)) {
    document.body.style.overflow = 'auto';
    atividadesBg[1].classList.remove('ativo');
  }
});

// adiciona os valores nas suas divs
function adicionaValoresATodasAsAtividadesGastos() {
  arrayValoresColetadosGastosResumoTotal.sort((a, b) => b[0] - a[0]);

  const novoArrayValores = arrayValoresColetadosGastosResumoTotal.map(
    (item) => item,
  );
  let valoresSomados = valoresTotaisGastosResumoTotal.reduce(
    (acomulador, valoresSomados) => +acomulador + valoresSomados,
    0,
  );

  // setar valores
  const divs = divPaiGasto.querySelectorAll('.informacoesDaCategoria');

  divs.forEach((div, n) => {
    const nomeCategoria = div.querySelector('.nomeDaCategoria');
    const valorCategoria = div.querySelector('.valorTotalDaCategoria');
    const graficoPorcentagem = div.querySelector('.graficoPorcentagem');
    const porcentagemNumero = div.querySelector('.porcentagemNumero');

    let porcentagem = 0;

    if (novoArrayValores[n]) {
      porcentagem = +((novoArrayValores[n][0] / valoresSomados) * 100).toFixed(
        0,
      );

      nomeCategoria.innerText = novoArrayValores[n][1];
      graficoPorcentagem.style.width = `${porcentagem}%`;
      porcentagemNumero.innerText = `${porcentagem}%`;
      valorCategoria.innerText = novoArrayValores[n][0].toLocaleString('pt-BR');
    } else {
      nomeCategoria.innerText = '';
      graficoPorcentagem.style.width = `${porcentagem}%`;
      porcentagemNumero.innerText = `${porcentagem}%`;
      valorCategoria.innerText = '0';
    }

    // esconder divs zeradas
    if (valorCategoria.innerText == 0) {
      divs[n].classList.add('ocultar');
    } else {
      divs[n].classList.remove('ocultar');
    }
  });
}

atualizaH3Gastos(30);
valoresComparadosGasto(30);
coletarValoresGasto(30);
ValoresFiltradosPorDiasGasto(30);
setarValoresGasto();

graficoResumoDespesa.addEventListener('click', function (e) {
  const botoes = graficoResumoDespesa.querySelectorAll('.botoes-filtro');
  const botaoClicado = e.target;
  //  adiciona e remove class ativo
  if (botaoClicado.classList[0] === 'botoes-filtro') {
    botaoClicado.classList.add('ativo');
    botoes.forEach((botao) => {
      if (!botao.contains(botaoClicado)) {
        botao.classList.remove('ativo');
      }
    });
  }

  // atualiza o valor do h3
  if (botaoClicado.innerText === '7 dias') {
    arrayValoresColetadosGastosResumoTotal = [];
    valoresTotaisGastosResumoTotal = [];
    atualizaH3Gastos(7);
    valoresComparadosGasto(7);
    coletarValoresGasto(7);
    ValoresFiltradosPorDiasGasto(7);
    setarValoresGasto();
  } else if (botaoClicado.innerText === '30 dias') {
    arrayValoresColetadosGastosResumoTotal = [];
    valoresTotaisGastosResumoTotal = [];
    atualizaH3Gastos(30);
    valoresComparadosGasto(30);
    coletarValoresGasto(30);
    ValoresFiltradosPorDiasGasto(30);
    setarValoresGasto();
  } else if (botaoClicado.innerText === '90 dias') {
    arrayValoresColetadosGastosResumoTotal = [];
    valoresTotaisGastosResumoTotal = [];
    atualizaH3Gastos(90);
    valoresComparadosGasto(90);
    coletarValoresGasto(90);
    ValoresFiltradosPorDiasGasto(90);
    setarValoresGasto();
  }

  // cria as divs de resumo de despesas
});
graficoResumoDespesa.addEventListener('click', function (event) {
  const botoesFiltros = graficoResumoDespesa.querySelectorAll('.botoes-filtro');
  const botaoClicado = [...botoesFiltros].filter(
    (botao) => botao === event.target,
  );
  if (!botaoClicado.length) {
    addAtivoGastos();
  }
});
