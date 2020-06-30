function simular() {
    let qtLeitos = Number(leitos.value);
    let qtEnfermeiroLeito = qtLeitos / 4; // Média de 1 enfermeiro para cada 4 leitos 
    let remuneracaoEnfermeiro = qtEnfermeiroLeito * 3150; // média salárial de um enfermeiro, multiplicada pela quantidade de profissionais no hospital
    let gasto_mensal_monitoramento = qtEnfermeiroLeito * 286.24; // salário hora do enfermeiro multiplicado pelo tempo gasto mês monitorando alas 
    let gasto_porcetagem_monitoramento = gasto_mensal_monitoramento * 6;

    // Divisão do valor pago para enfermeiros monitorar a ala, pelo valor total gasto com salário dos enfermeiros. Multiplicando esse valor por 100 obtemos a porcentagem paga para enfermeiros monitorar alas
    // $(".num").counterUp({delay: 8, time: 1000});
    porcentagem_mensal.innerHTML = gasto_porcetagem_monitoramento.toFixed(2);
    resultado.innerHTML = remuneracaoEnfermeiro.toFixed(2);
    gasto_para_monitorar.innerHTML = gasto_mensal_monitoramento.toFixed(2);

    leitos.value = '';

    resultado_calculo.style.display = 'block';

  };
