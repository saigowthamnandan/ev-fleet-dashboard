# Vehicle Dashboard

A real-time vehicle monitoring dashboard built with React, TypeScript, and Redux. Monitor electric vehicle fleets with live data updates, filtering, sorting, and alert management.

## Features

- **Real-time Vehicle Monitoring**: Live updates for battery levels, speed, temperature, and location
- **Interactive Dashboard**: Filter and sort vehicles by various metrics
- **Alert Management**: Automatic alerts for critical conditions (low battery, high temperature)
- **Drag & Drop Ordering**: Custom vehicle arrangement with drag and drop
- **Responsive Design**: Mobile-first design that works across all devices
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Internationalization**: Support for English and German languages
- **Offline Support**: Graceful handling of network connectivity issues

## Tech Stack

- **Frontend**: React 18, TypeScript, Next.js
- **State Management**: Redux Toolkit, React Context
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Playwright (E2E)
- **Build Tools**: Next.js, ESLint, Prettier

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher) or **pnpm**

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/vehicle-dashboard.git
   cd vehicle-dashboard
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   yarn install
   ```

3. **Install Playwright browsers** (for E2E testing)
   ```bash
   npx playwright install
   ```

## Getting Started

### Development Mode

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will automatically reload when you make changes.

### Production Build

Build the application for production:

```bash
npm run build
npm run start
# or
pnpm build
pnpm start
```

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

### Testing

- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI mode
- `npm run test:e2e:debug` - Debug E2E tests
- `npm run test:e2e:report` - View test reports

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash

# Map Configuration (if using real maps)
NEXT_PUBLIC_BASE_APP_URL = 'http://localhost:3000'
NEXT_PUBLIC_MAPBOX_API_KEY = "your_mapbox_token_here"
```

### Playwright Configuration

The `playwright.config.ts` file is already configured for:

- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing
- Automatic server startup
- Test reporting and screenshots

## Testing

### Running E2E Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Debug specific test
npm run test:e2e:debug -- --grep "should load dashboard"
```

### Test Coverage

The E2E test suite covers:

- Dashboard component loading and initialization
- Vehicle filtering by status (moving, charging, idle)
- Vehicle sorting by different metrics
- Real-time data updates and offline/online status
- Alert generation and management
- Responsive design across different viewports

## Development Guidelines

### Adding New Features

1. **Components**: Place new components in the `components/` directory
2. **Types**: Add TypeScript types to `utils/types.ts`
3. **Enums**: Add enums to `utils/enums.ts`
4. **State**: Use Redux for global state, Context for component-specific state
5. **Tests**: Add corresponding E2E tests for new user-facing features

### Code Style

The project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript strict mode** for type safety

Run linting and formatting:

```bash
npm run lint
npm run format
```

### Adding Test Data Attributes

For E2E testing, add `data-testid` attributes to interactive elements:

```tsx
// Good
<button data-testid="connection-toggle" onClick={...}>
  {isOnline ? 'Online' : 'Offline'}
</button>

// For lists/grids
<div data-testid="vehicle-card" data-id={vehicle.id}>
  <span data-testid="vehicle-name">{vehicle.name}</span>
</div>
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically on every push to main branch

### Docker

```bash
# Build Docker image
docker build -t vehicle-dashboard .

# Run container
docker run -p 3000:3000 vehicle-dashboard
```

### Static Export

For static hosting:

```bash
npm run build
npm run export
```

## Troubleshooting

### Common Issues

**Port 3000 already in use:**

```bash
# Kill process on port 3000
npx kill-port 3000
# or use different port
PORT=3001 npm run dev
```

**Playwright tests failing:**

```bash
# Reinstall browsers
npx playwright install --with-deps
# Clear test cache
npx playwright test --workers=1
```

**Build errors:**

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

### Pull Request Guidelines

- Include tests for new features
- Update documentation as needed
- Follow existing code style
- Ensure all tests pass
- Add meaningful commit messages

## Performance Optimization

The dashboard is optimized for:

- **Real-time updates** without blocking the UI
- **Large datasets** with efficient filtering/sorting
- **Mobile performance** with responsive design
- **Memory management** with proper cleanup

For large fleets (100+ vehicles), consider:

- Implementing virtualization for vehicle lists
- Adding pagination or infinite scroll
- Using Web Workers for heavy computations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

## Changelog

### v1.0.0

- Initial release with core dashboard functionality
- Real-time vehicle monitoring
- Alert management system
- Drag and drop vehicle ordering
- Multi-language support
