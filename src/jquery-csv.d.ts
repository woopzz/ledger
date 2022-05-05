declare module 'jquery-csv' {
    type TOptions = {
        separator: ';',
        delimiter: "'",
    }

    export function toArrays(
        csv: string,
        options?: TOptions,
    ): string[][];

    export function fromArrays(
        arrays: string[][],
        options?: TOptions,
    ): string;
}
