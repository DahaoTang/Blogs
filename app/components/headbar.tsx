export default function Headbar() {
  return (
    <div>
      <div className="text-xl font-bold">Dahao&apos;s Blog</div>
      <div className="py-5 not-first-of-type:text-blue-600">
        <a className="pr-3" href="/about">
          About
        </a>
        <a className="" href="/">
          Blog
        </a>
      </div>
    </div>
  );
}
