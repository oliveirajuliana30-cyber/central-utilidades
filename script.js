// ===============================
// Central de Utilidades - Entrega 3
// DOM, eventos e formulários
// ===============================

// ---------- Funções reaproveitadas das etapas anteriores ----------

function calcularValorEconomizado(preco, desconto) {
  return preco * (desconto / 100);
}

function calcularPrecoFinal(preco, desconto) {
  return preco - calcularValorEconomizado(preco, desconto);
}

function calcularParcela(valorTotal, quantidade) {
  return valorTotal / quantidade;
}

// Rende primeiro, depois soma o aporte (aporte no fim do mês)
function simularInvestimento(valorInicial, aporteMensal, taxaMensal, meses) {
  let saldo = valorInicial;

  for (let mes = 1; mes <= meses; mes++) {
    saldo = saldo * (1 + taxaMensal / 100);
    saldo = saldo + aporteMensal;
  }

  return saldo;
}

function dividirValor(total, pessoas) {
  return total / pessoas;
}

function criarDespesa(descricao, valor) {
  return {
    descricao: descricao,
    valor: valor
  };
}

function calcularTotal(despesas) {
  let total = 0;

  for (let i = 0; i < despesas.length; i++) {
    total = total + despesas[i].valor;
  }

  return total;
}

// ---------- Funções de interface ----------

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Lê um campo da página e devolve número (NaN se estiver vazio ou inválido)
function lerNumero(idCampo) {
  const texto = document.getElementById(idCampo).value.trim().replace(",", ".");
  if (texto === "") {
    return NaN;
  }
  return Number(texto);
}

function mostrarErro(nome, mensagem) {
  document.getElementById("erro-" + nome).textContent = mensagem;
}

function limparErro(nome) {
  document.getElementById("erro-" + nome).textContent = "";
}

function resetarResultado(nome) {
  const painel = document.getElementById("resultado-" + nome);
  painel.innerHTML = "";

  const texto = document.createElement("p");
  texto.className = "vazio";
  texto.textContent = "Preencha os campos para ver o resultado aqui.";
  painel.appendChild(texto);
}

// Monta o painel de resultado: título, linhas, destaque e detalhes (opcionais)
function montarResultado(nome, titulo, linhas, destaque, detalhes) {
  const painel = document.getElementById("resultado-" + nome);
  painel.innerHTML = "";

  const h3 = document.createElement("h3");
  h3.textContent = "✔ " + titulo;
  painel.appendChild(h3);

  for (const [rotulo, valor] of linhas) {
    const div = document.createElement("div");
    div.className = "linha";

    const spanRotulo = document.createElement("span");
    spanRotulo.textContent = rotulo;
    const spanValor = document.createElement("span");
    spanValor.textContent = valor;

    div.appendChild(spanRotulo);
    div.appendChild(spanValor);
    painel.appendChild(div);
  }

  if (destaque) {
    const div = document.createElement("div");
    div.className = "destaque";

    const spanRotulo = document.createElement("span");
    spanRotulo.textContent = destaque[0];
    const spanValor = document.createElement("span");
    spanValor.textContent = destaque[1];

    div.appendChild(spanRotulo);
    div.appendChild(spanValor);
    painel.appendChild(div);
  }

  if (detalhes && detalhes.length > 0) {
    const ul = document.createElement("ul");
    ul.className = "detalhes";

    for (const texto of detalhes) {
      const li = document.createElement("li");
      li.textContent = texto;
      ul.appendChild(li);
    }

    painel.appendChild(ul);
  }
}

// ---------- Navegação entre telas ----------

function mostrarTela(id) {
  const telas = document.querySelectorAll(".tela");
  for (const tela of telas) {
    tela.classList.add("oculta");
  }
  document.getElementById(id).classList.remove("oculta");
  window.scrollTo(0, 0);
}

// ---------- a) Calculadora de descontos ----------

