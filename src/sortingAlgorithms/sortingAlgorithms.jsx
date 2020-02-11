function createAnimation(type, indexes) {
    return {
        cmd: type,
        indexes: indexes,
    }
}

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
            animations.push(createAnimation("highlight", [i, j]));
            if (arrayCopy[i] <= arrayCopy[j]) {
                animations.push(createAnimation('resize', [k, arrayCopy[i]]));
                array[k++] = arrayCopy[i++];
            } else {
                animations.push(createAnimation('resize', [k, arrayCopy[j]]));
                array[k++] = arrayCopy[j++];
            }
        }
        while (i <= middleIdx) {
            animations.push(createAnimation("highlight", [i, i]));
            animations.push(createAnimation("resize", [k, arrayCopy[i]]));
            array[k++] = arrayCopy[i++];
        }
        while (j <= endIdx) {
            animations.push(createAnimation("highlight", [j, j]));
            animations.push(createAnimation("resize", [k, arrayCopy[j]]));
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


export function getBubbleSortAnimations(array) {
    const animations = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[i + 1]) {
                animations.push(createAnimation("highlight", [i, i + 1]));
                let tmp = array[i];
                array[i] = array[i + 1];
                animations.push(createAnimation("resize", [i, array[i + 1]]));
                array[i + 1] = tmp;
                animations.push(createAnimation("resize", [i + 1, tmp]));
                swapped = true;
                animations.push(createAnimation("un-highlight", [i, i + 1]));
            }
        }
    } while (swapped);
    return animations;
}