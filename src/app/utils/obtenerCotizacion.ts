export class obtenerCotizacion {

  private servicios: any;
  private cotizaciones: any;
  private usuarios: any;

  constructor(servicios, cotizaciones, usuarios) {
    this.servicios = servicios;
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

  private filtrarCorizaciones(s:string ,c: any) {
    let cotizacion: any = {};
    let key = Object.keys(c).find( k => k == s);
    if(key !== undefined) {
      cotizacion = c[key];
      cotizacion.key = key;
      return { cotizacion, key_u: c['key'] }
    }
  }

  private procesarUsuario(cot) {
    return cot.map( (c: any) => {
      let usuario = this.usuarios.find( (u: any) => {
        return u.key == c.key_u
      })
      return {cotizacion: c.cotizacion, usuario};
    })[0]
  }

}
