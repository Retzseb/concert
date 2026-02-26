import { useMemo, useState } from "react";
import { logAction } from "../../utility/logger";

type SeatCategory = "A" | "B" | "C";

type ShowMini = {
  id: string;
  title: string;
  venue: string;
  room: string;
};

type Prices = {
  A: number;
  B: number;
  C: number;
};

export function SeatsPage() {
  const shows = useMemo<ShowMini[]>(
    () => [
      { id: "AB001", title: "Hans Zimmer Europe Tour", venue: "Budapest - MVM Dome", room: "101" },
      { id: "BB101", title: "Metallica M72", venue: "Budapest - Papp László Sportaréna", room: "404" },
      { id: "CB303", title: "Gamer Symphony", venue: "Debrecen - HALL", room: "112" },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string>(shows[0]?.id ?? "");
  const selected = shows.find((s) => s.id === selectedId);

  // demo árak (később show-hoz kötjük)
  const [prices, setPrices] = useState<Prices>({ A: 15000, B: 10000, C: 8500 });

  // 5x5 seatmap (később dinamikus)
  const rows = ["A", "B", "C", "D", "E"];
  const cols = [1, 2, 3, 4, 5];

  const getCategory = (r: string): SeatCategory => {
    // elöl drágább: A-B -> A kategória, C-D -> B, E -> C (csak példa)
    if (r === "A" || r === "B") return "A";
    if (r === "C" || r === "D") return "B";
    return "C";
  };

  const savePrices = () => {
    logAction?.({
      type: "SEAT_PRICES_SAVE" as any,
      payload: { showId: selectedId, prices },
    } as any);

    alert("Árak mentése (dummy) – nézd a konzolt 🙂");
  };

  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Ülések</h2>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="adminMuted" style={{ fontWeight: 900 }}>Előadás:</span>
          <select className="adminSelect" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {shows.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selected && (
        <p className="adminMuted" style={{ marginTop: 0 }}>
          <b>Helyszín:</b> {selected.venue} &nbsp; • &nbsp; <b>Terem:</b> {selected.room}
        </p>
      )}

      <div className="adminSeatsLayout">
        <div className="adminStageWrap">
          <div className="adminStage">Színpad</div>

          <div className="adminSeatGrid" aria-label="Seatmap 5x5">
            {rows.map((r) =>
              cols.map((c) => {
                const cat = getCategory(r);
                return (
                  <div key={`${r}${c}`} className={`adminSeat adminSeat--${cat}`} title={`${r}${c} (cat ${cat})`}>
                    {c}
                  </div>
                );
              })
            )}
          </div>

          <div className="adminSeatLegend">
            <span><i className="adminSwatch adminSwatch--A" /> A kategória</span>
            <span><i className="adminSwatch adminSwatch--B" /> B kategória</span>
            <span><i className="adminSwatch adminSwatch--C" /> C kategória</span>
          </div>
        </div>

        <aside className="adminPriceBox">
          <h3>Árak</h3>

          <div className="adminPriceRow">
            <i className="adminSwatch adminSwatch--A" />
            <input
              className="adminInput"
              value={prices.A}
              onChange={(e) => setPrices((p) => ({ ...p, A: Number(e.target.value) || 0 }))}
            />
          </div>

          <div className="adminPriceRow">
            <i className="adminSwatch adminSwatch--B" />
            <input
              className="adminInput"
              value={prices.B}
              onChange={(e) => setPrices((p) => ({ ...p, B: Number(e.target.value) || 0 }))}
            />
          </div>

          <div className="adminPriceRow">
            <i className="adminSwatch adminSwatch--C" />
            <input
              className="adminInput"
              value={prices.C}
              onChange={(e) => setPrices((p) => ({ ...p, C: Number(e.target.value) || 0 }))}
            />
          </div>

          <button className="adminBtn adminBtn--solid" type="button" onClick={savePrices} style={{ width: "100%", marginTop: 10 }}>
            Mentés
          </button>
        </aside>
      </div>
    </section>
  );
}