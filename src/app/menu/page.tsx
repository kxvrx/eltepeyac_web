import { Metadata } from "next";
import { MenuClient } from "./MenuClient";
import menuImg from "./menu_full.jpg";

export const metadata: Metadata = {
  title: "Menú",
  description: "Explora nuestro menú completo con una auténtica selección de platillos mexicanos y bebidas en El Tepeyac Taqueria.",
};

export default function MenuPage() {
  return (
    <div className="w-full relative grain pb-12">
      <MenuClient menuImage={menuImg} />
    </div>
  );
}
