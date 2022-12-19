import Link from 'next/link';
import React from 'react';

const ProjectGrid = ({ softwareProjects }) => {
  return (
    <>
      <section className="softwareproject_display">
        {softwareProjects.map((project) => (
          <article key={project.title} className="softwareproject_display_card">
            <div className="softwareproject_display_imagecontainer">
              <img
                src={project.image}
                className="softwareproject_display_image"
              />
            </div>
            <div className="softwareproject_display_description">
              <h3 className="softwareproject_display_title">
                {project.title} {project.emoji}
              </h3>
              <p>
                <Link href={project.articleLink}>Article</Link> |{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.liveLink}
                >
                  Live Link
                </a>{' '}
                |{' '}
                <Link href={project.githubLink}>
                  <a target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </Link>
              </p>

              <p className="softwareproject_display_stacklist">
                {project.stack.join(' | ')}
              </p>

              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default ProjectGrid;
