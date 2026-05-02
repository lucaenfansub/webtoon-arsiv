const urlParams = new URLSearchParams(window.location.search);
const adminModu = urlParams.get('ozel') === 'lucaen2222#';

const bolumler = [
    { no: 1,  url: "izle_bolum_1.html" },
    { no: 2,  url: "izle_bolum_2.html" },
    { no: 3,  url: "izle_bolum_3.html" },
    { no: 4,  url: "izle_bolum_4.html" },
    { no: 5,  url: "izle_bolum_5.html" },
    { no: 6,  url: "izle_bolum_6.html" },
    { no: 7,  url: "izle_bolum_7.html" },
    { no: 8,  url: "izle_bolum_8.html" },
    { no: 9,  url: "izle_bolum_9.html" },
    { no: 10, url: "izle_bolum_10.html" },
    { no: 11, url: "izle_bolum_11.html" },
    { no: 12, url: "izle_bolum_12.html" },
    { no: 13, url: "izle_bolum_13.html" },
    { no: 14, url: "izle_bolum_14.html" },
    { no: 15, url: "izle_bolum_15.html" }
];

function menuyuHazirla() {
    const butonGrubu = document.querySelector('.ust-buton-grubu');
    if (!butonGrubu) return;

    const konteyner = document.createElement('div');
    konteyner.className = 'secici-konteyner';
    konteyner.innerHTML = `
        <div class="hamburger-buton">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <line x1="3" y1="6"  x2="21" y2="6"  stroke-linecap="round"></line>
                <line x1="3" y1="12" x2="21" y2="12" stroke-linecap="round"></line>
                <line x1="3" y1="18" x2="21" y2="18" stroke-linecap="round"></line>
            </svg>
        </div>
        <div class="secici-dropdown">
            <div class="secici-liste"></div>
        </div>
    `;

    butonGrubu.insertBefore(konteyner, butonGrubu.firstChild);

    konteyner.querySelector('.hamburger-buton').addEventListener('click', function(e) {
        e.stopPropagation();
        konteyner.querySelector('.secici-dropdown').classList.toggle('acik');
    });

    const liste = konteyner.querySelector('.secici-liste');
    bolumler.slice().reverse().forEach(b => {
        const kilitliMi = b.kilitli && !adminModu;
        const a = document.createElement('a');
        a.href = kilitliMi ? '#' : b.url;
        a.textContent = "Bölüm " + b.no + (kilitliMi ? " 🔒" : "");
        if (kilitliMi) {
            a.style.opacity = "0.5";
            a.addEventListener('click', e => {
                e.preventDefault();
                alert('Bu bölüm henüz gizli! 🔒');
            });
        }
        if (window.location.pathname.includes(b.url)) {
            a.classList.add('aktif');
        }
        liste.appendChild(a);
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.secici-konteyner')) {
            const dropdown = document.querySelector('.secici-dropdown');
            if (dropdown) dropdown.classList.remove('acik');
        }
    });
}

function karBaslat() {
    const canvas = document.getElementById('snowCanvas') || document.getElementById('kar-tuvali');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, petals = [];
    
    // Çiçek görselini tanımla
    const flowerImg = new Image();
    flowerImg.src = 'kp2_dm_2.gif'; // Dosya adının doğruluğundan emin ol

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Petal {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height; 
            this.size = Math.random() * 12 + 10; // Çiçek boyutu
            this.speed = Math.random() * 0.4 + 0.2; // Çok yavaş süzülme
            this.angle = Math.random() * 360;
            this.spin = Math.random() * 0.8 - 0.4; // Hafif dönme efekti
            this.horizontalShift = Math.random() * 0.5 - 0.25; // Çok hafif sağa-sola salınım
            this.opacity = Math.random() * 0.5 + 0.2; // %20 ile %70 arası şeffaflık (görünmezlik hissi için)
        }
        update() {
            this.y += this.speed;
            this.x += this.horizontalShift;
            this.angle += this.spin;

            if (this.y > height) {
                this.y = -20;
                this.x = Math.random() * width;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity; // Neredeyse görünmeyen etkiyi sağlar
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);
            
            // Görseli çiz (Görsel yüklenmişse)
            if (flowerImg.complete) {
                ctx.drawImage(flowerImg, -this.size/2, -this.size/2, this.size, this.size);
            }

            ctx.restore();
        }
    }

    // Ekranda aynı anda süzülen çiçek sayısı
    for (let i = 0; i < 40; i++) petals.push(new Petal());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    animate();
}

window.addEventListener('DOMContentLoaded', () => {
    menuyuHazirla();
    karBaslat();
});
