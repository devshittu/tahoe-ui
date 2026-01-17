// src/app/playground/hover-card/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import { HeadlineBlock } from '../headline/components';
import {
  HoverCard,
  type HoverCardPlacement,
  type HoverCardSize,
} from './components';
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiLink,
  FiGlobe,
  FiTwitter,
  FiGithub,
  FiStar,
  FiUsers,
  FiPackage,
  FiBook,
  FiExternalLink,
} from 'react-icons/fi';

// Sample user data for previews
const USERS = [
  {
    id: '1',
    name: 'Sarah Chen',
    handle: '@sarahchen',
    avatar: 'SC',
    bio: 'Design systems architect. Building tools that help designers and developers work better together.',
    location: 'San Francisco, CA',
    followers: 12400,
    following: 892,
    verified: true,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    handle: '@marcusj',
    avatar: 'MJ',
    bio: 'Full-stack developer passionate about React and TypeScript. Open source contributor.',
    location: 'Austin, TX',
    followers: 8200,
    following: 445,
    verified: false,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    handle: '@emilyrod',
    avatar: 'ER',
    bio: 'Product manager by day, UI enthusiast by night. Love creating delightful user experiences.',
    location: 'New York, NY',
    followers: 5600,
    following: 320,
    verified: true,
  },
];

// Sample link preview data
const LINKS = [
  {
    url: 'https://react.dev',
    title: 'React Documentation',
    description:
      'The library for web and native user interfaces. Build user interfaces out of individual pieces called components.',
    image: null,
    domain: 'react.dev',
  },
  {
    url: 'https://nextjs.org',
    title: 'Next.js by Vercel',
    description:
      "The React Framework for Production. Used by some of the world's largest companies.",
    image: null,
    domain: 'nextjs.org',
  },
];

// Sample package data
const PACKAGES = [
  {
    name: '@floating-ui/react',
    description: 'Primitives for positioning floating elements with React',
    version: '0.26.0',
    downloads: '2.1M',
    stars: 28500,
  },
  {
    name: 'framer-motion',
    description: 'Production-ready animation library for React',
    version: '11.0.0',
    downloads: '4.8M',
    stars: 21000,
  },
];

/**
 * User preview card content - Apple-like clean design
 */
