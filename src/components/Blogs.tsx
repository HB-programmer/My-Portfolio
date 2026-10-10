import type { CSSProperties } from "react";
import { blogs, links } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Blogs() {
  return (
    <section className="blogs section-pad" id="blogs">
      <SectionHeading eyebrow="Ride Logs" title="Notes From The Road" />
      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <a
            className="blog-card"
            key={blog.url}
            href={blog.url}
            target="_blank"
            rel="noreferrer"
            data-reveal
            style={{ "--i": index } as CSSProperties}
          >
            <span className="blog-index mono">LOG {String(index + 1).padStart(2, "0")}</span>
            <h3>{blog.title}</h3>
            <p>{blog.summary}</p>
            <div className="tech-row">
              {blog.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="blog-cta mono">Read on Medium →</span>
          </a>
        ))}
      </div>
      <a className="secondary-action blog-all" href={links.medium} target="_blank" rel="noreferrer">
        All posts on Medium
      </a>
    </section>
  );
}
