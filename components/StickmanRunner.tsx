'use client';

export default function StickmanRunner() {
  return (
    <div className="stickman-world">
      <div className="back one"></div>
      <div className="back two"></div>
      <div className="back three"></div>
      <div className="back four"></div>
      <div className="floor">
        <div className="rock one"></div>
        <div className="rock two"></div>
        <div className="rock three"></div>
        <div className="grass one"></div>
        <div className="grass two"></div>
        <div className="grass three"></div>
        <div className="grass four"></div>
        <div className="grass five"></div>
        <div className="grass six"></div>
        <div className="grass seven"></div>
        <div className="grass height"></div>
        <div className="grass nine"></div>
        <div className="grass ten"></div>
      </div>
      <div className="cloud one"></div>
      <div className="cloud two"></div>
      <div className="cloud three"></div>
      <div className="stick">
        <div className="head"></div>
        <div className="arm left">
          <div className="bottom"></div>
        </div>
        <div className="arm right">
          <div className="bottom"></div>
        </div>
        <div className="leg left">
          <div className="bottom"></div>
        </div>
        <div className="leg right">
          <div className="bottom"></div>
        </div>
      </div>
    </div>
  );
}
