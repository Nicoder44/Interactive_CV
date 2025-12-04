# Contributing to Interactive CV

Thank you for your interest in contributing! This document provides guidelines and best practices for contributing to this project.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Interactive_CV.git
   cd Interactive_CV
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Code Quality Standards

### Code Style

- Use **functional components** with React Hooks
- Follow **ESLint** rules (if configured)
- Use **meaningful variable names**
- Keep functions **small and focused** (single responsibility)
- Add **JSDoc comments** for complex functions

### Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

/**
 * Brief description of component purpose
 * @param {Object} props - Component props
 * @param {string} props.propName - Description of prop
 */
const ComponentName = ({ propName }) => {
  // State declarations
  const [state, setState] = useState(initialValue);

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### CSS Best Practices

- Use **BEM naming convention** where appropriate
- Prefer **CSS custom properties** for theming
- Use **rem/em** units for responsive design
- Group related styles together
- Add comments for complex styling logic

### Testing

All new features and bug fixes should include tests.

**Run tests before committing:**
```bash
npm test
```

**Test coverage:**
```bash
npm run test:coverage
```

**Test structure:**
```javascript
import { describe, it, expect } from 'vitest';

describe('FeatureName', () => {
  describe('functionName', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = functionName(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

## Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or tooling changes

**Examples:**
```
feat(parser): add support for moderncv template

fix(video): resolve video overlay positioning on mobile

docs(readme): update deployment instructions

test(parser): add tests for nested brace extraction
```

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Update documentation if needed

3. **Verify everything works**
   ```bash
   npm test           # Run tests
   npm run build      # Verify build
   npm run dev        # Test locally
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide clear description of changes
   - Reference related issues
   - Include screenshots for UI changes

## Areas for Contribution

### High Priority

- [ ] Additional LaTeX template support
- [ ] Improved mobile responsiveness
- [ ] Accessibility enhancements (ARIA labels, keyboard navigation)
- [ ] Performance optimizations
- [ ] More comprehensive test coverage

### Features

- [ ] Dark/light theme toggle
- [ ] Multiple color scheme presets
- [ ] Animation customization options
- [ ] Export to PDF from web
- [ ] Multi-language support
- [ ] Skills chart visualizations

### Documentation

- [ ] Video tutorial for setup
- [ ] LaTeX template examples
- [ ] Troubleshooting guide
- [ ] API documentation for utilities

## Code Review Guidelines

Reviewers should check:

- ✅ Code follows project style guidelines
- ✅ Tests pass and coverage is maintained
- ✅ No unnecessary dependencies added
- ✅ Documentation is updated
- ✅ Changes are focused and minimal
- ✅ Commit messages are clear

## Getting Help

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Be respectful and constructive in discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
