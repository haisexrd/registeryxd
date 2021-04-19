
const Discord = require('discord.js');
const client = new Discord.Client();
const conf = require('./config.json');
const set = require('./selection/settings.json');
const db = require('quick.db')
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment') 
require('./util/eventLoader')(client);
var prefix = conf.prefix;


client.on("ready", async () => {
    client.user.setPresence({ activity: { name: "Haise ❤️ Viana" }, status: "idle" });
    let botchannel = client.channels.cache.get(conf.botses);
    if (botchannel) botchannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  });


const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`${  files.undefined} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  if (!message.guild) {
      return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === conf.sahip) permlvl = 5;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('ready', () => {
  console.log(client.user.username)
})

client.login(conf.token)

////KOMUTLAR BUNLAR KNK XD \\\\\\

client.on("guildMemberAdd", member => {
  member.roles.add(set.roller.unregister); 
});

client.on("guildMemberAdd", member => {
    member.setNickname(set.isimler.isimyas);
  });


  
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

client.on("guildMemberAdd", member => {  
  const kanal = member.guild.channels.cache.find(r => r.id === "KANAL ID");
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
 
  var kontrol;
if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil'
if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor'
  moment.locale("tr");
    const hg = new Discord.MessageEmbed()
    .setAuthor(member.guild.name)
.setDescription("**Hoşgeldin! <@" + member + "> Seninle \`" + member.guild.memberCount + "\` Kişiyiz.\n\nTeyit Odalarından Birine Geçip Kayıt Olabilirsin. \n\n <@&${set.roller.yetkili}> seninle ilgilenicektir. \n\n Hesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n"  + kontrol + "\n\nEkibimize Girerek bize destek olabilirsin.**\n")
 kanal.send(hg)   
   kanal.send(set.kanallar.kayıtkanal) 
});

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG


//HAISE YAZDI CALAN OC