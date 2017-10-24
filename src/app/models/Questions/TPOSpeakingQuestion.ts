import {Question} from "./Question";

export class TPOSpeakingQuestion extends Question{
	recordUrl:string;
	passage:string;

	constructor(obj?:any){
		super(obj);
		this.recordUrl = obj && obj.recordUrl;
		this.passage = obj && obj.passage;
	}

	public getQuestionIndex():number{
		if(this.recordUrl){
			return +this.recordUrl.split('/')[1];
		}
		return 0;
	}

	public getQuestionRecordUrl():string{
		if(this.recordUrl){
			const tpoIndex = this.recordUrl.split('/')[0];
			const questionIndex = this.recordUrl.split('/')[1];
			return '/assets/tpo/speaking/TPO'+tpoIndex+'/sound/speaking_question'+ questionIndex+'.mp3';
		}
		return '';
	}

	public getQuestionDirectionRecordUrl():string{
		if(this.recordUrl){
			const tpoIndex = this.recordUrl.split('/')[0];
			const questionIndex = this.recordUrl.split('/')[1];
			return '/assets/tpo/speaking/TPO'+tpoIndex+'/sound/speaking_question'+ questionIndex+'_qd.mp3';
		}
		return '';
	}

	public getBeforeReadRecordUrl():string{
		if(this.recordUrl){
			const tpoIndex = this.recordUrl.split('/')[0];
			const questionIndex = +this.recordUrl.split('/')[1];
			if(questionIndex ==3 || questionIndex == 4){
				return '/assets/tpo/speaking/TPO'+tpoIndex+'/sound/speaking_question'+ questionIndex+'_beforeread.mp3';
			}
		}
		return '';
	}

	public getDialogRecordUrl():string{
		if(this.recordUrl){
			const tpoIndex = this.recordUrl.split('/')[0];
			const questionIndex = +this.recordUrl.split('/')[1];
			if(questionIndex > 2){
				return '/assets/tpo/speaking/TPO'+tpoIndex+'/sound/speaking_question'+ questionIndex+'_dialog.mp3';
			}
		}
		return '';
	}
}