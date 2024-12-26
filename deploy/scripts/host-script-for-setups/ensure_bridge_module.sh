#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "Checking and loading bridge kernel module..."

# Load the bridge kernel module
if ! lsmod | grep -q br_netfilter; then
  echo "Loading br_netfilter module..."
  sudo modprobe br_netfilter
else
  echo "br_netfilter module is already loaded."
fi

# Ensure bridge-nf-call-iptables is enabled
echo "Enabling net.bridge.bridge-nf-call-iptables..."
sudo sysctl -w net.bridge.bridge-nf-call-iptables=1

# Ensure bridge-nf-call-ip6tables is enabled
echo "Enabling net.bridge.bridge-nf-call-ip6tables..."
sudo sysctl -w net.bridge.bridge-nf-call-ip6tables=1

# Persist the configuration
echo "Persisting configuration in /etc/sysctl.conf..."
sudo tee -a /etc/sysctl.conf > /dev/null <<EOF
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
EOF

# Reload sysctl settings
echo "Reloading sysctl settings..."
sudo sysctl -p

echo "Bridge kernel module and sysctl settings configured successfully."
