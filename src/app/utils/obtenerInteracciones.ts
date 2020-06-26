export function combinarTablasInteraccion(interacciones, usuarios){
  return interacciones.map(ti => {
    if(ti.key == "calificacion") {
      return procesarCalf(ti);
    }
    if(ti.key == "comentario") {
      return procesarComentarios(ti, usuarios);
    }
  })
}

function procesarCalf(data: Object) {
  const total = Object.keys(data).map(d => d != "key"? data[d].valor : 0).reduce((acc, value) => acc + value, 0);
  const cantidad = Object.keys(data).length - 1;
  const media = total / cantidad;
  return { total, cantidad, media , key: "calificacion"}
}

function procesarComentarios(data: Object, usuarios: any[]){
  let valores = Object.keys(data).map(d => {
    if(d != "key") {
      let usu = usuarios.find(u => u.key == data[d].usuario);
      let usuario = usu != undefined ? usu : {foto: '', nombre: 'desconocido'};
      return {
        key: d,
        comentario : data[d].comentario,
        fecha: data[d].fecha,
        usuario
      }
    }
  });
  valores = valores.filter(Boolean);
  return { valores, key: "comentario"}
}
