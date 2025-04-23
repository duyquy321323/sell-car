import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function AppSidebar(props) {

    const { tabList } = props;

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

  return (
    <>
        <div className={"fixed h-full w-full bg-black/50 left-0 top-0 z-9" + (open? "" : " hidden")}></div>
            <aside className={"bg-cyan-950 rounded-sm fixed w-3xs h-full top-0 p-3 z-10 overflow-auto transition-all duration-200 " + (open? "right-0" : "right-[-256px]")}>
                <Button onClick={() => setOpen(false)} className="h-6 aspect-square bg-gray-700 mb-2 ml-auto block rounded-full flex hover:bg-cyan-900 items-center justify-center cursor-pointer">
                    <IoClose/>
                </Button>
                <nav className="flex flex-col gap-y-2">
                    {Array.from(tabList).map(tab => 
                        <Button className="justify-start cursor-pointer rounded-[3px] bg-gray-700 hover:bg-cyan-900" onClick={() => { navigate(tab.path); setOpen(false)}}>
                            {tab.icon}
                            <span>{tab.name}</span>
                        </Button>
                    )}
                </nav>
            </aside>
            <IoMenu size={28} className="cursor-pointer xl:hidden" onClick={() => setOpen(true)}/>
    </>
  )
}