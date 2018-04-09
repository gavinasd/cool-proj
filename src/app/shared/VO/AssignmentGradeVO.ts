import {AssignmentType} from "../enums/AssignmentType";
import {GradeVO} from "./GradeVO";

export class AssignmentGradeVO {
	constructor(public assignmentId: string,
	            public assignmentName: string,
	            public assignmentType: AssignmentType,
	            public gradeVOList: GradeVO[]) {
	}
}