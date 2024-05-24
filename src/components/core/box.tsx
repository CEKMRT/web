import ScheduleComponent from "../ui/box";

interface BoxCompProps {
  selectedSchedule: string | null;
}

const BoxComp: React.FC<BoxCompProps> = ({ selectedSchedule }) => {
  return (
    <div className="space-y-4 px-4">
      {selectedSchedule === "Bundaran HI" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/20/Arah%20Bundaran%20HI"
          title="Lebak Bulus Grab -> Bundaran HI"
          subtitle="Stasiun Akhir"
        />
      )}
      {/* ============== Dukuh Atas BNI ============== */}
      {selectedSchedule === "DukuhAtas" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/38/Arah%20Bundaran%20HI"
          title="Dukuh Atas BNI > Bundaran HI"
          subtitle="Stasiun Akhir"
        />
      )}

      {selectedSchedule === "DukuhAtas" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/21/Arah%20Lebak%20Bulus"
          title="Dukuh Atas BNI > Bundaran HI"
          subtitle="Stasiun Akhir"
        />
      )}
      {/* ============================================= */}
       {/* ============== Setiabudi 37 ============== */}
       {selectedSchedule === "Setiabudi" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/37/Arah%20Bundaran%20HI"
          title="Setiabudi -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Setiabudi" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/37/Arah%20Lebak%20Bulus"
          title="Setiabudi Astra -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ========================================= */}
      {/* ============== Bendungan Hilir 36 ============== */}
      {selectedSchedule === "Benhil" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/36/Arah%20Bundaran%20HI"
          title="Bendungan Hilir -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Benhil" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/36/Arah%20Lebak%20Bulus"
          title="Bendungan Hilir -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ========================================= */}
      {/* ============== Istora Mandiri 35 ============== */}
      {selectedSchedule === "Mandiri" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/35/Arah%20Bundaran%20HI"
          title="Istora Mandiri -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Mandiri" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/35/Arah%20Lebak%20Bulus"
          title="Istora Mandiri -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ============== Senayan 34 ============== */}
      {selectedSchedule === "Senayan" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/34/Arah%20Bundaran%20HI"
          title="Senayan -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Senayan" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/34/Arah%20Lebak%20Bulus"
          title="Senayan -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ============== Asean 33 ============== */}
      {selectedSchedule === "Asean" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/33/Arah%20Bundaran%20HI"
          title="Asean -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Asean" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/33/Arah%20Lebak%20Bulus"
          title="Asean -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ============== Blok M 32 ============== */}
      {selectedSchedule === "Blok M" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/32/Arah%20Bundaran%20HI"
          title="Blok M -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Blok M" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/32/Arah%20Lebak%20Bulus"
          title="Blok M -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ============== Blok A 31 ============== */}
      {selectedSchedule === "Blok A" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/31/Arah%20Bundaran%20HI"
          title="Blok A -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Blok A" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/31/Arah%20Lebak%20Bulus"
          title="Blok A -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ============== Haji Nawi 30 ============== */}
      {selectedSchedule === "Haji Nawi" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/30/Arah%20Bundaran%20HI"
          title="Haji Nawi -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Haji Nawi" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/30/Arah%20Lebak%20Bulus"
          title="Haji Nawi -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ============== Cipete 29 ============== */}
      {selectedSchedule === "Cipete" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/31/Arah%20Bundaran%20HI"
          title="Cipete -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Cipete" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/33/Arah%20Lebak%20Bulus"
          title="Cipete -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ============== Fatmawati 21 ============== */}
      {selectedSchedule === "Fatmawati" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/21/Arah%20Bundaran%20HI"
          title="Fatmawati -> Bundaran HI"
          subtitle=""
        />
      )}

      {selectedSchedule === "Fatmawati" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/21/Arah%20Lebak%20Bulus"
          title="Fatmawati -> Lebak Bulus Grab"
          subtitle=""
        />
      )}
      {/* ============== lebak 20 ============== */}
      {selectedSchedule === "Lebak Bulus" && (
        <ScheduleComponent
          apiUrl="http://localhost:8080/schedules/21/Arah%20Bundaran%20HI"
          title="Lebak Bulus Grab -> Bundaran HI"
          subtitle=""
        />
      )}

      
    </div>
  );
};

export default BoxComp;
