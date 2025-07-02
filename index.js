// // const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
// // const mineflayer = require('mineflayer')
// // const bot = bedrock.createClient({
// //   host: 'be.prownetwork.net', // minecraft server ip
// //   username: 'RickoED', // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
// //   auth: 'microsoft', // for offline mode servers, you can set this to 'offline'
// //   port: 19132,             // set if you need a port that isn't 25565
// //   version: "1.21",           // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
// // //   password: 'kuhabB4MXextend!'      // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
// // })

// // bot.on('chat', (username, message) => {
// //   console.log(`${username}: ${message}`)
// // //   if (username === bot.username) return
// // //   bot.chat(message)
// // })

// // bot.once('spawn', () => {
// //   mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
// // })

// // // Log errors and kick reasons:
// // bot.on('kicked', console.log)
// // bot.on('error', console.log)


// const bedrock = require('bedrock-protocol')

// const client = bedrock.createClient({
// host: 'be.prownetwork.net',
// port: 19132,
// version: '1.21.90',
// offline: false,
// username: 'EnrickoED'
// })

// let state = { entityId: null, position: { x:0, y:0, z:0 }, yaw:0, pitch:0 }
// let seqStarted = false

// client.on('start_game', packet => {
// state.entityId = packet.runtime_entity_id
// state.position = packet.player_position
// state.yaw = packet.rotation.x
// state.pitch = packet.rotation.y
// console.log('Bot spawned!')
// if (!seqStarted) startSequence()
// })

// client.on('move_player', packet => {
// if (packet.runtime_entity_id === state.entityId) {
// state.position = packet.position
// state.yaw = packet.yaw
// state.pitch = packet.pitch
// }
// })

// function startSequence() {
// seqStarted = true
// sendChat('Hello world')

// const auth = overrides => {
// client.queue('player_auth_input', {
// pitch: state.pitch,
// yaw: state.yaw,
// head_yaw: state.yaw,
// position: state.position,
// input_mode: 1,
// play_mode: 0,
// input_flags: {},
// move_vector: { x:0, y:0, z:0 },
// tick: BigInt(Date.now()),
// ...overrides
// })
// }

// auth({ input_flags: { forward: true }, move_vector: { x:1, y:0, z:0 } })
// setTimeout(() => {
// state.yaw = (state.yaw - 90 + 360) % 360
// auth({ yaw: state.yaw, head_yaw: state.yaw })


// auth({ input_flags: { forward: true }, move_vector: { x:1, y:0, z:0 } })
// setTimeout(() => {
//   auth({ input_flags: {}, move_vector: { x:0, y:0, z:0 } })
//   client.queue('interact', {
//     action: 1,
//     target_entity_runtime_id: state.entityId,
//     position: state.position
//   })
//   setTimeout(() => sendChat('/tpaccept'), 10000)
// }, 1000)
// }, 8000)
// }

// function sendChat(text) {
// client.queue('text', {
// type: 'chat',
// needs_translation: false,
// source_name: client.username,
// message: text,
// filtered_message: text,
// parameters: [],
// xuid: '',
// platform_chat_id: ''
// })
// }

// client.on('error', e => console.error('Error:', e))
// client.on('kicked', r => console.log('Kicked:', r))

// const bedrock = require('bedrock-protocol')

// const client = bedrock.createClient({
//   host: 'be.prownetwork.net',   // optional
//   port: 19132,         // optional, default 19132
//   version: '1.21.90',
//   username: 'EnrickoED',   // the username you want to join as, optional if online mode
//   offline: false       // optional, default false. if true, do not login with Xbox Live. You will not be asked to sign-in if set to true.
// })

// client.on('text', (packet) => { // Listen for chat messages from the server and echo them back.
//   // if (packet.source_name != client.username) {
//     // client.queue('text', {
//     //   type: 'chat', needs_translation: false, source_name: client.username, xuid: '', platform_chat_id: '', filtered_message: '',
//     //   message: `${packet.source_name} said: ${packet.message} on ${new Date().toLocaleString()}`
//     // })
//   // }
//   console.log(packet.source_name, packet.message)
// })

// setTimeout(() => {
//   client.queue('text', {
//     type: 'chat', needs_translation: false, source_name: client.username, xuid: '', platform_chat_id: '', filtered_message: '',
//     message: `/joinq ekonomi`
//   })
// }, 10000)

// setTimeout(() => {
//   client.queue('text', {
//     type: 'chat', needs_translation: false, source_name: client.username, xuid: '', platform_chat_id: '', filtered_message: '',
//     message: `Halo dunia!`
//   })
// }, 15000)

