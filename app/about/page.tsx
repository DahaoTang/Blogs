import Headbar from "../components/headbar";

export default function About() {
  return (
    <div>
      <Headbar />
      <div>
        This is{" "}
        <a className="text-blue-600" href="https://dahaotang.com/">
          Dahao
        </a>
        &apos;s personal blog website. Started April 2025.
      </div>
    </div>
  );
}
