import { useEffect, useState } from "react";
import AppLayout from "./components/AppLayout";
import type { PageId } from "./components/nav";
import Home from "./pages/Home";
import RoomCalculator from "./pages/RoomCalculator";
import AyadiCalculator from "./pages/AyadiCalculator";
import UnitConverterPage from "./pages/UnitConverter";
import TraditionalReference from "./pages/TraditionalReference";
import SavedCalculations from "./pages/SavedCalculations";
import { seedIfNeeded } from "./lib/storage";
import type { SavedAyadiCalculation, SavedRoomCalculation } from "./types";

export default function App() {
  const [page, setPage] = useState<PageId>("home");
  const [editRoom, setEditRoom] = useState<SavedRoomCalculation | null>(null);
  const [editAyadi, setEditAyadi] = useState<SavedAyadiCalculation | null>(null);

  useEffect(() => {
    seedIfNeeded();
  }, []);

  function openRoom(calc: SavedRoomCalculation) {
    setEditRoom(calc);
    setPage("room");
  }

  function openAyadi(calc: SavedAyadiCalculation) {
    setEditAyadi(calc);
    setPage("ayadi");
  }

  return (
    <AppLayout active={page} onNavigate={setPage}>
      {page === "home" && <Home onNavigate={setPage} />}
      {page === "room" && (
        <RoomCalculator
          initial={editRoom}
          onConsumed={() => setEditRoom(null)}
        />
      )}
      {page === "ayadi" && (
        <AyadiCalculator
          initial={editAyadi}
          onConsumed={() => setEditAyadi(null)}
        />
      )}
      {page === "converter" && <UnitConverterPage />}
      {page === "reference" && <TraditionalReference />}
      {page === "saved" && (
        <SavedCalculations onEditRoom={openRoom} onEditAyadi={openAyadi} />
      )}
    </AppLayout>
  );
}
