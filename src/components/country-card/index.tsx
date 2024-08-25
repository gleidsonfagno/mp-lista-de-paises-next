import Image from "next/image";
import Link from "next/link";

export default function CountryCard({
  name,
  ptName,
  flag,
  flagAlt,

}: {
  name: string;
  ptName: string;
  flag: string;
  flagAlt: string;
}) {
  return (
    // vai fazer a paginacao de acordo com nome do pais
    <Link key={name} href={`/pais/${name}`}>
      <article
        className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 hover:shadow-xl transition-all"
        // key={country.name.common}
      >
        <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
          <Image
            src={flag}
            // width={218.9}
            // height={131}
            alt={flagAlt}
            fill //vai oucupar o espaco inteiro
            className="object-cover"
          />
        </div>
        <h1 className="font-bold text-xl text-center mt-1">{ptName}</h1>
      </article>
    </Link>
  );
}
