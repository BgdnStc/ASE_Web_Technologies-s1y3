import express from 'express'
import Sequelize from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my.db'
})

let FoodItem = sequelize.define('foodItem', {
    name: Sequelize.STRING,
    category: {
        type: Sequelize.STRING,
        validate: {
            len: [3, 10]
        },
        allowNull: false
    },
    calories: Sequelize.INTEGER
}, {
    timestamps: false
})


const app = express()
app.use(express.json())

app.get('/create', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        for (let i = 0; i < 10; i++) {
            let foodItem = new FoodItem({
                name: 'name ' + i,
                category: ['MEAT', 'DAIRY', 'VEGETABLE'][Math.floor(Math.random() * 3)],
                calories: 30 + i
            })
            await foodItem.save()
        }
        res.status(201).json({ message: 'created' })
    }
    catch (err) {
        console.warn(err.stack)
        res.status(500).json({ message: 'server error' })
    }
})

app.get('/food-items', async (req, res) => {
    try {
        let foodItems = await FoodItem.findAll()
        res.status(200).json(foodItems)
    }
    catch (err) {
        console.warn(err.stack)
        res.status(500).json({ message: 'server error' })
    }
})

app.post('/food-items', async (req, res) => {
    try {
        if (req.body.name == null && req.body.category == null && req.body.calories == null) {
            return res.status(400).json({ message: 'body is missing' })
        } else if (req.body.name == null || req.body.category == null || req.body.calories == null) {
            return res.status(400).json({ message: 'malformed request' })
        } else if (req.body.calories < 0) {
            return res.status(400).json({ message: 'calories should be a positive number' })
        } else if (!['MEAT', 'DAIRY', 'VEGETABLE'].includes(req.body.category)) {
            return res.status(400).json({ message: 'not a valid category' })
        }
        return res.status(201).json({ message: 'created' })
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })
    }
})

export default app