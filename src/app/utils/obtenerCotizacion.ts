export class ObtenerCotizacion {

  private servicios: any;
  private cotizaciones: any;
  private usuarios: any;

  constructor(servicios, cotizaciones, usuarios) {
    this.servicios = this.estructuraServicios(servicios);
    this.cotizaciones = cotizaciones;
    this.usuarios = usuarios;
  }

  combinarTablas(){
    return this.servicios
          .map( (s: string) =>
            this.cotizaciones
              .map( (c: any[]) => this.filtrarCorizaciones(s, c))
              .filter( Boolean )
          )
          .map( (cot: any[]) =>  this.procesarUsuario(cot))
          .filter( Boolean )
  }

  private estructuraServicios(s: any ) {
    let serv = [];
    s.forEach( d => {
      Object.keys(d).forEach( j => {
        if(j !== 'key') {
          serv.push({
            id: d[j],
            key: d['key']
          })
        }
      })
    })
    return serv;
  }

  private filtrarCorizaciones(s:any ,c: any) {
    if(s.key === c.key) {
      let cotizacion: any = {};
      cotizacion = c[s.id];
      if(!cotizacion) { return null}
      cotizacion.key = s.id;
      return { cotizacion, key_u: c['key'] }
    }
  }

  private procesarUsuario(cot) {
    return cot.map( (c: any) => {
      let usuario = this.usuarios.find( (u: any) => {
        return u.key === c.key_u
      })
      return {cotizacion: c.cotizacion, usuario};
    })[0]
  }

}
