import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import {PREFIX} from "../config";

const httpLink = createHttpLink({
    uri: `${PREFIX}/graphql`, // 你的后端 GraphQL 地址
    credentials: 'include', // 确保请求中包含 Cookie
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
