// src/app/playground/form-controls/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Heading, Text, SmallText, Paragraph } from '@/components/Typography';
import {
  FormField,
  FormGroup,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  DatePicker,
  FileUpload,
} from '@/components/Form';
import type { UploadedFile } from '@/components/Form';
import {
  FiUser,
  FiMail,
  FiLock,
  FiSearch,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';

type ActiveSection =
  | 'input'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'slider'
  | 'datepicker'
  | 'fileupload';

const SECTIONS: { id: ActiveSection; label: string }[] = [
  { id: 'input', label: 'Input' },
  { id: 'textarea', label: 'Textarea' },
  { id: 'select', label: 'Select' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'radio', label: 'Radio' },
  { id: 'switch', label: 'Switch' },
  { id: 'slider', label: 'Slider' },
  { id: 'datepicker', label: 'DatePicker' },
  { id: 'fileupload', label: 'FileUpload' },
];

function InputDemo() {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Text inputs with variants, sizes, and validation states.
        </Text>
      </div>

      {/* Basic inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Username" required>
          <Input
            placeholder="Enter username"
            leftIcon={<FiUser />}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormField>

        <FormField label="Email" helperText="We'll never share your email">
          <Input
            type="email"
            placeholder="you@example.com"
            leftIcon={<FiMail />}
          />
        </FormField>

        <FormField label="Password">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            leftIcon={<FiLock />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            }
          />
        </FormField>

        <FormField label="Search">
          <Input placeholder="Search..." leftIcon={<FiSearch />} />
        </FormField>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <Text fontWeight="medium" color="primary">
          Variants
        </Text>
        <div className="grid md:grid-cols-3 gap-4">
          <FormField label="Default">
            <Input variant="default" placeholder="Default variant" />
          </FormField>
          <FormField label="Filled">
            <Input variant="filled" placeholder="Filled variant" />
          </FormField>
          <FormField label="Outlined">
            <Input variant="outlined" placeholder="Outlined variant" />
          </FormField>
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <Text fontWeight="medium" color="primary">
          Validation States
        </Text>
        <div className="grid md:grid-cols-3 gap-4">
          <FormField label="Normal" helperText="This is helper text">
            <Input placeholder="Normal state" />
          </FormField>
          <FormField label="Error" error="This field is required">
            <Input placeholder="Error state" state="error" />
          </FormField>
          <FormField label="Success" success="Looks good!">
            <Input placeholder="Success state" state="success" />
          </FormField>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <Text fontWeight="medium" color="primary">
          Sizes
        </Text>
        <div className="grid md:grid-cols-3 gap-4">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      </div>
    </div>
  );
}

function TextareaDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Multi-line text input with auto-resize and character count.
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Description" helperText="Tell us about yourself">
          <Textarea
            placeholder="Write something..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormField>

        <FormField label="With character limit">
          <Textarea
            placeholder="Max 200 characters..."
            maxLength={200}
            showCount
          />
        </FormField>

        <FormField label="Auto-resize">
          <Textarea
            placeholder="This textarea grows with content..."
            autoResize
            minRows={2}
            maxRows={6}
          />
        </FormField>

        <FormField label="Error state" error="Description is required">
          <Textarea placeholder="Error state" state="error" />
        </FormField>
      </div>
    </div>
  );
}

function SelectDemo() {
  const [value, setValue] = useState<string>();

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'SolidJS', disabled: true },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Dropdown select using HeadlessUI Listbox with full keyboard support.
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Framework" required>
          <Select
            options={options}
            value={value}
            onChange={setValue}
            placeholder="Select a framework"
          />
        </FormField>

        <FormField label="With selection">
          <Select
            options={options}
            value="react"
            placeholder="Select a framework"
          />
        </FormField>

        <FormField label="Disabled option" helperText="SolidJS is disabled">
          <Select options={options} placeholder="Try selecting SolidJS" />
        </FormField>

        <FormField label="Error state" error="Please select an option">
          <Select options={options} placeholder="Select..." state="error" />
        </FormField>
      </div>
    </div>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [items, setItems] = useState({
    terms: false,
    newsletter: true,
    updates: false,
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Accessible checkbox with spring-based animation.
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Basic */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary">
            Basic
          </Text>
          <Checkbox
            checked={checked}
            onChange={setChecked}
            label="Accept terms and conditions"
            description="By checking this, you agree to our terms."
          />
        </div>

        {/* Group */}
        <div className="space-y-4">
          <FormGroup legend="Notifications">
            <Checkbox
              checked={items.terms}
              onChange={(c) => setItems({ ...items, terms: c })}
              label="Accept terms"
            />
            <Checkbox
              checked={items.newsletter}
              onChange={(c) => setItems({ ...items, newsletter: c })}
              label="Subscribe to newsletter"
            />
            <Checkbox
              checked={items.updates}
              onChange={(c) => setItems({ ...items, updates: c })}
              label="Receive product updates"
            />
          </FormGroup>
        </div>

        {/* States */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary">
            States
          </Text>
          <div className="space-y-3">
            <Checkbox checked={true} label="Checked" />
            <Checkbox checked={false} label="Unchecked" />
            <Checkbox indeterminate label="Indeterminate" />
            <Checkbox disabled label="Disabled" />
            <Checkbox error label="Error state" />
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary">
            Sizes
          </Text>
          <div className="space-y-3">
            <Checkbox size="sm" label="Small checkbox" />
            <Checkbox size="md" label="Medium checkbox" />
            <Checkbox size="lg" label="Large checkbox" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioDemo() {
  const [value, setValue] = useState<string>('option1');

  const options = [
    {
      value: 'option1',
      label: 'Option 1',
      description: 'First option description',
    },
    {
      value: 'option2',
      label: 'Option 2',
      description: 'Second option description',
    },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Radio group with descriptions and spring-based selection animation.
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <FormGroup legend="Select an option">
          <RadioGroup
            options={options}
            value={value}
            onChange={(v) => setValue(v)}
          />
        </FormGroup>

        <FormGroup legend="Horizontal orientation">
          <RadioGroup options={options.slice(0, 3)} orientation="horizontal" />
        </FormGroup>

        <div className="space-y-4">
          <Text fontWeight="medium" color="primary">
            Sizes
          </Text>
          <RadioGroup
            options={[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
            ]}
            size="sm"
            orientation="horizontal"
          />
        </div>
      </div>
    </div>
  );
}

function SwitchDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Toggle switch with spring-based animation.
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <Switch
            checked={notifications}
            onChange={setNotifications}
            label="Push notifications"
            description="Receive push notifications on your device"
          />
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            label="Dark mode"
            description="Use dark theme throughout the app"
          />
          <Switch
            disabled
            label="Coming soon"
            description="This feature is not available yet"
          />
        </div>

        <div className="space-y-4">
          <Text fontWeight="medium" color="primary">
            Sizes
          </Text>
          <Switch size="sm" checked label="Small" />
          <Switch size="md" checked label="Medium" />
          <Switch size="lg" checked label="Large" />
        </div>
      </div>
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = useState(50);
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Range slider with single or dual thumbs and touch support.
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <FormField label={`Single value: ${value}`}>
          <Slider
            value={value}
            onChange={(v) => setValue(v as number)}
            showValue
          />
        </FormField>

        <FormField label={`Range: ${range[0]} - ${range[1]}`}>
          <Slider
            value={range}
            onChange={(v) => setRange(v as [number, number])}
            showValue
          />
        </FormField>

        <FormField label="With marks">
          <Slider marks step={25} />
        </FormField>

        <FormField label="Custom range (0-1000, step 50)">
          <Slider min={0} max={1000} step={50} />
        </FormField>
      </div>
    </div>
  );
}

function DatePickerDemo() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Date picker with calendar popup using native Date API.
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Select date">
          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Pick a date"
          />
        </FormField>

        <FormField label="With min/max constraints">
          <DatePicker placeholder="Future dates only" minDate={new Date()} />
        </FormField>

        <FormField label="Selected date">
          <DatePicker value={new Date()} placeholder="Pick a date" />
        </FormField>
      </div>
    </div>
  );
}

