import {Component, Input, OnInit} from '@angular/core';
import {BulletinService} from "../../core/services/bulletin.service";
import {BulletinMessageVO} from "../../shared/VO/BulletinMessageVO";
import {HttpService} from "../../core/services/http.service";
import {UserType} from "../../shared/enums/UserType";
import {NgForm} from "@angular/forms";

@Component({
	selector: 'app-bulletin-message-board',
	templateUrl: './bulletin-message-board.component.html',
	styleUrls: ['./bulletin-message-board.component.scss']
})
export class BulletinMessageBoardComponent implements OnInit {
	@Input() courseId;
	public userType: string;
	public UserType: any = UserType;

	public messageList: BulletinMessageVO[] = [];

	constructor(private bulletinService: BulletinService, private httpService: HttpService) {
	}

	ngOnInit() {
		this.userType = this.httpService.getUserType();
		this.bulletinService.getBulletinMessage(this.courseId)
			.subscribe((messageList: BulletinMessageVO[]) => {
				this.messageList = messageList;
			});
	}

	addMessage(f: NgForm) {
		this.bulletinService.createBulletinMessage(this.courseId, f.value.message)
			.subscribe((bulletinMessage: BulletinMessageVO) => {
				this.messageList.push(bulletinMessage);
				f.reset();
			});
	}

}
