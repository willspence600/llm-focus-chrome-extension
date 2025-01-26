let isBreak = true;

export interface GlobalArrayEntry {
    url: string;
    flag: boolean;
}

// Global variables
let globalArray: GlobalArrayEntry[] = [];

export function setBreakState(state: boolean) {
  isBreak = state;
}

export function getBreakState(): boolean {
  return isBreak;
}

export function addToGlobalArray(entry: GlobalArrayEntry) {
    globalArray.push(entry);
}

export function removeFromGlobalArray(url: string) {
    globalArray = globalArray.filter(item => item.url !== url);
}

export function getGlobalArray(): GlobalArrayEntry[] {
    return [...globalArray]; // Return a copy to prevent direct modification
}

export function getFlagValue(url: string): boolean{
    return globalArray.find(item => item.url === url)?.flag || false;
}
export function updateGlobalArrayEntry(url: string, updatedEntry: Partial<GlobalArrayEntry>) {
    globalArray = globalArray.map(item =>
        item.url === url ? { ...item, ...updatedEntry } : item
    );
}

export function setGlobalArray(newArray: GlobalArrayEntry[]) {
    globalArray = [...newArray];
}
