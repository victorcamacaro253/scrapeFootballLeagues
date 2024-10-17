import get from 'axios'
import {load} from 'cheerio'



async function scrapeDataGermany() {

    const url='https://www.skysports.com/bundesliga-table'

   const {data} = await get(url)

   const $ = load(data)

   let posiciones=  [];
   let equipos =[];
   let puntos= [];
   let victorias=[];
   let empates=[]
   let derrotas=[]
   let PJ=[]
   let GA=[]
   let GF=[]
   let DF=[]
   let img=[]

   const extractColumnData=(headerIndex,array)=>{
    $(`td.sdc-site-table__cell[headers="th--${headerIndex}"]`).each((i,element)=>{
        const posicion = $(element).text().trim()
        array.push(posicion)
    })
   }
    
 $('img.sdc-site-table__cell-image').each((i,imgElement)=>{
    const imgSrc = $(imgElement).attr('src')
    img.push(imgElement)
 })

extractColumnData(0,posiciones)
extractColumnData(1,equipos)
extractColumnData(2,PJ)
extractColumnData(3,victorias)
extractColumnData(4,empates)
extractColumnData(5,derrotas)
extractColumnData(6,GF)
extractColumnData(7,GA)
extractColumnData(8,DF)
extractColumnData(9,puntos)


$('img-sdc-site-table__cell-image').each((i,imgElement)=>{
    const imgsrc = $(imgElement).attr('src')
    img.push(imgsrc)
    
})

return {posiciones,equipos,puntos,empates,victorias,derrotas,PJ  , GA , GF , DF , img }

}

export default scrapeDataGermany