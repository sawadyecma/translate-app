apiKey=$API_KEY
clientId=$CLIENT_ID

cat template.html | sed "s/<CLIENT_ID>/${clientId}/g" | sed "s/<API_KEY>/${apiKey}/g" > index.html

python3 -m http.server 8000