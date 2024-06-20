import GitHub from "../../public/github.svg";

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-100 mt-auto">
      <footer className="container">
        <div className=" flex flex-row justify-between py-3 text-sm">
          <div className="inline-flex items-center hover:underline underline-offset-2">
            <img
              src={GitHub}
              alt="React Logo"
              width={20}
              className="mr-1.5 py-2 mx-2"
            />
            <a href="https://github.com/AnuragVikramSingh/serverless-llm-chat">
              Source code on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
