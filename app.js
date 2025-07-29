// Marketing Website Interactive Features
// Main JavaScript file for handling modals, wheel, localStorage, and QR codes

// Global Variables
let wheelCanvas, wheelCtx;
let wheelAngle = 0;
let isSpinning = false;
let currentPrizes = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeDefaultData();
    initializeWheel();
});

// Initialize default data if none exists
function initializeDefaultData() {
    // Initialize default story
    const story = JSON.parse(localStorage.getItem('storyOfTheDay') || '{}');
    if (!story.title) {
        const defaultStory = {
            title: 'قصة الصداقة',
            image: './images/friend.png',
            content: `قال الجندي لرئيسه: "صديقي في المستشفى وأريد أن أذهب لأراه." فقال له الرئيس: "اذهب إليه، وإذا مات فاتصل بي حتى أرسل لك بديلاً." ذهب الجندي إلى المستشفى وبقي هناك طوال اليوم، وفي المساء اتصل بالرئيس وقال له: "لقد مات صديقي." فقال الرئيس: "آسف لسماع هذا الخبر، سأرسل لك بديلاً غداً." فقال الجندي: "لا حاجة لإرسال بديل، لقد وجدت بديلاً." فقال الرئيس متعجباً: "من هو؟" أجاب الجندي: "أنا! لقد أخذت مكانه في السرير، فقد كان يقاتل بدلاً مني وأنا لم أعرف!" العبرة: الصداقة الحقيقية تعني التضحية والوفاء، وأحياناً لا نكتشف قيمة الأصدقاء إلا بعد فوات الأوان. الصديق الحقيقي هو من يقف معك في الصعاب ويضحي من أجلك دون انتظار مقابل.`,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('storyOfTheDay', JSON.stringify(defaultStory));
    }

    // Initialize default prizes
    const prizes = JSON.parse(localStorage.getItem('wheelPrizes') || '[]');
    if (prizes.length === 0) {
        const defaultPrizes = [
            { id: '1', name: 'خصم 10%', icon: '🎯' },
            { id: '2', name: 'شحن مجاني', icon: '🚚' },
            { id: '3', name: 'هدية مجانية', icon: '🎁' },
            { id: '4', name: 'خصم 20%', icon: '💰' },
            { id: '5', name: 'كوبون خاص', icon: '🎫' },
            { id: '6', name: 'عطر مجاني', icon: '🌸' },
            { id: '7', name: 'خصم 15%', icon: '⭐' },
            { id: '8', name: 'منتج مجاني', icon: '🏆' }
        ];
        localStorage.setItem('wheelPrizes', JSON.stringify(defaultPrizes));
    }
}

// Wheel Modal Functions
function openWheelModal() {
    // Check daily limit
    const today = new Date().toDateString();
    const userId = getUserId();
    const dailyClaimKey = `dailyClaim_${userId}`;
    const lastClaim = JSON.parse(localStorage.getItem(dailyClaimKey) || '{}');
    
    if (lastClaim.claimDate && new Date(lastClaim.claimDate).toDateString() === today) {
        document.getElementById('spin-button').style.display = 'none';
        document.getElementById('daily-limit-message').classList.remove('hidden');
    } else {
        document.getElementById('spin-button').style.display = 'block';
        document.getElementById('daily-limit-message').classList.add('hidden');
    }
    
    // Show modal and redraw wheel
    document.getElementById('wheel-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Redraw wheel in case prizes were updated
    setTimeout(() => {
        drawWheel();
    }, 100);
}

function closeWheelModal() {
    document.getElementById('wheel-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

// Wheel Implementation
function initializeWheel() {
    wheelCanvas = document.getElementById('wheel-canvas');
    if (wheelCanvas) {
        wheelCtx = wheelCanvas.getContext('2d');
        currentPrizes = JSON.parse(localStorage.getItem('wheelPrizes') || '[]');
        drawWheel();
    }
}

function drawWheel() {
    if (!wheelCtx || currentPrizes.length === 0) return;
    
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const outerRadius = Math.min(centerX, centerY) - 20;
    const innerRadius = 30;
    
    // Clear canvas
    wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    
    // Draw wheel segments
    const segmentAngle = (2 * Math.PI) / currentPrizes.length;
    const colors = [
        '#303590', '#565BB6', '#4338ca', '#6366f1', 
        '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe'
    ];
    
    currentPrizes.forEach((prize, index) => {
        const startAngle = wheelAngle + (index * segmentAngle);
        const endAngle = startAngle + segmentAngle;
        
        // Draw outer segment
        wheelCtx.beginPath();
        wheelCtx.moveTo(centerX, centerY);
        wheelCtx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        wheelCtx.fillStyle = colors[index % colors.length];
        wheelCtx.fill();
        
        // Add gradient effect
        const gradient = wheelCtx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
        gradient.addColorStop(0, colors[index % colors.length]);
        gradient.addColorStop(1, colors[index % colors.length] + '80');
        wheelCtx.fillStyle = gradient;
        wheelCtx.fill();
        
        // Draw segment border
        wheelCtx.strokeStyle = '#ffffff';
        wheelCtx.lineWidth = 3;
        wheelCtx.stroke();
        
        // Draw prize icon
        wheelCtx.save();
        wheelCtx.translate(centerX, centerY);
        wheelCtx.rotate(startAngle + segmentAngle / 2);
        
        // Draw icon
        wheelCtx.fillStyle = '#ffffff';
        wheelCtx.font = 'bold 24px Arial';
        wheelCtx.textAlign = 'center';
        wheelCtx.fillText(prize.icon, outerRadius * 0.5, 8);
        
        // Draw prize name
        wheelCtx.font = 'bold 11px Cairo, Arial';
        wheelCtx.fillText(prize.name, outerRadius * 0.75, 4);
        
        wheelCtx.restore();
        
        // Add decorative dots around the wheel
        const dotAngle = startAngle + segmentAngle / 2;
        const dotX = centerX + Math.cos(dotAngle) * (outerRadius + 8);
        const dotY = centerY + Math.sin(dotAngle) * (outerRadius + 8);
        
        wheelCtx.beginPath();
        wheelCtx.arc(dotX, dotY, 4, 0, 2 * Math.PI);
        wheelCtx.fillStyle = '#ffffff';
        wheelCtx.fill();
        wheelCtx.strokeStyle = colors[index % colors.length];
        wheelCtx.lineWidth = 2;
        wheelCtx.stroke();
    });
    
    // Draw center hub
    wheelCtx.beginPath();
    wheelCtx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    
    // Center gradient
    const centerGradient = wheelCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innerRadius);
    centerGradient.addColorStop(0, '#ffffff');
    centerGradient.addColorStop(1, '#f1f5f9');
    wheelCtx.fillStyle = centerGradient;
    wheelCtx.fill();
    
    wheelCtx.strokeStyle = '#303590';
    wheelCtx.lineWidth = 4;
    wheelCtx.stroke();
    
    // Add center logo/text
    wheelCtx.fillStyle = '#303590';
    wheelCtx.font = 'bold 12px Cairo, Arial';
    wheelCtx.textAlign = 'center';
    wheelCtx.fillText('حظ', centerX, centerY - 2);
    wheelCtx.fillText('سعيد', centerX, centerY + 12);
}

function spinWheel() {
    if (isSpinning || currentPrizes.length === 0) return;
    
    // Check daily limit
    const today = new Date().toDateString();
    const userId = getUserId();
    const dailyClaimKey = `dailyClaim_${userId}`;
    const lastClaim = JSON.parse(localStorage.getItem(dailyClaimKey) || '{}');
    
    if (lastClaim.claimDate && new Date(lastClaim.claimDate).toDateString() === today) {
        alert('لقد استخدمت عجلة الحظ اليوم! يمكنك المحاولة مرة أخرى غداً');
        return;
    }
    
    isSpinning = true;
    document.getElementById('spin-button').disabled = true;
    document.getElementById('spin-button').textContent = 'جاري التدوير...';
    
    // Calculate random rotation (multiple full rotations + random segment)
    const segmentAngle = (2 * Math.PI) / currentPrizes.length;
    const minRotation = 4 * Math.PI; // At least 2 full rotations
    const maxRotation = 8 * Math.PI; // At most 4 full rotations
    const randomRotation = minRotation + Math.random() * (maxRotation - minRotation);
    
    const finalAngle = wheelAngle + randomRotation;
    const duration = 3000; // 3 seconds
    const startTime = Date.now();
    const startAngle = wheelAngle;
    
    function animateWheel() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for natural deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        wheelAngle = startAngle + (randomRotation * easeOut);
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animateWheel);
        } else {
            // Determine winning segment
            const normalizedAngle = (2 * Math.PI - (wheelAngle % (2 * Math.PI))) % (2 * Math.PI);
            const winningIndex = Math.floor(normalizedAngle / segmentAngle) % currentPrizes.length;
            const winningPrize = currentPrizes[winningIndex];
            
            // Show prize modal
            setTimeout(() => {
                showPrizeModal(winningPrize);
                isSpinning = false;
                document.getElementById('spin-button').disabled = false;
                document.getElementById('spin-button').textContent = 'تدوير العجلة';
            }, 500);
        }
    }
    
    animateWheel();
}

