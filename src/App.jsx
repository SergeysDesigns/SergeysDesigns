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
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style,
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
      padding: "0 clamp(20px, 4vw, 48px)", height: "60px",
      background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid var(--gray-200)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <a href="#" style={{
        textDecoration: "none", display: "flex", alignItems: "center",
      }}>
        <img src="/logo.png" alt="Sergey's Designs" style={{
          height: "36px", width: "auto",
        }} />
      </a>
      <div style={{ display: "flex", gap: "clamp(16px, 3vw, 32px)", alignItems: "center" }}>
        {[
          { label: "Work", href: "#work" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ].map((l) => (
          <a key={l.label} href={l.href} style={{
            fontSize: "14px", color: "var(--gray-600)", textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => e.target.style.color = "var(--charcoal)"}
            onMouseLeave={(e) => e.target.style.color = "var(--gray-600)"}
          >{l.label}</a>
        ))}
        <a href="#contact" style={{
          fontSize: "13px", fontWeight: 500, color: "white",
          background: "var(--accent)", borderRadius: "6px",
          padding: "8px 18px", textDecoration: "none",
          transition: "background 0.2s",
        }}
          onMouseEnter={(e) => e.target.style.background = "var(--accent-hover)"}
          onMouseLeave={(e) => e.target.style.background = "var(--accent)"}
        >Get in touch</a>
      </div>
    </nav>
  );
}


