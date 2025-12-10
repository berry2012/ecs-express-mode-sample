#!/bin/bash

set -e

# Configuration
REGION="eu-west-1"
REPO_NAME="express-web-application"
IMAGE_TAG="latest"

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

# Get ECR login token and authenticate Docker
echo "🔐 Authenticating Docker with ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# Build Docker image for Linux platform
echo "🔨 Building Docker image for Linux platform..."
docker build --platform linux/amd64 -t $REPO_NAME:$IMAGE_TAG .

# Tag image for ECR
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO_NAME:$IMAGE_TAG"
echo "🏷️  Tagging image for ECR: $ECR_URI"
docker tag $REPO_NAME:$IMAGE_TAG $ECR_URI

# Push image to ECR
echo "📤 Pushing image to ECR..."
docker push $ECR_URI

echo "✅ Successfully pushed to ECR!"
echo ""
echo "📋 ECR Image URI for deployment:"
echo "$ECR_URI"
echo ""
echo "🔗 ECR Repository URI:"
echo "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO_NAME"
