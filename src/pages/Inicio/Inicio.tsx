import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

import { Copyright, SquareArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <main className="flex flex-col min-h-dvh items-center justify-center gap-2">
      <Card className="mx-auto w-full max-w-[90vw] sm:max-w-sm">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <img
              src={`${import.meta.env.BASE_URL}ufsm-192.png`}
              alt="UFSM logo"
              className="w-25"
            />  
            <CardTitle className="text-3xl">Projeto de Mestrado</CardTitle>
          </div>
          <CardDescription>
            Mestranda: Fernanda Tavani Soares
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <p className="text-justify">
            Sistema web desenvolvido como parte de um <strong>projeto de pesquisa de Mestrado</strong> da <strong>Universidade Federal de Santa Maria (UFSM)</strong>, com o objetivo de disponibilizar uma ferramenta para aplicação de escalas clínicas utilizadas na avaliação de pacientes em ambiente hospitalar.
                
            O sistema busca facilitar a utilização das escalas por profissionais da saúde, reduzindo erros de cálculo, padronizando as avaliações e registrando o histórico das aplicações.
          </p>
        </CardContent>
        
        <CardFooter>
          <Button size="sm" className="w-full" asChild>
            <Link to="/home">
              Iniciar <SquareArrowRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <div className="flex gap-1 text-xs items-center">
        <Copyright strokeWidth={1} width={15} /> Mateus Colissi. Todos os direitos reservados.
      </div>
    </main>
  );
}