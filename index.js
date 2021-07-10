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


const client = new CommandoClient({
  commandPrefix: prefix,
  owner: discord_owner_id
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['command', ':notes: command Command Group:'],
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
  client.channels.cache.get('853262595263561759').send('Finish');
  // console.log("Sudah siap:3")
  console.log('Sudah siap');

  let statuses = [`IM HORNY!`, `Hololive Supermercy :3 `];
  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: 'PLAYING' });
  }, 3000);
  client.user.setStatus('DND');
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
