
const port = 3000

import express from 'express'
import cors from 'cors'
import { checkDescription, getHemmingsCookie } from './firebaseConfig.js'
import puppeteer from 'puppeteer'

const app = express();

app.use(cors())

app.use(express.json())

app.post('/getCategory', async(req, res) => { 
    const cookie = await getHemmingsCookie();
    if (!cookie) { return }
    const { slug } = req.body;
    const link = `https://www.hemmings.com/stories-api/search/listings?adtype=cars-for-sale&page=1&sort_by=recommended&category[]=${slug}`
    const response = await fetch(link, { headers: { "cookie": cookie } });
    const { results } = await response.json();

    res.send({ results })
})

app.get('/getRecommended', async (req, res) => { 
        const cookie = await getHemmingsCookie();
        if (!cookie) { return}
        const link =  `https://www.hemmings.com/stories-api/search/listings?adtype=cars-for-sale&page=1&sort_by=recommended`
        const response = await fetch(link, { headers: { cookie: cookie}});
        const { results } = await response.json();
        console.log(results)    
    res.send({ results })
})

app.post('/', async(req, res) => {
    const {linkComponent} = req.body;
    const cookie = await getHemmingsCookie();
    const link = `https://www.hemmings.com/auctions/api/${linkComponent}/gallery-images`
    const response = await fetch(link, { headers: { cookie: cookie}})
    const data = await response.json();

    res.send(data)
})

app.post('/getComments', async(req, res) => { 
    const {link} = req.body;
    const cookie = await getHemmingsCookie();
    if (!cookie) { return}
    const response = await fetch(link, { headers: { cookie: cookie}});
    const { pagination: { data}} = await response.json();
    res.send(data)
})


app.post('/getDescription', async(req, res) => { 
    try { 
        const {url, id} = req.body

        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();
        await page.goto(url);
        const data = await page.evaluate(() => { 
            return document.querySelector('#auction-content  p ').innerHTML
        })
   
        res.send({data})
    } catch ( e) { res.status(500)}
})

app.listen(port, async() => {
    console.log("ready on" + port);
})

