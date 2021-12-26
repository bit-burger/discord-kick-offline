const { secret, include } = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();

require("./src/iterate_voices");

client.on("voiceStateUpdate", (oldVoice, newVoice) => {
  if (newVoice.channelID && include.includes(oldVoice.member.id)) {
    if (newVoice.member.user.presence.status === "offline") {
      kickVoice(newVoice);
    }
  }
});

client.on("presenceUpdate", (oldPresence, newPresence) => {
  if (newPresence.member.bot) return;
  if (!newPresence.member.voice.channel) return;
  if (oldPresence?.status !== "offline" && newPresence.status === "offline") {
    kickVoice(newPresence.member.voice);
  }
});

client.once("ready", () => {
  console.log("Bot started successfully");

  client.allVoiceStates().forEach((voiceState) => {
    if (
      voiceState.member.user.presence.status === "offline" &&
      include.includes(voiceState.member.id)
    ) {
      kickVoice(voiceState);
    }
  });
});

function kickVoice(voice) {
  voice.kick();
  voice.member.user.send(
    "Sorry you can't join a voice channel if you're offline"
  );
}

client.login(secret);