// ═══════════════════════════════════════════
// HERO — Equals-inspired
// ═══════════════════════════════════════════
function Hero() {
  return (
    <div style={{
      paddingTop: "140px", paddingBottom: "80px",
      textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Pastel blobs like Equals */}
      <div style={{ position: "absolute", top: "40px", left: "-60px", width: "200px", height: "120px", background: "linear-gradient(135deg, rgba(232,89,63,0.12), rgba(249,180,60,0.08))", borderRadius: "40px", transform: "rotate(-12deg)", filter: "blur(2px)" }} />
      <div style={{ position: "absolute", top: "80px", right: "-40px", width: "180px", height: "100px", background: "linear-gradient(135deg, rgba(190,75,219,0.1), rgba(232,89,63,0.06))", borderRadius: "40px", transform: "rotate(8deg)", filter: "blur(2px)" }} />
      <div style={{ position: "absolute", top: "160px", left: "5%", width: "140px", height: "80px", background: "linear-gradient(135deg, rgba(59,91,219,0.1), rgba(18,184,134,0.06))", borderRadius: "30px", transform: "rotate(-5deg)", filter: "blur(3px)" }} />
      <div style={{ position: "absolute", top: "60px", right: "8%", width: "100px", height: "60px", background: "linear-gradient(135deg, rgba(232,89,63,0.15), rgba(190,75,219,0.05))", borderRadius: "20px", transform: "rotate(15deg)", filter: "blur(1px)" }} />

      <div style={{ position: "relative", padding: "0 24px" }}>
        <div style={{ animation: "fadeUp 0.8s ease 0.1s both" }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 400, lineHeight: 1.1,
            color: "var(--charcoal)", marginBottom: "20px",
            maxWidth: "700px", margin: "0 auto 20px",
          }}>
            What comes after a Yelp page?
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            color: "var(--gray-600)", lineHeight: 1.6,
            maxWidth: "520px", margin: "0 auto 36px",
          }}>
            {content.subtitle}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#work" style={{
              fontSize: "14px", fontWeight: 500, color: "white",
              background: "var(--accent)", borderRadius: "8px",
              padding: "12px 28px", textDecoration: "none",
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.target.style.background = "var(--accent-hover)"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.target.style.background = "var(--accent)"; e.target.style.transform = "translateY(0)"; }}
            >See my work</a>
            <a href="#pricing" style={{
              fontSize: "14px", fontWeight: 500, color: "var(--charcoal)",
              background: "var(--white)", border: "1px solid var(--gray-200)",
              borderRadius: "8px", padding: "12px 28px", textDecoration: "none",
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => e.target.style.borderColor = "var(--gray-400)"}
              onMouseLeave={(e) => e.target.style.borderColor = "var(--gray-200)"}
            >View pricing</a>
          </div>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// INTEGRATIONS ROW — like the logo bar in Equals
// ═══════════════════════════════════════════
function Integrations() {
  return (
    <div style={{
      padding: "48px 24px 56px",
      borderTop: "1px solid var(--gray-100)",
      borderBottom: "1px solid var(--gray-100)",
    }}>
      <Fade>
        <p style={{
          textAlign: "center", fontSize: "13px", color: "var(--gray-400)",
          textTransform: "uppercase", letterSpacing: "2px", marginBottom: "28px",
        }}>Integrates with</p>
        <div style={{
          display: "flex", justifyContent: "center", flexWrap: "wrap",
          gap: "clamp(20px, 4vw, 44px)", alignItems: "center",
          maxWidth: "800px", margin: "0 auto",
        }}>
          {content.integrations.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "15px", fontWeight: 600, color: "var(--gray-900)",
              transition: "opacity 0.2s", cursor: "default",
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.6"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              <div style={{
                width: "8px", height: "8px", borderRadius: "2px",
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
// FEATURES — Equals-style rows with color accent bars
// ═══════════════════════════════════════════
function Features() {
  const items = [
    { title: "For Dine-In Restaurants", desc: "A stunning online presence with your menu, hours, and ambiance — so customers choose you over the place next door.", color: "var(--accent)" },
    { title: "For Takeout & Delivery", desc: "Integrated with DoorDash, Uber Eats, and Grubhub. One tap from your site to an order in your kitchen.", color: "var(--blue)" },
    { title: "For Growing Businesses", desc: "SEO, Google Business Profile, and a site that actually ranks when someone searches 'restaurants near me.'", color: "var(--green)" },
  ];

  return (
    <div style={{ padding: "clamp(40px, 8vw, 80px) clamp(24px, 5vw, 80px)", maxWidth: "800px", margin: "0 auto" }}>
      {items.map((item, i) => (
        <Fade key={i} delay={i * 0.1}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "32px 0",
            borderBottom: i < items.length - 1 ? "1px solid var(--gray-100)" : "none",
            gap: "24px",
          }}>
            <div>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontWeight: 400, marginBottom: "6px",
              }}>{item.title}</h3>
              <p style={{ fontSize: "15px", color: "var(--gray-600)", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
            <div style={{
              width: "40px", height: "16px", borderRadius: "4px",
              background: item.color, flexShrink: 0,
            }} />
          </div>
        </Fade>
      ))}
    </div>
  );
}


// ═══════════════════════════════════════════
// WHAT YOU GET — grid
// ═══════════════════════════════════════════
function WhatYouGet() {
  const items = [
    { title: "Custom Design", text: "Unique to your brand — no templates, no cookie-cutter layouts.", icon: "◆" },
    { title: "Mobile-First", text: "85% of local searches happen on phones. Your site will be flawless.", icon: "◆" },
    { title: "Online Menu", text: "Beautiful and browsable — no more PDF downloads.", icon: "◆" },
    { title: "Food Photography", text: "Your dishes front and center. The #1 thing that converts browsers to diners.", icon: "◆" },
    { title: "Ordering Integration", text: "DoorDash, Uber Eats, Grubhub, Toast — connected directly to your site.", icon: "◆" },
    { title: "Google SEO", text: "Rank when people search 'restaurants near me' in your area.", icon: "◆" },
  ];

  return (
    <div style={{
      background: "var(--bg-tint)",
      padding: "clamp(60px, 10vw, 100px) clamp(24px, 5vw, 80px)",
    }}>
      <Fade>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontSize: "13px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px",
          }}>What you get</p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400,
          }}>Everything your restaurant needs.</h2>
        </div>
      </Fade>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px", maxWidth: "900px", margin: "0 auto",
      }}>
        {items.map((item, i) => (
          <Fade key={i} delay={i * 0.06}>
            <div style={{
              background: "var(--white)", borderRadius: "12px",
              padding: "28px 24px", border: "1px solid var(--gray-100)",
              transition: "all 0.25s", height: "100%",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gray-200)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--gray-100)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                fontSize: "10px", color: "var(--accent)", marginBottom: "12px",
              }}>{item.icon}</div>
              <h3 style={{
                fontSize: "17px", fontWeight: 600, marginBottom: "8px",
              }}>{item.title}</h3>
              <p style={{
                fontSize: "14px", color: "var(--gray-600)", lineHeight: 1.6,
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
      padding: "clamp(60px, 10vw, 100px) clamp(24px, 5vw, 80px)",
    }}>
      <Fade>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontSize: "13px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px",
          }}>My work</p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400,
          }}>Recent projects.</h2>
        </div>
      </Fade>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "24px", maxWidth: "900px", margin: "0 auto",
      }}>
        {content.projects.map((p, i) => (
          <Fade key={i} delay={i * 0.1}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
              display: "block", textDecoration: "none", color: "inherit",
              borderRadius: "12px", overflow: "hidden",
              border: "1px solid var(--gray-100)",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gray-200)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--gray-100)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ height: "220px", overflow: "hidden", background: "var(--gray-100)" }}>
                <img src={p.image} alt={p.name} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform 0.5s",
                }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "24px" }}>
                <p style={{
                  fontSize: "12px", color: "var(--accent)", fontWeight: 500,
                  textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px",
                }}>{p.type}</p>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "24px", fontWeight: 400, marginBottom: "8px",
                }}>{p.name}</h3>
                <p style={{
                  fontSize: "14px", color: "var(--gray-600)", lineHeight: 1.6, marginBottom: "16px",
                }}>{p.description}</p>
                <span style={{
                  fontSize: "13px", fontWeight: 500, color: "var(--accent)",
                }}>View site →</span>
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
      padding: "clamp(60px, 10vw, 100px) clamp(24px, 5vw, 80px)",
    }}>
      <Fade>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontSize: "13px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px",
          }}>Pricing</p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400,
          }}>Simple. Transparent. No surprises.</h2>
        </div>
      </Fade>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px", maxWidth: "700px", margin: "0 auto",
      }}>
        <Fade>
          <div style={{
            borderRadius: "12px", padding: "36px 28px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
          }}>
            <p style={{
              fontSize: "12px", color: "var(--gray-400)",
              textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px",
            }}>Website Setup</p>
            <div style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "48px", marginBottom: "4px",
            }}>${content.setupPrice}</div>
            <p style={{
              fontSize: "14px", color: "var(--gray-400)", marginBottom: "28px",
            }}>One-time payment</p>
            <div style={{ fontSize: "14px", lineHeight: 2.2 }}>
              {content.setupFeatures.map((f, i) => (
                <div key={i} style={{ color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ color: "var(--green)", marginRight: "10px" }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>
        </Fade>

        <Fade delay={0.1}>
          <div style={{
            borderRadius: "12px", padding: "36px 28px",
            border: "2px solid var(--accent)",
            background: "rgba(232,89,63,0.05)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)",
              background: "var(--accent)", color: "white",
              fontSize: "11px", fontWeight: 600, letterSpacing: "1px",
              textTransform: "uppercase", padding: "4px 14px", borderRadius: "4px",
            }}>Recommended</div>
            <p style={{
              fontSize: "12px", color: "var(--gray-400)",
              textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px",
            }}>Monthly Maintenance</p>
            <div style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "48px", marginBottom: "4px",
            }}>
              ${content.monthlyPrice}<span style={{ fontSize: "18px", color: "var(--gray-400)" }}>/mo</span>
            </div>
            <p style={{
              fontSize: "14px", color: "var(--gray-400)", marginBottom: "28px",
            }}>Optional · Cancel anytime</p>
            <div style={{ fontSize: "14px", lineHeight: 2.2 }}>
              {content.maintenanceFeatures.map((f, i) => (
                <div key={i} style={{ color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ color: "var(--green)", marginRight: "10px" }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>

      <Fade>
        <p style={{
          textAlign: "center", marginTop: "32px",
          fontSize: "14px", color: "var(--gray-400)", fontStyle: "italic",
        }}>
          Your domain is always yours. If you cancel, everything transfers to you — no strings.
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
    { title: "Menus change.", text: "New dishes, seasonal specials, price updates — your site stays current without you lifting a finger." },
    { title: "First impressions matter.", text: "Outdated hours or broken links cost you customers. I keep everything polished and working." },
    { title: "Google rewards fresh sites.", text: "Regular updates signal to Google that your business is active, helping you rank higher in local search." },
  ];

  return (
    <div style={{ padding: "clamp(60px, 10vw, 100px) clamp(24px, 5vw, 80px)", maxWidth: "800px", margin: "0 auto" }}>
      <Fade>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <p style={{
            fontSize: "13px", color: "var(--gray-400)",
            textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px",
          }}>Why maintenance?</p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400,
          }}>Your site should work as hard as you do.</h2>
        </div>
      </Fade>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "32px",
      }}>
        {items.map((item, i) => (
          <Fade key={i} delay={i * 0.08}>
            <div>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "20px", fontWeight: 400, marginBottom: "8px",
              }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 1.7 }}>
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
// CTA — Equals-style bottom CTA with tint
// ═══════════════════════════════════════════
function CTA() {
  return (
    <div id="contact" style={{
      background: "var(--bg-tint)",
      padding: "clamp(60px, 10vw, 100px) clamp(24px, 5vw, 80px)",
      textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Pastel blobs */}
      <div style={{ position: "absolute", bottom: "-30px", left: "10%", width: "200px", height: "120px", background: "var(--pastel-purple)", borderRadius: "50%", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", top: "20px", right: "15%", width: "160px", height: "100px", background: "var(--pastel-pink)", borderRadius: "50%", filter: "blur(40px)" }} />

      <Fade>
        <div style={{ position: "relative" }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400,
            marginBottom: "16px",
          }}>Ready to get started?</h2>
          <p style={{
            fontSize: "17px", color: "var(--gray-600)", lineHeight: 1.6,
            maxWidth: "440px", margin: "0 auto 36px",
          }}>
            No pressure, no pitch — just a conversation about what your restaurant needs.
          </p>
          <div style={{
            display: "flex", flexDirection: "column",
            gap: "12px", alignItems: "center",
          }}>
            <a href={`mailto:${content.email}`} style={{
              fontSize: "16px", fontWeight: 500, color: "var(--accent)",
              textDecoration: "none",
            }}
              onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.target.style.textDecoration = "none"}
            >{content.email}</a>
            <a href={`tel:${content.phone.replace(/\D/g, '')}`} style={{
              fontSize: "16px", fontWeight: 500, color: "var(--charcoal)",
              textDecoration: "none",
            }}>{content.phone}</a>
          </div>
        </div>
      </Fade>
    </div>
  );
}


// ═══════════════════════════════════════════
// FOOTER — Equals-style with big brand mark
// ═══════════════════════════════════════════
function Footer() {
  return (
    <>
      <div style={{
        borderTop: "1px solid var(--gray-100)",
        padding: "40px clamp(24px, 5vw, 80px)",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap",
        gap: "32px", maxWidth: "900px", margin: "0 auto",
      }}>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px", color: "var(--gray-400)" }}>Services</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2 }}>Restaurant Websites</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2 }}>Menu Design</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2 }}>Ordering Integration</p>
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px", color: "var(--gray-400)" }}>Contact</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2 }}>{content.email}</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2 }}>{content.phone}</p>
          <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 2 }}>{content.location}</p>
        </div>
      </div>

      {/* Big brand mark like Equals footer */}
      <div style={{
        background: "var(--dark)", color: "var(--white)",
        padding: "60px 24px 32px", textAlign: "center",
        overflow: "hidden",
      }}>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(60px, 15vw, 160px)",
          fontWeight: 400, lineHeight: 1,
          color: "rgba(255,255,255,0.08)",
          marginBottom: "24px",
          userSelect: "none",
        }}>
          Sergey's Designs
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontSize: "12px", color: "var(--gray-600)",
          maxWidth: "900px", margin: "0 auto",
          flexWrap: "wrap", gap: "12px",
        }}>
          <span>© {new Date().getFullYear()} Sergey's Designs</span>
          <span>{content.location}</span>
        </div>
      </div>
    </>
  );
}


// ═══════════════════════════════════════════
// APP
// ═══════════════════════════════════════════
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Integrations />
      <Features />
      <WhatYouGet />
      <Work />
      <Pricing />
      <WhyMaintenance />
      <CTA />
      <Footer />
    </>
  );
}