// setTimeout(() => {
//   client.queue('text', {
//     type: 'chat', needs_translation: false, source_name: client.username, xuid: '', platform_chat_id: '', filtered_message: '',
//     message: `/tpask Zervennt`
//   })
// }, 20000)
const bedrock = require('bedrock-protocol')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

const client = bedrock.createClient({
  host: 'be.prownetwork.net',
  port: 19132,
  version: '1.21.90',
  username: 'EnrickoED',
  offline: false,
  auth: fs.existsSync('./auth.json') ? require('./auth.json') : undefined
})

client.on('start_game', () => {
  console.log('Connected!')
})

client.on('session', (auth) => {
  fs.writeFileSync('./auth.json', JSON.stringify(auth))
})

client.on('error', e => console.error('Error:', e))
client.on('kicked', r => console.log('Kicked:', r))


const inputFile = path.join(__dirname, 'input.txt')

function recordGuessedWord(msg) {
  // cari pola "Kata yang benar: <word>"
  const m = msg.match(/Kata yang benar:\s*([^\s!]+)/i)
  if (!m) return
  const word = m[1].toLowerCase()
  const file = path.join(__dirname, 'wordlist.txt')
  fs.appendFile(file, word + '\n', err => {
    if (err) console.error('Gagal mencatat kata:', err)
    else console.log('Tercatat kata:', word)
  })
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', line => {
  if (!line.trim()) return
  client.queue('text', {
    type: 'chat',
    needs_translation: false,
    source_name: client.username,
    message: line,
    filtered_message: line,
    parameters: [],
    xuid: '',
    platform_chat_id: ''
  })
})

let awaiting = false
const listword = [
  'prowcloud',
  'rabbit',
  'prowfamily',
  'blaze',
  'cow',
  'fhmiwhyuda',
  'axolotl',
  'piglinbrute',
  'chicken',
  'dolphin',
  'minecraft',
  'wither',
  'magmacube',
]

const reslist = ["gg","ez","nice","lol","lmao","wkwk","asik","mantap","gaskeun","ngantuk","kocak","hebat","op","legend","cringe","bruh","serem","cakep","gacor","santuy","pusing","panik","tepar","auto","gila","kasian","susah","rekt","parah","capek","ngide","langsung","lagi","coba","yeay","hore","salah","fix","ampun","ngantuk","tidur","nt","waw","woah","mirip","bener","tipis","gampang","sulit","serius","njir","pede","nabrak","duar","awas","ayo","yuhu","yoi","horee","yaelah","lah","gaje","sedih","kece","ceria","mager","langsungin","tapiii","oke","buset","pecah","meledak","gacorrr","cepat","lambat","nyala","gelap","terang","muncul","ilang","lompat","dor","zebra","nopal","singa","panda","zombie","slime","muter","jauh","deket","healing","skill","ult","meta","update","baru","lama","nerf","buff"]


const anagramMap = {}
for (const w of listword) {
  anagramMap[w.split('').sort().join('')] = w
}

// helper to strip formatting
function strip(text) {
  return text.replace(/§./g, '').trim()
}

client.on('text', packet => {
  const msg = strip(packet.message)
  console.log(packet.source_name, msg)
  recordGuessedWord(msg)
  // Detect start of round
  if (/Orang pertama yang menguraikan kata ini menang!/i.test(msg)) {
    awaiting = true
    return
  }

  // If waiting and see "Kata:", attempt guess
  if (awaiting) {
    const m = msg.match(/Kata:\s*([a-zA-Z]+)/i)
    if (m) {
      const scrambled = m[1].toLowerCase()
      const key = scrambled.split('').sort().join('')
      const guess = anagramMap[key]
      if (guess) {
        client.queue('text', {
          type: 'chat',
          needs_translation: false,
          source_name: client.username,
          message: guess,
          filtered_message: guess,
          parameters: [],
          xuid: '',
          platform_chat_id: ''
        })
        console.log('Guessed:', guess)
        if (Math.random() < 0.5) {
        const response = reslist[Math.floor(Math.random() * reslist.length)]
        client.queue('text', {
          type: 'chat',
          needs_translation: false,
          source_name: client.username,
          message: response,
          filtered_message: response,
          parameters: [],
          xuid: '',
          platform_chat_id: ''
        })
        console.log('Sent extra:', response)
      }
      }
      awaiting = false
    }
  }
})

setInterval(() => {
  if (!fs.existsSync(inputFile)) return

  const line = fs.readFileSync(inputFile, 'utf8').trim()
  if (line) {
    // kirim ke chat
    client.queue('text', {
      type: 'chat',
      needs_translation: false,
      source_name: client.username,
      message: line,
      filtered_message: line,
      parameters: [],
      xuid: '',
      platform_chat_id: ''
    })
    console.log('Sent from file:', line)
    fs.writeFileSync(inputFile, '') // clear after reading
  }
}, 10000)