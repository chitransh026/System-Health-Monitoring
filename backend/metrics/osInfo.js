import os from 'os';

export function hostname() {
    return os.hostname();
}

export function SystemInfo() {
    const os_name = os.type();
    const os_version = os.release();
    const os_arch = os.arch();
    const cpus = os.cpus();
    const cpu_model = cpus[0]?.model || 'Unknown';
    const cpu_cores = cpus.length;
    const total_ram = (os.totalmem() / (1024 ** 3)).toFixed(2); // in GB
    const hostname_value = os.hostname();
    
    return {
        os_name,
        os_version,
        os_arch,
        cpu_model,
        cpu_cores,
        total_ram,
        hostname: hostname_value
    };
}
