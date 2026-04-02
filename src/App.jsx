import { useState, useEffect, useRef } from "react";
import content from "./content.js";

// ─── Shared ───
function useInView(t = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return [ref, v];
}

function Fade({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style,
    }}>{children}</div>
  );
}


// ═══════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0 clamp(24px, 5vw, 64px)", height: "64px",
      background: scrolled ? "rgba(255,255,255,0.98)" : "transparent",
      borderBottom: scrolled ? "1px solid var(--gray-200)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <a href="#" style={{
        textDecoration: "none", display: "flex", alignItems: "center",
      }}>
        <img src="/logo.png" alt="Sergey's Designs" style={{
          height: "32px", width: "auto",
        }} />
        <span className="nav-brand-text" style={{
          fontFamily: "'Bodoni Moda', serif",
          fontSize: "18px", color: "var(--charcoal)", fontWeight: 400, paddingLeft: "8px",
          letterSpacing: "0.02em",
        }}>
        Sergey's Designs
        </span>
      </a>
      <div className="nav-links" style={{ display: "flex", gap: "clamp(20px, 3vw, 36px)", alignItems: "center" }}>
        {[
          { label: "Work", href: "#work" },
          { label: "Pricing", href: "#pricing" },
        ].map((l) => (
          <a key={l.label} href={l.href} className="nav-link" style={{
            fontSize: "14px", fontWeight: 400, color: "var(--gray-600)", textDecoration: "none",
            transition: "color 0.2s", letterSpacing: "0.01em",
          }}
            onMouseEnter={(e) => e.target.style.color = "var(--charcoal)"}
            onMouseLeave={(e) => e.target.style.color = "var(--gray-600)"}
          >{l.label}</a>
        ))}
        <a href="#contact" className="nav-cta" style={{
          fontSize: "13px", fontWeight: 500, color: "white",
          background: "var(--accent)", borderRadius: "6px",
          padding: "9px 20px", textDecoration: "none",
          transition: "all 0.2s", letterSpacing: "0.01em",
        }}
          onMouseEnter={(e) => e.target.style.background = "var(--accent-hover)"}
          onMouseLeave={(e) => e.target.style.background = "var(--accent)"}
        >Get in touch</a>
      </div>
    </nav>
  );
}


// ═══════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════
function Hero() {
  return (
    <div style={{
      paddingTop: "clamp(140px, 18vh, 200px)",
      paddingBottom: "clamp(80px, 12vh, 140px)",
      textAlign: "center",
      position: "relative",
    }}>
      <div style={{ position: "relative", padding: "0 24px" }}>
        <div style={{ animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
          <p style={{
            fontSize: "13px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "3px", marginBottom: "24px",
            fontWeight: 500,
          }}>Restaurant Web Design</p>
          <h1 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(44px, 8vw, 88px)",
            fontWeight: 400, lineHeight: 1.05,
            color: "var(--charcoal)", marginBottom: "28px",
            maxWidth: "800px", margin: "0 auto 28px",
            letterSpacing: "-0.02em",
          }}>
            What comes after<br />a Yelp page?
          </h1>
          <p style={{
            fontSize: "clamp(17px, 2vw, 20px)",
            color: "var(--gray-600)", lineHeight: 1.7,
            maxWidth: "480px", margin: "0 auto 44px",
            fontWeight: 300,
          }}>
            {content.subtitle}
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#work" style={{
              fontSize: "15px", fontWeight: 500, color: "white",
              background: "var(--accent)", borderRadius: "8px",
              padding: "14px 36px", textDecoration: "none",
              transition: "all 0.25s",
            }}
              onMouseEnter={(e) => { e.target.style.background = "var(--accent-hover)"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.target.style.background = "var(--accent)"; e.target.style.transform = "translateY(0)"; }}
            >See my work</a>
            <a href="#pricing" style={{
              fontSize: "15px", fontWeight: 500, color: "var(--charcoal)",
              background: "transparent", border: "1.5px solid var(--gray-200)",
              borderRadius: "8px", padding: "14px 36px", textDecoration: "none",
              transition: "all 0.25s",
            }}
              onMouseEnter={(e) => e.target.style.borderColor = "var(--charcoal)"}
              onMouseLeave={(e) => e.target.style.borderColor = "var(--gray-200)"}
            >View pricing</a>
          </div>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// INTEGRATIONS ROW
