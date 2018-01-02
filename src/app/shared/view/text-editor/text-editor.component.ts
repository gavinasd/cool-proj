import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from "@angular/forms";

const noop = () => {
};
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => TextEditorComponent),
	multi: true
};

const CUSTOM_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => TextEditorComponent),
	multi: true,
};

@Component({
	selector: 'app-text-editor',
	templateUrl: './text-editor.component.html',
	styleUrls: ['./text-editor.component.css'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_VALIDATOR]
})
export class TextEditorComponent implements ControlValueAccessor, Validator {
	@Input() editorOptions: Object;
	@Input() required:boolean = false;
	passage: string ;

	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;

	get value():string{
		return this.passage;
	}

	set value(v:string){
		this.passage = v;
		this.onChangeCallback(v);
	}

	writeValue(value: any){
		if(value !== this.passage){
			this.passage = value;
		}
	}

	registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	public validate(c: FormControl) {
		if (this.required && (!this.passage || this.passage.length == 0)) {
			return {
				required: {
					valid: false,
				}
			};
		} else {
			return null;
		}
	}

	constructor() { }

	ngOnInit() {
	}

}
