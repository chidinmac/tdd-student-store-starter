// YOUR CODE HERE
const express = require("express")
const morgan = require ('morgan')
const STORE = require('./routes/store')
const cors = require('cors')
 const { NotFoundError } = require('./utils/errors')
const app = express()

app.use(morgan('tiny'))
app.use(express.json());
app.use(cors())

app.use('/store', STORE)


// For any route that cannot be found
app.use((req, res, next) => {
	return next(new NotFoundError())
  })

app.use((error, req,res,next) =>{
    const{ status, message} = error
    const errorObject ={
        status: status || 500,
        message: message || "Something went wrong in the appliaction"
    }
    res.status(status).send({error: errorObject})
})
app.get("/test", (req, res) => {
	res.status(201).send({'sing': 'song'})
});

module.exports = app;
