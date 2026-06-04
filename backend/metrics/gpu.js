import si from 'systeminformation';

/**
 * Get GPU information from the system
 * @returns {Promise<Object|string>} GPU info object or 'No GPU Found' string
 */
export async function getGPUInfo() {
    try {
        const gpus = await si.graphics();
        
        if (!gpus.controllers || gpus.controllers.length === 0) {
            console.log("No GPU detected");
            return { error: 'No GPU Found', gpuCount: 0 };
        }

        // Get primary GPU (first controller)
        const gpu = gpus.controllers[0];
        
        return {
            model: gpu.model || 'Unknown',
            vendor: gpu.vendor || 'Unknown',
            vram: gpu.vram || 0,
            driverVersion: gpu.driverVersion || 'Unknown',
            gpuUsage: gpu.utilizationGpu || 0,
            gpuCount: gpus.controllers.length
        };
    } catch (error) {
        console.error('Error getting GPU info:', error.message);
        return {
            error: 'Failed to retrieve GPU information',
            details: error.message
        };
    }
}

/**
 * Get GPU memory usage
 * @returns {Promise<Object>} GPU memory information
 */
export async function getGPUMemory() {
    try {
        const gpus = await si.graphics();
        
        if (!gpus.controllers || gpus.controllers.length === 0) {
            return { error: 'No GPU Found' };
        }

        const gpu = gpus.controllers[0];
        return {
            totalMemory: gpu.vram || 0,
            usedMemory: gpu.memoryUsed || 0,
            freeMemory: (gpu.vram || 0) - (gpu.memoryUsed || 0)
        };
    } catch (error) {
        console.error('Error getting GPU memory:', error.message);
        return { error: 'Failed to retrieve GPU memory information' };
    }
}
