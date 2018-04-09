import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {TPOReadingQuestion} from "../../../models/Questions/TPOReadingQuestion";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {EditTpoReadingPassageDialogComponent} from "../../dialogs/edit-tpo-reading-passage-dialog/edit-tpo-reading-passage-dialog.component";
import {filter, switchMap} from "rxjs/operators";
import {AssignmentService} from "../../../core/services/assignment.service";
import {Question} from "../../../models/Questions/Question";
import {EditTpoReadingQuestionDialogComponent} from "../../dialogs/edit-tpo-reading-question-dialog/edit-tpo-reading-question-dialog.component";
import {ToastService} from "../../../core/services/toast.service";
import {ConfirmDeleteQuestionDialogComponent} from "../../dialogs/confirm-delete-question-dialog/confirm-delete-question-dialog.component";
import {ConfirmDeleteGroupDialogComponent} from "../../dialogs/confirm-delete-group-dialog/confirm-delete-group-dialog.component";
import {AddTpoReadingQuestionDialogComponent} from "../../dialogs/add-tpo-reading-question-dialog/add-tpo-reading-question-dialog.component";
import {QuestionType} from "../../../shared/enums/QuestionType";

@Component({
	selector: 'app-tpo-reading-item',
	templateUrl: './tpo-reading-item.component.html',
	styleUrls: ['./tpo-reading-item.component.css']
})
export class TpoReadingItemComponent implements OnInit {
	@Input() assignmentId: string;
	@Input() group: QuestionGroup;
	@Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
	questionList: TPOReadingQuestion[];
	loadingPassage: string = ''; //编辑完的passage,存放在这个变量中，等到成功提交到服务器就可以更新了
	loadingQuestion: TPOReadingQuestion; //编辑完的question,存放在这个变量中，等到成功提交到服务器就可以更新了
	passage: string = '';
	public QuestionType: any = QuestionType;

	constructor(private dialog: MatDialog,
	            private assignmentService: AssignmentService,
	            private toastService: ToastService) {
	}

	ngOnInit() {
		this.questionList = <TPOReadingQuestion[]> this.group.questionList;
		if (this.group && this.group.content && this.group.content.length > 0) {
			this.passage = JSON.parse(this.group.content).passage;
		}
	}

	addQuestion() {
		let config = new MatDialogConfig();
		config.width = '600px';
		config.data = this.questionList.length;
		let questionIndex = this.questionList.length;

		this.dialog.open(AddTpoReadingQuestionDialogComponent, config).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(result => {
					questionIndex = result.index;
					return this.assignmentService
						.addQuestionToGroup(this.assignmentId, this.group.groupId, result.question, result.index)
				})
			).subscribe(data => {
			let question = new TPOReadingQuestion(data);
			this.questionList.splice(questionIndex, 0, question);
		})
	}

	openEditPassageDialog() {
		let config = new MatDialogConfig();
		config.width = '800px';
		config.data = this.passage;
		this.dialog.open(EditTpoReadingPassageDialogComponent, config).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(result => {
					this.loadingPassage = result;
					result = JSON.stringify({
						'passage': result
					});
					return this.assignmentService.updateQuestionGroupContent(this.assignmentId, this.group.groupId, result);
				})
			).subscribe(data => {
			this.toastService.success('编辑成功');
			this.passage = this.loadingPassage;
		});
	}

	openEditQuestionDialog(question: Question) {
		let config = new MatDialogConfig();
		config.width = '600px';
		config.data = question;
		this.dialog.open(EditTpoReadingQuestionDialogComponent, config).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(question => {
					this.loadingQuestion = question;
					return this.assignmentService.updateQuestion(question.questionId, question);
				})
			).subscribe(data => {
			this.toastService.success('编辑成功');
			this.questionList = this.questionList.map((question) => {
				if (question.questionId == this.loadingQuestion.questionId) {
					return this.loadingQuestion;
				}
				return question;
			});
		})
	}

	openConfirmDeleteGroupDialog() {
		this.dialog.open(ConfirmDeleteGroupDialogComponent).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(() => this.assignmentService.deleteGroup(this.assignmentId, this.group.groupId))
			)
			.subscribe(data => {
					this.onDelete.emit();
					this.toastService.success('删除成功');
				},
				(error: string) => {
					console.log(error);
					this.toastService.error(error);
				}
			);
	}

	openConfirmDeleteQuestionDialog(question: Question) {
		this.dialog.open(ConfirmDeleteQuestionDialogComponent).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(() => this.assignmentService.deleteQuestion(this.assignmentId, question.questionId))
			)
			.subscribe(data => {
					this.questionList = this.questionList.filter(item => item.questionId !== question.questionId);
					this.toastService.success('删除成功');
				},
				(error: string) => {
					console.log(error);
					this.toastService.error(error);
				}
			);
	}


}
