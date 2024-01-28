const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.locals.data = [{
    name: 'jim',
    job: 'engineer'
}, {
    name: 'tim',
    job: 'accountant'
}, {
    name: 'ann',
    job: 'accountant'
}]

app.get('/employees', (req, res) => {
    res.status(200).json(app.locals.data.filter(employee => employee.job === 'accountant'));
})

module.exports = app
