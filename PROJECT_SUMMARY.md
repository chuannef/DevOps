# 🌍 TravelViet - Website Du lịch Việt Nam với Hệ thống Xác thực

## 📋 Tổng quan Dự án

Dự án **TravelViet** là một website du lịch hoàn chỉnh với hệ thống xác thực người dùng, được xây dựng với kiến trúc full-stack hiện đại và triển khai bằng Docker + CI/CD.

## 🛠️ Công nghệ Sử dụng

### Frontend
- **HTML5/CSS3**: Giao diện responsive với thiết kế hiện đại
- **JavaScript ES6+**: Xử lý authentication và tương tác người dùng
- **Font Awesome**: Icon library cho UI components
- **Modal System**: Popup đăng nhập/đăng ký mượt mà

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database lưu trữ thông tin người dùng
- **Mongoose**: ODM cho MongoDB
- **JWT**: Token-based authentication
- **bcrypt**: Mã hóa mật khẩu
- **express-validator**: Validation dữ liệu input
- **helmet**: Security middleware
- **cors**: Cross-Origin Resource Sharing

### DevOps & Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **GitHub Actions**: CI/CD pipeline
- **Nginx**: Reverse proxy và static file serving

## 📁 Cấu trúc Dự án

```
devops/
├── 🎨 Frontend Files
│   ├── index.html          # Trang chính với giao diện du lịch
│   ├── style.css           # Responsive CSS cho toàn bộ website
│   └── auth.js             # JavaScript xử lý authentication
│
├── 🔧 Backend API
│   ├── server.js           # Express server chính
│   ├── package.json        # Dependencies và scripts
│   ├── .env               # Environment variables
│   │
│   ├── models/
│   │   └── User.js        # MongoDB user schema
│   │
│   ├── routes/
│   │   ├── auth.js        # Authentication endpoints
│   │   └── user.js        # User management endpoints
│   │
│   └── middleware/
│       └── auth.js        # JWT verification middleware
│
├── 🐳 Docker Configuration
│   ├── Dockerfile         # Container image definition
│   ├── docker-compose.yml # Multi-service orchestration
│   └── nginx.conf         # Nginx configuration
│
├── 🚀 CI/CD Pipeline
│   └── .github/workflows/
│       └── ci-cd.yml      # GitHub Actions workflow
│
└── 📚 Documentation
    ├── README.md          # Hướng dẫn cơ bản
    ├── PROJECT_SUMMARY.md # Tài liệu chi tiết này
    └── GITHUB_ACTIONS_SETUP.md # Hướng dẫn CI/CD
```

## ✨ Tính năng Chính

### 🌐 Website Du lịch
- **Hero Section**: Banner chính với hình ảnh thu hút
- **Popular Destinations**: Giới thiệu các điểm đến phổ biến
- **Travel Tips**: Mẹo và lời khuyên du lịch
- **Services**: Các dịch vụ tour du lịch
- **Contact**: Thông tin liên hệ
- **Responsive Design**: Tương thích tất cả thiết bị

### 🔐 Hệ thống Authentication
- **User Registration**: Đăng ký tài khoản mới
- **User Login**: Đăng nhập với email/password  
- **JWT Authentication**: Token-based security
- **Password Encryption**: Bảo mật với bcrypt
- **Profile Management**: Quản lý thông tin cá nhân
- **Password Change**: Thay đổi mật khẩu
- **Session Management**: Tự động đăng nhập lại

### 🛡️ Bảo mật
- **Input Validation**: Kiểm tra dữ liệu đầu vào
- **Rate Limiting**: Giới hạn số request
- **CORS Protection**: Bảo vệ cross-origin requests
- **Security Headers**: Helmet.js middleware
- **Password Hashing**: bcrypt với salt rounds
- **JWT Expiration**: Token có thời hạn

## 🚀 Cách Chạy Dự án

### 1️⃣ Chạy Frontend (Demo Mode)
```bash
# Di chuyển vào thư mục dự án
cd "d:\My Project\devops"

# Chạy Python HTTP server
python -m http.server 8080

# Truy cập: http://localhost:8080
```

### 2️⃣ Chạy Backend (Full System)
```bash
# Cài đặt MongoDB locally
# Download và cài đặt MongoDB Community Server

# Cài đặt dependencies
cd backend
npm install

# Cấu hình environment variables
# Chỉnh sửa file .env nếu cần

# Khởi động backend server
npm start
# hoặc
node server.js

# Backend chạy trên: http://localhost:3001
```

