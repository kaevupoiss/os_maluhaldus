import _cloneDeep from "lodash/cloneDeep";
import _shuffle from "lodash/shuffle";

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export function randomFitFunction(inputArray) {
  const returnArray = [];
  //* [[[startX, endX (exclusive), length], ...], ...]
  const freeArrayIndexesCollection = [];

  for (let i = 0; i < inputArray.length; i++) {
    let freeArrayIndexes =
      i == 0 ? [[0, 50, 50]] : _cloneDeep(freeArrayIndexesCollection[i - 1]);

    // Kopeeri eelmine etapp
    let etappArray = i == 0 ? [] : _cloneDeep(returnArray[i - 1]);

    // Vähenda käimas olevate protsesside aega
    etappArray.forEach((el) => (el[3] -= 1));

    //---- ETAPI PUHASTUS LÕPETATUD PROTSESSIDEST ----//
    // Lisa lõpetatud protsesside poolt vabanenud ruum vabadesse lõikude massiivi
    etappArray.forEach((item) => {
      if (item[3] == 0) {
        freeArrayIndexes.push([item[1], item[2], item[2] - item[1]]);
      }
    });

    // Eemalda lõpetatud protsessid uuest etapist
    etappArray = etappArray.filter((item) => item[3] > 0);

    // Sorteeri vabade lõikude massiiv
    freeArrayIndexes.sort(function (a, b) {
      return a[0] - b[0];
    });

    // Ühilda kõrvuti olevad vabad lõigud üheks.
    if (freeArrayIndexes.length > 1) {
      let newFreeArrayIndexes = [_cloneDeep(freeArrayIndexes[0])];
      let newFreeArrayIndexesIndex = 0;
      for (let index = 1; index < freeArrayIndexes.length; index++) {
        const currentElement = newFreeArrayIndexes[newFreeArrayIndexesIndex];
        const nextElement = freeArrayIndexes[index];

        if (currentElement[1] == nextElement[0]) {
          currentElement[1] = nextElement[1];
          currentElement[2] += nextElement[2];
        } else {
          newFreeArrayIndexesIndex++;
          newFreeArrayIndexes.push(_cloneDeep(nextElement));
        }
      }

      freeArrayIndexes = newFreeArrayIndexes;
    }

    //---- UUTE PROTSESSIDE LISAMINE ETAPPI ----//
    const arrayItem = _cloneDeep(inputArray[i]);

    let tempArr = _cloneDeep(etappArray);
    const freeArrayIndexesLength = freeArrayIndexes.length;
    let shuffledFreeArrayIndexes = _shuffle(freeArrayIndexes);
    console.log(shuffledFreeArrayIndexes);
    for (let index = 0; index < freeArrayIndexesLength; index++) {
      let freeIndex = shuffledFreeArrayIndexes.shift();

      if (freeIndex[2] >= arrayItem[0]) {
        let newProcess = [
          alphabet[i],
          freeIndex[0],
          freeIndex[0] + arrayItem[0],
          arrayItem[1],
        ];

        tempArr.push(newProcess);
        freeIndex[0] += arrayItem[0];
        freeIndex[2] -= arrayItem[0];

        shuffledFreeArrayIndexes.push(freeIndex);

        break;
      }

      shuffledFreeArrayIndexes.push(freeIndex);

      if (index == freeArrayIndexes.length - 1) {
        tempArr = [[null, 0, 50, 1]];
      }
    }

    // Eemalda lõpetatud täis ruumid vabast mälust
    freeArrayIndexes = _cloneDeep(shuffledFreeArrayIndexes).filter(
      (item) => item[2] > 0
    );

    etappArray = _cloneDeep(tempArr);

    freeArrayIndexesCollection.push(_cloneDeep(freeArrayIndexes));

    returnArray.push(_cloneDeep(etappArray));

    if (etappArray.at(-1)[0] == null) {
      break;
    }
  }

  return returnArray;
}
