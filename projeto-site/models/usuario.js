'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
	let Usuario = sequelize.define('Usuario', {
		// id: {
		// 	field: 'ID_Funcio',
		// 	type: DataTypes.INTEGER,
		// 	primaryKey: true,
		// 	autoIncrement: true
		// },		
		Email_func: {
			field: 'Email_func',
			type: DataTypes.STRING,
			allowNull: false
		},
		Senha: {
			field: 'Senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		Nome_Func: {
			field: 'Nome_Func',
			type: DataTypes.STRING,
			allowNull: false
		},
		CPF: {
			field: 'CPF',
			type: DataTypes.STRING,
			allowNull: false
		},
		foto_perfil: {
			field: 'foto_perfil',
			type: DataTypes.STRING,
			allowNull: false
		}
	},
		{
			tableName: 'Funcionario',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return Usuario;
};
