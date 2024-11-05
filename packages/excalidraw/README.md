# Excalidraw Component Layer

## Description

This nuxt layer exports the Excalidraw component to be mounted inside a Nuxt Page.

- The component renders inside a Nuxt `ClientOnly` Component, so it will only render on the client side. [Read more about Client Only Components](https://nuxt.com/docs/api/components/client-only)
- Uses the same props: [Excalidraw Props](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/props/)
- Fully customizable using [Excalidraw Options](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/options/)
- Typescript Support

## How to use it

Add the dependencies

```bash
pnpm add @monoplayground/excalidraw-nuxt
```

Add the layer to your `nuxt.config.ts` file

```typescript
export default defineNuxtConfig({
  // ...
  extends: [
    // ...
    '@monoplayground/excalidraw-nuxt',
    // ...
  ],
  // ...
});
```

The component will be available as `ExcalidrawBoard` in your Nuxt project. By default it will render as the 100% width and height of its parent container. This example will create a fullpage container and mount the excalidraw board inside:

```vue
<template>
  <div class="container">
    <ExcalidrawBoard />
  </div>
</template>

<style scoped>
  .container {
    height: 100vh;
  }
</style>
```