function UserPreviewCard({ user }: { user: (typeof USERS)[0] }) {
  return (
    <div className="p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium text-sm">
          {user.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-900 dark:text-gray-100 truncate text-[15px]">
              {user.name}
            </span>
            {user.verified && (
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span className="text-[13px] text-gray-500 dark:text-gray-400">
            {user.handle}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
        {user.bio}
      </p>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400">
        <FiMapPin className="w-3.5 h-3.5" />
        <span>{user.location}</span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-[13px] pt-1">
        <div>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {user.followers.toLocaleString()}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">
            Followers
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {user.following.toLocaleString()}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">
            Following
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Link preview card content
 */
function LinkPreviewCard({ link }: { link: (typeof LINKS)[0] }) {
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <FiGlobe className="w-4 h-4" />
        <span>{link.domain}</span>
      </div>
      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
        {link.title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {link.description}
      </p>
    </div>
  );
}

/**
 * Package preview card content
 */
function PackagePreviewCard({ pkg }: { pkg: (typeof PACKAGES)[0] }) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 font-mono text-sm">
            {pkg.name}
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            v{pkg.version}
          </span>
        </div>
        <FiPackage className="w-5 h-5 text-gray-400" />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {pkg.description}
      </p>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <FiStar className="w-4 h-4" />
          <span>{(pkg.stars / 1000).toFixed(1)}k</span>
        </div>
        <div className="flex items-center gap-1">
          <FiUsers className="w-4 h-4" />
          <span>{pkg.downloads}/week</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Simulated async content loader
 */
function AsyncContent({ delay = 1000 }: { delay?: number }) {
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!loaded) {
    return null; // Suspense fallback will show
  }

  return (
    <div className="p-4 space-y-2">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
        Async Content Loaded
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        This content was loaded after {delay}ms delay, demonstrating lazy
        loading with Suspense.
      </p>
    </div>
  );
}

export default function HoverCardPlayground() {
  const [prefetchCount, setPrefetchCount] = useState(0);
  const [selectedPlacement, setSelectedPlacement] =
    useState<HoverCardPlacement>('top');
  const [selectedSize, setSelectedSize] = useState<HoverCardSize>('md');
  const [showArrow, setShowArrow] = useState(true);

  const placements: HoverCardPlacement[] = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end',
  ];

  const sizes: HoverCardSize[] = ['sm', 'md', 'lg', 'auto'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Header */}
        <HeadlineBlock
          headline="Hover Card"
          subheadline="Rich preview cards with hover intent detection, touch support, and lazy loading."
          size="medium"
        />

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Desktop
              </Text>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hover over trigger elements to show preview cards. Cursor speed
                is analyzed to detect intent.
              </p>
            </div>
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Touch Devices
              </Text>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tap to open the card, tap outside to close. Works seamlessly on
                mobile.
              </p>
            </div>
          </div>
        </div>

        {/* User Cards (Group Coordination) */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            User Preview Cards
          </Text>
          <Text color="secondary" className="text-sm">
            Hover over usernames. Cards in the same group coordinate - opening
            one closes others.
          </Text>
          <div className="flex flex-wrap gap-6 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            {USERS.map((user) => (
              <HoverCard
                key={user.id}
                content={<UserPreviewCard user={user} />}
                placement="bottom"
                groupId="users"
              >
                <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium">
                  {user.handle}
                </span>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* Link Previews */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Link Previews
          </Text>
          <Text color="secondary" className="text-sm">
            Rich previews for external links, similar to social media cards.
          </Text>
          <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Building modern web applications with{' '}
              <HoverCard
                content={<LinkPreviewCard link={LINKS[0]} />}
                placement="top"
              >
                <button
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  React <FiExternalLink className="w-3 h-3" />
                </button>
              </HoverCard>{' '}
              and{' '}
              <HoverCard
                content={<LinkPreviewCard link={LINKS[1]} />}
                placement="top"
              >
                <button
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  Next.js <FiExternalLink className="w-3 h-3" />
                </button>
              </HoverCard>{' '}
              has never been easier. These frameworks provide excellent
              developer experience.
            </p>
          </div>
        </div>

        {/* Package Cards */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            NPM Package Cards
          </Text>
          <Text color="secondary" className="text-sm">
            Inline package references with quick stats preview.
          </Text>
          <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-mono text-sm">
              import {'{'} useFloating {'}'} from{' '}
              <HoverCard
                content={<PackagePreviewCard pkg={PACKAGES[0]} />}
                placement="top"
                size="sm"
              >
                <code className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded cursor-pointer">
                  &quot;@floating-ui/react&quot;
                </code>
              </HoverCard>
              <br />
              import {'{'} motion {'}'} from{' '}
              <HoverCard
                content={<PackagePreviewCard pkg={PACKAGES[1]} />}
                placement="top"
                size="sm"
              >
                <code className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded cursor-pointer">
                  &quot;framer-motion&quot;
                </code>
              </HoverCard>
            </p>
          </div>
        </div>

        {/* Prefetch Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Prefetch on Hover Intent
          </Text>
          <Text color="secondary" className="text-sm">
            Data prefetching triggered before card shows. Count: {prefetchCount}
          </Text>
          <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <HoverCard
              content={
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Data was prefetched {prefetchCount > 0 ? 'before' : 'when'}{' '}
                    this card appeared!
                  </p>
                </div>
              }
              placement="right"
              onPrefetch={() => setPrefetchCount((c) => c + 1)}
              prefetchDelay={100}
            >
              <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                Hover here to trigger prefetch
              </span>
            </HoverCard>
          </div>
        </div>

        {/* Loading State */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Loading State
          </Text>
          <Text color="secondary" className="text-sm">
            Shows loading skeleton while async content loads.
          </Text>
          <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <HoverCard
              content={() => <AsyncContent delay={1500} />}
              placement="right"
            >
              <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                Hover for async content (1.5s delay)
              </span>
            </HoverCard>
          </div>
        </div>

        {/* Placement Playground */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Placement Options
          </Text>
          <div className="flex flex-wrap gap-2 mb-4">
            {placements.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlacement(p)}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  selectedPlacement === p
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center p-24 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <HoverCard
              content={
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Placement: {selectedPlacement}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    The card adjusts to fit in viewport
                  </p>
                </div>
              }
              placement={selectedPlacement}
              showArrow={showArrow}
              size={selectedSize}
            >
              <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium cursor-pointer">
                Hover Me
              </div>
            </HoverCard>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Size:
              </span>
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={cn(
                    'px-2 py-1 text-xs rounded transition-colors',
                    selectedSize === s
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showArrow}
                onChange={(e) => setShowArrow(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Show Arrow
              </span>
            </label>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Hover intent detection</p>
              <p>Touch support (tap to open)</p>
              <p>Smooth spring animations</p>
              <p>Keep open on content hover</p>
              <p>Lazy content loading</p>
              <p>Prefetch callback</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Configuration
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  placement
                </code>{' '}
                - 12 options
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  size
                </code>{' '}
                - sm | md | lg | auto
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  openDelay
                </code>{' '}
                - hover delay
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  groupId
                </code>{' '}
                - coordination
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Use Cases
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>User profile previews</p>
              <p>Link/URL previews</p>
              <p>Package info cards</p>
              <p>Image previews</p>
              <p>Tooltip alternatives</p>
              <p>Quick actions menu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
