export class obtenerCotizacionDetalles {

  private key_cotizacion:string;
  private cotizaciones: any;
  private detalles: any;
  private personal: any;

  constructor(key_cotizacion: string, cotizaciones, detalles, personal) {
     this.key_cotizacion = key_cotizacion;
     this.cotizaciones = cotizaciones;
     this.detalles = detalles;
     this.personal = personal;
  }

  combinarTablas(){
    return this.cotizaciones
          .map( (data: any[]) => this.filtrarCotizacion(data))
          .filter( Boolean )
          .map( (data: any) => this.filtrarDetalles(data))
          .map( (data: any) => {
            data.detalles = this.procesarDetalles(data.detalles);
            return data;
          })
          .filter( Boolean )[0];
  }

  private filtrarCotizacion(c: any) {
    let cotizacion: any = {};
    const key = Object.keys(c).find( k => k === this.key_cotizacion);
    if(key !== undefined) {
      cotizacion = c[key];
      cotizacion.key = key;
      return { cotizacion, key_u: c['key'] }
    }
  }

  private filtrarDetalles(c): any[] {
    let cd: any = {};
    cd = c;
    const detalle = this.detalles.filter( (d: any) => {
      if(d.key === this.key_cotizacion) { return cd; }
    })[0];
    cd.detalles = detalle !== undefined ? detalle: {};
    return cd;
  }

  private procesarDetalles(detalles): any[]  {
    let jojo: any[] = [];
    Object.keys(detalles).forEach(k => {
      if(k !== "key" && k !== "visibilidad") {
        jojo.push({cant: 0, detalle: k, subtotal: 0, key:"interestelar", tipo: k})
        Object.keys(detalles[k]).forEach(kd => {
          const d = k == "personal"? this.obtenerPersonal(detalles[k][kd].detalle) : detalles[k][kd].detalle;
          jojo.push({
            cant: detalles[k][kd].cant || 0,
            detalle: d || "",
            subtotal: detalles[k][kd].subtotal || 0,
            key: kd || "",
            tipo: k
          })
        })
      }
    });
    return jojo;
  }

  private obtenerPersonal(key: string) {
    const u = this.personal.find( data => data.key == key);
    return u? u.nombre : "no disponible";
  }

}
