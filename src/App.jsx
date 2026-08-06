import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false); 
  const [lang, setLang] = useState('tr');

  // Çeviri Sözlüğü (Projeler Eklendi)
  const t = {
    tr: {
      title: "Full-Stack Geliştirici",
      bio: "React, Tailwind CSS, Python, Laravel, Flutter ve Node.js ile modüler uçtan uca sistemler geliştiriyorum.",
      location: "Keşan, Edirne",
      cert1: "Yazılım Stajı",
      cert2: "Yazılım Yönetimi",
      projectsTitle: "Öne Çıkan Projeler",
      p1Title: "TeknoMarket",
      p1Desc: "Laravel ve Tailwind CSS ile MVC mimarisinde geliştirilmiş e-ticaret platformu.",
      p2Title: "AuraShop",
      p2Desc: "React admin paneli ve Flutter mobil uygulamasına sahip e-ticaret ekosistemi.",
      p3Title: "NovaStore",
      p3Desc: "Node.js ve EJS tabanlı veri tabanı mimarisi ve ziyaretçi defteri modülü.",
      saveContact: "Kişiyi Kaydet",
      sendMessage: "Mesaj Yaz",
      portfolio: "Portfolyo",
      website: "Web Sitesi",
      bankDetails: "Banka Bilgileri",
      copyIban: "IBAN Kopyala",
      copied: "Kopyalandı!",
      shareProfile: "Profili Paylaş",
      qrDesc: "NFC okuyamayan cihazlar için kamerayı açık tutarak bu kodu okutun.",
      copiedLink: "Kartvizit linki kopyalandı!"
    },
    en: {
      title: "Full-Stack Developer",
      bio: "Developing modular end-to-end systems with React, Tailwind CSS, Python, Laravel, Flutter, and Node.js.",
      location: "Kesan, Edirne",
      cert1: "Software Internship",
      cert2: "Software Management",
      projectsTitle: "Featured Projects",
      p1Title: "TeknoMarket",
      p1Desc: "E-commerce platform developed with Laravel and Tailwind CSS in MVC architecture.",
      p2Title: "AuraShop",
      p2Desc: "E-commerce ecosystem featuring a React dashboard and Flutter mobile app.",
      p3Title: "NovaStore",
      p3Desc: "Database architecture and guestbook module built with Node.js and EJS.",
      saveContact: "Save Contact",
      sendMessage: "Send Message",
      portfolio: "Portfolio",
      website: "Website",
      bankDetails: "Bank Details",
      copyIban: "Copy IBAN",
      copied: "Copied!",
      shareProfile: "Share Profile",
      qrDesc: "Scan this code with your camera for devices without NFC.",
      copiedLink: "Card link copied!"
    }
  };

  const text = t[lang];

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode-active');
    } else {
      document.body.classList.remove('dark-mode-active');
    }
  }, [isDarkMode]);

  const handleShare = async () => {
    const shareData = {
      title: `Okan Çakır - ${text.title}`,
      text: text.shareProfile,
      url: 'https://okancakir-kartvizit.vercel.app/' 
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Paylaşım iptal:', err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert(text.copiedLink);
    }
  };

  const handleCopyIban = () => {
    navigator.clipboard.writeText("TR78 0001 0090 1074 9596 0050 02");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveContact = () => {
    const vcardData = `BEGIN:VCARD\nVERSION:3.0\nFN:Okan Çakır\nTITLE:${text.title}\nTEL;TYPE=WORK,VOICE:+905432156915\nEMAIL:okancakir3579@gmail.com\nURL:https://okancakir.vercel.app/\nEND:VCARD`;
    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Okan_Cakir.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleLanguage = () => {
    setLang(lang === 'tr' ? 'en' : 'tr');
  };

  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      
      <div className="card-container glass-effect">
        
        <div className="top-bar">
          <div className="icon-btn lang-btn" onClick={toggleLanguage} title="Dil Değiştir / Change Language">
            {lang === 'tr' ? 'EN' : 'TR'}
          </div>
          <div className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)} title="Tema Değiştir">
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </div>
          <div className="icon-btn" onClick={handleShare} title={text.shareProfile}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </div>
          <div className="icon-btn" onClick={() => setShowQR(true)} title="QR Kod Göster">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </div>
        </div>

        <div className="profile-section fade-in">
          <div className="img-wrapper">
            <img src="/1.jpeg" alt="Okan Çakır Profil" className="profile-img" />
          </div>
          <div className="name-container">
            <h1 className="name">Okan Çakır</h1>
            <svg className="verified-badge" width="22" height="22" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          
          <div className="location-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {text.location}
          </div>

          <h2 className="title">{text.title}</h2>
          <p className="bio">{text.bio}</p>
          
          <div className="certificates-container">
            <span className="cert-chip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              {text.cert1}
            </span>
            <span className="cert-chip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              {text.cert2}
            </span>
          </div>
        </div>

        <div className="tech-stack-container">
          <div className="marquee">
            <div className="marquee-content">
              <div className="tech-chip">⚛️ React</div>
              <div className="tech-chip">🌊 Tailwind</div>
              <div className="tech-chip">🐍 Python</div>
              <div className="tech-chip">🐘 Laravel</div>
              <div className="tech-chip">📱 Flutter</div>
              <div className="tech-chip">🟢 Node.js</div>
              <div className="tech-chip">🗄️ MSSQL</div>
              <div className="tech-chip">⚛️ React</div>
              <div className="tech-chip">🌊 Tailwind</div>
              <div className="tech-chip">🐍 Python</div>
              <div className="tech-chip">🐘 Laravel</div>
              <div className="tech-chip">📱 Flutter</div>
              <div className="tech-chip">🟢 Node.js</div>
              <div className="tech-chip">🗄️ MSSQL</div>
            </div>
          </div>
        </div>

        {/* ÖNE ÇIKAN PROJELER VİTRİNİ */}
        <div className="projects-section slide-up-1">
          <h3 className="section-title">{text.projectsTitle}</h3>
          <div className="projects-scroll">
            
            <div className="project-card">
              <div className="project-header">
                <div className="project-icon bg-laravel">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <div className="project-title">{text.p1Title}</div>
              </div>
              <p className="project-desc">{text.p1Desc}</p>
              <div className="project-tags">
                <span>PHP</span><span>Laravel</span><span>Tailwind</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <div className="project-icon bg-react">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </div>
                <div className="project-title">{text.p2Title}</div>
              </div>
              <p className="project-desc">{text.p2Desc}</p>
              <div className="project-tags">
                <span>React</span><span>Flutter</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <div className="project-icon bg-node">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                </div>
                <div className="project-title">{text.p3Title}</div>
              </div>
              <p className="project-desc">{text.p3Desc}</p>
              <div className="project-tags">
                <span>Node.js</span><span>SQL</span>
              </div>
            </div>

          </div>
        </div>
        
        <div className="action-buttons slide-up-1">
          <button className="btn-primary pulse-anim" onClick={handleSaveContact}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            {text.saveContact}
          </button>
          <button className="btn-secondary" onClick={() => window.open('https://wa.me/905432156915', '_blank')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            {text.sendMessage}
          </button>
        </div>

        <div className="social-grid slide-up-2">
          <a href="https://www.instagram.com/okan.cakir22/" className="social-card instagram-hover" target="_blank" rel="noopener noreferrer">
            <div className="social-icon bg-instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
            <div className="social-text">
              <div className="social-name">Instagram</div>
              <div className="social-username">@okan.cakir22</div>
            </div>
          </a>
          
          <a href="https://github.com/okan-cakir-dev" className="social-card github-hover" target="_blank" rel="noopener noreferrer">
            <div className="social-icon bg-github">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </div>
            <div className="social-text">
              <div className="social-name">GitHub</div>
              <div className="social-username">@okan-cakir-dev</div>
            </div>
          </a>
          
          <a href="https://www.linkedin.com/in/okan-%C3%A7ak%C4%B1r-270b96377/" className="social-card linkedin-hover" target="_blank" rel="noopener noreferrer">
            <div className="social-icon bg-linkedin">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            <div className="social-text">
              <div className="social-name">LinkedIn</div>
              <div className="social-username">Okan Çakır</div>
            </div>
          </a>

          <a href="https://okancakir.vercel.app/" className="social-card website-hover" target="_blank" rel="noopener noreferrer">
            <div className="social-icon bg-website">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div className="social-text">
              <div className="social-name">{text.portfolio}</div>
              <div className="social-username">{text.website}</div>
            </div>
          </a>
        </div>

        <div className="iban-card slide-up-3">
          <div className="iban-header">
            <span>{text.bankDetails}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
          </div>
          <div className="iban-number">TR78 0001 0090 1074 9596 0050 02</div>
          <button className={`btn-copy ${copied ? 'btn-success' : ''}`} onClick={handleCopyIban}>
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"></path></svg>
                {text.copied}
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                {text.copyIban}
              </>
            )}
          </button>
        </div>
      </div>

      {showQR && (
        <div className="qr-modal-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowQR(false)}>✖</button>
            <h3 className="qr-title">{text.shareProfile}</h3>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://okancakir-kartvizit.vercel.app/" alt="QR Kod" className="qr-image" />
            <p className="qr-desc">{text.qrDesc}</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default App