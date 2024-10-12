import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './app';

describe('App Component', () => {
  test('should update name state on input change', () => {
    const { getByPlaceholderText } = render(<App />);
    const nameInput = getByPlaceholderText('Unit Name');
    fireEvent.change(nameInput, { target: { value: 'Test Unit' } });
    expect(nameInput.value).toBe('Test Unit');
  });

  test('should update overlayText state on input change', () => {
    const { getByPlaceholderText } = render(<App />);
    const overlayTextInput = getByPlaceholderText('Keywords');
    fireEvent.change(overlayTextInput, { target: { value: 'Test Keywords' } });
    expect(overlayTextInput.value).toBe('Test Keywords');
  });

  test('should update image state on image upload', () => {
    const { getByLabelText } = render(<App />);
    const fileInput = getByLabelText('Upload Image');
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput.files[0]).toBe(file);
  });

  test('should update attributes state on input change', () => {
    const { getByLabelText } = render(<App />);
    const attributeInput = getByLabelText('M:');
    fireEvent.change(attributeInput, { target: { value: '5' } });
    expect(attributeInput.value).toBe('5');
  });

  test('should add a new attack on button click', () => {
    const { getByText, getAllByPlaceholderText } = render(<App />);
    const addButton = getByText('Add Attack');
    fireEvent.click(addButton);
    const attackInputs = getAllByPlaceholderText('Attack Name');
    expect(attackInputs.length).toBe(1);
  });

  test('should update attack state on input change', () => {
    const { getByText, getAllByPlaceholderText } = render(<App />);
    const addButton = getByText('Add Attack');
    fireEvent.click(addButton);
    const attackNameInput = getAllByPlaceholderText('Attack Name')[0];
    fireEvent.change(attackNameInput, { target: { value: 'Test Attack' } });
    expect(attackNameInput.value).toBe('Test Attack');
  });

  test('should update factionText state on textarea change', () => {
    const { getByLabelText } = render(<App />);
    const factionTextInput = getByLabelText('Faction Text');
    fireEvent.change(factionTextInput, { target: { value: 'Test Faction Text' } });
    expect(factionTextInput.value).toBe('Test Faction Text');
  });

  test('should render new text entry correctly', () => {
    const { getByText, getAllByPlaceholderText } = render(<App />);
    const addButton = getByText('Add Attack');
    fireEvent.click(addButton);
    const otherAttackAttributesInput = getAllByPlaceholderText('Other Attack Attributes')[0];
    fireEvent.change(otherAttackAttributesInput, { target: { value: 'Test Other Attack Attributes' } });
    expect(otherAttackAttributesInput.value).toBe('Test Other Attack Attributes');
  });

  test('should update new text entry state correctly', () => {
    const { getByText, getAllByPlaceholderText } = render(<App />);
    const addButton = getByText('Add Attack');
    fireEvent.click(addButton);
    const otherAttackAttributesInput = getAllByPlaceholderText('Other Attack Attributes')[0];
    fireEvent.change(otherAttackAttributesInput, { target: { value: 'Test Other Attack Attributes' } });
    expect(otherAttackAttributesInput.value).toBe('Test Other Attack Attributes');
  });

  test('should resize other-attack-attributes text correctly', () => {
    const { getByText, getAllByPlaceholderText } = render(<App />);
    const addButton = getByText('Add Attack');
    fireEvent.click(addButton);
    const otherAttackAttributesInput = getAllByPlaceholderText('Other Attack Attributes')[0];
    fireEvent.change(otherAttackAttributesInput, { target: { value: 'A very long text that should trigger resizing of the font size to fit within the box' } });
    const otherAttackAttributesElement = getByText('A very long text that should trigger resizing of the font size to fit within the box');
    expect(otherAttackAttributesElement.style.fontSize).not.toBe('');
  });

  test('should append special character " to the first attribute circle value', () => {
    const { getByText } = render(<App />);
    const firstAttributeValue = getByText(/0"/);
    expect(firstAttributeValue).toBeInTheDocument();
  });

  test('should append special character + to the third attribute circle value', () => {
    const { getByText } = render(<App />);
    const thirdAttributeValue = getByText(/0\+/);
    expect(thirdAttributeValue).toBeInTheDocument();
  });

  test('should append special character + to the fifth attribute circle value', () => {
    const { getByText } = render(<App />);
    const fifthAttributeValue = getByText(/0\+/);
    expect(fifthAttributeValue).toBeInTheDocument();
  });

  test('should render the tick box', () => {
    const { getByLabelText } = render(<App />);
    const tickBox = getByLabelText('Show Image');
    expect(tickBox).toBeInTheDocument();
  });

  test('should render the image when the tick box is checked', () => {
    const { getByLabelText, getByAltText } = render(<App />);
    const tickBox = getByLabelText('Show Image');
    fireEvent.click(tickBox);
    const image = getByAltText('Invulnerable Save');
    expect(image).toBeInTheDocument();
  });

  test('should position the invulnerable-save image correctly', () => {
    const { getByLabelText, getByAltText } = render(<App />);
    const tickBox = getByLabelText('Show Image');
    fireEvent.click(tickBox);
    const image = getByAltText('Invulnerable Save');
    const warhammerImage = getByAltText('Unit');
    const warhammerImageRect = warhammerImage.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();
    expect(imageRect.left).toBeCloseTo(warhammerImageRect.right - imageRect.width / 2);
    expect(imageRect.top).toBeCloseTo(warhammerImageRect.bottom - imageRect.height / 2);
  });

  test('should ensure the invulnerable-save image remains in its initial position when the attacks object changes', () => {
    const { getByLabelText, getByAltText, getByText } = render(<App />);
    const tickBox = getByLabelText('Show Image');
    fireEvent.click(tickBox);
    const image = getByAltText('Invulnerable Save');
    const initialRect = image.getBoundingClientRect();
    const addButton = getByText('Add Attack');
    fireEvent.click(addButton);
    const newRect = image.getBoundingClientRect();
    expect(newRect.top).toBe(initialRect.top);
    expect(newRect.left).toBe(initialRect.left);
  });

  test('should render the Image export button at the top of the input section', () => {
    const { getByText } = render(<App />);
    const imageButton = getByText('Export to Image');
    const inputSection = imageButton.closest('.input-section');
    expect(inputSection.firstChild).toBe(imageButton);
  });

  test('should trigger handleExportToImage function on button click', () => {
    const { getByText } = render(<App />);
    const imageButton = getByText('Export to Image');
    fireEvent.click(imageButton);
    // Assuming handleExportToImage function has a console.log statement
    expect(console.log).toHaveBeenCalledWith('handleExportToImage function triggered');
  });

  test('should generate an image with correct dimensions', () => {
    const { getByText } = render(<App />);
    const imageButton = getByText('Export to Image');
    fireEvent.click(imageButton);
    // Assuming handleExportToImage function generates an image with specific dimensions
    const cardWrapper = document.querySelector('.warhammer-card-wrapper');
    html2canvas(cardWrapper, { backgroundColor: null, scale: 3, useCORS: true, allowTaint: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        expect(img.width).toBe(cardWrapper.offsetWidth * 3);
        expect(img.height).toBe(cardWrapper.offsetHeight * 3);
      };
    });
  });

  test('should capture the content of the .warhammer-card-wrapper including images', () => {
    const { getByText } = render(<App />);
    const imageButton = getByText('Export to Image');
    fireEvent.click(imageButton);
    const cardWrapper = document.querySelector('.warhammer-card-wrapper');
    html2canvas(cardWrapper, { backgroundColor: null, scale: 3, useCORS: true, allowTaint: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      expect(imgData).toContain('data:image/jpeg;base64');
    });
  });

  test('should include the border-bottom image in the generated image', () => {
    const { getByText } = render(<App />);
    const imageButton = getByText('Export to Image');
    fireEvent.click(imageButton);
    const cardWrapper = document.querySelector('.warhammer-card-wrapper');
    html2canvas(cardWrapper, { backgroundColor: null, scale: 3, useCORS: true, allowTaint: true, foreignObjectRendering: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        expect(img.src).toContain('data:image/jpeg;base64');
      };
    });
  });

  test('should include the linear-gradient border-image on faction-text in the generated image', () => {
    const { getByText } = render(<App />);
    const imageButton = getByText('Export to Image');
    fireEvent.click(imageButton);
    const cardWrapper = document.querySelector('.warhammer-card-wrapper');
    html2canvas(cardWrapper, { backgroundColor: null, scale: 3, useCORS: true, allowTaint: true, foreignObjectRendering: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        expect(img.src).toContain('data:image/jpeg;base64');
        const factionTextElement = document.querySelector('.faction-text');
        const computedStyle = window.getComputedStyle(factionTextElement);
        expect(computedStyle.borderImageSource).toContain('linear-gradient');
      };
    });
  });

  test('should render the dropdown to select the image format', () => {
    const { getByText, getByDisplayValue } = render(<App />);
    const imageButton = getByText('Export to Image');
    fireEvent.click(imageButton);
    const dropdown = getByDisplayValue('PNG');
    expect(dropdown).toBeInTheDocument();
  });

  test('should update the image format state on dropdown change', () => {
    const { getByDisplayValue } = render(<App />);
    const dropdown = getByDisplayValue('PNG');
    fireEvent.change(dropdown, { target: { value: 'JPEG' } });
    expect(dropdown.value).toBe('JPEG');
  });

  test('should export to the correct image format based on dropdown selection', () => {
    const { getByText, getByDisplayValue } = render(<App />);
    const dropdown = getByDisplayValue('PNG');
    fireEvent.change(dropdown, { target: { value: 'JPEG' } });
    const imageButton = getByText('Export to Image');
    fireEvent.click(imageButton);
    const cardWrapper = document.querySelector('.warhammer-card-wrapper');
    html2canvas(cardWrapper, { backgroundColor: '#fff', scale: 3, useCORS: true, allowTaint: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      expect(imgData).toContain('data:image/jpeg;base64');
    });
  });

  test('should verify that the exported image is not blank or empty', () => {
    const { getByText } = render(<App />);
    const imageButton = getByText('Export to Image');
    fireEvent.click(imageButton);
    const cardWrapper = document.querySelector('.warhammer-card-wrapper');
    html2canvas(cardWrapper, { backgroundColor: '#fff', scale: 3, useCORS: true, allowTaint: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        const canvasContext = document.createElement('canvas').getContext('2d');
        canvasContext.drawImage(img, 0, 0);
        const pixelData = canvasContext.getImageData(0, 0, img.width, img.height).data;
        const isBlank = pixelData.every((value, index) => value === 255 || (index + 1) % 4 === 0);
        expect(isBlank).toBe(false);
      };
    });
  });

  test('should verify that the background color of the exported image is not transparent', () => {
    const { getByText } = render(<App />);
    const imageButton = getByText('Export to Image');
    fireEvent.click(imageButton);
    const cardWrapper = document.querySelector('.warhammer-card-wrapper');
    html2canvas(cardWrapper, { backgroundColor: '#fff', scale: 3, useCORS: true, allowTaint: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        const canvasContext = document.createElement('canvas').getContext('2d');
        canvasContext.drawImage(img, 0, 0);
        const pixelData = canvasContext.getImageData(0, 0, img.width, img.height).data;
        const hasTransparentBackground = pixelData.some((value, index) => value === 0 && (index + 1) % 4 === 0);
        expect(hasTransparentBackground).toBe(false);
      };
    });
  });

  test('should render the number selector when the Invulnerable Save tickbox is set to true', () => {
    const { getByLabelText, getByText } = render(<App />);
    const tickBox = getByLabelText('Invulnerable Save');
    fireEvent.click(tickBox);
    const numberSelector = getByText('Save Value:');
    expect(numberSelector).toBeInTheDocument();
  });

  test('should update the saveValue state when the number selector value changes', () => {
    const { getByLabelText, getByText } = render(<App />);
    const tickBox = getByLabelText('Invulnerable Save');
    fireEvent.click(tickBox);
    const numberSelector = getByText('Save Value:');
    fireEvent.change(numberSelector, { target: { value: '5' } });
    expect(numberSelector.value).toBe('5');
  });

  test('should overlay saveValue on invulnerable-save object when tick box is set to two', () => {
    const { getByLabelText, getByText } = render(<App />);
    const tickBox = getByLabelText('Invulnerable Save');
    fireEvent.click(tickBox);
    const numberSelector = getByText('Save Value:');
    fireEvent.change(numberSelector, { target: { value: '2' } });
    const invulnerableSave = getByText('2');
    expect(invulnerableSave).toBeInTheDocument();
  });

  test('should retain the + symbol when the invulnerable save value is changed', () => {
    const { getByLabelText, getByText } = render(<App />);
    const tickBox = getByLabelText('Invulnerable Save');
    fireEvent.click(tickBox);
    const numberSelector = getByText('Save Value:');
    fireEvent.change(numberSelector, { target: { value: '3' } });
    const invulnerableSave = getByText('3+');
    expect(invulnerableSave).toBeInTheDocument();
  });

  test('should handle saveValue as a string and avoid type mismatch issues', () => {
    const { getByLabelText, getByText } = render(<App />);
    const tickBox = getByLabelText('Invulnerable Save');
    fireEvent.click(tickBox);
    const numberSelector = getByText('Save Value:');
    fireEvent.change(numberSelector, { target: { value: '4' } });
    const invulnerableSave = getByText('4+');
    expect(invulnerableSave).toBeInTheDocument();
  });

  test('should render the upload roster button', () => {
    const { getByText } = render(<App />);
    const uploadButton = getByText('Upload Roster');
    expect(uploadButton).toBeInTheDocument();
  });

  test('should trigger file input click when upload roster button is clicked', () => {
    const { getByText } = render(<App />);
    const uploadButton = getByText('Upload Roster');
    const fileInput = document.getElementById('fileInput');
    const clickSpy = jest.spyOn(fileInput, 'click');
    fireEvent.click(uploadButton);
    expect(clickSpy).toHaveBeenCalled();
  });

  test('should call handleFileSelect function when a file is selected', () => {
    const { getByText } = render(<App />);
    const uploadButton = getByText('Upload Roster');
    const fileInput = document.getElementById('fileInput');
    const handleFileSelectSpy = jest.spyOn(fileInput, 'onChange');
    fireEvent.click(uploadButton);
    fireEvent.change(fileInput, { target: { files: [new File(['dummy content'], 'example.ros')] } });
    expect(handleFileSelectSpy).toHaveBeenCalled();
  });
});
