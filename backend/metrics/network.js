import si from 'systeminformation';

let lastByte = { rx: 0, tx: 0 };
let lastTime = Date.now();

export async function getNetworkUsage() {
  try {
    const stats = await si.networkStats();
    
    // Get total bytes from all interfaces
    let rx = 0;
    let tx = 0;
    
    if (stats && stats.length > 0) {
      stats.forEach(stat => {
        rx += stat.rx_bytes || 0;
        tx += stat.tx_bytes || 0;
      });
    }

    const now = Date.now();
    const timeDiff = (now - lastTime) / 1000;

    // Avoid division by zero on first call
    if (timeDiff === 0) {
      lastByte = { rx, tx };
      lastTime = now;
      return {
        downloadKBps: '0.00',
        uploadKBps: '0.00'
      };
    }

    const downloadKBps = Math.max(0, ((rx - lastByte.rx) / 1024 / timeDiff));
    const uploadKBps = Math.max(0, ((tx - lastByte.tx) / 1024 / timeDiff));

    lastByte = { rx, tx };
    lastTime = now;

    return {
      downloadKBps: downloadKBps.toFixed(2),
      uploadKBps: uploadKBps.toFixed(2)
    };
  } catch (error) {
    console.error('Error getting network usage:', error);
    return {
      downloadKBps: '0.00',
      uploadKBps: '0.00'
    };
  }
}
