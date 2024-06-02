type Props = {};

export default function Footer({}: Props) {
  return (
    <footer>
      <small>
        <p>
          &copy; Copyright by{" "}
          <a href="https://manishsaraan.com">Manish Saraan</a>
        </p>
        <p className="u-bold u-italic">All rights reserved</p>
      </small>
    </footer>
  );
}
