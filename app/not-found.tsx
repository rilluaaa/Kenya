import Link from "next/link";

export default function NotFound() {
  return <section className="page-wrap page-section"><div className="empty-state"><h1 className="section-heading">This page could not be found</h1><p className="lede">The link may be old or the learning activity may not be available yet.</p><Link href="/" className="btn btn-primary">Return home</Link></div></section>;
}
