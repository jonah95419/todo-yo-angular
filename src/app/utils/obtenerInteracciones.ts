export class obtenerInteracciones {

  private interacciones: any;
  private usuarios: any;

  constructor(interacciones, usuarios) {
    this.interacciones = interacciones;
    this.usuarios = usuarios;
  }

  combinarTablas(){
    return this.interacciones.map(ti => {
      if(ti.key === "calificacion") {
        return this.procesarCalf(ti);
      }
      if(ti.key === "comentario") {
        return this.procesarComentarios(ti);
      }
    })
  }

  private procesarCalf(data: object) {
    const total = Object.keys(data).map(d => d !== "key"? data[d].valor : 0).reduce((acc, value) => acc + value, 0);
    const cantidad = Object.keys(data).length - 1;
    const media = total / cantidad;
    return { total, cantidad, media , key: "calificacion"}
  }

  private procesarComentarios(data: object){
    let valores = Object.keys(data).map(d => {
      if(d !== "key") {
        let usu = this.usuarios.find(u => u.key === data[d].usuario);
        let usuario = usu !== undefined ? usu : {avatar: '', name: 'desconocido'};
        return {
          key: d,
          comentario : data[d].comentario,
          fecha: data[d].fecha,
          usuario
        }
      }
    });
    valores = valores.filter( Boolean );
    return { valores, key: "comentario"}
  }

}
