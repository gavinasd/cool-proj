import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TPOListeningQuestion} from "../../../models/Questions/TPOListeningQuestion";
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AssignmentService} from "../../../core/services/assignment.service";
import {ToastService} from "../../../core/services/toast.service";
import {EditTpoListeningContentDialogComponent} from "../../dialogs/edit-tpo-listening-content-dialog/edit-tpo-listening-content-dialog.component";
import {filter, switchMap} from "rxjs/operators";
import {Question} from "../../../models/Questions/Question";
import {EditTpoListeningQuestionDialogComponent} from "../../dialogs/edit-tpo-listening-question-dialog/edit-tpo-listening-question-dialog.component";
import {ConfirmDeleteQuestionDialogComponent} from "../../dialogs/confirm-delete-question-dialog/confirm-delete-question-dialog.component";
import {ConfirmDeleteGroupDialogComponent} from "../../dialogs/confirm-delete-group-dialog/confirm-delete-group-dialog.component";
import {AddTpoListeningQuestionDialogComponent} from "../../dialogs/add-tpo-listening-question-dialog/add-tpo-listening-question-dialog.component";
import {QuestionType} from "../../../shared/enums/QuestionType";


@Component({
  selector: 'app-tpo-listening-item',
  templateUrl: './tpo-listening-item.component.html',
  styleUrls: ['./tpo-listening-item.component.css']
})
export class TpoListeningItemComponent implements OnInit {
	@Input() assignmentId:string;
	@Input() group:QuestionGroup;
	@Output() onDelete:EventEmitter<void> = new EventEmitter<void>();
	questionList:TPOListeningQuestion[];
	public loadingContent:string ='';
	public loadingQuestion:TPOListeningQuestion;
	public recordUrl:string;
	public passage:string;
	public QuestionType: any = QuestionType;

	constructor(private dialog: MatDialog,
	            private assignmentService:AssignmentService,
	            private toastService:ToastService) { }

	ngOnInit() {
		this.questionList = <TPOListeningQuestion[]> this.group.questionList;
		if(this.group.content.length > 0) {
			this.recordUrl = JSON.parse(this.group.content).recordUrl;
			this.passage = JSON.parse(this.group.content).passage;
		}
	}

	addQuestion(){
		let config = new MatDialogConfig();
		config.width = '600px';
		config.data = {
			'questionIndex' : this.questionList.length
		};
		if(this.questionList.length > 0) {
			let record:number[] = [];
			let previousRecordUrl = this.questionList[this.questionList.length - 1].recordUrl;
			const firstIndex = previousRecordUrl.indexOf('/sound/listening_question');
			const secondIndex = previousRecordUrl.indexOf('_', firstIndex + '/sound/listening_question'.length);
			const thirdIndex = previousRecordUrl.indexOf('.mp3', secondIndex);
			record.push(+previousRecordUrl.slice('/assets/tpo/listening/test'.length, firstIndex));
			record.push(+previousRecordUrl.slice(firstIndex +'/sound/listening_question'.length, secondIndex));
			record.push(+previousRecordUrl.slice(secondIndex + 1, thirdIndex));

			config.data = {
				'questionIndex' : this.questionList.length,
				'record' : record
			};
		}
		let questionIndex = this.questionList.length;

		this.dialog.open(AddTpoListeningQuestionDialogComponent, config).afterClosed()
			.pipe(
				filter(result=> !!result),
				switchMap(result =>{
					questionIndex = result.index;
					return this.assignmentService
						.addQuestionToGroup(this.assignmentId, this.group.groupId, result.question, result.index)
				})
			).subscribe(data=>{
			console.log(data);
			let question = new TPOListeningQuestion(data);
			this.questionList.splice(questionIndex, 0, question);
		})
	}

	openEditContentDialog(){
		let config = new MatDialogConfig();
		config.width = '800px';
		config.data = this.group.content;
		this.dialog.open(EditTpoListeningContentDialogComponent, config).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(content =>{
					this.loadingContent = content;
					return this.assignmentService.updateQuestionGroupContent(this.assignmentId,this.group.groupId,content);
				})
			).subscribe(data => {
				this.group.content = this.loadingContent;
				this.passage = JSON.parse(this.loadingContent).passage;
				this.recordUrl = JSON.parse(this.loadingContent).recordUrl;
				this.toastService.success('编辑成功');
			});
	}

	openEditQuestionDialog(question:Question){
		let config = new MatDialogConfig();
		config.width = '600px';
		config.data = question;
		this.dialog.open(EditTpoListeningQuestionDialogComponent, config).afterClosed()
			.pipe(
				filter(result=> !!result),
				switchMap(question =>{
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
