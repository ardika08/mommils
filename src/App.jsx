import { useEffect, useState } from 'react'
import { eventData, slides } from './data/eventData.js'

const ArrowIcon = ({ direction = 'right' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={direction === 'right' ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5m6 6-6-6 6-6'} />
  </svg>
)

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 3v3m12-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
  </svg>
)

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

const MenuIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={open ? 'M5 5l14 14M19 5 5 19' : 'M4 7h16M4 12h16M4 17h16'} />
  </svg>
)

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2c.6 5.8 4.2 9.4 10 10-5.8.6-9.4 4.2-10 10-.6-5.8-4.2-9.4-10-10 5.8-.6 9.4-4.2 10-10Z" />
  </svg>
)

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Mommils Family Fest homepage">
      <span className="logo-mark"><span>M</span></span>
      <span className="logo-copy">
        <strong>Mommils</strong>
        <small>Family Fest 2026</small>
      </span>
    </a>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    ['Home', '#home'],
    ['Keseruan', '#highlights'],
    ['Kontak', '#contact'],
  ]

  return (
    <header className="site-header">
      <nav className="navbar page-shell" aria-label="Navigasi utama">
        <Logo />
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="button button-small nav-ticket" href={eventData.ticketUrl} target="_blank" rel="noreferrer">
            Beli Tiket
          </a>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>
    </header>
  )
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(interval)
  }, [])

  const moveSlide = (direction) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <section className="hero" id="home" aria-label="Mommils Family Fest 2026">
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            className={`hero-slide ${index === activeSlide ? 'is-active' : ''}`}
            key={slide.image}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden={index !== activeSlide}
          />
        ))}
      </div>
      <div className="hero-wash" />
      <div className="hero-doodle hero-doodle-one">✦</div>
      <div className="hero-doodle hero-doodle-two">○</div>
      <div className="page-shell hero-content">
        <div className="hero-copy" key={activeSlide}>
          <div className="eyebrow"><SparkIcon /> {slides[activeSlide].eyebrow}</div>
          <p className="hero-year">Mommils Family Fest <strong>2026</strong></p>
          <h1>{slides[activeSlide].title}</h1>
          <p className="hero-description">{slides[activeSlide].description}</p>
          <div className="event-meta">
            <span><CalendarIcon /> {eventData.dateLabel}</span>
            <span><PinIcon /> {eventData.venue}</span>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href={eventData.ticketUrl} target="_blank" rel="noreferrer">
              Beli Tiket Sekarang <ArrowIcon />
            </a>
            <a className="text-link" href="#highlights">Lihat keseruan acara <span>↓</span></a>
          </div>
        </div>
      </div>
      <div className="hero-controls page-shell">
        <div className="slide-dots" aria-label="Pilih slide">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.title}
              className={index === activeSlide ? 'is-active' : ''}
              onClick={() => setActiveSlide(index)}
              aria-label={`Tampilkan slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="slide-arrows">
          <button type="button" onClick={() => moveSlide(-1)} aria-label="Slide sebelumnya"><ArrowIcon direction="left" /></button>
          <button type="button" onClick={() => moveSlide(1)} aria-label="Slide berikutnya"><ArrowIcon /></button>
        </div>
      </div>
    </section>
  )
}

function getTimeLeft() {
  const difference = new Date(eventData.date).getTime() - Date.now()
  if (difference <= 0) return null
  return {
    Hari: Math.floor(difference / 86400000),
    Jam: Math.floor((difference / 3600000) % 24),
    Menit: Math.floor((difference / 60000) % 60),
    Detik: Math.floor((difference / 1000) % 60),
  }
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="countdown-wrap" aria-label="Hitung mundur acara">
      <div className="page-shell countdown-card">
        <div className="countdown-intro">
          <span className="section-kicker">Save the date</span>
          <h2>Keseruannya dimulai dalam</h2>
        </div>
        {timeLeft ? (
          <div className="countdown-grid">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div className="time-unit" key={label}>
                <strong>{String(value).padStart(2, '0')}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        ) : <p className="event-live">Saatnya bersenang-senang. Event telah dimulai!</p>}
      </div>
    </section>
  )
}

const highlights = [
  { number: '01', icon: '✦', title: 'Presale Ultimate Baby Shower', text: 'Eksplorasi permainan aktif, sensory play, dan zona petualangan yang aman.' },
  { number: '02', icon: '♫', title: 'Presale Super Mommils Race', text: 'Musik, pertunjukan interaktif, dan karakter favorit yang menghibur seharian.' },
  { number: '03', icon: '◎', title: 'Presale Mommils Gala & Award Night', text: 'Aktivitas hands-on untuk mengasah kreativitas dan rasa ingin tahu si kecil.' },
  { number: '04', icon: '♡', title: 'Couple Prenatal Yoga & Edukasi Persalinan', text: 'Pilihan produk keluarga, kuliner lezat, dan brand lokal pilihan dalam satu tempat.' },
]

function Highlights() {
  return (
    <section className="section highlights" id="highlights">
      <div className="page-shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Ada apa di MFF 2026?</span>
            <h2>Seharian penuh<br /><em>happy moments.</em></h2>
          </div>
          <p>Satu festival dengan begitu banyak cara untuk bermain, belajar, dan makin dekat bersama keluarga.</p>
        </div>
        <div className="highlight-grid">
          {highlights.map((item) => (
            <article className="highlight-card" key={item.title}>
              <span className="card-number">{item.number}</span>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TicketCta() {
  return (
    <section className="ticket-section">
      <div className="page-shell ticket-card">
        <span className="ticket-badge">Tiket terbatas</span>
        <div className="ticket-copy">
          <span className="section-kicker">See you at the festival!</span>
          <h2>Siap bikin kenangan<br />baru bareng keluarga?</h2>
        </div>
        <div className="ticket-action">
          <p>Amankan tiketmu sekarang dan nikmati pengalaman keluarga paling seru di tahun 2026.</p>
          <a className="button button-light" href={eventData.ticketUrl} target="_blank" rel="noreferrer">
            Beli Tiket Sekarang <ArrowIcon />
          </a>
        </div>
        <span className="ticket-spark spark-one">✦</span>
        <span className="ticket-spark spark-two">✦</span>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="page-shell footer-main">
        <div className="footer-brand">
          <Logo />
          <p>Merayakan cinta, tawa, dan setiap momen kecil yang membuat keluarga begitu istimewa.</p>
        </div>
        <div className="footer-column">
          <strong>Jelajahi</strong>
          <a href="#home">Home</a>
          <a href="#highlights">Keseruan</a>
          <a href="#contact">Kontak</a>
        </div>
        <div className="footer-column">
          <strong>Hubungi Kami</strong>
          <a href={`mailto:${eventData.email}`}>{eventData.email}</a>
          <a href={eventData.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <span>Jakarta, Indonesia</span>
        </div>
        <div className="footer-column footer-event">
          <strong>Event</strong>
          <span>{eventData.dateLabel}</span>
          <span>{eventData.timeLabel}</span>
          <span>{eventData.venue}</span>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© 2026 Mommils Family Fest. All rights reserved.</span>
        <span>Made with love for every family.</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Highlights />
        <TicketCta />
      </main>
      <Footer />
    </>
  )
}
