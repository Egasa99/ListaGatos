import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-gato-detalle',
  templateUrl: './gato-detalle.page.html',
  styleUrls: ['./gato-detalle.page.scss'],
})
export class GatoDetallePage implements OnInit {
  id=null;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

}
