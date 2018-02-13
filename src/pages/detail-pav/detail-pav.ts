import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import * as HighCharts from 'highcharts';
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the DetailPavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-pav',
  templateUrl: 'detail-pav.html',
})
export class DetailPavPage {
  pavillonId;
  isAndroid : Boolean = false;
  nombreEtageOfPav:any[];
  nombreEtageOfPavHomme;
  nombreEtageOfPavFemme;
  labelEtageOfPav;
  barSerieEtageOfPav = [
    {
      name:'',
      data:[]
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController,public platform:Platform, public dataProvider:DataProvider) {
    this.pavillonId = navParams.get('pavillonId');
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPavPage');
    this.getAllInformationOfPav();
    HighCharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Reservation pour chaque Etage'
      },
      xAxis: {
        categories: ['0-Etage','1-Etage','2-Etage']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Homme',
        data: [1, 0, 4]
      }, {
        name: 'Femme',
        data: [5, 7, 3]
      }]
    });
    HighCharts.chart('container1', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares January, 2015 to May, 2015'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (HighCharts.theme && HighCharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'IE',
          y: 56.33
        }, {
          name: 'Chrome',
          y: 24.03,
          sliced: true,
          selected: true
        }, {
          name: 'Firefox',
          y: 10.38
        }, {
          name: 'Safari',
          y: 4.77
        }, {
          name: 'Opera',
          y: 0.91
        }, {
          name: 'Other',
          y: 0.2
        }]
      }]
    });
    HighCharts.chart('container2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly Average Rainfall'
      },
      subtitle: {
        text: 'Source: WorldClimate.com'
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Rainfall (mm)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

      }, {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

      }, {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

      }, {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

      }]
    });
  }

  dismiss() {
    this.viewController.dismiss();
  }

  getAllInformationOfPav(){
    this.dataProvider.getData('pavillonEtages?filter='+'{"where":{"pavillonId":"'+ this.pavillonId  +'"},"include":["etage","pavillon",{"chambres":{"positions":{"etudiant":["departement","option","cycle","niveau"]}}}]}')
      .then(
        data => {
          console.log(data);
          this.nombreEtageOfPav = data['length'];
          this.getNombreEtageOfPavDemeurant(data);
          console.log(this.labelEtageOfPav);
        },
        error => console.log(error)
      );
  }

  getNombreEtageOfPavDemeurant(value){
    this.labelEtageOfPav = [];
    this.nombreEtageOfPavFemme = 0;
    this.nombreEtageOfPavHomme = 0;
    let i = 0;
    while(i < value.length){
      let label = value[i]['etage'].label;
      this.labelEtageOfPav.push(label);
      if (value[i].demeurant == 'Homme'){
        this.nombreEtageOfPavHomme++;
      }else{
        this.nombreEtageOfPavFemme++;
      }
      i++;
    }
  }


}
