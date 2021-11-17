const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

// const firstFitFunction = (inputArray) => {
//   const returnArray = [];

//   //* [[startX, endX (exclusive), length], ...]
//   let freeArrayIndexes = [[0, 50, 50]];

//   for (let i = 0; i < inputArray.length; i++) {
//     // Kopeeri eelmine etapp
//     let etappArray = i == 0 ? [] : [...returnArray[i - 1]];

//     // Vähenda käimas olevate protsesside aega
//     let tempArray = [];
//     for (let index = 0; index < etappArray.length; index++) {
//       let tempTime = [...etappArray[index]];
//       tempTime[3] -= 1;
//       tempArray.push(tempTime);
//     }

//     // etappArray = tempArray;

//     //---- ETAPI PUHASTUS LÕPETATUD PROTSESSIDEST ----//
//     // Lisa lõpetatud protsesside poolt vabanenud ruum vabadesse lõikude massiivi
//     etappArray.forEach((item) => {
//       if (item[3] == 0)
//         freeArrayIndexes.push([item[1], item[2], item[2] - item[1]]);
//     });

//     // Sorteeri vabade lõikude massiiv
//     freeArrayIndexes.sort(function (a, b) {
//       return a[0], b[0];
//     });

//     // Ühilda kõrvuti olevad vabad lõigud üheks.
//     for (let index = 0; index < freeArrayIndexes.length - 1; index++) {
//       let tempArray = [];
//       const currentElement = freeArrayIndexes[index];
//       const nextElement = freeArrayIndexes[index + 1];
//       if (currentElement[1] == nextElement[0]) {
//         tempArray.push([
//           currentElement[0],
//           nextElement[1],
//           currentElement[2] + nextElement[2],
//         ]);
//       } else {
//         tempArray.push(currentElement);
//         if (index == freeArrayIndexes.length - 2) {
//           tempArray.push(nextElement);
//         }
//       }

//       freeArrayIndexes = tempArray;
//     }

//     // Eemalda lõpetatud protsessid uuest etapist
//     etappArray = etappArray.filter((item) => item[3] > 0);

//     //---- UUTE PROTSESSIDE LISAMINE ETAPPI ----//
//     const arrayItem = [...inputArray[i]];

//     let tempArr = [...etappArray];

//     for (let index = 0; index < freeArrayIndexes.length; index++) {
//       let element = [...freeArrayIndexes[index]];

//       if (element[2] >= arrayItem[0]) {
//         let newProcess = [
//           alphabet[i],
//           element[0],
//           element[0] + arrayItem[0],
//           arrayItem[1],
//         ];
//         tempArr.push(newProcess);
//         console.log(tempArr);
//         freeArrayIndexes[index][0] += arrayItem[0];
//         freeArrayIndexes[index][2] -= arrayItem[0];
//         break;
//       }

//       if (index == freeArrayIndexes.length - 1) {
//         etappArray.push([null, 0, 50, 1]);
//       }
//     }

//     etappArray = [...tempArr];

//     returnArray.push([...etappArray]);

//     if (etappArray.at(-1)[0] == null) {
//       break;
//     }
//   }

//   return returnArray;
// };

const firstFitFunction = (inputArray) => {
  const returnArray = [];

  //* [[startX, endX (exclusive), length], ...]
  let freeArrayIndexes = [[0, 50, 50]];

  for (let i = 0; i < inputArray.length; i++) {
    // Kopeeri eelmine etapp
    let etappArray = i == 0 ? [] : [...returnArray[i - 1]];

    // Vähenda käimas olevate protsesside aega
    let tempArray = [];
    for (let index = 0; index < etappArray.length; index++) {
      let tempTime = [...etappArray[index]];
      tempTime[3] -= 1;
      tempArray.push(tempTime);
    }

    etappArray = tempArray;

    //---- ETAPI PUHASTUS LÕPETATUD PROTSESSIDEST ----//
    // Lisa lõpetatud protsesside poolt vabanenud ruum vabadesse lõikude massiivi
    etappArray.forEach((item) => {
      if (item[3] == 0)
        freeArrayIndexes.push([item[1], item[2], item[2] - item[1]]);
    });

    // Sorteeri vabade lõikude massiiv
    freeArrayIndexes.sort(function (a, b) {
      return a[0], b[0];
    });

    // Ühilda kõrvuti olevad vabad lõigud üheks.
    for (let index = 0; index < freeArrayIndexes.length - 1; index++) {
      let tempArray = [];
      const currentElement = freeArrayIndexes[index];
      const nextElement = freeArrayIndexes[index + 1];
      if (currentElement[1] == nextElement[0]) {
        tempArray.push([
          currentElement[0],
          nextElement[1],
          currentElement[2] + nextElement[2],
        ]);
      } else {
        tempArray.push(currentElement);
        if (index == freeArrayIndexes.length - 2) {
          tempArray.push(nextElement);
        }
      }

      freeArrayIndexes = tempArray;
    }

    // Eemalda lõpetatud protsessid uuest etapist
    etappArray = etappArray.filter((item) => item[3] > 0);

    //---- UUTE PROTSESSIDE LISAMINE ETAPPI ----//
    const arrayItem = [...inputArray[i]];
    console.log("-------");
    console.log(arrayItem);
    console.log(freeArrayIndexes);
    let tempArr = [...etappArray];

    for (let index = 0; index < freeArrayIndexes.length; index++) {
      let freeIndex = [...freeArrayIndexes[index]];

      if (freeIndex[2] >= arrayItem[0]) {
        let newProcess = [
          alphabet[i],
          freeIndex[0],
          freeIndex[0] + arrayItem[0],
          arrayItem[1],
        ];
        tempArr.push(newProcess);
        freeArrayIndexes[index][0] += arrayItem[0];
        freeArrayIndexes[index][2] -= arrayItem[0];

        break;
      }

      if (index == freeArrayIndexes.length - 1) {
        etappArray.push([null, 0, 50, 1]);
      }
    }

    // Eemalda lõpetatud täis ruumid vabast mälust
    freeArrayIndexes = freeArrayIndexes.filter((item) => item[2] > 0);

    etappArray = [...tempArr];

    console.log(etappArray);

    returnArray.push([...etappArray]);

    if (etappArray.at(-1)[0] == null) {
      break;
    }
  }

  return returnArray;
};

export const firstFitFunctionWrapper = (inputArray) => {
  return {
    result: firstFitFunction(inputArray),
  };
};
