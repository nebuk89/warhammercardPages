console.log('app.js loaded');

function App() {
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState("https://github.com/nebuk89/FFmpeg-Builds/blob/master/Picture.png?raw=true"); // Set initial state to placeholder image
    const [attributes, setAttributes] = React.useState({
      M: 0, T: 0, SV: 0, W: 0, LD: 0, OC: 0,
    });
    const [attacks, setAttacks] = React.useState([]);
    const [overlayText, setOverlayText] = React.useState(""); 
    const [factionText, setFactionText] = React.useState("■FACTION : Oath of Moment\nStart of the Fight phase, select  1   to apply to models in this unit until the end of the phase:\n■ Swords of the Imperium: Each time a model in this unit makes a melee attack, re-roll a Hit roll of 1.\n■ Shields of the Imperium: Each time an invulnerable saving throw is made for a model in this unit, re-roll a saving throw of 1");

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

    React.useEffect(() => {
      setFactionText("■FACTION : Oath of Moment\nStart of the Fight phase, select  1   to apply to models in this unit until the end of the phase:\n■ Swords of the Imperium: Each time a model in this unit makes a melee attack, re-roll a Hit roll of 1.\n■ Shields of the Imperium: Each time an invulnerable saving throw is made for a model in this unit, re-roll a saving throw of 1");
    }, [overlayText]);
   
    React.useEffect(() => {
      const pokemonCardTitle = document.querySelector('.pokemon-card h2');
      const attackInfoElements = document.querySelectorAll('.attack-info');
      const factionTextElement = document.querySelector('.faction-text');
      const maxWidth = 240;
      const maxWidthAttack = 110;

      function resizeTextToFit() {
      
      // Resize the title text to fit within the maxWidth
      let fontSize = parseInt(window.getComputedStyle(pokemonCardTitle).fontSize);
      if (pokemonCardTitle.scrollWidth > maxWidth) {
        while (pokemonCardTitle.scrollWidth > maxWidth && fontSize > 0) {
        fontSize--;
        pokemonCardTitle.style.fontSize = fontSize + 'px';
        }
      } else {
        while (pokemonCardTitle.scrollWidth < pokemonCardTitle.clientWidth && fontSize < maxWidth) {
        fontSize++;
        pokemonCardTitle.style.fontSize = fontSize + 'px';
        }
      }
      pokemonCardTitle.style.whiteSpace = 'nowrap'; // Add this line to prevent text wrapping
  
// Resize the attacks text to fit within the maxWidth
      attackInfoElements.forEach((attackInfo) => {
        const attackName = attackInfo.querySelector('.attack-name');
        let attackFontSize = parseInt(window.getComputedStyle(attackName).fontSize);
        if (attackName.scrollWidth > maxWidthAttack) {
        while (attackName.scrollWidth > maxWidthAttack && attackFontSize > 0) {
          attackFontSize--;
          attackName.style.fontSize = attackFontSize + 'px';
        }
        } else {
        while (attackName.scrollWidth < attackName.clientWidth && attackFontSize < maxWidthAttack) {
          attackFontSize++;
          attackName.style.fontSize = attackFontSize + 'px';
        }
        }
        attackName.style.whiteSpace = 'nowrap'; // Add this line to prevent text wrapping


      });
       
     
      }

// HTML structure (for reference)
// <textarea id="faction-text-input"></textarea>
// <div class="faction-text"></div>

const inputBox = document.getElementById('faction-text-input');
const factionText = document.querySelector('.faction-text');

inputBox.addEventListener('input', updateAndResizeText);

function updateAndResizeText() {
    factionText.textContent = inputBox.value;
    resizeText();
}

function resizeText() {
    const fontSize = parseInt(window.getComputedStyle(factionText).fontSize);
    let newFontSize = fontSize;
    
    // Reset font size to ensure accurate measurements
    factionText.style.fontSize = '16px';
    
    while (factionText.scrollWidth > factionText.offsetWidth ||
           factionText.scrollHeight > factionText.offsetHeight) {
        newFontSize--;
        factionText.style.fontSize = `${newFontSize}px`;
    }
    
    while (factionText.scrollWidth < factionText.offsetWidth &&
           factionText.scrollHeight < factionText.offsetHeight &&
           newFontSize < fontSize) {
        newFontSize++;
        factionText.style.fontSize = `${newFontSize}px`;
        if (factionText.scrollWidth > factionText.offsetWidth ||
            factionText.scrollHeight > factionText.offsetHeight) {
            newFontSize--;
            factionText.style.fontSize = `${newFontSize}px`;
            break;
        }
    }
}

// Initial resize
resizeText();

// Resize on window resize
window.addEventListener('resize', resizeText);

      resizeTextToFit();
      window.addEventListener('resize', resizeTextToFit);
      window.addEventListener('input', resizeTextToFit);

      return () => {
      window.removeEventListener('resize', resizeTextToFit);
      window.removeEventListener('input', resizeTextToFit);
      };
    }, [name, factionText]); // Add 'name' and 'factionText' as dependencies to the useEffect hook




  
    return (
      <div className="container">
        <h1>Custom Warhammer Card Creator 1</h1>
        <div className="card-creator">
          <div className="input-section">
            <input
              type="text"
              placeholder="Unit Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
             <input // P76ad
              type="text"
              placeholder="Keywords"
              value={overlayText}
              onChange={(e) => setOverlayText(e.target.value)} // P5b03
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
            <h3>Faction Text</h3>
            <textarea
              id="faction-text-input"
              value={factionText}
              onChange={(e) => setFactionText(e.target.value)}
              rows="6"
              cols="50"
            />
          </div>
          <div className="card-preview">
            <div className="pokemon-card-wrapper">
              <div className="pokemon-card">
                <div className="card-header">
                  <h2>{name || "Assault Intercessors"}</h2>
                  <div className="attributes">
                    {Object.entries(attributes).map(([attr, value]) => (
                      <div key={attr} className="attribute-circle">
                        <span className="attribute-label">{attr}</span>
                        <span className="attribute-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overlay-text">{overlayText || "Adeptus Astartes, Blood Angels"}</div>
                {image && <img src={image} alt="Unit" className="pokemon-image" />}
                <div className="keywords">Infantry, Grenades, Imperium, Tacticus, Bladeguard Veteran Squad</div>
                
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
                <div className="faction-text">{factionText}</div>
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
