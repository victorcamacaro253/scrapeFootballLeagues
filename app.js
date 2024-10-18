import express from 'express';
import scrapeData from './scrape.js';
import createHtmlTable from './table.js';
import scrapeDataItaly from './scrapeItaly.js';
import scrapeDataGermany from './scrapeGermany.js';
import cors from 'cors'
import scrapeDataSpain from './scrapeSpanish.js';
import scrapeDataFrance from './scrapeFrance.js';
import scrapeLaLigaLeaders from './scrapeStats.js';


const app = express()

app.use(cors())
// Middleware para servir archivos estáticos
app.use(express.static('public'));

app.get('/premier',async(req,res)=>{
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




app.get('/spain',async(req,res)=>{
    try {
        const data = await scrapeDataSpain();
        /*
         const html = createHtmlTable(data);
         res.send(html)*/
 
         res.json(data)
     } catch (error) {
         res.status(500).send('Error ')
         console.log(error)
     }
})


app.get('/italy',async(req,res)=>{
    try {
        const data  = await scrapeDataItaly();
        res.json(data)
    } catch (error) {
        res.status(500).send('Error')
        console.log(error)
    }
})


app.get('/germany',async (req,res)=>{
    try {
        const data = await scrapeDataGermany();
        res.json(data)
    
    } catch (error) {
        res.status(500).send('Error')
        console.log(error)
    }
})


app.get('/france',async(req,res)=>{
    try {
        const data = await scrapeDataFrance()
        res.json(data)
    } catch (error) {
        res.status(500).send('Error')
        console.log(error)
    }
})


app.get('/stats',async(req,res)=>{
    try {
        const data = await scrapeLaLigaLeaders();
        res.json(data)
    } catch (error) {
        res.status(500).send('Error')
        console.log(error)
    }
})

const PORT = process.env.PORT ?? 3006


app.listen(PORT,()=>{
    console.log('Servidor ejecutandose en el puerto',PORT)
})