function tratarDesconto(evento) {
  evento.preventDefault();
  limparErro("desconto");

  const preco = lerNumero("desc-preco");
  const desconto = lerNumero("desc-percentual");

  if (isNaN(preco) || preco <= 0) {
    mostrarErro("desconto", "Informe um preço original maior que zero.");
    resetarResultado("desconto");
    return;
  }
  if (isNaN(desconto) || desconto < 0 || desconto > 100) {
    mostrarErro("desconto", "Informe um desconto entre 0 e 100.");
    resetarResultado("desconto");
    return;
  }

  const economizado = calcularValorEconomizado(preco, desconto);
  const precoFinal = calcularPrecoFinal(preco, desconto);

  montarResultado(
    "desconto",
    "Resultado",
    [
      ["Preço original:", formatarMoeda(preco)],
      ["Valor economizado (" + desconto + "%):", formatarMoeda(economizado)]
    ],
    ["Preço final:", formatarMoeda(precoFinal)]
  );
}

// ---------- b) Calculadora de parcelas ----------

function tratarParcelas(evento) {
  evento.preventDefault();
  limparErro("parcelas");

  const total = lerNumero("parc-total");
  const quantidade = lerNumero("parc-qtd");

  if (isNaN(total) || total <= 0) {
    mostrarErro("parcelas", "Informe um valor total maior que zero.");
    resetarResultado("parcelas");
    return;
  }
  if (isNaN(quantidade) || quantidade < 1 || !Number.isInteger(quantidade)) {
    mostrarErro("parcelas", "Informe uma quantidade de parcelas inteira, maior ou igual a 1.");
    resetarResultado("parcelas");
    return;
  }

  const parcela = calcularParcela(total, quantidade);

  montarResultado(
    "parcelas",
    "Resultado",
    [
      ["Valor total:", formatarMoeda(total)],
      ["Quantidade de parcelas:", String(quantidade)]
    ],
    ["Valor de cada parcela:", formatarMoeda(parcela)]
  );
}

// ---------- c) Simulador de investimentos ----------

function tratarInvestimento(evento) {
  evento.preventDefault();
  limparErro("investimento");

  const inicial = lerNumero("inv-inicial");
  const aporte = lerNumero("inv-aporte");
  const taxa = lerNumero("inv-taxa");
  const meses = lerNumero("inv-meses");

  let mensagem = "";

  if (isNaN(inicial) || inicial < 0) {
    mensagem = "Informe um investimento inicial maior ou igual a zero.";
  } else if (isNaN(aporte) || aporte < 0) {
    mensagem = "Informe um aporte mensal maior ou igual a zero.";
  } else if (isNaN(taxa) || taxa < 0) {
    mensagem = "Informe uma taxa de rendimento maior ou igual a zero.";
  } else if (isNaN(meses) || meses < 1 || !Number.isInteger(meses)) {
    mensagem = "Informe um período inteiro de meses, maior ou igual a 1.";
  }

  if (mensagem !== "") {
    mostrarErro("investimento", mensagem);
    resetarResultado("investimento");
    return;
  }

  const saldoFinal = simularInvestimento(inicial, aporte, taxa, meses);
  const totalInvestido = inicial + aporte * meses;
  const rendimento = saldoFinal - totalInvestido;

  montarResultado(
    "investimento",
    "Resultado da Simulação",
    [
      ["Total investido:", formatarMoeda(totalInvestido)],
      ["Rendimento obtido:", formatarMoeda(rendimento)]
    ],
    ["Saldo final:", formatarMoeda(saldoFinal)],
    [
      "Investimento inicial: " + formatarMoeda(inicial),
      "Aportes (" + meses + " meses): " + formatarMoeda(aporte * meses),
      "Taxa de rendimento: " + taxa + "% ao mês"
    ]
  );
}

// ---------- d) Divisor de despesas ----------

const listaDespesas = []; // array de objetos { descricao, valor }

