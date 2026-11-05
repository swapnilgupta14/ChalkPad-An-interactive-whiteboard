
# Collaborative Whiteboard

A real-time, multi-user collaborative whiteboard built for teams, developers, educators, and creative minds. Draw, sketch, brainstorm, and collaborate with others on a shared infinite canvas.

## Overview

This project is an open-source collaborative whiteboard that allows multiple users to work together on a shared canvas in real time.

Whether you're brainstorming ideas, explaining concepts, sketching diagrams, planning workflows, or teaching remotely, everyone can contribute to the same workspace simultaneously.

## Features

- **Real-time Collaboration** – Multiple users can collaborate on the same whiteboard simultaneously.
- **Freehand Drawing** – Draw sketches and illustrations with a smooth, hand-drawn aesthetic.
- **Shared Canvas** – Work together on a common canvas with synchronized updates.
- **Multiple Drawing Tools** – Create and manipulate different elements on the whiteboard.
- **Live Synchronization** – Changes are propagated across connected users in real time.
- **Interactive Workspace** – A flexible environment for brainstorming, planning, and visual communication.
- **Open Source** – Free to use, explore, modify, and contribute to.

## Tech Stack

- React.js – Frontend UI
- Rough.js – Hand-drawn graphics and rendering
- Socket.IO – Real-time communication
- Redux Toolkit – Application state management

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Start the backend server separately if the project uses a separate server:

   ```bash
   npm run server
   ```

## How It Works

The application uses real-time communication to synchronize drawing operations between connected users.

When a user creates or modifies an element on the canvas, the corresponding update is broadcast to other connected participants, allowing everyone to see changes without manually refreshing the workspace.

## Use Cases

- Team brainstorming and ideation
- Online teaching and tutoring
- Technical discussions and system design
- Flowcharts and diagrams
- Collaborative planning
- Visual note-taking
- Remote workshops

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "feat: add your feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request.

## License

This project is open source. See the [LICENSE](LICENSE) file for details.
