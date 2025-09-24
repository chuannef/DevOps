# Sử dụng Nginx image chính thức làm base image
FROM nginx:alpine

# Thông tin metadata
LABEL maintainer="TravelViet Team"
LABEL description="TravelViet Website - A beautiful travel website for Vietnam tourism"
LABEL version="1.0"

# Xóa default nginx configuration và website
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy website files vào thư mục nginx
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY auth.js /usr/share/nginx/html/

# Tạo thư mục cho assets nếu cần
RUN mkdir -p /usr/share/nginx/html/assets

# Set permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check để kiểm tra container có hoạt động không
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]