function adicionarDespesa(evento) {
  evento.preventDefault();
  limparErro("despesa-add");

  const campoDescricao = document.getElementById("desp-descricao");
  const descricao = campoDescricao.value.trim();
  const valor = lerNumero("desp-valor");

  if (descricao === "") {
    mostrarErro("despesa-add", "Informe a descrição da despesa.");
    return;
  }
  if (isNaN(valor) || valor <= 0) {
    mostrarErro("despesa-add", "Informe um valor maior que zero.");
    return;
  }

  listaDespesas.push(criarDespesa(descricao, valor));

  campoDescricao.value = "";
  document.getElementById("desp-valor").value = "";
  campoDescricao.focus();

  atualizarDivisor(false);
}

function removerDespesa(indice) {
  listaDespesas.splice(indice, 1);
  atualizarDivisor(false);
}

function desenharLista() {
  const lista = document.getElementById("lista-despesas");
  lista.innerHTML = "";

  if (listaDespesas.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Nenhuma despesa adicionada.";
    lista.appendChild(vazio);
    return;
  }

  listaDespesas.forEach(function (despesa, indice) {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = despesa.descricao + " – " + formatarMoeda(despesa.valor);

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "Remover";
    botao.addEventListener("click", function () {
      removerDespesa(indice);
    });

    li.appendChild(texto);
    li.appendChild(botao);
    lista.appendChild(li);
  });
}

// Redesenha a lista e atualiza o resultado (total e valor por pessoa)
function atualizarDivisor(exibirErro) {
  desenharLista();
  limparErro("despesas");

  if (listaDespesas.length === 0) {
    resetarResultado("despesas");
    if (exibirErro) {
      mostrarErro("despesas", "Adicione pelo menos uma despesa.");
    }
    return;
  }

  const total = calcularTotal(listaDespesas);
  const pessoas = lerNumero("desp-pessoas");
  const pessoasValidas = Number.isInteger(pessoas) && pessoas > 0;

  const linhas = [["Total das despesas:", formatarMoeda(total)]];
  let destaque = null;

  if (pessoasValidas) {
    linhas.push(["Quantidade de pessoas:", String(pessoas)]);
    destaque = ["Valor por pessoa:", formatarMoeda(dividirValor(total, pessoas))];
  } else if (exibirErro) {
    mostrarErro("despesas", "Informe a quantidade de pessoas (inteiro maior que zero).");
  }

  const detalhes = listaDespesas.map(function (d) {
    return d.descricao + ": " + formatarMoeda(d.valor);
  });

  montarResultado("despesas", "Resultado", linhas, destaque, detalhes);
}

// ---------- Eventos ----------

// Formulários
document.getElementById("form-desconto").addEventListener("submit", tratarDesconto);
document.getElementById("form-parcelas").addEventListener("submit", tratarParcelas);
document.getElementById("form-investimento").addEventListener("submit", tratarInvestimento);
document.getElementById("form-adicionar").addEventListener("submit", adicionarDespesa);
document.getElementById("form-despesas").addEventListener("submit", function (evento) {
  evento.preventDefault();
  atualizarDivisor(true);
});
document.getElementById("desp-pessoas").addEventListener("input", function () {
  atualizarDivisor(false);
});

// Botões dos cartões
for (const botao of document.querySelectorAll("[data-ferramenta]")) {
  botao.addEventListener("click", function () {
    mostrarTela(botao.dataset.ferramenta);
  });
}

// Botões "Voltar para as ferramentas"
for (const botao of document.querySelectorAll("[data-voltar]")) {
  botao.addEventListener("click", function () {
    mostrarTela("home");
    document.getElementById("ferramentas").scrollIntoView();
  });
}

// Links do menu
for (const link of document.querySelectorAll("[data-alvo]")) {
  link.addEventListener("click", function (evento) {
    evento.preventDefault();
    mostrarTela("home");
    document.getElementById(link.dataset.alvo).scrollIntoView();
  });
}

// ---------- Estado inicial ----------

resetarResultado("desconto");
resetarResultado("parcelas");
resetarResultado("investimento");
atualizarDivisor(false);
mostrarTela("home");
