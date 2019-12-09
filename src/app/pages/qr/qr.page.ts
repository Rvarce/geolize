import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { LugarService } from 'src/app/service/lugar.service';
import { Lugar } from 'src/app/interface/lugar';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  lugar: Lugar
  constructor(
    private barcodeScanner: BarcodeScanner,
    private lugarService: LugarService,
    private inAppBrowser: InAppBrowser
  ) { }

  ngOnInit() {
    this.readQr()
  }

  readQr() {

    let url: string

    this.barcodeScanner.scan()
      .then(barcodeData => {
        alert('Barcode data: ' + barcodeData.text)

        this.lugarService.consultarLugar(barcodeData).subscribe(data => {
          url = data.url
          this.inAppBrowser.create(url, '_self')
        })

      }).catch(error => { console.log(error) }
      )


  }

}
