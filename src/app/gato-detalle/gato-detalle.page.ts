import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Gato } from '../gato';
import { Router } from "@angular/router";
@Component({
  selector: 'app-gato-detalle',
  templateUrl: './gato-detalle.page.html',
  styleUrls: ['./gato-detalle.page.scss'],
})
export class GatoDetallePage implements OnInit {
  id=null;
  gatoEditando: Gato;
  document: any = {
    id: "",
    data: {} as Gato
  };

  constructor(private firestoreService: FirestoreService,private activatedRoute: ActivatedRoute, private router: Router) {
    this.gatoEditando = {} as Gato;
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.obtenerId();
  }

  ionViewDidLeave(){
    console.log("Prueba");
  }
  obtenerId(){
    this.firestoreService.consultarPorId("gatos", this.id).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
      if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
      } else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Gato;
      } 
    });
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("gatos", this.id).then(() => {
    this.router.navigate(['/home/']);
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("gatos", this.id, this.gatoEditando).then(() => {
      this.router.navigate(['/home/']);
    })
  }
  clicBotonInsertar() {
    this.firestoreService.insertar("gatos", this.gatoEditando).then(() => {
      console.log('Gato creada correctamente!');
      this.gatoEditando= {} as Gato;
      this.router.navigate(['/home/']);
    }, (error) => {
      console.error(error);
    });
  }
}
