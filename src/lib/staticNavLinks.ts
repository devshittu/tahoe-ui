// File: lib/staticNavLinks.ts
// IMPORTANT: This file is now .ts and contains only data.
// Icon references are strings, which will be mapped to React components in .tsx files.

// Define the structure for a submenu item
interface SubMenuItem {
  label: string;
  href: string;
}

// Define the structure for a submenu group (e.g., "Shop Mac", "Explore Mac")
interface SubMenuColumn {
  header: string;
  items: SubMenuItem[];
  elevated?: boolean; // For larger, more prominent links
}

// Define the structure for a top-level navigation link with a potential flyout
export interface NavLink {
  id: string;
  label: string;
  href: string;
  icon?: string; // Changed to string identifier for icon
  flyoutContent?: SubMenuColumn[]; // For mega menu content
}

// Static navigation links data
export const staticNavLinks: NavLink[] = [
  { id: 'apple-logo', label: 'Apple', href: '/', icon: 'FiFacebook' },
  {
    id: 'docs',
    label: 'Docs',
    href: '/docs',
    flyoutContent: [
      {
        header: 'Components',
        elevated: true,
        items: [
          { label: 'Pagemode', href: '/playground/pagemode' },
          { label: 'Box', href: '/playground/box' },
          { label: 'Typography', href: '/playground/typo' },
          { label: 'Music Player Demo', href: '/demo' },
          { label: 'Storybook', href: '/storybook' },
          { label: 'Navigation', href: '/playground/navigation' },
          { label: 'Frame', href: '/playground/frame' },
        ],
      },
      {
        header: 'Quick Links',
        items: [
          { label: 'link 1', href: '/others' },
          // { label: 'Order Status', href: '/orders' },
          // { label: 'Apple Trade In', href: '/trade-in' },
          // { label: 'Financing', href: '/financing' },
          // { label: 'Personal Setup', href: '/setup' },
          // { label: 'University Student Offer', href: '/edu' },
        ],
      },
      // {
      //   header: 'Shop Special Stores',
      //   items: [
      //     { label: 'Certified Refurbished', href: '/refurbished' },
      //     { label: 'Education', href: '/education' },
      //     { label: 'Business', href: '/business' },
      //   ],
      // },
    ],
  },
  // {
  //   id: 'store',
  //   label: 'Store',
  //   href: '/store',
  //   flyoutContent: [
  //     {
  //       header: 'Shop',
  //       elevated: true,
  //       items: [
  //         { label: 'Shop the Latest', href: '/store' },
  //         { label: 'Mac', href: '/store/mac' },
  //         { label: 'iPad', href: '/store/ipad' },
  //         { label: 'iPhone', href: '/store/iphone' },
  //         { label: 'Apple Watch', href: '/store/watch' },
  //         { label: 'Apple Vision Pro', href: '/store/vision' },
  //         { label: 'Accessories', href: '/store/accessories' },
  //       ],
  //     },
  //     {
  //       header: 'Quick Links',
  //       items: [
  //         { label: 'Find a Store', href: '/retail' },
  //         { label: 'Order Status', href: '/orders' },
  //         { label: 'Apple Trade In', href: '/trade-in' },
  //         { label: 'Financing', href: '/financing' },
  //         { label: 'Personal Setup', href: '/setup' },
  //         { label: 'University Student Offer', href: '/edu' },
  //       ],
  //     },
  //     {
  //       header: 'Shop Special Stores',
  //       items: [
  //         { label: 'Certified Refurbished', href: '/refurbished' },
  //         { label: 'Education', href: '/education' },
  //         { label: 'Business', href: '/business' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'mac',
  //   label: 'Mac',
  //   href: '/mac',
  //   flyoutContent: [
  //     {
  //       header: 'Explore Mac',
  //       elevated: true,
  //       items: [
  //         { label: 'Explore All Mac', href: '/mac' },
  //         { label: 'MacBook Air', href: '/macbook-air' },
  //         { label: 'MacBook Pro', href: '/macbook-pro' },
  //         { label: 'iMac', href: '/imac' },
  //         { label: 'Mac mini', href: '/mac-mini' },
  //         { label: 'Mac Studio', href: '/mac-studio' },
  //         { label: 'Mac Pro', href: '/mac-pro' },
  //         { label: 'Displays', href: '/displays' },
  //         { label: 'Compare Mac', href: '/mac/compare' },
  //         { label: 'Switch from PC to Mac', href: '/mac/switch' },
  //       ],
  //     },
  //     {
  //       header: 'Shop Mac',
  //       items: [
  //         { label: 'Shop Mac', href: '/shop/mac' },
  //         { label: 'Mac Accessories', href: '/shop/mac/accessories' },
  //         { label: 'Apple Trade In', href: '/trade-in' },
  //         { label: 'Financing', href: '/financing' },
  //         { label: 'University Student Offer', href: '/edu' },
  //       ],
  //     },
  //     {
  //       header: 'More from Mac',
  //       items: [
  //         { label: 'Mac Support', href: 'https://support.apple.com/mac' },
  //         { label: 'AppleCare+ for Mac', href: '/support/mac' },
  //         { label: 'macOS Tahoe 26 Preview', href: '/os/macos' },
  //         { label: 'Apple Intelligence', href: '/apple-intelligence' },
  //         { label: 'Apps by Apple', href: '/apps' },
  //         { label: 'Continuity', href: '/macos/continuity' },
  //         { label: 'iCloud+', href: '/icloud' },
  //         { label: 'Mac for Business', href: '/business/mac' },
  //         { label: 'Education', href: '/education' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'ipad',
  //   label: 'iPad',
  //   href: '/ipad',
  //   flyoutContent: [
  //     {
  //       header: 'Explore iPad',
  //       elevated: true,
  //       items: [
  //         { label: 'Explore All iPad', href: '/ipad' },
  //         { label: 'iPad Pro', href: '/ipad-pro' },
  //         { label: 'iPad Air', href: '/ipad-air' },
  //         { label: 'iPad', href: '/ipad-11' },
  //         { label: 'iPad mini', href: '/ipad-mini' },
  //         { label: 'Apple Pencil', href: '/apple-pencil' },
  //         { label: 'Keyboards', href: '/ipad-keyboards' },
  //         { label: 'Compare iPad', href: '/ipad/compare' },
  //         { label: 'Why iPad', href: '/ipad/why-ipad' },
  //       ],
  //     },
  //     {
  //       header: 'Shop iPad',
  //       items: [
  //         { label: 'Shop iPad', href: '/shop/ipad' },
  //         { label: 'iPad Accessories', href: '/shop/ipad/accessories' },
  //         { label: 'Apple Trade In', href: '/trade-in' },
  //         { label: 'Financing', href: '/financing' },
  //         { label: 'University Student Offer', href: '/edu' },
  //       ],
  //     },
  //     {
  //       header: 'More from iPad',
  //       items: [
  //         { label: 'iPad Support', href: 'https://support.apple.com/ipad' },
  //         { label: 'AppleCare+ for iPad', href: '/support/ipad' },
  //         { label: 'iPadOS 26 Preview', href: '/os/ipados' },
  //         { label: 'Apple Intelligence', href: '/apple-intelligence' },
  //         { label: 'Designed for Families', href: '/designed-for-families' },
  //         { label: 'Apps by Apple', href: '/apps' },
  //         { label: 'iCloud+', href: '/icloud' },
  //         { label: 'Education', href: '/education' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'iphone',
  //   label: 'iPhone',
  //   href: '/iphone',
  //   flyoutContent: [
  //     {
  //       header: 'Explore iPhone',
  //       elevated: true,
  //       items: [
  //         { label: 'Explore All iPhone', href: '/iphone' },
  //         { label: 'iPhone 16 Pro', href: '/iphone-16-pro' },
  //         { label: 'iPhone 16', href: '/iphone-16' },
  //         { label: 'iPhone 16e', href: '/iphone-16e' },
  //         { label: 'iPhone 15', href: '/shop/iphone/iphone_15' },
  //         { label: 'Compare iPhone', href: '/iphone/compare' },
  //         { label: 'Switch from Android', href: '/iphone/switch' },
  //       ],
  //     },
  //     {
  //       header: 'Shop iPhone',
  //       items: [
  //         { label: 'Shop iPhone', href: '/shop/iphone' },
  //         { label: 'iPhone Accessories', href: '/shop/iphone/accessories' },
  //         { label: 'Apple Trade In', href: '/trade-in' },
  //         { label: 'Financing', href: '/financing' },
  //       ],
  //     },
  //     {
  //       header: 'More from iPhone',
  //       items: [
  //         { label: 'iPhone Support', href: 'https://support.apple.com/iphone' },
  //         { label: 'AppleCare+ for iPhone', href: '/support/iphone' },
  //         { label: 'iOS 26 Preview', href: '/os/ios' },
  //         { label: 'Apple Intelligence', href: '/apple-intelligence' },
  //         { label: 'Designed for Families', href: '/designed-for-families' },
  //         { label: 'Apps by Apple', href: '/apps' },
  //         { label: 'iPhone Privacy', href: '/privacy' },
  //         { label: 'iCloud+', href: '/icloud' },
  //         { label: 'Wallet, Pay', href: '/wallet' },
  //         { label: 'Siri', href: '/siri' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'watch',
  //   label: 'Watch',
  //   href: '/watch',
  //   flyoutContent: [
  //     {
  //       header: 'Explore Watch',
  //       elevated: true,
  //       items: [
  //         { label: 'Explore All Apple Watch', href: '/watch' },
  //         { label: 'Apple Watch Series 10', href: '/apple-watch-series-10' },
  //         { label: 'Apple Watch Ultra 2', href: '/apple-watch-ultra-2' },
  //         { label: 'Apple Watch SE', href: '/apple-watch-se' },
  //         { label: 'Apple Watch Nike', href: '/apple-watch-nike' },
  //         { label: 'Apple Watch Hermès', href: '/apple-watch-hermes' },
  //         { label: 'Compare Watch', href: '/watch/compare' },
  //         { label: 'Why Apple Watch', href: '/watch/why-apple-watch' },
  //       ],
  //     },
  //     {
  //       header: 'Shop Watch',
  //       items: [
  //         { label: 'Shop Apple Watch', href: '/shop/watch' },
  //         { label: 'Apple Watch Studio', href: '/shop/studio/apple_watch' },
  //         { label: 'Apple Watch Straps', href: '/shop/watch/bands' },
  //         { label: 'Apple Watch Accessories', href: '/shop/watch/accessories' },
  //         { label: 'Apple Trade In', href: '/trade-in' },
  //         { label: 'Financing', href: '/financing' },
  //       ],
  //     },
  //     {
  //       header: 'More from Watch',
  //       items: [
  //         { label: 'Apple Watch Support', href: 'https://support.apple.com/watch' },
  //         { label: 'AppleCare+', href: '/support/watch' },
  //         { label: 'watchOS 26 Preview', href: '/os/watchos' },
  //         { label: 'Apps by Apple', href: '/apps' },
  //         { label: 'Apple Fitness+', href: '/apple-fitness-plus' },
  //       ],
  //     },
  //   ],
  // },
  // { id: 'vision', label: 'Vision', href: '/vision' },
  // { id: 'airpods', label: 'AirPods', href: '/airpods' },
  // { id: 'tv-home', label: 'TV & Home', href: '/tv-home' },
  // { id: 'entertainment', label: 'Entertainment', href: '/entertainment' },
  // { id: 'accessories', label: 'Accessories', href: '/accessories' },
  { id: 'support', label: 'Support', href: '/support' },

  { id: 'search', label: 'Search', href: '#', icon: 'FiSearch' },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/devshittu/tahoe-ui',
    icon: 'FiGithub',
  },
];

