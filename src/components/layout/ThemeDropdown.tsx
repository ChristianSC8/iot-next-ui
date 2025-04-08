import { useTheme } from "next-themes";
import {
  RiSunLine,
  RiMoonLine,
  RiComputerLine,
} from "@remixicon/react";
import { cx, focusRing } from "@/utils/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";
import { useEffect, useState } from "react";

export default function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cx(
          focusRing,
          "flex items-center justify-center w-[30px] h-[30px] rounded-[3px] cursor-pointer border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-400/10"
        )}
      >
        {theme === "light" ? (
          <RiSunLine className="size-4 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50" />
        ) : theme === "dark" ? (
          <RiMoonLine className="size-4 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50" />
        ) : (
          <RiComputerLine className="size-4 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[140px]">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex gap-2 text-gray-700 dark:text-gray-300">
          <RiSunLine className="size-4 shrink-0" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex gap-2 text-gray-700 dark:text-gray-300">
          <RiMoonLine className="size-4 shrink-0" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex gap-2 text-gray-700 dark:text-gray-300">
          <RiComputerLine className="size-4 shrink-0" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
