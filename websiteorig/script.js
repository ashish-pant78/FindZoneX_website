// Initial data
let items = [
    {
        id: 1,
        type: 'lost',
        name: 'Timex Watch',
        category: 'Electronics',
        description: 'Black in  colour wrist chain analog watch.',
        location: 'GRD Institute of Management and Techonology , Basket ball court',
        date: '2024-12-01',
        contact: 'mayankrajkapadi34@email.com',
        reward: '$50',
        matchScore: 95,
         image: 'https://getat.ru/wp-content/uploads/2024/01/Timex_Marlin_Jet_Automatic_07.jpg'
    },
    {
        id: 2,
        type: 'found',
        name: 'Silver iPhone 14 Pro',
        category: 'Electronics',
        description: 'Silver iPhone 14 Pro with cracked screen protector. Still locked. Found near the fountain.',
        location: 'City Park Central Fountain',
        date: '2024-12-03',
        contact: '+1-555-0123',
        reward: null,
        matchScore: 88,
        image: 'https://mobilecity-live.s3.ap-southeast-2.amazonaws.com/wp-content/uploads/2022/11/15195740/260c90d3-1743-45ca-a8ea-9995ce06dd8f-iphone-14-pro-05.jpg'
    },
    {
        id: 3,
        type: 'lost',
        name: 'Blue Nike Backpack',
        category: 'Accessories',
        description: 'Blue Nike backpack with laptop, textbooks, and notebooks. Has a small "JS" keychain attached.',
        location: 'University Library 3rd Floor',
        date: '2024-12-04',
        contact: 'sarah.jones@university.edu',
        reward: '$100',
        matchScore: 92,
        image: 'https://static.ftshp.digital/img/p/1/6/6/4/6/8/166468.jpg'
    },
    {
        id: 4,
        type: 'found',
        name: 'Gold Wedding Ring',
        category: 'Jewelry',
        description: 'Gold wedding band with engraving "Forever & Always - 2015". Found in the restroom.',
        location: 'Grand Hotel Lobby',
        date: '2024-12-05',
        contact: 'hotel@grandhotel.com',
        reward: null,
        matchScore: 97,
         image: 'https://wallpapercave.com/wp/3UQjSnE.jpg'
    },
    {
        id: 5,
        type: 'lost',
        name: 'Brown Labrador Dog',
        category: 'Pet',
        description: 'Friendly brown Labrador, 3 years old, answers to "Max". Has a blue collar with tags.',
        location: 'Riverside Dog Park',
        date: '2024-12-05',
        contact: '+1-555-0456',
        reward: '$200',
        matchScore: 100,
        image: 'https://thelabradorsite.com/wp-content/uploads/2015/07/buying-a-chocolate-labrador-puppy.jpg'
    },
    {
        id: 6,
        type: 'lost',
        name: 'Black Leather Wallet',
        category: 'Wallet/Purse',
        description: 'Black leather bifold wallet with credit cards, ID, and $200 cash inside. Has a small scratch on the back.',
        location: 'Downtown Mall Food Court',
        date: '2024-12-01',
        contact: 'john.doe@email.com',
        reward: '$50',
        matchScore: 95,
         image: 'https://img.freepik.com/premium-photo/black-leather-wallet_1155277-2796.jpg'
    },
];

let filteredItems = [...items];
let uploadedImage = null;

// Update statistics
function updateStats() {
    document.getElementById('totalItems').textContent = items.length;
    document.getElementById('matchedItems').textContent = items.filter(i => i.matchScore >= 90).length;
    document.getElementById('activeReports').textContent = items.filter(i => {
        const itemDate = new Date(i.date);
        const daysDiff = Math.floor((new Date() - itemDate) / (1000 * 60 * 60 * 24));
        return daysDiff <= 7;
    }).length;
}

