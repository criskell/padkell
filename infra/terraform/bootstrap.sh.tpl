#!/bin/bash

# Fail fast
set -e
exec > >(tee /var/log/padkell-bootstrap.log)
exec 2>&1

apt-get update -y
apt-get install -y git curl ca-certificates

# Add Docker's official GPG key:
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y

# Install Docker
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker service in systemd
systemctl start docker
systemctl enable docker

# For docker without "sudo"
usermod -aG docker ubuntu

# Add SSH private key
mkdir -p /home/ubuntu/.ssh
chown ubuntu:ubuntu -R /home/ubuntu/.ssh
chmod 700 /home/ubuntu/.ssh

echo "${git_ssh_private_key}" > /home/ubuntu/.ssh/id_ed25519
chmod 600 /home/ubuntu/.ssh/id_ed25519

ssh-keyscan -t rsa,ed25519 github.com >> /home/ubuntu/.ssh/known_hosts 2>/dev/null
chown ubuntu:ubuntu -R /home/ubuntu/.ssh

echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> /home/ubuntu/.ssh/config
chmod 600 /home/ubuntu/.ssh/config

# Pull and start containers
mkdir -p /opt/padkell
chown -R ubuntu:ubuntu /opt/padkell

su - ubuntu <<EOF
set -e
cd /opt/padkell

if [ ! -d .git ]; then
  git clone --no-checkout --depth=1 --filter=tree:0 git@github.com:criskell/padkell.git .
  git sparse-checkout set --no-cone /infra
  git checkout
fi

touch .env

cd infra

# GHCR login
echo "${github_pat}" | docker login ghcr.io -u "${github_user}" --password-stdin

docker compose -f docker-compose-prod.yml pull
docker compose -f docker-compose-prod.yml up -d

echo "Bootstrap script completed successfully!"
EOF