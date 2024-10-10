console.log('app.js loaded');

function App() {
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [attributes, setAttributes] = React.useState({
      M: 0, T: 0, SV: 0, W: 0, LD: 0, OC: 0,
    });
    const [attacks, setAttacks] = React.useState([]);
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    const handleAttributeChange = (attr, value) => {
      setAttributes(prev => ({ ...prev, [attr]: value }));
    };
  
    const addAttack = () => {
      setAttacks(prev => [...prev, { name: "", A: 0, BS: 0, S: 0, AP: 0, D: 0 }]);
    };
  
    const updateAttack = (index, field, value) => {
      setAttacks(prev => {
        const newAttacks = [...prev];
        newAttacks[index] = { ...newAttacks[index], [field]: field === 'name' ? value : parseInt(value) };
        return newAttacks;
      });
    };
  
    return (
      <div className="container">
        <h1>Custom Warhammer Card Creator</h1>
        <div className="card-creator">
          <div className="input-section">
            <input
              type="text"
              placeholder="Unit Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <h3>Attributes</h3>
            {Object.keys(attributes).map(attr => (
              <div key={attr}>
                <label>{attr}:</label>
                <input
                  type="number"
                  value={attributes[attr]}
                  onChange={(e) => handleAttributeChange(attr, parseInt(e.target.value))}
                />
              </div>
            ))}
            <h3>Attacks</h3>
            {attacks.map((attack, index) => (
              <div key={index} className="attack-input">
                <input
                  type="text"
                  placeholder="Attack Name"
                  value={attack.name}
                  onChange={(e) => updateAttack(index, "name", e.target.value)}
                />
                <div className="attack-stats">
                  {["A", "BS", "S", "AP", "D"].map(field => (
                    <div key={field} className="attack-stat">
                      <label>{field}</label>
                      <input
                        type="number"
                        value={attack[field]}
                        onChange={(e) => updateAttack(index, field, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={addAttack}>Add Attack</button>
          </div>
          <div className="card-preview">
            <div className="pokemon-card-wrapper">
              <div className="pokemon-card">
                <div className="card-header">
                  <h2>{name || "Unit Name"}</h2>
                  <div className="attributes">
                    {Object.entries(attributes).map(([attr, value]) => (
                      <div key={attr} className="attribute-circle">
                        <span className="attribute-label">{attr}</span>
                        <span className="attribute-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {image && <img src={image} alt="Unit" className="pokemon-image" />}
                <div className="attacks">
                  <div className="attack-labels">
                    <span></span>
                    <span className="stat-label">A</span>
                    <span className="stat-label">BS</span>
                    <span className="stat-label">S</span>
                    <span className="stat-label">AP</span>
                    <span className="stat-label">D</span>
                  </div>
                  {attacks.map((attack, index) => (
                    <div key={index} className="attack-info">
                      <span className="attack-name">{attack.name}</span>
                      <div className="attack-values">
                        <span className="stat-value">{attack.A}</span>
                        <span className="stat-value">{attack.BS}</span>
                        <span className="stat-value">{attack.S}</span>
                        <span className="stat-value">{attack.AP}</span>
                        <span className="stat-value">{attack.D}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  try {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  console.log('React component rendered successfully');
} catch (error) {
  console.error('Error rendering React component:', error);
  document.getElementById('debug').innerHTML += '<br>Error rendering React component. Check console for details.';
}