// Display items
function displayItems(itemsToShow = filteredItems) {
    const container = document.getElementById('itemsContainer');
    
    if (itemsToShow.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; background: white; border-radius: 20px;">
                <h2 style="color: #64748b; margin-bottom: 1rem;">No items found</h2>
                <p style="color: #94a3b8;">Try adjusting your filters or be the first to report!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = itemsToShow.map(item => `
        <div class="item-card">
            <div class="item-header">
                <div class="item-badge badge-${item.type}">${item.type}</div>
                ${item.matchScore >= 85 ? `<div class="match-score">🎯 ${item.matchScore}% Match</div>` : ''}
            </div>
            <div class="item-image">
    <img src="${item.image}" alt="${item.name}">
</div>

            <div class="item-body">
                <h3 class="item-title">${item.name}</h3>
                <div class="item-category">${item.category}</div>
                <p class="item-description">${item.description}</p>
                ${item.reward ? `<div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 0.5rem 1rem; border-radius: 10px; font-weight: 700; text-align: center; margin: 1rem 0;">💰 Reward: ${item.reward}</div>` : ''}
                <div class="item-meta">
                    <div class="meta-item">
                        <span>📍</span>
                        <span>${item.location}</span>
                    </div>
                    <div class="meta-item">
                        <span>📅</span>
                        <span>${new Date(item.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <div class="item-footer">
                <div style="font-size: 0.85rem; color: #64748b;">
                    ${getTimeAgo(item.date)}
                </div>
                <button class="contact-btn" onclick="contactOwner('${item.contact}', '${item.name}')">
                    Contact Owner
                </button>
            </div>
        </div>
    `).join('');
}

// Get relative time
function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

// Smart search with AI
function smartSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (query.length === 0) {
        filteredItems = [...items];
        document.getElementById('aiSuggestions').innerHTML = '';
    } else {
        // AI-powered fuzzy matching
        filteredItems = items.filter(item => {
            const searchableText = `${item.name} ${item.description} ${item.category} ${item.location}`.toLowerCase();
            return searchableText.includes(query);
        }).map(item => {
            // Calculate match score based on query relevance
            const nameMatch = item.name.toLowerCase().includes(query) ? 40 : 0;
            const descMatch = item.description.toLowerCase().includes(query) ? 30 : 0;
            const categoryMatch = item.category.toLowerCase().includes(query) ? 20 : 0;
            const locationMatch = item.location.toLowerCase().includes(query) ? 10 : 0;
            
            return {
                ...item,
                matchScore: Math.min(100, item.matchScore + nameMatch + descMatch + categoryMatch + locationMatch)
            };
        });

        // Show AI suggestions
        if (filteredItems.length > 0) {
            const topMatch = filteredItems.sort((a, b) => b.matchScore - a.matchScore)[0];
            document.getElementById('aiSuggestions').innerHTML = `
                <div class="ai-suggestions">
                    <div class="suggestion-title">🤖 AI Suggestion</div>
                    <div>Found ${filteredItems.length} potential matches. Best match: <strong>${topMatch.name}</strong> (${topMatch.matchScore}% match)</div>
                </div>
            `;
        }
    }
    
    applyFilters();
}

// Apply filters
function applyFilters() {
    let result = [...filteredItems];
    
    const category = document.getElementById('categoryFilter').value;
    const type = document.getElementById('typeFilter').value;
    const location = document.getElementById('locationFilter').value.toLowerCase();
    const date = document.getElementById('dateFilter').value;
    const sort = document.getElementById('sortFilter').value;
    
    if (category) {
        result = result.filter(item => item.category === category);
    }
    
    if (type) {
        result = result.filter(item => item.type === type);
    }
    
    if (location) {
        result = result.filter(item => item.location.toLowerCase().includes(location));
    }
    
    if (date) {
        result = result.filter(item => item.date >= date);
    }
    
    // Sorting
    if (sort === 'recent') {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'match') {
        result.sort((a, b) => b.matchScore - a.matchScore);
    }
    
    displayItems(result);
}

// Open report modal
function openReportModal(type) {
    document.getElementById('reportModal').classList.add('active');
    document.getElementById('reportType').value = type;
    document.getElementById('modalTitle').textContent = type === 'lost' ? 'Report Lost Item' : 'Report Found Item';
}

// Close modal
function closeModal() {
    document.getElementById('reportModal').classList.remove('active');
    document.getElementById('reportForm').reset();
    uploadedImage = null;
    document.getElementById('imagePreview').innerHTML = '';
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage = e.target.result;
            document.getElementById('imagePreview').innerHTML = `
                <img src="${e.target.result}" style="max-width: 100%; margin-top: 1rem; border-radius: 10px;">
            `;
        };
        reader.readAsDataURL(file);
    }
}

// Submit report
function submitReport(event) {
    event.preventDefault();
    
    const icons = {
        'Electronics': '📱',
        'Clothing': '👕',
        'Accessories': '🎒',
        'Documents': '📄',
        'Keys': '🔑',
        'Wallet/Purse': '💳',
        'Jewelry': '💎',
        'Pet': '🐕',
        'Other': '📦'
    };
    
    const newItem = {
        id: items.length + 1,
        type: document.getElementById('reportType').value,
        name: document.getElementById('itemName').value,
        category: document.getElementById('itemCategory').value,
        description: document.getElementById('itemDescription').value,
        location: document.getElementById('itemLocation').value,
        date: document.getElementById('itemDate').value,
        contact: document.getElementById('itemContact').value,
        reward: document.getElementById('itemReward').value || null,
        matchScore: Math.floor(Math.random() * 20) + 80,
        icon: icons[document.getElementById('itemCategory').value] || '📦',
        image: uploadedImage
    };
    
    items.unshift(newItem);
    filteredItems = [...items];
    
    closeModal();
    showNotification(`${newItem.type === 'lost' ? 'Lost' : 'Found'} item reported successfully! 🎉`);
    
    updateStats();
    displayItems();
    
    // Simulate AI matching notification after 2 seconds
    setTimeout(() => {
        showNotification('🤖 AI found 3 potential matches! Check your email.');
    }, 2000);
}

// Contact owner
function contactOwner(contact, itemName) {
    showNotification(`Contact information copied: ${contact}`);
    navigator.clipboard.writeText(contact);
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    document.getElementById('notificationText').textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    displayItems();
    
    // Set today's date as max for date inputs
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('itemDate').max = today;
    document.getElementById('dateFilter').max = today;
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('reportModal');
    if (event.target === modal) {
        closeModal();
    }
}
