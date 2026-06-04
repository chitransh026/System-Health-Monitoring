import os from 'os';

/**
 * Get system hostname
 * @returns {string} Hostname of the system
 */
export function hostname() {
    return os.hostname();
}

/**
 * Get comprehensive system information
 * @returns {Object} Detailed system information
 */
export function SystemInfo() {
    try {
        const os_name = os.type();
        const os_version = os.release();
        const os_arch = os.arch();
        const cpus = os.cpus();
        const cpu_model = cpus[0]?.model || 'Unknown';
        const cpu_cores = cpus.length;
        const total_ram = (os.totalmem() / (1024 ** 3)).toFixed(2); // in GB
        const free_ram = (os.freemem() / (1024 ** 3)).toFixed(2);   // in GB
        const hostname_value = os.hostname();
        const uptime = parseFloat((os.uptime() / 3600).toFixed(2)); // in hours
        const platform = process.platform;
        
        return {
            hostname: hostname_value,
            osName: os_name,
            osVersion: os_version,
            osArch: os_arch,
            platform: platform,
            cpuModel: cpu_model,
            cpuCores: cpu_cores,
            totalRam: parseFloat(total_ram),
            freeRam: parseFloat(free_ram),
            systemUptime: uptime, // in hours
            nodeVersion: process.version
        };
    } catch (error) {
        console.error('Error getting system info:', error);
        return { error: 'Failed to retrieve system information' };
    }
}

/**
 * Get CPU detailed information
 * @returns {Object} CPU specifications
 */
export function getCPUInfo() {
    try {
        const cpus = os.cpus();
        
        return {
            model: cpus[0]?.model || 'Unknown',
            cores: cpus.length,
            speed: cpus[0]?.speed || 0, // in MHz
            cpuList: cpus.map(cpu => ({
                model: cpu.model,
                speed: cpu.speed
            }))
        };
    } catch (error) {
        console.error('Error getting CPU info:', error);
        return { error: 'Failed to retrieve CPU information' };
    }
}
