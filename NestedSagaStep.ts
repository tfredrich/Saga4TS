import { Saga } from "./Saga";
import { Context } from "./Context";
import { Step } from "./Step";

export class NestedSagaStep
implements Step
{
	private nestedSaga: Saga;
	private isCompensated: boolean = false;

	constructor(nestedSaga: Saga)
	{
		this.nestedSaga = nestedSaga;
	}

	async execute(context: Context): Promise<void>
	{
		console.log("Executing nested saga");
		try
		{
			await this.nestedSaga.run(context);
		}
		catch (error)
		{
			this.isCompensated = true;
			throw error;
		}
	}

	async compensate(context: Context): Promise<void>
	{
		if (this.isCompensated) return;

		console.log("Compensating for nested saga");
		try
		{
			await this.nestedSaga.compensate(context);
		}
		catch (error)
		{
			console.error(`Compensation failed for nested saga:`, error);
		}
	}
}
