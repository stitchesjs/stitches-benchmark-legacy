import React from 'react';
import scStyled from 'styled-components';
import { renderToString } from 'react-dom/server';
import { createStyled } from '@stitches/react';

const { styled: stitchesStyled } = createStyled({});

const LOOP = 1000;

/**
 * SETUP: STYLED COMPONENTS
 */
const ScBaseComponent = scStyled.h1({
  color: 'blue',
  padding: '1rem',
});

const ScOverrideBaseComponent = scStyled(ScBaseComponent)({
  color: 'red',
  paddingTop: '5rem',
});

const ScDynamicComponent = scStyled.div((props) => ({
  opacity: props.disabled ? 0.5 : 1,
}));

const ScTest1 = () => {
  return <ScOverrideBaseComponent>Hello Test</ScOverrideBaseComponent>;
};

const ScTest2 = () => {
  return (
    <div>
      <ScDynamicComponent disabled>Hello Test</ScDynamicComponent>;
      <ScDynamicComponent disabled={false}>Hello Test</ScDynamicComponent>;
    </div>
  );
};

/**
 * SETUP: STITCHES
 */
const StitchesBaseComponent = stitchesStyled.h1({
  color: 'blue',
  padding: '1rem',
});

const StitchesOverrideBaseComponent = stitchesStyled(StitchesBaseComponent, {
  color: 'red',
  paddingTop: '5rem',
});

const StitchesDynamicComponent = scStyled.div(
  {},
  {
    variant: {
      muted: {
        opacity: 0.5,
      },
    },
  }
);

const StitchesTest1 = () => {
  return <StitchesOverrideBaseComponent>Hello Test</StitchesOverrideBaseComponent>;
};

const StitchesTest2 = () => {
  return (
    <div>
      <StitchesDynamicComponent variant="muted">Hello Test</StitchesDynamicComponent>;
      <StitchesDynamicComponent>Hello Test</StitchesDynamicComponent>;
    </div>
  );
};

let start;

/**
 * RUN: STYLED-COMPONENTS
 */
start = performance.now();
for (let x = 0; x < LOOP; x++) {
  scStyled.div({
    padding: x + 'px',
  });
}
const ScDefineUnique = performance.now() - start;

start = performance.now();
for (let x = 0; x < LOOP; x++) {
  scStyled.div({
    color: 'red',
  });
}
const ScDefineSame = performance.now() - start;

start = performance.now();
for (let x = 0; x < LOOP; x++) {
  renderToString(<ScTest1 />);
}
const ScConsumeStatic = performance.now() - start;

start = performance.now();
for (let x = 0; x < LOOP; x++) {
  renderToString(<ScTest2 />);
}
const ScConsumeDynamic = performance.now() - start;

/**
 * RUN: STITCHES
 */
start = performance.now();
for (let x = 0; x < LOOP; x++) {
  stitchesStyled.div({
    padding: x + 'px',
  });
}
const StitchesDefineUnique = performance.now() - start;

start = performance.now();
for (let x = 0; x < LOOP; x++) {
  stitchesStyled.div({
    color: 'red',
  });
}
const StitchesDefineSame = performance.now() - start;

start = performance.now();
for (let x = 0; x < LOOP; x++) {
  renderToString(<StitchesTest1 />);
}
const StitchesConsumeStatic = performance.now() - start;

start = performance.now();
for (let x = 0; x < LOOP; x++) {
  renderToString(<StitchesTest2 />);
}
const StitchesConsumeDynamic = performance.now() - start;

console.table({
  'STYLED-COMPONENTS': {
    'define unique': ScDefineUnique,
    'define same': ScDefineSame,
    'consume static': ScConsumeStatic,
    'consume dynamic': ScConsumeDynamic,
  },
  STITCHES: {
    'define unique': StitchesDefineUnique,
    'define same': StitchesDefineSame,
    'consume static': StitchesConsumeStatic,
    'consume dynamic': StitchesConsumeDynamic,
  },
  'STITCHES PERF': {
    'define unique': Math.floor((ScDefineUnique / StitchesDefineUnique) * 100) / 100 + 'x',
    'define same': Math.floor((ScDefineSame / StitchesDefineSame) * 100) / 100 + 'x',
    'consume static': Math.floor((ScConsumeStatic / StitchesConsumeStatic) * 100) / 100 + 'x',
    'consume dynamic': Math.floor((ScConsumeDynamic / StitchesConsumeDynamic) * 100) / 100 + 'x',
  },
});