### 3️⃣ Chạy với Docker
```bash
# Build và chạy containers
docker-compose up -d

# Kiểm tra containers
docker-compose ps

# Xem logs
docker-compose logs -f
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `PUT /api/auth/change-password` - Thay đổi mật khẩu

### User Management  
- `GET /api/user/profile` - Lấy profile user
- `PUT /api/user/profile` - Cập nhật profile

### System
- `GET /api/health` - Health check endpoint

## 🎯 Demo Mode

Khi backend chưa sẵn sàng, ứng dụng tự động chuyển sang **Demo Mode**:
- ✅ Giao diện frontend hoạt động bình thường
- ✅ Modal đăng nhập/đăng ký hiển thị
- ✅ Simulation login/register (không lưu database)
- ✅ UI updates theo trạng thái đăng nhập
- ℹ️ Hiển thị thông báo "Chế độ Demo"

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
1. **Trigger**: Push to main branch
2. **Build**: Docker image build
3. **Test**: Code quality checks
4. **Deploy**: Push to Docker Hub
5. **Notify**: Build status updates

### Các bước triển khai:
```yaml
- Checkout code
- Setup Docker Buildx  
- Login to Docker Hub
- Build and push image
- Run security scans
- Deploy to staging/production
```

## 🌟 Highlights

### ✨ UI/UX Features
- **Smooth Animations**: CSS transitions và transforms
- **Modal System**: Overlay popups với backdrop blur
- **Responsive Grid**: Mobile-first design approach
- **Loading States**: Spinner cho async operations
- **Notifications**: Toast messages cho user feedback
- **Form Validation**: Real-time input validation

### 🚀 Performance Optimizations  
- **Lazy Loading**: Images load khi cần thiết
- **CSS Minification**: Optimized stylesheets
- **Gzip Compression**: Nginx compression
- **Caching Headers**: Browser caching strategy
- **CDN Ready**: Static assets optimization

### 🔧 Developer Experience
- **Environment Variables**: Cấu hình linh hoạt
- **Error Handling**: Comprehensive error management  
- **Logging**: Structured logging với timestamps
- **Hot Reload**: Development server với auto-refresh
- **Code Organization**: Modular file structure

## 📊 Database Schema

### User Collection
```javascript
{
  name: String,           // Họ tên người dùng
  email: String,          // Email (unique)
  password: String,       // Hashed password với bcrypt
  avatar: String,         // URL avatar (optional)
  createdAt: Date,        // Ngày tạo tài khoản
  updatedAt: Date,        // Ngày cập nhật cuối
  isActive: Boolean       // Trạng thái tài khoản
}
```

## 🛠️ Troubleshooting

### Lỗi phổ biến và cách khắc phục:

1. **Port 3000/3001 đã được sử dụng**
   ```bash
   netstat -ano | findstr :3001
   taskkill /f /pid [PID]
   ```

2. **MongoDB connection failed**
   - Kiểm tra MongoDB service đang chạy
   - Verify connection string trong .env
   - Check firewall settings

3. **CORS errors** 
   - Kiểm tra CORS configuration trong server.js
   - Verify frontend URL trong CORS origin

4. **JWT token invalid**
   - Check JWT_SECRET trong .env
   - Verify token expiration time
   - Clear localStorage và đăng nhập lại

## 📈 Roadmap Tương lai

### Phase 2 Features:
- [ ] **Email Verification**: Xác thực email qua SMTP
- [ ] **Social Login**: Google/Facebook OAuth
- [ ] **Booking System**: Đặt tour du lịch
- [ ] **Payment Integration**: VNPay/Momo gateway
- [ ] **Admin Dashboard**: Quản trị viên interface
- [ ] **Multi-language**: Hỗ trợ đa ngôn ngữ
- [ ] **PWA**: Progressive Web App
- [ ] **Push Notifications**: Real-time notifications

### Technical Improvements:
- [ ] **Redis Caching**: Session và data caching
- [ ] **Elasticsearch**: Advanced search functionality
- [ ] **Microservices**: Service decomposition
- [ ] **GraphQL**: API optimization
- [ ] **TypeScript**: Type safety
- [ ] **Jest Testing**: Unit và integration tests
- [ ] **Kubernetes**: Container orchestration

## 👨‍💻 Tác giả

**Travel Vietnam Development Team**
- Frontend Development: HTML5, CSS3, JavaScript
- Backend Development: Node.js, Express, MongoDB
- DevOps Engineering: Docker, CI/CD, GitHub Actions

## 📝 License

MIT License - Tự do sử dụng cho mục đích học tập và thương mại.

---

**🎉 Cảm ơn bạn đã sử dụng TravelViet!**

*Dự án được xây dựng với ❤️ cho cộng đồng developer Việt Nam*