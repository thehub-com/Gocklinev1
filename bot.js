const TelegramBot = require('node-telegram-bot-api')
const crypto = require('crypto')
const { BOT_TOKEN, ADMINS } = require('./config')

const bot = new TelegramBot(BOT_TOKEN, { polling: true })

// временное хранилище токенов
const tokens = new Map()

function generateToken() {
  return crypto.randomBytes(16).toString('hex')
}

bot.onText(/\/start/, (msg) => {
  const tgId = msg.from.id
  const token = generateToken()

  tokens.set(token, {
    tgId,
    role: ADMINS.includes(tgId) ? 'admin' : 'user'
  })

  bot.sendMessage(
    tgId,
    `✅ Твой токен:\n\n${token}\n\nВставь его на сайте`
  )
})

module.exports = { tokens }
