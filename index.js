const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const express = require('express')
const app = express()
const morgan = require ('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors');
const PORT = process.env.PORT || 3000
const connectDB = require('./config/connect')
const fs = require('fs');
const swaggerJsdoc= require('swagger-jsdoc') 
const swaggerUi= require('swagger-ui-express')
//const swaggerDocs = require('./swagger.js')
const { notFound, errorHandler } = require("./middlewares/errorHandler")
const authRoute = require('./routes/auth')
const postRoute = require('./routes/postRoute')
const categoryRoute = require('./routes/categoriesRoute')
const newsletterRoute = require('./routes/newsletterRoute')
const skillsRoute = require('./routes/skillsRoute')
const projectsRoute = require('./routes/projectsRoute')
const subscriberRoute = require('./routes/subscriberRoute')


app.use(cors());


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      description: 'API documentation for blog and portfolio',
      version: '1.0.0',
    },
    servers: [
      {
        url: `https://marvin-n1cb.onrender.com/`,
        description: 'Dev environment'
      }
    ]
  }


  const options = {
    swaggerDefinition,
    apis: [`${__dirname}/routes/*.js`],
    yaml: fs.readFileSync('./docs/swagger.yaml', 'utf-8'),
  };
  
  
  const swaggerSpec = swaggerJsdoc(options)



app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/category', categoryRoute)
app.use('/api/newsletter', newsletterRoute)
app.use('/api/skills', skillsRoute)
app.use('/api/projects', projectsRoute)
app.use('/api/subscriber', subscriberRoute)
app.use('/api/docs', swaggerUi.serve,swaggerUi.serve, swaggerUi.setup(swaggerSpec) )



app.use(notFound);
app.use(errorHandler) //was app.request(errorHandler)...in case anything goes wrong




const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL) 
        //swaggerDocs()
        
        app.listen(PORT, console.log(`server is live on PORT ${PORT}..`))
    } catch (error) {
        console.log(error)
    }
}


start()