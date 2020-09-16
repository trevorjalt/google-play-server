const { expect } = require('chai');
const supertest = require('supertest');
const app  = require('../app');


describe("Google Play Store App", () => {
    it('should sort apps by rating', () => {

        return supertest(app)
            .get('/apps')
            .query( {sort: 'Rating'} )
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                let sorted = true;
                let i = 0;
                while (i < res.body.length - 1) {
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];
                    if (appAtIPlus1.Rating < appAtI.Rating) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            })
    })

    it('should sort apps by App', () => {

        return supertest(app)
            .get('/apps')
            .query( {sort: 'App'} )
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                let sorted = true;
                let i = 0;
                while (i < res.body.length - 1) {
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];
                    if (appAtIPlus1.App < appAtI.App) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            })
    })


    it('should filter by Genres', () => {

        return supertest(app)
            .get('/apps')
            .query( {genres: 'Action'} )
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                let filtered = true;
                let i = 0;
                while ( filtered && i < res.body.length -1) {
                    filtered = res.body[i].Genres.includes("Action")
                    i++;
                }
                expect(filtered).to.be.true;  
            })      
    })

    const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

    validGenres.forEach( (genres) => {
        it('checks for correct genre', () => {
          return supertest(app)
            .get('/apps')
            .query({ genres })
            .expect( 200 )
            .then(res => {
                expect(res.body).to.be.an('array')
                let filtered = true;
                let i = 0;
                while ( filtered && i < res.body.length -1) {
                    filtered = res.body[i].Genres.includes(genres)
                    i++;
                }
              
                expect(filtered).to.be.true;
               
        })
    })
})
})

