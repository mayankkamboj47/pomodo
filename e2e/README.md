# Tests for Pomodo

Install dependencies
```bash
pnpm install
```
and run tests
```bash
npx mocha .
```

## Lessons learnt

1. We rely on arbitary pauses in our tests. These mysterious pauses may mysteriously not work sometimes. This will make it look like something in the app, rather than the test, is broken. Avoiding these pauses is best. 