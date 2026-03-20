import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className="mainContainerHeader">
        <div className="containerLogo">
          {/* comentarios <hr className="first-line" /> */}
          <div className="logoImage">
            <img src="/Nextcom.png" alt="" />
          </div>
        </div>
        <div className="descriptionHeaderBox">
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
