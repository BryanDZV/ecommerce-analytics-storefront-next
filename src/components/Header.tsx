import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className="main-container-header">
        <div className="container-logo">
          {/* <hr className="first-line" /> */}
          <div className="logo-image">
            <img src="/Nextcom.png" alt="Nextcom" />
          </div>
        </div>
        <div className="description-box">
          <hr />
          <p>
            Add here any awards or things you want to highlight. Could also be a
            brief summary about the project you worked on.
          </p>
        </div>
      </div>
    </header>
  );
}
