selain->palvelin: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note, Form Data:{ note: "foobar" }
note over palvelin:
palvelin tallentaa Form Datan
sisältämän muistiinpanon
end note
palvelin-->selain: 302 Found, Location: /notes
note over selain:
palvelin palauttaa 302
ohjauksen, joka takaisin
muistiinpanojen listaussivulle
end note
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
palvelin->selain: palvelin-->selain: HTML-koodi
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
palvelin-->selain: main.css
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
palvelin-->selain: main.js

note over selain:
selain alkaa suorittaa js-koodia
joka pyytää JSON-datan palvelimelta
end note

selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
palvelin-->selain: [{ content: "HTML on helppoa", date: "2019-01-01" }, ...]

note over selain:
selain suorittaa tapahtumankäsittelijän
joka renderöi muistiinpanot näytölle
end note