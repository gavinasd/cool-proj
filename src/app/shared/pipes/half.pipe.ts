import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'half',
	pure: false
})
export class HalfPipe implements PipeTransform {

	transform(values: any[], filter: string): any[] {
		if(!values || (filter !== 'first' && filter !== 'second')) {
			return values;
		}

		if(filter == 'first'){
			return values.slice(0, (values.length+1)/2);
		}
		else {
			return values.slice((values.length+1)/2, values.length);
		}
	}

}
