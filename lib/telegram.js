exports = module.exports = { pushContent };

const config = require("../config");
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(config.telegramToken);

async function pushContent(receiver, specialContentType, content) {
    switch (specialContentType) {
        case "image":
            await bot.sendPhoto(receiver, content.photoLink);
            break;
        default:
            await bot.sendMessage(receiver, `${content.title}\n\n${content.text}`);
            break;
    }
}