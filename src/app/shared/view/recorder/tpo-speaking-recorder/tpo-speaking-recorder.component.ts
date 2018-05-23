import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import * as RecordRTC from 'recordrtc';
import {AssignmentService} from "../../../../core/services/assignment.service";

@Component({
  selector: 'app-tpo-speaking-recorder',
  templateUrl: './tpo-speaking-recorder.component.html',
  styleUrls: ['./tpo-speaking-recorder.component.css']
})
export class TpoSpeakingRecorderComponent implements OnInit,OnChanges {
	@Input() start:boolean = false;
	@Input() prepareTime:number;
	@Input() responseTime:number;
	@Output() uploaded:EventEmitter<string> = new EventEmitter<string>();

	@Input() courseId;
	@Input() assignmentId;
	@Input() questionId;

	startSpeak:boolean;
	isUploading:boolean;
	responding:boolean;
	countDownTime:number = 0;
	public prepareRecordUrl = '/assets/tpo/speaking/TPO-speaking-prepare.mp3';
	public speakRecordUrl = '/assets/tpo/speaking/TPO-speaking-speak.mp3';

	private stream: MediaStream;
	private options = {
		mimeType: 'audio/x-wav',
		bitsPerSecond: 128000
	};
	private recordRTC:any;

	constructor(private assignmentService:AssignmentService) { }

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.startSpeak = false;
		this.responding = false;
		this.countDownTime = this.prepareTime;
	}

	completePlayRecord(){
		//这是第一次
		if(!this.startSpeak){
			this.countDownTime = this.prepareTime;
			let subscription:Subscription = Observable.interval(1000)
				.takeWhile(()=>this.countDownTime > 0)
				.subscribe(()=>{
					this.countDownTime --;
					if(this.countDownTime == 0){
						this.countDownTime = this.responseTime;
						this.startSpeak = true;
						subscription.unsubscribe();
					}
				});
		}
		//这是第二次
		else {
			this.startRecord();

			//开始准备时间的倒计时
			this.countDownTime = this.responseTime;
			let subscription:Subscription = Observable.interval(1000)
				.takeWhile(()=>this.countDownTime > 0)
				.subscribe(()=>{
					this.countDownTime --;
					if(this.countDownTime == 0){
						this.stopRecord();
						subscription.unsubscribe();
					}
				});
		}
	}

	startRecord(): void {
		let mediaConstraints = {
			audio: true
		};
		navigator.mediaDevices.getUserMedia(mediaConstraints)
			.then(this.successCallback.bind(this), this.errorCallback.bind(this));
	}

	stopRecord(){
		this.recordRTC.stopRecording(this.uploadRecordToServer.bind(this));
		this.stream.getAudioTracks().forEach(track => track.stop());
	}

	successCallback(stream : MediaStream){
		this.stream = stream;
		this.recordRTC = RecordRTC(stream, this.options);
		this.recordRTC.startRecording();
	}

	uploadRecordToServer(){
		const fileName = this.getRandomFileName();
		const blob = this.recordRTC.getBlob();
		let formData:FormData = new FormData();
		const file = new File([blob], fileName, {
			type:'audio/x-wav'
		});
		formData.append('record', file, fileName);
		formData.append('courseId', this.courseId);
		formData.append('assignmentId', this.assignmentId);
		formData.append('questionId', this.questionId);

		this.isUploading = true;
		this.assignmentService.uploadSpeakingRecord(formData)
			.subscribe((resp)=>{
				this.isUploading = false;
				this.uploaded.emit(resp.filename);
				console.log(resp);
			})
	}

	errorCallback(){}

	getRandomFileName():string{
		let fileName ='';
		for(let i=0;i<15;i++)  //i为文件名长度
		{
			let number = Math.floor(Math.random()*1000);
			let code ;
			if (number <= 500)
				code = number % 10;    //生成0-9的数字
			else
				code = String.fromCharCode(65 + number % 26);    //生成A-Z的字母
			fileName += code.toString();
		}
		return fileName + '.ogg';
	}
}
