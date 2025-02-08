
import sanityClient from "@sanity/client";
export const client= sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-05-03', 
    useCdn: false
});