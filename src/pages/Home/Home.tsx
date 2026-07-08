import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  BoneFracture,
  Brain,
  Footprints,
  HeartPlus,
  History,
  SmilePlus,
  Users,
} from "lucide-react"

import Glasgow from "../Glasgow/Glasgow"
import Braden from "../Braden/Braden"
import Morse from "../Morse/Morse"
import Fugulin from "../Fugulin/Fugulin"
import Dor from "../Dor/Dor"
import Historico from "../Historico/Historico"
import Frail from "../Frail/Frail"

const tabs = [
  {
    value: "glasgow",
    label: "Glasgow",
    icon: Brain,
    component: <Glasgow />,
  },
  {
    value: "braden",
    label: "Braden",
    icon: BoneFracture,
    component: <Braden />,
  },
  {
    value: "morse",
    label: "Morse",
    icon: Footprints,
    component: <Morse />,
  },
  {
    value: "fugulin",
    label: "Fugulin",
    icon: Users,
    component: <Fugulin />,
  },
  {
    value: "dor",
    label: "Dor",
    icon: SmilePlus,
    component: <Dor />,
  },
  {
    value: "frail",
    label: "Frail",
    icon: HeartPlus,
    component: <Frail />,
  },
  {
    value: "historico",
    label: "Histórico",
    icon: History,
    component: <Historico />,
  },
]

export default function Home() {
  return (
    <main className="flex min-h-dvh justify-center p-5 md:p-10">
      <Tabs
        defaultValue={tabs[0].value}
        className="w-full sm:max-w-[90dvw] lg:max-w-[70dvw] xl:max-w-[60dvw]"
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-7 h-auto!">
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex items-center justify-center gap-2 py-2 cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(({ value, component }) => (
          <TabsContent key={value} value={value}>
            {component}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}