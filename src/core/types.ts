import { ANY_TODO } from './utils';
export type rootOptions = {
    name?: string;
    listeners?: string[]
    emitter?: ANY_TODO
    subscribe?: ANY_TODO
    prepare?(): void
    store?: object
}

export type IclassName = string | string[];

export type Ielement = {
    addClass(className: IclassName): void;
    removeClass(className: IclassName): void;
    on(listener: string, method: string): void;
    off(listener: string, method: string): void;
    find(dataID: string): Ielement;
    findAll(dataID: string): Ielement;
    text?(): void
} & HTMLElement