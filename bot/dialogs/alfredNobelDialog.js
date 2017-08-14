var util = require('util');
var builder = require('botbuilder');

var lib = new builder.Library('alfredNobelDialog');
var MoreInformationAlt1 = 'more_information_alternative1';
var MoreInformationAlt2 = 'more_information_alternative2';
var Info = 'alfred_nobel_info';
var MoreInfo = 'alfred_nobel_additional_info';

lib.dialog('/', [
    function (session, args, next) {
        if (session.message.text === session.gettext(MoreInformationAlt1)) {
            session.send(session.gettext(MoreInfo));
            return session.endDialogWithResult({});
        } 

        session.send(session.gettext(Info));
        next();
    },
    function (session, args, next) {
        var moreInformationQuestionCard = new builder.HeroCard(session)
            .title('')
            .subtitle('more_information_text')
            .buttons([
                builder.CardAction.imBack(session, session.gettext(MoreInformationAlt1), MoreInformationAlt1),
                builder.CardAction.imBack(session, session.gettext(MoreInformationAlt2), MoreInformationAlt2)
            ]);

        session.send(new builder.Message(session)
            .addAttachment(moreInformationQuestionCard));
    }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
    return lib.clone();
};