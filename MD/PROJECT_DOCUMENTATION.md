# 📖 Feek Nafas - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Project Idea & Vision](#project-idea--vision)
3. [Tech Stack](#tech-stack)
4. [Architecture Overview](#architecture-overview)
5. [Project Structure](#project-structure)
6. [Pages & User Flow](#pages--user-flow)
7. [Components](#components)
8. [Services](#services)
9. [Contexts & State Management](#contexts--state-management)
10. [Data Types & Models](#data-types--models)
11. [Key Features](#key-features)
12. [Getting Started](#getting-started)
13. [Deployment](#deployment)

---

## 🎮 Project Overview

**Feek Nafas** (Arabic for *"Do you have breath/stamina?"*) is a revolutionary real-time competitive programming platform that transforms algorithm solving into a high-stakes, head-to-head esports battle.

### Core Concept
Unlike traditional coding contests, Feek Nafas focuses on **live, direct competition** between programmers. It's inspired by "Lockout" matches and brings the adrenaline and excitement of competitive esports to the world of competitive programming.

### Project Status
- **Status**: In Active Development  
- **Version**: 0.0.0  
- **License**: MIT  
- **Tech Stack**: React | Supabase | TypeScript

---

## 🚀 Project Idea & Vision

### The Problem
Traditional competitive programming contests (like Codeforces) are:
- Time-consuming (2-3 hour contests)
- Pressure-based (rank and rating dependent)
- Impersonal (solving problems against an abstract rating)
- Boring for viewers (no real-time excitement)

### The Solution
Feek Nafas turns competitive programming into an **esports experience**:
- **Quick Battles**: 1v1 or team-based real-time competitions [Duals Game Mode]
- **Direct Competition**: Compete against real opponents, not ratings
- **Live Verification**: Server-side referee system ensures fair play
- **Cyberpunk Experience**: Neon-styled, immersive UI for maximum engagement
- **Codeforces Integration**: Leverage existing problem database and ecosystem

### Target Users
1. **Competitive Programmers**: Seeking real-time challenges and quick matches
2. **Esports Enthusiasts**: Looking for new competitive gaming experiences
3. **Coding Communities**: Wanting to organize quick battles and tournaments
4. **Developers**: Interested in high-performance competitive gaming platforms

### Long-Term Vision
- **Tournament System**: Bracket-based tournaments with prizes
- **Team Competitions**: Guild/team-based rankings
- **Streaming Integration**: Built-in streaming for Twitch/YouTube
- **Mobile Support**: Native mobile apps for on-the-go battles
- **Global Leaderboards**: Ranked matchmaking system
- **Custom Problems**: Allow users to create custom problem sets

---

## 🛠️ Tech Stack

### Frontend Technologies

#### **React (v19.2.0)**
- Modern UI library for building dynamic, interactive user interfaces
- Used for all page components and real-time updates
- Hooks-based architecture for state management
- Server-side rendering ready

#### **TypeScript (~5.9.3)**
- Strongly typed language built on JavaScript
- Ensures type safety and reduces runtime errors
- Used throughout the entire frontend codebase
- Full IDE support with autocompletion

#### **Vite (v7.3.1)**
- Lightning-fast build tool and development server
- ES module-based building (no bundling during development)
- Instant server start and hot module replacement (HMR)
- Optimized production builds with automatic code splitting

#### **React Router (v7.13.1)**
- Client-side routing library
- Enables SPA (Single Page Application) navigation
- Dynamic route parameters for match IDs and user profiles
- Protected routes with authentication checks

#### **CSS Modules**
- Component-scoped styling to prevent CSS conflicts
- Used across all major components (Header, Footer, pages)
- Custom cyberpunk design system with neon colors and dark theme

### Backend & Database

#### **Supabase (BaaS)**
- Open-source Firebase alternative built on PostgreSQL
- Provides:
  - **PostgreSQL Database**: Relational data storage
  - **Real-time Subscriptions**: WebSocket-based real-time updates
  - **Authentication**: Email-based sign-up and sign-in
  - **Edge Functions**: Serverless backend functions (Deno/TypeScript)
  - **RLS (Row Level Security)**: Database-level access control

#### **Supabase Realtime**
- WebSocket-based real-time synchronization
- Allows live updates between multiple clients
- Used for:
  - Live match state updates
  - Opponent status changes
  - Winner announcement
  - Real-time scoreboard

#### **Supabase Edge Functions**
- Serverless functions deployed at the edge
- Acts as the **Referee** system
- Server-side validation to prevent cheating
- Verifies problem submissions with Codeforces API

### External APIs & Libraries

#### **Codeforces API**
- Provides access to 10,000+ competitive programming problems
- Used for:
  - Fetching random problems by difficulty rating
  - Verifying user submissions
  - Problem metadata (time limits, memory limits, test cases)

#### **ESLint & TypeScript ESLint**
- Code quality and linting
- Enforces code standards and best practices
- Prevents common bugs and style inconsistencies

---

## 🏗️ Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + TypeScript)            │
│  ┌──────────────┬─────────────┬──────────────┬────────────┐ │
│  │  Landing    │   Home      │   Match      │  Victory/  │ │
│  │   Page      │   Page      │   Page       │   Lose     │ │
│  └──────────────┴─────────────┴──────────────┴────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Context & State Management (React)             │ │
│  │  ┌─────────────┬──────────────┬─────────────────────┐ │ │
│  │  │ AuthContext │ MatchContext │ OpponentContext    │ │ │
│  │  └─────────────┴──────────────┴─────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Services Layer (TypeScript)              │ │
│  │  Auth | Match | User | Codeforces | Invitation      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ (REST/WebSocket)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Supabase Backend (BaaS)                     │
│  ┌────────────────┬──────────────┬────────────────────────┐ │
│  │  PostgreSQL    │  Real-time   │  Edge Functions        │ │
│  │   Database     │ Subscriptions│  (Referee System)      │ │
│  │                │              │                        │ │
│  │  - users       │  - matches   │  - Verify submissions  │ │
│  │  - matches     │  - ready     │  - Poll Codeforces     │ │
│  │  - messages    │  - winner    │  - Update DB           │ │
│  │  - invitations │  - scores    │                        │ │
│  └────────────────┴──────────────┴────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ (API Calls)
                            ▼
        ┌──────────────────────────────────┐
        │   Codeforces API                 │
        │  - Problem Sets                  │
        │  - User Submissions              │
        │  - Problem Details               │
        └──────────────────────────────────┘
```

### Key Flow: Match Creation & Verification

#### **1. Match Initialization**
```
User A → Creates Lobby → Supabase stores match record → 
User B joins → Both players wait in "GetReady" state
```

#### **2. Match Ready**
```
Both players click "Ready" → Match transitions to "in_progress" →
Problem link displayed → Real-time scoreboard starts
```

#### **3. The Race**
```
Player 1 solves problem → Submits on Codeforces →
Player 2 also solving simultaneously →
Supabase Edge Function polls Codeforces API in background
```

#### **4. Verification (Referee System)**
```
Edge Function checks:
  - GET /user.status?handle={player1_handle} → Problem solved? (verdict=OK)
  - If YES → Update match table with winner_user_id
  - Supabase Realtime broadcasts update to both clients
  - Both see "Player X Won!" instantly
```

#### **5. Result Display**
```
Client 1 → Redirects to /victory page with score details
Client 2 → Redirects to /lose page with score details
```

---

## 📁 Project Structure

### Directory Hierarchy

```
feek-nafas/
├── src/                          # Main source directory
│   ├── pages/                    # Page components (views)
│   │   ├── LandingPage/         # Landing page (unauthenticated)
│   │   ├── HomePage/            # Dashboard (authenticated)
│   │   ├── FindMatchPage/       # Match finder/lobby creation
│   │   ├── GetReadyPage/        # Pre-match countdown page
│   │   ├── MatchPage/           # Active match page
│   │   ├── VictoryPage/         # Victory screen
│   │   ├── LosePage/            # Defeat screen
│   │   ├── LoginPage/           # User login
│   │   ├── RegisterPage/        # User registration
│   │   ├── ProfilePage/         # User profile & stats
│   │   └── SettingsPage/        # User settings
│   │
│   ├── components/               # Reusable UI components
│   │   ├── Header/              # Navigation header
│   │   ├── Footer/              # Footer component
│   │   ├── ProtectedRoute.tsx   # Protected route wrapper
│   │   └── PublicRoute.tsx      # Public route wrapper
│   │
│   ├── contexts/                 # React Context API (state management)
│   │   ├── AuthContext/         # Authentication state
│   │   │   ├── AuthContext.ts
│   │   │   └── AuthContextProvider.tsx
│   │   ├── MatchContext/        # Match state
│   │   │   ├── MatchContext.ts
│   │   │   └── MatchContextProvider.tsx
│   │   └── OpponentContext/     # Opponent data
│   │       ├── OpponentContext.ts
│   │       └── OpponentContextProvider.tsx
│   │
│   ├── services/                 # Business logic & API calls
│   │   ├── authService.ts       # Authentication logic
│   │   ├── userService.ts       # User profile operations
│   │   ├── matchService.ts      # Match CRUD operations
│   │   ├── createMatchService.ts # Match creation
│   │   ├── findMatchService.ts  # Match finding
│   │   ├── codeforcesService.ts # Codeforces API integration
│   │   ├── chatService.ts       # Real-time chat
│   │   ├── invitationService.ts # Match invitations
│   │   ├── avatarService.ts     # User avatar management
│   │   └── ProfileService.ts    # Profile data operations
│   │
│   ├── types/                    # TypeScript interfaces
│   │   ├── UserData.ts          # User interface
│   │   ├── MatchData.ts         # Match interface
│   │   ├── ChatMessage.ts       # Chat message interface
│   │   ├── Notification.ts      # Notification interface
│   │   ├── CodeforcesProblem.ts # Problem interface
│   │   ├── ProblemData.ts       # Problem data
│   │   ├── CreateMatchData.ts   # Match creation form
│   │   └── AuthServices.ts      # Auth service types
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   ├── useMatch.ts          # Match data hook
│   │   ├── useOpponent.ts       # Opponent data hook
│   │   └── useMatchTimer.ts     # Match timer hook
│   │
│   ├── lib/                      # Utility libraries
│   │   └── supabase.ts          # Supabase client initialization
│   │
│   ├── utils/                    # Utility functions
│   │   ├── getCurrentTime.ts    # Time utilities
│   │   └── getOpponentDetails.ts # Opponent data utilities
│   │
│   ├── assets/                   # Static assets
│   │   ├── sounds/              # Audio files
│   │   └── Developers_avatars/  # Avatar images
│   │
│   ├── App.tsx                   # Main app component & routing
│   ├── App.css                   # Global styles
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global CSS
│
├── design/                        # UI/UX design files
│   ├── landing_page/            # Landing page design
│   ├── feek_nafas_home_page/    # Home page design
│   ├── match_result_victory/    # Victory page design
│   ├── match_result_defeat_updated_style/
│   ├── Fire_in_the_hall/        # Intro sequence
│   ├── ranked_lobby_private_invite_option/
│   ├── battle_arena_live_match/ # Match page design
│   └── get_ready_page/          # Countdown page design
│
├── email/                         # Email templates
│   ├── user-email-confirm.html
│   ├── user-invite.html
│   └── match-invite.html
│
├── pseudocode/                    # Documentation & planning
│   ├── backend-tasks.txt
│   ├── matchLogic.txt
│   ├── matchInvitationsLogic.txt
│   ├── schema.txt
│   ├── users.csv
│   └── matches.csv
│
├── public/                        # Public assets
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript config
├── tsconfig.app.json             # App TypeScript config
├── tsconfig.node.json            # Node TypeScript config
├── eslint.config.js              # ESLint configuration
├── package.json                  # Dependencies
├── vercel.json                   # Vercel deployment config
├── README.md                     # Project README
└── index.html                    # HTML entry point
```

---

## 📄 Pages & User Flow

### 1. **Landing Page** (`/`)
- **Route Type**: Public (no authentication required)
- **Purpose**: First impression and platform introduction
- **Components**:
  - Hero section with project pitch
  - Feature highlights
  - Call-to-action buttons (Login/Register)
  - FAQ section
  - Developer showcases

### 2. **Registration Page** (`/register`)
- **Route Type**: Public
- **Purpose**: New user onboarding
- **Flow**:
  1. User enters email and password
  2. Accepts terms and conditions
  3. Supabase creates auth account
  4. User profile created in database
  5. Redirects to home page

### 3. **Login Page** (`/login`)
- **Route Type**: Public
- **Purpose**: User authentication
- **Features**:
  - Email-based login
  - "Forgot password" recovery
  - Link to registration

### 4. **Home Page** (`/home`)
- **Route Type**: Protected (authentication required)
- **Purpose**: Main dashboard after authentication
- **Display Information**:
  - User statistics (wins, losses, rating)
  - Recent matches
  - Leaderboard snippets
  - Quick action buttons
- **Components**:
  - Header with user menu
  - Match history
  - Live matches feed
  - Start new match button

### 5. **Find Match Page** (`/findMatch`)
- **Route Type**: Protected
- **Purpose**: Browse and join matches
- **Features**:
  - Match list with difficulty filters
  - Player skill levels
  - Real-time match availability
  - Search and filter options
  - Create new match option

### 6. **Get Ready Page** (`/getReady/:id`)
- **Route Type**: Protected
- **Purpose**: Pre-match countdown
- **Features**:
  - Match details display
  - Opponent information
  - Problem preview (hidden until match starts)
  - "Ready" button confirmation
  - Countdown timer
  - Both players must click "Ready" to proceed

### 7. **Match Page** (`/match/:id`)
- **Route Type**: Protected
- **Purpose**: Active match/battle arena
- **Layout**:
  - Left side: Problem statement
  - Right side: Live scoreboard
  - Bottom: Chat/notifications
- **Real-time Features**:
  - Live opponent status
  - Real-time scoreboard
  - Live chat with opponent
  - Match timer
  - Problem link to Codeforces

### 8. **Victory Page** (`/victory`)
- **Route Type**: Protected
- **Purpose**: Celebrate win
- **Displays**:
  - Victory animation
  - Match statistics
  - Score gained
  - Opponent information
  - Next match suggestions

### 9. **Lose Page** (`/lose`)
- **Route Type**: Protected
- **Purpose**: Show defeat information
- **Displays**:
  - Defeat screen
  - Match statistics
  - Opponent information
  - Analysis and feedback
  - Option to request rematch

### 10. **Profile Page** (`/profile`)
- **Route Type**: Protected
- **Purpose**: User profile management
- **Features**:
  - User avatar and name
  - Match history with statistics
  - Win/loss ratio
  - Rating/ELO score
  - Badges and achievements
  - Edit profile option

### 11. **Settings Page** (`/settings`)
- **Route Type**: Protected
- **Purpose**: User preferences
- **Options**:
  - Change password
  - Update Codeforces handle
  - Notification preferences
  - Theme settings (dark/light)
  - Privacy settings
  - Account deletion

### User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ Landing Page (/index)                                       │
│ [New User] → [Register] → [Login] → [Home]                │
│             [Existing User] → [Login] → [Home]            │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ Find Match Page  │  │ Profile/Settings │
        │ [Browse Matches] │  │ [View Stats]     │
        │ [Create Match]   │  │ [Edit Profile]   │
        └────────┬─────────┘  └──────────────────┘
                 │
                 ▼
        ┌──────────────────────┐
        │ Get Ready Page       │
        │ (/getReady/:id)      │
        │ [Wait for opponent]  │
        │ [Click Ready]        │
        └─────────┬────────────┘
                  │
                  ▼
        ┌──────────────────────┐
        │ Match Page           │
        │ (/match/:id)         │
        │ [Real-time Battle]   │
        │ [Solve Problems]     │
        └────────┬─────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
  ┌──────────┐     ┌──────────┐
  │ Victory  │     │ Lose     │
  │ Page     │     │ Page     │
  └────┬─────┘     └────┬─────┘
       │                │
       └────────┬───────┘
                │
        Play Again / Home
```

---

## 🧩 Components

### Global Components

#### **Header Component** (`/components/Header/Header.tsx`)
- **Purpose**: Navigation and user menu
- **Props**:
  - `userName`: Current user's name
  - `onLogout`: Logout callback
- **Features**:
  - Logo and branding
  - Navigation links
  - User menu dropdown
  - Search bar

#### **Footer Component** (`/components/Footer/Footer.tsx`)
- **Purpose**: Application footer
- **Content**:
  - Links (Privacy, Terms, Contact)
  - Social media links
  - Copyright information

#### **ProtectedRoute Component** (`/components/ProtectedRoute.tsx`)
- **Purpose**: Authentication guard for protected pages
- **Logic**:
  - Checks `AuthContext` for authentication status
  - Redirects unauthenticated users to login
  - Allows authenticated users to proceed
- **Usage**: Wraps pages requiring authentication

#### **PublicRoute Component** (`/components/PublicRoute.tsx`)
- **Purpose**: Access control for public pages
- **Logic**:
  - Allows unauthenticated users to access public pages
  - Redirects authenticated users to home page if accessing landing page
- **Usage**: Wraps public pages (Landing, Login, Register)

### Page Components

Each page typically includes:
- Route-specific layout
- Context consumption for state
- Service calls for data fetching
- Real-time subscriptions (where applicable)
- Error handling and loading states

**Example Page Structure**:
```typescript
// MatchPage.tsx
export function MatchPage() {
  const { match } = useMatch()                  // Context hook
  const { opponent } = useOpponent()            // Context hook
  const matchId = useParams().id                // Route parameter
  
  useEffect(() => {
    const subscription = matchService.subscribeToMatch(matchId)
    return () => subscription.unsubscribe()     // Cleanup
  }, [matchId])
  
  return (
    <div className={styles.matchPage}>
      {/* Page content */}
    </div>
  )
}
```

---

## 🔧 Services

Services handle all business logic and external API communication, keeping components clean and focused on UI.

### 1. **Auth Service** (`authService.ts`)
**Purpose**: Handle user authentication and authorization

**Key Functions**:
- `signUp(email, password)`: Register new user
  - Creates Supabase auth account
  - Creates user profile in database
  - Returns user ID and error status
- `signIn(email, password)`: Authenticate existing user
  - Validates credentials with Supabase
  - Returns session token
- `signOut()`: Logout current user
  - Clears session
  - Redirects to landing page
- `getCurrentUser()`: Get authenticated user info
  - Fetches from Supabase auth
  - Returns user object or null

### 2. **User Service** (`userService.ts`)
**Purpose**: Manage user profiles and data

**Key Functions**:
- `getUserById(userId)`: Fetch user profile
- `updateUserProfile(userId, data)`: Update profile information
- `getUserStats(userId)`: Get win/loss statistics
- `updateCodeforcesHandle(userId, handle)`: Link Codeforces account
- `searchUsers(query)`: Search for users by username
- `getUserRanking()`: Get global leaderboard position

### 3. **Match Service** (`matchService.ts`)
**Purpose**: Handle match operations and state

**Key Functions**:
- `getMatchById(matchId)`: Fetch match details
- `updateMatchStatus(matchId, status)`: Update match state
- `setPlayerReady(matchId, playerId)`: Mark player as ready
- `subscribeToMatch(matchId)`: Real-time subscription to match updates
- `getMatchHistory(userId)`: Get user's match history
- `getActiveMatches()`: Get currently running matches
- `endMatch(matchId, winnerId)`: Conclude a match

### 4. **Create Match Service** (`createMatchService.ts`)
**Purpose**: Handle match creation and initialization

**Key Functions**:
- `createMatch(player1Id, difficulty)`: Create new match
  - Initializes match record in database
  - Selects random Codeforces problem
  - Sets match status to "waiting_for_opponent"
  - Returns match ID
- `selectProblem(difficulty)`: Get random problem from Codeforces
- `validateMatchCreation(userId)`: Check if user can create match

### 5. **Find Match Service** (`findMatchService.ts`)
**Purpose**: Handle match finding and joining

**Key Functions**:
- `findMatches(filters)`: Search for available matches
  - Filter by difficulty
  - Filter by skill level
  - Return list of joinable matches
- `joinMatch(matchId, userId)`: Player joins existing match
  - Validates match exists
  - Updates player2_id in database
  - Changes status to "ready_check"
- `getMatchStats()`: Get aggregate match statistics

### 6. **Codeforces Service** (`codeforcesService.ts`)
**Purpose**: Integration with Codeforces API

**Key Functions**:
- `getProblemSetByRating(minRating, maxRating)`: Get problems in rating range
  - Queries Codeforces API
  - Filters by difficulty
  - Returns problem details (ID, index, contest)
- `getUserStatus(handle)`: Get user's submission status
  - Called by Edge Function (referee)
  - Returns latest verdicts
- `getProblemDetails(contestId, problemIndex)`: Get full problem statement
  - Returns problem text, time limit, memory limit, test cases
- `verifySubmission(handle, contestId, problemIndex)`: Check if user solved problem
  - Returns verdict (OK, COMPILATION_ERROR, WRONG_ANSWER, etc.)

### 7. **Chat Service** (`chatService.ts`)
**Purpose**: Handle in-match chat functionality

**Key Functions**:
- `sendMessage(matchId, senderId, message)`: Send chat message
- `subscribeToChat(matchId)`: Real-time chat updates
- `getMatchChatHistory(matchId)`: Fetch previous messages
- `deleteMessage(messageId)`: Remove message

### 8. **Invitation Service** (`invitationService.ts`)
**Purpose**: Handle match invitations

**Key Functions**:
- `sendInvitation(fromUserId, toUserId, matchId)`: Invite specific player
- `acceptInvitation(invitationId)`: Accept match invite
- `declineInvitation(invitationId)`: Decline invite
- `getInvitations(userId)`: Get pending invitations
- `subscribeToInvitations(userId)`: Real-time invite notifications

### 9. **Avatar Service** (`avatarService.ts`)
**Purpose**: Manage user avatars

**Key Functions**:
- `uploadAvatar(userId, file)`: Upload user avatar image
- `getAvatarUrl(userId)`: Get avatar URL
- `deleteAvatar(userId)`: Remove avatar
- `getDefaultAvatar()`: Get default profile picture

### 10. **Profile Service** (`ProfileService.ts`)
**Purpose**: Manage user profiles

**Key Functions**:
- `getFullProfile(userId)`: Get complete profile data
- `updateProfile(userId, data)`: Update profile information
- `getProfileStats(userId)`: Get statistics for profile display
- `validateProfile(data)`: Validate profile data

---

## 🔄 Contexts & State Management

React Context API is used for global state management, eliminating prop drilling.

### 1. **Auth Context** (`contexts/AuthContext/`)

**Purpose**: Manage authentication state globally

**Context Structure**:
```typescript
interface AuthContextType {
  user: User | null;                    // Current authenticated user
  loading: boolean;                      // Loading indicator
  error: string | null;                 // Error message
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}
```

**Provides**:
- Global access to authenticated user
- Authentication methods
- Loading and error states
- User updates

**Usage**:
```typescript
const { user, signIn, loading } = useAuth()
```

### 2. **Match Context** (`contexts/MatchContext/`)

**Purpose**: Manage current match state

**Context Structure**:
```typescript
interface MatchContextType {
  match: MatchData | null;              // Current match
  loading: boolean;                      // Loading state
  error: string | null;                 // Error message
  problem: CodeforcesProblem | null;    // Current problem
  startMatch: () => Promise<void>;
  endMatch: (winnerId: string) => Promise<void>;
  updateMatchStatus: (status: string) => Promise<void>;
  setReady: () => Promise<void>;
}
```

**Provides**:
- Real-time match data
- Match operations (start, end, update)
- Problem information
- Ready status

**Usage**:
```typescript
const { match, problem, setReady } = useMatch()
```

### 3. **Opponent Context** (`contexts/OpponentContext/`)

**Purpose**: Manage opponent information during match

**Context Structure**:
```typescript
interface OpponentContextType {
  opponent: User | null;                // Opponent data
  opponentStatus: 'idle' | 'ready' | 'solving' | 'finished';
  opponentScore: number;
  subscribeToOpponent: (matchId: string) => void;
  updateOpponentStatus: (status: string) => void;
}
```

**Provides**:
- Opponent profile information
- Opponent status in real-time
- Opponent score tracking

**Usage**:
```typescript
const { opponent, opponentStatus } = useOpponent()
```

---

## 📊 Data Types & Models

### User Model (`types/UserData.ts`)
```typescript
interface User {
  id: string;                    // Unique user ID
  name: string;                  // Full name
  username: string;              // Display username
  email: string;                 // Email address
  codeforces_handle: string;     // Linked Codeforces account
  score: number;                 // ELO rating / points
  created_at?: string;           // Account creation timestamp
  updated_at?: string;           // Last update timestamp
}
```

### Match Model (`types/MatchData.ts`)
```typescript
interface MatchData {
  id: string;                    // Unique match ID
  player1_id: string;            // First player ID
  player2_id: string;            // Second player ID
  status: string;                // Match state
  contest_id: string;            // Codeforces contest ID
  problem_index: string;         // Problem letter (A, B, C, etc.)
  duration?: number;             // Match duration in seconds
  winner_user_id: string;        // ID of match winner
  created_at?: string;           // Match creation time
  finished_at?: string;          // Match end time
  updated_at?: string;           // Last status update
  player1_ready: boolean;        // Player 1 ready status
  player2_ready: boolean;        // Player 2 ready status
}
```

**Match Status Values**:
- `waiting_for_opponent`: Waiting for second player
- `ready_check`: Both players in "Get Ready" page
- `in_progress`: Active match
- `finished`: Match concluded
- `cancelled`: Match cancelled

### Chat Message Model (`types/ChatMessage.ts`)
```typescript
interface ChatMessage {
  id: number;                    // Message ID
  sender: 'you' | 'opponent' | 'system'; // Message source
  text: string;                  // Message content
  time: string;                  // Timestamp
}
```

### Notification Model (`types/Notification.ts`)
```typescript
interface Notification {
  body: string;                  // Notification text
  matchId: string;               // Associated match
}
```

### Codeforces Problem Model (`types/CodeforcesProblem.ts`)
```typescript
interface CodeforcesProblem {
  id: number;
  contestId: number;             // Codeforces contest ID
  index: string;                 // Problem letter
  name: string;                  // Problem title
  type: string;                  // "PROGRAMMING" or "QUESTION"
  points: number;                // Point value
  rating: number;                // Difficulty rating
  tags: string[];                // Problem tags/categories
  timeLimit: number;             // Time limit in ms
  memoryLimit: number;           // Memory limit in MB
}
```

### Create Match Data (`types/CreateMatchData.ts`)
```typescript
interface CreateMatchData {
  difficulty: 'easy' | 'medium' | 'hard'; // Problem difficulty
  matchType: '1v1' | 'team';              // Match type
  isPrivate: boolean;                     // Private vs public match
  invitedUserId?: string;                 // Specific opponent (if private)
}
```

### Auth Service Types (`types/AuthServices.ts`)
```typescript
interface SignUpPayload {
  email: string;
  password: string;
}

interface SignInPayload {
  email: string;
  password: string;
}

interface InsertUserPayload {
  id: string;
  name: string;
  username: string;
  email: string;
  codeforcesHandle: string;
}

interface ServiceError {
  message: string;
}
```

---

## ✨ Key Features

### 1. **Real-Time Match Updates**
- Uses Supabase Realtime (WebSockets)
- Instant status updates between players
- Live scoreboard synchronization
- No polling delays

### 2. **Secure Verification System**
- Server-side referee (Supabase Edge Functions)
- Client cannot cheat (no bypassing verification)
- Polls Codeforces API for actual submissions
- Timestamps prevent time-manipulation exploits

### 3. **Smart Problem Selection**
- Filters by difficulty rating (800-3000)
- Ensures fair matches between similar skill levels
- Random problem selection prevents predictability
- Multiple problems per match type

### 4. **Live Chat During Matches**
- In-game messaging system
- Real-time message delivery
- System notifications for match events
- Chat history preserved

### 5. **Match Invitations**
- Invite specific friends for matches
- Accept/decline invitations
- Notification system
- Private match creation

### 6. **User Profiles & Statistics**
- Win/loss tracking
- ELO rating system
- Match history
- Performance analytics

### 7. **Cyberpunk UI/UX**
- Dark theme with neon accents
- CSS Modules for component scoping
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions

### 8. **Authentication & Security**
- Email-based authentication
- Supabase Row-Level Security (RLS)
- Protected routes
- Session management

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm or yarn**: Package manager
- **Supabase Account**: Free account at [supabase.com](https://supabase.com)
- **Codeforces Account**: Optional (for testing)

### Installation Steps

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/feek-nafas.git
cd feek-nafas
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Setup Environment Variables
Create `.env.local` in project root:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Analytics & Monitoring
VITE_ENVIRONMENT=development
VITE_API_URL=http://localhost:3000
```

**To get Supabase keys**:
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Project Settings → API
4. Copy URL and `anon` key

#### 4. Database Setup
```bash
# Login to Supabase CLI
supabase login

# Initialize project
supabase init

# Apply schema migrations
supabase db push
```

Or manually:
1. Go to Supabase SQL Editor
2. Run SQL from `pseudocode/schema.txt`
3. Create tables: `users`, `matches`, `messages`, `invitations`

#### 5. Start Development Server
```bash
npm run dev
```

Server runs at `http://localhost:5173`

#### 6. Build for Production
```bash
npm run build
```

Output in `dist/` directory

#### 7. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment

### Deployment to Vercel (Recommended)

Vercel is the recommended hosting provider for Feek Nafas due to zero-configuration deployment of Vite projects.

#### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select GitHub repository
   - Click "Import"

3. **Configure Environment**
   - Set environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click "Deploy"

4. **Automatic Deployments**
   - Every push to `main` triggers deployment
   - Preview deployments for pull requests

**Current Deployment**: [vercel.json](./vercel.json) configured

### Alternative: Deploy to Netlify

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy

### Environment Variables for Production
```env
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_prod_anon_key
VITE_ENVIRONMENT=production
```

---

## 📋 Project Development Checklist

### MVP (Minimum Viable Product)
- [x] Landing page
- [x] Authentication (signup/login)
- [x] Home dashboard
- [x] Match creation
- [x] Match finding
- [x] Real-time match display
- [x] Victory/Lose pages
- [x] Codeforces integration
- [ ] Edge Function referee (In Progress)

### Phase 1
- [ ] User profiles
- [ ] Statistics tracking
- [ ] Leaderboards
- [ ] Match history
- [ ] Live chat

### Phase 2
- [ ] Tournaments
- [ ] Team features
- [ ] Custom problems
- [ ] Streaming integration
- [ ] Mobile app

### Phase 3
- [ ] Premium features
- [ ] Sponsorships/Prizes
- [ ] Global tournaments
- [ ] Advanced analytics

---

## 🤝 Contributing

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Add your feature"
   ```

3. **Run linter**
   ```bash
   npm run lint
   ```

4. **Build and test**
   ```bash
   npm run build
   npm run preview
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Standards
- Use TypeScript for all new code
- Follow ESLint configuration
- Use CSS Modules for component styles
- Add comments for complex logic
- Write descriptive commit messages

---

## 📞 Support & Contact

- **Issues**: Report bugs on GitHub Issues
- **Email**: support@feek-nafas.com
- **Discord**: Join our community Discord

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Codeforces**: For problem dataset and API
- **Supabase**: For backend infrastructure
- **React & Vite**: For development tools
- **Community**: For feedback and contributions

---

**Last Updated**: May 11, 2026

**Project Version**: 0.0.0 (In Development)

**Status**: 🟡 Active Development
