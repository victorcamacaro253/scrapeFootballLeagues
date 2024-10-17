

        fetch('/germany')
        .then(response=>response.json())
        .then(data=>{
            const  tbody = document.getElementById('data-body-bundesliga');

            data.equipos.map((equipo,index)=>{
            
                const row =document.createElement('tr');
                row.innerHTML = `
                
                <td>>${data.posiciones[index]}</td>
                <td><img src=${data.img[index]} class="sdc-site-table__cell-image"></td>
                <td>${equipo}</td>
                <td>${data.PJ[index]}</td>
                <td>${data.victorias[index]}</td>
                <td>${data.empates[index]}</td>
                <td>${data.derrotas[index]}</td>
                <td>${data.GA[index]}</td>
                <td>${data.GC[index]}</td>
                <td>${data.DF[index]}</td>
            

                `;
                tbody.appendChild(row)
            })


        })
        .catch(error => console.error('Error:', error)); 