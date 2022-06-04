const express = require('express');
const path = require('path');
const snoowrap = require('snoowrap');

const app = express();



// listen for requests
app.listen(3000);

// SERVE HOMEPAGE
app.get('/',(req,res) => {
    //console.log(__dirname);
    res.sendFile('/web-dev/portfolio-site/frontend/index.html');
});

// SERVE REACT APP
app.get('/react', (req,res) => {
    res.sendFile('/web-dev/portfolio-site/backend/build/index.html')
});

//FOODIT
const foodSubReddits = ['cooking','recipes','cookingforbeginners','mealprepsunday','eatcheapandhealthy',
'cheap_meals','slowcooking','askculinary','fromscratch','culinaryplating','wewantplates','shittyfoodporn',
'foodporn','bento','grease','fried','todayiate','fastfoodwar','bacon','bachelorchef','breadit','breakfast',
'cheese','cheeseburgers','chiliconcarne','concession_stands','cookie','tonightsdinner','food','FoodBlog',
'foodscience','fffffffuuuuuuuuuuuud','eatsandwiches','spicy','snacks','sushi','tacos','appetizers','Pizza',
'Random_Acts_Of_Pizza','JapaneseFood','BBQ','pasta','budgetfood'];

let testLoop = async (foodReddits) => {
    console.log('getting reddit data')
    const r = new snoowrap({
        userAgent: 'put your user-agent string here',
        clientId: 'GJ3FAPXYsdxYrcoCDatmBg',
        clientSecret: '1qqegxSOX1brTrNa690Oh7W1Yyvu0w',
        username: 'thebadlywriter',
        password: 'iruleyou68'
      });
    
    let data = [];
    for (let index = 0; index < foodReddits.length; index++) {
        console.log('getting ' + foodReddits[index]);
        const subreddit = await r.getSubreddit(foodReddits[index])
        const topPosts = await subreddit.getTop({time: 'day', limit: 100})
        
        topPosts.forEach((post) => {
            if (post.thumbail != '' || 'self'){
                console.log(post.thumbnail);
            }
            //console.log(post)
            data.push({
            link: post.url,
            text: post.title,
            score: post.score
            })
        })
    
    //console.log(data);
    }
}

// GET TOKEN FROM REDDIT
app.get('/foodit', (req,res) => {
     var g = testLoop(foodSubReddits);
   // res.redirect('https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=TYPE&state=RANDOM_STRING&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING');
});


function handleErrors(err, req, res, next) {
    res.send(err);
  }

app.use(handleErrors);