import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {IntegratedWritingQuestion} from "../../../models/Questions/IntegratedWritingQuestion";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AssignmentService} from "../../../core/services/assignment.service";
import {ToastService} from "../../../core/services/toast.service";
import {Question} from "../../../models/Questions/Question";
import {filter, switchMap} from "rxjs/operators";
import {EditIntegratedWritingQuestionDialogComponent} from "../../dialogs/edit-integrated-writing-question-dialog/edit-integrated-writing-question-dialog.component";
import {ConfirmDeleteQuestionDialogComponent} from "../../dialogs/confirm-delete-question-dialog/confirm-delete-question-dialog.component";
import {ConfirmDeleteGroupDialogComponent} from "../../dialogs/confirm-delete-group-dialog/confirm-delete-group-dialog.component";

@Component({
	selector: 'app-integrated-writing-item',
	templateUrl: './integrated-writing-item.component.html',
	styleUrls: ['./integrated-writing-item.component.css']
})
export class IntegratedWritingItemComponent implements OnInit {
	@Input() assignmentId: string;
	@Input() group: QuestionGroup;
	@Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
	questionList: IntegratedWritingQuestion[];
	public passage: string = '';
	public recordUrl: string = '';
	private loadingContent;
	private loadingQuestion: IntegratedWritingQuestion;

	constructor(private dialog: MatDialog,
	            private assignmentService: AssignmentService,
	            private toastService: ToastService) {
	}

	ngOnInit() {
		this.questionList = <IntegratedWritingQuestion[]> this.group.questionList;
		this.passage = JSON.parse(this.group.content).passage || '';
		this.recordUrl = JSON.parse(this.group.content).recordUrl || '';
	}

	openEditQuestionDialog(question: Question) {
		let config = new MatDialogConfig();
		config.width = '800px';
		config.height = '100vh';
		config.data = JSON.stringify({
			passage: this.passage,
			recordUrl: this.recordUrl,
			question: question
		});
		this.dialog.open(EditIntegratedWritingQuestionDialogComponent, config).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(formData => {
					this.loadingContent = JSON.stringify({
						passage: JSON.parse(formData).passage,
						recordUrl: JSON.parse(formData).recordUrl
					});
					this.loadingQuestion = <IntegratedWritingQuestion>JSON.parse(formData).question;

					return this.assignmentService.updateQuestionGroupContent(this.assignmentId, this.group.groupId, this.loadingContent);
				}),
				switchMap(data => {
					return this.assignmentService.updateQuestion(this.loadingQuestion.questionId, this.loadingQuestion);
				})
			).subscribe(data => {
			this.toastService.success('编辑成功');
			this.passage = JSON.parse(this.loadingContent).passage || '';
			this.recordUrl = JSON.parse(this.loadingContent).recordUrl || '';

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
		let config = new MatDialogConfig();
		this.dialog.open(ConfirmDeleteQuestionDialogComponent, config).afterClosed()
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
