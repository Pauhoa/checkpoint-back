import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";
import { getManager, getRepository } from "typeorm";

@Resolver()
export class CountryResolver {
    @Query(() => [Country])
    async countries(): Promise<Country[]> {
        const countryRepository = getRepository(Country);
        return await countryRepository.find();
    }

    @Query(() => Country, { nullable: true })
    async countryByCode(@Arg("code") code: string): Promise<Country | null> {
        const countryRepository = getRepository(Country);
        return await countryRepository.findOne({ where: { code } });
    }

    @Query(() => [Country])
    async countriesByContinent(@Arg("codeContinent") codeContinent: string): Promise<Country[]> {
        const countryRepository = getRepository(Country);
        return await countryRepository.find({ where: { codeContinent } });
    }

    @Mutation(() => Country)
    async addCountry(
        @Arg("code") code: string,
        @Arg("name") name: string,
        @Arg("emoji") emoji: string,
        @Arg("codeContinent") codeContinent: string
    ): Promise<Country> {
        const country = new Country();
        country.code = code;
        country.name = name;
        country.emoji = emoji;
        country.codeContinent = codeContinent;

        const entityManager = getManager();
        await entityManager.save(country);

        return country;
    }
}
