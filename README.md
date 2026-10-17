# define-pt

## Description

A browser extension that adds a context menu item that looks up the
Portuguese-language definition of a highlighted word.

## Design

### What's likely to change

- Where definitions come from
  - E.g. an on-device dictionary, a Spanish-language dictionary, etc
- The contents of the definition window
- When the context-menu item is available

### Component-1: Define function

#### Signature

```typescript
interface defineDeps {
    fetchFn: (string) => string
}

define(word:string, deps = {}: defineDeps): string
```

#### Design Considerations

- Secret: Hides how definitions are fetched.
