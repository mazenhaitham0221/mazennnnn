// دالة للحصول على الموقع الجغرافي للمستخدم
function getLocation() {
    if (navigator.geolocation) {
        // طلب إذن المستخدم للحصول على الموقع
        navigator.geolocation.getCurrentPosition(savePosition, showError);
    } else {
        document.getElementById("locationInfo").innerText = "الموقع الجغرافي غير مدعوم في هذا المتصفح.";
    }
}

// دالة لحفظ الموقع للمستخدم
function savePosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // تخزين الموقع في localStorage
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);

    // عرض الموقع الجغرافي في الصفحة
    document.getElementById("locationInfo").innerText = 
        `خط العرض: ${latitude}, خط الطول: ${longitude}`;

    // عرض الموقع على الخريطة باستخدام خرائط جوجل
    showMap(latitude, longitude);
}

// دالة لعرض رسالة في حال حدوث خطأ
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("locationInfo").innerText = "تم رفض الإذن للوصول إلى الموقع.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("locationInfo").innerText = "الموقع غير متاح.";
            break;
        case error.TIMEOUT:
            document.getElementById("locationInfo").innerText = "انتهى الوقت للحصول على الموقع.";
            break;
        default:
            document.getElementById("locationInfo").innerText = "حدث خطأ غير معروف.";
            break;
    }
}

// دالة لعرض الموقع على خريطة جوجل
function showMap(latitude, longitude) {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 15
    });

    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map
    });
}

// إضافة Google Maps API
function initMap() {
    // سيتم تحميل الخريطة بعد الموافقة من المستخدم
}

// تحميل البيانات المخزنة من localStorage إذا كانت موجودة
window.onload = function() {
    const storedLatitude = localStorage.getItem("latitude");
    const storedLongitude = localStorage.getItem("longitude");

    if (storedLatitude && storedLongitude) {
        // عرض الموقع المخزن في الصفحة
        document.getElementById("locationInfo").innerText = 
            `الموقع المخزن: خط العرض: ${storedLatitude}, خط الطول: ${storedLongitude}`;
        
        // عرض الموقع على الخريطة باستخدام القيم المخزنة
        showMap(parseFloat(storedLatitude), parseFloat(storedLongitude));
    }
}