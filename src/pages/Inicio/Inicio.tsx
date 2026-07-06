import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SquareArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-2">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl">Projeto de Mestrado</CardTitle>
          <CardDescription>
            Mestranda: Fernanda Tavani Soares
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-justify">
            A <strong>Escala de Coma de Glasgow (ECG)</strong> é uma ferramenta clínica padronizada que avalia o nível de consciência de um paciente, especialmente após traumas cranioencefálicos (TCE). A pontuação varia de <strong>3 a 15</strong>, baseada em três respostas principais: <strong>Abertura Ocular</strong>, <strong>Resposta Verbal</strong> e <strong>Resposta Motora</strong>.
          </p>
        </CardContent>
        
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/home">
              Iniciar <SquareArrowRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}