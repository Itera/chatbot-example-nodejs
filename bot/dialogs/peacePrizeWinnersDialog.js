var builder = require('botbuilder');
var prizeWinnersService = require('../../services/prizeWinnersService');
var lib = new builder.Library('peacePrizeWinnersDialog');

var AskUserForDataText = 'ask_for_user_data_text';
var AskUserForDataAlt1 = 'ask_for_user_data_alternative1';
var AskUserForDataAlt2 = 'ask_for_user_data_alternative2';
lib.dialog('/',
    [
        function(session, args) {
            if (session.message.text === session.gettext(AskUserForDataAlt1)) {
                return session.beginDialog('userInformationDialog:/');
            }

            var welcomeCard = new builder.HeroCard(session)
                .title('')
                .subtitle(AskUserForDataText)
                .buttons([
                    builder.CardAction.imBack(session, session.gettext(AskUserForDataAlt1), AskUserForDataAlt1),
                    builder.CardAction.imBack(session, session.gettext(AskUserForDataAlt2), AskUserForDataAlt2)
                ]);

            session.send(new builder.Message(session)
                .addAttachment(welcomeCard));
        },
        function(session, args) {
            session.dialogData.userInfo = args.userInfo;
            prizeWinnersService.getPrizeWinnerByYear(session.dialogData.userInfo.birthYear).then(function (prizeWinner) {
                var message = "Visste du at " +
                    prizeWinner.laureates[0].surname +
                    " vant nobels fredspris det året du ble født?";
                session.send(message);
                return session.endDialogWithResult({});
            });
        }
    ]);


module.exports.createLibrary = function () {
    return lib.clone();
};