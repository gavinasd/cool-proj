import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convert09ToAZ',
	pure: false
})
export class Convert09ToAZPipe implements PipeTransform {

	transform(value: any): any {
	    return String.fromCharCode(65 + value);
	}

}
