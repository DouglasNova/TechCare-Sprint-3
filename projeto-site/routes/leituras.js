var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;



/* Recuperar as últimas N leituras */
router.get('/ultimas/:sensor', function (req, res, next) {

	const sensor = req.params.sensor;

	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);

	const instrucaoSql = `select top ${limite_linhas} 
						d.Umidade, 
						d.Temperatura, 
						d.Data_hora,
						FORMAT(d.Data_hora,'HH:mm:ss') as momento_grafico 
						from Dados_do_sensor d,  Sensor s
						where s.idSensor in (${sensor}) 
						and d.fkSensor = s.idSensor 
						 order by d.ID_dados_rows desc`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true
	})
		.then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});


// tempo real (último valor de cada leitura)
router.get('/tempo-real/:sensor', function (req, res, next) {

	const sensor = req.params.sensor;

	console.log(`Recuperando a última leitura`);

	const instrucaoSql = `select top 1
						d.Umidade, 
						d.Temperatura, 
						d.Data_hora,
						FORMAT(d.Data_hora,'HH:mm:ss') as momento_grafico 
						from Dados_do_sensor d,  Sensor s
						where s.idSensor in (${sensor})
						and d.fkSensor = s.idSensor 
						 order by d.ID_dados_rows desc`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			console.log(resultado)
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});


// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas/:tipo', function (req, res, next) {
	const tipo = req.params.tipo;

	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `
	SELECT avg(d.Temperatura) as temp_media, avg(d.Umidade) as umid_media, a.idAla
	from Dados_do_sensor d, Ala a, Sensor s
	where d.fkSensor = s.idSensor
	and a.idAla = s.fkAla 
	group by a.idAla;
	`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			if (tipo == 0) {
				res.json(resultado);
			} else {
				const resultadoFiltrado = [];
				for (let i = 0; i < resultado.length; i++) {
					const temp = resultado[i].temp_media;
					const umid = resultado[i].umid_media;
					if (tipo==1 && (temp >= 18 && temp <= 30) && (umid >= 50 && umid <= 74)) {
						resultadoFiltrado.push(resultado[i]);
					} else if (tipo == 2 && (((temp >= 14 && temp < 18) || (temp > 30 && temp <= 35)) || ((umid >= 40 && umid < 50) || (umid > 74 && umid <= 75)))) {
						resultadoFiltrado.push(resultado[i]);
					} else if (tipo == 3 && (((temp >= 0 && temp < 14) || (temp > 35 && temp <= 40)) || ((umid >= 35 && umid < 40) || (umid > 75 && umid <= 80)))) {
						resultadoFiltrado.push(resultado[i]);
					}
				}
				res.json(resultadoFiltrado);
			}
			
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});

router.get('/ala', function (req, res, next) {


	const instrucaoSql = `select idAla  
						from Ala `;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			console.log(resultado)
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});
router.get('/sensor/:ala', function (req, res, next) {


	const instrucaoSql = `select * from sensor where fkAla = ${req.params.ala}`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			console.log(resultado)
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});
router.get('/dadosSensor', function (req, res, next) {


	const instrucaoSql = `select  
						Umidade, 
						Temperatura, 
						Data_hora,
						FORMAT(Data_hora,'HH:mm:ss') as momento_grafico 
						from Dados_do_sensor order by ID_dados_rows desc`;


	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			console.log(resultado)
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});


module.exports = router;
