var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;



/* Recuperar as últimas N leituras */
router.get('/ultimas', function (req, res, next) {

	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);

	const instrucaoSql = `select top ${limite_linhas} 
						Umidade, 
						Temperatura, 
						Data_hora,
						FORMAT(Data_hora,'HH:mm:ss') as momento_grafico 
						from Dados_do_sensor order by ID_dados_rows desc`;

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
router.get('/tempo-real', function (req, res, next) {

	console.log(`Recuperando a última leitura`);

	const instrucaoSql = `select top 1 Umidade, Temperatura, FORMAT(Data_hora,'HH:mm:ss') as momento_grafico  
						from Dados_do_sensor order by ID_dados_rows desc`;

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
router.get('/estatisticas', function (req, res, next) {

	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select 
							max(temperatura) as temp_maxima, 
							min(temperatura) as temp_minima, 
							avg(temperatura) as temp_media,
							max(umidade) as umidade_maxima, 
							min(umidade) as umidade_minima, 
							avg(umidade) as umidade_media 
						from leitura`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
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
router.get('/sensor', function (req, res, next) {


	const instrucaoSql = `select *  
						from sensor `;

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
