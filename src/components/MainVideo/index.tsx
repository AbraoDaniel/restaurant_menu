export default function MainVideo() {
  return (
    <div className="main-video" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <video
        src="/assets/main_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
      />
      <div className="background-gradient">
      </div>
    </div>
  )
}
