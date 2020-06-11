const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const userRouter = require("./route/user.routes");
const projectRouter = require("./route/project.routes");

const requestLogger = require("./utils/requestLogger");
const errorLogger = require("./utils/errorLogger");

const app = express();

app.use(cors());

app.use(requestLogger);
app.use(bodyParser.json());
app.use('/user',userRouter);
app.use('/project',projectRouter);
app.use(errorLogger);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));