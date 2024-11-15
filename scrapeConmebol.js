import get from 'axios'
import { load } from 'cheerio'

async function scrapeDataConmebol (){
    const url = 'https://www.skysports.com/football/competitions/fifa-world-cup-south-american/table'
    const {data} = await get(url)
    const $ = load(data)

     // Almacenar los datos scrapeados en variables
  let headers = [];
  let posiciones = [];
  let equipos = [];
  let puntos = [];
  let empates = [];   
  let victorias = [];
  let derrotas = [];
  let PJ = [];
  let GA = [];
  let GC = [];
  let DF = [];
  let img = [];
            

  const extractColumnData=(headerIndex,array)=>{
    $(`td.sdc-site-table__cell[headers="th--${headerIndex}"]`).each((i,element)=>{
        const posicion = $(element).text().trim()
        array.push(posicion)
    })
   }
    
   
   $('img.sdc-site-table__cell-image').each((i,element)=>{
    const imgSrc = $(element).attr('src')
    img.push(imgSrc)
})

   extractColumnData(0,posiciones)
   extractColumnData(1,equipos)
   extractColumnData(2,PJ)
   extractColumnData(3,victorias)
   extractColumnData(4,empates)
   extractColumnData(5,derrotas)
   extractColumnData(6,GA)
   extractColumnData(7,GC)
   extractColumnData(8,DF)
   extractColumnData(9,puntos)

   return {posiciones,equipos,PJ,victorias,empates,derrotas,GA,DF,GC,puntos,img}

}

export default scrapeDataConmebol