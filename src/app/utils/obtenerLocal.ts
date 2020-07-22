export class obtenerLocal {

  private local: number;

  constructor(local: number) {
    this.local = local;
  }

  obtenerLocal() {
    let id: string = "TY-";
    if (this.local < 10)
        id += "0000"+ this.local;
    else
    if (this.local < 100)
        id += "000"+ this.local;
    else
    if (this.local < 1000)
        id += "00"+ this.local;
    else
    if (this.local < 10000)
        id += "0"+ this.local;
    return id;
  }
}
