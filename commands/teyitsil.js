const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const kdb = new datab.table("kullanici")
const set = require('../selection/settings.json')
const conf = require('../config.json')
module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Bu komudu kullanamk için gerekli izinlere sahip değilsin').setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
      let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
     
     


/*let toplamm = await kdb.get(`nioche.${member.id}.toplam`);
if(toplamm === null) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription('Kullanıcınını kayıt verisi bulunmamaktadır'))
if(toplamm === undefined) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription('Kullanıcınını kayıt verisi bulunmamaktadır'))
*/
 if(!member) {
   let toplam = kdb.delete(`nioche.${message.author.id}.toplam`)
let erkek = kdb.delete(`nioche.${message.author.id}.erkek`)
  let kadin = kdb.delete(`nioche.${message.author.id}.kiz`) 
  message.channel.send(new MessageEmbed().setColor('#7cfc00').setDescription('Kayıt verilerin başarıyla sıfırlandı'))
   } 
  
if (member) {
let toplam = kdb.delete(`nicohe.${member.id}.toplam`)
 let erkek = kdb.delete(`nicohe.${member.id}.erkek`)
 let kadin = kdb.delete(`nicohe.${member.id}.kiz`)
    message.channel.send(new MessageEmbed().setColor('#7cfc00').setDescription('Kullanıcının kayıt verileri başarıyla sıfırlandı'))
   }

};

exports.conf = {
    enabled: true,
    aliases: ['teyitsil'],
    guildOnly: true,
    permlevel: 0
  };
  
  exports.help = {
      name: 'teyitsil'
  }