import React, { useState, useEffect, useMemo, useRef } from "react";

const ProfileCard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeParticle, setActiveParticle] = useState(null);
  const [time, setTime] = useState(new Date());
  const canvasRef = useRef(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Check for mobile view and scroll progress
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    checkMobile();
    updateScrollProgress();
    
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(102, 126, 234, ${Math.random() * 0.3 + 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Memoized data for performance
  const projects = useMemo(() => [
    {
      id: 1,
      title: "MOODLOVE — 5G CORE INTEGRATION",
      status: "IN PROGRESS",
      points: [
        "Designed and integrated a programmable control layer with Free5GC to manage network slicing, QoS and RSSI-based handovers.",
        "Implemented REST APIs for real-time orchestration and slice-level traffic separation; currently hardening reliability and telemetry.",
        "Inspired by Smart Shoe slicing challenges; focused on scalable control and observability for 5G slices."
      ],
      tech: ["Free5GC", "REST APIs", "Network Slicing", "Telemetry", "5G Core"],
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "📡",
      gradient: "linear-gradient(45deg, #667eea, #764ba2, #4facfe)"
    },
    {
      id: 2,
      title: "Digital Healthcare Management System",
      subtitle: "MERN Stack | Health-Tech Innovation",
      status: "COMPLETED",
      points: [
        "National Finalist: Healthcare Management System Hackathon, IIT Indore (Fluxus 2025)",
        "International Conference: Health-Tech and AI Hackathon, IIT BHU (Spirit '25)",
        "Full-stack healthcare management system using MERN Stack (MongoDB, Express.js, React.js, Node.js)",
        "Patient record management and appointment scheduling modules to streamline healthcare operations",
        "Potential to reduce administrative overhead by 15-20% through automation"
      ],
      tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "REST API"],
      color: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
      icon: "🏥",
      achievements: ["National Finalist", "International Conference"],
      gradient: "linear-gradient(45deg, #4CAF50, #2E7D32, #00ff87)"
    },
    {
      id: 3,
      title: "Crop Health Dashboard",
      subtitle: "MERN Stack + Python | Agri-Tech Solution",
      status: "COMPLETED",
      points: [
        "National Competition: 3rd Rank, YCCE Nagpur",
        "Full-stack web application with MERN Stack frontend and Python backend for crop health visualization",
        "Developed robust data processing scripts in Python and integrated them with RESTful APIs",
        "Provides real-time insights into crop conditions and health analytics",
        "Achieved 3rd rank in national competition at YCCE Nagpur"
      ],
      tech: ["React", "Python", "Flask", "Pandas", "Chart.js", "REST API"],
      color: "linear-gradient(135deg, #FF9800 0%, #FF5722 100%)",
      icon: "🌱",
      achievements: ["3rd Rank National"],
      gradient: "linear-gradient(45deg, #FF9800, #FF5722, #ff0080)"
    },
    {
      id: 4,
      title: "SMART SHOE — IOT WITH NETWORK SLICING",
      subtitle: "IoT & 5G Integration",
      status: "COMPLETED",
      points: [
        "Wearable system to transmit sensor data (gait, health, collision) over differentiated network slices.",
        "Secured 2nd Prize — VNIT Nagpur Summer School 5G Lab for practical implementation of slicing.",
        "Visualized real-time analytics through a lightweight dashboard (ESP32 → Flask backend → React frontend)."
      ],
      tech: ["ESP32", "Python Flask", "React", "5G Slicing", "IoT"],
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: "👟",
      achievements: ["2nd Prize VNIT"],
      gradient: "linear-gradient(45deg, #f093fb, #f5576c, #fc00ff)"
    },
    {
      id: 5,
      title: "WIFI CSI — HUMAN PRESENCE DETECTION",
      subtitle: "Signal Processing & ML Research",
      status: "COMPLETED",
      points: [
        "Analyzed WiFi CSI variations to detect human presence and mapped PHY-layer signal changes to system-level decisions.",
        "Built data collection and basic signal-processing pipeline in Python to extract features for detection."
      ],
      tech: ["Python", "Signal Processing", "WiFi CSI", "Machine Learning"],
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "📶",
      gradient: "linear-gradient(45deg, #4facfe, #00f2fe, #00dbde)"
    }
  ], []);

  const certifications = useMemo(() => [
    {
      title: "Qualcomm Certification Track (In Progress)",
      items: [
        "5G Primer",
        "Fundamentals of Cellular Communication & 5G",
        "5G-Advanced & 6G",
        "Cellular Handset & IoT Design",
        "AI Technical Foundations"
      ],
      icon: "⚡",
      color: "#00ff87"
    },
    {
      title: "Awards & Recognitions",
      items: [
        "2nd Prize — VNIT Nagpur Summer School 5G Lab (Smart Shoe IoT Project)",
        "3rd Rank — National Competition at YCCE Nagpur (Crop Health Dashboard)",
        "National Finalist — Healthcare Management System Hackathon, IIT Indore (DHIMS)",
        "International Conference Presenter — Health-Tech Hackathon, IIT BHU"
      ],
      icon: "🏆",
      color: "#ff0080"
    }
  ], []);

  const skills = useMemo(() => [
    { 
      category: "Full Stack Development", 
      items: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Python", "REST APIs"],
      icon: "💻",
      color: "#667eea"
    },
    { 
      category: "5G & IoT Systems", 
      items: ["Network Slicing", "Free5GC", "ESP32", "IoT Protocols", "5G Core", "Telemetry"],
      icon: "📡",
      color: "#00ff87"
    },
    { 
      category: "Cloud & DevOps", 
      items: ["Docker", "Git", "CI/CD", "AWS", "Microservices", "Linux"],
      icon: "☁️",
      color: "#ff0080"
    },
    { 
      category: "Data & Analytics", 
      items: ["Python", "Pandas", "Chart.js", "Signal Processing", "Machine Learning"],
      icon: "📊",
      color: "#00dbde"
    }
  ], []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Message transmitted! I'll respond through the  network soon.");
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Animated gradient background
  const AnimatedBackground = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(
        45deg,
        rgba(15, 23, 42, 1) 0%,
        rgba(30, 41, 59, 1) 25%,
        rgba(15, 23, 42, 1) 50%,
        rgba(30, 41, 59, 1) 75%,
        rgba(15, 23, 42, 1) 100%
      )`,
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      zIndex: -2
    }} />
  );

  // Glass morphism card component
  const GlassCard = ({ children, style = {}, hover = false }) => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      ...style,
      ...(hover && {
        transform: 'translateY(-8px)',
        boxShadow: `0 20px 40px 0 rgba(102, 126, 234, 0.3)`,
        border: '1px solid rgba(102, 126, 234, 0.3)'
      })
    }}>
      {children}
    </div>
  );

  // Holographic effect component
  const HolographicEffect = ({ color = '#667eea' }) => (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(
        45deg,
        transparent 0%,
        ${color}20 25%,
        transparent 50%,
        ${color}20 75%,
        transparent 100%
      )`,
      backgroundSize: '400% 400%',
      animation: 'holographic 3s ease infinite',
      pointerEvents: 'none',
      opacity: 0.3
    }} />
  );

  // Tech badge component
  const TechBadge = ({ children }) => (
    <span style={{
      display: 'inline-block',
      padding: '0.4rem 0.8rem',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
      color: '#c7d2fe',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '500',
      border: '1px solid rgba(102, 126, 234, 0.3)',
      backdropFilter: 'blur(5px)',
      margin: '0.2rem'
    }}>
      {children}
    </span>
  );

  // Animated button component
  const CyberButton = ({ children, onClick, style = {} }) => (
    <button
      onClick={onClick}
      style={{
        padding: '1rem 2rem',
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '1rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <span style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {children}
      </span>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        transition: '0.5s',
      }} />
    </button>
  );

  // Particle canvas
  const ParticleCanvas = () => (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0.5
      }}
    />
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#e2e8f0',
      fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <AnimatedBackground />
      <ParticleCanvas />
      
      {/* Animated grid overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(102, 126, 234, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(102, 126, 234, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0.3
      }} />

      {/* Time display */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        fontSize: '0.9rem',
        color: '#94a3b8',
        fontFamily: "'Roboto Mono', monospace",
        zIndex: 1000
      }}>
        {formatTime(time)}
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '1rem' : '2rem',
        paddingBottom: isMobile ? '100px' : '2rem'
      }}>
        {/* Futuristic Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '4rem',
          paddingTop: isMobile ? '3rem' : '4rem',
          position: 'relative'
        }}>
          {/* Animated rings */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '300px' : '500px',
            height: isMobile ? '300px' : '500px',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '50%',
            animation: 'pulseRing 4s ease-in-out infinite'
          }} />
          
          <div style={{
            position: 'relative',
            zIndex: 2,
            background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.1), transparent 70%)',
            borderRadius: '50%',
            padding: '2rem',
            display: 'inline-block'
          }}>
            {/* Holographic avatar */}
            <div style={{
              width: isMobile ? '120px' : '180px',
              height: isMobile ? '120px' : '180px',
              borderRadius: '50%',
              margin: '0 auto 2rem',
              position: 'relative',
              overflow: 'hidden',
              border: '2px solid transparent',
              background: 'linear-gradient(45deg, #667eea, #764ba2, #4facfe) border-box',
              boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
            }}>
              <div style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                right: '2px',
                bottom: '2px',
                borderRadius: '50%',
                background: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src={`${process.env.PUBLIC_URL}/resume_photo.jpeg`}
                  alt="Mangesh Sarde"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="%230f172a"/>
                        <path d="M100 50C70 50 50 70 50 100C50 130 70 150 100 150C130 150 150 130 150 100C150 70 130 50 100 50Z" fill="%23667eea"/>
                        <path d="M100 70C120 70 130 80 130 100C130 120 120 130 100 130C80 130 70 120 70 100C70 80 80 70 100 70Z" fill="%23764ba2"/>
                        <text x="100" y="180" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="24">MS</text>
                      </svg>
                    `)}`;
                  }}
                />
              </div>
            </div>

            <h1 style={{
              fontSize: isMobile ? '2.2rem' : '3.5rem',
              fontWeight: '700',
              background: 'linear-gradient(45deg, #667eea, #764ba2, #4facfe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Mangesh Sarde
            </h1>
            
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
              borderRadius: '20px',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.2rem',
                color: '#c7d2fe',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ animation: 'pulse 2s infinite' }}>⚡</span>
                Full Stack Web Developer & 5G/IOT Enthusiast
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '2rem'
            }}>
              <CyberButton onClick={() => window.open('https://github.com/Mangesh46', '_blank')}>
                <span>🚀</span> Explore GitHub
              </CyberButton>
              <CyberButton onClick={() => setActiveTab('contact')} style={{
                background: 'linear-gradient(45deg, #4facfe, #00f2fe)'
              }}>
                <span>📡</span> Connect
              </CyberButton>
            </div>
          </div>
        </header>

        {/* Floating Navigation */}
        <nav style={{
          position: 'sticky',
          top: isMobile ? 'auto' : '1rem',
          bottom: isMobile ? '1rem' : 'auto',
          zIndex: 1000,
          marginBottom: '3rem'
        }}>
          <GlassCard style={{
            padding: isMobile ? '0.5rem' : '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            {['projects', 'skills', 'certifications', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: isMobile ? '0.8rem 1.2rem' : '1rem 2rem',
                  background: activeTab === tab ? 
                    'linear-gradient(45deg, #667eea, #764ba2)' : 'transparent',
                  color: activeTab === tab ? 'white' : '#94a3b8',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>
                  {tab === 'projects' && '📁 '}
                  {tab === 'skills' && '⚡ '}
                  {tab === 'certifications' && '🏆 '}
                  {tab === 'contact' && '📡 '}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
                {activeTab === tab && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    animation: 'slideIn 0.3s ease'
                  }} />
                )}
              </button>
            ))}
          </GlassCard>
        </nav>

        {/* Main Content */}
        <main>
          {/* Projects Section */}
          {activeTab === 'projects' && (
            <section>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}>
                   Projects
                </h2>
                <div style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                  borderRadius: '12px',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  fontSize: '0.9rem',
                  color: '#c7d2fe'
                }}>
                  {projects.length} Active Constructs
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem'
              }}>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
                    onMouseLeave={() => !isMobile && setHoveredProject(null)}
                  >
                    <GlassCard hover={hoveredProject === project.id}>
                      <HolographicEffect color={project.color.match(/#[0-9A-F]{6}/i)?.[0]} />
                      <div style={{
                        padding: '2rem',
                        position: 'relative',
                        zIndex: 2
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          marginBottom: '1.5rem',
                          gap: '1rem'
                        }}>
                          <div style={{
                            fontSize: '2rem',
                            background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                            padding: '0.8rem',
                            borderRadius: '15px',
                            border: '1px solid rgba(255,255,255,0.1)'
                          }}>
                            {project.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: '0.5rem'
                            }}>
                              <h3 style={{
                                fontSize: '1.4rem',
                                fontWeight: '600',
                                color: '#e2e8f0',
                                margin: 0
                              }}>
                                {project.title}
                              </h3>
                              <span style={{
                                padding: '0.3rem 0.8rem',
                                background: project.status === 'IN PROGRESS' ? 
                                  'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1))' :
                                  'linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))',
                                color: project.status === 'IN PROGRESS' ? '#93c5fd' : '#86efac',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                border: `1px solid ${project.status === 'IN PROGRESS' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                              }}>
                                {project.status}
                              </span>
                            </div>
                            {project.subtitle && (
                              <p style={{
                                color: '#94a3b8',
                                fontSize: '0.95rem',
                                marginBottom: '1rem'
                              }}>
                                {project.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div style={{
                          height: '2px',
                          background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))',
                          margin: '1.5rem 0'
                        }} />

                        <ul style={{
                          paddingLeft: '1.2rem',
                          marginBottom: '1.5rem'
                        }}>
                          {project.points.map((point, idx) => (
                            <li key={idx} style={{
                              color: '#cbd5e1',
                              marginBottom: '0.8rem',
                              fontSize: '0.95rem',
                              lineHeight: '1.6'
                            }}>
                              {point}
                            </li>
                          ))}
                        </ul>

                        {project.achievements && (
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '1.5rem'
                          }}>
                            {project.achievements.map((achievement, idx) => (
                              <span
                                key={idx}
                                style={{
                                  padding: '0.4rem 0.8rem',
                                  background: 'linear-gradient(45deg, rgba(234, 179, 8, 0.2), rgba(234, 179, 8, 0.1))',
                                  color: '#fef3c7',
                                  borderRadius: '10px',
                                  fontSize: '0.8rem',
                                  border: '1px solid rgba(234, 179, 8, 0.3)'
                                }}
                              >
                                ⭐ {achievement}
                              </span>
                            ))}
                          </div>
                        )}

                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}>
                          {project.tech.map((tech, idx) => (
                            <TechBadge key={idx}>
                              {tech}
                            </TechBadge>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {activeTab === 'skills' && (
            <section>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(45deg, #00ff87, #00dbde)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '2rem'
              }}>
                Tech Stack Matrix
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {skills.map((skillGroup, idx) => (
                  <GlassCard key={idx}>
                    <div style={{
                      padding: '2rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          background: `linear-gradient(45deg, ${skillGroup.color}40, ${skillGroup.color}20)`,
                          padding: '0.8rem',
                          borderRadius: '12px',
                          border: `1px solid ${skillGroup.color}30`
                        }}>
                          {skillGroup.icon}
                        </div>
                        <h3 style={{
                          fontSize: '1.4rem',
                          fontWeight: '600',
                          color: '#e2e8f0',
                          margin: 0
                        }}>
                          {skillGroup.category}
                        </h3>
                      </div>
                      
                      <div style={{
                        height: '2px',
                        background: `linear-gradient(90deg, ${skillGroup.color}50, ${skillGroup.color}20)`,
                        margin: '1.5rem 0'
                      }} />
                      
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        {skillGroup.items.map((skill, skillIdx) => (
                          <TechBadge key={skillIdx}>
                            {skill}
                          </TechBadge>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {activeTab === 'certifications' && (
            <section>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(45deg, #ff0080, #fc00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '2rem'
              }}>
                Achievements & Certifications
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem'
              }}>
                {certifications.map((cert, idx) => (
                  <GlassCard key={idx}>
                    <div style={{
                      padding: '2rem',
                      position: 'relative'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          background: `linear-gradient(45deg, ${cert.color}40, ${cert.color}20)`,
                          padding: '0.8rem',
                          borderRadius: '12px',
                          border: `1px solid ${cert.color}30`
                        }}>
                          {cert.icon}
                        </div>
                        <h3 style={{
                          fontSize: '1.4rem',
                          fontWeight: '600',
                          color: cert.color,
                          margin: 0
                        }}>
                          {cert.title}
                        </h3>
                      </div>
                      
                      <div style={{
                        height: '2px',
                        background: `linear-gradient(90deg, ${cert.color}50, ${cert.color}20)`,
                        margin: '1.5rem 0'
                      }} />
                      
                      <ul style={{
                        paddingLeft: '1.2rem'
                      }}>
                        {cert.items.map((item, itemIdx) => (
                          <li key={itemIdx} style={{
                            color: '#cbd5e1',
                            marginBottom: '0.8rem',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem'
                          }}>
                            <span style={{ color: cert.color, fontSize: '0.8rem' }}>▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {/* Contact Section */}
          {activeTab === 'contact' && (
            <section>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '2rem'
              }}>
                 Communication
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '3rem'
              }}>
                <div>
                  <GlassCard style={{ height: '100%' }}>
                    <div style={{ padding: '2rem' }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#e2e8f0',
                        marginBottom: '2rem'
                      }}>
                        Connection Protocols
                      </h3>
                      
                      <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1.5rem',
                          padding: '1rem',
                          background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(102, 126, 234, 0.05))',
                          borderRadius: '12px',
                          border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}>
                            📧
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#e2e8f0' }}> Mail</div>
                            <a href="mailto:mangeshsarde6@gmail.com" style={{
                              color: '#c7d2fe',
                              textDecoration: 'none',
                              fontSize: '0.95rem'
                            }}>
                              mangeshsarde6@gmail.com
                            </a>
                          </div>
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem',
                          background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(102, 126, 234, 0.05))',
                          borderRadius: '12px',
                          border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}>
                            🔗
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#e2e8f0' }}>Code Repository</div>
                            <a href="https://github.com/Mangesh46" target="_blank" rel="noopener noreferrer" style={{
                              color: '#c7d2fe',
                              textDecoration: 'none',
                              fontSize: '0.95rem'
                            }}>
                              github.com/Mangesh46
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <GlassCard style={{ padding: '1.5rem', marginTop: '2rem' }}>
                        <h4 style={{
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          color: '#e2e8f0',
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{ color: '#00ff87' }}>⚡</span> Active Learning Protocols
                        </h4>
                        <ul style={{ paddingLeft: '1.2rem', color: '#cbd5e1' }}>
                          <li>5G Advanced & 6G Fundamentals</li>
                          <li>AI & Machine Learning Foundations</li>
                          <li>Cellular Handset & IoT Design</li>
                          <li>Network Slicing Optimization</li>
                          <li> Computing Basics</li>
                        </ul>
                      </GlassCard>
                    </div>
                  </GlassCard>
                </div>
                
                <div>
                  <GlassCard>
                    <div style={{ padding: '2rem' }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#e2e8f0',
                        marginBottom: '2rem'
                      }}>
                        Transmit Message
                      </h3>
                      
                      <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                            <div>
                              <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#94a3b8',
                                fontSize: '0.9rem'
                              }}>
                                IDENTIFIER *
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                  width: '100%',
                                  padding: '1rem',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  border: '1px solid rgba(102, 126, 234, 0.3)',
                                  borderRadius: '10px',
                                  color: '#e2e8f0',
                                  fontSize: '1rem',
                                  transition: 'all 0.3s ease'
                                }}
                                placeholder="Enter your identifier"
                              />
                            </div>
                            
                            <div>
                              <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#94a3b8',
                                fontSize: '0.9rem'
                              }}>
                                 MAIL *
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                  width: '100%',
                                  padding: '1rem',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  border: '1px solid rgba(102, 126, 234, 0.3)',
                                  borderRadius: '10px',
                                  color: '#e2e8f0',
                                  fontSize: '1rem',
                                  transition: 'all 0.3s ease'
                                }}
                                placeholder="@mail.protocol"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              fontWeight: '600',
                              color: '#94a3b8',
                              fontSize: '0.9rem'
                            }}>
                              MESSAGE SUBJECT
                            </label>
                            <input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(102, 126, 234, 0.3)',
                                borderRadius: '10px',
                                color: '#e2e8f0',
                                fontSize: '1rem'
                              }}
                              placeholder="Enter transmission subject"
                            />
                          </div>
                          
                          <div>
                            <label style={{
                              display: 'block',
                              marginBottom: '0.5rem',
                              fontWeight: '600',
                              color: '#94a3b8',
                              fontSize: '0.9rem'
                            }}>
                               MESSAGE *
                            </label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows="6"
                              style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(102, 126, 234, 0.3)',
                                borderRadius: '10px',
                                color: '#e2e8f0',
                                fontSize: '1rem',
                                resize: 'vertical'
                              }}
                              placeholder="Transmit your  message..."
                            />
                          </div>
                          
                          <CyberButton type="submit" style={{ width: '100%' }}>
                            <span>🚀</span> Initiate  Transmission
                          </CyberButton>
                        </div>
                      </form>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          marginTop: '5rem',
          padding: '3rem 2rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #667eea, transparent)'
          }} />
          
          <p style={{
            color: '#94a3b8',
            fontSize: '0.9rem',
            marginBottom: '0.5rem'
          }}>
            © {new Date().getFullYear()} Mangesh Sarde •  Construct v2.0
          </p>
          <p style={{
            color: '#64748b',
            fontSize: '0.8rem'
          }}>
            Built with React • Optimized for GitHub Pages • Powered by 5G Innovation
          </p>
        </footer>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Roboto+Mono:wght@300;400;500&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          overflow-x: hidden;
        }
        
        input, textarea, button {
          font-family: inherit;
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
        }
        
        button {
          cursor: pointer;
        }
        
        button:hover {
          opacity: 0.9;
        }
        
        a:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
        
        /* Animations */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes holographic {
          0% { background-position: 0% 50%; }
          100% { background-position: 400% 50%; }
        }
        
        @keyframes pulseRing {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.5; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        /* Performance optimizations */
        img {
          content-visibility: auto;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #764ba2, #667eea);
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;