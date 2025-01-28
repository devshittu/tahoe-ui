// // ProjectBoxes.tsx
// import React from 'react';
// import AvatarImage from '../Image/AvatarImage';

// type Project = {
//   date: string;
//   title: string;
//   subtitle: string;
//   progress: number;
//   color: string;
//   participants: string[];
//   daysLeft: number;
// };

// type ProjectBoxesProps = {
//   viewMode: 'grid' | 'list';
//   projects: Project[];
// };

// const ProjectBoxes = ({ viewMode, projects }: ProjectBoxesProps) => {
//   return (
//     <div className={`mx-[-8px] overflow-y-auto ${
//       viewMode === 'grid' ? 'flex flex-wrap' : 'block'
//     }`}>
//       {projects.map((project, index) => (
//         <div
//           key={index}
//           className={`p-2 transition-[0.2s] ${
//             viewMode === 'grid' ? 'w-full md:w-1/3' : 'w-full'
//           }`}
//         >
//           <div
//             className="rounded-[30px] p-4"
//             style={{ backgroundColor: project.color }}
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-[#4A4A4A] opacity-70 text-sm leading-4">
//                 {project.date}
//               </span>
//               <div className={`${viewMode === 'list' ? 'absolute right-4 top-4' : 'relative'}`}>
//                 <button className="p-0 h-6 w-6 relative bg-transparent border-none flex-shrink-0">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     className="text-current"
//                   >
//                     <circle cx="12" cy="12" r="1" />
//                     <circle cx="12" cy="5" r="1" />
//                     <circle cx="12" cy="19" r="1" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Content Header */}
//             <div className={`mb-4 ${
//               viewMode === 'list' ? 'order-1 max-w-[120px]' : 'text-center'
//             }`}>
//               <p className="text-base leading-6 font-bold opacity-70 truncate">
//                 {project.title}
//               </p>
//               <p className="text-sm leading-6 opacity-70">
//                 {project.subtitle}
//               </p>
//             </div>

//             {/* Progress */}
//             <div className={viewMode === 'list' ? 'order-3 flex-1' : ''}>
//               <p className="text-sm font-bold leading-4 mb-2">Progress</p>
//               <div className="h-1 rounded-[6px] bg-white overflow-hidden">
//                 <div
//                   className="h-1 rounded-[6px]"
//                   style={{
//                     width: `${project.progress}%`,
//                     backgroundColor: project.color
//                   }}
//                 />
//               </div>
//               <p className="text-sm font-bold leading-4 text-right mt-1">
//                 {project.progress}%
//               </p>
//             </div>

//             {/* Footer */}
//             <div className={`
//               flex justify-between pt-4 relative
//               ${viewMode === 'list' ? 'order-3 flex-col items-start' : ''}
//             `}>
//               <div className="flex items-center">
//                 {project.participants.map((participant, i) => (
//   <AvatarImage
//     key={i}
//     src={participant}
//     width={20}
//     height={20}
//     alt="participant"
//     className="w-5 h-5 rounded-full object-cover"
//     style={{ marginLeft: i > 0 ? '-8px' : 0 }}
//   />
//                 ))}
//                 <button
//                   className="w-5 h-5 rounded-full border-none bg-white/60 ml-1.5 flex items-center justify-center p-0"
//                   style={{ color: project.color }}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="12"
//                     height="12"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="3"
//                   >
//                     <path d="M12 5v14M5 12h14" />
//                   </svg>
//                 </button>
//               </div>
//               <div
//                 className="bg-white/60 text-xs rounded-[20px] py-1.5 px-4 font-bold"
//                 style={{ color: project.color }}
//               >
//                 {project.daysLeft} Days Left
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProjectBoxes;

// ProjectBoxes.tsx
import React from 'react';
import AvatarImage from '../Image/AvatarImage';

type Project = {
  date: string;
  title: string;
  subtitle: string;
  progress: number;
  color: string;
  participants: string[];
  daysLeft: number;
};

type ProjectBoxesProps = {
  viewMode: 'grid' | 'list';
  projects: Project[];
};

const ProjectBoxes = ({ viewMode, projects }: ProjectBoxesProps) => {
  return (
    <div
      className={`mx-[-8px] overflow-y-auto font-dm-sans ${
        viewMode === 'grid' ? 'flex flex-wrap' : 'block'
      }`}
    >
      {projects.map((project, index) => (
        <div
          key={index}
          className={`p-2 transition-[0.2s] ${
            viewMode === 'grid' ? 'w-full md:w-1/3' : 'w-full'
          }`}
        >
          <div
            className="rounded-[30px] p-4"
            style={{ backgroundColor: project.color }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-secondary opacity-70 text-sm leading-4">
                {project.date}
              </span>
              <div
                className={`${viewMode === 'list' ? 'absolute right-4 top-4' : 'relative'}`}
              >
                <button className="p-0 h-6 w-6 relative bg-transparent border-none flex-shrink-0 text-main">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content Header */}
            <div
              className={`mb-4 ${
                viewMode === 'list' ? 'order-1 max-w-[120px]' : 'text-center'
              }`}
            >
              <p className="text-main font-bold opacity-70 truncate text-base leading-6">
                {project.title}
              </p>
              <p className="text-secondary opacity-70 text-sm leading-6">
                {project.subtitle}
              </p>
            </div>

            {/* Progress */}
            <div className={viewMode === 'list' ? 'order-3 flex-1' : ''}>
              <p className="text-main font-bold text-sm leading-4 mb-2">
                Progress
              </p>
              <div className="h-1 rounded-[6px] bg-white overflow-hidden">
                <div
                  className="h-1 rounded-[6px]"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor: project.color,
                  }}
                />
              </div>
              <p className="text-main font-bold text-sm leading-4 text-right mt-1">
                {project.progress}%
              </p>
            </div>

            {/* Footer */}
            <div
              className={`
              flex justify-between pt-4 relative
              ${viewMode === 'list' ? 'order-3 flex-col items-start' : ''}
            `}
            >
              <div className="flex items-center -space-x-2">
                {project.participants.map((participant, i) => (
                  //   <img
                  //     key={i}
                  //     src={participant}
                  //     alt="participant"
                  //     className="w-5 h-5 rounded-full object-cover border-2 border-white"
                  //   />
                  <AvatarImage
                    key={i}
                    src={participant}
                    width={20}
                    height={20}
                    alt="participant"
                    className="w-5 h-5 rounded-full object-cover border-2 border-white"
                    style={{ marginLeft: i > 0 ? '-8px' : 0 }}
                  />
                ))}
                <button
                  className="w-5 h-5 rounded-full border-none bg-white/60 ml-3 flex items-center justify-center p-0 text-main"
                  style={{ color: project.color }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              <div
                className="bg-white/60 text-xs rounded-[20px] py-1.5 px-4 font-bold mt-2"
                style={{
                  color: `color-mix(in srgb, ${project.color} 30%, #1f1c2e)`,
                  backgroundColor: `color-mix(in srgb, ${project.color} 20%, white)`,
                }}
              >
                {project.daysLeft} Days Left
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectBoxes;
