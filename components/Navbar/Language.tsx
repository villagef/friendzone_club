import { useState } from "react";
import { useScroll } from "@/hooks/useScroll";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "../ui/button";
import { Icons } from "../icons";

const languages = [
  { label: "English", value: "en" },
  { label: "Polish", value: "pl" },
] as const;

export default function Language() {
  const [value, setValue] = useState<string>();

  const { y: scrollYPos } = useScroll();

  return (
    <li>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.world
              className={`${
                scrollYPos > 0 ? "stroke-primary" : "stroke-white"
              }`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Command>
            <CommandGroup>
              {languages.map(language => (
                <CommandItem
                  value={language.value}
                  key={language.value}
                  className={`${
                    value === language.value
                      ? "bg-slate-600  text-white"
                      : "bg-transparent"
                  }`}
                  onSelect={() => {
                    setValue(language.value);
                  }}
                >
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </li>
  );
}
