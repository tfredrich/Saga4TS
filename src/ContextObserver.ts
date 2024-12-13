import { Observer } from './Observer';
import { ContextEvent } from './ContextEvent';

export interface ContextObserver
extends Observer<ContextEvent>
{
	onEvent(event: ContextEvent): void;
}