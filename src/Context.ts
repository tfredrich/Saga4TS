import { Observer } from './Observer';

export class Context {
    private observers: Observer[] = [];
    private data: { [key: string]: any } = {};

    constructor() { }

    get(key: string): any {
        return this.data[key];
    }

    set(key: string, value: any): void {
        if (this.data[key] !== value) {
            this.data[key] = value;
            this.notifyObservers(key, value);
        }
    }

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    private notifyObservers(key: string, value: any): void {
        this.observers.forEach(observer => observer.onEvent(key));
    }
}
