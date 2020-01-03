selain->palvelin: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa, Request Payload {content: "foobar", date: "2019-10-03T17:57:32.438Z"}
note over palvelin:
palvelin tallentaa
Request Payloadissa
tulleen content property
muistiinpanoihin
end note
palvelin-->selain: 201 Created
note over selain:
selain renderöi uuden
muistiinpanon listan viimeiseksi
XMLHttpRequestin onreadystatechangessa:
var li = document.createElement('li')
ul.appendChild(li);
li.appendChild(document.createTextNode(note.content))
end note