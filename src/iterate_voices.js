const Discord = require("discord.js");
Discord.Client.prototype.allNonEmptyVoiceChannels = function () {
  return [
    ...this.channels.cache
      .filter((val) => val.type === "voice" && val.members.size !== 0)
      .values(),
  ];
};

Discord.Client.prototype.allVoiceStates = function () {
  const rV = [];
  this.allNonEmptyVoiceChannels().forEach((voiceChannel) => {
    const voices = [...voiceChannel.members.values()].map(
      (member) => member.voice
    );
    rV.push(...voices);
  });
  return rV;
};
