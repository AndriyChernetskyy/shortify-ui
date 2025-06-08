const Footer = () => {
  return (
    <>
      <footer
        className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10"
        data-theme="dark"
      >
        <aside>
          <img
            src="/shortify.svg"
            alt="Shortify Logo"
            width={50}
            height={50}
            className="fill-current"
          />
          <p>
            Shortify Ltd.
            <br />
            Shortening super long urls since 2025
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
