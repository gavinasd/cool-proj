import {UserType} from "../enums/UserType";

export class UserVO {
	constructor(public userId: string,
	            public email: string,
	            public nickName: string,
	            public avatar: string,
	            public type: UserType) {
	}
}