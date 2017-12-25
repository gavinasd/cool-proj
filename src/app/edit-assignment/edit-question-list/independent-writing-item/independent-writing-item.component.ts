import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {IndependentWritingQuestion} from "../../../models/Questions/IndependentWritingQuestion";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AssignmentService} from "../../../core/services/assignment.service";
import {ToastService} from "../../../core/services/toast.service";
import {Question} from "../../../models/Questions/Question";
import {EditIndependentWritingQuestionDialogComponent} from "../../dialogs/edit-independent-writing-question-dialog/edit-independent-writing-question-dialog.component";
import {filter, switchMap} from "rxjs/operators";
import {ConfirmDeleteQuestionDialogComponent} from "../../dialogs/confirm-delete-question-dialog/confirm-delete-question-dialog.component";
import {ConfirmDeleteGroupDialogComponent} from "../../dialogs/confirm-delete-group-dialog/confirm-delete-group-dialog.component";

@Component({
  selector: 'app-independent-writing-item',
  templateUrl: './independent-writing-item.component.html',
  styleUrls: ['./independent-writing-item.component.css']
})
export class IndependentWritingItemComponent implements OnInit {
	@Input() assignmentId:string;
	@Input() group:QuestionGroup;
	@Output() onDelete:EventEmitter<void> = new EventEmitter<void>();
	questionList:IndependentWritingQuestion[];
	private loadingQuestion:IndependentWritingQuestion;

	constructor(private dialog: MatDialog,
	            private assignmentService:AssignmentService,
	            private toastService:ToastService) { }

	ngOnInit() {
		this.questionList = <IndependentWritingQuestion[]> this.group.questionList;
	}

	openEditQuestionDialog(question:Question){
		let config = new MatDialogConfig();
		config.width = '800px';
		config.data = question;
		this.dialog.open(EditIndependentWritingQuestionDialogComponent, config).afterClosed()
			.pipe(
				filter(result=> !!result),
				switchMap(question =>{
					this.loadingQuestion = question;
					return this.assignmentService.updateQuestion(question.id,question);
				})
			).subscribe(data=>{
				this.toastService.success('编辑成功');
				this.questionList = this.questionList.map((question)=>{
					if(question.id == this.loadingQuestion.id){
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
				switchMap(()=> this.assignmentService.deleteGroup(this.assignmentId, this.group.id))
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
				switchMap(()=> this.assignmentService.deleteQuestion(this.assignmentId, question.id))
			)
			.subscribe(data=> {
					this.questionList = this.questionList.filter(item => item.id !== question.id);
					this.toastService.success('删除成功');
				},
				(error:string)=>{
					console.log(error);
					this.toastService.error(error);
				}
			);
	}
}
