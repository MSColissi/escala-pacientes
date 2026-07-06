import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { BoneFracture, Brain, Footprints, History, SmilePlus, Users } from "lucide-react"
import Glasgow from "../Glasgow/Glasgow"
import Braden from "../Braden/Braden"
import Morse from "../Morse/Morse"
import Fugulin from "../Fugulin/Fugulin"
import Dor from "../Dor/Dor"
import Historico from "../Historico/Historico"

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-5 md:p-10">
      <Tabs defaultValue="glasgow" className="w-full sm:max-w-[90dvw] lg:max-w-[50dvw]">
        <div className="overflow-x-auto overflow-y-hidden">
          <TabsList className="inline-flex w-max min-w-full">
            <TabsTrigger value="glasgow" className="cursor-pointer">
              <Brain /> Glasgow
            </TabsTrigger>
            <TabsTrigger value="braden" className="cursor-pointer">
              <BoneFracture /> Braden
            </TabsTrigger>
            <TabsTrigger value="morse" className="cursor-pointer">
              <Footprints /> Morse
            </TabsTrigger>
            <TabsTrigger value="fugulin" className="cursor-pointer">
              <Users /> Fugulin
            </TabsTrigger>
            <TabsTrigger value="dor" className="cursor-pointer">
              <SmilePlus /> Dor
            </TabsTrigger>
            <TabsTrigger value="historico" className="cursor-pointer">
              <History /> Histórico
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="glasgow">
          <Glasgow />
        </TabsContent>

        <TabsContent value="braden">
          <Braden />
        </TabsContent>

        <TabsContent value="morse">
          <Morse />
        </TabsContent>

        <TabsContent value="fugulin">
          <Fugulin />
        </TabsContent>

        <TabsContent value="dor">
          <Dor />
        </TabsContent>

        <TabsContent value="historico">
          <Historico />
        </TabsContent>
      </Tabs>
    </main>
  )
}
