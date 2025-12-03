resource "aws_key_pair" "deployer" {
  key_name   = "padkell-deployer-key"
  public_key = var.ssh_public_key
}

resource "aws_security_group" "security_group" {
  name   = "padkell-security-group"
  vpc_id = aws_vpc.main.id

  # Allow SSH connections.
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTP connections.
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "padkell-main-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-2a"
  tags                    = { Name = "padkell-public-subnet" }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-2a"
  tags              = { Name = "padkell-private-subnet" }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "main-internet-gateway" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }

  tags = { Name = "public-route-table" }
}

resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "app" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.micro"
  key_name               = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.security_group.id]
  subnet_id              = aws_subnet.public.id
  tags                   = { Name = "padkell-server" }
  user_data = templatefile("${path.module}/bootstrap.sh.tpl", {
    github_user         = var.github_user
    github_pat          = var.github_pat
    git_ssh_private_key = var.git_ssh_private_key
  })

  root_block_device {
    volume_type           = "gp3"
    volume_size           = 30
    delete_on_termination = false
  }
}

resource "aws_eip" "app_eip" {
  instance = aws_instance.app.id
}

output "ec2_public_ip" {
  value = aws_eip.app_eip.public_ip
}

output "ec2_instance_id" {
  value = aws_instance.app.id
}
