var builder = require('botbuilder');

var lib = new builder.Library('userInformationDialog');

// Recipient & Sender details
lib.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'name_question');
    },
    function (session, args) {
        session.dialogData.name = args.response;
        session.beginDialog('validators:birthYear', {
            prompt: session.gettext('birth_year_question'),
            retryPrompt: session.gettext('invalid_birth_year')
        });
    },
    function (session, args) {
        session.dialogData.birthYear = args.response;
        builder.Prompts.text(session, 'country_question');

    },
    function (session, args) {
        session.dialogData.country = args.country;
        var userInfo = {
            name: session.dialogData.name,
            birthYear: session.dialogData.birthYear,
            country: session.dialogData.country
        };
        session.endDialogWithResult({ userInfo: userInfo });
    }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
    return lib.clone();
};