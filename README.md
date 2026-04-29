<div align="center">
  <img src="https://raw.githubusercontent.com/kpisti18/markdownCheatSheet/main/assets/world.png" alt="Wanderio Logo" width="120" height="120">
  <h1 align="center">Wanderio Utazásfoglaló Platform</h1>
  <p align="center">
    Egy teljes körű, React és Node.js alapú webalkalmazás utazások megtervezéséhez és lefoglalásához.
    <br />
    <a href="#-oldalak-és-komponensek"><strong>Dokumentáció »</strong></a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="#">Hibajelentés</a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="#">Fejlesztési javaslat</a>
  </p>
</div>

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

</div>

---

### 📋 Tartalomjegyzék

- [A Projektről](#-a-projektről)
- [Készítette](#-készítette)
- [Technológiai Háttér](#-technológiai-háttér)
- [Architektúra](#-architektúra)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Design](#-design)
- [Oldalak és Komponensek](#-oldalak-és-komponensek)

---

## 📖 A Projektről

A **Wanderio** egy komplex utazásfoglaló platform, amely lehetővé teszi a felhasználók számára, hogy repülőjegyeket és hotelszobákat keressenek, böngésszenek és foglaljanak le. Az alkalmazás egy modern, két részből álló architektúrára épül:
- egy **React** alapú, dinamikus frontend felületre, ami a Netlify-on fut,
- és egy robusztus **Node.js** backendre, ami egy **MySQL** adatbázissal kommunikál.

A projekt célja, hogy egy teljes körű, felhasználóbarát utazási élményt nyújtson, az adminisztrációs felülettől kezdve egészen a végfelhasználói foglalási folyamatig.

<br>

## 👥 Készítette

| Név | Szerepkör |
| :--- | :--- |
| **Hegyi Vendel** | Full-Stack Fejlesztő |
| **Tokai Kristóf** | Full-Stack Fejlesztő |

<br>

## 🛠️ Technológiai Háttér

A projekt frontendje a következő technológiákra épül:

- `HTML5`
- `CSS3`
- `Bootstrap 5`
- `React` + `Vite`

<br>

## 🏗️ Architektúra

### Backend

A backend **Node.js** alapú, **Express** keretrendszerrel, és egy **MySQL** adatbázissal kommunikál a `mysql2` csomag segítségével. Feladata egy RESTful API biztosítása, amely hidat képez a Netlify-on hosztolt frontend és az adatbázis között. Kezeli a felhasználói hitelesítést, az adatlekérdezéseket, a foglalási logikát és a képfeltöltéseket a Cloudinary felé.

> **Backend Elérhetősége:** [https://wanderio-backend.onrender.com/](https://wanderio-backend.onrender.com/)

### Frontend

A frontend egy modern, komponens-alapú **Single Page Application (SPA)**, amely a **React** keretrendszerre épül. Feladata a backend API által szolgáltatott adatok vizuális megjelenítése, egy intuitív és reszponzív felhasználói felület biztosítása, valamint a felhasználói interakciók kezelése. A kliensoldali routingot a **React Router** kezeli, lehetővé téve a gyors, oldal-újrabetöltés nélküli navigációt.

<br>

## 🎨 Design

A felhasználói felület tervei a **Figma** szoftverben készültek, részletes wireframe-ek és vizuális prototípusok alapján.

<p align="center">
  <img src="https://via.placeholder.com/1200x600.png?text=Figma+Design+Képernyőkép" alt="Figma Design" width="85%">
</p>

> **Figma Terv:** [Itt érhető el a Figma projekt](https://link.a.figma.projekthez)

---

## 🚀 Oldalak és Komponensek

Az alkalmazás a következő főbb oldalakra (komponensekre) tagolódik:

<details>
<summary><strong>1. 🔑 SignIn.jsx</strong> - Bejelentkezési oldal</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>SignIn.jsx</code></td>
      <td><code>jsx</code></td>
      <td>A bejelentkezési logika vezérlője. Kezeli az űrlap állapotát, elküldi a hitelesítési kérelmet, és kezeli a visszajelzéseket.</td>
    </tr>
    <tr>
      <td><code>SignIn.css</code></td>
      <td><code>css</code></td>
      <td>Az oldal egyedi stíluslapja.</td>
    </tr>
    <tr>
      <td><code>InputMezo.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Újrafelhasználható beviteli mező komponens.</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://via.placeholder.com/800x400.png?text=SignIn+Oldal" alt="SignIn oldal képe">
</p>
</details>

<details>
<summary><strong>2. 📝 SignUp.jsx</strong> - Regisztrációs oldal</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>SignUp.jsx</code></td>
      <td><code>jsx</code></td>
      <td>A regisztrációs logika vezérlője. Kezeli az űrlap állapotát, ellenőrzi az adatokat, és elküldi a regisztrációs kérelmet.</td>
    </tr>
    <tr>
      <td><code>SignUp.css</code></td>
      <td><code>css</code></td>
      <td>Az oldal egyedi stíluslapja.</td>
    </tr>
    <tr>
      <td><code>InputMezo.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Újrafelhasználható beviteli mező komponens.</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://via.placeholder.com/800x400.png?text=SignUp+Oldal" alt="SignUp oldal képe">
</p>
</details>

<details>
<summary><strong>3. 🖼️ HomePage.jsx</strong> - Főoldal (Slider)</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>HomePage.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Automatikus képváltót (slider) valósít meg, amely 4 másodpercenként léptet. Dinamikusan rendereli a háttereket és a szövegeket.</td>
    </tr>
  </tbody>
</table>
</details>

<details>
<summary><strong>4. 🌍 Selector.jsx</strong> - Fő Választó Oldal</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Selector.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Betölti az összes várost és legördülő menüben jeleníti meg őket. Innen indul a keresés, és adminok számára itt érhető el az admin felület.</td>
    </tr>
    <tr>
      <td><code>Selector.css</code></td>
      <td><code>css</code></td>
      <td>A "hero" szekció és az információs kártyák stíluslapja.</td>
    </tr>
  </tbody>
</table>
</details>

<details>
<summary><strong>5. 🏙️ Booking.jsx</strong> - Város Részletező Oldal</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Booking.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Egy adott város részleteit jeleníti meg: képgaléria, leírás, látványosságok, hotelek.</td>
    </tr>
    <tr>
      <td><code>Booking.css</code></td>
      <td><code>css</code></td>
      <td>Az oldal stíluslapja, beleértve a carousel-t és a kártyák megjelenését.</td>
    </tr>
  </tbody>
</table>
</details>

<details>
<summary><strong>6. ✈️ Flights.jsx</strong> - Repülőjegy Kereső Oldal</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Flights.jsx</code></td>
      <td><code>jsx</code></td>
      <td>A repülőjegy-keresés és -foglalás logikáját vezérli. A sikeres foglalás a kosár oldalra irányít.</td>
    </tr>
    <tr>
      <td><code>Flights.css</code></td>
      <td><code>css</code></td>
      <td>A kereső űrlap és a találati lista stíluslapja.</td>
    </tr>
  </tbody>
</table>
</details>

<details>
<summary><strong>7. 🏨 Hotels.jsx</strong> - Hotelek Listázó Oldala</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Hotels.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Egy város hoteljeit listázza kártya formátumban. A kártyákról lehet a hotel foglalási oldalára navigálni.</td>
    </tr>
    <tr>
      <td><code>Hotels.css</code></td>
      <td><code>css</code></td>
      <td>A hotel-kártyák vizuális stíluslapja.</td>
    </tr>
  </tbody>
</table>
</details>

<details>
<summary><strong>8. 🛏️ HotelBook.jsx</strong> - Hotel Foglalási Oldal</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>HotelBook.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Egy specifikus hotel foglalási oldala. Kezeli a dátumválasztást, árkalkulációt és a foglalás véglegesítését.</td>
    </tr>
    <tr>
      <td><code>HotelBook.css</code></td>
      <td><code>css</code></td>
      <td>A foglalási oldal teljes vizuális megjelenéséért felel.</td>
    </tr>
  </tbody>
</table>
</details>

<details>
<summary><strong>9. 🛒 Cart.jsx</strong> - Kosár és Fizetési Oldal</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Cart.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Megjeleníti a kosárba helyezett tételeket. Füles navigációval szűri a tartalmat és egy felugró ablakban kezeli a fizetést.</td>
    </tr>
    <tr>
      <td><code>Cart.css</code></td>
      <td><code>css</code></td>
      <td>A kosár oldal komplex vizuális struktúráját definiálja.</td>
    </tr>
  </tbody>
</table>
</details>

<details>
<summary><strong>10. 👤 Profile.jsx</strong> - Felhasználói Profil Oldal</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Profile.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Lehetővé teszi a felhasználó számára adatainak (név, email, jelszó) megtekintését, módosítását, valamint a kijelentkezést.</td>
    </tr>
    <tr>
      <td><code>Profile.css</code></td>
      <td><code>css</code></td>
      <td>A profil oldal és a szerkesztő űrlapok stíluslapja.</td>
    </tr>
  </tbody>
</table>
</details>

<details>
<summary><strong>11. ⚙️ Admin.jsx</strong> - Adminisztrációs Panel</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Admin.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Az admin felület központi vezérlője. Csak 'admin' szerepkörrel érhető el. Füles navigációval vált az adatkezelő komponensek között.</td>
    </tr>
    <tr>
      <td><code>Admin.css</code></td>
      <td><code>css</code></td>
      <td>A panel általános elrendezéséért és a füles navigációért felel.</td>
    </tr>
  </tbody>
</table>
</details>

<details>
<summary><strong>12. 👨‍💻 UsersManager.jsx</strong> - Felhasználókezelő Komponens</summary>
<br>
<table>
  <thead>
    <tr>
      <th>Fájlnév</th>
      <th>Típus</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>UsersManager.jsx</code></td>
      <td><code>jsx</code></td>
      <td>Az admin panel része. Listázza, szerkeszthetővé és törölhetővé teszi a felhasználókat egy modális ablak segítségével.</td>
    </tr>
  </tbody>
</table>
</details>