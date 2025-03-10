// 1. library imports
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

// 2. app settings
const app = express()
const encodedParser = bodyParser.urlencoded({extended: true})
const up = multer({dest: "public/upload"})
const up2 = multer({dest: "public/upload2"})

app.use(express.static('public')) // setting the static file location to be public (css, front-end js, assets like images)
app.use(encodedParser) // allows express to parse the body of the request (req.body)
app.set("view engine", "ejs") // allows us to use ejs, specifically with render
app.use(express.static('public')); //try to add javascript for welcome ejs

let myPostArray = []
let myInspoArray = []



// 3. routes


let randomInspo = null;
let lastUpdated = 0; // Timestamp of the last update
const updateInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function getRandomInspo() {
    const now = Date.now();
    if (!randomInspo || now - lastUpdated > updateInterval) {
        if (myInspoArray.length > 0) {
            randomInspo = myInspoArray[Math.floor(Math.random() * myInspoArray.length)];
            lastUpdated = now;
        }
    }
}

//  to update randomInspo before rendering pages
function updateInspoMiddleware(req, res, next) {
    getRandomInspo();
    next();
}

app.use(updateInspoMiddleware); // Apply the middleware to all routes
// date for today
app.use((req, res, next) => {
    res.locals.currentDate = new Date();
    next();
});


app.get('/main', (req, res) => {
    res.render('main.ejs', { randomInspo, allPosts: myPostArray });
});

app.get('/messages', (req, res) => {
    res.render('messages.ejs', { randomInspo, allPosts: myPostArray });
});


app.get('/main', (req, res)=>{
    res.render('index.ejs', {allPosts: myPostArray})
})

app.get('/inbox', (req, res)=>{
    res.render('inbox.ejs', {allInspos: myInspoArray})
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})



// app.get('/inputs', (req, res) => {
//     res.render('inputs.ejs')
// })

app.get('/main', (req, res) => {
    res.render('index.ejs', { randomInspo })
})







app.post('/upload', up.single("theimage"), (req, res)=>{
    let now = new Date()

    // local temporary post obj that determines the structure of each element in the array
    let post = {
        text: req.body.textMessage,
    
        date: now.toLocaleString()
    }
            // Check if file exists
            if (req.file) {
                post.imgUrl = "upload/" + req.file.filename;  // Corrected variable name
            }
        
            // Now pushing into the correct array
            myPostArray.unshift(post);
        
            res.redirect('/main'); 
    });

    app.post('/upload2', up2.single("theimage"), (req, res)=>{
        // let now = new Date()
    
        // local temporary post obj that determines the structure of each element in the array
        let input = {
            text: req.body.textInput,
            
        }

                myInspoArray.unshift(input);
            
                res.redirect('/inbox'); 
        });


    






    // add1
    app.get('/messages', (req, res) => {
        res.render('messages.ejs', { allPosts: myPostArray });
    });

    app.get('/inputs', (req, res) => {
        res.render('inputs.ejs', { allInspos: myInspoArray });
    });









// 4. listener
app.listen(3333, ()=>{
    console.log('server is live at http://127.0.0.1:3333')
})