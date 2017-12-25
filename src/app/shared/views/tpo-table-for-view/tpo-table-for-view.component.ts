import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

@Component({
  selector: 'app-tpo-table-for-view',
  templateUrl: './tpo-table-for-view.component.html',
  styleUrls: ['./tpo-table-for-view.component.css']
})
export class TpoTableForViewComponent implements OnInit {
	@Input() mode:'homeword'|'review';
	@Input() tableRows:string[];
	@Input() tableCols:string[];
	@Input() answer:string;
	@Output() answerChanged:EventEmitter<string> = new EventEmitter<string>();
	public dataSource: TableRowDataSource;
	public answerMatrix:boolean[][];

    constructor() {
    }

    ngOnInit() {
	    this.dataSource = new TableRowDataSource(this.tableCols);
	    this.answerMatrix = new Array();
	    let answerList = this.answer.split('-')
		    .map((str) => {
	    	    return str.split('').map((value)=> this.convertAZTo09(value))
		    });
	    this.answerMatrix = Array.from({length: this.tableCols.length}).map((value, i)=>{
	    	return Array.from({length: this.tableRows.length}).map((value, j) =>{
	    		if(!answerList[j]){
	    			return false;
			    }
	    		if(answerList[j].indexOf(i) >= 0) {
	    			return true;
			    }

			    return false;
		    })
	    });
    }

    changeAnswer(i:number, index:number){
    	for (let j = 0; j < this.tableRows.length; j ++ ){
    		if(index == j){
    			this.answerMatrix[i][j] = true;
		    }
		    else {
    			this.answerMatrix[i][j] = false;
		    }
	    }

	    this.answerChanged.emit(this.getAnswerToEmit());
    }

    convertAZTo09(value: string): number{
    	return value.charCodeAt(0)-65;
    }

    convert09ToAZ(value: number): string{
    	return String.fromCharCode(value + 65);
    }

    getAnswerToEmit():string{
    	let answer = '';
    	for (let j = 0; j < this.tableRows.length; j++){
    		for (let i = 0; i < this.tableCols.length; i++){
    			if(this.answerMatrix[i][j]){
    				answer += this.convert09ToAZ(i);
			    }
		    }
		    answer += '-';
	    }
	    return answer.slice(0, answer.length-1);
    }

}

export class TableRowDataSource extends DataSource<any>{
	constructor(private options:string[]){
		super();
	}

	connect(collectionViewer: CollectionViewer): Observable<any[]> {
		return Observable.of(this.options);
	}

	disconnect(collectionViewer: CollectionViewer): void {
	}
}
