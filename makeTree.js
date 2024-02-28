const fileSystem = require('fs/promises');

const INPUT_FILE_PATH = 'input.txt';
const OUTPUT_FILE_PATH = 'output.json';

(async () => {
    const inputFile = await fileSystem.readFile(INPUT_FILE_PATH, 'utf-8');

    const lines = inputFile.split('\n');

    const tree = {};

    lines.forEach((line) => {
        const [keys, value] = line.split('=');

        recursiveBuildTree(tree, keys.trim(), value.trim());
    });

    const stringifiedTree = JSON.stringify(tree, '', 2);

    await fileSystem.writeFile(OUTPUT_FILE_PATH, stringifiedTree);

    function recursiveBuildTree(localTree, keys, value) {
        const [currKey, ...otherKeys] = keys.split('.');

        if (Array.isArray(otherKeys) && otherKeys.length > 0) {
            localTree[currKey] = localTree[currKey] ?? {};

            return recursiveBuildTree(
                localTree[currKey],
                otherKeys.join('.'),
                value
            );
        }

        localTree[currKey] = value;
    }
})();
