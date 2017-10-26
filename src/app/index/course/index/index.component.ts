import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../core/services/http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
	constructor(private httpService:HttpService, private router:Router) { }

	ngOnInit() {
		if(!this.httpService.isLoggedIn()) {
			this.router.navigate(['/login']);
		}
	}

}
