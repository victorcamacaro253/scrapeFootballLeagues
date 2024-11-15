fetch('/stats')
.then(response => response.json())
.then(data =>{
    //console.log(data.equipos);

 const tbody = document.getElementById('data-body-laligaTopScorer')

 data.equipos.map((equipo,index)=>{
    const row = document.createElement('tr')

     // Asegúrate de que la clase del ícono esté disponible en data.icon
     const iconClass = data.icon[index];

    row.innerHTML = `
      <td>${data.prueba[index]}</td>
      <td><img loading="lazy" src=${data.img[index]} class="sdc-site-table__cell-image"></td>
      <td>${equipo}</td>
      <td>${data.prueba[index]}</td>
      <td>${data.paisesNuevos[index]}</td>
      <td>${data.goles[index]}</td>
     
    `

    tbody.appendChild(row)
 })

})
.catch(error=> console.error('Error',error))