// ═══════════════════════════════════════════
function Integrations() {
  return (
    <div style={{
      padding: "44px 24px 48px",
      borderTop: "1px solid var(--gray-100)",
      borderBottom: "1px solid var(--gray-100)",
    }}>
      <Fade>
        <p style={{
          textAlign: "center", fontSize: "12px", color: "var(--gray-400)",
          textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "24px",
          fontWeight: 500,
        }}>Integrates with</p>
        <div style={{
          display: "flex", justifyContent: "center", flexWrap: "wrap",
          gap: "clamp(20px, 4vw, 44px)", alignItems: "center",
          maxWidth: "800px", margin: "0 auto",
        }}>
          {content.integrations.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "7px",
              fontSize: "15px", fontWeight: 500, color: "var(--gray-600)",
              transition: "color 0.2s", cursor: "default",
              letterSpacing: "0.01em",
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--charcoal)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--gray-600)"}
            >
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: item.color, flexShrink: 0,
              }} />
              {item.name}
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
}


// ═══════════════════════════════════════════
// WHAT YOU GET
// ═══════════════════════════════════════════
function WhatYouGet() {
  const items = [
    { title: "Custom Design", text: "Unique to your brand. No templates, no cookie-cutter layouts.", marker: "01" },
    { title: "Mobile-First", text: "85% of local searches happen on phones. Your site will be flawless.", marker: "02" },
    { title: "Online Menu", text: "Beautiful and easy to browse. No more PDF downloads.", marker: "03" },
    { title: "Food Photography", text: "Your dishes front and center. The #1 thing that converts browsers to diners.", marker: "04" },
    { title: "Ordering Integration", text: "DoorDash, Uber Eats, Grubhub, and Toast, all connected directly to your site.", marker: "05" },
    { title: "Google SEO", text: "Rank when people search 'restaurants near me' in your area.", marker: "06" },
  ];

  return (
    <div style={{
      background: "var(--bg-tint)",
      padding: "clamp(64px, 10vw, 110px) clamp(24px, 5vw, 80px)",
    }}>
      <Fade>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontSize: "12px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "14px",
            fontWeight: 500,
          }}>What you get</p>
          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 400,
            letterSpacing: "-0.01em",
          }}>Everything your restaurant needs.</h2>
        </div>
      </Fade>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
        gap: "16px", maxWidth: "920px", margin: "0 auto",
      }}>
        {items.map((item, i) => (
          <Fade key={i} delay={i * 0.06}>
            <div style={{
              background: "var(--white)", borderRadius: "10px",
              padding: "32px 28px", border: "1px solid var(--gray-100)",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", height: "100%",
              cursor: "default",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gray-200)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--gray-100)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                fontSize: "11px", color: "var(--accent)", marginBottom: "16px",
                fontWeight: 600, letterSpacing: "1px",
              }}>{item.marker}</div>
              <h3 style={{
                fontSize: "18px", fontWeight: 600, marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}>{item.title}</h3>
              <p style={{
                fontSize: "15px", color: "var(--gray-600)", lineHeight: 1.65,
                fontWeight: 300,
              }}>{item.text}</p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// WORK
// ═══════════════════════════════════════════
function Work() {
  return (
    <div id="work" style={{
      padding: "clamp(64px, 10vw, 110px) clamp(24px, 5vw, 80px)",
    }}>
      <Fade>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontSize: "12px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "14px",
            fontWeight: 500,
          }}>Selected work</p>
          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 400,
            letterSpacing: "-0.01em",
          }}>Recent projects.</h2>
        </div>
      </Fade>

      <div className="scroll-track">
        {content.projects.map((p, i) => (
          <Fade key={i} delay={i * 0.1}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-card" style={{
              display: "block", textDecoration: "none", color: "inherit",
              borderRadius: "10px", overflow: "hidden",
              border: "1px solid var(--gray-100)",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gray-200)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--gray-100)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ height: "260px", overflow: "hidden", background: "var(--gray-100)" }}>
                <img src={p.image} alt={p.name} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "28px" }}>
                <p style={{
                  fontSize: "11px", color: "var(--accent)", fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px",
                }}>{p.type}</p>
                <h3 style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: "24px", fontWeight: 400, marginBottom: "10px",
                  letterSpacing: "-0.01em",
                }}>{p.name}</h3>
                <p style={{
                  fontSize: "15px", color: "var(--gray-600)", lineHeight: 1.65, marginBottom: "18px",
                  fontWeight: 300,
                }}>{p.description}</p>
                <span style={{
                  fontSize: "14px", fontWeight: 500, color: "var(--accent)",
                  letterSpacing: "0.02em",
                }}>View site &rarr;</span>
              </div>
            </a>
          </Fade>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// PRICING
