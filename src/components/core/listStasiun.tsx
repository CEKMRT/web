import Button from "../ui/button1";
// interface HomePageProps {}

const TombolStasiun = () => {
  return (
    <div
      className="flex flex-wrap justify-between justify-items-start content-center place-content-evenly gap-4 py-4 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl px-4
    dark:bg-zinc-950 dark:border-neutral-800 dark:border-2
    z-10
    "
    >
      <Button>Bundaran HI</Button>
      <Button>Dukuh Atas BNI</Button>
      <Button>Setiabudi Astra</Button>
      <Button>Bendungan Hilir</Button>
      <Button>Istora Mandiri</Button>
      <Button>Senayan</Button>
      <Button>Asean</Button>
      <Button>Blok M</Button>
      <Button>Blok A</Button>
      <Button>Haji Nawi</Button>
      <Button>Cipete Raya</Button>
      <Button>Fatmawati</Button>
      <Button>Lebak Bulus Grab</Button>
    </div>
  );
};

export default TombolStasiun;
