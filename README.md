# Hotel Management System 🏨

A complete Next.js 14+ application to visually manage the status of hotel rooms by floor.

## Features ✨

- **Visual Room Management**: See the status of each room clearly and intuitively
- **Organization by Floors**: 
  - Floor 1: 8 rooms (100-107)
  - Floor 2: 10 rooms (200-209)
  - Floor 3: 6 rooms (300-305)
- **Room Status**:
  - 🟢 **Available** (Green)
  - 🔴 **Occupied** (Red)
- **Local Persistence**: Changes are automatically saved to localStorage
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern Interface**: Minimalist design with smooth animations
- **Floor Counter**: View total available and occupied rooms per floor

## Technical Requirements ✅

- **Next.js**: 14+ with App Router
- **TypeScript**: For static typing
- **TailwindCSS**: For styling
- **Lucide React**: For icons
- **Node.js**: 18+ recommended

## Tech Stack 🛠️

- ⚛️ **Next.js 14+**: React framework with App Router
- 📘 **TypeScript**: Typed language
- 🎨 **TailwindCSS**: CSS framework
- 🎯 **Lucide React**: Icon library
- 💾 **localStorage**: Data persistence
- ✨ **Vercel Ready**: Ready to deploy on Vercel

## Project Structure 📁

```
hotel-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Main layout
│   │   ├── globals.css      # Global styles
│   │   └── page.tsx         # Main page with logic
│   ├── components/
│   │   ├── Header.tsx       # Header with reset button
│   │   ├── FloorSection.tsx # Floor section component
│   │   └── RoomCard.tsx     # Individual room card
│   └── types/
│       └── room.ts          # TypeScript types
├── public/                  # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## Installation and Execution 🚀

### Installation

```bash
# Clone or download the project
cd hotel-app

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Main Features 🎯

### 1. Status Toggle
- Click any room to change its status
- Smooth transitions (300ms)
- Changes are automatically persisted

### 2. Floor Counter
- Shows total available rooms
- Shows total occupied rooms
- Updates in real-time

### 3. Reset All
- Button in the header to reset all rooms to "Available"
- Requires user confirmation
- Saves new state to localStorage

### 4. Persistence
- Data is saved in `localStorage` with key `hotel-rooms-state`
- Automatically restored on page reload
- Handled via `useEffect`

## Responsive Design 📱

- **Mobile (< 640px)**: 2 columns
- **Tablet (640px - 1024px)**: 3 columns
- **Desktop (> 1024px)**: 4+ columns

## Components 🧩

### RoomCard
Component representing an individual room.

**Props**:
- `room`: Object of type `Room`
- `onToggle`: Callback function for status change

**Features**:
- Dynamic icon (DoorOpen/DoorClosed)
- Status badge
- Smooth transitions
- Hover effect

### FloorSection
Component grouping all rooms on a floor.

**Props**:
- `floor`: Floor number
- `rooms`: Array of rooms on the floor
- `onToggleRoom`: Callback function

**Features**:
- Title with icon
- Available/occupied counter
- Responsive grid

### Header
Application header.

**Props**:
- `onReset`: Optional callback function

**Features**:
- Logo with gradient
- Title and description
- Reset button

## Types 📘

```typescript
type RoomStatus = 'available' | 'occupied';

interface Room {
  id: string;
  number: number;
  floor: number;
  status: RoomStatus;
}

interface FloorConfig {
  floor: number;
  roomCount: number;
  startNumber: number;
}
```

## Colors and Styles 🎨

- **Available**: Green (#10b981)
- **Occupied**: Red (#ef4444)
- **Background**: Light gray (#f9fafb)
- **Text**: Dark gray (#111827)
- **Shadows**: Soft and subtle

## Deploy on Vercel 🚀

1. Push the project to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Connect your repository
4. Click "Deploy"
5. Live! Your application will be live in seconds

No environment variables or additional configuration needed.

## Browser Support ✅

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Future Improvements (Roadmap) 🗺️

- [ ] User authentication
- [ ] Backend for data persistence
- [ ] Change history
- [ ] Date-based reports
- [ ] Integration with booking system
- [ ] Real-time notifications
- [ ] Multi-language support (i18n)

## License 📄

MIT License - Free to use, modify, and distribute

## Contact and Support 📧

To report bugs or suggestions, create an issue in the repository.

---

Made with ❤️ using Next.js, React, and TailwindCSS
