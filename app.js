const express = require('express');
const morgan = require('morgan');
const apps = require('./google-play-data.js');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;
    let results = [ ...apps ]

    if (sort && sort !== 'Rating' && sort !== 'App')
        return res.status(400).json({ message: "Sort must be one of 'rating' or 'app'"})
    
    if (sort) {
        results.sort((currentApp, nextApp) => {
            if(currentApp[sort] < nextApp[sort]) {
                return -1;
            } else if (currentApp[sort] > nextApp[sort]) {
                return 1;
            } else {
                return 0;
            }
        })
    }

    const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
    console.log(genres)
    if (genres && !validGenres.includes(genres)) {
        return res.status(400).json({ message: "Genres must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', or 'Card'"})
    }

    if (genres) {
        results = results.filter(appList => appList.Genres.includes(genres))
    }
    res.json(results)
}); 

app.listen(8000, () => {
    console.log('Server started on PORT 8000')
});
