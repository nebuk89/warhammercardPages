console.log('app.js loaded');

function App() {
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState("/resources/blade_guard_sample.png"); // Set initial state to image URL in the resources folder
    const [attributes, setAttributes] = React.useState({
      M: 0, T: 0, SV: 0, W: 0, LD: 0, OC: 0,
    });
    const [attacks, setAttacks] = React.useState([]);
    const [overlayText, setOverlayText] = React.useState(""); 
    const [factionText, setFactionText] = React.useState("■FACTION : Oath of Moment\nStart of the Fight phase, select  1   to apply to models in this unit until the end of the phase:\n■ Swords of the Imperium: Each time a model in this unit makes a melee attack, re-roll a Hit roll of 1.\n■ Shields of the Imperium: Each time an invulnerable saving throw is made for a model in this unit, re-roll a saving throw of 1");
    const [showImage, setShowImage] = React.useState(false); // Pc4d9
    const invulnerableSaveRef = React.useRef(null); // Pb848
    const initialPosition = React.useRef({ top: 0, left: 0 }); // Pb848
    const [imageFormat, setImageFormat] = React.useState("jpeg"); // Pda30
    const [saveValue, setSaveValue] = React.useState(""); // P18cb

    // Event handler for image upload
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
  
    // Event handler for attribute change
    const handleAttributeChange = (attr, value) => {
      setAttributes(prev => ({ ...prev, [attr]: value }));
    };
  
    // Event handler for adding an attack
    const addAttack = () => {
      setAttacks(prev => [...prev, { name: "", A: 0, BS: 0, S: 0, AP: 0, D: 0, OtherStats: "" }]);
    };
  
    // Event handler for updating an attack
    const updateAttack = (index, field, value) => {
      setAttacks(prev => {
        const newAttacks = [...prev];
        newAttacks[index] = { ...newAttacks[index], [field]: field === 'name' || field === 'otherAttackAttributes' ? value : parseInt(value) };
        return newAttacks;
      });
      if (field === 'name') {
        resizeAttackTextToFit();
      }
    };

    // Event handler for toggling the showImage state // P6bd1
    const handleShowImageToggle = () => {
      setShowImage(prev => !prev);
      if (!showImage && invulnerableSaveRef.current) {
        const rect = invulnerableSaveRef.current.getBoundingClientRect();
        initialPosition.current = { top: rect.top, left: rect.left };
      }
    };

    // Event handler for save value change // P5ae9
    const handleSaveValueChange = (e) => {
      setSaveValue(e.target.value + "+");
    };

    // Function to resize text to fit within the maxWidth
    const resizeTextToFit = () => {
      const warhammerCardTitle = document.querySelector('.warhammer-card h2');
      const attackInfoElements = document.querySelectorAll('.attack-info');
      const maxWidth = 240;
      const maxWidthAttack = 110;

      let fontSize = parseInt(window.getComputedStyle(warhammerCardTitle).fontSize);
      if (warhammerCardTitle.scrollWidth > maxWidth) {
        while (warhammerCardTitle.scrollWidth > maxWidth && fontSize > 0) {
          fontSize--;
          warhammerCardTitle.style.fontSize = fontSize + 'px';
        }
      } else {
        while (warhammerCardTitle.scrollWidth < warhammerCardTitle.clientWidth && fontSize < maxWidth) {
          fontSize++;
          warhammerCardTitle.style.fontSize = fontSize + 'px';
        }
      }

      resizeAttackTextToFit();
    };

    // Function to resize attack text to fit within the maxWidthAttack
    const resizeAttackTextToFit = () => {
      const attackInfoElements = document.querySelectorAll('.attack-info');
      const maxWidthAttack = 110;
      const maxHeightAttack = 2 * parseFloat(getComputedStyle(document.documentElement).fontSize); // 2em

      attackInfoElements.forEach((attackInfo) => {
      const attackName = attackInfo.querySelector('.attack-name');
      let attackFontSize = parseInt(window.getComputedStyle(attackName).fontSize);
      if (attackName.scrollWidth > maxWidthAttack || attackName.scrollHeight > maxHeightAttack) {
        while ((attackName.scrollWidth > maxWidthAttack || attackName.scrollHeight > maxHeightAttack) && attackFontSize > 0) {
        attackFontSize--;
        attackName.style.fontSize = attackFontSize + 'px';
        }
      } else {
        while (attackName.scrollWidth < attackName.clientWidth && attackName.scrollHeight < maxHeightAttack && attackFontSize < maxWidthAttack) {
        attackFontSize++;
        attackName.style.fontSize = attackFontSize + 'px';
        }
      }

      const otherAttackAttributes = attackInfo.querySelector('.other-attack-attributes');
      let otherAttackAttributesFontSize = parseInt(window.getComputedStyle(otherAttackAttributes).fontSize);
      if (otherAttackAttributes.scrollWidth > maxWidthAttack / 2 || otherAttackAttributes.scrollHeight > maxHeightAttack) {
        while ((otherAttackAttributes.scrollWidth > maxWidthAttack / 2 || otherAttackAttributes.scrollHeight > maxHeightAttack) && otherAttackAttributesFontSize > 0) {
        otherAttackAttributesFontSize--;
        otherAttackAttributes.style.fontSize = otherAttackAttributesFontSize + 'px';
        }
      } else {
        while (otherAttackAttributes.scrollWidth < otherAttackAttributes.clientWidth && otherAttackAttributes.scrollHeight < maxHeightAttack && otherAttackAttributesFontSize < maxWidthAttack / 2) {
        otherAttackAttributesFontSize++;
        otherAttackAttributes.style.fontSize = otherAttackAttributesFontSize + 'px';
        }
      }
      });
    };
    

    // Function to resize faction text to fit within the container
    const resizeFactionText = () => {
      const factionTextElement = document.querySelector('.faction-text');
      const fontSize = parseInt(window.getComputedStyle(factionTextElement).fontSize);
      let newFontSize = fontSize;

      factionTextElement.style.fontSize = '16px';

      while (factionTextElement.scrollWidth > factionTextElement.offsetWidth ||
             factionTextElement.scrollHeight > factionTextElement.offsetHeight) {
        newFontSize--;
        factionTextElement.style.fontSize = `${newFontSize}px`;
      }

      while (factionTextElement.scrollWidth < factionTextElement.offsetWidth &&
             factionTextElement.scrollHeight < factionTextElement.offsetHeight &&
             newFontSize < fontSize) {
        newFontSize++;
        factionTextElement.style.fontSize = `${newFontSize}px`;
        if (factionTextElement.scrollWidth > factionTextElement.offsetWidth ||
            factionTextElement.scrollHeight > factionTextElement.offsetHeight) {
          newFontSize--;
          factionTextElement.style.fontSize = `${newFontSize}px`;
          break;
        }
      }
    };

    // Effect to resize text on window resize
    React.useEffect(() => {
      resizeTextToFit();
      window.addEventListener('resize', resizeTextToFit);
      window.addEventListener('input', resizeTextToFit);

      return () => {
        window.removeEventListener('resize', resizeTextToFit);
        window.removeEventListener('input', resizeTextToFit);
      };
    }, [name, factionText]);

    // Effect to resize faction text on window resize
    React.useEffect(() => {
      resizeFactionText();
      window.addEventListener('resize', resizeFactionText);

      return () => {
        window.removeEventListener('resize', resizeFactionText);
      };
    }, [factionText]);

    // Effect to resize attack text when attacks state changes
    React.useEffect(() => {
      resizeAttackTextToFit();
    }, [attacks]);

    // Effect to set the position of the invulnerable-save image based on the stored initial position
    React.useEffect(() => {
      if (invulnerableSaveRef.current) {
        invulnerableSaveRef.current.style.top = `${initialPosition.current.top}px`;
        invulnerableSaveRef.current.style.left = `${initialPosition.current.left}px`;
      }
    }, [attacks]);

    // Effect to update the text content of the invulnerable-save object when saveValue changes
    React.useEffect(() => {
      if (invulnerableSaveRef.current) {
        invulnerableSaveRef.current.textContent = saveValue;
      }
    }, [saveValue]);

    // Function to handle exporting to Image
    const handleExportToImage = () => {
      const cardWrapper = document.querySelector('.warhammer-card-wrapper');
      
      // Ensure the element exists
      if (!cardWrapper) {
        console.error('Card wrapper not found');
        return;
      }
    
      // 100ms delay
      setTimeout(() => {
        html2canvas(cardWrapper).then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL(`image/${imageFormat}`);
          link.download = "warhammer_card.jpg";
          link.click();
        });
      }, 100);
  
    };

    return (
      <div className="container">
        <h1>Custom Warhammer Card Creator nebuk89 WIP</h1>
        <div className="card-creator">
          <div className="input-section">
            <button onClick={handleExportToImage}>Export to Image</button>
            <select value={imageFormat} onChange={(e) => setImageFormat(e.target.value)}>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="bmp">BMP</option>
              <option value="gif">GIF</option>
            </select>
            <input
              type="text"
              placeholder="Unit Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Keywords"
              value={overlayText}
              onChange={(e) => setOverlayText(e.target.value)}
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
                  <div className="attack-stat">
                    <label>Other stats</label>
                    <input
                      type="text"
                      value={attack.otherAttackAttributes}
                      onChange={(e) => updateAttack(index, "otherAttackAttributes", e.target.value)}
                    />
                  </div>
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
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={showImage}
                  onChange={handleShowImageToggle}
                />
                Invulnerable Save
              </label>
            </div>
            {showImage && (
              <div>
                <label>Save Value:</label>
                <input
                  type="number"
                  value={saveValue.replace("+", "")}
                  onChange={handleSaveValueChange}
                />
              </div>
            )}
          </div>
          <div className="card-preview">
            <div className="warhammer-card-wrapper">
              <div className="warhammer-card">
                <div className="card-header">
                  <h2>{name || "Assault Intercessors"}</h2>
                  <div className="attributes">
                    {Object.entries(attributes).map(([attr, value], index) => (
                      <div key={attr} className="attribute-circle">
                        <span className="attribute-label">{attr}</span>
                        <span className="attribute-value">
                          {index === 0 ? `${value}"` : index === 2 || index === 4 ? `${value}+` : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overlay-text">{overlayText || "Adeptus Astartes, Blood Angels"}</div>
                {image && <img src={image} alt="Unit" className="warhammer-image" />}
                {showImage && (
                  <div className="invulnerable-save"  ref={invulnerableSaveRef} style={{ top: initialPosition.current.top, left: initialPosition.current.left }}>
                    {saveValue}
                  </div>
                )}
                <div className="keywords">Infantry, Grenades, Imperium, Tacticus, Bladeguard Veteran Squad</div>
                
                <div className="attacks">
                  <div className="attack-labels">
                    <span></span>
                    <span className="stat-label">A</span>
                    <span className="stat-label">BS</span>
                    <span className="stat-label">S</span>
                    <span className="stat-label">AP</span>
                    <span className="stat-label">D</span>
                    <span className="stat-label"> </span>
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
                        <span className="other-attack-attributes">{attack.otherAttackAttributes}</span>
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

