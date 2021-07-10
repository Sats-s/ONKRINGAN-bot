const { CommandoClient } = require('discord.js-commando');
const { Structures, MessageEmbed, MessageAttachment } = require('discord.js');
const path = require('path');
const discord = require('discord.js');
const snekfetch = require('snekfetch');
const request = require('node-superfetch');
const {
  prefix,
  token,
  discord_owner_id,
  xpdata1,
  xpdata2
} = require('./config.json');
const db = require('quick.db');
const Canvas = require('canvas');
//const prefix = async (message) => {
//db.fetch(`prefix_${message.guild.id}, text`)
//};

Structures.extend('Guild', function(Guild) {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        skipTimer: false, // only skip if user used leave command
        loopSong: false,
        loopQueue: false,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: prefix,
  owner: discord_owner_id
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['main command', ':notes: main Command Group:'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: true,
    unknownCommand: false,
    prefix: false,
    ping: false,
    help: false,
    commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
  client.channels.cache.get('716670517846736936').send('Sudah siap');
  // console.log("Sudah siap:3")
  console.log('Sudah siap:3');

  let statuses = [`I'M HORNY | e!help `, `Hololive supermercy | e!help `];
  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: 'PLAYING' });
  }, 3000);
  client.user.setStatus('idle');
});

client.on('voiceStateUpdate', async (___, newState) => {
  if (
    newState.member.user.bot &&
    !newState.channelID &&
    newState.guild.musicData.songDispatcher &&
    newState.member.user.id == client.user.id
  ) {
    newState.guild.musicData.queue.length = 0;
    newState.guild.musicData.songDispatcher.end();
    return;
  }
  if (
    newState.member.user.bot &&
    newState.channelID &&
    newState.member.user.id == client.user.id &&
    !newState.selfDeaf
  ) {
    newState.setSelfDeaf(true);
  }
});

//custom prefix
client.on('message', async message => {
if (message.guild.id == message.guild.id){
  const guild = db.get(`prefix_${message.guild.id}`)
if (db.has(`prefix_${message.guild.id}`)) {
       if(message.guild) message.guild.commandPrefix = guild;

    }
  message.guild.commandPrefix = guild;
}
})
client.login(token)

let count = 0;
setInterval(
  () =>
    require("node-fetch")(process.env.URL).then(() =>
      console.log(`here i pinged ${process.env.URL}`)
    ),
  35000
); 
