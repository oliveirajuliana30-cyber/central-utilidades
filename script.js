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

// ---------- d) Divisor de despesas ----------

function dividirValor(total, pessoas) {
  return total / pessoas;
}

function divisorDespesas() {
  let total = 0;
  let valor;

  // do...while: repete até o usuário digitar 0 (ou cancelar)
  do {
    valor = lerNumero("Digite o valor da despesa (R$).\nDigite 0 para encerrar:");

    if (valor === null) {
      valor = 0; // cancelar = encerrar
    } else if (isNaN(valor) || valor < 0) {
      alert("Valor inválido! Digite um número positivo ou 0 para encerrar.");
    } else {
      total = total + valor;
    }
  } while (valor !== 0);

  if (total === 0) {
    alert("Nenhuma despesa foi informada.");
    return;
  }

  const pessoas = lerNumero("Digite a quantidade de pessoas na divisão:");
  if (pessoas === null) return;

  if (isNaN(pessoas) || pessoas < 1 || !Number.isInteger(pessoas)) {
    alert("Quantidade de pessoas inválida! Digite um número inteiro maior ou igual a 1.");
    return;
  }

  const porPessoa = dividirValor(total, pessoas);

  alert(
    "=== DIVISOR DE DESPESAS ===\n" +
    "Total das despesas: " + formatarMoeda(total) + "\n" +
    "Quantidade de pessoas: " + pessoas + "\n" +
    "Valor por pessoa: " + formatarMoeda(porPessoa)
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
