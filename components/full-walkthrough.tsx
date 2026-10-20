"use client";

import Image from "next/image";
import { Arrow, Play } from "@/components/ui";
import { assetPath } from "@/lib/asset-path";
import { useRef, useState } from "react";

export function FullWalkthrough() {
  const video = useRef<HTMLVideoElement>(null);
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <section className="walkthrough" aria-labelledby="walkthrough-title">
      <div className="walkthrough-intro">
        <p className="eyebrow">A closer look</p>
        <h3 id="walkthrough-title">See the projects in action</h3>
        <p id="walkthrough-description">
          A complete walkthrough of E-Bidding and Shipment Tracking: what the
          systems do, my contribution, and what I learned along the way.
        </p>
        <p className="walkthrough-note">Captioned · No audio · Full walkthrough</p>
        <p className="walkthrough-note">Demonstration using fictional test data.</p>
      </div>
      <details
        className="walkthrough-player"
        onToggle={(event) => {
          if (event.currentTarget.open) setHasOpened(true);
          else video.current?.pause();
        }}
      >
        <summary>
          <span className="walkthrough-thumbnail">
            <Image
              src={assetPath("/media/walkthrough-poster.jpg")}
              alt=""
              width={1280}
              height={720}
              sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 64px), 1200px"
            />
            <span className="walkthrough-play" aria-hidden="true"><Play /></span>
          </span>
          <span className="walkthrough-toggle">
            <span className="walkthrough-closed-label">Watch the full walkthrough · 4 min 58 sec</span>
            <span className="walkthrough-open-label">Close the walkthrough</span>
            <Arrow diagonal />
          </span>
        </summary>
        {hasOpened && (
          <div className="walkthrough-video">
            <video
              ref={video}
              controls
              playsInline
              preload="none"
              poster={assetPath("/media/walkthrough-poster.jpg")}
              width={1280}
              height={720}
              aria-label="Complete E-Bidding and Shipment Tracking walkthrough"
              aria-describedby="walkthrough-description walkthrough-chapters"
            >
              <source src={assetPath("/media/full-walkthrough.mp4")} type="video/mp4" />
              <track kind="chapters" src={assetPath("/media/walkthrough-chapters.vtt")} srcLang="en" label="Chapters" />
              Your browser does not support embedded video. You can download the
              <a href={assetPath("/media/full-walkthrough.mp4")}> full walkthrough</a>.
            </video>
            <p className="walkthrough-note">English captions are included in the video.</p>
          </div>
        )}
      </details>
      <ol className="walkthrough-chapters" id="walkthrough-chapters" aria-label="Walkthrough chapters">
        <li><span>0:00</span> Introduction</li>
        <li><span>0:16</span> E-Bidding</li>
        <li><span>2:40</span> What I learned</li>
        <li><span>2:58</span> Shipment Tracking</li>
      </ol>
    </section>
  );
}
