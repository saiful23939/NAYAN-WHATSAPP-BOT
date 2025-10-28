const axios = require("axios");

module.exports = {
  config: {
    name: "bot",
    aliases: ["sim"],
    permission: 0,
    prefix: "both",
    categorie: "AI Chat",
    cooldowns: 5,
    credit: "Developed by Mohammad Nayan",
    usages: [
      `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
      `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
    ],
    description: "Engage in conversations with an AI-powered bot!",
  },

  start: async function ({ api, event, args }) {
    const { threadId, message, senderId } = event;
    const usermsg = args.join(" ");

    
    if (!usermsg) {
      const greetings = [
  "এতো ডাইকো না মায়ায় পড়ে যাবা 😌🫶",
  "আমাকে এতো ডাকার কারণ কি 🫣",
  "আইলাবিউ বলো 😬",
  "হয় তুমি আমার সাথে প্রেম করবা নয়তো তোমার বান্ধুবীর সাথে আমার প্রেম করাই দিবা 🙂👍",
  "+8801336035083এই নেও আমার বসের নাম্বার আর প্রেম শুরু করে দাও 😬",
  "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি",
  "আমাকে এতো না ডেকে বস সাফি কে একটা গার্লফ্রেন্ড দে 🙄",
  "শুধু তোমাকেই ভালোবেসে, যতো রকমের হুগা মারা আছে সবই আমি খাইসি 🥲",
  "এই যে শুনছেন, আমি কিন্তু আপনার জন্যই অনলাইনে আছি 😉",
  "আমাকে এতো ডাকবেন না, একবার আসার পথে উষ্ঠা খেয়ে পরে গেছি 🥹",
  "মনে হয় ভালোবসো 🐸🎀",
  "ডাকতে ডাকতে যদি প্রেমে পড়ে যান, দায় আমি নেব না ❤️",
  "তোমাকে দেখে দিলাম আমি পাদিয়া, তুমি কি জানো তোমার নানির নাম সাদিয়া 😒",
  "পরের জন্মে পাখি হয়ে জন্মাবো, যেনো তোমার মাথায় হেগে দিতে পারি 😐",
  "আমার সোনার বাংলার পরের লাইন কি ?😋",
  "তুমি কি জানো না তোমাকে না দেখলে আর পরান ডা হাডি যায় 😅🐸",
  "ওহ জান উম্মমাহ সোনা আইলাবিউ, লালালা লা লালা 🫣💅"
];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${senderId.split('@')[0]}, ${randomGreeting}`,
        mentions: [senderId],
      }, { quoted: message });

      
      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: greetingMessage.key.id,
        type: "chat"
      });

      return;
    }

    
    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Bot command error:", err);
      return api.sendMessage(threadId, { text: "❌ Something went wrong while talking with bot." }, { quoted: message });
    }
  },


  handleReply: async function ({ api, event, handleReply }) {
    
    const { threadId, message, body, senderId } = event;

    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Error in bot handleReply:", err);
      return api.sendMessage(threadId, { text: "❌ Failed to continue conversation." }, { quoted: message });
    }
  }
};
