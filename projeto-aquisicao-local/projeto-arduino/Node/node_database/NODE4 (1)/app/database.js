var Connection = require('tedious').Connection;  
    var config = {  
        server: 'servertechcare11a.database.windows.net',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'adminlocal', //update me
                password: '#Gftechcare'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'bdTechCare'  //update me
        }
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  
    });