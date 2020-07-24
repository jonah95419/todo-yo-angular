export class ObtenerInteracciones {

  private id_personal: string;
  private cotizaciones: any;
  private detalles: any;

  constructor(id_personal: string, cotizaciones, detalles) {
    this.id_personal = id_personal;
    this.cotizaciones = cotizaciones;
    this.detalles = detalles;
  }

  combinarTablas() {
    return this.detalles
    .map( (d: any) => Object.keys(d).map( f => {
        let r = Object.keys(d[f]).find( m => m === 'personal');
        if(r !== undefined) {
          let det: any = d[f];
          det.key_d = f;
          det.key_u = d['key'];
          return det;
        }
      }).filter( Boolean ) [0]
    )
    .filter( (d: any) => {
      return Object.keys(d.personal).find(dp => d.personal[dp].detalle === this.id_personal);
    })
    .map( (d: any) => {
      return this.cotizaciones.map( (c: any) => {
        if(c.key === d.key_u) {
          let cot = c[d.key_d];
          cot.fecha = new Date(cot.fecha);
          return cot;
        }
      }).filter( Boolean )[0];
       // return {...d, ...cot};
    });
  }
}
