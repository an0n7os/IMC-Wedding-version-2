import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { siteMeta } from '../data/portfolio';

const SERVICES = [
  'Wedding Film',
  'Wedding Photography',
  'Engagement Shoot',
  'Magazine Album',
  'Brand Concept Shoot',
];

const EMPTY_FORM = {
  names: '',
  email: '',
  phone: '',
  date: '',
  location: '',
  vision: '',
};

const Inquire = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [services, setServices] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isSubmitted) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isSubmitted]);

  const set = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleService = (name) =>
    setServices((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));

  // Progress reflects the fields we actually need to quote a commission.
  const tracked = ['names', 'email', 'date', 'location', 'vision'];
  const completed = tracked.filter((f) => formData[f].trim().length > 1).length + (services.length ? 1 : 0);
  const progress = Math.round((completed / (tracked.length + 1)) * 100);

  useGSAP(() => {
    gsap.fromTo(
      '.inquire-shutter',
      { scaleY: 1 },
      { scaleY: 0, duration: 1.4, ease: 'expo.inOut', transformOrigin: 'top' }
    );
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const lines = [
      'Hi IMC Weddings, we would love to commission you.',
      '',
      `Names: ${formData.names}`,
      `Email: ${formData.email}`,
      formData.phone && `Phone: ${formData.phone}`,
      `Date: ${formData.date || 'Not decided yet'}`,
      `Location: ${formData.location}`,
      services.length && `Looking for: ${services.join(', ')}`,
      '',
      `About our day: ${formData.vision}`,
    ].filter(Boolean);

    window.open(
      `https://wa.me/${siteMeta.contact.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener'
    );

    setIsProcessing(false);
    setIsSubmitted(true);
  };

  return (
    <div ref={containerRef} className="inquire-page">
      <div className="inquire-shutter" />

      {/* LEFT: cinematic frame + direct contact fallbacks */}
      <aside className="inquire-visual-pane d-none-mobile">
        <img
          src="/images/DSC09779.jpeg"
          alt=""
          className="inquire-visual-img"
          fetchPriority="high"
        />
        <div className="inquire-visual-scrim" />

        <div className="inquire-visual-content">
          <span className="inquire-eyebrow">Kerala &amp; Dubai — Bookings {new Date().getFullYear()}</span>
          <p className="inquire-visual-quote">
            We only take a limited number of weddings each year, so every couple gets our full attention.
          </p>

          <div className="inquire-direct">
            <span className="inquire-direct-label">Prefer to talk first?</span>
            <a href={`https://wa.me/${siteMeta.contact.indiaDesk.wa}`} target="_blank" rel="noopener noreferrer" className="inquire-direct-link">
              Kerala — {siteMeta.contact.indiaDesk.display}
            </a>
            <a href={`https://wa.me/${siteMeta.contact.uaeDesk.wa}`} target="_blank" rel="noopener noreferrer" className="inquire-direct-link">
              Dubai — {siteMeta.contact.uaeDesk.display}
            </a>
            <a href={`mailto:${siteMeta.contact.email}`} className="inquire-direct-link">
              {siteMeta.contact.email}
            </a>
          </div>
        </div>
      </aside>

      {/* RIGHT: the form */}
      <div className="inquire-form-pane">
        <header className="inquire-header">
          <span className="inquire-eyebrow">Get In Touch</span>
          <h1 className="inquire-title">
            Tell us about<br />
            <span className="inquire-title-accent">your day.</span>
          </h1>
          <p className="inquire-lede">
            A few details is all we need. We reply within 24 hours with availability and a quote.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="inquire-form"
            >
              <div className="inquire-progress" aria-hidden="true">
                <div className="inquire-progress-track">
                  <motion.div
                    className="inquire-progress-fill"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  />
                </div>
                <span className="inquire-progress-value">{progress}%</span>
              </div>

              <div className="inquire-field">
                <label htmlFor="names">Your names</label>
                <input id="names" name="names" type="text" required autoComplete="name"
                  placeholder="Aisha & Rahul" value={formData.names} onChange={set('names')} />
              </div>

              <div className="inquire-row">
                <div className="inquire-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email"
                    placeholder="you@example.com" value={formData.email} onChange={set('email')} />
                </div>
                <div className="inquire-field">
                  <label htmlFor="phone">Phone <span className="inquire-optional">optional</span></label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel"
                    placeholder="+91 00000 00000" value={formData.phone} onChange={set('phone')} />
                </div>
              </div>

              <div className="inquire-row">
                <div className="inquire-field">
                  <label htmlFor="date">Wedding date</label>
                  <input id="date" name="date" type="date" value={formData.date} onChange={set('date')} />
                </div>
                <div className="inquire-field">
                  <label htmlFor="location">Location</label>
                  <input id="location" name="location" type="text" required
                    placeholder="Kochi, Kerala" value={formData.location} onChange={set('location')} />
                </div>
              </div>

              <fieldset className="inquire-field inquire-chips-wrap">
                <legend>What are you looking for?</legend>
                <div className="inquire-chips">
                  {SERVICES.map((name) => (
                    <button
                      type="button"
                      key={name}
                      onClick={() => toggleService(name)}
                      aria-pressed={services.includes(name)}
                      className={`inquire-chip ${services.includes(name) ? 'is-active' : ''}`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="inquire-field">
                <label htmlFor="vision">Tell us about your day</label>
                <textarea id="vision" name="vision" rows={4} required
                  placeholder="The traditions that matter, the people, the feeling you want to remember…"
                  value={formData.vision} onChange={set('vision')} />
              </div>

              <div className="inquire-submit-row">
                <button type="submit" disabled={isProcessing} className="monogram-seal-btn interactive">
                  <span className="monogram-inner">IMC</span>
                </button>
                <div className="inquire-submit-copy">
                  <span className="inquire-submit-title">Send your inquiry</span>
                  <span className="inquire-submit-note">
                    Opens WhatsApp with your details filled in — just press send.
                  </span>
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="inquire-success"
            >
              <div className="inquire-success-rule" />
              <h2 className="inquire-success-title">
                Almost<br /><span className="inquire-title-accent">There.</span>
              </h2>
              <p className="inquire-success-copy">
                Your details have opened in WhatsApp — press send and it reaches our studio directly.
                If the window did not open, write to us at{' '}
                <a href={`mailto:${siteMeta.contact.email}`}>{siteMeta.contact.email}</a>.
              </p>
              <div className="inquire-success-actions">
                <Link to="/" className="interactive inquire-direct-link">Back to Home</Link>
                <button
                  type="button"
                  className="interactive inquire-direct-link inquire-reset"
                  onClick={() => { setIsSubmitted(false); setFormData(EMPTY_FORM); setServices([]); }}
                >
                  Send another inquiry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .inquire-page {
          background: var(--color-bg);
          color: var(--color-ivory);
          min-height: 100vh;
          display: flex;
          position: relative;
        }

        .inquire-shutter {
          position: fixed;
          inset: 0;
          background: var(--color-gold);
          z-index: 10000;
          pointer-events: none;
        }

        /* ── Left visual pane ── */
        .inquire-visual-pane {
          width: 45%;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          overflow: hidden;
          border-right: 1px solid rgba(212, 175, 55, 0.12);
        }

        .inquire-visual-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.32) contrast(1.1) grayscale(0.35);
        }

        .inquire-visual-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 55%),
                      linear-gradient(to right, transparent 65%, var(--color-bg) 100%);
        }

        .inquire-visual-content {
          position: absolute;
          inset: auto 4rem 4rem 4rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .inquire-visual-quote {
          font-family: var(--font-serif-elegant);
          font-style: italic;
          font-size: 1.35rem;
          line-height: 1.7;
          color: rgba(252, 250, 248, 0.75);
          max-width: 26rem;
        }

        .inquire-direct {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(252, 250, 248, 0.08);
        }

        .inquire-direct-label {
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--color-taupe);
          margin-bottom: 0.4rem;
        }

        .inquire-direct-link {
          font-size: 0.75rem;
          letter-spacing: 1.5px;
          color: var(--color-gold);
          text-decoration: none;
          width: fit-content;
          border-bottom: 1px solid transparent;
          transition: border-color 0.4s var(--ease-cinematic), opacity 0.4s var(--ease-cinematic);
        }

        .inquire-direct-link:hover {
          border-bottom-color: var(--color-gold);
        }

        /* ── Right form pane ── */
        .inquire-form-pane {
          width: 55%;
          margin-left: 45%;
          min-height: 100vh;
          padding: 14vh 6vw 10vh 6vw;
        }

        .inquire-eyebrow {
          font-family: var(--font-body);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 6px;
          color: var(--color-gold);
          display: block;
        }

        .inquire-header { margin-bottom: 5rem; }

        .inquire-title {
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 5vw, 4.5rem);
          line-height: 1;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin: 2rem 0 1.8rem;
        }

        .inquire-title-accent {
          font-style: italic;
          color: var(--color-gold);
        }

        .inquire-lede {
          font-size: 1rem;
          line-height: 1.9;
          color: var(--color-text-muted);
          max-width: 34rem;
        }

        .inquire-form {
          display: flex;
          flex-direction: column;
          gap: 2.8rem;
          max-width: 40rem;
        }

        /* Progress */
        .inquire-progress {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .inquire-progress-track {
          flex: 1;
          height: 1px;
          background: rgba(252, 250, 248, 0.1);
        }

        .inquire-progress-fill {
          height: 100%;
          background: var(--color-gold);
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.5);
        }

        .inquire-progress-value {
          font-size: 0.55rem;
          letter-spacing: 2px;
          color: var(--color-taupe);
          min-width: 2.5rem;
          text-align: right;
        }

        /* Fields */
        .inquire-field {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          border: none;
          padding: 0;
          margin: 0;
          min-width: 0;
        }

        .inquire-field label,
        .inquire-field legend {
          font-family: var(--font-body);
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--color-taupe);
          padding: 0;
        }

        .inquire-optional {
          text-transform: none;
          letter-spacing: 1px;
          opacity: 0.5;
          font-style: italic;
        }

        .inquire-field input,
        .inquire-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(252, 250, 248, 0.16);
          padding: 0.7rem 0;
          font-family: var(--font-serif-elegant);
          font-size: 1.2rem;
          color: var(--color-ivory);
          outline: none;
          border-radius: 0;
          color-scheme: dark;
          transition: border-color 0.4s var(--ease-cinematic);
        }

        .inquire-field textarea {
          resize: vertical;
          line-height: 1.7;
          min-height: 6rem;
        }

        .inquire-field input:focus,
        .inquire-field textarea:focus {
          border-bottom-color: var(--color-gold);
        }

        .inquire-field input::placeholder,
        .inquire-field textarea::placeholder {
          color: rgba(252, 250, 248, 0.22);
          font-style: italic;
          font-size: 0.95rem;
        }

        .inquire-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }

        /* Service chips */
        .inquire-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
        }

        .inquire-chip {
          background: transparent;
          border: 1px solid rgba(252, 250, 248, 0.16);
          color: var(--color-text-muted);
          font-family: var(--font-body);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 0.75rem 1.3rem;
          cursor: pointer;
          transition: border-color 0.4s var(--ease-cinematic),
                      color 0.4s var(--ease-cinematic),
                      background-color 0.4s var(--ease-cinematic);
        }

        .inquire-chip:hover {
          border-color: rgba(212, 175, 55, 0.5);
          color: var(--color-ivory);
        }

        .inquire-chip.is-active {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-bg);
        }

        /* Submit */
        .inquire-submit-row {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          margin-top: 1.5rem;
        }

        .monogram-seal-btn {
          width: 92px;
          height: 92px;
          flex-shrink: 0;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
        }

        .monogram-inner {
          width: 100%;
          height: 100%;
          border: 1px solid var(--color-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          letter-spacing: 2px;
          color: var(--color-gold);
          background: rgba(212, 175, 55, 0.02);
          transition: all 0.5s var(--ease-cinematic);
        }

        .monogram-seal-btn:hover .monogram-inner {
          background: var(--color-gold);
          color: var(--color-bg);
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.28);
        }

        .monogram-seal-btn:active .monogram-inner { transform: scale(0.95); }
        .monogram-seal-btn:disabled { opacity: 0.4; cursor: default; }

        .inquire-submit-copy {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .inquire-submit-title {
          font-size: 0.65rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--color-gold);
        }

        .inquire-submit-note {
          font-size: 0.75rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          max-width: 20rem;
        }

        /* Success */
        .inquire-success { max-width: 34rem; }
        .inquire-success-rule { width: 50px; height: 1px; background: var(--color-gold); margin-bottom: 3rem; }

        .inquire-success-title {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          line-height: 1.1;
          font-weight: 300;
          margin-bottom: 2rem;
        }

        .inquire-success-copy {
          font-size: 1.05rem;
          line-height: 2;
          color: var(--color-text-muted);
        }

        .inquire-success-copy a { color: var(--color-gold); }

        .inquire-success-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 2.5rem;
          margin-top: 4rem;
        }

        .inquire-reset {
          background: none;
          border: none;
          padding: 0;
          font-family: var(--font-body);
          cursor: pointer;
        }

        @media (max-width: 991px) {
          .inquire-visual-pane { display: none; }
          .inquire-form-pane {
            width: 100%;
            margin-left: 0;
            padding: 16vh 6vw 8vh 6vw;
          }
          .inquire-header { margin-bottom: 3.5rem; }
          .inquire-row { grid-template-columns: 1fr; gap: 2.8rem; }
          .inquire-submit-row { gap: 1.5rem; }
          .monogram-seal-btn { width: 76px; height: 76px; }
        }
      `}</style>
    </div>
  );
};

export default Inquire;
