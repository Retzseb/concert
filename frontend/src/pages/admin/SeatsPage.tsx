import { useEffect, useState } from "react";
import { useConcerts } from "../../hooks/useConcerts";
import { MultiplierKey, useSeatLayout } from "../../hooks/useSeatLayout";

const MULTI_ORDER: MultiplierKey[] = ["M1", "M2", "M3"];

const MULTI_UI: Record<MultiplierKey, { label: string; seatClass: string }> = {
  M1: { label: "1. ", seatClass: "adminSeat--C" },
  M2: { label: "2. ", seatClass: "adminSeat--B" },
  M3: { label: "3. ", seatClass: "adminSeat--A" },
};

function nextMultiplier(current: MultiplierKey): MultiplierKey {
  const i = MULTI_ORDER.indexOf(current);
  return MULTI_ORDER[(i + 1) % MULTI_ORDER.length];
}

function seatId(r: number, c: number) {
  return `R${r}C${c}`;
}

function seatNumber(r: number, c: number, cols: number) {
  return (r - 1) * cols + c;
}

export function SeatsPage() {
  const {
    concerts,
    loading: concertsLoading,
    error: concertsError,
    reload: reloadConcerts,
  } = useConcerts();

  const [selectedId, setSelectedId] = useState<number | "">("");
  const selected = concerts.find((c) => c.id === selectedId);

  useEffect(() => {
    if (selectedId === "" && concerts.length > 0) setSelectedId(concerts[0].id);
  }, [concerts, selectedId]);

  const {
    layout,
    setLayout,
    loading: layoutLoading,
    error: layoutError,
    save,
  } = useSeatLayout(selected?.room_id ? Number(selected.room_id) : "")

  const rows = selected?.room_total_rows ?? 0;
  const cols = selected?.room_total_columns ?? 0;
  const basePrice = selected?.base_price ?? 0;

  const priceFor = (m: MultiplierKey) => {
    const mult = layout.multipliers[m] ?? 1;
    return Math.round(basePrice * mult);
  };

  const handleSeatClick = (r: number, c: number) => {
    const id = seatId(r, c);
    const current = layout.seatMap[id] ?? "M2";
    const next = nextMultiplier(current);

    setLayout((prev) => ({
      ...prev,
      seatMap: { ...prev.seatMap, [id]: next },
    }));
  };

  const handleMultiplierChange = (key: MultiplierKey, value: string) => {
    const n = Number(value);
    setLayout((prev) => ({
      ...prev,
      multipliers: {
        ...prev.multipliers,
        [key]: Number.isFinite(n) ? n : prev.multipliers[key],
      },
    }));
  };

  const handleSave = async () => {
    await save();
    window.alert("Kiosztás mentve.");
  };

  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Ülések</h2>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="adminMuted" style={{ fontWeight: 900 }}>
            Koncert:
          </span>

          <select
            className="adminSelect"
            value={selectedId === "" ? "" : String(selectedId)}
            onChange={(e) =>
              setSelectedId(e.target.value ? Number(e.target.value) : "")
            }
            disabled={concertsLoading || concerts.length === 0}
          >
            {concerts.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name} ({c.place_name}, {c.place_city}) — {c.base_price} Ft
              </option>
            ))}
          </select>

          {concertsError && (
            <button className="adminBtn" type="button" onClick={reloadConcerts}>
              Újra
            </button>
          )}
        </div>
      </div>

      {concertsLoading && <p className="adminMuted">Koncertek betöltése...</p>}
      {concertsError && (
        <p className="adminMuted" style={{ color: "#ffb4b4", marginTop: 0 }}>
          {concertsError}
        </p>
      )}

      {selected && (
        <p className="adminMuted" style={{ marginTop: 0 }}>
          <b>Előadó:</b> {selected.performer_name} &nbsp;•&nbsp;
          <b>Műfaj:</b> {selected.genre_name} &nbsp;•&nbsp;
          <b>Terem:</b> {cols}×{rows} &nbsp;•&nbsp;
          <b>Alapár:</b> {basePrice} Ft
        </p>
      )}

      {layoutLoading && selectedId !== "" && (
        <p className="adminMuted">Kiosztás betöltése...</p>
      )}
      {layoutError && (
        <p className="adminMuted" style={{ color: "#ffb4b4", marginTop: 0 }}>
          {layoutError}
        </p>
      )}

      <div className="adminSeatsLayout">
        <div className="adminStageWrap">
          <div className="adminStage">Színpad</div>

          <div className="adminSeatLegend"
            style={{ display: "flex", gap: 16, alignItems: "center" }}
          >
            {(["M1", "M2", "M3"] as MultiplierKey[]).map((k) => (
              <span
                key={k}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <i
                  className={`adminSwatch ${MULTI_UI[k].seatClass.replace("adminSeat", "adminSwatch")}`}
                />
                <b> {MULTI_UI[k].label} árkategória:</b>
                <input
                  className="adminInput"
                  style={{ width: 110, marginLeft: 6 }}
                  value={priceFor(k)}
                  onChange={(e) => {
                    const price = Number(e.target.value);
                    if (!Number.isFinite(price)) return;

                    const mult = basePrice > 0 ? price / basePrice : 1;

                    setLayout((prev) => ({
                      ...prev,
                      multipliers: { ...prev.multipliers, [k]: mult },
                    }));
                  }}
                />
                <span className="adminMuted">Ft</span>
              </span>
            ))}
          </div>

          <div
            className="adminSeatGrid"
            aria-label="Seatmap"
            style={{ gridTemplateColumns: `repeat(${cols || 1}, 1fr)` }}
          >
            {Array.from({ length: rows }).map((_, rIdx) => {
              const r = rIdx + 1;
              return Array.from({ length: cols }).map((__, cIdx) => {
                const c = cIdx + 1;
                const id = seatId(r, c);
                const m = layout.seatMap[id] ?? "M2";
                const price = priceFor(m);
                const n = seatNumber(r, c, cols || 1);

                return (
                  <button
                    key={id}
                    type="button"
                    className={`adminSeat ${MULTI_UI[m].seatClass}`}
                    onClick={() => handleSeatClick(r, c)}
                    title={`#${n} (${id}) • ${price} Ft (katt: vált)`}
                    style={{ cursor: "pointer" }}
                  >
                    {n}
                    
                  </button>
                );
              });
            })}
          </div>
        </div>
        <aside className="adminPriceBox">
          <h3>Mentés</h3>
          <p className="adminMuted" style={{ marginTop: 0 }}>
            A kijelölt szék beállítása<br />
          </p>
          <button
            className="adminBtn adminBtn--solid"
            type="button"
            onClick={handleSave}
            disabled={selectedId === "" || rows === 0 || cols === 0}
            style={{ width: "100%" }}
          >
            Mentés
          </button>
        </aside>
      </div>
    </section>
  );
}
