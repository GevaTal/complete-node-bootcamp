const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
//console.log(process.env);
const app = require('./app');
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

const x = 23;
x = 5;
