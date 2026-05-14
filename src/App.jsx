import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

const profile = {
  name: 'ZHANGJIZHE',
  title: '研究生',
  bio: '热爱电池研究领域，专注于构建优雅、好用的 Web 应用。喜欢开源，享受创造的乐趣。',
  avatar: import.meta.env.BASE_URL + 'avatar.jpeg',
  skills: [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🟦' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Docker', icon: '🐳' },
    { name: 'UI Design', icon: '🎨' },
  ],
  social: [
    {
      label: 'GitHub',
      url: 'https://github.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      url: 'mailto:hello@example.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ],
  songs: [
    { title: '出现又离开', url: 'https://music.163.com/#/song?id=1407359250' },
    { title: '日落大道', url: 'https://music.163.com/#/song?id=432506856' },
    { title: '男孩', url: 'https://music.163.com/#/song?id=432506834' },
    { title: '表态', url: 'https://music.163.com/#/song?id=1407359248' },
    { title: '私奔', url: 'https://music.163.com/#/song?id=432506841' },
  ],
}

/* ========== 气球系统 ========== */
const BALLOON_COLORS = [
  '#ff6b9d', '#ff9ecd', '#ff477e', '#ffb3d0', '#ff85b3',
  '#e84393', '#fd79a8', '#fab1c8', '#ff6b8a', '#ff8fab',
]

function BalloonSystem() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const balloons = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = () => {
      const size = 20 + Math.random() * 30
      balloons.push({
        x: Math.random() * canvas.width,
        y: canvas.height + size,
        size,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        vy: -(0.6 + Math.random() * 1.2),
        vx: (Math.random() - 0.5) * 0.6,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayAmp: 0.3 + Math.random() * 0.8,
        opacity: 0.7 + Math.random() * 0.3,
        stringLen: 40 + Math.random() * 50,
      })
    }

    // 初始生成一些气球
    for (let i = 0; i < 12; i++) {
      const size = 20 + Math.random() * 30
      balloons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        vy: -(0.6 + Math.random() * 1.2),
        vx: (Math.random() - 0.5) * 0.6,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayAmp: 0.3 + Math.random() * 0.8,
        opacity: 0.7 + Math.random() * 0.3,
        stringLen: 40 + Math.random() * 50,
      })
    }

    let anim
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      balloons.forEach((b) => {
        b.sway += b.swaySpeed
        b.x += b.vx + Math.sin(b.sway) * b.swayAmp
        b.y += b.vy

        // 绘制气球线
        const knotX = b.x
        const knotY = b.y + b.size * 1.15
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.3})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(knotX, knotY)
        ctx.quadraticCurveTo(
          knotX + Math.sin(b.sway * 1.5) * 5,
          knotY + b.stringLen * 0.5,
          knotX + Math.sin(b.sway * 2) * 8,
          knotY + b.stringLen
        )
        ctx.stroke()

        // 气球主体
        ctx.save()
        ctx.globalAlpha = b.opacity
        ctx.translate(b.x, b.y)

        // 气球椭圆
        const gradient = ctx.createRadialGradient(
          -b.size * 0.2, -b.size * 0.2, b.size * 0.05,
          0, 0, b.size * 1.1
        )
        gradient.addColorStop(0, '#ffffff')
        gradient.addColorStop(0.35, b.color)
        gradient.addColorStop(1, 'rgba(0,0,0,0.2)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(0, 0, b.size * 0.7, b.size, 0, 0, Math.PI * 2)
        ctx.fill()

        // 高光
        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.beginPath()
        ctx.ellipse(-b.size * 0.15, -b.size * 0.25, b.size * 0.2, b.size * 0.3, -0.3, 0, Math.PI * 2)
        ctx.fill()

        // 气球口三角
        ctx.fillStyle = b.color
        ctx.beginPath()
        ctx.moveTo(-4, b.size * 0.95)
        ctx.lineTo(4, b.size * 0.95)
        ctx.lineTo(0, b.size * 1.05)
        ctx.closePath()
        ctx.fill()

        ctx.restore()
      })

      // 清理出界气球
      for (let i = balloons.length - 1; i >= 0; i--) {
        if (balloons[i].y < -150) balloons.splice(i, 1)
      }

      // 生成新气球
      if (Math.random() < 0.015) spawn()

      anim = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="canvas-balloons" />
}

