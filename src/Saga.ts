import { Observer } from './Observer';
import { Step } from './Step';
import { Context } from './Context';

export class Saga
{
    private steps: Step[];
    private observers: Observer[] = [];

    constructor(steps: Step[])
	{
        this.steps = steps;
    }

    addObserver(observer: Observer): void
	{
        this.observers.push(observer);
    }

    async run(context: Context): Promise<void>
	{
		const executedSteps: Step[] = [];

        for (const step of this.steps)
		{
            try
			{
				executedSteps.push(step);
                await step.execute(context);
            }
			catch (error)
			{
                await this.compensateExecuted(context, executedSteps);
                throw error;
            }
        }

        // Notify observers that the saga has completed
        this.observers.forEach(observer => observer.onEvent('sagaCompleted'));
    }

	public async compensate(context: Context): Promise<void>
	{
		await this.compensateExecuted(context, this.steps);
	}

    private async compensateExecuted(context: Context, executedSteps: Step[]): Promise<void>
	{
		const steps = Array.from(executedSteps).reverse();

		for (const step of steps)
		{
            try
			{
                await step.compensate(context);
            }
			catch (error)
			{
                console.error(`Compensation failed for step:`, error);
            }
        }

        // Notify observers that compensation has completed
        this.observers.forEach(observer => observer.onEvent('sagaCompensated'));
    }
}