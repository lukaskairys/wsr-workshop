import React from 'react';
import { render, waitFor } from '@testing-library/react';
import {
  pageTestkitFactory,
  inputTestkitFactory,
  dropdownTestkitFactory,
  textTestkitFactory,
  buttonTestkitFactory,
} from 'wix-style-react/dist/testkit';
import App from './App';

describe('App', () => {
  it('should render page', async () => {
    const { baseElement } = render(<App />);
    const page = pageTestkitFactory({
      wrapper: baseElement,
      dataHook: 'app-page',
    });
    expect(page.exists()).toBe(true);
  });

  it('should show submitted info section when form is filled and submited', async () => {
    const { baseElement } = render(<App />);

    const firstNameInput = inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'first-name-input',
    });
    const lastNameInput = inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'last-name-input',
    });
    const colorInput = dropdownTestkitFactory({
      wrapper: baseElement,
      dataHook: 'color-input',
    });
    const submitButton = buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: 'submit-button',
    });

    firstNameInput.enterText('Tom');
    lastNameInput.enterText('Smith');
    colorInput.driver.selectOptionById(1);

    await submitButton.click();

    const submittedFirstName = textTestkitFactory({
      wrapper: baseElement,
      dataHook: 'submitted-first-name',
    });

    await waitFor(() => {
      expect(submittedFirstName.getText()).toBe('Tom');
    });
  });

  it('should not show submitted info section when required fields are not filled', async () => {
    const { baseElement } = render(<App />);

    const colorInput = dropdownTestkitFactory({
      wrapper: baseElement,
      dataHook: 'color-input',
    });
    const submitButton = buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: 'submit-button',
    });
    const firstNameInput = inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'first-name-input',
    });

    firstNameInput.enterText('Tom');
    colorInput.driver.selectOptionById(1);

    await submitButton.click();

    const submittedFirstName = textTestkitFactory({
      wrapper: baseElement,
      dataHook: 'submitted-first-name',
    });

    await waitFor(() => {
      expect(submittedFirstName.exists()).toBe(false);
    });
  });

  it('should clear inputs when clear button is pressed', async () => {
    const { baseElement } = render(<App />);

    const firstNameInput = inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'first-name-input',
    });
    const lastNameInput = inputTestkitFactory({
      wrapper: baseElement,
      dataHook: 'last-name-input',
    });
    const colorInput = dropdownTestkitFactory({
      wrapper: baseElement,
      dataHook: 'color-input',
    });
    const clearButton = buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: 'clear-button',
    });

    firstNameInput.enterText('Tom');
    lastNameInput.enterText('Smith');
    colorInput.driver.selectOptionById(1);

    expect(firstNameInput.getText()).toBe('Tom');
    expect(lastNameInput.getText()).toBe('Smith');
    expect(colorInput.inputDriver.getValue()).toBe('Blue');

    await clearButton.click();

    await waitFor(() => {
      expect(firstNameInput.getText()).toBe('');
      expect(lastNameInput.getText()).toBe('');
      expect(colorInput.inputDriver.getValue()).toBe('');
    });
  });
});
