/**
 * Beaver HealthAI Theme Constants
 */

export const Colors = {
  background: '#0d1b2a',
  surface: '#1b263b',
  primary: '#a0e0e0',
  secondary: '#415a77',
  accent: '#ff4d4d',
  text: '#e0e1dd',
  textSecondary: '#778da9',
  card: '#1b263b',
  border: '#415a77',
  notification: '#ff4d4d',
};

export const Typography = {
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 2,
    color: Colors.textSecondary,
    textTransform: 'uppercase' as const,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
  },
};