// Prize Modal Functions
function showPrizeModal(prize) {
    document.getElementById('prize-icon').textContent = prize.icon;
    document.getElementById('prize-name').textContent = prize.name;
    
    // Store current prize for claiming
    window.currentPrize = prize;
}

function closePrizeModal() {
    window.currentPrize = null;
}

function claimPrize() {
    if (!window.currentPrize) return;
    
    const userId = getUserId();
    const dailyClaimKey = `dailyClaim_${userId}`;
    const claimData = {
        prizeName: window.currentPrize.name,
        prizeIcon: window.currentPrize.icon,
        claimDate: new Date().toISOString(),
        userId: userId
    };
    
    localStorage.setItem(dailyClaimKey, JSON.stringify(claimData));
    
    alert(`تم استلام جائزتك: ${window.currentPrize.name}\nسيتم التواصل معك قريباً!`);
    
    closePrizeModal();
    closeWheelModal();
    
    // Update wheel modal to show daily limit
    document.getElementById('spin-button').style.display = 'none';
    document.getElementById('daily-limit-message').classList.remove('hidden');
}

// Share Functions
function shareWhatsApp() {
    const story = JSON.parse(localStorage.getItem('storyOfTheDay') || '{}');
    const storyUrl = window.location.origin + window.location.pathname.replace('index.html', 'story.html');
    
    const message = `🌟 ${story.title || 'قصة ملهمة'}\n\n${(story.content || '').substring(0, 100)}...\n\nاقرأ القصة كاملة: ${storyUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

function shareFacebook() {
    const storyUrl = window.location.origin + window.location.pathname.replace('index.html', 'story.html');
    
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storyUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function copyToClipboard() {
    const storyUrl = window.location.origin + window.location.pathname.replace('index.html', 'story.html');
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(storyUrl).then(() => {
            alert('تم نسخ الرابط بنجاح!');
        }).catch(() => {
            fallbackCopyToClipboard(storyUrl);
        });
    } else {
        fallbackCopyToClipboard(storyUrl);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('تم نسخ الرابط بنجاح!');
    } catch (err) {
        alert('فشل في نسخ الرابط. يرجى نسخه يدوياً: ' + text);
    }
    document.body.removeChild(textArea);
}

// Utility Functions
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// Event Listeners for modal close on outside click
document.getElementById('wheel-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeWheelModal();
    }
});



// Keyboard event listeners for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (!document.getElementById('wheel-modal').classList.contains('hidden')) {
            closeWheelModal();
        }
        
    }
});

// Handle wheel redraw when prizes are updated (for live updates)
window.addEventListener('storage', function(e) {
    if (e.key === 'wheelPrizes') {
        currentPrizes = JSON.parse(e.newValue || '[]');
        if (wheelCtx) {
            drawWheel();
        }
    }
});

// Touch events for mobile wheel interaction (optional enhancement)
if (wheelCanvas) {
    wheelCanvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
    });
}