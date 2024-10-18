import get from 'axios'
import {load} from 'cheerio'

async function scrapeDataFrance() {

    const url = 'https://www.skysports.com/ligue-1-table'

    const {data}  = await get(url);

    const $ = load(data)


    let posiciones=[]
    let equipos=[];
    let puntos=[]
    let victorias=[]
    let empates=[]
    let derrotas=[]
    let GA=[]
    let GC=[]
    let DF=[]
    let img=[]
    let PJ=[];

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

export default scrapeDataFrance