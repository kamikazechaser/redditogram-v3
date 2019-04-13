exports = module.exports = { getHotPosts };

const request = require("node-fetch");

async function getHotPosts(subReddit) {
    const jsonData = await request(`https://reddit.com/r/${subReddit}.json`).then(response => response.json());

    if (jsonData.data.dist > 0) return jsonData.data.children;

    throw new Error("subreddit does not exist");
};