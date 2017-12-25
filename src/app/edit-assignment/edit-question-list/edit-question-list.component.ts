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

@Component({
  selector: 'app-edit-question-list',
  templateUrl: './edit-question-list.component.html',
  styleUrls: ['./edit-question-list.component.css']
})
export class EditQuestionListComponent implements OnInit, OnChanges {
    @Input() assignmentId: string;
    type:string;
    groupList: QuestionGroup[];

    constructor(protected assignmentService: AssignmentService, private dialog: MatDialog) { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.assignmentService.getAssignment(this.assignmentId)
            .subscribe((assignment:Assignment) => {
        	    this.type = assignment.type;
                this.groupList = assignment.questionGroupList;
            });
    }

    deleteGroup(group: QuestionGroup){
    	this.groupList = this.groupList.filter(item => item.id !== group.id);
    }

    openAddGroupDialog() {
    	if(this.type == 'tpo_speaking'){
    		this.addQuestionGroup();
    		return;
	    }

    	let dialog;
    	let config = new MatDialogConfig();
    	config.width = '800px';
    	switch (this.type) {
		    case 'tpo_reading':
		    	dialog = AddTpoReadingGroupDialogComponent;
			    break;
		    case 'tpo_listening':
		    	dialog = AddTpoListeningGroupDialogComponent;
		    	break;
		    case 'integrated_writing':
		    	dialog = AddIntegratedQuestionDialogComponent;
		    	break;
		    case 'independent_writing':
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

    	if(this.type == 'tpo_reading' || this.type == 'tpo_listening') {
		    this.assignmentService.addQuestionGroupToAssignment(this.assignmentId, this.type, content)
			    .subscribe((questionGroup: QuestionGroup) => {
				    const group = new QuestionGroup(questionGroup);
				    this.groupList.push(group);
			    });
	    }

	    if(this.type == 'integrated_writing') {
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
			    		return this.assignmentService.addQuestionToGroup(this.assignmentId, thatGroup.id, loadingQuestion);
				    })
			    ).subscribe(data=>{
				    console.log(data);
				    const question = new IntegratedWritingQuestion(data.question);
					thatGroup.questionList.push(question);
		    })

	    }

	    if(this.type == 'independent_writing'){
    		let thatGroup;
    		let question = <IndependentWritingQuestion>content;
		    this.assignmentService.addQuestionGroupToAssignment(this.assignmentId, this.type)
			    .pipe(
				    switchMap((questionGroup: QuestionGroup)=> {
					    thatGroup = new QuestionGroup(questionGroup);
					    this.groupList.push(thatGroup);
					    return this.assignmentService.addQuestionToGroup(this.assignmentId, thatGroup.id, question);
				    })
			    ).subscribe(data=>{
			    console.log(data);
			    question = new IndependentWritingQuestion(data.question);
			    thatGroup.questionList.push(question);
		    })
	    }

	    if(this.type == 'tpo_speaking') {
	    	this.assignmentService.addQuestionGroupToAssignment(this.assignmentId, this.type)
			    .subscribe((questionGroup: QuestionGroup) => {
	    		    this.groupList.push(new QuestionGroup(questionGroup))
			    });
	    }
	}

}
