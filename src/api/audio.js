import icecast from 'icecast'
import lame from 'lame'
import uuid from 'uuid'

// icecast => LAME MP3 decoder => LAME PCM encoder
const encoder = lame.Encoder({ channels: 2, bitDepth: 16, sampleRate: 44100 })
encoder.on('data', data => {
  writeDataToClients(data)
})

const decoder = lame.Decoder()
decoder.on('format', format => {
  decoder.pipe(encoder)
})

const icecastUrl = 'http://stream.silentdesko.com:12345'
icecast.get(icecastUrl, res => {
  res.on('data', data => {
    decoder.write(data)
  })
})

// client connection stuff
let clients = []

function writeDataToClients(data) {
  clients.forEach((client) => {
    client.res.write(data)
  })
}

function createClientConnection(req, res, next) {
  const connectionId = uuid.v4()
  clients.push({
    connectionId: connectionId,
    req: req,
    res: res,
    next: next
  })

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Connection': 'close',
    'Transfer-Encoding': 'identity'
  })

  res.connection.on('close', () => {
    closeClientConnection()
  })
}

function closeClientConnection(req, res, next) {
  clients.find((client, i) => {
    clients.splice(i, 1)
  })
}

export default (req, res, next) => {
  createClientConnection(req, res, next)
}
