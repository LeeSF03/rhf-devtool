<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/docs/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" />
        </a>
    </p>
</div>

<p align="center">My custom react-hook-form devtool for debuggins</p>

## Goal

This is my custom React Component will help you to debug forms when working React Hook Form, and give you more insight about your form's detail.

## Install

`$ npm i -d @leesf/rhf-devtool-react`

## Quickstart

```typescript jsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@leesf/rhf-devtool-react';
import './App.css';

// using useForm
const App = () => {
  const methods = useForm({
    mode: 'onChange',
  });
  const { register, control, handleSubmit } = methods

  return (
    <>
      <DevTool {...methods} />

      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <h1>React Hook Form DevTools</h1>

        <label>Test</label>
        <input name="test" ref={register} />

        <input type="submit" />
      </form>
    </>
  );
};

// or using FormProvider
const App = () => {
  const methods = useForm({
    mode: 'onChange',
  });
  const { register, control, handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <DevTool />
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <h1>React Hook Form DevTools</h1>

        <label>Test</label>
        <input name="test" ref={register} />

        <input type="submit" />
      </form>
    <FormProvider>
  );
};

```

## Todo:

### Development

- [ ] Add unit, integrated and e2e tests
- [ ] Add CI/CD automation workflow for publishing

### Doc

- [ ] Add acknowledgements (react-hook-form, tsdown)

### Feature

- [ ] Add devtool for react native rozenite plugin
- [ ] Add position method
- [ ] Add toggle to expand all field section
- [ ] Export custom hooks for other customizability
