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
        .map( data => {
          data.cotizacion.fotografias = procesarFotografias(data.cotizacion.fotografias);
          data.detalles = procesarDetalles(data.detalles);
          return data;
        })
        .filter( (f: any) => { if(f) return f  })[0];
}


function procesarDetalles(detalles: Object): any[]  {
  let jojo: any[] = [];
  Object.keys(detalles).forEach(k => {
    if(k !== "key" && k !== "visibilidad") {
      jojo.push({cant: 0, detalle: k, subtotal: 0, key:"interestelar", tipo: k})
      Object.keys(detalles[k]).forEach(kd => {
        jojo.push({
          cant: detalles[k][kd].cant || 0,
          detalle: detalles[k][kd].detalle || "",
          subtotal: detalles[k][kd].subtotal || 0,
          key: kd || "",
          tipo: k
        })
      })
    }
  });
  return jojo;
}

function procesarFotografias (fotografias: Object): any[] {
  return Object.keys(fotografias).map(k => { return {
      image: fotografias[k],
      thumbImage: fotografias[k],
      title: ""
    }
  });
}
