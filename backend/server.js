import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { calculateCPUPercent, getCPUUsage } from './metrics/cpu.js';
import { getRAMPercentage } from './metrics/memory.js';
import { getDiskUsage } from './metrics/disk.js';
import { getNetworkUsage } from './metrics/network.js';
import { SystemInfo, hostname } from './metrics/osInfo.js';
import { getGPUInfo } from './metrics/gpu.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = 5000;

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send system info on connection
  try {
    const sysinfo = SystemInfo();
    const hostnameValue = hostname();
    socket.emit('system_info', sysinfo, hostnameValue);
  } catch (error) {
    console.error('Error sending system info:', error);
  }
  
  // Set up interval to send metrics every 2 seconds
  const interval = setInterval(async () => {
    try {
      const data = {
        cpu: await calculateCPUPercent(),
        cpu_use: await getCPUUsage(),
        ram: await getRAMPercentage(),
        disk: await getDiskUsage(),
        network: await getNetworkUsage(),
        gpu: await getGPUInfo(),
        timestamp: Date.now()
      };
      
      socket.emit('metrics', data);
    } catch (error) {
      console.error('Error sending metrics:', error);
      // Don't disconnect on error, just log it
    }
  }, 2000); // Every 2 seconds
  
  // Clean up interval when client disconnects
  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Client disconnected:', socket.id);
  });

  // Handle connection errors
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
