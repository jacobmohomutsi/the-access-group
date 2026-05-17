import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
    "https://cms.theaccessgroup.co.za/graphql"
);