const Discord = require("discord.js");
const db = require('quick.db')
const conf = require("../config.json")
const moment = require("moment");
const ms = require('ms')
const set = require('../selection/settings.json')
const kdb = new db.table("kullanici")

   module.exports.run = async (client, message, args) => {
 let embed = new Discord.MessageEmbed().setThumbnail(message.guild.iconURL({dynamic: true})).setColor("RANDOM").setTimestamp();
  let data = await kdb.get("nioche") || {};
  let arr = Object.keys(data);
  let listedMembers = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkek || 0) + (data[b].kadın || 0)) - Number((data[a].erkek || 0) + (data[a].kadın || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} Toplam **${client.sayilariCevir((data[value].erkek || 0) + (data[value].kadın || 0))}**  (**${client.sayilariCevir((data[value].erkek || 0))}** Erkek  **${client.sayilariCevir((data[value].kadın || 0))}** Kız)`).splice(0, 30);
  message.channel.send(embed.setDescription(`${listedMembers.join("\n") || "Bu sunucudaki yetkililer kimseyi kayıt etmemiş!"}`)).catch();
};

exports.conf = {
  enabled: true,
  aliases: ['topteyit'],
  guildOnly: true,
  permlevel: 0
};

exports.help = {
    name: 'topteyit'
}