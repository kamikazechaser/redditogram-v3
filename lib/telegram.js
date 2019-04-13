exports = module.exports = { pushContent };

const config = require("../config");
const reddit = require("./reddit");
const Telegram = require("tgfancy");

const bot = new Telegram(config.telegramToken, config.telegramOpts);

bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, config.botInfo);
});

bot.onText(/\/add (\w+)/, (msg, match) => {
    return reddit.getHotPosts(match[1])
        .then(exists => pushContent(msg.chat.id, null, { title: "Successfully added subreddit", text: "" }))
        .catch(error => pushContent(msg.chat.id, null, { title: "Error adding subreddit", text: error.message }))
        .catch(error => console.error(error));
});

async function pushContent(receiver, specialContentType, content) {
    switch (specialContentType) {
        case "image":
            await bot.sendPhoto(receiver, content.photoLink);
            break;
        default:
            await bot.sendMessage(receiver, `${content.title}\n\n${content.text}`)
            break;
    }
}