import { useState, useRef } from 'react';

export default function FaceDetect({ token }) {
  const [url, setUrl] = useState('');
  const [faces, setFaces] = useState([]);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [error, setError] = useState('');
  const imgRef = useRef(null);

  const detect = async () => {
    setError('');
    setFaces([]);
    const res = await fetch('http://localhost:5000/face/detect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ imageUrl: url }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'Detection failed');
    setFaces(data.faces || data || []);
  };

  const onImgLoad = () => {
    const img = imgRef.current;
    setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
  };

  const renderBoxes = () =>
    faces.map((face, i) => {
      const rect = face.rectangle || face.bbox || {};
      if (!rect.left && rect.left !== 0) return null;
      const img = imgRef.current;
      const scaleX = img.clientWidth / imgSize.w;
      const scaleY = img.clientHeight / imgSize.h;
      return (
        <div
          key={i}
          className="face-box"
          style={{
            left: rect.left * scaleX,
            top: rect.top * scaleY,
            width: (rect.right - rect.left) * scaleX,
            height: (rect.bottom - rect.top) * scaleY,
          }}
        />
      );
    });

  return (
    <div className="detect-container">
      <h2>Face Detection</h2>
      <div className="input-row">
        <input
          type="url"
          placeholder="Paste image URL..."
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button onClick={detect} disabled={!url}>Detect</button>
      </div>
      {error && <p className="error">{error}</p>}
      {url && (
        <div className="img-wrapper">
          <img ref={imgRef} src={url} alt="target" onLoad={onImgLoad} />
          {renderBoxes()}
        </div>
      )}
      {faces.length > 0 && <p className="info">{faces.length} face(s) detected</p>}
    </div>
  );
}
