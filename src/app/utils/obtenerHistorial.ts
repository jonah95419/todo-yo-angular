export function combinarTablasHistorial(id_personal: String, cotizaciones, detalles){
  return detalles.filter( (d: any) => d.personal != undefined)
        .filter( (d: any) => Object.keys(d.personal).find(dp => d.personal[dp].detalle == id_personal))
        .map( (d: any) => {
          return cotizaciones.map( (c: any[]) => {
            if(c[d.key]) {
              return c[d.key]}
          }).filter(Boolean)[0];
          //return {...d, ...cot};
        })
}
