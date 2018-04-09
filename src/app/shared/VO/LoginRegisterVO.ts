

export class LoginRegisterVO {
	constructor(public token: string,
	            public userId: string,
	            public userType: string,
	            public userName: string,
	            public avatar: string) {}
}