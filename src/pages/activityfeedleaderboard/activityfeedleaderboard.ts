// Components, functions, plugins
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { BaseChartDirective } from 'ng2-charts';

@IonicPage()
@Component({
  selector: 'page-activityfeedleaderboard',
  templateUrl: 'activityfeedleaderboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityFeedLeaderboardPage {
	
	//public chartLabels: string[] = ['John Black','Peter Vroom','Lauren Post','Jennifer Toddley','Lisa Bollenbach'];
	//public chartData: number[] = [1200,1000,850,825,700];
	public chartLabels: string[] = [];
	//public chartData: number[] = [];
	public chartData:any[] = [
		{data: [], label: 'Postings'}
	  ];
	public chartType: string = 'horizontalBar';
	public chartLegend: boolean = false;
	//public chartOptions: any[] = {title: {
	//			display: true,
	//			text: 'Postings and Comments'
	//		},
	//		scales:{xAxes:[{ticks:{beginAtZero:true}}]}};
	public chartOptions: any = {title: {
				display: true,
				text: 'Postings and Comments'
			},
			scales:{xAxes:[{ticks:{beginAtZero:true}}]}};
	
	@ViewChild(BaseChartDirective) chart: BaseChartDirective;
	
	constructor(private navParams: NavParams, 
				private storage: Storage,
				private databaseprovider: Database,
				private cd: ChangeDetectorRef,
				private view: ViewController,
				private localstorage: Localstorage) {
						
	}

	ionViewDidEnter() {

		var flags = "lb|";
		
		this.cd.markForCheck();
		
		this.databaseprovider.getDatabaseStats(flags, "0").then(data => {

			if (data['length']>0) {
				
				var AttendeeName = "";
				
				for (var i = 0; i < data['length']; i++) {
					
					AttendeeName = data[i].LastName + ", " + data[i].FirstName;
					
					this.chartLabels.push(AttendeeName);
					var Counter = parseInt(data[i].PostingsComments);
					this.chartData[0].data.push(Counter);
					
				}
				//console.log('Labels: ' + JSON.stringify(this.chartLabels));
				//console.log('Data: ' + JSON.stringify(this.chartData));
				
				this.cd.markForCheck();
				//this.chart.chart.config.data.labels = "Postings";
				this.chart.chart.update();
			}
			
		});
		
	}
	
	closeModal() {
		
		this.view.dismiss();
		
	}
}
