function OpenTime() {
 // En este objeto definimos las horas de apertura y cierre, con los intervalos que se quieran.
 // Después se construyen los option de los select del formulario de visitas con las horas disponibles.
    const intervals = [ 
        {
            openT: '10:00',
            closeT: '13:30'
        },
        {
            openT: '17:00',
            closeT: '20:00'
        }
    ]

  
    const options = document.getElementById('timePicker');
    let arrTime = [];

    intervals.forEach(e => {
        let openH = parseInt(e.openT.split(':')[0]);
        let openM = parseInt(e.openT.split(':')[1]);
        openM = (openM / 15) * 25;
        let closeH = parseInt(e.closeT.split(':')[0]);
        let closeM = parseInt(e.closeT.split(':')[1]);
        closeM = (closeM / 15) * 25;
        let m = openM;

        for (let i = openH; i <= closeH; i ++) {
             
            for (m ; m < 100; m+=25) {
                let min = (m / 25)*15;  // Reconvertimos los minutos del decimal
                let mStr;
                min == 0 ? mStr = '00' : mStr = String(min);

                if (i == closeH && m == closeM) {
                    
                    arrTime.push(`${i}:${mStr}`)
                    m = 100;
                } else {
                    arrTime.push(`${i}:${mStr}`)
                }
                
            }
            if (m == 100) { m = 0 }
            
        }
        

    });
    arrTime.forEach(e => {
        const op = document.createElement('option');
        op.value = e;
        op.textContent = e;
        options.append(op);
    });
}

export default OpenTime;