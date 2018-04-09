import {QuestionGroup} from "../Questions/QuestionGroup";
import {AssignmentType} from "../../shared/enums/AssignmentType";

/**
 * 这个是所有作业的父类，具体的作业需要继承它
 */
export class Assignment {
	public assignmentId: string;
	public creatorId: string;
	public assignmentName: string;
	public assignmentType: AssignmentType;
	public questionGroupList: QuestionGroup[] = [];

	public constructor(obj: any) {
		this.assignmentId = (obj && obj.assignmentId) || (obj && obj.assignmentId);
		this.creatorId = obj && obj.creatorId;
		this.assignmentName = obj && obj.assignmentName;
		this.assignmentType = obj && obj.assignmentType;
		if (obj && obj.questionGroupList) {
			for (let group of obj.questionGroupList) {
				this.questionGroupList.push(new QuestionGroup(group));
			}
		}
	}

	public static needToMark(type: AssignmentType): boolean {
		if (type == AssignmentType.TPO_INDEPENDENT_WRITING
			|| type == AssignmentType.TPO_INTEGRATED_WRITING
			|| type == AssignmentType.VOCABULARY_ASSIGNMENT
			|| type == AssignmentType.TPO_SPEAKING
		) {
			return true;
		}
		return false;
	}

	public static getGroupContentLength(type: AssignmentType): number {
		switch (type) {
			case AssignmentType.TPO_READING:
				return 0;
			case AssignmentType.TPO_LISTENING:
				return 1;
			case AssignmentType.TPO_INDEPENDENT_WRITING:
				return 0;
			case AssignmentType.TPO_INTEGRATED_WRITING:
				return 2;
			case AssignmentType.TPO_SPEAKING:
				return 0;
			default:
				return 0;
		}
	}
}

