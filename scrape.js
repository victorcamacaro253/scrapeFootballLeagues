import  get  from 'axios';
import { load } from 'cheerio';

async function scrapeData() {
  // Realiza la solicitud HTTP a la URL
  const { data } = await get('https://www.premierleague.com/tables?team=FIRST');

  // Carga el HTML en cheerio
  const $ = load(data);

  // Almacenar los datos scrapeados en variables
  let headers = [];
  let posiciones = [];
  let equipos = [];
  let puntos = [];

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
 

  return { headers, posiciones, equipos,puntos };
}

export default scrapeData;