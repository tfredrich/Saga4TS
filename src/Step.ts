import { Context } from './Context';

export interface Step
{
    execute(context: Context): Promise<void>;
    compensate(context: Context): Promise<void>;
}
