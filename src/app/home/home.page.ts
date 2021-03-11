import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Gato } from '../gato';
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  gatoEditando: Gato; 
  idGatoSelec: string;

arrayColeccionGatos: any = [{
  id: "",
  data: {} as Gato
}];

//
document: any = {
  id: "",
  data: {} as Gato
};

constructor(private firestoreService: FirestoreService, private router: Router) {
  /*ojito*/this.gatoEditando = {} as Gato;
  this.obtenerListaGatos();

}

ionViewWillEnter(){
  this.obtenerListaGatos();
}
ionViewDidEnter(){
  this.obtenerListaGatos();
}
  
  obtenerListaGatos(){
    this.firestoreService.consultar("gatos").subscribe((resultadoConsultaGatos) => {
      this.arrayColeccionGatos = [];
      resultadoConsultaGatos.forEach((datosGatos: any) => {
        this.arrayColeccionGatos.push({
          id: datosGatos.payload.doc.id,
          data: datosGatos.payload.doc.data()
        });
      })
    });
  }

  selecGato(gatoSelec) {
    console.log("Gato seleccionado: ");
    //console.log(this.gatoEditando.foto);
    this.idGatoSelec = gatoSelec.id;
    this.gatoEditando.nombre = gatoSelec.data.nombre;
    this.gatoEditando.color = gatoSelec.data.color;
    this.gatoEditando.raza = gatoSelec.data.raza;
    this.gatoEditando.foto = gatoSelec.data.foto;
    this.router.navigate(['/gato-detalle/'+this.idGatoSelec]);
    console.log(gatoSelec.id);
  }

  segundaPagina(){
    console.log("Segunda pantalla");
    this.router.navigate(['/gato-detalle/'+"nuevo"]);
  }
/*  clicBotonBorrar() {
    this.firestoreService.borrar("gatos", this.idGatoSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaGatos();
      // Limpiar datos de pantalla
      this.gatoEditando = {} as Gato;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("gatos", this.idGatoSelec, this.gatoEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaGatos();
      // Limpiar datos de pantalla
      this.gatoEditando = {} as Gato;
    })
  }*/

}
