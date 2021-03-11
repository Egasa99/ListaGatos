import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Gato } from '../gato';
import { Router } from "@angular/router";
import { LoadingController,ToastController,AlertController } from '@ionic/angular';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
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
    public alertController: AlertController,
    private router: Router,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private ImagePicker:ImagePicker) {
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
        this.gatoEditando=this.document.data;
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

  async uploadImagePicker(){
    const loading=await this.loadingController.create({
      message:'Please wait...'});

    const toast=await this.toastController.create({
      message:'Image was updated successfully',
      duration:3000
    });

    this.ImagePicker.hasReadPermission().then(
      (result)=>{
        if(result==false){
          this.ImagePicker.requestReadPermission();
        }
        else{
          this.ImagePicker.getPictures({
            maximumImagesCount:1,
            outputType:1
          }).then(
            (results)=>{
              let nombreCarpeta="imagenes";

              for(var i=0;i<results.length;i++){
                loading.present();
                let nombreImagen= `${new Date().getTime()}`;
                this.firestoreService.uploadImage(nombreCarpeta,nombreImagen,results[i])
                .then(snapshot =>{
                  snapshot.ref.getDownloadURL()
                  .then(downloadURL=>{
                    console.log("downloadURL:"+downloadURL);
                    this.gatoEditando.foto=downloadURL;
                    toast.present();
                    loading.dismiss();
                  })
                })
              }
            },
            (err)=>{
              console.log(err)
            }
          );
        }
      },(err)=>{
        console.log(err);
    });
}
 async deleteFile(fileURL){
   const toast=await this.toastController.create({
     message:'La imagen fue borrada satisfactoriamente',
     duration:3000
   });
   this.firestoreService.deleteFileFromURL(fileURL)
   .then(()=>{
      toast.present();
     this.gatoEditando.foto=null;
     this.document.data.foto=null;
     console.log(this.document.data.foto);
     console.log(this.gatoEditando.foto);
     
   }
   ,
   (err)=>{
     console.log(err);
   })
 }

}
