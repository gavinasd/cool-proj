import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TPOSpeakingQuestion} from "../../../models/Questions/TPOSpeakingQuestion";
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Question} from "../../../models/Questions/Question";
import {AssignmentService} from "../../../core/services/assignment.service";
import {ToastService} from "../../../core/services/toast.service";
import {EditTpoSpeakingQuestionDialogComponent} from "../../dialogs/edit-tpo-speaking-question-dialog/edit-tpo-speaking-question-dialog.component";
import {filter, switchMap} from "rxjs/operators";
import {ConfirmDeleteQuestionDialogComponent} from "../../dialogs/confirm-delete-question-dialog/confirm-delete-question-dialog.component";
import {ConfirmDeleteGroupDialogComponent} from "../../dialogs/confirm-delete-group-dialog/confirm-delete-group-dialog.component";
import {AddTpoSpeakingQuestionDialogComponent} from "../../dialogs/add-tpo-speaking-question-dialog/add-tpo-speaking-question-dialog.component";
import {QuestionType} from "../../../shared/enums/QuestionType";

@Component({
  selector: 'app-tpo-speaking-item',
  templateUrl: './tpo-speaking-item.component.html',
  styleUrls: ['./tpo-speaking-item.component.css']
})
export class TpoSpeakingItemComponent implements OnInit {
	@Input() assignmentId:string;
	@Input() group:QuestionGroup;
	@Output() onDelete:EventEmitter<void> = new EventEmitter<void>();
	questionList:TPOSpeakingQuestion[];
	private loadingQuestion: TPOSpeakingQuestion;
	public QuestionType: any = QuestionType;

    constructor(private dialog: MatDialog,
                private assignmentService:AssignmentService,
                private toastService:ToastService) { }

    ngOnInit() {
	    this.questionList = <TPOSpeakingQuestion[]> this.group.questionList;
    }

    addQuestion(){
	    let config = new MatDialogConfig();
	    config.width = '600px';
	    config.data = this.questionList.length;
	    let questionIndex = this.questionList.length;

	    this.dialog.open(AddTpoSpeakingQuestionDialogComponent, config).afterClosed()
		    .pipe(
			    filter(result=> !!result),
			    switchMap(result =>{
				    questionIndex = result.index;
				    return this.assignmentService
					    .addQuestionToGroup(this.assignmentId, this.group.groupId, result.question, result.index)
			    })
		    ).subscribe(data=>{
		    let question = new TPOSpeakingQuestion(data);
		    this.questionList.splice(questionIndex, 0, question);
	    })
    }

    openEditQuestionDialog(question: Question){
	    let config = new MatDialogConfig();
	    config.width = '600px';
	    config.data = question;
	    this.dialog.open(EditTpoSpeakingQuestionDialogComponent, config).afterClosed()
		    .pipe(
			    filter(result=> !!result),
			    switchMap((question: TPOSpeakingQuestion) =>{
				    this.loadingQuestion = question;
				    return this.assignmentService.updateQuestion(question.questionId,question);
			    })
		    ).subscribe(data=>{
		    this.toastService.success('编辑成功');
		    this.questionList = this.questionList.map((question)=>{
			    if(question.questionId == this.loadingQuestion.questionId){
				    return this.loadingQuestion;
			    }
			    return question;
		    });
	    })
    }

	openConfirmDeleteGroupDialog(){
		this.dialog.open(ConfirmDeleteGroupDialogComponent).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(()=> this.assignmentService.deleteGroup(this.assignmentId, this.group.groupId))
			)
			.subscribe(data=> {
					this.onDelete.emit();
					this.toastService.success('删除成功');
				},
				(error:string)=>{
					console.log(error);
					this.toastService.error(error);
				}
			);
	}

	openConfirmDeleteQuestionDialog(question: Question){
		let config = new MatDialogConfig();
		this.dialog.open(ConfirmDeleteQuestionDialogComponent, config).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(()=> this.assignmentService.deleteQuestion(this.assignmentId, question.questionId))
			)
			.subscribe(data=> {
					this.questionList = this.questionList
						.filter(item => item.questionId !== question.questionId);
					this.toastService.success('删除成功');
				},
				(error:string)=>{
					console.log(error);
					this.toastService.error(error);
				}
			);
	}

}
