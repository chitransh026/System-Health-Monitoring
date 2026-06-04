# 🖥️ System Health Monitoring

A comprehensive Node.js application for real-time monitoring of system health metrics including CPU, RAM, Disk, Network, GPU, and OS information.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Metrics Details](#metrics-details)
- [Contributing](#contributing)
- [License](#license)

## 📌 Overview

System Health Monitoring is a full-stack application that provides real-time insights into system performance metrics. The application consists of a Node.js backend that collects system data and serves it via REST APIs, along with a frontend for visualizing the metrics.

## ✨ Features

- **CPU Monitoring**: Real-time CPU usage percentage
- **Memory Monitoring**: RAM usage tracking and percentage calculation
- **Disk Monitoring**: Disk space usage and available storage
- **Network Monitoring**: Real-time download/upload speed metrics
- **GPU Monitoring**: GPU information and driver details
- **System Information**: OS details, CPU model, cores, and hostname
- **Real-time Updates**: Live metric streaming via WebSockets
- **Responsive UI**: Modern, responsive frontend for data visualization

## 🛠️ Tech Stack

**Backend:**
- Node.js (JavaScript runtime)
- Express.js (Web framework)
- systeminformation (System metrics library)
- Socket.io (Real-time communication)

**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)

## 📂 Project Structure

```
System-Health-Monitoring/
├── backend/
│   ├── metrics/
│   │   ├── cpu.js          # CPU usage calculations
│   │   ├── memory.js       # Memory usage metrics
│   │   ├── disk.js         # Disk space information
│   │   ├── network.js      # Network statistics
│   │   ├── gpu.js          # GPU information
│   │   └── osInfo.js       # Operating system details
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
# or
node server.js
```

The backend server will start on `http://localhost:3000` (or the specified port).

### Frontend Setup

The frontend files are typically served from the backend. If running separately, open `frontend/index.html` in your browser.

## 📊 Usage

Once the server is running, the frontend will connect to the backend and display:
- Real-time CPU usage percentage
- RAM usage in GB and percentage
- Disk usage information
- Network speed (download/upload)
- GPU information (if available)
- System OS and hardware details

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cpu` | GET | Get current CPU usage percentage |
| `/api/memory` | GET | Get current RAM usage |
| `/api/disk` | GET | Get disk usage information |
| `/api/network` | GET | Get network statistics |
| `/api/gpu` | GET | Get GPU information |
| `/api/system` | GET | Get OS and system information |
| `/api/all` | GET | Get all metrics at once |

## 📈 Metrics Details

### CPU Usage
- Returns CPU usage percentage (0-100%)
- Calculated based on CPU idle time vs total time
- Updates on each request with cumulative calculations

### Memory (RAM)
- Total memory in GB
- Used memory in GB
- Usage percentage
- Free memory in GB

### Disk Usage
- Total disk space in GB
- Used disk space in GB
- Usage percentage
- Free disk space

### Network
- Download speed in KBps
- Upload speed in KBps
- Real-time calculations based on byte transfers

### GPU Information
- GPU model name
- GPU vendor
- VRAM (Video RAM) in MB
- Driver version
- GPU utilization percentage (if available)

### System Information
- Operating System name and version
- System architecture (x64, arm64, etc.)
- CPU model
- Number of CPU cores
- Total RAM
- Hostname

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Notes

- GPU information may not be available on all systems
- Network speeds are calculated based on system interface statistics
- CPU usage is calculated from the previous call to current call
- All numeric values are rounded to 2 decimal places for consistency

## 📄 License

This project is currently unlicensed. You are free to use it for educational and personal purposes.

## 🙋 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Happy Monitoring! 🎉**
