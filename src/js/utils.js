const fs = require('fs');
const iconv = require('iconv');
const { execSync } = require('child_process');

exports.floatRound = function (number, places=2) {
    return +(Math.round(number + "e+" + places)  + "e-" + places);
}

exports.getFileContent = function (filePath) {
    // Get the file content.
    let data = fs.readFileSync(filePath);

    // Check file encoding. If it's UTF-8, that's what we need.
    const fileCommandShellOutput = execSync('file -bi ' + filePath, {encoding: 'utf8'});
    if (fileCommandShellOutput.includes('charset=utf-8')) {
        return data;
    }

    // Otherwise we assume that the file has cp1251 encoding.
    try {
        return iconv.Iconv('windows-1251', 'utf8').convert(data);
    } catch {
        throw Error("It's definitely not windows-1251.")
    }
}