// ═══════════════════════════════════════════
function Pricing() {
  return (
    <div id="pricing" style={{
      background: "var(--dark)", color: "var(--white)",
      padding: "clamp(64px, 10vw, 110px) clamp(24px, 5vw, 80px)",
    }}>
      <Fade>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontSize: "12px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "14px",
            fontWeight: 500,
          }}>Pricing</p>
          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 400,
            letterSpacing: "-0.01em",
          }}>Simple. Transparent. No surprises.</h2>
        </div>
      </Fade>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px", maxWidth: "720px", margin: "0 auto",
      }}>
        <Fade>
          <div style={{
            borderRadius: "10px", padding: "40px 32px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}>
            <p style={{
              fontSize: "11px", color: "var(--gray-400)",
              textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "20px",
              fontWeight: 500,
            }}>Website Setup</p>
            <div style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "52px", marginBottom: "4px",
              letterSpacing: "-0.02em",
            }}>${content.setupPrice}</div>
            <p style={{
              fontSize: "14px", color: "var(--gray-400)", marginBottom: "32px",
              fontWeight: 300,
            }}>One-time payment</p>
            <div style={{ fontSize: "15px", lineHeight: 2.4 }}>
              {content.setupFeatures.map((f, i) => (
                <div key={i} style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300 }}>
                  <span style={{ color: "var(--green)", marginRight: "10px" }}>&#10003;</span>{f}
                </div>
              ))}
            </div>
          </div>
        </Fade>

        <Fade delay={0.1}>
          <div style={{
            borderRadius: "10px", padding: "40px 32px",
            border: "1.5px solid var(--accent)",
            background: "rgba(37,99,235,0.04)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)",
              background: "var(--accent)", color: "white",
              fontSize: "10px", fontWeight: 600, letterSpacing: "1.5px",
              textTransform: "uppercase", padding: "4px 16px", borderRadius: "4px",
            }}>Recommended</div>
            <p style={{
              fontSize: "11px", color: "var(--gray-400)",
              textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "20px",
              fontWeight: 500,
            }}>Monthly Maintenance</p>
            <div style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: "52px", marginBottom: "4px",
              letterSpacing: "-0.02em",
            }}>
              ${content.monthlyPrice}<span style={{ fontSize: "18px", color: "var(--gray-400)", fontWeight: 300 }}>/mo</span>
            </div>
            <p style={{
              fontSize: "14px", color: "var(--gray-400)", marginBottom: "32px",
              fontWeight: 300,
            }}>Optional &middot; Cancel anytime</p>
            <div style={{ fontSize: "15px", lineHeight: 2.4 }}>
              {content.maintenanceFeatures.map((f, i) => (
                <div key={i} style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300 }}>
                  <span style={{ color: "var(--green)", marginRight: "10px" }}>&#10003;</span>{f}
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>

      <Fade>
        <p style={{
          textAlign: "center", marginTop: "36px",
          fontSize: "14px", color: "var(--gray-400)", fontStyle: "italic",
          fontWeight: 300,
        }}>
          Your domain is always yours. If you cancel, everything transfers to you. No strings attached.
        </p>
      </Fade>
    </div>
  );
}


