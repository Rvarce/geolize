import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(private qrScanner: QRScanner) { }

  ngOnInit() {
    //Varificar funcionamiento
    this.qrScanner.show();
    window.document.querySelector('ion-app').classList.add('transparent-body');
  // Optionally request the permission early
  this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
    if (status.authorized) {
      // camera permission was granted
      

      // start scanning
      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
        console.log('Scanned something', text);

        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanningF
      });

    } else if (status.denied) {
      // camera permission was permanently denied
      // you must use QRScanner.openSettings() method to guide the user to the settings page
      // then they can grant the permission from there
    } else {
      // permission was denied, but not permanently. You can ask for permission again at a later time.
    }
  })
  .catch((e: any) => console.log('Error is', e));
  }

    
    

  
}
