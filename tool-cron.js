const cron = require('node-cron')

const url = 'http://localhost:3000/api/refresh'
const params = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

var task = cron.schedule('* */10 * * * *', function () {
    try {
        const res = clockRefresh()
        console.log(res)
    } catch (error) {
        console.error('Error: #%d', error)
    }
})

async function clockRefresh() {
    const response = await fetch(url, params)
    const body = await response.json()
    return body
}

task.start()