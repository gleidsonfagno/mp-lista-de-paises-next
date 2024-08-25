import type { Country } from "@/app/page";
import CountryCard from "@/components/country-card";
import Image from "next/image";
import Link from "next/link";

// async function getCountryByName(name: string): Promise<Country> {
//   const response = await fetch(
//     `https://restcountries.com/v3.1/name/${name}?fullText=true`
//   );
//   return (await response.json())[0];
// }

async function getCountryByName(name: string): Promise<Country | undefined> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  return countries.find((country: Country) => country.name.common == name)!;
}

// Exibindo os países que fazem fronteira
async function getCountryBordersByname(name: string) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  const country = countries.find(
    (country: Country) => country.name.common == name
  )!;

  // essa busca esta fazeno de acordo com codigo cca3 que esta na api e como se fosse o nome porem como faz a requisicao da api pelo nome do pais e desse pasi ele dar somente os codigos dos paises que fazem fronteiras, fazemos essa requisicao peando o codgo e entregamos o nomereal em portugues e a bandeira
  return country.borders?.map((border) => {
    const borderCoutry = countries.find((country) => country.cca3 == border)!;
    return {
      name: borderCoutry.name.common,
      ptName: borderCoutry.translations.por.common,
      flag: borderCoutry.flags.svg,
      flagAlt: borderCoutry.flags.alt,
    };
  });
}

// acessamddo os paramentros da rota
export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  // esta guradando os dados dos nomes que estavindo dos parametros da url e la ja e esse URI e para tira os espacos e o que no precisamos
  const country = await getCountryByName(decodeURI(name));

  const borderCountries = await getCountryBordersByname(decodeURI(name));
  const formater = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl font-bold text-center text-gray-800 mt-16">
        {country!.translations.por.common}
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
      <article className="flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          {country!.capital && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🏙️ Capital:</b> {country!.capital}
            </h2>
          )}
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Continente: </b> {country!.region}{" "}
            {country!.subregion && `- ${country!.subregion}`}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨‍👩‍👧‍👦 População: </b> {formater.format(country!.population)}
          </h2>
          {country!.languages && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🗣️ Línguas faladas:</b>
              <br />
              {Object.values(country!.languages).map((language) => (
                <span
                  key={language}
                  className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full"
                >
                  {language}
                </span>
              ))}
            </h2>
          )}
        </section>

        <div className="relative h-48 mb-2 md:h-auto  md:w-96 w-full shadow-md md:order-last order-first">
          <Image
            src={country!.flags.svg}
            alt={country!.flags.alt}
            fill
            className="object-contain md:object-cover"
          />
        </div>
      </article>

      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800 ">
          Países que fazem fonteiras
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lx:grid-cols-5 container w-full gap-2 ">
          {borderCountries?.map((border) => (
            // <div  key={border}>{border}</div>
            <CountryCard key={border.name} {...border}/>
          ))}
        </div>
      </section>
    </section>
  );
}
