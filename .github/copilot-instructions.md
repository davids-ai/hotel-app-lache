# Copilot Instructions - Hotel Management System

## Project Overview

This is a hotel room management system built with Next.js 14+, TypeScript, and TailwindCSS. It allows users to visually manage the occupancy status of hotel rooms organized by floor.

## Project Structure

- `src/app/page.tsx` - Main application page with room state management
- `src/app/layout.tsx` - Root layout component
- `src/app/globals.css` - Global TailwindCSS styles
- `src/components/Header.tsx` - Application header with reset functionality
- `src/components/FloorSection.tsx` - Floor section displaying rooms per floor
- `src/components/RoomCard.tsx` - Individual room card component
- `src/types/room.ts` - TypeScript type definitions

## Key Features

1. **Room Management by Floor**
   - Floor 1: 8 rooms (numbered 100-107)
   - Floor 2: 10 rooms (numbered 200-209)
   - Floor 3: 6 rooms (numbered 300-305)

2. **State Management**
   - React hooks (useState, useEffect)
   - localStorage for persistence
   - Toggle between 'available' and 'occupied' states

3. **UI/UX Elements**
   - Color-coded room status (green=available, red=occupied)
   - Smooth transitions and animations
   - Responsive grid layout
   - Counter for available/occupied rooms per floor
   - Reset all rooms functionality

4. **Responsive Design**
   - Mobile: 2-column grid
   - Tablet: 3-column grid
   - Desktop: 4+ columns

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Icons**: Lucide React
- **Data Persistence**: Browser localStorage
- **Development Server**: Turbopack

## Setup & Running

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
cd hotel-app
npm install
```

### Development
```bash
npm run dev
```
Server runs at http://localhost:3000

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Code Organization

### Components
All components use 'use client' directive for client-side interactivity:
- Accept props for data and callbacks
- Manage local rendering logic
- Follow React/Next.js best practices

### State Management
- Main state lives in `src/app/page.tsx` (Home component)
- Rooms array stored in useState
- Mounted flag prevents SSR hydration mismatches
- useEffect handles initialization and localStorage persistence

### localStorage Schema
```typescript
{
  "hotel-rooms-state": [
    {
      "id": "room-101",
      "number": 101,
      "floor": 1,
      "status": "available" | "occupied"
    },
    // ... more rooms
  ]
}
```

## Styling Approach

- TailwindCSS for all styling (no CSS files except globals.css)
- Responsive utilities (sm:, md:, lg:)
- Color scheme:
  - Available: green-50/100/600
  - Occupied: red-50/100/600
  - Neutral: gray-50 to gray-900

## Deployment

### Vercel Deployment
1. Push to GitHub repository
2. Connect repository to Vercel
3. Click "Deploy"
4. No environment variables or configuration needed

### Other Platforms
The app is compatible with any Node.js hosting platform.

## Common Modifications

### Change Number of Rooms per Floor
Edit `FLOOR_CONFIGS` in `src/app/page.tsx`:
```typescript
const FLOOR_CONFIGS: FloorConfig[] = [
  { floor: 1, roomCount: 8, startNumber: 100 },
  // ... modify as needed
];
```

### Change Color Scheme
Edit color classes in:
- `src/components/RoomCard.tsx` (green/red variants)
- `src/components/FloorSection.tsx` (text colors)
- `src/app/globals.css` (if needed)

### Add New Features
1. Create component in `src/components/`
2. Define types in `src/types/room.ts` if needed
3. Import and use in `src/app/page.tsx`

## Debugging Tips

1. **localStorage not persisting?**
   - Check if 'mounted' flag is true before rendering
   - Clear browser cache/localStorage if needed

2. **Styling not applied?**
   - Verify TailwindCSS is configured in tailwind.config.ts
   - Check that globals.css imports @import "tailwindcss"
   - Rebuild development server

3. **Type errors?**
   - Ensure all props are properly typed
   - Check tsconfig.json paths configuration
   - Run TypeScript compiler: `npx tsc --noEmit`

## Performance Considerations

- Memoization not needed for current component size
- localStorage operations are synchronous (acceptable for this use case)
- No external API calls (fully client-side)
- Bundle size is minimal (~50KB gzipped)

## Accessibility

- Semantic HTML structure
- ARIA labels could be added to buttons
- Color contrast meets WCAG AA standards
- Keyboard navigation supported

## Testing Suggestions

1. Manual testing of room toggle functionality
2. Verify localStorage persistence across page reloads
3. Test responsive design at different breakpoints
4. Confirm reset functionality with confirmation dialog
5. Test on different browsers

## Future Enhancement Ideas

- Add authentication/user accounts
- Backend database integration
- Reservation system
- Admin dashboard
- Real-time updates with WebSocket
- Analytics and reporting
- Multi-language support
