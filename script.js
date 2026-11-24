// ===============================
// Central de Utilidades - Entrega 1
// Fundamentos de JavaScript (prompt e alert)
// ===============================

// ---------- Funções auxiliares ----------

// Pede um número ao usuário. Aceita vírgula ou ponto.
// Retorna null se o usuário cancelar e NaN se digitar algo inválido.
function lerNumero(mensagem) {
  const texto = prompt(mensagem);

  if (texto === null) {
    return null;
  }

  return parseFloat(texto.replace(",", "."));
}

// Formata um número como moeda brasileira (R$ 1.234,56)
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ---------- a) Calculadora de descontos ----------

function calcularValorEconomizado(preco, desconto) {
  return preco * (desconto / 100);
}

function calcularPrecoFinal(preco, desconto) {
  return preco - calcularValorEconomizado(preco, desconto);
}

function calculadoraDescontos() {
  const preco = lerNumero("Digite o preço original do produto (R$):");
  if (preco === null) return;

  if (isNaN(preco) || preco <= 0) {
    alert("Preço inválido! Digite um valor maior que zero.");
    return;
  }

  const desconto = lerNumero("Digite o percentual de desconto (0 a 100):");
  if (desconto === null) return;

  if (isNaN(desconto) || desconto < 0 || desconto > 100) {
    alert("Desconto inválido! Digite um valor entre 0 e 100.");
    return;
  }

  const economizado = calcularValorEconomizado(preco, desconto);
  const precoFinal = calcularPrecoFinal(preco, desconto);

  alert(
    "=== CALCULADORA DE DESCONTOS ===\n" +
    "Preço original: " + formatarMoeda(preco) + "\n" +
    "Desconto: " + desconto + "%\n" +
    "Valor economizado: " + formatarMoeda(economizado) + "\n" +
    "Preço final: " + formatarMoeda(precoFinal)
  );
}

// ---------- b) Calculadora de parcelas ----------

function calcularParcela(valorTotal, quantidade) {
  return valorTotal / quantidade;
}

function calculadoraParcelas() {
  const total = lerNumero("Digite o valor total da compra (R$):");
  if (total === null) return;

  if (isNaN(total) || total <= 0) {
    alert("Valor inválido! Digite um valor maior que zero.");
    return;
  }

  const quantidade = lerNumero("Digite a quantidade de parcelas:");
  if (quantidade === null) return;

  if (isNaN(quantidade) || quantidade < 1 || !Number.isInteger(quantidade)) {
    alert("Quantidade de parcelas inválida! Digite um número inteiro maior ou igual a 1.");
    return;
  }

  const parcela = calcularParcela(total, quantidade);

  alert(
    "=== CALCULADORA DE PARCELAS ===\n" +
    "Valor total: " + formatarMoeda(total) + "\n" +
    "Quantidade de parcelas: " + quantidade + "\n" +
    "Valor de cada parcela: " + formatarMoeda(parcela)
  );
}

// ---------- c) Simulador de investimentos ----------

// Em cada mês: primeiro aplica o rendimento sobre o saldo acumulado
// e depois soma o aporte mensal (aporte no final do mês).
function simularInvestimento(valorInicial, aporteMensal, taxaMensal, meses) {
  let saldo = valorInicial;

  for (let mes = 1; mes <= meses; mes++) {
    saldo = saldo * (1 + taxaMensal / 100);
    saldo = saldo + aporteMensal;
  }

  return saldo;
}

