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

/* ========== 粒子系统（增强版 + 流星） ========== */
function ParticleSystem() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const particles = []
    const stars = []
    const COUNT = 200
    const CONNECT = 140
    const MOUSE_R = 250

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
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: Math.random() * 2.2 + 0.8,
        baseVx: (Math.random() - 0.5) * 0.4,
        baseVy: (Math.random() - 0.5) * 0.4,
      })
    }

    const spawnStar = () => {
      const fromLeft = Math.random() > 0.5
      stars.push({
        x: fromLeft ? -50 : canvas.width + 50,
        y: Math.random() * canvas.height,
        vx: fromLeft ? 8 + Math.random() * 12 : -(8 + Math.random() * 12),
        vy: (Math.random() - 0.5) * 3,
        life: 1,
        decay: 0.003 + Math.random() * 0.008,
        trail: [],
      })
    }

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    let anim
    const draw = () => {
      ctx.fillStyle = 'rgba(8, 8, 26, 0.25)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // 鼠标辉光
      if (mx > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 250)
        glow.addColorStop(0, 'rgba(108, 92, 231, 0.07)')
        glow.addColorStop(0.5, 'rgba(108, 92, 231, 0.03)')
        glow.addColorStop(1, 'rgba(108, 92, 231, 0)')
        ctx.fillStyle = glow
        ctx.fillRect(mx - 250, my - 250, 500, 500)
      }

      // 更新粒子
      particles.forEach((p) => {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_R && dist > 0) {
          const force = Math.pow((MOUSE_R - dist) / MOUSE_R, 2.5)
          p.vx += (dx / dist) * force * 1.2
          p.vy += (dy / dist) * force * 1.2
        }
        // 背景流动
        p.vx += p.baseVx * 0.01
        p.vy += p.baseVy * 0.01
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.992
        p.vy *= 0.992
        // 速度限制
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 3) {
          p.vx = (p.vx / speed) * 3
          p.vy = (p.vy / speed) * 3
        }
        if (p.x < -50) p.x = canvas.width + 50
        if (p.x > canvas.width + 50) p.x = -50
        if (p.y < -50) p.y = canvas.height + 50
        if (p.y > canvas.height + 50) p.y = -50
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
            const alpha = toMouse < 300 ? 0.06 + (1 - toMouse / 300) * 0.8 : 0.05
            const lw = toMouse < 200 ? 1.2 : 0.4
            ctx.strokeStyle = `rgba(108, 92, 231, ${alpha})`
            ctx.lineWidth = lw
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // 绘制粒子
      particles.forEach((p) => {
        const toMouse = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2)
        const alpha = toMouse < 250 ? 0.5 + (1 - toMouse / 250) * 0.5 : 0.2
        // 辉光
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        glow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.6})`)
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
        // 实心
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // 流星
      stars.forEach((s, idx) => {
        s.trail.push({ x: s.x, y: s.y, life: s.life })
        if (s.trail.length > 30) s.trail.shift()
        s.x += s.vx
        s.y += s.vy
        s.life -= s.decay

        // 绘制拖尾
        if (s.trail.length > 1) {
          for (let k = 1; k < s.trail.length; k++) {
            const t = s.trail[k]
            const prev = s.trail[k - 1]
            const progress = k / s.trail.length
            ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.6 * s.life})`
            ctx.lineWidth = progress * 2.5
            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(t.x, t.y)
            ctx.stroke()
          }
        }
        // 流星头部辉光
        const headGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 15)
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${s.life})`)
        headGlow.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = headGlow
        ctx.beginPath()
        ctx.arc(s.x, s.y, 15, 0, Math.PI * 2)
        ctx.fill()
      })

      // 清理死流星
      for (let i = stars.length - 1; i >= 0; i--) {
        if (stars[i].life <= 0 || stars[i].x > canvas.width + 100 || stars[i].x < -100) {
          stars.splice(i, 1)
        }
      }

      // 随机生成流星
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
          style={{
            animationDelay: `${i * 0.07}s`,
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
      <div className="bg-watermark">张❤王</div>

      <div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 左侧：头像区 */}
        <div className="card-left">
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

        {/* 右侧：信息区 */}
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
      </div>
    </>
  )
}

export default App
