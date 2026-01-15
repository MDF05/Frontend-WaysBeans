# Testing Strategy

> **Note**: Currently, there are no automated tests set up for this project.

## Planned Improvements
We are planning to implement testing using **Vitest** (Native Vite test runner) and **React Testing Library**.

## Contributing Tests
Future tests should follow this structure:

1.  **Unit Tests**: Test individual components and hooks (`*.test.tsx`, `*.test.ts`).
2.  **E2E Tests**: End-to-end user flows (potentially with Cypress or Playwright).

### Recommended Setup
```bash
npm install -D vitest @testing-library/react @testing-library/dom jsdom
```
