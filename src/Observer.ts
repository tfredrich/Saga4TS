/**
 * Observer interface
 */
export interface Observer<T>
{
    onEvent(event: T): void;
}
