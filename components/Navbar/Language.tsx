import { useScroll } from "@/hooks/useScroll";
import { Button } from "../ui/button";
import { Icons } from "../icons";

export default function Language() {
  const { y: scrollYPos } = useScroll();
  return (
    <li>
      <Button variant="ghost" size="icon">
        <Icons.world
          className={`${scrollYPos > 0 ? "stroke-black" : "strok-black"}`}
        />
      </Button>
    </li>
  );
}
