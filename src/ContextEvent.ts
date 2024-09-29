export class ContextEvent
{
	constructor(
		public readonly type: string,
		public readonly data: any
	) {}
}