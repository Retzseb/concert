import { useState } from "react";
import { useUsers, type Role, type UserRow } from "../../hooks/useUsers";

export function UsersPage() {
  const { users, loading, error, addUser, updateRole, removeUser, reload } = useUsers();

  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState<Omit<UserRow, "id">>({
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

  const saveAdd = async () => {
    try {
      await addUser({
        username: draft.username.trim(),
        email: draft.email.trim(),
        name: draft.name.trim(),
        role: draft.role,
      });
      setIsAdding(false);
      setDraft({ username: "", email: "", name: "", role: "Felhasználó" });
    } catch (e: any) {
      alert(e?.message ?? "Nem sikerült menteni.");
    }
  };

  const onUpdateRole = async (id: number, role: Role) => {
    try {
      await updateRole(id, role);
    } catch (e: any) {
      alert(e?.message ?? "Nem sikerült módosítani a szerepkört.");
    }
  };

  const onRemove = async (id: number) => {
    if (!window.confirm("Biztosan törlöd a profilt?")) return;
    try {
      await removeUser(id);
    } catch (e: any) {
      alert(e?.message ?? "Nem sikerült törölni.");
    }
  };

  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Felhasználók</h2>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="adminBtn" type="button" onClick={reload} disabled={loading}>
            Frissítés
          </button>

          {!isAdding ? (
            <button className="adminBtn adminBtn--solid" type="button" onClick={startAdd}>
              + Új felhasználó felvétele
            </button>
          ) : (
            <>
              <button className="adminBtn adminBtn--solid" type="button" onClick={saveAdd}>
                Mentés
              </button>
              <button className="adminBtn" type="button" onClick={cancelAdd}>
                Mégse
              </button>
            </>
          )}
        </div>
      </div>

      {error && <p style={{ marginTop: 10, color: "red" }}>{error}</p>}

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
            {loading && (
              <tr>
                <td colSpan={5} style={{ padding: 14, opacity: 0.8 }}>
                  Betöltés…
                </td>
              </tr>
            )}

            {!loading && users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>
                  <select
                    className="adminSelect"
                    value={u.role}
                    onChange={(e) => onUpdateRole(u.id, e.target.value as Role)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Jegykezelő">Jegykezelő</option>
                    <option value="Felhasználó">Felhasználó</option>
                  </select>
                </td>
                <td>
                  <button className="adminDanger" type="button" onClick={() => onRemove(u.id)}>
                    Profil törlése
                  </button>
                </td>
              </tr>
            ))}

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
                <td style={{ color: "rgba(243,241,255,.7)", fontWeight: 700 }}>Új felhasználó…</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
