export type rootOptions = {
    name?: string;
    listeners?: string[]
    prepare?(): void
}

export type IclassName = string | string[];

export type Ielement = {
    addClass(className: IclassName): void;
    removeClass(className: IclassName): void;
    on(listener: string, method: string): void;
    off(listener: string, method: string): void;
    find(dataID: string): Ielement;
    findAll(dataID: string): Ielement;
} & HTMLElement