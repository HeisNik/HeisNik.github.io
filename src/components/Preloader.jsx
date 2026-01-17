import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const Preloader = ({ finishLoading }) => {
  const [status, setStatus] = useState('loading'); // loading, shaking, opening

  useEffect(() => {
    // 1. Lataus kestää 2s
    const shakeTimer = setTimeout(() => setStatus('shaking'), 2000);

    // 2. Tärinä kestää 0.5s, jonka jälkeen ovet alkavat aueta
    const openTimer = setTimeout(() => setStatus('opening'), 2500);

    // 3. Ilmoitetaan App.jsx:lle vasta kun ovet ovat täysin auki (1.5s myöhemmin)
    const finishTimer = setTimeout(() => {
      finishLoading();
    }, 4000);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  }, [finishLoading]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes heavyShake {
        0% { transform: translate(0, 0); }
  20% { transform: translate(-8px, 5px); }  /* Suurempi liike vasemmalle/alas */
  40% { transform: translate(8px, -3px); }  /* Suurempi liike oikealle/ylös */
  60% { transform: translate(-8px, -5px); } /* Lisää dynaamisuutta */
  80% { transform: translate(6px, 4px); }
  100% { transform: translate(0, 0); }
      }
      @keyframes glitchPulse {
        0% { opacity: 1; text-shadow: 2px 0 #ff0066; }
        50% { opacity: 0.7; text-shadow: -2px 0 #07eae6; }
        100% { opacity: 1; text-shadow: 2px 0 #ff0066; }
      }
    `;
    document.head.appendChild(style);
    return () => { if (document.head.contains(style)) document.head.removeChild(style); };
  }, []);

  const getDoorWrapperStyle = (isLeft) => ({
    position: 'absolute',
    top: 0,
    width: '51vw',
    height: '100vh',
    zIndex: 10001,
    [isLeft ? 'left' : 'right']: 0,
    // Tämä hoitaa vain aukeamisen
    transition: status === 'opening' ? 'transform 1.5s cubic-bezier(0.8, 0, 0.2, 1)' : 'none',
    transform: status === 'opening' ? (isLeft ? 'translateX(-100%)' : 'translateX(100%)') : 'translateX(0)',
  });

  const getDoorPanelStyle = (isLeft) => ({
    width: '100%',
    height: '100%',
    background: '#000',
    borderRight: isLeft ? '3px solid #07eae6' : 'none',
    borderLeft: !isLeft ? '3px solid #07eae6' : 'none',
    boxShadow: '0 0 20px rgba(7, 234, 230, 0.2)',
    // Tämä hoitaa vain tärinän
    animation: status === 'shaking' ? 'heavyShake 0.1s infinite' : 'none'
  });

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'transparent', overflow: 'hidden' }}>
      {/* VASEN OVI */}
      <div style={getDoorWrapperStyle(true)}>
        <div style={getDoorPanelStyle(true)} />
      </div>

      {/* OIKEA OVI */}
      <div style={getDoorWrapperStyle(false)}>
        <div style={getDoorPanelStyle(false)} />
      </div>
      
      {/* TEKSTI JA LATAUSPALKKI */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        zIndex: 10002,
        textAlign: 'center',
        color: '#07eae6',
        fontFamily: 'monospace',
        opacity: status === 'opening' ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none'
      }}>
        <h1 style={{ fontSize: 'clamp(0.8rem, 4vw, 2.5rem)', letterSpacing: '10px', animation: 'glitchPulse 0.2s infinite', margin: 0 }}>
          VAULT_BREACH
        </h1>
        <div style={{ marginTop: '20px', letterSpacing: '2px', fontWeight: 'bold' }}>
          {status === 'shaking' ? '> WARNING: HYDRAULIC_FAILURE' : '> STATUS: READY_TO_OPEN'}
        </div>
        <div style={{ 
          width: 'clamp(180px, 40vw, 300px)', 
          height: '2px', 
          background: '#111', 
          margin: '30px auto',
          position: 'relative'
        }}>
          <div style={{ 
            height: '100%', 
            background: '#07eae6', 
            // Palkki on 100% heti kun status ei ole enää 'loading'
            width: status === 'loading' ? '0%' : '100%', 
            // NOPEUTETAAN TÄTÄ: 1.8s varmistaa, että palkki on perillä ennen status-muutosta (2.0s)
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)', 
            boxShadow: '0 0 15px #07eae6'
          }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
