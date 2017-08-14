var builder = require('botbuilder');

var BirthYearRegex = new RegExp(/^(19|20)\d{2}$/);

var lib = new builder.Library('validators');


lib.dialog('birthYear', basicPrompterWithRegex(BirthYearRegex));

function basicPrompterWithRegex(regex) {
    return new builder.IntentDialog()
        .onBegin(function (session, args) {
            session.dialogData.retryPrompt = args.retryPrompt;
            session.send(args.prompt);
        }).matches(regex, function (session) {
            session.endDialogWithResult({ response: session.message.text });
        }).onDefault(function (session) {
            session.send(session.dialogData.retryPrompt);
        });
}

module.exports.createLibrary = function () {
    return lib.clone();
};

module.exports.BirthYearRegex = BirthYearRegex;
