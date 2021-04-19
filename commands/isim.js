const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const set = require('../selection/settings.json')
const conf = require('../config.json')
module.exports.run = async(client, message, args) => {

if(!message.member.roles.cache.has(set.roller.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Bu komudu kullanamk için gerekli izinlere sahip değilsin').setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
if(!member) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Lütfen bir kullanıcı etiketleyin.')).then(x => x.delete({timeout: 10000}));
if(member.roles.highest.position >= message.member.roles.highest.position)  return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Bu kullanıcının rolleri sizden üstün veya aynı. Bu kullanıcının adını değiştiremezsiniz.')).then(x => x.delete({timeout: 10000}));
let isim = args[1]
if(!isim) return message.react("❌")
let yas = Number(args[2])
if(!yas) return message.react("❌")
let reklam = ['discord.gg', '.gg', 'gg', 'https', 'http', '.com', '.net']
if(reklam.some(r => isim.toLowerCase().includes(r))) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor('GOLD').setDescription('İsmine reklam içerikli şeyler koyamazsın.'))
if(!member.user.username.includes(set.taglar.tag)) {
member.setNickname(`${set.taglar.tagsız} ${isim} | ${yas}`)
} else if(member.user.username.includes(set.taglar.tag)) {
member.setNickname(`${set.taglar.tag} ${isim} | ${yas}`)
} message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription('İsim değiştirme işlemi başarılı').setColor('GREEN'))
};

exports.conf = {
    enabled: true,
    aliases: ['isim', 'nick'],
    guildOnly: true,
    permlevel: 0
  };
  
  exports.help = {
      name: 'isim'
  }