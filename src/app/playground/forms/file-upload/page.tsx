// src/app/playground/forms/file-upload/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { FormField, FileUpload } from '@/components/Form';
import type { UploadedFile } from '@/components/Form';

export default function FileUploadPlayground() {
  const [multiple, setMultiple] = useState(true);
  const [preview, setPreview] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleUpload = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substring(2, 9),
    }));
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="File Upload"
          subheadline="Drag and drop file upload with preview support, file type validation, and size limits."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={multiple}
                onChange={(e) => setMultiple(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <SmallText>Multiple files</SmallText>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preview}
                onChange={(e) => setPreview(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <SmallText>Show preview</SmallText>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <SmallText>Disabled</SmallText>
            </label>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="max-w-lg mx-auto">
              <FormField
                label="Upload files"
                helperText="Drag and drop or click to browse"
              >
                <FileUpload
                  multiple={multiple}
                  preview={preview}
                  disabled={disabled}
                  accept={['image/*', '.pdf', '.doc', '.docx']}
                  maxSize={5 * 1024 * 1024}
                  files={files}
                  onUpload={handleUpload}
                  onRemove={handleRemove}
                  onError={(error) => console.error(error)}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Examples
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Images only"
                helperText="Upload images (max 2MB)"
              >
                <FileUpload
                  accept={['image/*']}
                  maxSize={2 * 1024 * 1024}
                  preview
                />
              </FormField>
              <FormField
                label="Documents"
                helperText="PDF, DOC, DOCX (max 10MB)"
              >
                <FileUpload
                  accept={['.pdf', '.doc', '.docx']}
                  maxSize={10 * 1024 * 1024}
                  multiple
                />
              </FormField>
              <FormField label="Single file" helperText="Only one file allowed">
                <FileUpload multiple={false} />
              </FormField>
              <FormField
                label="With preview"
                helperText="Image thumbnails shown"
              >
                <FileUpload accept={['image/*']} preview multiple />
              </FormField>
            </div>
          </div>
        </div>

        {/* States */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            States
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Normal">
                <FileUpload />
              </FormField>
              <FormField label="Disabled">
                <FileUpload disabled />
              </FormField>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>files</InlineCode> - UploadedFile[]
              </p>
              <p>
                <InlineCode>onUpload</InlineCode> - (files: File[]) =&gt; void
              </p>
              <p>
                <InlineCode>onRemove</InlineCode> - (id: string) =&gt; void
              </p>
              <p>
                <InlineCode>onError</InlineCode> - (error: string) =&gt; void
              </p>
              <p>
                <InlineCode>multiple</InlineCode> - boolean
              </p>
              <p>
                <InlineCode>disabled</InlineCode> - boolean
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Validation
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>accept</InlineCode> - File types (e.g., image/*,
                .pdf)
              </p>
              <p>
                <InlineCode>maxSize</InlineCode> - Max file size in bytes
              </p>
              <p>
                <InlineCode>maxFiles</InlineCode> - Max number of files
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Drag and drop support</p>
              <p>Click to browse</p>
              <p>Image preview thumbnails</p>
              <p>File size validation</p>
              <p>Remove uploaded files</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { FormField, FileUpload } from '@/components/Form';
import type { UploadedFile } from '@/components/Form';

const [files, setFiles] = useState<UploadedFile[]>([]);

<FormField label="Upload files">
  <FileUpload
    files={files}
    onUpload={(newFiles) => {
      const uploaded = newFiles.map(file => ({
        file,
        id: crypto.randomUUID(),
      }));
      setFiles(prev => [...prev, ...uploaded]);
    }}
    onRemove={(id) => setFiles(prev => prev.filter(f => f.id !== id))}
    accept={['image/*', '.pdf']}
    maxSize={5 * 1024 * 1024}
    multiple
    preview
  />
</FormField>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
