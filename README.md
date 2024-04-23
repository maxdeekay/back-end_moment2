<h1>REST API skapat för moment 2 i kursen DT207G</h1>
Detta repository innehåller ett enklare REST API byggt med Express. APIet är byggt för att läsa ut, lagra, ta bort och uppdatera arbetserfarenheter. Grundläggande funktion för CRUD (Create, Read, Update, Delete) är implementerad.

<h2>Länk</h2>
APIet finns tillgängligt på följande URL: https://back-end-moment2.onrender.com/api

<h2>Installation, databas</h2>
APIet använder en PostgreSQL-databas. Klona detta repo och kör kommandot npm install för att installera nödvändiga npm-paket. Kör installationsskriptet install.js som skapar databastabellen enligt nedstående:
<br>
<table>
  <tr>
    <th>Tabell-namn</th>
    <th>Fält</th>
  </tr>
  <tr>
    <td>workexperiences</td>
    <td>id(SERIAL PRIMARY KEY), companyname(VARCHAR(255), jobtitle(VARCHAR(255), location(VARCHAR(255), startdate(DATE), enddate(DATE), description(VARCHAR(255)</td>
  </tr>
</table>

<h2>Användning</h2>
Nedan finns beskrivet hur man kan använda APIet:
<br>
<table>
  <tr>
    <th>Metod</th>
    <th>Ändpunkt</th>
    <th>Beskrivning</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/experience</td>
    <td>Hämtar alla sparade arbetserfarenheter.</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/experience</td>
    <td>Lagrar en ny arbetserfarenhet.</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/experience</td>
    <td>Uppdaterar en existerande arbetserfarenhet med angivet ID.</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/experience/:ID</td>
    <td>Raderar en kurs med angivet ID.</td>
  </tr>****
</table>

Ett arbetserfarenhets-objekt returneras/skickas som JSON med följande struktur:
```json
{
    "id": 100,
    "companyname": "COOP",
    "jobtitle": "Kassabiträde",
    "location": "Katrineholm",
    "startdate": "2019-12-31T23:00:00.000Z",
    "enddate": "2024-04-22T22:00:00.000Z",
    "description": "Roligt att träffa människor."
  }
```
