import "@testing-library/jest-dom/extend-expect";

// jest.setup.js

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    query: {},
    asPath: "",
  }),
}));
