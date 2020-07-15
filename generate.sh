#!/bin/bash
printf "const awsmobile = {\n\t\"aws_appsync_graphqlEndpoint\": \"$GRAPHQL_URL\", \
\n\t\"aws_appsync_region\": \"$REGION\", \
\n\t\"aws_appsync_authenticationType\": \"$AUTH_TYPE\", \
\n\t\"aws_appsync_apiKey\": \"$API_KEY\"\n}; \
\n\nexport default awsmobile;"
