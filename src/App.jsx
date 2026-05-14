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

/* ========== 粒子网络背景（增强版） ========== */
function ParticleNetwork() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const particles = []
    const COUNT = 120
    const CONNECT = 150
    const MOUSE_R = 200

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
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 2.5 + 1.2,
      })
    }

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    let anim
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // 鼠标周围的辉光
      if (mx > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 150)
        glow.addColorStop(0, 'rgba(108, 92, 231, 0.12)')
        glow.addColorStop(1, 'rgba(108, 92, 231, 0)')
        ctx.fillStyle = glow
        ctx.fillRect(mx - 150, my - 150, 300, 300)
      }

      particles.forEach((p) => {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_R && dist > 0) {
          const force = Math.pow((MOUSE_R - dist) / MOUSE_R, 2)
          p.vx += (dx / dist) * force * 0.8
          p.vy += (dy / dist) * force * 0.8
        }
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.985
        p.vy *= 0.985
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })

      // 连线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT) {
            const midX = (particles[i].x + particles[j].x) / 2
            const midY = (particles[i].y + particles[j].y) / 2
            const toMouse = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2)
            const alpha = toMouse < 250 ? 0.08 + (1 - toMouse / 250) * 0.7 : 0.06
            const lineW = toMouse < 150 ? 1 : 0.5
            ctx.strokeStyle = `rgba(108, 92, 231, ${alpha})`
            ctx.lineWidth = lineW
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // 粒子
      particles.forEach((p) => {
        const toMouse = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2)
        const alpha = toMouse < 200 ? 0.6 + (1 - toMouse / 200) * 0.4 : 0.25
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        glow.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

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
const EQ_BARS = Array.from({ length: 14 }, () => ({
  h: 12 + Math.random() * 26,
  d: 0.4 + Math.random() * 1,
}))

function Equalizer() {
  return (
    <div className="equalizer">
      {EQ_BARS.map((bar, i) => (
        <div
          key={i}
          className="eq-bar"
          style={{
            animationDelay: `${i * 0.08}s`,
            animationDuration: `${bar.d}s`,
            height: `${bar.h}px`,
          }}
        />
      ))}
    </div>
  )
}

/* ========== 主组件 ========== */
function App() {
  const cardRef = useRef(null)
  const orbRef = useRef(null)
  const [nameHovered, setNameHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -8
    const rotY = ((x - cx) / cx) * 8
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
    card.style.setProperty('--shadow-x', `${(x - cx) * 0.08}px`)
    card.style.setProperty('--shadow-y', `${(y - cy) * 0.08}px`)
    card.style.setProperty('--ring-angle', `${Math.atan2(y - cy, x - cx) * (180 / Math.PI)}deg`)
    card.style.setProperty('--glow-x', `${((x - cx) / cx) * 100}%`)
    card.style.setProperty('--glow-y', `${((y - cy) / cy) * 100}%`)

    // 光球视差
    if (orbRef.current) {
      const ox = (e.clientX / window.innerWidth - 0.5) * 60
      const oy = (e.clientY / window.innerHeight - 0.5) * 60
      orbRef.current.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--shadow-x', '0px')
    card.style.setProperty('--shadow-y', '0px')
    card.style.setProperty('--glow-x', '50%')
    card.style.setProperty('--glow-y', '50%')
    if (orbRef.current) {
      orbRef.current.style.transform = 'translate(-50%, -50%)'
    }
  }, [])

  return (
    <>
      <ParticleNetwork />
      <div className="orb-third" ref={orbRef} />

      <div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 头像 */}
        <div className="card-avatar">
          <div className="avatar-ring" />
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} />
          ) : (
            <div className="avatar-placeholder">
              {profile.name.charAt(0)}
            </div>
          )}
        </div>

        {/* 姓名 */}
        <h1
          className={`card-name${nameHovered ? ' name-sparkle' : ''}`}
          onMouseEnter={() => setNameHovered(true)}
          onMouseLeave={() => setNameHovered(false)}
        >
          {profile.name}
        </h1>
        <div className="card-underline" />
        <p className="card-title">{profile.title}</p>
        <p className="card-bio">{profile.bio}</p>

        {/* 技能标签 */}
        <div className="card-skills">
          {profile.skills.map((skill, i) => (
            <span key={skill.name} className="tag" style={{ animationDelay: `${0.05 * i}s` }}>
              <span className="tag-icon">{skill.icon}</span>
              {skill.name}
            </span>
          ))}
        </div>

        <div className="card-divider" />

        {/* 歌单 */}
        <p className="music-label"> 我的歌单 — 梁博</p>
        <div className="song-pills">
          {profile.songs.map((song) => (
            <button
              key={song.title}
              className="song-pill"
              onClick={() => window.open(song.url, '_blank', 'noopener')}
            >
              {song.title}
            </button>
          ))}
        </div>
        <Equalizer />

        <div className="card-divider" />

        {/* 社交链接 */}
        <div className="card-social">
          {profile.social.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
