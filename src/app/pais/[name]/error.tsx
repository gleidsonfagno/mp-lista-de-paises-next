"use client"

import Image from "next/image";
import Link from "next/link";

export default function Error() {
  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl font-bold text-gray-800 my-16">
          Ops, ocorreu um erro ao exibir esse país
        </h1>
        <Link href="/" className="flex items-center py-2 gap-1">
          <Image
            src="/arrow-back.svg"
            alt="Inoce de seta de voltar"
            width={24}
            height={24}
          />
          Voltar
        </Link>
    </section>
  );
}
