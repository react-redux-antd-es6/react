const http = require('http')
const _map = require('./interfaceMap')
const _filter = require('./interfaceFilter')
const Mock = require('mockjs')

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true,
  })
  if (req.method === 'OPTIONS') {
    res.end(null)
  }
  if (req.method === 'POST') {
    let postData = ''
    req.addListener('data', dataBuffer => postData += dataBuffer)
    req.addListener('end', () => {
      console.log('url=>', req.url)
      postData = JSON.parse(postData)
      const originData = _map[req.url]
        ? Mock.mock(_map[req.url])
        : ''
      const data = typeof (_filter[req.url]) === 'function'
        ? _filter[req.url](originData, postData)
        : originData
      // const data = originData
      setTimeout(() => {
        console.log(data)
        res.end(JSON.stringify(data))
      }, parseInt(((Math.random() - 0.5) + 1) * 500), 10) // 0-2s的随机数
    })
  }
}).listen(1111)
console.log('正在监听1111端口')
