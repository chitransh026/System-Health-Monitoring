import os from 'os';

export async function getRAMPercentage() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const percentage = (usedMem / totalMem) * 100;
    return parseFloat(percentage.toFixed(2));
}
