import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useConcerts } from "../../hooks/useConcerts";
import { useSeatLayout, MultiplierKey } from "../../hooks/useSeatLayout";
import { useCart } from "../../cart/cartProvider";
import { API_BASE } from "../../utility/config";
import { formatDate } from "../../utility/date";

function seatId(r: number, c: number) {
  return `R${r}C${c}`;
}

function seatNumber(r: number, c: number, cols: number) {
  return (r - 1) * cols + c;
}

const MULTI_UI: Record<MultiplierKey, { seatClass: string }> = {
  M1: { seatClass: "adminSeat--C" },
  M2: { seatClass: "adminSeat--B" },
  M3: { seatClass: "adminSeat--A" },
};

export function ConcertDetailsPage() {
  const params = useParams();
  const id = Number(params.id);
  const { concerts, loading, error } = useConcerts();
  const { addItems } = useCart();

  const concert = concerts.find((c) => c.id === id);
  const { layout, seatIds, loading: layoutLoading, error: layoutError } = useSeatLayout(concert?.room_id ?? "");

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [reservedSeatMap, setReservedSeatMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    const loadReservedSeats = async () => {
      if (!concert?.id) {
        setReservedSeatMap({});
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/concerts/${concert.id}/seats`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled || !Array.isArray(data)) return;

        const next: Record<string, boolean> = {};
        data.forEach((seat: any) => {
          const key = seatId(Number(seat.row_number), Number(seat.column_number));
          next[key] = !!seat.reserved;
        });
        setReservedSeatMap(next);
      } catch (error) {
        console.error(error);
        if (!cancelled) setReservedSeatMap({});
      }
    };

    loadReservedSeats();
    return () => {
      cancelled = true;
    };
  }, [concert?.id]);

  const rows = concert?.room_total_rows ?? 0;
  const cols = concert?.room_total_columns ?? 0;
  const basePrice = concert?.base_price ?? 0;

  const priceFor = (m: MultiplierKey) => {
    const mult = layout.multipliers[m] ?? 1;
    return Math.round(basePrice * mult);
  };

  const seatCategory = (sid: string): MultiplierKey => {
    return layout.seatMap[sid] ?? "M2";
  };

  const seatPrice = (sid: string) => priceFor(seatCategory(sid));

  const toggleSeat = (sid: string) => {
    if (!seatIds[sid] || reservedSeatMap[sid]) return;
    setSelected((prev) => ({ ...prev, [sid]: !prev[sid] }));
  };

  const selectedSeatIds = Object.entries(selected)
    .filter(([k, v]) => v && !reservedSeatMap[k])
    .map(([k]) => k);

  const reservedCount = useMemo(() => Object.values(reservedSeatMap).filter(Boolean).length, [reservedSeatMap]);

  const addToCart = () => {
    if (!concert) return;
    if (selectedSeatIds.length === 0) {
      window.alert("Válassz ki legalább 1 széket.");
      return;
    }

    addItems(
      selectedSeatIds
        .filter((sid) => !!seatIds[sid])
        .map((sid) => ({
          concertId: concert.id,
          concertName: concert.name,
          date: concert.date,
          place: concert.place_name,
          seatId: sid,
          seatDbId: seatIds[sid],
          price: seatPrice(sid),
          discountId: 1,
        }))
    );

    setSelected({});
    window.alert("Hozzáadva a kosárhoz.");
  };

  if (!Number.isFinite(id)) {
    return (
      <section className="section">
        <p>Hibás koncert azonosító.</p>
        <Link className="btn" to="/concerts">Vissza</Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="sectionHead">
        <h2>Koncert</h2>
        <Link className="btn" to="/cart">Kosár</Link>
      </div>

      {loading && <p>Betöltés…</p>}
      {error && <p>{error}</p>}

      {!loading && !error && !concert && (
        <p>Nem található ilyen koncert.</p>
      )}

      {concert && (
        <>
          <div className="miniCard" style={{ marginBottom: 14, overflow: "hidden" }}>
            <h3 style={{ marginTop: 0 }}>{concert.name}</h3>
            <p style={{ marginBottom: 0, opacity: 0.9 }}>
              <b>Előadó:</b> {concert.performer_name} <br />
              <b>Időpont:</b> {formatDate(concert.date)} <br />
              <b>Helyszín:</b> {concert.place_name} <br />
              <b>Alapár:</b> {basePrice} Ft
            </p>
          </div>
          <div className="adminStageWrap">
          <div className="adminStage">Színpad</div>
          {layoutLoading && <p>Kiosztás betöltése…</p>}
          {layoutError && <p>{layoutError}</p>}

          <div className="adminSeatLegend" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {(["M1", "M2", "M3"] as MultiplierKey[]).map((k) => (
              <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <i className={`adminSwatch adminSwatch--SOLD ${MULTI_UI[k].seatClass.replace("adminSeat", "adminSwatch")}`} />
                <b>{k}:</b> {priceFor(k)} Ft
              </span>                
            ))}
          </div>
          <div
            className="adminSeatGrid adminSeatGrid--details"
            aria-label="Seatmap"
            style={{ gridTemplateColumns: `repeat(${cols || 1}, 1fr)`, marginTop: 12 }}
          >
            {Array.from({ length: rows }).map((_, rIdx) => {
              const r = rIdx + 1;
              return Array.from({ length: cols }).map((__, cIdx) => {
                const c = cIdx + 1;
                const sid = seatId(r, c);
                const n = seatNumber(r, c, cols || 1);

                const cat = seatCategory(sid);
                const isSel = !!selected[sid];
                const existsInDb = !!seatIds[sid];
                const isReserved = !!reservedSeatMap[sid];

                return (
                  <button
                    key={sid}
                    type="button"
                    className={`adminSeat ${MULTI_UI[cat].seatClass} ${isSel ? "isSelected" : ""}`}
                    onClick={() => toggleSeat(sid)}
                    title={isReserved ? `#${n} (${sid}) • FOGLALT` : `#${n} (${sid}) • ${seatPrice(sid)} Ft`}
                    disabled={!existsInDb || isReserved}
                    style={{
                      cursor: existsInDb && !isReserved ? "pointer" : "not-allowed",
                      opacity: existsInDb ? 1 : 0.35,
                      backgroundColor: isReserved ? "rgb(141, 3, 3)" : "none",
                      color: isReserved ? "white" : "none",
                      position: "relative",
                    }}
                  >
                    {isReserved ? "X" : n}
                  </button>
                );
              });
            })}
          </div>
</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 14 }}>
            <button className="btn" onClick={addToCart}>
              Kosárba ({selectedSeatIds.length})
            </button>
            <div style={{ opacity: 0.85 }}>
              Összesen:{" "}
              <b>
                {selectedSeatIds.reduce((sum, sid) => sum + seatPrice(sid), 0)} Ft
              </b>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
