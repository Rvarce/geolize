import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.readQr()
  }

  readQr(){
    this.barcodeScanner.scan().then(barcodeData => {
      alert('Barcode data: ' + barcodeData.text)
    }).catch(error=>{console.log(error)}
    )
  }
  
}
