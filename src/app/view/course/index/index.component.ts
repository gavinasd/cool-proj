import {Component, OnInit, EventEmitter, Input} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {NgUploaderOptions} from "ngx-uploader";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class IndexComponent implements OnInit {
  data:string = 'abcd';
  options:NgUploaderOptions = new NgUploaderOptions({
		url:environment.addResourceUrl,
		data:{
			'userId':'5874f94ca19a0cdde8d78c48',
			'classId':'5874fa82a19a0cdde8d78c49'
		},
		autoUpload:false
	});

	events:EventEmitter<any> = new EventEmitter();

	constructor(private httpService:HttpService, private router:Router) { }

	ngOnInit() {
		if(!this.httpService.isLoggedIn()) {
			this.router.navigate(['/login']);
		}
	}

	startUpload(){
		this.events.emit('startUpload');
	}

	onSubmit(form:any){
		this.startUpload();
		return false;
	}

	handleUpload(data): void {
		this.data = data;
		console.log(data);
	}

}
