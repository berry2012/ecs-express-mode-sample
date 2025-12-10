# GitHub Actions IAM Role Setup

```bash
export YOUR_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export YOUR_GITHUB_USERNAME=""
export YOUR_REPO_NAME=""
```

## Step 1: Create OpenID Connect Provider

```bash
aws iam create-open-id-connect-provider \
    --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com
```

## Step 2: Create IAM Role Trust Policy

Create `trust-policy.json`:

```json
cat << EOF >> trust-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${YOUR_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:${YOUR_GITHUB_USERNAME}/${YOUR_REPO_NAME}:*"
        }
      }
    }
  ]
}
EOF
```

## Step 3: Create IAM Role

```bash
aws iam create-role \
    --role-name github-actions-ecs-role \
    --assume-role-policy-document file://trust-policy.json
```

## Step 4: Create ECS Express Permissions Policy

Create `ecs-express-policy.json`:

```json
cat << EOF >> ecs-express-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecs:CreateCluster",
        "ecs:RegisterTaskDefinition",
        "ecs:CreateExpressGatewayService",
        "ecs:UpdateExpressGatewayService",
        "ecs:DescribeExpressGatewayService",
        "ecs:DescribeClusters",
        "ecs:DescribeServices",
        "ecs:ListServiceDeployments",
        "ecs:DescribeServiceDeployments",
        "iam:PassRole"
      ],
      "Resource": "*"
    }
  ]
}
EOF
```

## Step 5: Create ECR Permissions Policy

Create `ecr-policy.json`:

```json
cat << EOF >> ecr-policy.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPushPull",
            "Effect": "Allow",
            "Action": [
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:CompleteLayerUpload",
                "ecr:GetDownloadUrlForLayer",
                "ecr:InitiateLayerUpload",
                "ecr:PutImage",
                "ecr:UploadLayerPart"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AllowLogin",
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken"
            ],
            "Resource": "*"
        }
    ]
}
EOF
```

## Step 6: Attach Policies to Role

```bash
# Create and attach ECS Express policy
aws iam create-policy \
    --policy-name GitHubActionsECSExpressPolicy \
    --policy-document file://ecs-express-policy.json

aws iam attach-role-policy \
    --role-name github-actions-ecs-role \
    --policy-arn arn:aws:iam::${YOUR_ACCOUNT_ID}:policy/GitHubActionsECSExpressPolicy

# Create and attach ECR policy
aws iam create-policy \
    --policy-name GitHubActionsECRPolicy \
    --policy-document file://ecr-policy.json

aws iam attach-role-policy \
    --role-name github-actions-ecs-role \
    --policy-arn arn:aws:iam::${YOUR_ACCOUNT_ID}:policy/GitHubActionsECRPolicy
```

## Step 7: Update GitHub Variables

Add this variable in **Settings** → **Secrets and variables** → **Actions** → **Variables**:

- `AWS_ACCOUNT_ID`: Your AWS account ID

## Environment Variables

Add these variables in **Settings** → **Secrets and variables** → **Actions** → **Variables** tab:

- `AWS_REGION`: Your AWS region (e.g., eu-west-1)
- `ECR_REPOSITORY`: Your ECR repository name
- `ECS_SERVICE`: Your ECS service name
- `ECS_CLUSTER`: Your ECS cluster name
- `ECS_TASK_DEFINITION`: Your task definition name (for the second workflow)