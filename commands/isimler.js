const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const set = require('../selection/settings.json')
const conf = require('../config.json')
module.exports.run = async(client, message, args) => {
if(!message.member.roles.cache.has(set.roller.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Bu komudu kullanamk için gerekli izinlere sahip değilsin').setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Lütfen bir kullanıcı etiketleyin.')).then(x => x.delete({timeout: 10000}));
var sayı = 1
let data = db.get(`isim.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed().setDescription('Bu kullanıcının isim geçmişi bulunmamaktadır.').setColor('RED')).then(x => x.delete({timeout: 10000}));
let isimler = data.filter(x => x.user === member.id).map(x => `\`${sayı++}\` **• ${x.name} | ${x.age}** (<@&${x.rol}>)`).splice(0, 30)
const nioche = new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setColor('#778899')
.setFooter(conf.status).setTimestamp()
.setDescription(`**Kullanıcının toplam ${sayı-1} adet isim kaydı bulundu**\n
${isimler.join('\n') || "Temiz"}`)
message.channel.send(nioche).then(x => x.delete({timeout: 25000}));
};    

exports.conf = {
    enabled: true,
    aliases: ['isimler'],
    guildOnly: true,
    permlevel: 0
  };
  
  exports.help = {
      name: 'isimler'
  }