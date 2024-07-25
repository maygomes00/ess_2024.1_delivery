// selectors.ts
export const SELECTORS = {
  emailInput: 'input[name="email"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'button[data-cy="Entrar"]',
  navbarLink: (link: string) => `a[data-cy="${link}"]`,
  pageText: (text: string) => `:contains(${text})`,
  button: (button: string) => `button[data-cy="${button}"]`,
};
