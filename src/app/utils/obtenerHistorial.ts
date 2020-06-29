export class obtenerInteracciones {

  private id_personal: string;
  private cotizaciones: any;
  private detalles: any;

  constructor(id_personal: string, cotizaciones, detalles) {
    this.id_personal = id_personal;
    this.cotizaciones = cotizaciones;
    this.detalles = detalles;
  }

  combinarTablas(){
    return this.detalles.filter( (d: any) => d.personal != undefined)
    .filter( (d: any) => Object.keys(d.personal).find(dp => d.personal[dp].detalle == this.id_personal))
    .map( (d: any) => {
      return this.cotizaciones.map( (c: any[]) => {
        if(c[d.key]) {
          return c[d.key]}
      }).filter(Boolean)[0];
      //return {...d, ...cot};
    })
  }

}
