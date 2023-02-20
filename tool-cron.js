const cron = require('node-cron')

const url = 'http://localhost:3000/api/timeclock/refresh'
const params = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

var task = cron.schedule('*/10 * * * *', async function () {
    try {
        const res = await clockRefresh()
        console.log(`Success: ${res.msg} [${res.result.rowCount}]`)
    } catch (error) {
        console.error(`Error: ${error}`)
    }
})

async function clockRefresh() {
    const response = await fetch(url, params)
    const body = await response.json()
    return body
}

task.start()