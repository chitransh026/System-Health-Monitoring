import os from 'os';

/**
 * Get RAM usage percentage
 * @returns {Promise<number>} RAM usage percentage (0-100)
 */
export async function getRAMPercentage() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const percentage = (usedMem / totalMem) * 100;
    return parseFloat(percentage.toFixed(2));
}

/**
 * Get detailed memory information
 * @returns {Promise<Object>} Detailed memory metrics
 */
export async function getMemoryDetails() {
    try {
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        
        return {
            totalMemory: parseFloat((totalMem / (1024 ** 3)).toFixed(2)), // in GB
            usedMemory: parseFloat((usedMem / (1024 ** 3)).toFixed(2)),   // in GB
            freeMemory: parseFloat((freeMem / (1024 ** 3)).toFixed(2)),   // in GB
            usagePercentage: parseFloat(((usedMem / totalMem) * 100).toFixed(2)),
            totalMemoryMB: parseFloat((totalMem / (1024 ** 2)).toFixed(2)), // in MB
            usedMemoryMB: parseFloat((usedMem / (1024 ** 2)).toFixed(2)),   // in MB
            freeMemoryMB: parseFloat((freeMem / (1024 ** 2)).toFixed(2))    // in MB
        };
    } catch (error) {
        console.error('Error getting memory details:', error);
        return { error: 'Failed to retrieve memory information' };
    }
}
