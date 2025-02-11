export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

// See: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#JavaScript_Implementation
export function shuffleArray(array: Array<any>): void {
    for (let i: number = array.length - 1; i >= 1; i--) {
        const j: any = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}