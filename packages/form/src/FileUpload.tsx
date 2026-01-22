'use client';

import React, { useCallback, useState, useRef, useMemo } from 'react';
import { cn } from '@tahoe-ui/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloudIcon,
  FileIcon,
  ImageIcon,
  XIcon,
  AlertCircleIcon,
} from './icons';
import type { FileUploadProps, UploadedFile } from './types';

/**
 * FileUpload - Drag and drop file upload component
 *
 * @example
 * ```tsx
 * import { FileUpload } from '@tahoe-ui/form';
 *
 * <FileUpload
 *   accept={['image/*', '.pdf']}
 *   multiple
 *   onUpload={(files) => console.log(files)}
 *   maxSize={5 * 1024 * 1024}
 * />
 * ```
 */

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  onUpload,
  onError,
  files = [],
  onRemove,
  preview = true,
  disabled = false,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptString = accept?.join(',') || '*';
  const acceptedTypes = useMemo(
    () => accept?.map((t) => t.toLowerCase()) || [],
    [accept],
  );

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file type
      if (acceptedTypes.length > 0) {
        const fileType = file.type.toLowerCase();
        const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
        const isValid = acceptedTypes.some(
          (type) =>
            type === fileType ||
            type === fileExt ||
            (type.endsWith('/*') &&
              fileType.startsWith(type.replace('/*', '/'))),
        );
        if (!isValid) {
          return `File type not accepted: ${file.name}`;
        }
      }

      // Check file size
      if (file.size > maxSize) {
        return `File too large: ${file.name} (max ${formatFileSize(maxSize)})`;
      }

      return null;
    },
    [acceptedTypes, maxSize],
  );

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const newFiles = Array.from(fileList);

      // Check max files
      if (files.length + newFiles.length > maxFiles) {
        onError?.(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const validFiles: File[] = [];
      const errors: string[] = [];

      newFiles.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      if (errors.length > 0) {
        onError?.(errors.join(', '));
      }

      if (validFiles.length > 0) {
        onUpload?.(validFiles);
      }
    },
    [files.length, maxFiles, validateFile, onUpload, onError],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const { files: droppedFiles } = e.dataTransfer;
      if (droppedFiles.length > 0) {
        handleFiles(droppedFiles);
      }
    },
    [disabled, handleFiles],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files: selectedFiles } = e.target;
      if (selectedFiles && selectedFiles.length > 0) {
        handleFiles(selectedFiles);
      }
      // Reset input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [handleFiles],
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const isImage = (file: File) => file.type.startsWith('image/');

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-label="Upload files"
        className={cn(
          'relative flex flex-col items-center justify-center',
          'w-full min-h-[160px] p-6 rounded-xl',
          'border-2 border-dashed transition-colors duration-150',
          'cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10',
          isDragging
            ? 'border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-800/50'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptString}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="sr-only"
        />

        <UploadCloudIcon
          className={cn(
            'w-10 h-10 mb-3 transition-colors',
            isDragging
              ? 'text-gray-500 dark:text-gray-400'
              : 'text-gray-400 dark:text-gray-500',
          )}
        />

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Click to upload
          </span>{' '}
          or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {accept ? accept.join(', ') : 'Any file'} (max{' '}
          {formatFileSize(maxSize)})
        </p>
      </div>

      {/* File list */}
      <AnimatePresence mode="popLayout">
        {files.map((uploadedFile) => (
          <motion.div
            key={uploadedFile.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg',
                'bg-gray-50 dark:bg-gray-800/50',
                'border border-gray-200 dark:border-gray-700',
                // Error state (CSS variable-backed via @tahoe-ui/tailwind-preset)
                uploadedFile.error &&
                  'border-error bg-error-light dark:bg-error-dark/20',
              )}
            >
              {/* Preview or icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {preview && isImage(uploadedFile.file) ? (
                  <img
                    src={URL.createObjectURL(uploadedFile.file)}
                    alt={uploadedFile.file.name}
                    className="w-full h-full object-cover"
                  />
                ) : isImage(uploadedFile.file) ? (
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <FileIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(uploadedFile.file.size)}
                </p>

                {/* Progress bar */}
                {uploadedFile.progress !== undefined &&
                  uploadedFile.progress < 100 && (
                    <div className="mt-1.5 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 dark:bg-gray-100 transition-all duration-150"
                        style={{ width: `${uploadedFile.progress}%` }}
                      />
                    </div>
                  )}

                {/* Error (CSS variable-backed via @tahoe-ui/tailwind-preset) */}
                {uploadedFile.error && (
                  <p className="text-xs text-error mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />
                    {uploadedFile.error}
                  </p>
                )}
              </div>

              {/* Remove button */}
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(uploadedFile.id)}
                  className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Remove file"
                >
                  <XIcon className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

FileUpload.displayName = 'FileUpload';

export default FileUpload;
