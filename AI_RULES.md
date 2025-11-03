# AI Development Rules for Unipalm App

This document provides guidelines for AI developers working on this project. Following these rules ensures consistency, maintainability, and adherence to the established architecture.

## Tech Stack

The application is built with a modern, cross-platform stack focused on React Native and Expo.

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) for building cross-platform native apps (iOS, Android, Web).
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation across all platforms.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and improved developer experience.
- **Styling**: [React Native StyleSheet](https://reactnative.dev/docs/stylesheet) for component styling, with a centralized color palette in `constants/colors.ts`.
- **State Management**: [React Context API](https://react.dev/learn/passing-data-deeply-with-context) with a custom `createContextHook` for managing global client-side state.
- **Server State & API**: [tRPC](https://trpc.io/) and [React Query](https://tanstack.com/query/latest) for end-to-end typesafe data fetching and server state management.
- **Icons**: [Lucide React Native](https://lucide.dev/) for a consistent and beautiful set of icons.
- **Local Storage**: [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) for persisting data locally on the device.
- **AI Integration**: [@rork/toolkit-sdk](https://rork.com) for integrating generative AI features like text generation and agent-like chat behavior.

## Library Usage Rules

To maintain a clean and consistent codebase, please adhere to the following library usage guidelines.

### Navigation

- **Library**: `expo-router`
- **Rules**:
    - All navigation and routing must be handled by Expo Router.
    - Create new screens by adding files to the `app/` directory.
    - Use the `<Link>` component or the `useRouter` hook for navigating between screens.
    - Define screen layouts and options within the `_layout.tsx` files.

### Styling

- **Library**: `react-native`'s `StyleSheet`
- **Rules**:
    - Use `StyleSheet.create` for all component styling. Do not use inline styles for complex objects.
    - All colors must be imported from `constants/colors.ts`. Do not use hardcoded color strings.
    - For gradients, use the `expo-linear-gradient` package.

### State Management

- **Library**: React Context (`@nkzw/create-context-hook`) and React Hooks (`useState`, `useEffect`).
- **Rules**:
    - For global, shared state (e.g., cart, auth, wishlist), create a new context in the `contexts/` directory.
    - For local, component-specific state, use the built-in `useState` and `useReducer` hooks.
    - All logic for interacting with `AsyncStorage` should be encapsulated within its corresponding context provider.

### Icons

- **Library**: `lucide-react-native`
- **Rules**:
    - Only use icons from this library. Do not install or use any other icon packages.
    - Import icons directly, e.g., `import { Home } from "lucide-react-native";`.

### API and Data Fetching

- **Library**: `tRPC` and `React Query`
- **Rules**:
    - All server communication must go through tRPC.
    - Define new API procedures in the `backend/trpc/routes/` directory.
    - Use the generated tRPC hooks (`trpc.example.hi.useMutation`, `trpc.example.hi.useQuery`) in components to fetch or mutate data.

### AI Features

- **Library**: `@rork/toolkit-sdk`
- **Rules**:
    - For features involving generative AI, text generation, or agent-like chat, use the `useRorkAgent` hook and `createRorkTool` function.
    - Encapsulate AI logic within a dedicated context or hook, as seen in `ChatSupportContext.tsx`.