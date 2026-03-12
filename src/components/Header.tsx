import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-[url(/header.jpg)] h-40 bg-cover">
      <div className="pt-5">
        <hr className="w-60" />
      </div>
      <div className="ml-10 w-20">
        <h2 className="">Next Commerce</h2>
      </div>
      <div className="w-80">
        <hr />
        <p>
          Add here any awards or things you want to highlight. Could also be a
          brief summary about the project you worked on.
        </p>
      </div>
    </header>
  );
}
