#!/bin/bash

set -e

# Configuration
REGION="eu-west-1"
REPO_NAME="ecs-express-mode-sample"


echo "🚀 Setting up ECR repository and pushing Docker image..."

# Get AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "📋 AWS Account ID: $ACCOUNT_ID"

# Create ECR repository
echo "🏗️  Creating ECR repository: $REPO_NAME"
aws ecr create-repository \
    --repository-name $REPO_NAME \
    --region $REGION \
    --image-scanning-configuration scanOnPush=true \
    --encryption-configuration encryptionType=AES256 \
    2>/dev/null || echo "Repository already exists"


echo "✅ Successfullycreated repo in ECR!"
echo ""
echo ""
echo "🔗 ECR Repository URI:"
echo "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO_NAME"
