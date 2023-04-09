const express = require('express')
const {json} = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded());

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
    format: combine(
      timestamp(),
      prettyPrint()
    ),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'success.log',level: 'info' }),
        new transports.File({filename: 'combined.log'})
      ],
  });

const add= (n1,n2) => {
    funcName=add.name;
    return [n1+n2,funcName];
}

const sub= (n1,n2) => {
    funcName=sub.name;
    return [n1-n2,funcName];
}


const mult= (n1,n2) => {
    funcName=mult.name;
    return [n1*n2,funcName];
}

const div= (n1,n2) => {
    funcName=div.name;
    return [n1/n2,funcName];
}
// Display all users in JSON format
app.get('/add',function(req,res){
    try{
        if(req.query.n1 == undefined || req.query.n2 == undefined) {
            res.status(400).send("Error: value of one or more parameters is not defined")
        }

        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        
        if (isNaN(n1) || isNaN(n2))
        {
            res.status(400).send(`Error: Value of either'${req.query.n1}' or '${req.query.n2} is not a number`)
            logger.log({
                level: 'error',
                message: `Error: Value of either'${req.query.n1}' or '${req.query.n2} is not a number`
              });
        }

        const numbers = add(n1,n2);
        result = numbers[0]
        res.status(200).json({statuscocde:200, data: result }); 
        logger.log({
            level: 'info',
            message: `Provided numbers have been addition,the result of addition of ${n1} and ${n2} is ${result}`,
            funcName: `${numbers[1]}`
          });
    }
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
        logger.log({
            level: 'error',
            message: 'Error while Adding numbers!',
            funcName: `${numbers[1]}`
          });
      }
    }
)


app.get('/sub',function(req,res){
    try{
        if(req.query.n1 == undefined || req.query.n2 == undefined) {
            res.status(400).send("Error: value of one or more parameters is not defined")
        }

        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        
        if (isNaN(n1) || isNaN(n2))
        {
            res.status(400).send(`Error: Value of either'${req.query.n1}' or '${req.query.n2} is not a number`)
        }

        const numbers = sub(n1,n2);
        result = numbers[0]
        res.status(200).json({statuscocde:200, data: result });
        logger.log({
            level: 'info',
            message: `Provided numbers have been subtracted,the result of subtraction of ${n1} and ${n2} is ${result}`,
            funcName: `${numbers[1]}`
          }); 
    }
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
        logger.log({
            level: 'error',
            message: 'Error while subtracting numbers!',
            funcName: `${numbers[1]}`
          });
      }
    }
)


app.get('/multiply',function(req,res){
    try{
           
        if(req.query.n1 == undefined || req.query.n2 == undefined) {
            res.status(400).send("Error: value of one or more parameters is not defined")
        }

        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        
        if (isNaN(n1) || isNaN(n2))
        {
            res.status(400).send(`Error: Value of either'${req.query.n1}' or '${req.query.n2} is not a number`)
        }

        const numbers = mult(n1,n2);
        result = numbers[0]

        res.status(200).json({statuscocde:200, data: result }); 
        logger.log({
            level: 'info',
            message: `Provided numbers have been multiplied,the result of multiplication of ${n1} and ${n2} is ${result}`,
            funcName: `${numbers[1]}`
          });
    }
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
        logger.log({
            level: 'error',
            message: 'Error while multiplying numbers!',
            funcName: `${numbers[1]}`
          });
      }
    }
)


app.get('/div',function(req,res){
    try{
        if(req.query.n1 == undefined || req.query.n2 == undefined) {
            res.status(400).send("Error: value of one or more parameters is not defined")
        }

        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        
        if (isNaN(n1) || isNaN(n2))
        {
            res.status(400).send(`Error: Value of either'${req.query.n1}' or '${req.query.n2} is not a number`)
        }

        const numbers = div(n1,n2);
        result = numbers[0]
        res.status(200).json({statuscocde:200, data: result }); 

        logger.log({
            level: 'info',
            message: `Provided numbers have been divided, the result of division of ${n1} and ${n2} is ${result}`,
            funcName: `${numbers[1]}`
          });
    }
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
        logger.log({
            level: 'error',
            message: 'Error while dividing numbers!',
            funcName: `${numbers[1]}`
          });
      }
    }
)
// Start web server  
app.listen(port, () => {
    console.log("App running at http://localhost:" + port)
})