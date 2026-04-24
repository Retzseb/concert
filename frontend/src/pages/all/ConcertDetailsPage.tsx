import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useConcerts } from "../../hooks/useConcerts";
import { useSeatLayout, MultiplierKey } from "../../hooks/useSeatLayout";
import { useCart } from "../../cart/cartProvider";
import { API_BASE } from "../../utility/config";
import { formatDate } from "../../utility/date";
import { toAbsoluteUrl } from "../../utility/picsMedia";

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

 
  const { items: cartItems, addItems } = useCart();

  const concert = concerts.find((c) => c.id === id);

  const { layout, seatIds, loading: layoutLoading, error: layoutError } = useSeatLayout(
    concert?.room_id ?? ""
  );

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [reservedSeatMap, setReservedSeatMap] = useState<Record<string, boolean>>({});

  const pictureUrl = useMemo(() => toAbsoluteUrl(concert?.picture), [concert?.picture]);

  
  const inCartSeatDbIds = useMemo(() => {
    if (!concert?.id) return new Set<number>();
    const set = new Set<number>();
    for (const it of cartItems) {
      if (it.concertId === concert.id) set.add(Number(it.seatDbId));
    }
    return set;
  }, [cartItems, concert?.id]);

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
      } catch (e) {
        console.error(e);
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

  const priceFor = useCallback(
    (m: MultiplierKey) => {
      const mult = layout.multipliers[m] ?? 1;
      return Math.round(basePrice * mult);
    },
    [layout.multipliers, basePrice]
  );

  const seatCategory = useCallback(
    (sid: string): MultiplierKey => {
      return layout.seatMap[sid] ?? "M2";
    },
    [layout.seatMap]
  );

  const seatPrice = useCallback(
    (sid: string) => priceFor(seatCategory(sid)),
    [priceFor, seatCategory]
  );


  const isSeatInCart = useCallback(
    (sid: string) => {
      const dbId = seatIds[sid];
      if (!dbId) return false;
      return inCartSeatDbIds.has(Number(dbId));
    },
    [seatIds, inCartSeatDbIds]
  );

  const toggleSeat = useCallback(
    (sid: string) => {
      
      if (!seatIds[sid] || reservedSeatMap[sid] || isSeatInCart(sid)) return;
      setSelected((prev) => ({ ...prev, [sid]: !prev[sid] }));
    },
    [seatIds, reservedSeatMap, isSeatInCart]
  );

  const selectedSeatIds = useMemo(() => {
    return Object.entries(selected)
      .filter(([k, v]) => v && !reservedSeatMap[k] && !isSeatInCart(k))
      .map(([k]) => k);
  }, [selected, reservedSeatMap, isSeatInCart]);

  const reservedCount = useMemo(
    () => Object.values(reservedSeatMap).filter(Boolean).length,
    [reservedSeatMap]
  );

  const totalSelectedPrice = useMemo(() => {
    return selectedSeatIds.reduce((sum, sid) => sum + seatPrice(sid), 0);
  }, [selectedSeatIds, seatPrice]);

  const addToCart = useCallback(() => {
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
  }, [concert, selectedSeatIds, addItems, seatIds, seatPrice]);

  if (!Number.isFinite(id)) {
    return (
      <section className="section">
        <p>Hibás koncert azonosító.</p>
        <Link className="btn" to="/concerts">
          Vissza
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="sectionHead">
        <h2>Koncert</h2>
        <Link className="btn" to="/cart">
          Kosár
        </Link>
      </div>

      {loading && <p>Betöltés…</p>}
      {error && <p>{error}</p>}

      {!loading && !error && !concert && <p>Nem található ilyen koncert.</p>}

      {concert && (
        <>
          <div className="miniCard" style={{ marginBottom: 14, overflow: "hidden" }}>
            {pictureUrl && (
              <div style={{ marginBottom: 12 }}>
                <img
                  src={pictureUrl}
                  alt={concert.name}
                  style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 12 }}
                  loading="lazy"
                />
              </div>
            )}

            <h3 style={{ marginTop: 0 }}>{concert.name}</h3>
            <p style={{ marginBottom: 0, opacity: 0.9 }}>
              <b>Előadó:</b> {concert.performer_name} <br />
              <b>Időpont:</b> {formatDate(concert.date)} <br />
              <b>Helyszín:</b> {concert.place_name} <br />
              <b>Alapár:</b> {basePrice} Ft <br />
              <b>Foglalt:</b> {reservedCount}
            </p>
          </div>

          <div className="adminStageWrap">
            {layoutLoading && <p>Kiosztás betöltése…</p>}
            {layoutError && <p>{layoutError}</p>}

            <div className="adminSeatLegend" style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {(["M1", "M2", "M3"] as MultiplierKey[]).map((k) => (
                <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <i className={`adminSwatch ${MULTI_UI[k].seatClass.replace("adminSeat", "adminSwatch")}`} />
                  <b>{k}:</b> {priceFor(k)} Ft
                </span>
              ))}
            </div>

            <div className="adminStage">Színpad</div>

            <div className="seatmapScroll" aria-label="Seatmap scroll wrapper">
              <div
                className="adminSeatGrid adminSeatGrid--details"
                aria-label="Seatmap"
                style={{
                  gridTemplateColumns: `repeat(${cols || 1}, var(--seatSize))`,
                  minWidth: `calc(${cols || 1} * var(--seatSize) + (${cols || 1} - 1) * 8px)`,
                  marginTop: 12,
                }}
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
                    const inCart = existsInDb ? isSeatInCart(sid) : false;

                    const disabled = !existsInDb || isReserved || inCart;

                    const title = isReserved
                      ? `#${n} (${sid}) • FOGLALT`
                      : inCart
                        ? `#${n} (${sid}) • KOSÁRBAN`
                        : `#${n} (${sid}) • ${seatPrice(sid)} Ft`;

                    return (
                      <button
                        key={sid}
                        type="button"
                        className={`adminSeat ${MULTI_UI[cat].seatClass} ${isSel ? "isSelected" : ""} ${inCart ? "isInCart" : ""}`}
                        onClick={() => toggleSeat(sid)}
                        title={title}
                        disabled={disabled}
                        style={{
                          cursor: existsInDb && !isReserved && !inCart ? "pointer" : "not-allowed",
                          opacity: existsInDb ? 1 : 0.35,

                          // ✅ végleges foglalt: piros
                          backgroundColor: isReserved ? "rgb(141, 3, 3)" : undefined,
                          color: isReserved ? "white" : undefined,

                          // ✅ kosárban: narancs + jelzés (csak ha nem reserved)
                          filter: inCart && !isReserved ? "saturate(1.1)" : undefined,
                          outline: inCart && !isReserved ? "3px solid rgba(249,115,22,.9)" : undefined,
                          outlineOffset: inCart && !isReserved ? "2px" : undefined,
                        }}
                      >
                        {isReserved ? "X" : inCart ? "🛒" : n}
                      </button>
                    );
                  });
                })}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 14, flexWrap: "wrap" }}>
            <button className="btn" onClick={addToCart}>
              Kosárba ({selectedSeatIds.length})
            </button>

            <div style={{ opacity: 0.85 }}>
              Összesen: <b>{totalSelectedPrice} Ft</b>
            </div>
          </div>
        </>
      )}
    </section>
  );
}