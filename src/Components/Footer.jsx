import { social } from "./data";

function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Brand Info */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-blue-500">My Project</h2>
          <p className="mt-2 text-gray-300">
            Transforming ideas into reality with cutting-edge solutions.
          </p>
        </div>
        <ul className="flex gap-4">
          {social.map(({ id, url, icon }) => (
            <li key={id}>
              <a
                href={url}
                className="text-primary-500 transition-colors hover:text-blue-400 text-2xl">
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 text-center text-gray-400">
        &copy; {new Date().getFullYear()} My Project. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;