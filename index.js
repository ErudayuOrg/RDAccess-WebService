const express = require('express');
const bodyParser = require('body-parser'); 
const socket = require('socket.io');
const cors = require('cors');

const userRouter = require("./route/user.routes");
const projectRouter = require("./route/project.routes");
const publicationRouter = require("./route/publication.routes");
const fundingnRouter = require("./route/funding.routes");
const departmentRouter = require("./route/department.routes");

const requestLogger = require("./utils/requestLogger");
const errorLogger = require("./utils/errorLogger");

const app = express();

app.use(cors());

app.use(requestLogger);
app.use(bodyParser.json());
app.use('/user',userRouter);
app.use('/department',departmentRouter);
app.use('/project',projectRouter);
app.use('/publication',publicationRouter);
app.use('/funding',fundingnRouter);
app.use(errorLogger);


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));



/*==============socket=================*/ 
const io = socket(server);
let users = {};
io.sockets.on('connection', socket =>{
    socket.on('connectUser', data=>{
        console.log("In coming data :------------");
        console.log(data);
        users[data.userId] = socket;
        //trigger when required
        let noti = { to: 'ADMINID', message: `${data.userId} logged in`};
        message('notifyAdmin', noti);
    })
})

 const message = (event,data) =>{
     console.log(`event : ${event}`);
    // users[data.to].emit(event, data);
 }