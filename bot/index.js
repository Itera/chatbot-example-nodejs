var builder = require('botbuilder');
var siteUrl = require('./site-url');

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var AlfredNobelOption = 'welcome_question_option1';
var PeacePrizeWinnersOption = 'welcome_question_option2';
var WelcomeTitle = 'welcome_title';
var WelcomeQuestionTitle = 'welcome_question_title';
var WelcomeQuestionText = 'welcome_question_text';

var bot = new builder.UniversalBot(connector, function (session) {

    if (session.message.text === session.gettext(AlfredNobelOption)) {
        return session.beginDialog('alfredNobelDialog:/');
    }
    if (session.message.text === session.gettext(PeacePrizeWinnersOption)) {
        return session.beginDialog('peacePrizeWinnersDialog:/');
    }
	
	session.send(session.gettext(WelcomeTitle));
	
    var welcomeCard = new builder.HeroCard(session)
        .title(WelcomeQuestionTitle)
        .subtitle(WelcomeQuestionText)
      .buttons([
          builder.CardAction.imBack(session, session.gettext(AlfredNobelOption), session.gettext(AlfredNobelOption)),
          builder.CardAction.imBack(session, session.gettext(PeacePrizeWinnersOption), session.gettext(PeacePrizeWinnersOption))
        ]);

    session.send(new builder.Message(session)
        .addAttachment(welcomeCard));
});

// Enable Conversation Data persistence
bot.set('persistConversationData', true);

// Set default locale
bot.set('localizerSettings', {
    botLocalePath: './bot/locale',
    defaultLocale: 'no'
});

// Sub-Dialogs
bot.library(require('./dialogs/alfredNobelDialog').createLibrary());
bot.library(require('./dialogs/peacePrizeWinnersDialog').createLibrary());
bot.library(require('./dialogs/userInformationDialog').createLibrary());

// Validators
bot.library(require('./validators').createLibrary());

// Send welcome when conversation with bot is started, by initiating the root dialog
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, '/');
            }
        });
    }
});

// Connector listener wrapper to capture site url
var connectorListener = connector.listen();
function listen() {
    return function (req, res) {
        // Capture the url for the hosted application
        // We'll later need this url to create the checkout link 
        var url = req.protocol + '://' + req.get('host');
        siteUrl.save(url);
        connectorListener(req, res);
    };
}

// Other wrapper functions
function beginDialog(userInformation, dialogId, dialogArgs) {
    bot.beginDialog(userInformation, dialogId, dialogArgs);
}

function sendMessage(message) {
    bot.send(message);
}

module.exports = {
    listen: listen,
    beginDialog: beginDialog,
    sendMessage: sendMessage
};