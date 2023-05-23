import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CountryResolver } from "./resolvers/CountryResolver";

async function bootstrap() {
    // Créer une connexion à la base de données
    await createConnection();

    // Construire le schéma GraphQL
    const schema = await buildSchema({
        resolvers: [CountryResolver],
        emitSchemaFile: true,
        validate: false,
    });

    // Créer une instance du serveur Apollo
    const server = new ApolloServer({ schema });

    // Démarrer le serveur
    const { url } = await server.listen(4000);
    console.log(`Serveur GraphQL démarré à l'adresse : ${url}`);
}

bootstrap().catch((error) => {
    console.error("Erreur lors du démarrage du serveur :", error);
});
