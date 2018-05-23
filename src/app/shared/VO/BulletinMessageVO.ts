export class BulletinMessageVO {
	public messageId: string;
	public courseId: string;
	public userId: string;
	public userName: string;
	public userAvatar: string;
	public message: string;
	public createdTime: number;


	constructor(obj: any) {
		this.messageId = obj && obj.messageId;
		this.courseId = obj && obj.courseId;
		this.userId = obj && obj.userId;
		this.userName = obj && obj.userName;
		this.userAvatar = obj && obj.userAvatar;
		this.message = obj && obj.message;
		this.createdTime = obj && obj.createdTime;
	}
}