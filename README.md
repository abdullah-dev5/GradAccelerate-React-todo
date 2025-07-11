
# GradTrack - Task Manager

![App Preview](./public/screenshot.png)

A beautiful task management application with drag-and-drop functionality and calendar view, featuring dark mode support.

## Features

✅ **Interactive Kanban Board**  
- Drag-and-drop tasks between columns (To Do, In Progress, Done)
- Priority indicators with color coding
- Quick edit/delete functionality

✅ **Smart Calendar View**  
- Monthly overview of tasks
- Filter by: Today/Week/Month/Overdue
- Visual overdue indicators

✅ **Modern UI**  
- Dark/light mode toggle
- Responsive design
- Smooth animations
- Local storage persistence

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdullah-dev5/GradAccelerate-React-todo.git
   cd GradAccelerate-React-todo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Tech Stack

| Category        | Technologies                          |
|-----------------|---------------------------------------|
| Framework       | React 19 + Vite                       |
| Styling         | Tailwind CSS (with dark mode)         |
| State Management| Context API                           |
| Drag-and-Drop   | React DnD                             |
| Date Handling   | date-fns                              |
| Icons           | React Icons                           |

## Scripts

| Command         | Description                           |
|-----------------|---------------------------------------|
| `pnpm dev`      | Start development server              |
| `pnpm build`    | Create production build               |
| `pnpm lint`     | Run ESLint                           |
| `pnpm preview`  | Preview production build              |

## Folder Structure

```
src/
├── components/
│   ├── AddTaskForm.jsx
│   ├── Board.jsx
│   ├── CalendarView.jsx
│   ├── Column.jsx
│   ├── DarkModeToggle.jsx
│   └── TaskCard.jsx
├── constants/
│   └── taskStatus.js
├── context/
│   └── TaskContext.jsx
├── App.jsx
└── main.jsx
```

## How to Contribute

1. Fork the project
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

MIT License

---

**Enjoy your productive task management!** 
```

### How to Download:
1. Copy all the text above
2. Create a new file named `README.md` in your project root
3. Paste the content
4. Save the file

### Customization Tips:
1. Replace `./public/screenshot.png` with your actual screenshot
2. Update the GitHub URL with your repository link
3. Add your contact email
4. Include any additional features you've implemented

Would you like me to:
1. Provide a screenshot template?
2. Add deployment instructions for Vercel/Netlify?
3. Include a demo video link section?
