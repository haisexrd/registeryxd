const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const kdb = new db.table("kullanici")
const set = require('../selection/settings.json')
const conf = require('../config.json')
module.exports.run = async(client, message, args) => {
    if(!message.member.roles.cache.has(set.roller.yetkili) && !message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Bu komudu kullanamk için gerekli izinlere sahip değilsin').setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) {
   let erkek = kdb.fetch(`nioche.${message.author.id}.erkek`)
   let kadin = kdb.fetch(`nioche.${message.author.id}.kiz`)
   let toplam = kdb.fetch(`nioche.${message.author.id}.toplam`)
   if(erkek === null) erkek = "0"
   if(kadin === null) kadin = "0"
  if(toplam === null) toplam = "0"
  if(erkek === undefined) erkek = "0"
  if(kadin === undefined) kadin = "0"
 if(toplam === undefined) toplam = "0"
const embed = new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setColor('#009acd')
.setDescription(`Toplam \`${toplam}\` adet teyitiniz bulunmaktadır. [\`${erkek}\` adet erkek ve \`${kadin}\` adet kız]`)
.setFooter(conf.status)
.setTimestamp()
message.channel.send(embed)
}
if (member) {
    let erkek = kdb.fetch(`nioche.${member.id}.erkek`)
    let kadin = kdb.fetch(`nioche.${member.id}.kiz`)
    let toplam = kdb.fetch(`nioche.${member.id}.toplam`)
    if(erkek === null) erkek = "0"
    if(kadin === null) kadin = "0"
   if(toplam === null) toplam = "0"
   if(erkek === undefined) erkek = "0"
   if(kadin === undefined) kadin = "0"
  if(toplam === undefined) toplam = "0"
 const embed = new MessageEmbed()
 .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
 .setColor('#009acd')
 .setDescription(`Kullanıcının toplam \`${toplam}\` adet teyiti bulunmaktadır. [\`${erkek}\` adet erkek ve \`${kadin}\` adet kız]`)
 .setFooter(conf.status)
 .setTimestamp()
 message.channel.send(embed)

};


};

exports.conf = {
    enabled: true,
    aliases: ['teyitsay', 'teyitbilgi'],
    guildOnly: true,
    permlevel: 0
  };
  
  exports.help = {
      name: 'teyitsay'
  }