// ═══════════════════════════════════════════
// WHY MAINTENANCE
// ═══════════════════════════════════════════
function WhyMaintenance() {
  const items = [
    { title: "Menus change.", text: "New dishes, seasonal specials, price updates. Your site stays current without you lifting a finger." },
    { title: "First impressions matter.", text: "Outdated hours or broken links cost you customers. I keep everything polished and working." },
    { title: "Google rewards fresh sites.", text: "Regular updates signal to Google that your business is active, helping you rank higher in local search." },
  ];

  return (
    <div style={{ padding: "clamp(64px, 10vw, 110px) clamp(24px, 5vw, 80px)", maxWidth: "820px", margin: "0 auto" }}>
      <Fade>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{
            fontSize: "12px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "14px",
            fontWeight: 500,
          }}>Why maintenance?</p>
          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 400,
            letterSpacing: "-0.01em",
          }}>Your site should work as hard as you do.</h2>
        </div>
      </Fade>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "40px",
      }}>
        {items.map((item, i) => (
          <Fade key={i} delay={i * 0.08}>
            <div>
              <h3 style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: "22px", fontWeight: 400, marginBottom: "10px",
                letterSpacing: "-0.01em",
              }}>{item.title}</h3>
              <p style={{ fontSize: "15px", color: "var(--gray-600)", lineHeight: 1.7, fontWeight: 300 }}>
                {item.text}
              </p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// CTA
// ═══════════════════════════════════════════
function CTA() {
  return (
    <div id="contact" style={{
      background: "var(--bg-tint)",
      padding: "clamp(72px, 12vw, 120px) clamp(24px, 5vw, 80px)",
      textAlign: "center",
    }}>
      <Fade>
        <div>
          <p style={{
            fontSize: "12px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "14px",
            fontWeight: 500,
          }}>Let's talk</p>
          <h2 style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 400,
            marginBottom: "18px", letterSpacing: "-0.01em",
          }}>Ready to get started?</h2>
          <p style={{
            fontSize: "18px", color: "var(--gray-600)", lineHeight: 1.7,
            maxWidth: "440px", margin: "0 auto 40px",
            fontWeight: 300,
          }}>
            No pressure, no pitch. Just a conversation about what your restaurant needs.
          </p>
          <div style={{
            display: "flex", flexDirection: "column",
            gap: "10px", alignItems: "center",
          }}>
            <a href={`mailto:${content.email}`} style={{
              fontSize: "16px", fontWeight: 500, color: "var(--accent)",
              textDecoration: "none", letterSpacing: "0.01em",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => e.target.style.opacity = "0.7"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >{content.email}</a>
            <a href={`tel:${content.phone.replace(/\D/g, '')}`} style={{
              fontSize: "16px", fontWeight: 400, color: "var(--charcoal)",
              textDecoration: "none",
            }}>{content.phone}</a>
          </div>
        </div>
      </Fade>
    </div>
  );
}


// ═══════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════
function Footer() {
  return (
    <>
      <div style={{
        borderTop: "1px solid var(--gray-100)",
        padding: "48px clamp(24px, 5vw, 80px)",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap",
        gap: "40px", maxWidth: "920px", margin: "0 auto",
      }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "14px", color: "var(--gray-400)" }}>Services</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2.2, fontWeight: 300 }}>Restaurant Websites</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2.2, fontWeight: 300 }}>Menu Design</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2.2, fontWeight: 300 }}>Ordering Integration</p>
        </div>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "14px", color: "var(--gray-400)" }}>Contact</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2.2, fontWeight: 300 }}>{content.email}</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2.2, fontWeight: 300 }}>{content.phone}</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2.2, fontWeight: 300 }}>{content.location}</p>
        </div>
      </div>

      <div style={{
        background: "var(--dark)", color: "var(--white)",
        padding: "56px 24px 28px", textAlign: "center",
        overflow: "hidden",
      }}>
        <div style={{
          fontFamily: "'Bodoni Moda', serif",
          fontSize: "clamp(48px, 12vw, 140px)",
          fontWeight: 400, lineHeight: 1,
          color: "rgba(255,255,255,0.05)",
          marginBottom: "28px",
          userSelect: "none",
          letterSpacing: "-0.02em",
        }}>
          Sergey's Designs
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontSize: "12px", color: "var(--gray-600)",
          maxWidth: "920px", margin: "0 auto",
          flexWrap: "wrap", gap: "12px",
          fontWeight: 300,
        }}>
          <span>&copy; {new Date().getFullYear()} Sergey's Designs</span>
          <span>{content.location}</span>
        </div>
      </div>
    </>
  );
}


