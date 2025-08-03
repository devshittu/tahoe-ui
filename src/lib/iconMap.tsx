// lib/iconMap.tsx
// This file maps string identifiers to React Icon components.
// It is a .tsx file because it contains JSX for the icon components.

import {
  FiTool,
  FiFilm,
  FiFilter,
  FiMousePointer,
  FiPenTool,
  FiLayout,
  FiClock,
  FiFacebook,
  FiShoppingBag,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiWatch,
  FiEye,
  FiHeadphones,
  FiTv,
  FiHome,
  FiSearch,
  FiMenu,
  FiX,
  FiGithub,
  FiChevronLeft,
  FiChevronRight,
  // New icons for FloatingNav
  FiSun, // For 'Current' weather
  FiCalendar, // For 'Hourly' and 'Monthly' weather
  FiInfo, // For 'Details'
  FiMap, // For 'Maps'
  FiTrendingUp, // For 'Trends'
  FiBookOpen, // For 'News'
  FiArrowUp, // For 'Back to top'
  FiRefreshCw, // For 'Refresh'
  FiMinimize, // For 'Minimize'
  FiMaximize, // For 'Maximize'
} from 'react-icons/fi';
import { IconType } from 'react-icons';

// Define a type for the icon map
type IconMap = {
  [key: string]: IconType;
};

/**
 * A map of string identifiers to React Icon components from 'react-icons/fi' and 'react-icons/lu'.
 * This centralizes icon definitions and allows data files to refer to icons by string,
 * separating data from presentation logic.
 */
export const iconMap: IconMap = {
  // Existing Craft UI Card Icons
  FiTool: FiTool,
  FiFilm: FiFilm,
  FiFilter: FiFilter,
  FiMousePointer: FiMousePointer,
  FiPenTool: FiPenTool,
  FiLayout: FiLayout,
  FiClock: FiClock,

  // Existing Global Navigation Icons
  FiFacebook: FiFacebook,
  FiGithub: FiGithub,
  FiShoppingBag: FiShoppingBag,
  FiSearch: FiSearch,
  FiMenu: FiMenu,
  FiX: FiX,
  FiChevronLeft: FiChevronLeft,
  FiChevronRight: FiChevronRight,
  FiMonitor: FiMonitor,
  FiTablet: FiTablet,
  FiSmartphone: FiSmartphone,
  FiWatch: FiWatch,
  FiEye: FiEye,
  FiHeadphones: FiHeadphones,
  FiTv: FiTv,
  FiHome: FiHome,

  // New icons for FloatingNav
  FiSun: FiSun,
  FiCalendar: FiCalendar,
  FiInfo: FiInfo,
  FiMap: FiMap,
  FiTrendingUp: FiTrendingUp,
  FiBookOpen: FiBookOpen,
  FiArrowUp: FiArrowUp,
  FiRefreshCw: FiRefreshCw,
  FiMaximize: FiMaximize,
  FiMinimize: FiMinimize,
};

// File: lib/iconMap.tsx
