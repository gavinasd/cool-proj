import {Injectable} from "@angular/core";
import {CanDeactivate} from "@angular/router";
import {Observable} from "rxjs/Observable";

/**
 * 路由守卫
 */
export interface ComponentCanDeactivate {
	canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
	canDeactivate(component: ComponentCanDeactivate) {
		return component.canDeactivate();
	}
}
