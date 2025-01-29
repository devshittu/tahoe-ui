// src/components/ProjectBoxes.tsx

// 'use client';

// import React from 'react';
// import { FC } from 'react';
// import { Project } from './types';
// import ProjectBox from './ProjectBox';

// type ViewMode = 'grid' | 'list';

// type ProjectBoxesProps = {
//   projects: Project[];
//   viewMode: ViewMode;
// };

// const OAProjectBoxes: FC<ProjectBoxesProps> = ({ projects, viewMode }) => {
//   return (
//     <div
//       className={`project-boxes ${
//         viewMode === 'grid' ? 'flex flex-wrap -mx-2' : ''
//       } overflow-y-auto`}
//     >
//       {projects.map((project) => (
//         <div
//           key={project.id}
//           className={`project-box-wrapper ${
//             viewMode === 'list' ? 'w-full' : 'w-1/3'
//           } p-2`}
//         >
//           <ProjectBox project={project} viewMode={viewMode} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OAProjectBoxes;

// src/components/OAProjectBoxes.tsx

'use client';

import React from 'react';
import { FC } from 'react';
import { Project } from './types';
import ProjectBox from './ProjectBox';

type ViewMode = 'grid' | 'list';

type ProjectBoxesProps = {
  projects: Project[];
  viewMode: ViewMode;
};

const ProjectBoxes: FC<ProjectBoxesProps> = ({ projects, viewMode }) => {
  return (
    <div
      className={`project-boxes ${
        viewMode === 'grid' ? 'flex flex-wrap -mx-2' : 'block'
      } overflow-y-auto h-full`}
    >
      {projects.map((project) => (
        <div
          key={project.id}
          className={`project-box-wrapper ${
            viewMode === 'list' ? 'w-full' : 'w-full lg:w-1/3 md:w-1/2'
          } p-2`}
        >
          <ProjectBox project={project} viewMode={viewMode} />
        </div>
      ))}
    </div>
  );
};

export default ProjectBoxes;
