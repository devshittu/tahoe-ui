// src/app/playground/code-blocks/components/hooks/useCopyComponent.ts
'use client';

import { useState, useCallback } from 'react';
import type { RegistryComponent, ComponentFile } from '../types';

interface UseCopyComponentOptions {
  /** Callback after successful copy */
  onSuccess?: (component: RegistryComponent, content: string) => void;
  /** Callback on copy error */
  onError?: (error: Error) => void;
}

interface UseCopyComponentReturn {
  /** Copy component files */
  copyComponent: (
    component: RegistryComponent,
    selectedFiles?: string[],
  ) => Promise<void>;
  /** Copy single file */
  copyFile: (file: ComponentFile) => Promise<void>;
  /** Copy install command */
  copyInstallCommand: (component: RegistryComponent) => Promise<void>;
  /** Whether copy is in progress */
  isCopying: boolean;
  /** Recently copied component ID */
  copiedId: string | null;
  /** Reset copied state */
  resetCopied: () => void;
}

/**
 * Generate import statement for a file
 */
function generateImport(
  component: RegistryComponent,
  basePath: string,
): string {
  const mainFile = component.files.find((f) => f.isEntry) || component.files[0];
  const componentPath = `${basePath}/${component.id}`;

  // Check if it's a default export or named exports
  const hasDefaultExport = mainFile.content.includes('export default');
  const namedExports = mainFile.content.match(
    /export (?:const|function|class) (\w+)/g,
  );

  if (hasDefaultExport) {
    return `import ${component.name} from '${componentPath}';`;
  }

  if (namedExports && namedExports.length > 0) {
    const names = namedExports
      .map((exp) => exp.replace(/export (?:const|function|class) /, ''))
      .join(', ');
    return `import { ${names} } from '${componentPath}';`;
  }

  return `import { ${component.name} } from '${componentPath}';`;
}

/**
 * Generate install command for dependencies
 */
function generateInstallCommand(component: RegistryComponent): string {
  const deps = component.dependencies.filter((d) => !d.dev && !d.peer);
  const devDeps = component.dependencies.filter((d) => d.dev);

  const commands: string[] = [];

  if (deps.length > 0) {
    const packages = deps.map((d) => `${d.name}@${d.version}`).join(' ');
    commands.push(`npm install ${packages}`);
  }

  if (devDeps.length > 0) {
    const packages = devDeps.map((d) => `${d.name}@${d.version}`).join(' ');
    commands.push(`npm install -D ${packages}`);
  }

  return commands.join(' && ') || '# No dependencies required';
}

/**
 * Format component files for copying
 */
function formatFilesForCopy(
  component: RegistryComponent,
  selectedFiles?: string[],
  basePath: string = '@/components',
): string {
  const files =
    selectedFiles && selectedFiles.length > 0
      ? component.files.filter((f) => selectedFiles.includes(f.name))
      : component.files;

  const sections: string[] = [];

  // Add import statement
  sections.push(`// Import:\n${generateImport(component, basePath)}\n`);

  // Add each file
  files.forEach((file) => {
    sections.push(`// ${file.path}\n${file.content}`);
  });

  // Add dependencies if any
  if (component.dependencies.length > 0) {
    sections.push(
      `\n// Dependencies:\n// ${generateInstallCommand(component)}`,
    );
  }

  return sections.join('\n\n');
}

/**
 * Hook for copying component code to clipboard
 */
export function useCopyComponent({
  onSuccess,
  onError,
}: UseCopyComponentOptions = {}): UseCopyComponentReturn {
  const [isCopying, setIsCopying] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }, []);

  const copyComponent = useCallback(
    async (component: RegistryComponent, selectedFiles?: string[]) => {
      setIsCopying(true);
      try {
        const content = formatFilesForCopy(component, selectedFiles);
        await copyToClipboard(content);
        setCopiedId(component.id);
        onSuccess?.(component, content);

        // Reset after delay
        setTimeout(() => setCopiedId(null), 3000);
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error('Copy failed'));
      } finally {
        setIsCopying(false);
      }
    },
    [copyToClipboard, onSuccess, onError],
  );

  const copyFile = useCallback(
    async (file: ComponentFile) => {
      setIsCopying(true);
      try {
        await copyToClipboard(file.content);
        setCopiedId(file.name);
        setTimeout(() => setCopiedId(null), 3000);
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error('Copy failed'));
      } finally {
        setIsCopying(false);
      }
    },
    [copyToClipboard, onError],
  );

  const copyInstallCommand = useCallback(
    async (component: RegistryComponent) => {
      setIsCopying(true);
      try {
        const command = generateInstallCommand(component);
        await copyToClipboard(command);
        setCopiedId(`${component.id}-install`);
        setTimeout(() => setCopiedId(null), 3000);
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error('Copy failed'));
      } finally {
        setIsCopying(false);
      }
    },
    [copyToClipboard, onError],
  );

  const resetCopied = useCallback(() => {
    setCopiedId(null);
  }, []);

  return {
    copyComponent,
    copyFile,
    copyInstallCommand,
    isCopying,
    copiedId,
    resetCopied,
  };
}

export default useCopyComponent;
