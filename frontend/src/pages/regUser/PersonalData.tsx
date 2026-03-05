import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { API_BASE } from "../../utility/config";

type PersonalDataProps = {
  onUserUpdated?: (u: any | null) => void;
};

export function PersonalData({ onUserUpdated }: PersonalDataProps) {
  const { user, refresh } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [saving, setSaving] = useState(false);

  const extractErrorMessage = async (res: Response): Promise<string> => {
    try {
      const data = await res.json();
      const firstField = data?.errors ? Object.keys(data.errors)[0] : null;
      const firstErr = firstField ? data.errors[firstField]?.[0] : null;
      return firstErr || data?.message || data?.error || `HTTP ${res.status}`;
    } catch {
      return `HTTP ${res.status}`;
    }
  };

  useEffect(() => {
    if (!user) return;
    setUsername(user?.name ?? user?.username ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  const save = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Nincs bejelentkezve.");
      return;
    }

    const wantsPasswordChange = !!newPassword.trim() || !!newPasswordConfirm.trim() || !!currentPassword.trim();

    if (wantsPasswordChange) {
      if (!currentPassword.trim()) {
        alert("Add meg a jelenlegi jelszavadat a jelszó módosításához.");
        return;
      }
      if (!newPassword.trim()) {
        alert("Add meg az új jelszót.");
        return;
      }
      if (newPassword !== newPasswordConfirm) {
        alert("Az új jelszó és a megerősítés nem egyezik.");
        return;
      }
    }

    const body: any = { name: username, email };

    if (wantsPasswordChange) {
      body.current_password = currentPassword;
      body.password = newPassword;
      body.password_confirmation = newPasswordConfirm;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(await extractErrorMessage(res));

      const me = await refresh();
      onUserUpdated?.(me);

      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");

      alert("Sikeres frissítés!");
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Hiba történt mentés közben.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="userCard">
      <div className="userCardHead">
        <h2>Személyes adatai</h2>
      </div>

      <div className="userFormWrap">
        <div className="userFormRow">
          <label className="userLabel">Felhasználónév</label>
          <input className="userInput" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="userFormRow">
          <label className="userLabel">Email cím</label>
          <input className="userInput" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="userFormRow">
          <label className="userLabel">Jelenlegi jelszó</label>
          <input
            className="userInput"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            placeholder="Csak ha jelszót módosítasz"
          />
        </div>

        <div className="userFormRow">
          <label className="userLabel">Új jelszó</label>
          <input
            className="userInput"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
            placeholder="Csak ha jelszót módosítasz"
          />
        </div>

        <div className="userFormRow">
          <label className="userLabel">Új jelszó megerősítése</label>
          <input
            className="userInput"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            type="password"
            autoComplete="new-password"
            placeholder="Csak ha jelszót módosítasz"
          />
        </div>

        <div className="userFormActions">
          <button className="userBtn userBtn--solid" type="button" onClick={save} disabled={saving}>
            {saving ? "Mentés..." : "Frissítés"}
          </button>
        </div>
      </div>
    </section>
  );
}