function simuladorInvestimentos() {
  const inicial = lerNumero("Digite o valor inicial do investimento (R$):");
  if (inicial === null) return;
  if (isNaN(inicial) || inicial < 0) {
    alert("Valor inicial inválido! Digite um valor maior ou igual a zero.");
    return;
  }

  const aporte = lerNumero("Digite o valor do aporte mensal (R$):");
  if (aporte === null) return;
  if (isNaN(aporte) || aporte < 0) {
    alert("Aporte inválido! Digite um valor maior ou igual a zero.");
    return;
  }

  const taxa = lerNumero("Digite a taxa de rendimento mensal (%):");
  if (taxa === null) return;
  if (isNaN(taxa) || taxa < 0) {
    alert("Taxa inválida! Digite um valor maior ou igual a zero.");
    return;
  }

  const meses = lerNumero("Digite o período do investimento (em meses):");
  if (meses === null) return;
  if (isNaN(meses) || meses < 1 || !Number.isInteger(meses)) {
    alert("Período inválido! Digite um número inteiro de meses maior ou igual a 1.");
    return;
  }

  const saldoFinal = simularInvestimento(inicial, aporte, taxa, meses);
  const totalInvestido = inicial + aporte * meses;
  const rendimento = saldoFinal - totalInvestido;

  alert(
    "=== SIMULADOR DE INVESTIMENTOS ===\n" +
    "Saldo final: " + formatarMoeda(saldoFinal) + "\n" +
    "Total investido: " + formatarMoeda(totalInvestido) + "\n" +
    "Rendimento obtido: " + formatarMoeda(rendimento)
  );
}

// ---------- d) Divisor de despesas (Entrega 2: arrays e objetos) ----------

// Cria o objeto que representa uma despesa
function criarDespesa(descricao, valor) {
  return {
    descricao: descricao,
    valor: valor
  };
}

// Pede as despesas ao usuário e guarda cada uma (como objeto) em um array
function cadastrarDespesas() {
  const despesas = [];
  let continuar = true;

  while (continuar) {
    const descricao = prompt("Descrição da despesa (ex.: Almoço):");
    if (descricao === null) {
      break; // cancelar = encerrar a inclusão
    }
    if (descricao.trim() === "") {
      alert("Descrição inválida! Digite um nome para a despesa.");
      continue;
    }

    const valor = lerNumero("Valor da despesa \"" + descricao.trim() + "\" (R$):");
    if (valor === null) {
      break;
    }
    if (isNaN(valor) || valor <= 0) {
      alert("Valor inválido! Digite um número maior que zero.");
      continue;
    }

    despesas.push(criarDespesa(descricao.trim(), valor));
    continuar = confirm("Despesa adicionada! Deseja informar outra despesa?");
  }

  return despesas;
}

// Percorre o array somando o valor de cada despesa
function calcularTotal(despesas) {
  let total = 0;

  for (let i = 0; i < despesas.length; i++) {
    total = total + despesas[i].valor;
  }

  return total;
}

// Percorre o array montando o texto com o detalhamento
function montarDetalhamento(despesas) {
  let texto = "";

  for (const despesa of despesas) {
    texto += "• " + despesa.descricao + ": " + formatarMoeda(despesa.valor) + "\n";
  }

  return texto;
}

function dividirValor(total, pessoas) {
  return total / pessoas;
}

function divisorDespesas() {
  const despesas = cadastrarDespesas();

  if (despesas.length === 0) {
    alert("Nenhuma despesa foi informada.");
    return;
  }

  const pessoas = lerNumero("Digite a quantidade de pessoas na divisão:");
  if (pessoas === null) return;

  if (isNaN(pessoas) || pessoas <= 0 || !Number.isInteger(pessoas)) {
    alert("Quantidade de pessoas inválida! Digite um número inteiro maior que zero.");
    return;
  }

  const total = calcularTotal(despesas);
  const porPessoa = dividirValor(total, pessoas);

  alert(
    "=== DIVISOR DE DESPESAS ===\n" +
    "Total das despesas: " + formatarMoeda(total) + "\n" +
    "Quantidade de pessoas: " + pessoas + "\n" +
    "Valor por pessoa: " + formatarMoeda(porPessoa) + "\n\n" +
    "Detalhamento:\n" + montarDetalhamento(despesas)
  );
}

// ---------- Seleção da ferramenta (switch) ----------

function executarFerramenta(ferramenta) {
  switch (ferramenta) {
    case "desconto":
      calculadoraDescontos();
      break;
    case "parcelas":
      calculadoraParcelas();
      break;
    case "investimento":
      simuladorInvestimentos();
      break;
    case "despesas":
      divisorDespesas();
      break;
    default:
      alert("Ferramenta não encontrada.");
  }
}
