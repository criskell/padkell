# General AWS
variable "aws_region" {
  type    = string
  default = "us-east-2"
}

# Key Pair
variable "key_pair_name" {
  type    = string
  default = "deployer-key"
}

variable "ssh_public_key" {
  type        = string
  description = "SSH public key for deploying via GitHub Actions"
}

variable "git_ssh_private_key" {
  type        = string
  description = "SSH private key for cloning repository"
}

# S3
variable "s3_bucket_name" {
  type    = string
  default = "padkell-images"
}

# Deployment
variable "github_user" {
  type = string
}

variable "github_pat" {
  type      = string
  sensitive = true
}

variable "cloudflare_api_token" {
  description = "Cloudflare API Token"
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for padkell.criskell.com"
  type        = string
}
