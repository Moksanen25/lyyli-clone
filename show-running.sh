#!/bin/bash

# Script to show everything running on macOS
# Usage: ./show-running.sh or bash show-running.sh

echo "════════════════════════════════════════════════════════════════"
echo "           SYSTEM OVERVIEW - $(date)"
echo "════════════════════════════════════════════════════════════════"
echo ""

# System Information
echo "📊 SYSTEM INFORMATION"
echo "────────────────────────────────────────────────────────────────"
echo "Hostname: $(hostname)"
echo "OS Version: $(sw_vers -productName) $(sw_vers -productVersion)"
echo "Kernel: $(uname -r)"
echo "Uptime: $(uptime | awk -F'( |,)' '{print $4,$5,$6}')"
echo ""

# CPU Usage
echo "🔥 CPU USAGE"
echo "────────────────────────────────────────────────────────────────"
top -l 1 | grep "CPU usage" | awk '{print $3, $4, $5, $6, $7, $8, $9, $10}'
echo ""

# Memory Usage
echo "💾 MEMORY USAGE"
echo "────────────────────────────────────────────────────────────────"
vm_stat | perl -ne '/page size of (\d+)/ and $size=$1; /Pages\s+([^:]+)[^\d]+(\d+)/ and printf("%-16s % 16.2f Mi\n", "$1:", $2 * $size / 1048576);'
echo ""

# Disk Usage
echo "💿 DISK USAGE"
echo "────────────────────────────────────────────────────────────────"
df -h | grep -E '^/dev/' | awk '{printf "%-20s %6s used of %6s (%s full) - Mounted on %s\n", $1, $3, $2, $5, $9}'
echo ""

# Top 10 Processes by CPU
echo "⚡ TOP 10 PROCESSES BY CPU"
echo "────────────────────────────────────────────────────────────────"
ps aux | sort -nrk 3,3 | head -n 11 | awk 'NR==1 {printf "%-10s %6s %6s %8s %-20s\n", "USER", "CPU%", "MEM%", "PID", "COMMAND"} NR>1 {printf "%-10s %6.1f %6.1f %8s %-20s\n", $1, $3, $4, $2, $11}'
echo ""

# Top 10 Processes by Memory
echo "🧠 TOP 10 PROCESSES BY MEMORY"
echo "────────────────────────────────────────────────────────────────"
ps aux | sort -nrk 4,4 | head -n 11 | awk 'NR==1 {printf "%-10s %6s %6s %8s %-20s\n", "USER", "CPU%", "MEM%", "PID", "COMMAND"} NR>1 {printf "%-10s %6.1f %6.1f %8s %-20s\n", $1, $3, $4, $2, $11}'
echo ""

# All Running Processes Count
echo "📋 PROCESS STATISTICS"
echo "────────────────────────────────────────────────────────────────"
total_processes=$(ps aux | wc -l | xargs)
running_processes=$(ps aux | grep -c 'R')
sleeping_processes=$(ps aux | grep -c 'S')
echo "Total processes: $total_processes"
echo "Running: $running_processes"
echo "Sleeping: $sleeping_processes"
echo ""

# Network Connections
echo "🌐 ACTIVE NETWORK CONNECTIONS (Top 15)"
echo "────────────────────────────────────────────────────────────────"
lsof -i -n -P | head -n 16 | awk 'NR==1 {printf "%-15s %8s %6s %-10s %-20s\n", "COMMAND", "PID", "USER", "TYPE", "NAME"} NR>1 {printf "%-15s %8s %6s %-10s %-20s\n", $1, $2, $3, $5, $9}'
echo ""

# Listening Ports
echo "👂 LISTENING PORTS"
echo "────────────────────────────────────────────────────────────────"
lsof -iTCP -sTCP:LISTEN -n -P | awk 'NR==1 {printf "%-15s %8s %6s %-20s\n", "COMMAND", "PID", "USER", "PORT"} NR>1 {printf "%-15s %8s %6s %-20s\n", $1, $2, $3, $9}' | head -n 21
echo ""

# Applications Running
echo "📱 RUNNING APPLICATIONS"
echo "────────────────────────────────────────────────────────────────"
osascript -e 'tell application "System Events" to get name of (processes where background only is false)' | tr ',' '\n' | sort | sed 's/^[[:space:]]*/  • /'
echo ""

# Background Services (launchd)
echo "⚙️  LAUNCHD SERVICES (Sample - Top 20)"
echo "────────────────────────────────────────────────────────────────"
launchctl list | head -n 21 | awk 'NR==1 {printf "%-8s %-10s %s\n", "PID", "STATUS", "LABEL"} NR>1 {printf "%-8s %-10s %s\n", $1, $2, $3}'
echo ""

# Docker Containers (if Docker is installed)
if command -v docker &> /dev/null; then
    echo "🐳 DOCKER CONTAINERS"
    echo "────────────────────────────────────────────────────────────────"
    if docker ps 2>/dev/null | grep -q .; then
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    else
        echo "  No running containers"
    fi
    echo ""
fi

# Node.js Processes
if pgrep -f node > /dev/null; then
    echo "📗 NODE.JS PROCESSES"
    echo "────────────────────────────────────────────────────────────────"
    ps aux | grep -i node | grep -v grep | awk '{printf "PID: %-8s CPU: %5s%% MEM: %5s%% CMD: %s\n", $2, $3, $4, substr($0, index($0,$11))}'
    echo ""
fi

# Python Processes
if pgrep -f python > /dev/null; then
    echo "🐍 PYTHON PROCESSES"
    echo "────────────────────────────────────────────────────────────────"
    ps aux | grep -i python | grep -v grep | awk '{printf "PID: %-8s CPU: %5s%% MEM: %5s%% CMD: %s\n", $2, $3, $4, substr($0, index($0,$11))}'
    echo ""
fi

# Network Interface Status
echo "🔌 NETWORK INTERFACES"
echo "────────────────────────────────────────────────────────────────"
ifconfig | grep -E '^[a-z]|inet ' | awk '/^[a-z]/ {iface=$1} /inet / {print iface, $2}'
echo ""

# Battery Status (for MacBooks)
echo "🔋 BATTERY STATUS"
echo "────────────────────────────────────────────────────────────────"
pmset -g batt | grep -o '[0-9]*%.*' || echo "Not available"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "                    END OF REPORT"
echo "════════════════════════════════════════════════════════════════"


