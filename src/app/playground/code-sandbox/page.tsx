// src/app/playground/code-sandbox/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  CodeSandbox,
  SandboxFiles,
  SandboxTemplate,
  SandboxLayout,
  SandboxSize,
  TEMPLATE_INFO,
} from './components';

/**
 * Example files for different templates
 */
const EXAMPLE_FILES: Record<string, SandboxFiles> = {
  counter: {
    '/App.tsx': `import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Counter App</h1>
      <div className="counter">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <span className="count">{count}</span>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
      <p className="hint">Click the buttons to change the count</p>
    </div>
  );
}
`,
    '/styles.css': `.app {
  font-family: system-ui, -apple-system, sans-serif;
  padding: 2rem;
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.counter button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
}

.counter button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.counter button:active {
  transform: scale(0.95);
}

.count {
  font-size: 4rem;
  font-weight: 700;
  min-width: 120px;
}

.hint {
  opacity: 0.8;
  font-size: 0.9rem;
}
`,
  },
  todoList: {
    '/App.tsx': `import React, { useState } from 'react';
import './styles.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a sandbox', completed: false },
    { id: 3, text: 'Ship it!', completed: false },
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
      <p className="stats">
        {todos.filter(t => !t.completed).length} items remaining
      </p>
    </div>
  );
}
`,
    '/styles.css': `.app {
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.input-row input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
}

.input-row input:focus {
  outline: none;
  border-color: #0070f3;
  box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
}

.input-row button {
  padding: 0.75rem 1.5rem;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.input-row button:hover {
  background: #0060df;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.todo-list li.completed span {
  text-decoration: line-through;
  opacity: 0.5;
}

.todo-list li input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.todo-list li span {
  flex: 1;
}

.todo-list li button {
  padding: 0.25rem 0.5rem;
  background: none;
  border: none;
  color: #999;
  font-size: 1.25rem;
  cursor: pointer;
}

.todo-list li button:hover {
  color: #ff4444;
}

.stats {
  color: #666;
  font-size: 0.875rem;
  margin-top: 1rem;
}
`,
  },
  animation: {
    '/App.tsx': `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

const items = [
  { id: 1, color: '#ff6b6b', label: 'Drag me!' },
  { id: 2, color: '#4ecdc4', label: 'Click me!' },
  { id: 3, color: '#45b7d1', label: 'Hover me!' },
];

export default function App() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="app">
      <h1>Framer Motion Demo</h1>

      <div className="cards">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="card"
            style={{ background: item.color }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            onClick={() => setSelected(selected === item.id ? null : item.id)}
          >
            <span>{item.label}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Card #{selected} selected!</h2>
              <p>This modal uses AnimatePresence for smooth enter/exit animations.</p>
              <button onClick={() => setSelected(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`,
    '/styles.css': `.app {
  font-family: system-ui, -apple-system, sans-serif;
  padding: 2rem;
  min-height: 100vh;
  background: #f5f5f5;
}

h1 {
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 2rem;
}

.cards {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  width: 150px;
  height: 150px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.modal p {
  color: #666;
  margin-bottom: 1.5rem;
}

.modal button {
  padding: 0.75rem 2rem;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.modal button:hover {
  background: #333;
}
`,
  },
};

/**
 * Demo page for Code Sandbox
 */
export default function CodeSandboxPage() {
  const [activeExample, setActiveExample] = useState<
    'counter' | 'todoList' | 'animation'
  >('counter');
  const [template, setTemplate] = useState<SandboxTemplate>('react-ts');
  const [layout, setLayout] = useState<SandboxLayout>('horizontal');
  const [size, setSize] = useState<SandboxSize>('default');
  const [showFileTree, setShowFileTree] = useState(true);
  const [showConsole, setShowConsole] = useState(false);

  const examples = [
    { id: 'counter' as const, label: 'Counter', icon: '🔢' },
    { id: 'todoList' as const, label: 'Todo List', icon: '✅' },
    { id: 'animation' as const, label: 'Animation', icon: '✨' },
  ];

  const dependencies: Record<string, string> =
    activeExample === 'animation' ? { 'framer-motion': '^11.0.0' } : {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Code Sandbox
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Live code editing with Monaco Editor and in-browser execution via
            Sandpack. Edit code on the left, see results instantly on the right.
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example selector */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Example
              </legend>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Example selection"
              >
                {examples.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveExample(ex.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      activeExample === ex.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {ex.icon} {ex.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Layout selector */}
            <div>
              <label
                htmlFor="sandbox-layout"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Layout
              </label>
              <select
                id="sandbox-layout"
                value={layout}
                onChange={(e) => setLayout(e.target.value as SandboxLayout)}
                className={cn(
                  'w-full px-3 py-2 rounded-lg border',
                  'bg-white dark:bg-gray-800',
                  'border-gray-200 dark:border-gray-700',
                  'text-gray-900 dark:text-gray-100',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
                )}
              >
                <option value="horizontal">Horizontal Split</option>
                <option value="vertical">Vertical Stack</option>
                <option value="preview-only">Preview Only</option>
              </select>
            </div>

            {/* Size selector */}
            <div>
              <label
                htmlFor="sandbox-size"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Size
              </label>
              <select
                id="sandbox-size"
                value={size}
                onChange={(e) => setSize(e.target.value as SandboxSize)}
                className={cn(
                  'w-full px-3 py-2 rounded-lg border',
                  'bg-white dark:bg-gray-800',
                  'border-gray-200 dark:border-gray-700',
                  'text-gray-900 dark:text-gray-100',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
                )}
              >
                <option value="compact">Compact</option>
                <option value="default">Default</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Toggles */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Panels
              </legend>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFileTree}
                    onChange={(e) => setShowFileTree(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Files
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showConsole}
                    onChange={(e) => setShowConsole(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Console
                  </span>
                </label>
              </div>
            </fieldset>
          </div>
        </motion.div>

        {/* Sandbox */}
        <motion.div
          key={activeExample}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CodeSandbox
            files={EXAMPLE_FILES[activeExample]}
            template={template}
            dependencies={dependencies}
            layout={layout}
            size={size}
            showFileTree={showFileTree}
            showConsole={showConsole}
            height={600}
            theme="auto"
          />
        </motion.div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: '✏️',
              title: 'Monaco Editor',
              description:
                "VS Code's editor with syntax highlighting, IntelliSense, and error detection.",
            },
            {
              icon: '⚡',
              title: 'Instant Preview',
              description:
                "See your changes immediately with Sandpack's in-browser bundler.",
            },
            {
              icon: '📦',
              title: 'NPM Support',
              description:
                'Import any npm package and use it in your code instantly.',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={cn(
                'p-6 rounded-xl',
                'bg-white dark:bg-gray-900',
                'border border-gray-200 dark:border-gray-800',
                'shadow-sm',
              )}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
