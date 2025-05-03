// Kullanıcı verilerini localStorage'dan al
function getUserData() {
    return JSON.parse(localStorage.getItem('userData')) || {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        preferences: {
            language: 'tr',
            currency: 'TRY',
            theme: 'light',
            notifications: {
                email: true,
                sms: false,
                push: true
            }
        }
    };
}

// Kullanıcı verilerini localStorage'a kaydet
function saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

// Profil formunu doldur
function populateProfileForm() {
    const userData = getUserData();
    document.getElementById('fullName').value = userData.fullName || '';
    document.getElementById('email').value = userData.email || '';
    document.getElementById('phone').value = userData.phone || '';
    document.getElementById('address').value = userData.address || '';
}

// Tercihleri doldur
function populatePreferences() {
    const userData = getUserData();
    document.getElementById('language').value = userData.preferences.language || 'tr';
    document.getElementById('currency').value = userData.preferences.currency || 'TRY';
    document.getElementById('theme').value = userData.preferences.theme || 'light';
    document.getElementById('emailNotif').checked = userData.preferences.notifications.email;
    document.getElementById('smsNotif').checked = userData.preferences.notifications.sms;
    document.getElementById('pushNotif').checked = userData.preferences.notifications.push;
}

// Profil menüsü işlevselliği
function setupProfileMenu() {
    const menuLinks = document.querySelectorAll('.profile-menu a');
    const sections = document.querySelectorAll('.profile-section');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Aktif menü öğesini güncelle
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Aktif bölümü güncelle
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId + '-info') {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Form gönderimlerini işle
function setupFormSubmissions() {
    // Profil formu
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = getUserData();
        userData.fullName = document.getElementById('fullName').value;
        userData.email = document.getElementById('email').value;
        userData.phone = document.getElementById('phone').value;
        userData.address = document.getElementById('address').value;
        saveUserData(userData);
        showNotification('Profil bilgileri güncellendi!');
    });

    // Güvenlik formu
    document.getElementById('securityForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            showNotification('Yeni şifreler eşleşmiyor!', 'error');
            return;
        }

        // Şifre değişikliği simülasyonu
        showNotification('Şifre başarıyla güncellendi!');
        e.target.reset();
    });

    // Bildirim formu
    document.getElementById('notificationsForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = getUserData();
        userData.preferences.notifications = {
            email: document.getElementById('emailNotif').checked,
            sms: document.getElementById('smsNotif').checked,
            push: document.getElementById('pushNotif').checked
        };
        saveUserData(userData);
        showNotification('Bildirim tercihleri güncellendi!');
    });

    // Tercihler formu
    document.getElementById('preferencesForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = getUserData();
        userData.preferences.language = document.getElementById('language').value;
        userData.preferences.currency = document.getElementById('currency').value;
        userData.preferences.theme = document.getElementById('theme').value;
        saveUserData(userData);
        showNotification('Tercihler güncellendi!');
        
        // Dil değişikliğini uygula
        if (userData.preferences.language) {
            changeLanguage(userData.preferences.language);
        }
    });
}

// Bildirim göster
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Çıkış yap
function setupLogout() {
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userData');
        window.location.href = 'index.html';
    });
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Kullanıcı girişi kontrolü
    const userData = getUserData();
    if (!userData.email) {
        window.location.href = 'index.html';
        return;
    }

    // Kullanıcı adını güncelle
    document.querySelector('.user-name').textContent = userData.fullName || 'Kullanıcı';
    document.querySelector('.profile-name').textContent = userData.fullName || 'Kullanıcı Adı';
    document.querySelector('.profile-email').textContent = userData.email || 'kullanici@email.com';

    // Formları doldur
    populateProfileForm();
    populatePreferences();

    // Menü ve form işlevselliğini ayarla
    setupProfileMenu();
    setupFormSubmissions();
    setupLogout();
}); 