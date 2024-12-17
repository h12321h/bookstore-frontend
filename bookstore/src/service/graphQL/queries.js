import { gql } from "@apollo/client";
import { useQuery } from '@apollo/client';
import React from 'react';

export const GET_BOOKS_BY_TITLE = gql`
    query searchBookByTitle($title: String!, $page: Int!, $size: Int!) {
        searchBookByTitle(title: $title, page: $page, size: $size) {
            id
            title
            author
            publisher
            introduction
            price
            stock
            cover_image
            isbn
            deleted
        }
    }
`;