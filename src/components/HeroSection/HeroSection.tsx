// File: components/HeroSection/HeroSection.tsx
import { cn } from '@/lib/utils';

/**
 * HeroSection Component
 * Displays the main title, description, and key features of the project.
 * Designed to be visually appealing and central to the landing page.
 */
export default function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 pt-16 pb-8">
      <h1
        className={cn(
          'text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight',
          'bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-400',
          'bg-clip-text text-transparent',
          'leading-tight mb-6',
        )}
      >
        Crafting Digital Experiences
      </h1>
      <p className="max-w-3xl text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
        Unlock the art and science of interface development. This isn’t just
        about pushing pixels or following documentation — it’s about mastering
        the tools, understanding the nuances, and shaping experiences with
        intention. Dive deep into modern web technologies and design principles
        to build truly exceptional user interfaces.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="mr-2 text-blue-500">✨</span> Intuitive Design
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Learn to create interfaces that feel natural and effortless for
            users, reducing cognitive load and enhancing usability.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="mr-2 text-green-500">🚀</span> Performance First
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Optimize your applications for speed and responsiveness, ensuring a
            smooth experience even on less powerful devices.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="mr-2 text-purple-500">🎨</span> Visual Fidelity
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Master the art of visual polish, from subtle animations to
            pixel-perfect layouts, making your UIs truly stand out.
          </p>
        </div>
      </div>
    </section>
  );
}
