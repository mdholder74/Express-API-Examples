const express = require('express');
const exphbs = require('express-handlebars');// This is used to work with handlebars templates
const app = express();// This initializes the express application
const path = require('path');// This is used to work with file and directory paths
const members = require('./Members');// This imports the members array from the members.js file

const logger = require('./middleware/logger');// This imports the logger middleware function from the logger.js file

const port = process.env.PORT || 5000;// Process.env.PORT is used to get the port number from the environment variable

// Initialize middleware
// app.use(logger);// This uses the logger middleware function

// Handlebars Middleware
// This sets the default layout for the handlebars templates
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// index route inside of veiw folder
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Member App',
        members,
    });
});

//EXAMPLE 1 (Default Route)
// This creates a default route that sends a response to the client
// app.get('/', (req, res) => {
//     res.send('<h1>Hello World</h1>');
// }); 

// This is used to parse JSON data from the request body
// This handles both JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//EXAMPLE 2 (Static Files)
// express.static() is used to serve static files from the public directory
// path.join() is used to join the current directory with the public directory
app.use(express.static(path.join(__dirname, 'public')));

// This uses the members router from the members.js file
app.use('/api/members', require('./routes/api/members'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});