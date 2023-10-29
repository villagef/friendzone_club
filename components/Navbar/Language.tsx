import { useScroll } from "@/hooks/useScroll";
import { Button } from "../ui/button";
import Tooltip from "../ui/tooltip";
import { Icons } from "../icons";

export default function Language() {
  const { y: scrollYPos } = useScroll();
  return (
    <Tooltip content="Language Selector">
      <li>
        <Button variant="ghost" size="icon">
          <Icons.world
            className={`${scrollYPos > 0 ? "stroke-black" : "strok-black"}`}
          />
        </Button>
      </li>
    </Tooltip>
  );
}
