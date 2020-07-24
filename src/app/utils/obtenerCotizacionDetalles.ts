import { obtenerLocal } from './obtenerLocal';
import { database } from 'firebase';
export class ObtenerCotizacionDetalles {

  private key_cotizacion:string;
  private key_user:string;
  private cotizaciones: any;
  private detalles: any;
  private personal: any;
  private usuarios: any;


  constructor(key_cotizacion: string, user: string, cotizaciones, detalles, personal, usuarios) {
     this.key_cotizacion = key_cotizacion;
     this.key_user = user;
     this.cotizaciones = cotizaciones;
     this.detalles = detalles;
     this.personal = personal;
     this.usuarios = usuarios;
  }

  combinarTablas(){
    return this.cotizaciones
          .map( (data: any[]) => this.filtrarCotizacion(data))
          .filter( Boolean )
          .map( (data: any) => this.filtrarDetalles(data) )
          .map( (data: any) => {
            data.detalles = this.procesarDetalles(data.detalles);
            return data;
          })
          .map( (cot: any) =>  {
            cot.usuario = this.usuarios.find( (u: any) =>  u.key === cot.key_u);
            return cot;
          })
          .filter( Boolean )[0];
  }

  private filtrarCotizacion(c: any) {
    let cotizacion: any = {};
    let key = Object.keys(c).find( k => k === this.key_cotizacion && c['key'] === this.key_user);
    if(key !== undefined) {
      cotizacion = c[key];
      cotizacion.key = key;
      cotizacion.id_local = new obtenerLocal(cotizacion.local).obtenerLocal();
      let nuevo = { cotizacion, key_u: c['key'] }
      return nuevo
    }
  }

  private filtrarDetalles(c): any[] {
    let cd: any = {};
    cd = c;
    const detalle = this.detalles
      .map( (d: any) => {
        if(c.key_u === d.key) {
          const key = Object.keys(d).find( k => k === this.key_cotizacion);
          return d[key];
        }
      })
      .filter( Boolean )[0];
    cd.detalles = detalle !== undefined ? detalle: {};
    return cd;
  }

  private procesarDetalles(detalles): any[]  {
    let jojo: any[] = [];
    Object.keys(detalles).forEach(k => {
      if(k !== "key") {
        jojo.push({cant: 0, detalle: k, subtotal: 0, key:"interestelar", tipo: k})
        Object.keys(detalles[k]).forEach(kd => {
          const d = k === "personal"? this.obtenerPersonal(detalles[k][kd].detalle) : detalles[k][kd].detalle;
          jojo.push({
            cant: detalles[k][kd].cantidad || 0,
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
    const u = this.personal.find( data => data.key === key);
    return u? u.nombre : "no disponible";
  }

}
