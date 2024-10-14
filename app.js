import express from 'express';
import scrapeData from './scrape.js';
import createHtmlTable from './table.js';

const app = express()

app.get('/',async(req,res)=>{
    try {
       const data = await scrapeData();
       /*
        const html = createHtmlTable(data);
        res.send(html)*/

        res.json(data)
    } catch (error) {
        res.status(500).send('Error ')
        console.log(error)
    }
})

const PORT = process.env.PORT ?? 3006


app.listen(PORT,()=>{
    console.log('Servidor ejecutandose')
})
