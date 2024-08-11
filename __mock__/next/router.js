jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
  }),
}));
