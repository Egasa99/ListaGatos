import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Gato } from '../gato';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
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
  constructor(
    private firestoreService: FirestoreService,
    private activatedRoute: ActivatedRoute,
     private router: Router,
     public alertController: AlertController) {
    this.gatoEditando = {} as Gato;
   }


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.obtenerId();
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
      console.log('Gato Borrado 🥺');
      this.gatoEditando= {} as Gato;
    this.router.navigate(['tabs/home/']);
    },(error) => {
      console.error(error);
    });
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("gatos", this.id, this.gatoEditando).then(() => {
      console.log('Gato modificado!');
      this.gatoEditando= {} as Gato;
      this.router.navigate(['tabs/home/']);
      
    },(error) => {
      console.error(error);
    });
  }
  clicBotonInsertar() {
    this.firestoreService.insertar("gatos", this.gatoEditando).then(() => {
      console.log('Gato creada correctamente!');
      this.gatoEditando= {} as Gato;
      this.router.navigate(['tabs/home/']);
    }, (error) => {
      console.error(error);
    });
  }

  async aviso() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Seguro que quieres borrar este gato?',
      message: 'Una vez lo elimines <strong>no podras recuperarlo 🥺</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Borrar gato',
          handler: () => {
            this.clicBotonBorrar();
          }
        }
      ]
    });

    await alert.present();
  }
}
