import { useState } from "react";
import {useUsers, type NewUserInput, type Role} from "../../hooks/useUsers";

const EMPTY_DRAFT: NewUserInput = {
  email: "",
  name: "",
  password: "",
  role: "Felhasználó",
};

export function UsersPage() {
  const { users, loading, error, addUser, updateRole, removeUser, reload } = useUsers();

  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState<NewUserInput>(EMPTY_DRAFT);

  const startAdd = () => {
    setIsAdding(true);
    setDraft(EMPTY_DRAFT);
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setDraft(EMPTY_DRAFT);
  };

  const saveAdd = async () => {
    if (!draft.name.trim() || !draft.email.trim() || !draft.password.trim()) {
      alert("A név, e-mail és jelszó megadása kötelező.");
      return;
    }

    try {
      await addUser({
        email: draft.email.trim(),
        name: draft.name.trim(),
        password: draft.password,
        role: draft.role,
      });
      setIsAdding(false);
      setDraft(EMPTY_DRAFT);
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
    <section className="panel">
      <div className="panelHead">
        <h2>Felhasználók</h2>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="actionBtn" type="button" onClick={reload} disabled={loading}>
            Frissítés
          </button>

          {!isAdding ? (
            <button className="actionBtn actionBtn--solid" type="button" onClick={startAdd}>
              + Új felhasználó felvétele
            </button>
          ) : (
            <>
              <button className="actionBtn actionBtn--solid" type="button" onClick={saveAdd}>
                Mentés
              </button>
              <button className="actionBtn" type="button" onClick={cancelAdd}>
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

            {!loading &&
              users.map((u) => (
                <tr key={u.id}>
                  <td data-label="Email cím">{u.email}</td>
                  <td data-label="Név">{u.name}</td>
                  <td data-label="Státusz">
                    <select
                      className="adminSelect"
                      value={u.role}
                      onChange={(e) => onUpdateRole(u.id, e.target.value as Role)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Felhasználó">Felhasználó</option>
                    </select>
                  </td>
                  <td data-label="Művelet">
                    <button className="adminDanger" type="button" onClick={() => onRemove(u.id)}>
                      Profil törlése
                    </button>
                  </td>
                </tr>
              ))}

            {isAdding && (
              <>
                <tr>
                  <td data-label="Email cím">
                    <input
                      className="adminInput"
                      placeholder="email@pelda.hu"
                      value={draft.email}
                      onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                    />
                  </td>
                  <td data-label="Név">
                    <input
                      className="adminInput"
                      placeholder="Teljes név"
                      value={draft.name}
                      onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    />
                  </td>
                  <td data-label="Státusz">
                    <select
                      className="adminSelect"
                      value={draft.role}
                      onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value as Role }))}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Felhasználó">Felhasználó</option>
                    </select>
                  </td>
                  <td data-label="Művelet" style={{ color: "rgba(243,241,255,.7)", fontWeight: 700 }}>Új felhasználó…</td>
                </tr>
                <tr>
                  <td colSpan={5}>
                    <input
                      className="adminInput"
                      type="password"
                      placeholder="Kezdő jelszó (min. 6 karakter)"
                      value={draft.password}
                      onChange={(e) => setDraft((d) => ({ ...d, password: e.target.value }))}
                      style={{ width: 280 }}
                    />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
