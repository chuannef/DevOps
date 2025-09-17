# 🚀 GitHub Actions Simple Setup Guide

## Chỉ cần 2 bước đơn giản!

### Bước 1: Tạo Docker Hub Account (2 phút)

1. **Đăng ký Docker Hub:**
   - Truy cập: https://hub.docker.com
   - Đăng ký account miễn phí
   - Ghi nhớ username của bạn

2. **Tạo Access Token:**
   - Đăng nhập Docker Hub
   - Đi đến **Account Settings** > **Security**
   - Click **"New Access Token"**
   - Đặt tên: "GitHub Actions"
   - Copy token (chỉ hiện 1 lần!)

### Bước 2: Thêm GitHub Secrets (1 phút)

1. **Vào GitHub Repository:**
   - Mở: https://github.com/chuannef/DevOps
   - Click tab **"Settings"**
   - Sidebar: **"Secrets and variables"** > **"Actions"**

2. **Thêm 2 secrets:**

   **Secret 1:**
   - Click **"New repository secret"**
   - Name: `DOCKER_USERNAME`
   - Secret: `chuannef` (hoặc Docker Hub username của bạn)
   - Click **"Add secret"**

   **Secret 2:**
   - Click **"New repository secret"** 
   - Name: `DOCKER_PASSWORD`
   - Secret: Paste Docker Hub access token từ bước 1
   - Click **"Add secret"**

## ✅ Xong! CI/CD đã sẵn sàng

### 🎯 CI/CD sẽ làm gì:

1. **Khi bạn push code lên main branch:**
   - ✅ Build Docker image
   - ✅ Test website hoạt động
   - ✅ Push image lên Docker Hub với tag `latest` và `commit-hash`

2. **Khi tạo Pull Request:**
   - ✅ Build và test (không push lên Docker Hub)

### 🐳 Cách sử dụng Docker image sau khi CI/CD chạy:

```bash
# Pull và chạy image từ Docker Hub
docker pull chuannef/travelviet:latest
docker run -p 8080:80 chuannef/travelviet:latest

# Truy cập: http://localhost:8080
```

### 📊 Theo dõi CI/CD:

1. Sau khi push code, đi đến repository GitHub
2. Click tab **"Actions"**
3. Xem pipeline chạy realtime
4. Khi hoàn thành, Docker image sẽ có sẵn tại: `docker.io/chuannef/travelviet:latest`

## 🎉 Đó là tất cả!

Không cần server, không cần SSH keys, không cần cấu hình phức tạp. 
Chỉ cần Docker Hub và 2 GitHub secrets!

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