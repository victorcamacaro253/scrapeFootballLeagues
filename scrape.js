import  get  from 'axios';
import { load } from 'cheerio';

async function scrapeData() {
  // Realiza la solicitud HTTP a la URL
  const { data } = await get('https://www.premierleague.com/tables?team=FIRST');

    // Realiza la solicitud HTTP a la segunda URL
    const { data: datal } = await get('https://www.skysports.com/premier-league-table');

  // Carga el HTML en cheerio
  const $ = load(data);

  const D = load(datal);

  // Almacenar los datos scrapeados en variables
  let headers = [];
  let posiciones = [];
  let equipos = [];
  let puntos = [];
  let empates=[];   
  let victorias=[];
  let derrotas=[];
  let PJ=[]
  let GA=[]
  let GC=[]
  let DF=[]
 let img=[]

  $('.league-table__thFull.thFull').slice(0, 6).each((i, header) => {
    headers.push($(header).text());
  });

  $('.league-table__value.value').slice(0, 20).each((i, posicione) => {
    posiciones.push($(posicione).text());
  });

  $('.league-table__team-name--long.long ').slice(0, 20).each((i, element) => {
    equipos.push($(element).text());
  });

  $('.league-table__points.points').slice(1,21).each((i,punto)=>{
    puntos.push($(punto).text())
   })

   /*
   
     // Extraer posiciones usando clase y atributo headers
     D('td.sdc-site-table__cell[headers="th--2"]').each((i, element) => {
      const posicion = $(element).find('.sdc-site-table__link').text().trim();
      PJ.push(posicion);
  });
 
   
     // Extraer posiciones usando clase y atributo headers
     D('td.sdc-site-table__cell[headers="th--3"]').each((i, element) => {
      const posicion = $(element).find('.sdc-site-table__link').text().trim();
      victorias.push(posicion);
  });


     // Extraer posiciones usando clase y atributo headers
     D('td.sdc-site-table__cell[headers="th--4"]').each((i, element) => {
      const posicion = $(element).find('.sdc-site-table__link').text().trim();
      empates.push(posicion);
  });

  
     // Extraer posiciones usando clase y atributo headers
     D('td.sdc-site-table__cell[headers="th--5"]').each((i, element) => {
      const posicion = $(element).find('.sdc-site-table__link').text().trim();
      derrotas.push(posicion);
  });

 
     // Extraer posiciones usando clase y atributo headers
     D('td.sdc-site-table__cell[headers="th--6"]').each((i, element) => {
      const posicion = $(element).find('.sdc-site-table__link').text().trim();
      GA.push(posicion);
  });

  
     // Extraer posiciones usando clase y atributo headers
     D('td.sdc-site-table__cell[headers="th--7"]').each((i, element) => {
      const posicion = $(element).find('.sdc-site-table__link').text().trim();
      GC.push(posicion);
  });

  
     // Extraer posiciones usando clase y atributo headers
     D('td.sdc-site-table__cell[headers="th--8"]').each((i, element) => {
      const posicion = $(element).find('.sdc-site-table__link').text().trim();
      DF.push(posicion);
  });

*/
   // Extraer todas las imágenes
   D('img.sdc-site-table__cell-image').each((j, imgElement) => {
    const imgSrc = D(imgElement).attr('src'); // Obtener el src de la imagen
    img.push(imgSrc); // Añadir la URL de la imagen al array
  });


const extractColumnData = (headerIndex,array)=>{
  D(`td.sdc-site-table__cell[headers="th--${headerIndex}"]`).each((i,element)=>{
    const posicion = D(element).text().trim();
    array.push(posicion)
  })
}


extractColumnData(2,PJ)
extractColumnData(3,victorias)
extractColumnData(4,empates)
extractColumnData(5,derrotas)
extractColumnData(6,GA)
extractColumnData(7,GC)
extractColumnData(8,DF)



  return { headers, posiciones, equipos,puntos,empates,victorias,derrotas,PJ,GA,GC,DF,img };
}

export default scrapeData;