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

## Quickstart

```typescript jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from 'rhf-devtool/react';
import './App.css';

const App = () => {
  const { register, control, handleSubmit } = useForm({
    mode: 'onChange',
  });

  return (
    <>
      <DevTool control={control} placement="top-left" />

      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <h1>React Hook Form DevTools</h1>

        <label>Test</label>
        <input name="test" ref={register} />

        <input type="submit" />
      </form>
    </>
  );
};

export default App;
```

## Todo:

### Development

- [ ] Add unit, integrated and e2e tests

### Feature

- [ ] Add devtool for react native rozenite plugin
- [ ] Add toggle to expand all field section
