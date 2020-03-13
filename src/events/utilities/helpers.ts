export function isNumberOrString(property: any) {
  return (typeof property === 'number' || typeof property === 'string');
}

export function isNumber(property: any) {
  return (typeof property === 'number' && !isNaN(property));
}

/**
 * Converts speed from m/s to pace as of seconds per km
 * @param {number} number
 * @return {number}
 */
export function convertSpeedToPace(number: number): number {
  return number === 0 ? Infinity : (1000 / number);
}

/**
 * Converts m/s to seconds per 100m
 * @param number
 */
export function convertSpeedToSwimPace(number: number): number {
  return number === 0 ? Infinity : (100 / number);
}

export function convertSpeedToSpeedInKilometersPerHour(number: number): number {
  return number * 3.6;
}

export function convertSpeedToSpeedInMilesPerHour(number: number): number {
  return number * 2.237;
}

export function convertSpeedToSpeedInFeetPerSecond(number: number): number {
  return number * 3.28084;
}

export function convertSpeedToSpeedInMetersPerMinute(number: number): number {
  return number * 60;
}

export function convertSpeedToSpeedInFeetPerMinute(number: number): number {
  return number * 196.85;
}

export function convertSpeedToSpeedInFeetPerHour(number: number): number {
  return number * 11811.024;
}

export function convertSpeedToSpeedInMetersPerHour(number: number): number {
  return number * 3600;
}

export function convertPaceToPaceInMinutesPerMile(number: number): number {
  return number * 1.60934;
}

export function convertMetersToMiles(number: number): number {
  return  number === 0  ? 0 : number / 1609;
}

/**
 * Converts m/s to seconds per 100m
 * @param number
 */
export function convertSwimPaceToSwimPacePer100Yard(number: number): number {
  return number * 1.93613298
}

export function getSize(obj: any): string {
  let bytes = 0;

  function sizeOf(obj: any) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case 'number':
          bytes += 8;
          break;
        case 'string':
          bytes += obj.length * 2;
          break;
        case 'boolean':
          bytes += 4;
          break;
        case 'object':
          const objClass = Object.prototype.toString.call(obj).slice(8, -1);
          if (objClass === 'Object' || objClass === 'Array') {
            for (const key in obj) {
              if (!obj.hasOwnProperty(key)) {
                continue;
              }
              sizeOf(obj[key]);
            }
          } else {
            bytes += obj.toString().length * 2;
          }
          break;
      }
    }
    return bytes;
  }

  function formatByteSize(bytes: number): string {
    if (bytes < 1024) {
      return bytes + ' bytes';
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(3) + ' KiB';
    } else if (bytes < 1073741824) {
      return (bytes / 1048576).toFixed(3) + ' MiB';
    } else {
      return (bytes / 1073741824).toFixed(3) + ' GiB';
    }
  }

  return formatByteSize(sizeOf(obj));
}

/**
 * from https://stackoverflow.com/questions/48340403/fill-missing-numeric-values-in-an-array
 * Very badly written
 * @param array
 */
export function fillMissingValuesLinear(array: (number | null)[]): number[] {
  let i = 0, j, delta;
  while (i < array.length) {
    if (array[i] !== null) {
      i++;
      continue;
    }
    j = i;
    while (array[++j] === null) { }
    // @ts-ignore
    delta = (array[j] - array[i - 1]) / (j - i + 1);
    do {
      // @ts-ignore
      array[i] = delta + array[i - 1];
      i++;
    } while (i < j)
  }
  return <number[]>array;
}
