require('dotenv').config()
const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')

app.use(require('cors')())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const HistoricInfo = require('./models/HistoricInfo')
const RegionalInfo = require('./models/RegionalInfo')

// {
//     "state" : "Delhi",
//     "confirmed" : 2,
//     "active":3,
//     "recovered":4,
//     "deceased": 5
// }

app.post('/regionalInfo', async (req, res) => {
  const { state, confirmed, active, recovered, deceased } = req.body
  const regionalInfo = await RegionalInfo.findOneAndUpdate(
    { state },
    {
      state,
      confirmed,
      active,
      recovered,
      deceased,
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  )
  return res.send(regionalInfo)
})

// {
//     "state" : "2020-03-10",
//     "confirmed" : 2,
//     "active":3,
//     "recovered":4,
//     "deceased": 5
// }

app.post('/historicInfo', async (req, res) => {
  const { day, confirmed, active, deceased, recovered } = req.body
  console.log(req.body)
  const historicInfo = await HistoricInfo.findOneAndUpdate(
    { day },
    {
      day,
      confirmed,
      active,
      recovered,
      deceased,
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  )
  return res.send(historicInfo)
})

app.get('/getInfo', async (req, res) => {
  return res.send({
    historicInfo: await HistoricInfo.find().sort({ day: 1 }),
    regionalInfo: await RegionalInfo.find(),
  })
})

app.use((err, req, res, next) => {
  //   console.log(err)
  return res.send({ errors: [err.toString()] })
})

const dbName = process.env.REG_NO
mongoose
  .connect(
    `mongodb+srv://vaibhav:${process.env.MONGODB_USER_PASS}@cluster0.uwki7.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  )
  .then(async () => {
    await HistoricInfo.init()
    await RegionalInfo.init()

    console.log('connected to database')
    app.listen(process.env.PORT || 3000, () => {
      console.log('server running')
    })
  })
