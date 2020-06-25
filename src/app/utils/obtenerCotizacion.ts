export function combinarTablas(servicios, cotizaciones, usuarios){
  return servicios.map( (s: String) =>
          cotizaciones.map( (c: any[]) => {
            let cotizacion: any = {};
            let key = Object.keys(c).find( k => k === s);
            if(key !== undefined) {
              cotizacion = c[key];
              cotizacion.key = key;
              return { cotizacion, key_u: c['key'] }
            }
          })
          .filter( (f: any) => { if(f) return f  })
        )
        .map( (cot: any[]) => {
          return cot.map( (c: any) => {
            let usuario = usuarios.find( (u: any) => {
              return u.key == c.key_u
            })
            return {cotizacion: c.cotizacion, usuario};
          })[0]
        })
}
