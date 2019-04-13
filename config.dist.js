exports = module.exports = {
    telegramToken: "",
    telegramOpts: {
        polling: true,
        tgfancy: {
            textPaging: true,
            ratelimiting: {
                maxRetries: 3,
            },
        },
    },
    botInfo: "Redditogram v3",
}