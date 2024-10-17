import get from 'axios';
import { load } from 'cheerio';

async function scrapeDataSpain() {
  // Realiza la solicitud HTTP a la URL
  const { data } = await get('https://www.skysports.com/la-liga-table');

  // Carga el HTML en cheerio
  const $ = load(data);

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

  // Extraer los headers
  $('td.sdc-site-table__cell[headers="th--2"]').each((i, header) => {
    headers.push($(header).text().trim());
  });

  // Extraer las posiciones
  /*$('td.sdc-site-table__cell[headers="th--0"].sdc-site-table__link').each((i, element) => {
    posiciones.push($(element).text().trim());
  });*/

  // Extraer equipos
  /*$('.league-table__team-name--long.long').each((i, element) => {
    equipos.push($(element).text().trim());
  });*/


  // Función para extraer datos de columnas
  const extractColumnData = (headerIndex, array) => {
    $(`td.sdc-site-table__cell[headers="th--${headerIndex}"]`).each((i, element) => {
      const posicion = $(element).text().trim();
      array.push(posicion);
    });
  };

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

  // Extraer todas las imágenes
  $('img.sdc-site-table__cell-image').each((j, imgElement) => {
    const imgSrc = $(imgElement).attr('src');
    img.push(imgSrc);
  });

  // Retornar todos los datos relevantes
  return { headers, posiciones, equipos, puntos, empates, victorias, derrotas, PJ, GA, GC, DF, img };
}

export default scrapeDataSpain;
