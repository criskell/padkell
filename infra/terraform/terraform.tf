terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }

  cloud {
    organization = "neohor"

    workspaces {
      name = "neohor"
    }
  }

  required_version = ">= 1.2"
}
