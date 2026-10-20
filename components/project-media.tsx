import Image from "next/image";

export type ProjectMediaContent = {
  image: string;
  video: string;
  captions: string;
  title: string;
  description: string;
  seconds: number;
};

export function ProjectMedia({ media, projectTitle }: { media: ProjectMediaContent; projectTitle: string }) {
  return (
    <div className="project-media">
      <figure>
        <div className="project-media-image">
          <Image
            src={media.image}
            alt={`${projectTitle}: ${media.title.toLowerCase()}, with private information obscured`}
            width={1280}
            height={720}
            sizes="(max-width: 700px) calc(100vw - 76px), (max-width: 1000px) calc(100vw - 110px), 1132px"
          />
        </div>
        <figcaption>
          <h4>{media.title}</h4>
          <p>{media.description}</p>
          <p className="project-media-note">Recorded application · Edited for privacy · No audio</p>
          <a className="text-link" href={media.image} target="_blank" rel="noopener noreferrer">
            View full-size screenshot <span aria-hidden="true">↗</span>
          </a>
        </figcaption>
      </figure>
      <details className="project-video">
        <summary>Watch {media.seconds}-second excerpt <span aria-hidden="true">↗</span></summary>
        <video
          controls
          playsInline
          preload="none"
          poster={media.image}
          width={1280}
          height={720}
          aria-label={`${projectTitle} workflow excerpt`}
        >
          <source src={media.video} type="video/mp4" />
          <track kind="captions" src={media.captions} srcLang="en" label="English" default />
          Your browser does not support embedded video. {media.description}
        </video>
      </details>
    </div>
  );
}