// Re-export card items with updated icons
export const cardItems = [
  {
    id: 'the-craft',
    title: 'The Craft',
    description:
      'Gain the confidence to build anything you envision, transforming motion, interaction, and design principles into second nature.',
    imageSrc: 'https://picsum.photos/720/720?random=12',
    link: '#',
    iconComponent: 'FiTool', // Changed to string
  },
  {
    id: 'css-animation',
    title: 'CSS Animation',
    description:
      'Master CSS animations from your very first set of @keyframes right through to things no one else ever teaches you.',
    imageSrc: 'https://picsum.photos/720/720?random=17',
    link: '#',
    iconComponent: 'FiFilm', // Changed to string
  },
  {
    id: 'svg-filters',
    title: 'SVG Filters',
    description:
      'Shaders on a budget. Learn how to use noise to your advantage whilst making flames and stickers.',
    imageSrc: 'https://picsum.photos/720/720?random=19',
    link: '#',
    iconComponent: 'FiFilter', // Changed to string
  },
  {
    id: 'scroll-animation',
    title: 'Scroll Animation',
    description:
      'Take your users on a journey with the joy of tasteful scroll animation. You might not even need JavaScript.',
    imageSrc: 'https://picsum.photos/720/720?random=42',
    link: '#',
    iconComponent: 'FiMousePointer', // Changed to string
  },
  {
    id: 'taming-canvas',
    title: 'Taming Canvas',
    description:
      "Grasp how to tame the pixel playground and when to do so. Whilst building with 'Performance Driven Development'.",
    imageSrc: 'https://picsum.photos/720/720?random=128',
    link: '#',
    iconComponent: 'FiPenTool', // Changed to string
  },
  {
    id: 'layout-tricks',
    title: 'Layout Tricks',
    description:
      'Do you really need a library for that? Sometimes stepping back and rethinking the problem yields a nifty solution.',
    imageSrc: 'https://picsum.photos/720/720?random=56',
    link: '#',
    iconComponent: 'FiLayout', // Changed to string
  },
  {
    id: 'mastering-time',
    title: 'Mastering Time',
    description:
      "It's not all just easings and compositions. Time plays a crucial part in various UI patterns that might not seem obvious at first.",
    imageSrc: 'https://picsum.photos/720/720?random=39',
    link: '#',
    iconComponent: 'FiClock', // Changed to string
  },
];
