const charset =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const randomString = (length: number): string =>
  [...Array(length)]
    .map(() => charset[Math.floor(Math.random() * charset.length)])
    .join('');
