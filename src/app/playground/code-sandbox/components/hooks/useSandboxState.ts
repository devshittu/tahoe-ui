// src/app/playground/code-sandbox/components/hooks/useSandboxState.ts
'use client';

import { useState, useCallback, useMemo } from 'react';
import type {
  SandboxFiles,
  SandboxFile,
  ConsoleEntry,
  FileTreeItem,
} from '../types';

interface UseSandboxStateOptions {
  initialFiles: SandboxFiles;
  initialActiveFile?: string;
  onFilesChange?: (files: SandboxFiles) => void;
  onActiveFileChange?: (path: string) => void;
}

interface UseSandboxStateReturn {
  files: SandboxFiles;
  activeFile: string;
  consoleEntries: ConsoleEntry[];
  fileTree: FileTreeItem[];
  openFolders: Set<string>;
  setActiveFile: (path: string) => void;
  updateFile: (path: string, content: string) => void;
  createFile: (path: string, content?: string) => void;
  deleteFile: (path: string) => void;
  renameFile: (oldPath: string, newPath: string) => void;
  toggleFolder: (path: string) => void;
  addConsoleEntry: (entry: Omit<ConsoleEntry, 'id' | 'timestamp'>) => void;
  clearConsole: () => void;
  resetFiles: (files: SandboxFiles) => void;
}

/**
 * Normalize file content - extract string from SandboxFile if needed
 */
function getFileContent(file: string | SandboxFile): string {
  return typeof file === 'string' ? file : file.content;
}

/**
 * Build file tree from flat file map
 */
function buildFileTree(files: SandboxFiles): FileTreeItem[] {
  const root: FileTreeItem[] = [];
  const paths = Object.keys(files).sort();

  for (const path of paths) {
    const file = files[path];
    const isHidden =
      typeof file === 'object' && 'hidden' in file && file.hidden;
    if (isHidden) continue;

    const parts = path.split('/').filter(Boolean);
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const currentPath = '/' + parts.slice(0, i + 1).join('/');
      const isFile = i === parts.length - 1;

      let existing = currentLevel.find((item) => item.name === part);

      if (!existing) {
        existing = {
          name: part,
          path: currentPath,
          type: isFile ? 'file' : 'folder',
          depth: i,
          children: isFile ? undefined : [],
        };
        currentLevel.push(existing);
      }

      if (!isFile && existing.children) {
        currentLevel = existing.children;
      }
    }
  }

  // Sort: folders first, then files, alphabetically
  const sortItems = (items: FileTreeItem[]): FileTreeItem[] => {
    return items
      .sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      })
      .map((item) => ({
        ...item,
        children: item.children ? sortItems(item.children) : undefined,
      }));
  };

  return sortItems(root);
}

/**
 * Hook for managing sandbox state
 */
export function useSandboxState({
  initialFiles,
  initialActiveFile,
  onFilesChange,
  onActiveFileChange,
}: UseSandboxStateOptions): UseSandboxStateReturn {
  const [files, setFiles] = useState<SandboxFiles>(initialFiles);
  const [activeFile, setActiveFileState] = useState<string>(
    initialActiveFile || Object.keys(initialFiles)[0] || '/App.tsx',
  );
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    () => new Set(['/src']),
  );

  // Build file tree from files
  const fileTree = useMemo(() => buildFileTree(files), [files]);

  // Set active file
  const setActiveFile = useCallback(
    (path: string) => {
      setActiveFileState(path);
      onActiveFileChange?.(path);
    },
    [onActiveFileChange],
  );

  // Update file content
  const updateFile = useCallback(
    (path: string, content: string) => {
      setFiles((prev) => {
        const existingFile = prev[path];
        const newFile: SandboxFile =
          typeof existingFile === 'object'
            ? { ...existingFile, content }
            : { path, content };

        const newFiles = { ...prev, [path]: newFile };
        onFilesChange?.(newFiles);
        return newFiles;
      });
    },
    [onFilesChange],
  );

  // Create new file
  const createFile = useCallback(
    (path: string, content = '') => {
      setFiles((prev) => {
        if (prev[path]) return prev;
        const newFiles = { ...prev, [path]: { path, content } };
        onFilesChange?.(newFiles);
        return newFiles;
      });
      setActiveFile(path);
    },
    [onFilesChange, setActiveFile],
  );

  // Delete file
  const deleteFile = useCallback(
    (path: string) => {
      setFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles[path];
        onFilesChange?.(newFiles);

        // If deleted file was active, switch to another
        if (path === activeFile) {
          const remaining = Object.keys(newFiles);
          if (remaining.length > 0) {
            setActiveFileState(remaining[0]);
          }
        }

        return newFiles;
      });
    },
    [activeFile, onFilesChange],
  );

  // Rename file
  const renameFile = useCallback(
    (oldPath: string, newPath: string) => {
      setFiles((prev) => {
        if (!prev[oldPath] || prev[newPath]) return prev;

        const content = getFileContent(prev[oldPath]);
        const newFiles = { ...prev };
        delete newFiles[oldPath];
        newFiles[newPath] = { path: newPath, content };

        onFilesChange?.(newFiles);

        if (oldPath === activeFile) {
          setActiveFileState(newPath);
        }

        return newFiles;
      });
    },
    [activeFile, onFilesChange],
  );

  // Toggle folder open/closed
  const toggleFolder = useCallback((path: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  // Add console entry
  const addConsoleEntry = useCallback(
    (entry: Omit<ConsoleEntry, 'id' | 'timestamp'>) => {
      if (entry.type === 'clear') {
        setConsoleEntries([]);
        return;
      }

      setConsoleEntries((prev) => [
        ...prev,
        {
          ...entry,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
        },
      ]);
    },
    [],
  );

  // Clear console
  const clearConsole = useCallback(() => {
    setConsoleEntries([]);
  }, []);

  // Reset files
  const resetFiles = useCallback(
    (newFiles: SandboxFiles) => {
      setFiles(newFiles);
      const firstFile = Object.keys(newFiles)[0];
      if (firstFile) {
        setActiveFileState(firstFile);
      }
      setConsoleEntries([]);
      onFilesChange?.(newFiles);
    },
    [onFilesChange],
  );

  return {
    files,
    activeFile,
    consoleEntries,
    fileTree,
    openFolders,
    setActiveFile,
    updateFile,
    createFile,
    deleteFile,
    renameFile,
    toggleFolder,
    addConsoleEntry,
    clearConsole,
    resetFiles,
  };
}

export default useSandboxState;
