function createAnimation(type, indexes) {
    return {
        cmd: type,
        indexes: indexes,
    }
}

function swap(items, i, j) {
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
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
                animations.push(createAnimation("un-highlight", [i, j]));
                array[k++] = arrayCopy[i++];
            } else {
                animations.push(createAnimation('resize', [k, arrayCopy[j]]));
                animations.push(createAnimation("un-highlight", [i, j]));
                array[k++] = arrayCopy[j++];
            }
        }
        const fillRemaining = (idxCounter, endIdx) => {
            while (idxCounter <= endIdx) {
                animations.push(createAnimation("highlight", [idxCounter, idxCounter]));
                animations.push(createAnimation("resize", [k, arrayCopy[idxCounter]]));
                animations.push(createAnimation("un-highlight", [idxCounter, idxCounter]));
                array[k++] = arrayCopy[idxCounter++];
            }
        };
        fillRemaining(i, middleIdx);
        fillRemaining(j, endIdx);
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

export function getInsertionSortAnimations(array) {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
        const key = array[i];
        let j = i - 1;
        while (j >= 0 && key < array[j]) {
            animations.push(createAnimation("highlight", [i, j]));
            array[j + 1] = array[j];
            animations.push(createAnimation("resize", [j + 1, array[j]]));
            animations.push(createAnimation("un-highlight", [i, j]));
            j--
        }
        animations.push(createAnimation("resize", [j + 1, key]));
        array[j + 1] = key
    }
    return animations
}


export function getQuickSortAnimations(array) {
    const animations = [];
    const partition = (items, left, right) => {
        const pivotIndex = Math.floor((right + left) / 2);
        const pivot = items[pivotIndex];
        animations.push(createAnimation("highlight", [pivotIndex]));
        let i = left,
            j = right;
        while (i <= j) {
            while (items[i] < pivot) {
                animations.push(createAnimation("highlight", [i]));
                animations.push(createAnimation("un-highlight", [i]));
                i++;
            }
            while (items[j] > pivot) {
                animations.push(createAnimation("highlight", [j]));
                animations.push(createAnimation("un-highlight", [j]));
                j--;
            }
            if (i <= j) {
                swap(array, i, j);
                animations.push(createAnimation("highlight", [i, j]));
                animations.push(createAnimation("resize", [i, items[i]]));
                animations.push(createAnimation("resize", [j, items[j]]));
                animations.push(createAnimation("un-highlight", [i, j]));
                i++;
                j--;
            }
        }
        animations.push(createAnimation("un-highlight", [pivotIndex]));
        return i;
    };

    const quickSort = (items, left, right) => {
        let index;
        if (items.length > 1) {
            index = partition(items, left, right);
            if (left < index - 1) {
                quickSort(items, left, index - 1);
            }
            if (index < right) {
                quickSort(items, index, right);
            }
        }
    };
    quickSort(array, 0, array.length-1);
    return animations
}

export function getHeapSortAnimations(array) {
    const animations = [];
    const heapify = (items, n, i) => {
        let largest = i,
            l = 2 * i + 1,
            r = 2 * i + 2;

        if (l < n && items[i] < items[l]) {
            animations.push(createAnimation("highlight", [i, l]));
            animations.push(createAnimation("un-highlight", [i, l]));
            largest = l
        }

        if (r < n && items[largest] < items[r]) {
            animations.push(createAnimation("highlight", [largest, r]));
            animations.push(createAnimation("un-highlight", [largest, r]));
            largest = r
        }
        if (largest !== i) {
            swap(items, i, largest);
            animations.push(createAnimation("highlight", [largest, i]));
            animations.push(createAnimation("resize", [i, items[i]]));
            animations.push(createAnimation("resize", [largest, items[largest]]));
            animations.push(createAnimation("un-highlight", [largest, i]));
            heapify(items, n, largest);
        }
    };

    const heapSort = (items) => {
        let n = items.length;
        for (let i = Math.floor(n / 2); i >= 0; i -= 1)      {
            heapify(items, n, i);
        }

        for (let i = items.length - 1; i > 0; i--) {
            swap(items, 0, i);
            animations.push(createAnimation("highlight", [i, 0]));
            animations.push(createAnimation("resize", [i, items[i]]));
            animations.push(createAnimation("resize", [0, items[0]]));
            animations.push(createAnimation("un-highlight", [i, 0]));
            n--;
            heapify(items, n,0);
        }
    };
    heapSort(array);
    return animations
}