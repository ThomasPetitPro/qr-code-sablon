// ===== RENDER BOUTIQUE CARDS =====

const grid = document.getElementById('boutiques-grid');
const overlay = document.getElementById('modal-overlay');

function renderCards(filter = 'all') {
    const filtered = filter === 'all'
        ? boutiques
        : boutiques.filter(b => b.category === filter);

    grid.innerHTML = filtered.map(b => `
        <article class="card" data-id="${b.id}">
            <div class="card-img" style="background-image:url('${b.image}')">
                <span class="card-category">${b.categoryLabel}</span>
            </div>
            <div class="card-body">
                <h3 class="card-name">${b.name}</h3>
                <p class="card-desc">${b.shortDesc}</p>
            </div>
        </article>
    `).join('');

    // Attach click events
    grid.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => openModal(Number(card.dataset.id)));
    });
}

// ===== FILTERS =====

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCards(btn.dataset.filter);
    });
});

// ===== MODAL =====

function openModal(id) {
    const b = boutiques.find(x => x.id === id);
    if (!b) return;

    document.getElementById('modal-img').style.backgroundImage = `url('${b.image}')`;
    document.getElementById('modal-category').textContent = b.categoryLabel;
    document.getElementById('modal-name').textContent = b.name;
    document.getElementById('modal-description').textContent = b.description;
    document.getElementById('modal-address').textContent = b.address;
    document.getElementById('modal-hours').textContent = b.hours;

    setLink('modal-map', b.mapUrl);
    setLink('modal-phone', b.phone ? `tel:${b.phone}` : '');
    setLink('modal-website', b.website);
    setLink('modal-instagram', b.instagram);

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function setLink(id, url) {
    const el = document.getElementById(id);
    if (url) {
        el.href = url;
        el.style.display = '';
    } else {
        el.style.display = 'none';
    }
}

document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===== INIT =====
renderCards();
