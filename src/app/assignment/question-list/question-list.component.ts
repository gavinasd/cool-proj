import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {ResponseToQuestion} from "../../models/models";
import {HttpService} from "../../services/http.service";
import {AssignmentService} from "../../services/assignment.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-question-list',
  templateUrl: 'question-list.component.html',
  styleUrls: ['question-list.component.css']
})
export class QuestionListComponent implements OnInit {
	public assignmentId:string;
  public assignmentName:string;
  public classId:string;
  public index:number;
  public questionListLength:number;
  public answer:string;

  	constructor(private route:ActivatedRoute,
				private toastService:ToastService,
				private httpService:HttpService,
				private assignmentService:AssignmentService,
                private elementRef: ElementRef) {
		this.route.params.forEach((param:Params)=>{
			this.classId = param['classId'];
			this.assignmentId = param['assignmentId'];
		});
  	}

  	ngOnInit() {
		this.assignmentService.getQuestionListByAssignment(this.assignmentId);
		this.assignmentService.questionList.subscribe((questionList)=>{
			this.questionListLength = questionList.length;
		});
	    this.assignmentService.getAssignmentName(this.assignmentId)
            .subscribe((assignmentName)=>{
	    		console.log("assignmentName",assignmentName);
	            this.assignmentName = assignmentName;
            },(err)=>{
	            console.log(err);
            });

        this.assignmentService.index.subscribe((index:number)=>{
            console.log("index","subscribe:"+ index);
            this.index = index;
        });
    }

	nextQuestion(){
        this.confirmAnswer(this.answer);
		this.assignmentService.changeIndex.next(true);
	}

	preQuestion(){
		this.assignmentService.changeIndex.next(false);
	}

    changeAnswer(answer:string){
	    this.answer = answer;
    }

  	confirmAnswer(answer:string){
	    if(!answer || answer.length == 0){
	        return;
        }
  		var response:ResponseToQuestion = new ResponseToQuestion({
  			creator: this.httpService.getCurrentId(),
			class:this.classId,
			assignment:this.assignmentId,
			question:this.assignmentService.currentQuestionId,
			content:answer
		});
  		console.log(response);
		this.assignmentService.addResponseToQuestion(response)
			.subscribe(
				(response)=>{
                    //因为已经向后台提交了新的数据，所以应该重新拉一次数据
                    //this.assignmentService.refreshQuestionList(this.assignmentId);
                },
                    (error:string)=>{
                        console.log(error);
                        this.toastService.error(error);
                    }
                );
	}

}
