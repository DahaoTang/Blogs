import Headbar from "../components/headbar";

export default function About() {
  return (
    <div>
      <div className="text-xl font-bold">Dahao&apos;s Blog</div>
      <div className="pt-5 pb-5">
        <Headbar />
      </div>
      This is <a className="text-blue-600" href="https://dahaotang.com/">Dahao</a>&apos;s personal blog website. Started April 2025.
    </div>
  );
}
