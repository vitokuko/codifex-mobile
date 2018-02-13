import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterPage} from "../register/register";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {DataProvider} from "../../providers/data/data";
import {NativeStorage} from "@ionic-native/native-storage";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loading;
  etudiantConnected;

  submitAttempt: boolean = false;

  user = {
    username : "",
    password : ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider,
    private nativeStorage: NativeStorage
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  login() {
    console.log(this.loginForm);
    this.dataProvider.login(this.loginForm.value).then(
      data=>{
        console.log(data);
        this.etudiantConnected = data;
        /*this.nativeStorage.setItem('userAccount', data.userId)
          .then(
            donnee  => console.log(donnee),
            error => console.error('Error storing item', error)
          );*/
        this.navCtrl.push(TabsPage);
      },
      error => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Incorrecte!',
          subTitle: "Nom d'utilisateur ou mot de passe incorrecte!",
          buttons: ['OK']
        });
        alert.present();
        this.user.password="";
      }
    );
  }

  register(){
    console.log("push");
    this.navCtrl.setRoot(RegisterPage);
  }

  forgotPassword(){
    console.log("push");
    this.navCtrl.setRoot(ForgotPasswordPage);
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Login failed',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Connexion...'
    });
    this.loading.present();
  }
}
