


const  createHtmlTable= (data)=> {
    const html = `
      <html>
        <head>
          <title>Tabla de la Liga Inglesa</title>
        </head>
        <body>
          <table border="1">
            <tr>
             <th>Position </th>
              <th>Team </th>
              <th>Puntos</th>
            </tr>
            ${data.posiciones.map((posicion, i) => `
              <tr>
               
                <td>${posicion}</td>
                 <td>${data.equipos[i]}</td>
                 <td>${data.puntos[i]}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;
    return html;
  }
  
  export default createHtmlTable;