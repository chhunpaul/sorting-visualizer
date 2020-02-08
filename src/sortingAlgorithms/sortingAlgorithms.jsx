export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) {
        return array;
    }
    const _merge = (array, startIdx, middleIdx, endIdx, arrayCopy, animations,) => {

        let k = startIdx;
        let i = startIdx;
        let j = middleIdx + 1;
        while (i <= middleIdx && j <= endIdx) {
            animations.push({cmd: "highlight", indexes: [i, j]});
            if (arrayCopy[i] <= arrayCopy[j]) {
                animations.push({cmd: 'resize', indexes: [k, arrayCopy[i]]});
                array[k++] = arrayCopy[i++];
            } else {
                animations.push({cmd: 'resize', indexes: [k, arrayCopy[j]]});
                array[k++] = arrayCopy[j++];
            }
        }
        while (i <= middleIdx) {
            animations.push({cmd: "highlight", indexes: [i, i]});
            animations.push({cmd: 'resize', indexes: [k, arrayCopy[i]]});
            array[k++] = arrayCopy[i++];
        }
        while (j <= endIdx) {
            animations.push({cmd: "highlight", indexes: [j, j]});
            animations.push({cmd: 'resize', indexes: [k, arrayCopy[j]]});
            array[k++] = arrayCopy[j++];
        }
    };

    const _mergeSort = (array, startIdx, endIdx, arrayCopy, animations) => {
        if (startIdx === endIdx) return;
        const middleIdx = Math.floor((startIdx + endIdx) / 2);
        _mergeSort(arrayCopy, startIdx, middleIdx, array, animations);
        _mergeSort(arrayCopy, middleIdx + 1, endIdx, array, animations);
        _merge(array, startIdx, middleIdx, endIdx, arrayCopy, animations);
    };
    const arrayCopy = array.slice();
    _mergeSort(array, 0, array.length - 1, arrayCopy, animations);
    return animations;
}