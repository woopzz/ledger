/**
 * It's kind of a hack, but i've not found another simple way to get file encoding.
 * You have to pass a File object and an array of bytes as numbers
 *
 * Returns a boolean value.
 */
export async function isWindows1251(file: File): Promise<boolean> {
    // ЄДРПОУ
    const expected = [170, 196, 208, 207, 206, 211];

    const arrBuffer = await file.slice(0, expected.length).arrayBuffer();
    const intBuffer = new Uint8Array(arrBuffer);

    for (let i = 0; i < expected.length; i++)
        if (intBuffer[i] !== expected[i])
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
