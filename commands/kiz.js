const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const kdb = new db.table("kullanici")
const conf  = require('../config.json')
const set = require('../selection/settings.json')
module.exports.run = async(client, message, args) => {
if(!message.member.roles.cache.has(set.roller.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor('RED').setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsin.').setFooter(conf.status)).then(x => x.delete({timeout: 15000}));

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Lütfen bir kullanıcı etiketleyin.').setFooter(conf.status).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 15000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription('Kendinizi kayıt edemezsiniz.').setFooter(conf.status)).then(x => x.delete({timeoput: 15000}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription('Sunucu sahibini kayıt edemem!').setFooter(conf.status)).then(x => x.delete({timeout: 15000}));
if(member.id === client.user.id) return message.react("❌")
if(member.roles.highest.position >= message.member.roles.highest.position) return message.react("❌")
let number = await db.fetch('case')
if(number === null) number = "0"
if(number === undefined) number = "0"

  //TAGLI ALIM İÇİN /* ve */ kaldırın
  /* 
  if(db.fetch(`tag.${message.guild.id}`)) {
  if(!member.user.username.includes(set.taglar.tag) && !member.roles.cache.has(set.roller.vip) && !member.roles.cache.has(set.roller.booster)) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter('Bu uygulamadan \`VIP\` ve \`BOOSTER\` üyeler etkilenmez.').setDescription('Sunucumuuz şuanda taglı alımdadır. Tagımızı \`${set.taglar.tag}\`alarak kayıt olabilirsiniz.')).then(x => x.delete({timeout: 15000}));
  }*/

let isim = args[1]
if(!isim) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(conf.status).setDescription('Bir isim girin.')).then(x => x.delete({timeout: 15000}));
let yas = args[2]
if(!yas) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(conf.status).setDescription('Bir yaş girin.')).then(x => x.delete({timeout: 15000}));


if(member.roles.cache.has(set.roller.erkek) || member.roles.cache.has(set.roller.erkek2) || member.roles.cache.has(set.roller.kız) || member.roles.cache.has(set.roller.kız2)) {
  return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Bu kullanıcı zaten kayıt olmuş!'))}


if(!member.user.username.includes(set.taglar.tag)) {
    member.setNickname(`${set.taglar.tagsız} ${isim} | ${yas}`)
    member.roles.add(set.roller.kız)
    member.roles.add(set.roller.kız2)
    member.roles.remove(set.roller.unregister)
} else  {
    member.setNickname(`${set.taglar.tag} ${isim} | ${yas}`)
    member.roles.add(set.roller.tagrol)
    member.roles.add(set.roller.kız)
    member.roles.add(set.roller.kız2)
    member.roles.remove(set.roller.unregister)
}

kdb.add(`nioche.${message.author.id}.kiz`, 1)
kdb.add(`nioche.${message.author.id}.toplam`, 1)
db.add('case', 1)
db.push(`isim.${message.guild.id}`, {
  user: member.id,
  name: isim,
  age: yas,
  rol: `${set.roller.kız}`
});


const embed1 = new MessageEmbed()
.setColor('PURPLE')
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setFooter(conf.status)
.setTimestamp()
.setDescription(`${member} kullanıcı <@&${set.roller.kız}> olarak kayıt edildi.`)
client.channels.cache.get(set.kanallar.kayıtkanal).send(embed1)

const embed2 = new MessageEmbed()
.setColor('RANDOM')
.setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
.setFooter(conf.status)
.setTimestamp()
.setDescription(`Kayıt Edilen Kullanıcı: ${member} - \`${member.id}\`\nKayıt Eden Yetkili: ${message.author} - \`${message.author.id}\`\nVerilen Rol: <@&${set.roller.kız}>, <@&${set.roller.kız2}>\nAlınan Rol: <@&${set.roller.unregister}>\nKayıt ID: \`#${number}\``)
client.channels.cache.get(set.kanallar.log).send(embed2)

client.channels.cache.get(set.kanallar.genelchat).send(`${member} aramıza katıldı herkes bi selam versin!`)


};

exports.conf = {
  enabled: true,
  aliases: ['kız', 'k', 'kadın'],
  guildOnly: true,
  permlevel: 0
};

exports.help = {
    name: 'kız'
}