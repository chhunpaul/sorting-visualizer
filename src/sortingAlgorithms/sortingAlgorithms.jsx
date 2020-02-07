export default class Algorithms {

    static mergeSort = (array) => {
        const createTempArray = (size) => {
            array = [];
            for (let i = 0; i < size; i++) {
                array.push(0)
            }
            return array
        };
        const fillRemaining = (array, temp, i, k, size) => {
            while (i < size) {
                array[k] = temp[i];
                i++;
                k++;
            }
        };
        const merge = (array, startIndex, middleIndex, lastIndex) => {
            const n1 = middleIndex - startIndex + 1;
            const n2 = lastIndex - middleIndex;

            // Create temporary arrays then fill the temporary arrays with data
            const tempLeftArray = createTempArray(n1);
            for (let i=0; i < n1; i++) {
                tempLeftArray[i] = array[startIndex + i]
            }

            const tempRightArray = createTempArray(n2);
            for (let j=0; j < n2; j++) {
                tempRightArray[j] = array[middleIndex + 1 + j]
            }
            let i=0, j=0, k=startIndex;
            while (i < n1 && j < n2) {
                if (tempLeftArray[i] <= tempRightArray[j]) {
                    array[k] = tempLeftArray[i];
                    i++
                } else {
                    array[k] = tempRightArray[j];
                    j++
                }
                k++
            }

            fillRemaining(array, tempLeftArray, i, k, n1);
            fillRemaining(array, tempRightArray, j, k, n2);
        };

        const _mergeSort = (array, startIndex, lastIndex) => {
            if (startIndex < lastIndex) {
                const midIndex = Math.floor((startIndex + (lastIndex - 1)) / 2);
                _mergeSort(array, startIndex, midIndex);
                _mergeSort(array, midIndex + 1, lastIndex);
                merge(array, startIndex, midIndex, lastIndex)
            }
        };
        _mergeSort(array, 0, array.length - 1);
    }
}