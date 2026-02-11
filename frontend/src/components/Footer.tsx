export default function Footer({ authors }: { authors: string[] }) {
  return (
    <footer className="footer">
      <small>Készítők: {authors.join(" & ")}</small>
    </footer>
  );
}
