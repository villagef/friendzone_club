import Image from "next/image";
import { Button } from "../ui/button";
import Tooltip from "../ui/tooltip";

export default function Language() {
  return (
    <Tooltip content="Language Selector">
      <li>
        <Button variant="ghost" size="icon">
          <Image
            src={"./world.svg"}
            alt={"Language Selector"}
            width={24}
            height={24}
          />
        </Button>
      </li>
    </Tooltip>
  );
}
