apiId=$API_ID
clientId=$CLIENT_ID

cat template.html | sed "s/<CLIENT_ID>/${clientId}/g" | sed "s/<API_KEY>/${apiId}/g" > index.html

python3 -m http.server 8000