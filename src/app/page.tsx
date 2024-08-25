import CountryCard from "@/components/country-card";
export type Country = {
  name: {
    common: string;
  };
  translations: {
    por: {
      common: string;
    };
  };
  flags: {
    svg: string;
    alt: string;
  };
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  cca3: string;
};
// funcao que vai fazer o fecth de dados
// Promise<Country[]> retorna uma array de dados getCountries
async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}

export default async function Home() {
  // chamar a funcao
  const countries = await getCountries();
  // console.log(countries);
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lx:grid-cols-5 container w-full gap-2 mt-16 ">
      {countries.map((country) => (
        <CountryCard 
        key={country.name.common}
        name={country.name.common}
        ptName={country.translations.por.common}
        flag={country.flags.svg}
        flagAlt={country.flags.alt} 
        />

      ))}
    </section>
  );
}
// getCountries