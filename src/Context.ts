import { Observer } from './Observer';
import { ContextEvent } from './ContextEvent';

export class Context {
	private observers: Observer<ContextEvent>[] = [];
	private data: { [key: string]: any } = {};

	get(key: string): any {
		return this.data[key];
	}

	set(key: string, value: any): void {
		if (this.data[key] !== value) {
			this.data[key] = value;
			this.notifyObservers(key, value);
		}
	}

	addObserver(observer: Observer<ContextEvent>): void {
		this.observers.push(observer);
	}

	private notifyObservers(key: string, value: any): void {
		this.observers.forEach(observer => observer.onEvent(new ContextEvent(key, value)));
	}
}
