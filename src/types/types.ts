import type { Readable, Writable } from "svelte/store"

export interface Template {
    readonly tree: Tree,
    readonly templateId: string,
    readonly version?: string,
    [key: string]: any
}
export interface Input {
    suffix?: string,
    type: string,
    list?: {
        value: string,
        label?: string,
        ordinal?: number
    }[],
    defaultValue?: any,
    terminology?: string
}
export interface keyValue {
    [key: string]: any
}
export interface Tree {
    id: string,
    max: number,
    children?: Tree[],
    name?: string,
    localizedName?: string,
    rmType: string,
    annotations?: {
        [key: string]: string
    },
    inContext?: boolean,
    inputs?: Input[],
    aqlPath: string
}

export interface Extracted {
    type: string,
    path: string,
    children?: Extracted[],
    tree?: Tree,
    label?: string,
    repeatable?: boolean,
    options: any
}

export type Status = 'initialized' | 'assigned' |'pending'| 'entered' | 'unclear'| 'unsupported' |'done' | 'cancelled'
export interface Recording {
    id: string,
    audioUrl: string,
    status: Status,
    date: string,
    templateId: string,
    response: keyValue,
    assigned: string,
    user: string
}

export interface UITemplate {
    schema: Extracted[]
}

export type writableKeyValue = Writable<keyValue>
export type readableKeyValue = Readable<keyValue>

interface ReadableCompositionStore {
    type: 'readable',
    store: readableKeyValue
}

interface WritableCompositionStore {
    type: 'writable',
    store: writableKeyValue
}

export type CompositionStore = ReadableCompositionStore | WritableCompositionStore

