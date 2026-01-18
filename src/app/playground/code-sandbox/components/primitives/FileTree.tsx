// src/app/playground/code-sandbox/components/primitives/FileTree.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type {
  FileTreeProps,
  FileTreeItem,
  SandboxFiles,
  SandboxSize,
} from '../types';
import { getSizeConfig, getFileIcon, SANDBOX_ANIMATIONS } from '../types';

/**
 * File tree item component
 */
interface FileTreeItemRowProps {
  item: FileTreeItem;
  activeFile: string;
  openFolders: Set<string>;
  onSelect: (path: string) => void;
  onToggleFolder: (path: string) => void;
  onDelete?: (path: string) => void;
  onRename?: (oldPath: string, newPath: string) => void;
  size: SandboxSize;
  allowOperations: boolean;
}

function FileTreeItemRow({
  item,
  activeFile,
  openFolders,
  onSelect,
  onToggleFolder,
  onDelete,
  onRename,
  size,
  allowOperations,
}: FileTreeItemRowProps) {
  const sizeConfig = getSizeConfig(size);
  const isFolder = item.type === 'folder';
  const isOpen = openFolders.has(item.path);
  const isActive = item.path === activeFile;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const handleClick = () => {
    if (isFolder) {
      onToggleFolder(item.path);
    } else {
      onSelect(item.path);
    }
  };

  const handleRename = () => {
    if (newName && newName !== item.name) {
      const parentPath = item.path.substring(0, item.path.lastIndexOf('/'));
      const newPath = `${parentPath}/${newName}`;
      onRename?.(item.path, newPath);
    }
    setIsRenaming(false);
  };

  const icon = isFolder
    ? isOpen
      ? '📂'
      : '📁'
    : getFileIcon(item.path, false);

  return (
    <div>
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        }}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 cursor-pointer rounded-md',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'transition-colors duration-100',
          isActive && 'bg-blue-50 dark:bg-blue-900/20',
        )}
        style={{ paddingLeft: item.depth * 12 + 8 }}
        onClick={handleClick}
      >
        {isFolder && (
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={SANDBOX_ANIMATIONS.fast}
            className="text-xs text-gray-400"
          >
            ▶
          </motion.span>
        )}
        <span className="text-sm">{icon}</span>
        {isRenaming ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
              if (e.key === 'Escape') {
                setNewName(item.name);
                setIsRenaming(false);
              }
            }}
            ref={(input) => input?.focus()}
            className={cn(
              'flex-1 px-1 py-0.5 rounded',
              'bg-white dark:bg-gray-900',
              'border border-blue-500',
              'text-gray-900 dark:text-gray-100',
              'focus:outline-none',
            )}
            style={{ fontSize: sizeConfig.fontSize - 1 }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span
            className={cn(
              'flex-1 truncate',
              isActive
                ? 'text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-700 dark:text-gray-300',
            )}
            style={{ fontSize: sizeConfig.fontSize - 1 }}
          >
            {item.name}
          </span>
        )}
        {allowOperations && !isFolder && !isRenaming && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(true);
              }}
              className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(item.path);
              }}
              className="p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </motion.div>

      {/* Children */}
      <AnimatePresence initial={false}>
        {isFolder && isOpen && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SANDBOX_ANIMATIONS.fast}
          >
            {item.children.map((child) => (
              <FileTreeItemRow
                key={child.path}
                item={child}
                activeFile={activeFile}
                openFolders={openFolders}
                onSelect={onSelect}
                onToggleFolder={onToggleFolder}
                onDelete={onDelete}
                onRename={onRename}
                size={size}
                allowOperations={allowOperations}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * New file input component
 */
interface NewFileInputProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
  size: SandboxSize;
}

function NewFileInput({ onSubmit, onCancel, size }: NewFileInputProps) {
  const sizeConfig = getSizeConfig(size);
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.startsWith('/') ? name : `/${name}`);
    }
    onCancel();
  };

  return (
    <div className="px-2 py-1">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
          if (e.key === 'Escape') onCancel();
        }}
        placeholder="filename.tsx"
        ref={(input) => input?.focus()}
        className={cn(
          'w-full px-2 py-1 rounded',
          'bg-white dark:bg-gray-900',
          'border border-blue-500',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400',
          'focus:outline-none',
        )}
        style={{ fontSize: sizeConfig.fontSize - 1 }}
      />
    </div>
  );
}

/**
 * File tree sidebar component
 */
export function FileTree({
  files,
  activeFile,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
  allowOperations = false,
  size = 'default',
  className,
}: FileTreeProps) {
  const sizeConfig = getSizeConfig(size);
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(['/src', '/']),
  );
  const [isCreating, setIsCreating] = useState(false);

  // Build file tree
  const fileTree = React.useMemo(() => {
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
  }, [files]);

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

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-gray-50 dark:bg-gray-900/50',
        'border-r border-gray-200 dark:border-gray-800',
        className,
      )}
      style={{ width: sizeConfig.sidebarWidth }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between',
          'border-b border-gray-200 dark:border-gray-800',
          'px-3',
        )}
        style={{ height: sizeConfig.headerHeight }}
      >
        <span
          className="font-medium text-gray-700 dark:text-gray-300"
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          Files
        </span>
        {allowOperations && (
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className={cn(
              'p-1 rounded',
              'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
              'hover:bg-gray-200 dark:hover:bg-gray-800',
              'transition-colors duration-150',
            )}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        )}
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-auto py-1">
        {isCreating && (
          <NewFileInput
            onSubmit={(name) => {
              onFileCreate?.(name);
              setIsCreating(false);
            }}
            onCancel={() => setIsCreating(false)}
            size={size}
          />
        )}
        {fileTree.map((item) => (
          <FileTreeItemRow
            key={item.path}
            item={item}
            activeFile={activeFile}
            openFolders={openFolders}
            onSelect={onFileSelect}
            onToggleFolder={toggleFolder}
            onDelete={onFileDelete}
            onRename={onFileRename}
            size={size}
            allowOperations={allowOperations}
          />
        ))}
      </div>
    </div>
  );
}

export default FileTree;
