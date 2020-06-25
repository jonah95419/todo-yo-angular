export function combinarTablas(key_cotizacion: String, cotizaciones, detalles){
  return cotizaciones.map( (c: any[]) => {
          let cotizacion: any = {};
          let key = Object.keys(c).find( k => k === key_cotizacion);
          if(key !== undefined) {
            cotizacion = c[key];
            cotizacion.key = key;
            return { cotizacion, key_u: c['key'] }
          }
        })
        .filter( (f: any) => { if(f) return f  })
        .map( (c: any) => {
          let cd: any = {};
          cd = c;
          let detalle = detalles.filter( (d: any) => {
            if(d.key === key_cotizacion) { return cd; }
          })[0];
          cd.detalles = detalle !== undefined ? detalle: {};
          return cd;
        })
        .filter( (f: any) => { if(f) return f  })[0];
}