/* ========== 粒子系统（粉色版） ========== */
function ParticleSystem() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const particles = []
    const stars = []
    const COUNT = 150

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        r: Math.random() * 2 + 0.8,
      })
    }

    const spawnStar = () => {
      const fromLeft = Math.random() > 0.5
      stars.push({
        x: fromLeft ? -50 : canvas.width + 50,
        y: Math.random() * canvas.height,
        vx: fromLeft ? 6 + Math.random() * 10 : -(6 + Math.random() * 10),
        vy: (Math.random() - 0.5) * 3,
        life: 1,
        decay: 0.004 + Math.random() * 0.01,
        trail: [],
      })
    }

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    let anim
    const draw = () => {
      ctx.fillStyle = 'rgba(26, 8, 20, 0.25)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      if (mx > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 220)
        glow.addColorStop(0, 'rgba(255, 107, 157, 0.07)')
        glow.addColorStop(0.5, 'rgba(255, 107, 157, 0.03)')
        glow.addColorStop(1, 'rgba(255, 107, 157, 0)')
        ctx.fillStyle = glow
        ctx.fillRect(mx - 220, my - 220, 440, 440)
      }

      particles.forEach((p) => {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 220 && dist > 0) {
          const force = Math.pow((220 - dist) / 220, 2.2)
          p.vx += (dx / dist) * force * 1
          p.vy += (dy / dist) * force * 1
        }
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.992
        p.vy *= 0.992
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5 }
        if (p.x < -50) p.x = canvas.width + 50
        if (p.x > canvas.width + 50) p.x = -50
        if (p.y < -50) p.y = canvas.height + 50
        if (p.y > canvas.height + 50) p.y = -50
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const mx2 = (particles[i].x + particles[j].x) / 2
            const my2 = (particles[i].y + particles[j].y) / 2
            const toMouse = Math.sqrt((mx2 - mx) ** 2 + (my2 - my) ** 2)
            const alpha = toMouse < 280 ? 0.05 + (1 - toMouse / 280) * 0.7 : 0.04
            ctx.strokeStyle = `rgba(255, 107, 157, ${alpha})`
            ctx.lineWidth = toMouse < 180 ? 1 : 0.4
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach((p) => {
        const toMouse = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2)
        const alpha = toMouse < 220 ? 0.45 + (1 - toMouse / 220) * 0.55 : 0.18
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5)
        glow.addColorStop(0, `rgba(255, 107, 157, ${alpha * 0.6})`)
        glow.addColorStop(1, 'rgba(255, 107, 157, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(255, 200, 220, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      stars.forEach((s) => {
        s.trail.push({ x: s.x, y: s.y, life: s.life })
        if (s.trail.length > 25) s.trail.shift()
        s.x += s.vx
        s.y += s.vy
        s.life -= s.decay
        if (s.trail.length > 1) {
          for (let k = 1; k < s.trail.length; k++) {
            const progress = k / s.trail.length
            ctx.strokeStyle = `rgba(255, 180, 200, ${progress * 0.5 * s.life})`
            ctx.lineWidth = progress * 2
            ctx.beginPath()
            ctx.moveTo(s.trail[k - 1].x, s.trail[k - 1].y)
            ctx.lineTo(s.trail[k].x, s.trail[k].y)
            ctx.stroke()
          }
        }
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 12)
        hg.addColorStop(0, `rgba(255, 200, 220, ${s.life})`)
        hg.addColorStop(1, 'rgba(255, 200, 220, 0)')
        ctx.fillStyle = hg
        ctx.beginPath()
        ctx.arc(s.x, s.y, 12, 0, Math.PI * 2)
        ctx.fill()
      })

      for (let i = stars.length - 1; i >= 0; i--) {
        if (stars[i].life <= 0 || stars[i].x > canvas.width + 100 || stars[i].x < -100) {
          stars.splice(i, 1)
        }
      }
      if (Math.random() < 0.02) spawnStar()

      anim = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(anim)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="canvas-particles" />
}

/* ========== 均衡器 ========== */
const EQ_BARS = Array.from({ length: 18 }, () => ({
  h: 14 + Math.random() * 30,
  d: 0.35 + Math.random() * 1.1,
}))

function Equalizer() {
  return (
    <div className="equalizer">
      {EQ_BARS.map((bar, i) => (
        <div
          key={i}
          className="eq-bar"
          style={{ animationDelay: `${i * 0.07}s`, animationDuration: `${bar.d}s`, height: `${bar.h}px` }}
        />
      ))}
    </div>
  )
}

/* ========== 主组件 ========== */
function App() {
  const cardRef = useRef(null)
  const [nameHovered, setNameHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    card.style.setProperty('--shadow-x', `${(x - cx) * 0.04}px`)
    card.style.setProperty('--shadow-y', `${(y - cy) * 0.04}px`)
    card.style.setProperty('--ring-angle', `${Math.atan2(y - cy, x - cx) * (180 / Math.PI)}deg`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--shadow-x', '0px')
    card.style.setProperty('--shadow-y', '0px')
  }, [])

  return (
    <>
      <ParticleSystem />
      <BalloonSystem />
      <div className="bg-watermark">张❤王</div>

      <div className="card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="card-left">
          <div className="card-avatar">
            <div className="avatar-ring" />
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} />
            ) : (
              <div className="avatar-placeholder">{profile.name.charAt(0)}</div>
            )}
          </div>
          <h1
            className={`card-name${nameHovered ? ' name-sparkle' : ''}`}
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
          >
            {profile.name}
          </h1>
          <div className="card-underline" />
          <p className="card-title">{profile.title}</p>
        </div>

        <div className="card-right">
          <p className="card-bio">{profile.bio}</p>
          <div className="card-skills">
            {profile.skills.map((skill, i) => (
              <span key={skill.name} className="tag" style={{ animationDelay: `${0.04 * i}s` }}>
                <span className="tag-icon">{skill.icon}</span>
                {skill.name}
              </span>
            ))}
          </div>
          <div className="card-divider" />
          <p className="music-label"> 我的歌单 — 梁博</p>
          <div className="song-pills">
            {profile.songs.map((song) => (
              <button key={song.title} className="song-pill" onClick={() => window.open(song.url, '_blank', 'noopener')}>
                {song.title}
              </button>
            ))}
          </div>
          <Equalizer />
          <div className="card-divider" />
          <div className="card-social">
            {profile.social.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link" title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
