import {StudentAnswerVO} from "./StudentAnswerVO";
import {ScoreVO} from "./ScoreVO";


export class AssignmentInfoVO {
	public assignmentId: string;
	public studentId: string;
	public time: number;
	public studentAnswerVOList: StudentAnswerVO[] = [];
	public scoreVOList: ScoreVO[] = [];

	constructor(obj: any) {
		this.assignmentId = obj && obj.assignmentId;
		this.studentId = obj && obj.studentId;
		this.time = obj && obj.time;
		this.studentAnswerVOList = obj && obj.studentAnswerVOList.map(vo => new StudentAnswerVO(vo));
		this.scoreVOList = obj && obj.scoreVOList.map(vo => new ScoreVO(vo));
	}
}