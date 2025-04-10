
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface ParticleBackgroundProps {
  theme: string;
}

const ParticleBackground = ({ theme }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  
  // Get color scheme based on theme
  const getColorScheme = (theme: string) => {
    switch (theme) {
      case 'teal':
        return ['rgba(116, 235, 213, 0.5)', 'rgba(172, 182, 229, 0.5)', 'rgba(116, 235, 213, 0.3)'];
      case 'dark':
        return ['rgba(44, 62, 80, 0.5)', 'rgba(76, 161, 175, 0.5)', 'rgba(44, 62, 80, 0.3)'];
      case 'blue':
        return ['rgba(52, 152, 219, 0.5)', 'rgba(44, 62, 80, 0.5)', 'rgba(52, 152, 219, 0.3)'];
      case 'green':
        return ['rgba(46, 204, 113, 0.5)', 'rgba(39, 174, 96, 0.5)', 'rgba(46, 204, 113, 0.3)'];
      case 'purple':
        return ['rgba(155, 89, 182, 0.5)', 'rgba(142, 68, 173, 0.5)', 'rgba(155, 89, 182, 0.3)'];
      default:
        return ['rgba(116, 235, 213, 0.5)', 'rgba(172, 182, 229, 0.5)', 'rgba(116, 235, 213, 0.3)'];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles
    const initParticles = () => {
      const colors = getColorScheme(theme);
      particles.current = [];
      
      for (let i = 0; i < 50; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x > canvas.width || p.x < 0) {
          p.speedX = -p.speedX;
        }
        
        if (p.y > canvas.height || p.y < 0) {
          p.speedY = -p.speedY;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      
      // Draw connections
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 150, 150, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70"
    />
  );
};

export default ParticleBackground;
