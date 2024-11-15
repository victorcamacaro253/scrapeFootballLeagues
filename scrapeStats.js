import get from 'axios';
import { load } from 'cheerio';

async function scrapeLaLigaLeaders() {
    const url = 'https://www.laliga.com/es-GB/leaderboard/todos-los-lideres?stat_competition=laliga-easports&stat=total_goals_ranking';

    try {
        const { data } = await get(url);
        const $ = load(data);

        const prueba = [];
        const equipos=[]
        const  pais=[]
       const link_players=[]
       const link_teams=[]
        const img = []
        const icon=[]

       $('p.styled__TextStyled-sc-1mby3k1-0.cYEkps').slice(5).each((i, element) => {
            const posicion = $(element).text().trim();
            prueba.push(posicion);
        });
     

        
       /* $('p.styled__TextStyled-sc-1mby3k1-0.bzvXlU').each((i, element) => {
            const posicion = $(element).text().trim();
            equipos.push(posicion);
        });*/

        $('img.styled__ImageStyled-sc-17v9b6o-0.coeclD').each((i,imgElement)=>{
            const imgsrc = $(imgElement).attr('src')
            img.push(imgsrc)
            
        })
      

        //------------------------------------------------------------------

        $('td.styled__TdStyled-sc-57jgok-4.iPYsfW').each((i, element) => {
            const posicion = $(element).find('a.link').attr('href')
            link_players.push(posicion);
        });

        $('td.styled__TdStyled-sc-57jgok-4.iBOaCu').each((i, element) => {
            const posicion = $(element).find('a.link').attr('href')
            link_teams.push(posicion);
        });


        $('div.styled__ShieldContainer-sc-1opls7r-0.kTUZAV').each((i, element) => {
            const posicion = $(element).find('i').text().trim()
            icon.push(posicion);
        });

        //_-------------------------------------------------------------------

     /*   $('a.link').each((i,imgElement)=>{
            const href = $(imgElement).attr('href')
            link.push(href)
            
        })
            */



        const extractColumnData=(headerIndex,array)=>{
            $(`p.styled__TextStyled-sc-1mby3k1-0.${headerIndex}`).each((i,element)=>{
                const posicion = $(element).text().trim()
                array.push(posicion)
            })
           }

           extractColumnData('bzvXlU',equipos)
           
           extractColumnData('ejtpot',pais)
           
           const paisesNuevos = [ pais[5], pais[8], pais[11], pais[14], pais[17], pais[20], pais[23], pais[26], pais[29], pais[32], pais[35], pais[38], pais[41], pais[44], pais[47], pais[50], pais[53], pais[56], pais[59], pais[62]   ]
          
           const goles = [ pais[6], pais[9], pais[12], pais[15], pais[18], pais[21], pais[24], pais[27], pais[30], pais[33], pais[36], pais[39], pais[42], pais[45], pais[48], pais[51], pais[54], pais[57], pais[60], pais[63]]


        return { prueba,equipos,paisesNuevos ,goles, img,link_players,link_teams,icon};

    } catch (error) {
        console.error('Error scraping La Liga leaders:', error);
        throw error; // Rethrow the error for handling by the calling function
    }
}

export default scrapeLaLigaLeaders;
