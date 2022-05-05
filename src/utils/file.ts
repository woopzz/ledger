/**
 * It's kind of a hack, but i've not found another simple way to get file encoding.
 * You have to pass a File object and an array of bytes as numbers
 * (e.g. [197, 195, 208, 207, 206, 211] === ЕГРПОУ).
 *
 * Returns a boolean value.
 */
export async function isWindows1251(file: File, startsWith: number[]): Promise<boolean> {
    const arrBuffer = await file.slice(0, 6).arrayBuffer();
    const intBuffer = new Uint8Array(arrBuffer);

    for (let i = 0; i < startsWith.length; i++)
        if (intBuffer[i] !== startsWith[i])
            return false;

    return true;
}

/**
 * Returns a DOMString object obtained from the file encoded in Windows-1251.
 */
export async function getWindows1251Content(file: File): Promise<string> {
    const arrBuffer = await file.arrayBuffer();
    const decoder = new TextDecoder('windows-1251');
    return decoder.decode(arrBuffer);
}
