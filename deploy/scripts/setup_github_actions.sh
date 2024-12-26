#!/bin/bash

#########################################################
#  setup_github_actions.sh
#
#  This script downloads and configures a GitHub Actions
#  runner for a chosen repository (frontend, backend, or
#  duckdns deployment).
#
#  Key FIX: Handling both interactive and non-interactive
#  scenarios for token input.
#########################################################

# Function to check if a runner is set up
check_runner_setup() {
    if [ -f "$1/.runner" ]; then
        return 0  # Runner is set up
    else
        return 1  # Runner is not set up
    fi
}

# Directories for frontend, backend, and duckdns runners
FRONTEND_DIR="$HOME/action-runners/frontend"
BACKEND_DIR="$HOME/action-runners/backend"
DUCKDNS_DIR="$HOME/action-runners/duckdns"

# Runner version
RUNNER_VERSION="2.319.1"
RUNNER_PKG="actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"
RUNNER_URL="https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/${RUNNER_PKG}"

# Prompt user to choose repository
echo "Which repository do you want to set up?"
echo "1) Frontend (media-fe)"
echo "2) Backend (media-be)"
echo "3) DNS (duckdns)"
read -p "Enter your choice (1, 2, or 3): " choice

case $choice in
    1)
        REPO_DIR="$FRONTEND_DIR"
        REPO_NAME="media-fe"
        ;;
    2)
        REPO_DIR="$BACKEND_DIR"
        REPO_NAME="media-be"
        ;;
    3)
        REPO_DIR="$DUCKDNS_DIR"
        REPO_NAME="duckdns-deployment"
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

# Create directory if it doesn't exist
mkdir -p "$REPO_DIR"
cd "$REPO_DIR" || exit 1

# Download the runner package if not already downloaded
if [ ! -f "$RUNNER_PKG" ]; then
    echo "Downloading GitHub Actions Runner..."
    curl -o "$RUNNER_PKG" -L "$RUNNER_URL"
    # Optionally, validate the hash here if desired:
    # echo "<SHA256_HASH>  $RUNNER_PKG" | shasum -a 256 -c
fi

# Extract the runner package
echo "Extracting the runner package..."
tar xzf "$RUNNER_PKG"

#########################################################
#  FIX: Handle token input in both interactive and
#       non-interactive modes.
#########################################################

# Check if we're running in an interactive TTY
if [ -t 0 ]; then
    # Interactive: prompt user for the token, hide input
    echo "Please enter the registration token for the repository '$REPO_NAME':"
    read -s -p "Token: " TOKEN
    echo
else
    # Non-interactive: look for TOKEN in environment
    if [ -z "$TOKEN" ]; then
        echo "Error: No TOKEN environment variable provided, and script not in an interactive shell."
        exit 1
    fi
    echo "Using TOKEN from environment (non-interactive)."
fi

# If TOKEN is still empty, abort
if [ -z "$TOKEN" ]; then
    echo "Error: Token not provided."
    exit 1
fi

# Configure the runner
echo "Configuring the GitHub Actions Runner for '$REPO_NAME'..."

./config.sh --unattended \
  --url "https://github.com/devshittu/$REPO_NAME" \
  --token "$TOKEN" \
  --name "$(hostname)-$REPO_NAME-runner" \
  --work "_work" \
  --labels "self-hosted,Linux,X64" \
  --replace

if [ $? -ne 0 ]; then
    echo "Runner configuration failed."
    exit 1
else
    echo "Runner configured successfully for '$REPO_NAME'."
fi

# Ask if the user wants to run the runner immediately (interactive only)
if [ -t 0 ]; then
    read -p "Do you want to run the runner now? (y/n): " run_now
    if [[ "$run_now" =~ ^[Yy]$ ]]; then
        ./run.sh &
        echo "Runner is running in the background."
    else
        echo "You can start the runner later by running ./run.sh in $REPO_DIR"
    fi
else
    echo "Non-interactive mode detected. Not starting the runner automatically."
fi

# Check if all runners (frontend, backend, duckdns) are set up
frontend_set=0
backend_set=0
duckdns_set=0
if check_runner_setup "$FRONTEND_DIR"; then
    frontend_set=1
fi
if check_runner_setup "$BACKEND_DIR"; then
    backend_set=1
fi
if check_runner_setup "$DUCKDNS_DIR"; then
    duckdns_set=1
fi

if [ $frontend_set -eq 1 ] && [ $backend_set -eq 1 ] && [ $duckdns_set -eq 1 ]; then
    echo "All services: frontend, backend, and duckdns runners are set up."
    if [ -t 0 ]; then
        read -p "Do you want to reboot now? (y/n): " reboot_now
        if [[ "$reboot_now" =~ ^[Yy]$ ]]; then
            sudo reboot
        else
            echo "You can reboot later to complete the setup."
        fi
    else
        echo "Non-interactive mode: skipping reboot prompt."
    fi
else
    echo "Setup for the other repository(s) may be pending. (frontend=$frontend_set, backend=$backend_set, duckdns=$duckdns_set)"
fi

exit 0

# scripts/setup_github_actions.sh