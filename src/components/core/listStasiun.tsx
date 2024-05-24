import Button from "../ui/button1";

interface TombolStasiunProps {
  onSelectStation: (station: string) => void;
}

const TombolStasiun: React.FC<TombolStasiunProps> = ({ onSelectStation }) => {
  return (
    <div
      className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 py-4 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4
      dark:bg-zinc-950 dark:border-neutral-800 dark:border-2
      z-10"
    >
      <Button onClick={() => onSelectStation("Bundaran HI")}>Bundaran HI</Button>
      <Button onClick={() => onSelectStation("DukuhAtas")}>Dukuh Atas BNI</Button>
      <Button onClick={() => onSelectStation("Setiabudi")}>Setiabudi Astra</Button>
      <Button onClick={() => onSelectStation("Benhil")}>Bendungan Hilir</Button>
      <Button onClick={() => onSelectStation("Mandiri")}>Istora Mandiri</Button>
      <Button onClick={() => onSelectStation("Senayan")}>Senayan</Button>
      <Button onClick={() => onSelectStation("Asean")}>Asean</Button>
      <Button onClick={() => onSelectStation("Blok M")}>Blok M</Button>
      <Button onClick={() => onSelectStation("Blok A")}>Blok A</Button>
      <Button onClick={() => onSelectStation("Haji Nawi")}>Haji Nawi</Button>
      <Button onClick={() => onSelectStation("Cipete")}>Cipete Raya</Button>
      <Button onClick={() => onSelectStation("Fatmawati")}>Fatmawati</Button>
      <Button onClick={() => onSelectStation("LebakBulus")}>Lebak Bulus Grab</Button>
    </div>
  );
};

export default TombolStasiun;
