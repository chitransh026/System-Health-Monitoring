import si from 'systeminformation';

export async function getDiskUsage() {
    try {
        const disks = await si.fsSize();
        if (!disks || disks.length === 0) {
            return {
                total: 0,
                used: 0,
                usedPercent: 0
            };
        }
        
        const root = disks[0];
        const total = root.size / (1024 ** 3); // Convert to GB
        const used = root.used / (1024 ** 3); // Convert to GB
        const usedPercent = root.use || (used / total) * 100;
        
        return {
            total: parseFloat(total.toFixed(2)),
            used: parseFloat(used.toFixed(2)),
            usedPercent: parseFloat(usedPercent.toFixed(2))
        };
    } catch (error) {
        console.error('Error getting disk usage:', error);
        return {
            total: 0,
            used: 0,
            usedPercent: 0
        };
    }
}
