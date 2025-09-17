# GitHub Actions Setup Guide

## Required GitHub Secrets

Để GitHub Actions CI/CD pipeline hoạt động, bạn cần thêm các secrets sau vào repository:

### Repository Settings > Secrets and Variables > Actions

### 🐳 Docker Hub Secrets
```
DOCKER_USERNAME     # Docker Hub username
DOCKER_PASSWORD     # Docker Hub password hoặc access token
```

### 🖥️ Server Deployment Secrets

#### Staging Environment
```
STAGING_HOST        # IP hoặc domain của staging server
STAGING_USER        # SSH username (ví dụ: ubuntu, ec2-user)
STAGING_SSH_KEY     # Private SSH key để kết nối đến staging server
```

#### Production Environment
```
PRODUCTION_HOST     # IP hoặc domain của production server
PRODUCTION_USER     # SSH username
PRODUCTION_SSH_KEY  # Private SSH key để kết nối đến production server
```

### 📢 Notification Secrets
```
SLACK_WEBHOOK       # Slack webhook URL để nhận thông báo deployment
```

## 🔧 Setup Steps

### 1. Tạo Docker Hub Account
```bash
# Đăng ký tại https://hub.docker.com
# Tạo repository mới: your-username/travelviet
# Tạo access token tại Account Settings > Security
```

### 2. Setup SSH Keys cho Servers
```bash
# Tạo SSH key pair
ssh-keygen -t rsa -b 4096 -C "github-actions@travelviet.com"

# Copy public key lên server
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-server.com

# Copy private key content làm GitHub Secret
cat ~/.ssh/id_rsa
```

### 3. Setup Slack Webhook (Optional)
```bash
# Vào Slack workspace
# Tạo app mới tại https://api.slack.com/apps
# Tạo Incoming Webhook
# Copy webhook URL
```

### 4. Configure GitHub Environments

#### Staging Environment
- Repository Settings > Environments
- Tạo environment "staging"
- Thêm protection rules nếu cần

#### Production Environment
- Tạo environment "production"
- Bật "Required reviewers" để yêu cầu approve trước khi deploy
- Thêm deployment branches rule

## 🚀 Pipeline Features

### ✅ Automated Testing
- Build Docker image
- Container health checks
- HTTP endpoint testing
- Security scanning với Trivy
- HTML validation
- Link checking

### 🔄 Multi-Environment Deployment
- **Staging**: Auto deploy từ `develop` branch
- **Production**: Auto deploy từ `main` branch hoặc releases

### 📊 Performance Monitoring
- Lighthouse CI tests
- Performance metrics tracking
- Accessibility scoring

### 🔒 Security & Quality
- CodeQL security analysis
- Container vulnerability scanning
- Code quality checks

### 📢 Notifications
- Slack notifications cho deployments
- Success/failure status updates

## 🌐 Branch Strategy

```
main (production)
├── develop (staging)
│   ├── feature/new-feature
│   └── bugfix/fix-issue
└── release/v1.0.0
```

### Workflow:
1. **Feature development**: `feature/*` → `develop`
2. **Staging testing**: `develop` → auto deploy to staging
3. **Production release**: `develop` → `main` → auto deploy to production
4. **Hotfixes**: `hotfix/*` → `main` → auto deploy

## 📝 Sample Commands

### Local Testing
```bash
# Test Docker build
docker build -t travelviet:test .

# Test container
docker run -d -p 8080:80 --name test-container travelviet:test

# Test endpoints
curl http://localhost:8080
curl http://localhost:8080/style.css
```

### Manual Deployment
```bash
# Build and push
docker build -t your-username/travelviet:latest .
docker push your-username/travelviet:latest

# Deploy to server
ssh user@server "docker pull your-username/travelviet:latest && docker stop travelviet-web && docker rm travelviet-web && docker run -d --name travelviet-web -p 80:80 your-username/travelviet:latest"
```

## 🛠️ Troubleshooting

### Common Issues:

#### 1. SSH Connection Failed
```bash
# Check SSH key format
# Ensure private key includes -----BEGIN/END----- headers
# Verify server SSH configuration allows key authentication
```

#### 2. Docker Build Failed
```bash
# Check Dockerfile syntax
# Verify all COPY files exist
# Check nginx.conf syntax
```

#### 3. Container Health Check Failed
```bash
# Check nginx configuration
# Verify port mapping
# Check container logs: docker logs container-name
```

### Debug Commands:
```bash
# Check GitHub Actions logs
# View container logs: docker logs travelviet-web
# Test nginx config: docker exec travelviet-web nginx -t
# Check container status: docker ps -a
```