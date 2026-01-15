# Style Guide (Frontend)

## Language & Syntax
- **TypeScript**: Strictly typed components and props. Avoid `any`.
- **Functional Components**: Use React functional components with Hooks.

## Component Structure
```tsx
import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface MyComponentProps {
  title: string;
}

export const MyComponent: FC<MyComponentProps> = ({ title }) => {
  return (
    <Box>
      <Text>{title}</Text>
    </Box>
  );
};
```

## Naming Conventions
- **Components**: `PascalCase` (e.g., `ProductCard.tsx`).
- **Hooks**: `camelCase` prefixed with `use` (e.g., `useAuth.ts`).
- **Slices**: `camelCase` (e.g., `authSlice.ts`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`).

## Styling
- **Priority**: Use **Chakra UI** props (e.g., `mt={4}`, `color="brand.500"`) for layout and standard components.
- **Custom CSS**: Use **Tailwind classes** only when Chakra utilities are insufficient.
- **Responsiveness**: Mobile-first approach using Chakra's array syntax (e.g., `width={['100%', '50%', '25%']}`).

## State Management
- Use **Redux** for global state (Auth, Cart, User Profile).
- Use **Local State** (`useState`) for UI-only state (Modals, Form inputs).
- Use **React Context** for theme or app-wide settings if not changing frequently.

## Linting
- **ESLint** and **Prettier** are configured. Run `npm run lint` before committing.
