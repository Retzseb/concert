import { Search } from "../components/Search";
import { Concerts } from "../components/Concert";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ConcertCard } from "../components/ConcertCard";

export function Home() {
  return (
    <>
      <Search />
      <Concerts>
        {({ concerts, loading, error }) => (
          <section className="section">
            <div className="container">
              <div className="sectionHead">
                <h2>Koncertek</h2>
              </div>

              {loading && <p>Betöltés…</p>}
              {error && <p>{error}</p>}

              {!loading && !error && (
                <div className="grid">
                  {concerts.map((c) => (
                    <ConcertCard key={c.id} concert={c} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </Concerts>
      <Footer />
    </>
  );
}
