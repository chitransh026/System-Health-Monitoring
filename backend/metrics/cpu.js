import os from 'os';

let lastCPU = null;

export async function getCPUUsage() {
    const cpus = os.cpus();
    let idle = 0;
    let total = 0;
    
    cpus.forEach(cpu => {
        for (let type in cpu.times) {
            total += cpu.times[type]; // Sum all time types
        }
        idle += cpu.times.idle; // Sum idle time  
    });
    
    return { idle, total };
}

export async function calculateCPUPercent() {
    const current = await getCPUUsage();
    
    // Initialize lastCPU on first call
    if (!lastCPU) {
        lastCPU = current;
        return 0; // Return 0% on first calculation
    }
    
    const idleDiff = current.idle - lastCPU.idle;
    const totalDiff = current.total - lastCPU.total;
    
    if (totalDiff === 0) {
        return 0;
    }
    
    lastCPU = current;
    const cpuPercent = (1 - idleDiff / totalDiff) * 100;
    
    return Math.max(0, Math.min(100, cpuPercent)); // Clamp between 0 and 100
}
