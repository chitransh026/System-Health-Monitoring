import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const [metrics, setMetrics] = useState({ 
    cpu: 0, 
    cpu_use: { idle: 0, total: 0 },
    ram: 0, 
    disk: { total: 0, used: 0, usedPercent: 0 },
    network: { downloadKBps: 0, uploadKBps: 0 },
    gpu: 'No GPU Found',
    timestamp: Date.now()
  });
  const [systemInfo, setSystemInfo] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socket.on('system_info', (sysinfo, hostname) => {
      setSystemInfo({ ...sysinfo, hostname });
    });

    socket.on('metrics', (data) => {
      setMetrics(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatGB = (gb) => {
    return gb.toFixed(2) + ' GB';
  };

  return (
    <div className="App">
      <div className="app-container">
        {/* Header Section */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="main-title">
              <span className="title-icon"></span>
              System Health Monitor
            </h1>
            <div className="status-badge">
              <div className={`status-indicator ${connected ? 'connected' : 'disconnected'}`}></div>
              <span>{connected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
          
          {systemInfo && (
            <div className="system-info-card">
              <div className="info-row">
                <span className="info-label">Hostname:</span>
                <span className="info-value">{systemInfo.hostname}</span>
              </div>
              <div className="info-row">
                <span className="info-label">OS:</span>
                <span className="info-value">{systemInfo.os_name} {systemInfo.os_version}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Architecture:</span>
                <span className="info-value">{systemInfo.os_arch}</span>
              </div>
              <div className="info-row">
                <span className="info-label">CPU:</span>
                <span className="info-value">{systemInfo.cpu_model}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Cores:</span>
                <span className="info-value">{systemInfo.cpu_cores}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Total RAM:</span>
                <span className="info-value">{systemInfo.total_ram} GB</span>
              </div>
            </div>
          )}
        </header>

        {/* Main Metrics Grid */}
        <div className="metrics-grid">
          {/* CPU Card */}
          <div className="metric-card cpu-card">
            <div className="metric-header">
              <div className="metric-icon"></div>
              <h2>CPU Usage</h2>
            </div>
            <div className="metric-main-value">{metrics.cpu?.toFixed(1) || 0}%</div>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill cpu-fill"
                  style={{ width: `${Math.min(metrics.cpu || 0, 100)}%` }}
                ></div>
              </div>
            </div>
            {metrics.cpu_use && (
              <div className="metric-details">
                <div className="detail-item">
                  <span>Idle:</span>
                  <span>{(metrics.cpu_use.idle / 1000000000).toFixed(2)}s</span>
                </div>
                <div className="detail-item">
                  <span>Total:</span>
                  <span>{(metrics.cpu_use.total / 1000000000).toFixed(2)}s</span>
                </div>
              </div>
            )}
          </div>

          {/* RAM Card */}
          <div className="metric-card ram-card">
            <div className="metric-header">
              <div className="metric-icon"></div>
              <h2>Memory Usage</h2>
            </div>
            <div className="metric-main-value">{metrics.ram?.toFixed(1) || 0}%</div>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill ram-fill"
                  style={{ width: `${Math.min(metrics.ram || 0, 100)}%` }}
                ></div>
              </div>
            </div>
            {systemInfo && (
              <div className="metric-details">
                <div className="detail-item">
                  <span>Total:</span>
                  <span>{systemInfo.total_ram} GB</span>
                </div>
                <div className="detail-item">
                  <span>Used:</span>
                  <span>{(systemInfo.total_ram * (metrics.ram || 0) / 100).toFixed(2)} GB</span>
                </div>
              </div>
            )}
          </div>

          {/* Disk Card */}
          <div className="metric-card disk-card">
            <div className="metric-header">
              <div className="metric-icon"></div>
              <h2>Disk Usage</h2>
            </div>
            {metrics.disk && (
              <>
                <div className="metric-main-value">{metrics.disk.usedPercent?.toFixed(1) || 0}%</div>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill disk-fill"
                      style={{ width: `${Math.min(metrics.disk.usedPercent || 0, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="metric-details">
                  <div className="detail-item">
                    <span>Total:</span>
                    <span>{formatGB(metrics.disk.total || 0)}</span>
                  </div>
                  <div className="detail-item">
                    <span>Used:</span>
                    <span>{formatGB(metrics.disk.used || 0)}</span>
                  </div>
                  <div className="detail-item">
                    <span>Free:</span>
                    <span>{formatGB((metrics.disk.total || 0) - (metrics.disk.used || 0))}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Network Card */}
          <div className="metric-card network-card">
            <div className="metric-header">
              <div className="metric-icon"></div>
              <h2>Network Activity</h2>
            </div>
            {metrics.network && (
              <>
                <div className="network-stats">
                  <div className="network-stat">
                    <div className="network-label">⬇ Download</div>
                    <div className="network-value">{parseFloat(metrics.network.downloadKBps || 0).toFixed(2)} KB/s</div>
                  </div>
                  <div className="network-stat">
                    <div className="network-label">⬆ Upload</div>
                    <div className="network-value">{parseFloat(metrics.network.uploadKBps || 0).toFixed(2)} KB/s</div>
                  </div>
                </div>
                <div className="metric-details">
                  <div className="detail-item">
                    <span>Total Speed:</span>
                    <span>{(parseFloat(metrics.network.downloadKBps || 0) + parseFloat(metrics.network.uploadKBps || 0)).toFixed(2)} KB/s</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* GPU Card */}
          <div className="metric-card gpu-card">
            <div className="metric-header">
              <div className="metric-icon"></div>
              <h2>GPU Information</h2>
            </div>
            {metrics.gpu && typeof metrics.gpu === 'object' ? (
              <div className="gpu-info">
                <div className="gpu-item">
                  <span className="gpu-label">Model:</span>
                  <span className="gpu-value">{metrics.gpu.Mode || 'N/A'}</span>
                </div>
                <div className="gpu-item">
                  <span className="gpu-label">Vendor:</span>
                  <span className="gpu-value">{metrics.gpu.Vendor || 'N/A'}</span>
                </div>
                {metrics.gpu.VRAM && (
                  <div className="gpu-item">
                    <span className="gpu-label">VRAM:</span>
                    <span className="gpu-value">{metrics.gpu.VRAM} MB</span>
                  </div>
                )}
                {metrics.gpu.driver_info && (
                  <div className="gpu-item">
                    <span className="gpu-label">Driver:</span>
                    <span className="gpu-value">{metrics.gpu.driver_info}</span>
                    
                  </div>
                )}
              </div>
            ) : (
              <div className="gpu-no-info">
                <div className="no-gpu-icon"></div>
                <p>{metrics.gpu || 'No GPU detected'}</p>
              </div>
            )}
          </div>

          {/* Timestamp Card */}
          <div className="metric-card timestamp-card">
            <div className="metric-header">
              <div className="metric-icon"></div>
              <h2>Last Update</h2>
            </div>
            <div className="timestamp-value">
              {metrics.timestamp ? new Date(metrics.timestamp).toLocaleTimeString() : '--:--:--'}
            </div>
            <div className="timestamp-date">
              {metrics.timestamp ? new Date(metrics.timestamp).toLocaleDateString() : '--'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