// ═══════════════════════════════════════════
// APP
// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
// BACKGROUND BLOBS (persistent across scroll)
// ═══════════════════════════════════════════
function BackgroundBlobs() {
  // Blobs positioned as % of page height for consistency
  // salmon from logo: ~#E8593F, blue accent: #2563EB, purple: #7C3AED
  const blobs = [
    // Hero area
    { top: "1%", left: "-40px", w: 340, h: 220, bg: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.08))", blur: 50 },
    { top: "2%", right: "-20px", w: 300, h: 200, bg: "linear-gradient(135deg, rgba(232,89,63,0.14), rgba(249,160,80,0.08))", blur: 45 },
    { top: "5%", left: "5%", w: 220, h: 150, bg: "linear-gradient(135deg, rgba(232,89,63,0.12), rgba(124,58,237,0.06))", blur: 40 },
    // Work area
    { top: "14%", right: "2%", w: 280, h: 190, bg: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(16,185,129,0.06))", blur: 50 },
    { top: "18%", left: "-40px", w: 320, h: 210, bg: "linear-gradient(135deg, rgba(232,89,63,0.13), rgba(37,99,235,0.06))", blur: 55 },
    // Post-pricing
    { top: "42%", right: "-30px", w: 290, h: 200, bg: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(232,89,63,0.07))", blur: 50 },
    { top: "46%", left: "4%", w: 250, h: 170, bg: "linear-gradient(135deg, rgba(37,99,235,0.13), rgba(232,89,63,0.06))", blur: 45 },
    // WhyMaintenance
    { top: "58%", right: "6%", w: 270, h: 180, bg: "linear-gradient(135deg, rgba(232,89,63,0.13), rgba(124,58,237,0.06))", blur: 45 },
    { top: "62%", left: "-50px", w: 310, h: 210, bg: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(232,89,63,0.07))", blur: 55 },
    // CTA area
    { top: "72%", right: "4%", w: 260, h: 180, bg: "linear-gradient(135deg, rgba(232,89,63,0.15), rgba(249,160,80,0.08))", blur: 42 },
    { top: "76%", left: "6%", w: 280, h: 190, bg: "linear-gradient(135deg, rgba(37,99,235,0.13), rgba(124,58,237,0.07))", blur: 50 },
    // Footer area
    { top: "86%", right: "-20px", w: 240, h: 170, bg: "linear-gradient(135deg, rgba(232,89,63,0.12), rgba(37,99,235,0.06))", blur: 50 },
    { top: "90%", left: "3%", w: 260, h: 180, bg: "linear-gradient(135deg, rgba(124,58,237,0.10), rgba(232,89,63,0.06))", blur: 48 },
  ];

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: "100%",
      pointerEvents: "none", zIndex: 0, overflow: "hidden",
    }}>
      {blobs.map((b, i) => (
        <div key={i} style={{
          position: "absolute",
          top: b.top, left: b.left, right: b.right,
          width: `${b.w}px`, height: `${b.h}px`,
          background: b.bg,
          borderRadius: "50%",
          filter: `blur(${b.blur}px)`,
        }} />
      ))}
    </div>
  );
}


export default function App() {
  return (
    <div style={{ position: "relative" }}>
      <BackgroundBlobs />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <Hero />
        <Integrations />
        <Work />
        <Pricing />
        <WhatYouGet />
        <WhyMaintenance />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
