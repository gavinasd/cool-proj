import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AssignmentService} from "../../core/services/assignment.service";
import {QuestionGroup} from "../../models/Questions/QuestionGroup";
import {Assignment} from "../../models/assignments/Assignment";
import {AddTpoReadingGroupDialogComponent} from "../dialogs/add-tpo-reading-group-dialog/add-tpo-reading-group-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {filter, switchMap} from "rxjs/operators";
import {AddTpoListeningGroupDialogComponent} from "../dialogs/add-tpo-listening-group-dialog/add-tpo-listening-group-dialog.component";
import {AddIntegratedQuestionDialogComponent} from "../dialogs/add-integrated-question-dialog/add-integrated-question-dialog.component";
import {IntegratedWritingQuestion} from "../../models/Questions/IntegratedWritingQuestion";
import {AddIndependentQuestionDialogComponent} from "../dialogs/add-independent-question-dialog/add-independent-question-dialog.component";
import {IndependentWritingQuestion} from "../../models/Questions/IndependentWritingQuestion";
import {AssignmentType} from "../../shared/enums/AssignmentType";

@Component({
  selector: 'app-edit-question-list',
  templateUrl: './edit-question-list.component.html',
  styleUrls: ['./edit-question-list.component.css']
})
export class EditQuestionListComponent implements OnInit, OnChanges {
    @Input() assignmentId: string;
    type:AssignmentType;
    groupList: QuestionGroup[];
    public AssignmentType:any = AssignmentType;

    constructor(protected assignmentService: AssignmentService, private dialog: MatDialog) { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.assignmentService.getAssignment(this.assignmentId)
            .subscribe((assignment:Assignment) => {
        	    this.type = assignment.assignmentType;
                this.groupList = assignment.questionGroupList;
            });
    }

    deleteGroup(group: QuestionGroup){
    	this.groupList = this.groupList.filter(item => item.groupId !== group.groupId);
    }

    openAddGroupDialog() {
    	if(this.type == AssignmentType.TPO_SPEAKING){
    		this.addQuestionGroup();
    		return;
	    }

    	let dialog;
    	let config = new MatDialogConfig();
    	config.width = '800px';
    	switch (this.type) {
		    case AssignmentType.TPO_READING:
		    	dialog = AddTpoReadingGroupDialogComponent;
			    break;
		    case AssignmentType.TPO_LISTENING:
		    	dialog = AddTpoListeningGroupDialogComponent;
		    	break;
		    case AssignmentType.TPO_INTEGRATED_WRITING:
		    	dialog = AddIntegratedQuestionDialogComponent;
		    	break;
		    case AssignmentType.TPO_INDEPENDENT_WRITING:
		    	dialog = AddIndependentQuestionDialogComponent;
		    	break;
	    }

	    this.dialog.open(dialog, config).afterClosed()
		    .pipe(
			    filter(result => !!result)
		    ).subscribe(data => {
		    this.addQuestionGroup(data);
	    });
    }

	addQuestionGroup(content?:any){

    	if(this.type == AssignmentType.TPO_READING || this.type == AssignmentType.TPO_LISTENING) {
		    this.assignmentService.addQuestionGroupToAssignment(this.assignmentId, this.type, content)
			    .subscribe((questionGroup: QuestionGroup) => {
				    const group = new QuestionGroup(questionGroup);
				    this.groupList.push(group);
			    });
	    }

	    if(this.type == AssignmentType.TPO_INTEGRATED_WRITING) {
		    let loadingContent = JSON.stringify({
			    passage: JSON.parse(content).passage,
			    recordUrl: JSON.parse(content).recordUrl
		    });
		    let loadingQuestion = <IntegratedWritingQuestion>JSON.parse(content).question;
		    let thatGroup;

		    this.assignmentService.addQuestionGroupToAssignment(this.assignmentId, this.type, loadingContent)
			    .pipe(
			    	switchMap((questionGroup: QuestionGroup)=> {
					    thatGroup = new QuestionGroup(questionGroup);
					    this.groupList.push(thatGroup);
			    		return this.assignmentService.addQuestionToGroup(this.assignmentId, thatGroup.groupId, loadingQuestion);
				    })
			    ).subscribe(data=>{
				    const question = new IntegratedWritingQuestion(data);
					thatGroup.questionList.push(question);
		    })

	    }

	    if(this.type == AssignmentType.TPO_INDEPENDENT_WRITING){
    		let thatGroup;
    		let question = <IndependentWritingQuestion>content;
		    this.assignmentService.addQuestionGroupToAssignment(this.assignmentId, this.type)
			    .pipe(
				    switchMap((questionGroup: QuestionGroup)=> {
					    thatGroup = new QuestionGroup(questionGroup);
					    this.groupList.push(thatGroup);
					    return this.assignmentService.addQuestionToGroup(this.assignmentId, thatGroup.groupId, question);
				    })
			    ).subscribe(data=>{
			    console.log(data);
			    question = new IndependentWritingQuestion(data);
			    thatGroup.questionList.push(question);
		    })
	    }

	    if(this.type == AssignmentType.TPO_SPEAKING) {
	    	this.assignmentService.addQuestionGroupToAssignment(this.assignmentId, this.type)
			    .subscribe((questionGroup: QuestionGroup) => {
	    		    this.groupList.push(new QuestionGroup(questionGroup))
			    });
	    }
	}

}
