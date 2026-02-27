import { useMemo, useState } from "react";
import { logAction } from "../../utility/logger";

type Role = "Admin" | "Jegykezelő" | "Felhasználó";
type UserRow = { id: number; username: string; email: string; name: string; role: Role };

type NewUserDraft = {
  username: string;
  email: string;
  name: string;
  role: Role;
};

export function UsersPage() {
  const initial: UserRow[] = useMemo(
    () => [
      { id: 1, username: "ÉN", email: "xy@gmail.com", name: "ÉN", role: "Admin" },
      { id: 2, username: "TesztElek", email: "tesztelek@gmail.com", name: "Teszt Elek", role: "Jegykezelő" },
      { id: 3, username: "mindigKések", email: "mindigkesek@gmail.com", name: "Mindig Kések", role: "Felhasználó" },
    ],
    []
  );

  const [users, setUsers] = useState<UserRow[]>(initial);

  // Inline "új felhasználó" sor kezelése
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState<NewUserDraft>({
    username: "",
    email: "",
    name: "",
    role: "Felhasználó",
  });

  const startAdd = () => {
    setIsAdding(true);
    setDraft({ username: "", email: "", name: "", role: "Felhasználó" });
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setDraft({ username: "", email: "", name: "", role: "Felhasználó" });
  };

  const saveAdd = () => {
    // minimál validálás (csak hogy ne legyen üres)
    if (!draft.username.trim() || !draft.email.trim() || !draft.name.trim()) {
      alert("Kérlek töltsd ki a Profilnév / Email / Név mezőket!");
      return;
    }

    setUsers((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1;
      const newUser: UserRow = {
        id: nextId,
        username: draft.username.trim(),
        email: draft.email.trim(),
        name: draft.name.trim(),
        role: draft.role,
      };

      logAction?.({ type: "USER_ADD", payload: newUser } as any);
      // ha nincs loggered, ezt használd:
      // console.log("USER_ADD", newUser);

      return [...prev, newUser];
    });

    setIsAdding(false);
    setDraft({ username: "", email: "", name: "", role: "Felhasználó" });
  };

  const updateRole = (id: number, role: Role) => {
    setUsers((prev) => {
      const before = prev.find((u) => u.id === id);
      const next = prev.map((u) => (u.id === id ? { ...u, role } : u));

      logAction?.({
        type: "USER_ROLE_UPDATE",
        payload: { userId: id, before, after: next.find((u) => u.id === id) },
      } as any);

      return next;
    });
  };

  const removeUser = (id: number) => {
    setUsers((prev) => {
      const removed = prev.find((u) => u.id === id);

      logAction?.({ type: "USER_DELETE", payload: { userId: id, removed } } as any);

      return prev.filter((u) => u.id !== id);
    });
  };

  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Felhasználók</h2>

        {!isAdding ? (
          <button className="adminBtn adminBtn--solid" type="button" onClick={startAdd}>
            + Új felhasználó felvétele
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <button className="adminBtn adminBtn--solid" type="button" onClick={saveAdd}>
              Mentés
            </button>
            <button className="adminBtn" type="button" onClick={cancelAdd}>
              Mégse
            </button>
          </div>
        )}
      </div>

      <div className="adminTableWrap">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Profilnév</th>
              <th>Email cím</th>
              <th>Név</th>
              <th>Státusz</th>
              <th>Művelet</th>
            </tr>
          </thead>

          <tbody>
            {/* meglévő felhasználók */}
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>
                  <select
                    className="adminSelect"
                    value={u.role}
                    onChange={(e) => updateRole(u.id, e.target.value as Role)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Jegykezelő">Jegykezelő</option>
                    <option value="Felhasználó">Felhasználó</option>
                  </select>
                </td>
                <td>
                  <button className="adminDanger" type="button" onClick={() => removeUser(u.id)}>
                    Profil törlése
                  </button>
                </td>
              </tr>
            ))}

            {/* inline új felhasználó sor (placeholder szerkeszthető) */}
            {isAdding && (
              <tr>
                <td>
                  <input
                    className="adminInput"
                    placeholder="profilnev"
                    value={draft.username}
                    onChange={(e) => setDraft((d) => ({ ...d, username: e.target.value }))}
                  />
                </td>
                <td>
                  <input
                    className="adminInput"
                    placeholder="email@pelda.hu"
                    value={draft.email}
                    onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                  />
                </td>
                <td>
                  <input
                    className="adminInput"
                    placeholder="Teljes név"
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  />
                </td>
                <td>
                  <select
                    className="adminSelect"
                    value={draft.role}
                    onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value as Role }))}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Jegykezelő">Jegykezelő</option>
                    <option value="Felhasználó">Felhasználó</option>
                  </select>
                </td>
                <td style={{ color: "rgba(243,241,255,.7)", fontWeight: 700 }}>
                  Új felhasználó…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}