# README.md-fil för ett CV-API
Detta repository innehåller koden för ett simplare REST API som är byggt med Express. API:et är skapat för att hantera arbetslivserfarenheter.  
Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk
En liveversion av APIet finns tillgänglig på följande URL: [Lägg till testserver här](Länk här) 

## Installation, databas
APIet använder PostgreSQL som databas.
Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js, denna innehåller fiktiv data. 
Installations-skriptet skapar databastabellen enligt nedan:
|Tabell-namn|Fält  |
|--|--|
|workexperience  | **id** (SERIAL), **companyname** (TEXT), **jobtitle** (TEXT), **location** (TEXT), **startdate** (DATE), **enddate** (DATE), **description** (TEXT)  |


## Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

|Metod  |Ändpunkt            |Beskrivning                                                                        |
|-------|--------------------|-----------------------------------------------------------------------------------|
|GET    |/workexperience     |Hämtar alla arbetserfarenheter.                                                    |
|GET    |/workexperience/:id |Hämtar specifikt jobb med angivet ID.                                              |
|POST   |/workexperience     |Lagrar ett nytt jobb. Kräver att jobb-objekt skickas med.                          |
|PUT    |/workexperience/:id |Uppdaterar ett befintligt jobb med angivet ID. Kräver att jobb-objekt skickas med. |
|DELETE |/workexperience/:id |Raderar ett jobb med angivet id.                                                   |

Ett kurs-objekt returneras/skickas som JSON med följande struktur:
```
{
    "id": 1,
    "companyname": "Testföretag",
    "jobtitle": "Testare",
    "location": "Testgatan",
    "startdate": "2024-03-31T22:00:00.000Z",
    "enddate": "2024-04-01T22:00:00.000Z",
    "description": "Testade lägga in data och skapa API:er."
  }
```