/**
* SfdcAccount.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	Name: {
  		required: true,
  		type: 'string'
  	},

  	Industry: {
  		type: 'string'
  	},

  	Number_of_Employees: {
  		type: 'integer'
  	},

  	Total_Revenue: {
  		type: 'float'
  	}
  },


  hello: function() {
  	console.log('Hello');
  },

  findLargerAccounts: function(options, cb) {
  	var anAccount = options.account;

  	(function _lookupAccountIfNecessary(afterLookup) {
  		if (typeof anAccount === 'object') return afterLookup(null, anAccount);
  		SfdcAccount.find(anAccount).exec(afterLookup);
  	})(function (err, anAccount) {
  		if (err) return cb(err);
  		if (!anAccount) {
  			err = new Error();
  			err.message = require('util').format('Cannot find monkeys with the same name as the person w/ id=%s because that person does not exist.', anAccount);
  			err.status = 404;
  			return cb(err);
  		}

  		SfdcAccount.findByName(anAccount.Name)
  			.exec(function (err, accounts) {
  				if (err) return cb(err);
  				cb(null, accounts);
  			})
  	});
  }

};

