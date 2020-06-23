const express = require('express');
const { ArduinoDataTemp } = require('./newserial')
const { ArduinoDataHumidity } = require('./serialHumidity')
const { ArduinoDataSwitch } = require('./serialSwitch')
const { ArduinoDataLuminosity} = require('./serialLuminosidity')
const db = require('./database')
const router = express.Router();


router.get('/', (request, response, next) => {

    let sum = ArduinoDataTemp.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataTemp.List.length).toFixed(2);
	let sumHour = ArduinoDataTemp.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataTemp.ListHour.length).toFixed(2);
    
    response.json({
        data: ArduinoDataTemp.List,
        total: ArduinoDataTemp.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataTemp.ListHour,
		totalHour: ArduinoDataTemp.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/humidity', (request, response, next) => {

    let sum = ArduinoDataHumidity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataHumidity.List.length).toFixed(2);
	let sumHour = ArduinoDataHumidity.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataHumidity.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataHumidity.List,
        total: ArduinoDataHumidity.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataHumidity.ListHour,
		totalHour: ArduinoDataHumidity.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/switch', (request, response, next) => {

    let sum = ArduinoDataSwitch.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataSwitch.List.length).toFixed(2);
	let sumHour = ArduinoDataSwitch.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataSwitch.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataSwitch.List,
        total: ArduinoDataSwitch.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataSwitch.ListHour,
		totalHour: ArduinoDataSwitch.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/luminosity', (request, response, next) => {

    let sum = ArduinoDataLuminosity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataLuminosity.List.length).toFixed(2);
	let sumHour = ArduinoDataLuminosity.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataLuminosity.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataLuminosity.List,
        total: ArduinoDataLuminosity.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataLuminosity.ListHour,
		totalHour: ArduinoDataLuminosity.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });
});
    router.get('/sendData', function(request, response, next) {

    temperature = ArduinoDataTemp.List[ArduinoDataTemp.List.length -1];
    Humidity = ArduinoDataHumidity.List[ArduinoDataHumidity.List.length -1];
    //luminosidade = ArduinoDataLuminosity.List[ArduinoDataLuminosity.List.length -1]
    
    let fkChave = parseInt(Math.random() * 13 + 1);
    if(fkChave < 6){
        fkChave = 6;
    };
    var sql = `insert into Dados_do_sensor(fkSensor, Temperatura, Umidade, data_Hora) values (${fkChave}, ${temperature}, ${Humidity}, '${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}')`;
    console.log(sql)
    // var values= [['fkSensor', 1], ['Temperatura',temperature], ['Umidade',Humidity], ['Data_hora', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`]];
    
        db.query(sql,function(err, result) {
            if (err) throw err;
            console.log("Medidas inseridas: " + result.affectedRows);
        });
    

    response.sendStatus(200);

});


module.exports = router;