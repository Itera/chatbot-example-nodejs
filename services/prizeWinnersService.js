var uuid = require('uuid');
var fs = require('fs');
var _ = require('lodash');
var Promise = require('bluebird');

var PrizeWinnersService = {
    getPrizeWinnerByYear: function (year) {
        var prizeWinners = this.load();
        var prizeWinner = _.find(prizeWinners.prizes, ['year', year]);
        return Promise.resolve(prizeWinner);
    },
    load: function () {
        var json = fs.readFileSync('./data/prizeWinners.json', { encoding: 'utf8' });
        return JSON.parse(json);
    }
};

module.exports = PrizeWinnersService;