import get from 'axios';
import {load} from 'cheerio'



async function scrapeDataItaly (){
    const italy = 'https://www.skysports.com/serie-a-table';

    const {data} = await get(italy)

    const $ = load(data)


    let posiciones=[];
    let equipos=[];
    let puntos=[];
    let victorias=[];
    let derrotas=[];
    let empates=[];
    let GA=[];
    let GC=[];
    let DF=[];
    let img=[]
    let PJ=[]

    const extractColumnData=(headerIndex,array)=>{
     $(`td.sdc-site-table__cell[headers="th--${headerIndex}"]`).each((i,element)=>{
        const posicion =  $(element).text().trim();
        array.push(posicion)
     })
    }

    $('img.sdc-site-table__cell-image').each((i,imgElement)=>{
      const imgSrc= $(imgElement).attr('src');
      img.push(imgSrc)
    })

    // Extraer datos para cada categoría
  extractColumnData(0,posiciones)
  extractColumnData(1, equipos);
  extractColumnData(2, PJ); // PJ
  extractColumnData(3, victorias); // Victorias
  extractColumnData(4, empates); // Empates
  extractColumnData(5, derrotas); // Derrotas
  extractColumnData(6, GA); // Goles a favor
  extractColumnData(7, GC); // Goles en contra
  extractColumnData(8, DF); // Diferencia de goles
  extractColumnData(9, puntos); // Puntos

    // Retornar todos los datos relevantes
    return {  posiciones, equipos, puntos, empates, victorias, derrotas, PJ, GA, GC, DF, img };

}

export default scrapeDataItaly