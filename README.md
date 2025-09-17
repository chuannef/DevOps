# TravelViet Website - Docker Setup

Một trang web du lịch đẹp mắt cho Việt Nam được containerized với Docker và Nginx.

## 🚀 Quick Start

### Yêu cầu hệ thống
- Docker Engine 20.10+
- Docker Compose 2.0+

### Chạy với Docker Compose (Khuyến nghị)

```bash
# Build và start container
docker-compose up -d

# Xem logs
docker-compose logs -f

# Stop container
docker-compose down
```

Trang web sẽ có sẵn tại: http://localhost:8080

### Chạy với Docker commands

```bash
# Build image
docker build -t travelviet:latest .

# Run container
docker run -d \
  --name travelviet-website \
  -p 8080:80 \
  travelviet:latest

# Xem logs
docker logs travelviet-website

# Stop container
docker stop travelviet-website
docker rm travelviet-website
```

## 📁 Cấu trúc Project

```
devops/
├── Dockerfile              # Docker image configuration
├── docker-compose.yml      # Docker Compose setup
├── nginx.conf              # Custom Nginx configuration
├── .dockerignore           # Files to ignore during build
├── index.html              # Main website file
├── style.css               # Stylesheet
└── README.md               # Documentation
```

## 🔧 Tùy chỉnh

### Thay đổi port
Sửa file `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Thay 3000 bằng port mong muốn
```

### Cấu hình Nginx
Chỉnh sửa file `nginx.conf` để tùy chỉnh:
- Gzip compression
- Security headers
- Cache settings
- Logging

### Environment Variables
Có thể set các biến môi trường trong `docker-compose.yml`:
```yaml
environment:
  - NGINX_HOST=yourdomain.com
  - NGINX_PORT=80
```

## 🛠️ Commands hữu ích

```bash
# Xem container đang chạy
docker ps

# Kiểm tra health status
docker inspect --format='{{.State.Health.Status}}' travelviet-website

# Exec vào container
docker exec -it travelviet-website sh

# Rebuild image
docker-compose build --no-cache

# View resource usage
docker stats travelviet-website

# Cleanup unused images
docker image prune
```

## 📊 Monitoring

Container có built-in health check:
- Kiểm tra mỗi 30 giây
- Timeout 10 giây
- Retry 3 lần nếu fail

Kiểm tra health status:
```bash
docker inspect --format='{{.State.Health.Status}}' travelviet-website
```

## 🔒 Security Features

- Ẩn Nginx version
- Security headers (XSS Protection, Content Security Policy, etc.)
- Chặn truy cập hidden files và backup files
- Gzip compression cho performance

## 📝 Notes

- Image base: `nginx:alpine` (nhỏ gọn ~23MB)
- Production-ready với optimized Nginx config
- Static website - không cần database
- Responsive design hỗ trợ mobile/desktop

## 🐛 Troubleshooting

### Container không start
```bash
# Kiểm tra logs
docker logs travelviet-website

# Kiểm tra port conflicts
netstat -tulpn | grep :8080
```

### Permission issues
```bash
# Rebuild với no-cache
docker-compose build --no-cache
```

### Website không load
```bash
# Kiểm tra Nginx config
docker exec travelviet-website nginx -t

# Restart Nginx
docker exec travelviet-website nginx -s reload
```