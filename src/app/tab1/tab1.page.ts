import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
   volumeLevel : number = 0; 
   maxVolume : number = 10;
  constructor(private platform:Platform, public toastController: ToastController) {}

  ngOnInit(){
this.platform.ready().then(() => {
   (<any>window).volumecontroller.getMaxVolume((vol) => {
    this.maxVolume = vol;
   });
   (<any>window).volumecontroller.getVolume((vol) => {
    this.volumeLevel = vol;
   });
  
});
  }
  changeVolume(){
    console.log(this.volumeLevel);
    (<any>window).volumecontroller.setVolume(Math.round(this.volumeLevel),this.volumeChangeSuccessHandler.bind(this), this.volumeChangeErrorHandler.bind(this));
  }
  async volumeChangeSuccessHandler(){
   let toast =  await this.toastController.create({
      message: 'Volume is changed to '+this.volumeLevel,
      duration: 1000
    });
    toast.present();
  }
  async volumeChangeErrorHandler(err){
    let toast =  await this.toastController.create({
      message: "Volume can't be changed due to "+err,
      duration: 1000
    });
    toast.present();
    this.volumeLevel = 0;

  }
  onBeepBtnClick(){
    (<any>window).volumecontroller.beep(1);
  }

}
