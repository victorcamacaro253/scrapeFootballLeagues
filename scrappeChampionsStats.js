import axios from 'axios';
import { load } from 'cheerio';

async function scrapeDataChampionsStats() {
    try {
        const url = 'https://www.uefa.com/uefachampionsleague/statistics/players/goals/?sortBy=goals';

        const response = await axios.get(url);
        const $ = load(response.data);

        const results = [];

        $('.ag-center-cols-container.ag-row').each((index, element) => {
            const goles = {
                total: $(element).find('div[col-id="goals"] .ag-cell-value .ag-cell--sorted').text().trim(),
                conDerecha: $(element).find('div[col-id="goals_scored_with_right"] .ag-cell-value').text().trim(),
                conIzquierda: $(element).find('div[col-id="goals_scored_with_left"] .ag-cell-value').text().trim(),
                deCabeza: $(element).find('div[col-id="goals_scored_head"] .ag-cell-value').text().trim(),
                otros: $(element).find('div[col-id="goals_scored_other"] .ag-cell-value').text().trim(),
                dentroArea: $(element).find('div[col-id="goals_scored_inside_penalty_area"] .ag-cell-value').text().trim(),
                fueraArea: $(element).find('div[col-id="goals_scored_outside_penalty_area"] .ag-cell-value').text().trim(),
                penales: $(element).find('div[col-id="penalty_scored"] .ag-cell-value').text().trim(),
                apariciones: $(element).find('div[col-id="matches_appearance"] .ag-cell-value').text().trim(),
            };

            // Verifica si alguno de los valores de goles no está vacío antes de agregarlo a los resultados
            if (Object.values(goles).some(value => value !== '')) {
                results.push(goles);
            }
        });

        console.log(results);
        return results;

    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}

export default scrapeDataChampionsStats;
