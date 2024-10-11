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
});