function FileUploadDemo() {
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
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Drag and drop file upload with preview support.
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Upload files">
          <FileUpload
            multiple
            accept={['image/*', '.pdf', '.doc', '.docx']}
            maxSize={5 * 1024 * 1024}
            files={files}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onError={(error) => console.error(error)}
          />
        </FormField>

        <FormField label="Images only">
          <FileUpload accept={['image/*']} maxSize={2 * 1024 * 1024} preview />
        </FormField>
      </div>
    </div>
  );
}

export default function FormControlsPlayground() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('input');

  const renderDemo = () => {
    switch (activeSection) {
      case 'input':
        return <InputDemo />;
      case 'textarea':
        return <TextareaDemo />;
      case 'select':
        return <SelectDemo />;
      case 'checkbox':
        return <CheckboxDemo />;
      case 'radio':
        return <RadioDemo />;
      case 'switch':
        return <SwitchDemo />;
      case 'slider':
        return <SliderDemo />;
      case 'datepicker':
        return <DatePickerDemo />;
      case 'fileupload':
        return <FileUploadDemo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Heading size="2xl" color="primary" className="font-bold">
            Form Controls
          </Heading>
          <Paragraph color="secondary" className="max-w-2xl mx-auto">
            A comprehensive form control system built with HeadlessUI for
            accessibility. All components support validation states, sizes, and
            follow design principles.
          </Paragraph>
        </div>

        {/* Section Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-2">
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                  activeSection === section.id
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Area */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          {renderDemo()}
        </div>

        {/* Usage */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Import
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { FormField, Input, Select, Checkbox, RadioGroup, Switch, Slider, DatePicker, FileUpload } from '@/components/Form';`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
