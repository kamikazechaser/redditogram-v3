exports = module.exports = { pushContent };

const config = require("../config");
const reddit = require("./reddit");
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(config.telegramToken, { polling: true });

bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, config.botInfo);
});

bot.onText(/\/add (\w+)/, (msg, match) => {
    return reddit.getHotPosts(match[1])
        .then(exists => pushContent(msg.chat.id, null, { title: "Successfully added subreddit", text: "" }))
        .catch(error => pushContent(msg.chat.id, null, { title: "Error adding subreddit", text: error.message }))
        .catch(error => console.error(error.message));
});

async function pushContent(receiver, specialContentType, content) {
    switch (specialContentType) {
        case "image":
            await bot.sendPhoto(receiver, content.photoLink);
            break;
        default:
            await bot.sendMessage(reciever, `${content.title}\n\n${content.text}`)
            break;
    }
}