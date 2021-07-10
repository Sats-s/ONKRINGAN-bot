const { Command } = require('discord.js-commando');

module.exports = class ShutdownCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shutdown',
      aliases: ['restart'],
      group: 'test',
      memberName: 'shutdown',
      description: 'Command only developer bot',
      guildOnly: true,
      ownerOnly: true,
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
  
  	async run(message) {
 
 
     await  message.channel.send("Restarting...");
         
     process.exit(0);
    }
    };
  
