// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' ? 
    'http://localhost:3001/api' : 
    `${window.location.protocol}//${window.location.hostname}:3001/api`;

// Check API connection
async function checkAPIConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.ok;
    } catch (error) {
        console.log('API connection failed:', error);
        return false;
    }
}

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userMenu = document.getElementById('userMenu');
const userName = document.getElementById('userName');
const authButtons = document.querySelector('.auth-buttons');

// Modals
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const profileModal = document.getElementById('profileModal');
const changePasswordModal = document.getElementById('changePasswordModal');

// Forms
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const profileForm = document.getElementById('profileForm');
const changePasswordForm = document.getElementById('changePasswordForm');

// Utility elements
const loadingSpinner = document.getElementById('loadingSpinner');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Authentication State
let currentUser = null;
let authToken = localStorage.getItem('authToken');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

async function initializeApp() {
    // Check API connection on startup
    const isAPIConnected = await checkAPIConnection();
    if (!isAPIConnected) {
        showNotification('🔌 Backend API chưa khả dụng - đang chạy ở chế độ demo', 'info');
        updateUIForLoggedOutUser();
        return;
    }
    
    if (authToken) {
        try {
            await getCurrentUser();
        } catch (error) {
            console.error('Error getting current user:', error);
            logout();
        }
    }
}

function setupEventListeners() {
    // Auth buttons
    loginBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('loginModal');
    });

    registerBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('registerModal');
    });

    logoutBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });

    // Profile
    document.getElementById('profileLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        showProfile();
    });

    document.getElementById('changePasswordBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('changePasswordModal');
    });

    // Modal switches
    document.getElementById('switchToRegister')?.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal('loginModal');
        showModal('registerModal');
    });

    document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal('registerModal');
        showModal('loginModal');
    });

    // Forms
    loginForm?.addEventListener('submit', handleLogin);
    registerForm?.addEventListener('submit', handleRegister);
    profileForm?.addEventListener('submit', handleUpdateProfile);
    changePasswordForm?.addEventListener('submit', handleChangePassword);

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modalId = closeBtn.dataset.modal;
            hideModal(modalId);
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target.id);
        }
    });

    // Close notification
    document.getElementById('closeNotification')?.addEventListener('click', hideNotification);
}

// API Functions
async function apiRequest(endpoint, options = {}) {
    showLoading();
    
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` })
            },
            ...options
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } finally {
        hideLoading();
    }
}

async function login(credentials) {
    const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
    
    authToken = response.data.token;
    currentUser = response.data.user;
    localStorage.setItem('authToken', authToken);
    
    return response;
}

async function register(userData) {
    const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
    
    authToken = response.data.token;
    currentUser = response.data.user;
    localStorage.setItem('authToken', authToken);
    
    return response;
}

async function getCurrentUser() {
    const response = await apiRequest('/auth/me');
    currentUser = response.data.user;
    updateUIForLoggedInUser();
    return response;
}

async function updateProfile(profileData) {
    const response = await apiRequest('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData)
    });
    
    currentUser = response.data.user;
    updateUIForLoggedInUser();
    
    return response;
}

async function changePassword(passwordData) {
    return await apiRequest('/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify(passwordData)
    });
}

// Event Handlers
async function handleLogin(e) {
    e.preventDefault();
    
    // Check API connection first
    const isAPIConnected = await checkAPIConnection();
    if (!isAPIConnected) {
        showNotification('🔌 Backend server chưa sẵn sàng. Đang chạy ở chế độ demo!', 'info');
        
        // Demo mode - simulate successful login
        const email = document.getElementById('loginEmail').value;
        if (email) {
            currentUser = {
                name: email.split('@')[0],
                email: email
            };
            updateUIForLoggedInUser();
            hideModal('loginModal');
            loginForm.reset();
            showNotification('🎭 Đang chạy ở chế độ demo - không có dữ liệu thật!', 'info');
        }
        return;
    }
    
    const formData = new FormData(loginForm);
    const credentials = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await login(credentials);
        showNotification(response.message, 'success');
        hideModal('loginModal');
        loginForm.reset();
        updateUIForLoggedInUser();
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    // Check API connection first
    const isAPIConnected = await checkAPIConnection();
    if (!isAPIConnected) {
        showNotification('🔌 Backend server chưa sẵn sàng. Đang chạy ở chế độ demo!', 'info');
        
        // Demo mode - simulate successful registration
        const email = document.getElementById('registerEmail').value;
        const name = document.getElementById('registerName').value;
        if (email && name) {
            currentUser = { name, email };
            updateUIForLoggedInUser();
            hideModal('registerModal');
            registerForm.reset();
            showNotification('🎭 Đăng ký demo thành công!', 'success');
        }
        return;
    }
    
    const formData = new FormData(registerForm);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp', 'error');
        return;
    }

    const userData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: password
    };

    try {
        const response = await register(userData);
        showNotification(response.message, 'success');
        hideModal('registerModal');
        registerForm.reset();
        updateUIForLoggedInUser();
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

async function handleUpdateProfile(e) {
    e.preventDefault();
    
    const formData = new FormData(profileForm);
    const profileData = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone')
    };

    try {
        const response = await updateProfile(profileData);
        showNotification(response.message, 'success');
        hideModal('profileModal');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

async function handleChangePassword(e) {
    e.preventDefault();
    
    const formData = new FormData(changePasswordForm);
    const newPassword = formData.get('newPassword');
    const confirmNewPassword = formData.get('confirmNewPassword');

    if (newPassword !== confirmNewPassword) {
        showNotification('Mật khẩu mới không khớp', 'error');
        return;
    }

    const passwordData = {
        currentPassword: formData.get('currentPassword'),
        newPassword: newPassword
    };

    try {
        const response = await changePassword(passwordData);
        showNotification(response.message, 'success');
        hideModal('changePasswordModal');
        changePasswordForm.reset();
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function logout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    updateUIForLoggedOutUser();
    showNotification('Đăng xuất thành công', 'success');
}

// UI Functions
function updateUIForLoggedInUser() {
    if (currentUser) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'block';
        userName.textContent = currentUser.fullName;
    }
}

function updateUIForLoggedOutUser() {
    authButtons.style.display = 'flex';
    userMenu.style.display = 'none';
}

function showProfile() {
    if (currentUser) {
        document.getElementById('profileFullName').value = currentUser.fullName || '';
        document.getElementById('profileEmail').value = currentUser.email || '';
        document.getElementById('profilePhone').value = currentUser.phone || '';
        showModal('profileModal');
    }
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showLoading() {
    loadingSpinner.style.display = 'flex';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

function showNotification(message, type = 'info') {
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(hideNotification, 5000);
}

function hideNotification() {
    notification.style.display = 'none';
}