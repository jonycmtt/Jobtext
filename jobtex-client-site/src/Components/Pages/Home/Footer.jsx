import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-[#123841] text-white">
      <aside>
        <Link to="/">
          <img
            className="w-40"
            src="https://i.ibb.co/7NK8Pbp/download-1.png"
            alt=""
          />
        </Link>
        <p>Find the right career opportunity for you</p>
        <aside>
          <p>Copyright © 2023 - All right reserved by JobTex Industries Ltd</p>
        </aside>
      </aside>
      <nav>
        <header className="footer-title">Jobs</header>
        <a className="link link-hover">Web Development</a>
        <a className="link link-hover">Digital Marketing</a>
        <a className="link link-hover">Graphics Design</a>
        <a className="link link-hover">Software Development</a>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <a className="link link-hover">Panadoxn</a>
        <a className="link link-hover">Shangxi</a>
        <a className="link link-hover">LH.Tech</a>
        <a className="link link-hover">Vanfada</a>
      </nav>
      <nav>
        <header className="footer-title">Contact</header>
        <a href="https://facebook.com/jonycmt" className="link link-hover">
          Facebook
        </a>
        <a href="https://youtube.com/jonycmt" className="link link-hover">
          Youtube
        </a>
        <a
          href="https://www.linkedin.com/in/salman-rahaman/"
          className="link link-hover"
        >
          Linkedin
        </a>
        <div className="form-control text-black">
          <label className="input-group input-group-vertical">
            <input
              type="text"
              placeholder="Contact Now"
              className="input input-bordered"
            />
          </label>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
