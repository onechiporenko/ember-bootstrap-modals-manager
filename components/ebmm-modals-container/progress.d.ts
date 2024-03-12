import { TrackedArray } from 'tracked-built-ins';
import RSVP from 'rsvp';
import Base, { ModalArgs } from './base';
import { EbmmConfirmPayload, EbmmPromiseFactory } from '../../services/modals-manager';
/**
 * @category Default Modals
 */
export default class ProgressModal<T> extends Base {
    /**
     * Number of fulfilled promises
     */
    protected done: number;
    /**
     * Number of promises
     *
     * This value is set initially and must be used instead of `promises.length`,
     * because `promises`-array is changed while execution
     */
    protected promisesCount: number;
    protected canceled: boolean;
    protected get settled(): boolean;
    protected errors: TrackedArray<any>;
    protected results: TrackedArray<any>;
    protected get promises(): EbmmPromiseFactory[];
    get progress(): number;
    constructor(owner: unknown, args: ModalArgs);
    /**
     * @category Action Handlers
     */
    cancel(): void;
    initProgress(): void;
    next(promiseFactory: EbmmPromiseFactory): RSVP.Promise<T> | void;
    _next(result?: EbmmConfirmPayload): void;
    _complete(): void;
}
//# sourceMappingURL=progress.d.ts.map