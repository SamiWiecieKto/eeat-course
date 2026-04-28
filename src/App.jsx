import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, Award, AlertTriangle, Lightbulb, Quote, Target, RefreshCw, Menu, X, Sparkles, Map, Gauge, Printer, ChevronRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

// ==========================================================================
// COURSE CONTENT
// ==========================================================================

const MODULES = [
  {
    id: 'intro', number: '01', title: 'Wprowadzenie do E-E-A-T', subtitle: 'Co to jest, skąd się wzięło, dlaczego ma znaczenie', duration: '15 min',
    sections: [
      { type: 'heading', content: 'Czym jest E-E-A-T' },
      { type: 'paragraph', content: 'E-E-A-T to skrót z Google Search Quality Rater Guidelines (SQRG) — oficjalnego dokumentu, którego używa około 16 000 ludzi na świecie do oceny jakości wyników wyszukiwania. Rozwija się jako:' },
      { type: 'definition-list', items: [
        { term: 'Experience', def: 'Pierwsza ręka — doświadczenie osobiste autora z tematem' },
        { term: 'Expertise', def: 'Wiedza lub umiejętności w dziedzinie' },
        { term: 'Authoritativeness', def: 'Bycie go-to source, autorytetem w niszy' },
        { term: 'Trust', def: 'Zaufanie — rzetelność, uczciwość, bezpieczeństwo' },
      ] },
      { type: 'heading', content: 'Historia: od E-A-T do E-E-A-T' },
      { type: 'paragraph', content: 'Google używa tej koncepcji od 2014 roku — początkowo jako E-A-T (Expertise, Authoritativeness, Trust). W grudniu 2022 Google dodał czwarty filar — Experience — żeby dowartościować treści oparte o realne doświadczenie, a nie tylko formalne kwalifikacje.' },
      { type: 'paragraph', content: 'Dodanie Experience odpowiadało na realny problem: coraz więcej treści było generowanych przez AI lub kopiowanych bez własnej perspektywy. Google chciał zasygnalizować, że ceni content od osób, które realnie przeszły przez opisywane doświadczenie.' },
      { type: 'callout', style: 'quote', label: 'Z wytycznych SQRG (sekcja 3.4)', content: '"Trust is the most important member of the E-E-A-T family. Untrustworthy pages have low E-E-A-T no matter how Experienced, Expert, or Authoritative they may seem."' },
      { type: 'heading', content: 'Nowość 2025: hierarchia filarów' },
      { type: 'paragraph', content: 'To jedna z najważniejszych zmian w SQRG 2025. Trust nie jest równoprawnym filarem z pozostałymi trzema — jest CENTRALNYM filarem, który pozostałe trzy wspierają. Jeśli masz maksymalne Experience, Expertise i Authoritativeness, ale zero Trust — twoja strona jest Lowest Quality.' },
      { type: 'paragraph', content: 'Klasyczny przykład z wytycznych: doskonały oszust może mieć realną ekspertyzę (długoletni scammer zna się na tym co robi), może być znany w swojej niszy (reputacja), może mieć osobiste doświadczenie. Ale sama natura jego działalności niszczy Trust — i cała strona jest Lowest.' },
      { type: 'heading', content: 'Dlaczego to ma znaczenie dla SEO' },
      { type: 'paragraph', content: 'Raterzy SQRG nie rankują konkretnych stron — ale ich oceny są używane do trenowania systemów Google. Innymi słowy: gdy twoja strona spełnia kryteria E-E-A-T, jest to sygnał, który algorytm Google uczy się rozpoznawać. Masowo, setki tysięcy ocen w różnych niszach uczą model, co to znaczy "jakościowa strona".' },
      { type: 'paragraph', content: 'Praktyka: każdy audyt SEO który nie adresuje E-E-A-T bezpośrednio — pomija największy bloker jakości. Techniczne SEO, link building, content marketing — wszystko to jest w służbie E-E-A-T.' },
    ],
    quiz: [
      { question: 'Który filar E-E-A-T został dodany w 2022 roku?', options: [ { text: 'Trust', correct: false }, { text: 'Experience', correct: true }, { text: 'Authoritativeness', correct: false }, { text: 'Expertise', correct: false } ], explanation: 'Experience zostało dodane w grudniu 2022 — rozszerzając E-A-T do E-E-A-T. Odpowiadało to na potrzebę dowartościowania treści opartych na pierwszej ręce doświadczeniu.' },
      { question: 'Który filar jest najważniejszy według SQRG 2025?', options: [ { text: 'Wszystkie są równoprawne', correct: false }, { text: 'Experience', correct: false }, { text: 'Trust', correct: true }, { text: 'Expertise dla YMYL, Experience dla pozostałych', correct: false } ], explanation: 'Trust jest centralnym filarem. Pozostałe trzy (Experience, Expertise, Authoritativeness) wspierają Trust — nie są z nim równoprawne. Untrustworthy page = Low/Lowest bez względu na pozostałe filary.' },
      { question: 'Czy oceny raterów SQRG bezpośrednio wpływają na ranking konkretnych stron?', options: [ { text: 'Tak, każda ocena ma bezpośredni wpływ', correct: false }, { text: 'Nie, są używane do trenowania algorytmów', correct: true }, { text: 'Tylko dla stron YMYL', correct: false }, { text: 'Tylko dla nowych domen', correct: false } ], explanation: 'Oceny raterów nie wpływają bezpośrednio na ranking. Są danymi treningowymi dla systemów Google — uczą algorytmy rozpoznawać jakość. Masowo, te oceny kształtują to, jak Google ocenia strony.' },
    ],
  },
  {
    id: 'trust', number: '02', title: 'Trust — rdzeń wszystkiego', subtitle: 'Najważniejszy filar i jak go zaaudytować', duration: '25 min',
    sections: [
      { type: 'heading', content: 'Definicja Trust' },
      { type: 'paragraph', content: 'Trust w SQRG to stopień, w jakim strona jest: accurate (dokładna), honest (uczciwa), safe (bezpieczna) i reliable (wiarygodna). Każde z tych słów ma znaczenie w praktyce audytu.' },
      { type: 'heading', content: 'Cztery wymiary Trust' },
      { type: 'paragraph', content: 'W praktyce audytorskiej Trust dzielimy na cztery obszary, które sprawdzamy sekwencyjnie:' },
      { type: 'grid', items: [
        { label: 'Bezpieczeństwo techniczne', items: ['HTTPS aktywne', 'Certyfikat SSL ważny', 'Brak ostrzeżeń Safe Browsing', 'Brak malware', 'Security headers (CSP, HSTS)'] },
        { label: 'Tożsamość firmy', items: ['Pełna strona "O nas"', 'Dane rejestrowe (NIP, REGON, KRS)', 'Fizyczny adres', 'Telefon aktywny', 'Email w domenie firmy'] },
        { label: 'Obsługa klienta', items: ['Polityka zwrotów widoczna', 'Regulamin dostępny', 'Polityka prywatności RODO', 'Kanały kontaktu', 'Czasy odpowiedzi'] },
        { label: 'Dokładność treści', items: ['Fakty prawdziwe i weryfikowalne', 'Dla YMYL — zgodność z expert consensus', 'Daty aktualizacji widoczne', 'Źródła cytowań podane'] },
      ] },
      { type: 'heading', content: 'Untrustworthy pages — czerwone flagi' },
      { type: 'paragraph', content: 'SQRG sekcja 4.5 wyraźnie opisuje, co automatycznie obniża Trust do poziomu Lowest. Każdy z poniższych sygnałów osobno wystarcza do dyskwalifikacji strony:' },
      { type: 'callout', style: 'warning', label: 'Sygnały Lowest Trust', content: '• Wielokrotne błędy faktyczne na stronie informacyjnej\n• Brak informacji kto odpowiada za stronę (dla YMYL / transakcji)\n• Ekstremalnie negatywna reputacja (oszustwa, wyroki, ostrzeżenia UOKiK)\n• Deceptive purpose (strona udaje coś czym nie jest)\n• Ukryte koszty ujawniane dopiero na etapie płatności\n• Dark patterns (mylące CTA, trudne do anulowania subskrypcje)\n• Fałszywe dane autorów (AI avatary udające ekspertów)' },
      { type: 'heading', content: 'Conflict of interest jako Trust killer' },
      { type: 'paragraph', content: 'To szczególnie ważny przypadek — konflikt interesów może zrujnować Trust nawet przy maksymalnym E+E+A. Klasyczny przykład: witryna producenta suplementów publikuje "niezależną recenzję" własnego produktu, podpisaną imieniem pracownika marketingu ("dr Anna Kowalska, specjalistka ds. zdrowia").' },
      { type: 'callout', style: 'example', label: 'Przykład: Conflict of interest = Low/Lowest', content: 'Nawet jeśli dane o składnikach są poprawne (fakty OK), ekspertyza jest prawdziwa (autor ma wiedzę), a reputacja nie jest negatywna — sam fakt ukrytego konfliktu interesów niszczy Trust. Fix: jawne oznaczenie "treść producenta", dodanie ujawnienia konfliktu, osobno opublikowane recenzje realnych klientów z weryfikowalnymi kontami.' },
      { type: 'heading', content: 'Trust w różnych typach stron' },
      { type: 'paragraph', content: 'Poziom wymaganego Trust zależy od typu strony. Dla każdego typu sprawdzasz inne obszary jako priorytetowe:' },
      { type: 'row-list', items: [
        { label: 'E-commerce', value: 'Bezpieczeństwo + obsługa klienta + tożsamość firmy' },
        { label: 'YMYL informacyjne', value: 'Dokładność + tożsamość autora + reputacja' },
        { label: 'Blog hobbystyczny', value: 'Tożsamość autora + dokładność (niski rygor)' },
        { label: 'Local business', value: 'Tożsamość + obsługa klienta + reputacja lokalna' },
        { label: 'SaaS B2B', value: 'Tożsamość firmy + bezpieczeństwo + obsługa klienta' },
      ] },
      { type: 'callout', style: 'protip', label: 'Pro tip', content: 'Przy audycie zacznij ZAWSZE od Trust. Jeśli Trust jest broken — reszta optymalizacji jest marnotrawstwem. Zobaczysz ślicznie zaplanowany content plan, świetne E-E-A na profilach autorów, i cała domena wciąż tonie — bo w stopce brakuje adresu firmy, a polityka zwrotów to lorem ipsum z 2019.' },
    ],
    quiz: [
      { question: 'Które z poniższych JEST wymiarem Trust według SQRG?', options: [ { text: 'Liczba stron w witrynie', correct: false }, { text: 'Dokładność treści (accuracy)', correct: true }, { text: 'Ilość backlinków', correct: false }, { text: 'Długość treści', correct: false } ], explanation: 'Cztery wymiary Trust to: accurate, honest, safe, reliable. Accuracy jest kluczowa szczególnie dla YMYL — treść musi być faktycznie poprawna i zgodna z expert consensus.' },
      { question: 'Scenariusz: witryna ma 10-letnią historię, ekspercki zespół i silne linki z autorytatywnych źródeł, ale w stopce brakuje danych rejestrowych firmy (NIP, adres). Witryna prowadzi sklep. Jaka ocena?', options: [ { text: 'High — linki i eksperci rekompensują brak danych', correct: false }, { text: 'Medium — częściowo OK', correct: false }, { text: 'Low/Lowest — brak informacji o firmie dyskwalifikuje dla strony transakcyjnej', correct: true }, { text: 'Nie da się ocenić bez audytu contentu', correct: false } ], explanation: 'Dla stron transakcyjnych (e-commerce) brak adekwatnych informacji o firmie to automatycznie sygnał Low/Lowest (sekcja 4.5.1). Nawet długa historia i eksperci nie rekompensują — Trust wymaga transparentności co do tego, kto odpowiada za transakcje.' },
      { question: 'Producent suplementów publikuje "niezależną recenzję" własnego produktu podpisaną imieniem pracownika marketingu bez ujawnienia. Jakie E-E-A-T?', options: [ { text: 'Wysoka — fakty o składnikach są prawdziwe', correct: false }, { text: 'Średnia — jest ekspertyza ogólna', correct: false }, { text: 'Niska/najniższa — conflict of interest niszczy Trust', correct: true }, { text: 'Nie wpływa na E-E-A-T, to kwestia regulacji prawnych', correct: false } ], explanation: 'Conflict of interest niszczy Trust bez względu na pozostałe filary. Nawet przy prawdziwej ekspertyzie i poprawnych faktach — ukryty konflikt interesów = Low E-E-A-T. Fix: jawne oznaczenie treści jako materiału producenta.' },
      { question: 'Które z poniższych najlepiej wzmocni Trust sklepu e-commerce?', options: [ { text: 'Dodanie 20 nowych artykułów blogowych miesięcznie', correct: false }, { text: 'Zdobycie 50 nowych backlinków', correct: false }, { text: 'Widoczna polityka zwrotów, regulamin RODO, pełne dane firmy', correct: true }, { text: 'Optymalizacja Core Web Vitals', correct: false } ], explanation: 'Dla e-commerce priorytety Trust to: tożsamość firmy, obsługa klienta, bezpieczeństwo techniczne. Content i linki to inne filary (Authoritativeness, E-E) — nie podnoszą Trust bezpośrednio.' },
      { question: 'Witryna ma HTTPS, dane firmy, aktywny telefon, ale na blogu od 2023 widnieje data "styczeń 2019" jako ostatnia aktualizacja artykułów medycznych. Jaki sygnał Trust?', options: [ { text: 'Brak wpływu na Trust', correct: false }, { text: 'Negatywny — przestarzała treść YMYL to sygnał low accuracy', correct: true }, { text: 'Pozytywny — pokazuje historię witryny', correct: false }, { text: 'Neutralny dla YMYL', correct: false } ], explanation: 'Dla YMYL — świeżość treści jest kluczowa dla accuracy (jednego z wymiarów Trust). Przestarzałe protokoły medyczne, nieaktualne stawki podatkowe, zmienione prawo — wszystko to obniża Trust. Fix: audyt treści co 6-12 mc dla YMYL.' },
    ],
  },
  {
    id: 'experience', number: '03', title: 'Experience — pierwsza ręka', subtitle: 'Nowy filar i największa przewaga nad AI-content', duration: '20 min',
    sections: [
      { type: 'heading', content: 'Dlaczego Experience został dodany' },
      { type: 'paragraph', content: 'Do grudnia 2022 Google oceniał jakość przez trzy filary: Expertise, Authoritativeness, Trust. Ale wraz z rozwojem generatywnego AI i stron agregacyjnych pojawił się problem: treści mogły być formalnie poprawne, pisane przez ekspertów lub dobrze zredagowane, ale brakowało im autentycznego doświadczenia.' },
      { type: 'paragraph', content: 'Experience to odpowiedź Google: ceńmy content tworzony przez ludzi, którzy realnie przeszli przez opisywane doświadczenie. Dla SEO to jest obecnie największa przewaga, jaką możemy zbudować nad konkurencją AI-content i zagranicznymi serwisami bez lokalnego doświadczenia.' },
      { type: 'callout', style: 'quote', label: 'Z wytycznych SQRG', content: '"Consider the extent to which the content creator has the necessary first-hand or life experience for the topic. Many types of pages are trustworthy and achieve their purpose well when created by people with a wealth of personal experience."' },
      { type: 'heading', content: 'Experience vs Expertise — różnica' },
      { type: 'paragraph', content: 'To rozróżnienie jest krytyczne dla audytu. Experience to osobiste doświadczenie — "robiłem to". Expertise to wiedza i umiejętności — "wiem jak to działa". Można mieć jedno bez drugiego.' },
      { type: 'comparison', items: [
        { label: 'Experience', examples: ['Recenzja produktu od osoby, która go używa 6 miesięcy','Poradnik podróżniczy od osoby, która była w miejscu','Doświadczenie pacjenta z leczeniem onkologicznym','Montażysta okien z 15-letnim stażem'] },
        { label: 'Expertise', examples: ['Recenzja techniczna produktu od inżyniera','Przewodnik historyczny miejsca od historyka','Protokół leczenia onkologicznego od lekarza','Wytyczne techniczne okien od inżyniera budownictwa'] },
      ] },
      { type: 'heading', content: 'Sygnały Experience do zaznaczenia w audycie' },
      { type: 'bullets', items: [
        'Oryginalne zdjęcia z procesu/realizacji (nie stocki, nie zdjęcia producenta)',
        'Case studies z konkretnymi datami, lokalizacjami, klientami (jeśli zgoda) i efektami',
        'Materiały wideo z autorem "w akcji" — demonstracja, poradnik, rozpakowanie',
        'Wzmianka o latach doświadczenia, ilości realizacji, personalne historie',
        'Dla YMYL "life experience": autor faktycznie przeszedł opisywane doświadczenie',
        'Recenzje od osób, które realnie używały produktu (nie producent, nie opłacony promotor)',
        'Wpisy blogowe w pierwszej osobie z konkretnymi szczegółami',
      ] },
      { type: 'heading', content: 'Przykład: Experience w praktyce' },
      { type: 'callout', style: 'example', label: 'Słaby sygnał Experience (kopia z 50 innych stron)', content: '"Oferujemy najwyższej jakości okna. Nasze produkty są trwałe i estetyczne. Zapraszamy do kontaktu."' },
      { type: 'callout', style: 'example', label: 'Silny sygnał Experience', content: '"Montujemy okna w województwie podkarpackim od 1998 r. Przez te 27 lat zrealizowaliśmy ponad 14 000 zamówień — od klatek schodowych w blokach na Rzeszowskim Osiedlu XXV-lecia po wille na Bieszczadzkich Halach. W galerii realizacji pokazujemy 120 z nich, z opisem wyzwania: nietypowy wymiar, zabytkowa architektura, termomodernizacja. Za każdą stoi nazwisko pracownika, który ją poprowadził."' },
      { type: 'heading', content: 'Experience w content strategii' },
      { type: 'paragraph', content: 'Przekładając to na content strategii — audyt powinien pytać o każdy URL: "co TA strona pokazuje z realnego doświadczenia, czego nie ma na 10 innych stronach w SERP?". Jeśli odpowiedzi nie ma, treść jest duplikatem niezależnie od tego, czy została napisana przez człowieka, AI, czy skopiowana.' },
      { type: 'callout', style: 'protip', label: 'Pro tip: Experience jako największy moat', content: 'Agregacyjne strony, strony AI-generated i zagraniczne copy-paste mają jedną wspólną cechę — ZERO Experience. Jeśli twój klient ma realną historię, realne realizacje, realny zespół — to jest przewaga, której konkurencja nie może kupić. Eksponuj ją maksymalnie: zdjęcia pracowników, daty założenia, liczby zrealizowanych projektów, nazwiska, miejsca, case studies.' },
    ],
    quiz: [
      { question: 'Kiedy został dodany Experience jako filar?', options: [ { text: 'Grudzień 2022', correct: true }, { text: 'Styczeń 2020', correct: false }, { text: 'Wrzesień 2025', correct: false }, { text: 'Listopad 2018', correct: false } ], explanation: 'Experience zostało dodane w grudniu 2022 roku — rozszerzając E-A-T do E-E-A-T. Odpowiadało to na proliferację AI-content i potrzebę dowartościowania treści opartych na osobistym doświadczeniu.' },
      { question: 'Który z poniższych to najlepszy sygnał Experience dla strony producenta mebli?', options: [ { text: 'Ogólne zdjęcia mebli ze stocku', correct: false }, { text: 'Artykuł "Historia meblarstwa w Polsce"', correct: false }, { text: 'Galeria 50 realizacji z datami, nazwami klientów (za zgodą) i zdjęciami z warsztatu', correct: true }, { text: 'Lista certyfikatów firmowych', correct: false } ], explanation: 'Galeria konkretnych realizacji z datami i szczegółami to silny sygnał Experience — pokazuje realne doświadczenie firmy. Certyfikaty to Expertise/Authoritativeness. Zdjęcia stockowe to ZERO Experience.' },
      { question: 'Jaka jest kluczowa różnica między Experience a Expertise?', options: [ { text: 'Experience dotyczy treści tekstowych, Expertise dotyczy video', correct: false }, { text: 'Experience to "robiłem to", Expertise to "wiem jak to działa"', correct: true }, { text: 'Experience jest dla YMYL, Expertise dla nie-YMYL', correct: false }, { text: 'Nie ma różnicy, to synonimy', correct: false } ], explanation: 'Experience to osobiste, praktyczne doświadczenie z tematem. Expertise to wiedza i umiejętności formalne lub nieformalne. Można mieć Experience bez formalnej Expertise (np. doświadczenie pacjenta) albo Expertise bez Experience (np. historyk piszący o miejscu, w którym nie był).' },
      { question: 'Dla czego Experience to szczególnie ważna przewaga w 2025?', options: [ { text: 'Bo Google preferuje długie treści', correct: false }, { text: 'Bo jest największym moat przeciwko AI-content i agregatorom', correct: true }, { text: 'Bo wpływa na Core Web Vitals', correct: false }, { text: 'Bo Google płaci więcej za takie strony', correct: false } ], explanation: 'AI-generated content, strony agregacyjne, zagraniczne copy-paste — wszystkie mają ZERO Experience. Jeśli klient ma realne doświadczenie (historia, realizacje, zespół), to jest przewaga której konkurencja nie może kupić ani wygenerować.' },
    ],
  },
  {
    id: 'expertise', number: '04', title: 'Expertise — wiedza i umiejętności', subtitle: 'Formalna i nieformalna — kiedy która wystarczy', duration: '20 min',
    sections: [
      { type: 'heading', content: 'Definicja Expertise' },
      { type: 'paragraph', content: 'Expertise to wiedza lub umiejętności autora w temacie strony. Może być formalna (certyfikaty, licencje, tytuły) lub nieformalna (lata praktyki, portfolio, pozytywne reakcje społeczności). To który rodzaj wystarczy — zależy od typu treści.' },
      { type: 'heading', content: 'Formalna vs nieformalna — kiedy co' },
      { type: 'table', items: [
        { a: 'Porady zdrowotne (YMYL)', b: 'Formalna', c: 'PWZ lekarza, dyplom specjalizacji, licencja diagnosty' },
        { a: 'Porady prawne (YMYL)', b: 'Formalna', c: 'Wpis na listę adwokatów/radców, uprawnienia notarialne' },
        { a: 'Porady finansowe (YMYL)', b: 'Formalna', c: 'Licencja KNF, certyfikat CFA, uprawnienia doradcy' },
        { a: 'Poradniki hobbystyczne', b: 'Nieformalna', c: 'Lata praktyki, portfolio, pozytywne reakcje społeczności' },
        { a: 'Recenzje konsumenckie', b: 'Mieszana', c: 'Experience + podstawowa znajomość kategorii' },
        { a: 'Blog kuchni regionalnej', b: 'Nieformalna', c: 'Lata gotowania, kuchnia własna, sukcesy w konkursach' },
        { a: 'Poradnik podróżniczy', b: 'Experience', c: 'Osobiste doświadczenie z miejscem ważniejsze niż formalna wiedza' },
      ] },
      { type: 'heading', content: 'Jak pokazać Expertise na stronie' },
      { type: 'paragraph', content: 'Sama obecność eksperta w firmie nic nie da, jeśli nie jest to widoczne dla użytkownika (ani dla ratera). Sygnały Expertise do audytu:' },
      { type: 'bullets', items: [
        'Strona "O autorze" z rozbudowanym bio (kwalifikacje, doświadczenie, specjalizacje)',
        'Linki do zewnętrznych profili (LinkedIn, publikacje naukowe, konferencje, portfolia)',
        'Dla YMYL: widoczne nr uprawnień (PWZ, nr wpisu ORA, licencja KNF)',
        'Publikacje autora (książki, artykuły branżowe, wystąpienia) linkowane z bio',
        'Cytowania autora przez inne autoratywne źródła w niszy',
        'Poziom merytoryczny treści adekwatny do eksperckiej (nie powierzchowny)',
        'Dla konkretnych artykułów: redakcyjna weryfikacja z podpisem specjalisty',
      ] },
      { type: 'heading', content: 'Częsty błąd: exaggerated expertise' },
      { type: 'callout', style: 'warning', label: 'Co się dzieje, gdy ekspertyza jest nieadekwatna', content: 'SQRG (sekcja 5.6) wyraźnie wskazuje exaggerated claims jako sygnał Low quality. Przykłady: "dr Anna" gdzie "dr" to byle co (nie medycyna, nie nauki ścisłe), "specjalista" bez wskazania w czym, "ekspert SEO" bez żadnych weryfikowalnych osiągnięć. Raterzy są szkoleni do weryfikacji — i klient powinien być.' },
      { type: 'heading', content: 'Expertise dla YMYL — rygor najwyższy' },
      { type: 'paragraph', content: 'Dla tematów YMYL, zwłaszcza medycznych, prawnych i finansowych — nieformalna ekspertyza zazwyczaj nie wystarcza. SQRG wprost mówi: artykuł o "lekach na depresję" napisany przez kopywriterkę bez wykształcenia medycznego — nawet jeśli fakty są wzięte z legitimate źródeł — może być oceniony Lowest, bo nie ma mechanizmu weryfikacji poprawności interpretacji.' },
      { type: 'callout', style: 'example', label: 'Przykład: serwis z poradami prawnymi', content: 'Klient prowadzi portal z poradami prawnymi, artykuły są pisane przez "zespół redakcyjny" (podpisani imieniem, bez nazwiska), w stopce widnieje "Weryfikowane prawnie". Firma założona przez adwokata, ale on osobiście nie pisze. Problem: weryfikacja jest deklarowana, ale niewidoczna. Fix: explicite "Zweryfikowane przez mec. X, adwokat, nr wpisu ORA Y" przy każdym artykule + data weryfikacji.' },
      { type: 'heading', content: 'Pro tip: eksponowanie Expertise' },
      { type: 'callout', style: 'protip', label: 'Checklist Expertise per URL', content: '1. Czy przy każdym artykule widoczny jest podpisany autor?\n2. Czy bio autora zawiera weryfikowalną ekspertyzę dla TEMATU artykułu?\n3. Czy dla YMYL widoczne są uprawnienia zawodowe?\n4. Czy poziom merytoryczny odpowiada zadeklarowanej ekspertyzie?\n5. Czy są linki do publikacji / profili zewnętrznych autora?\n\nJeśli którekolwiek NIE — Expertise nie jest zaudytowana właściwie.' },
    ],
    quiz: [
      { question: 'Dla porad prawnych (YMYL), jaki rodzaj Expertise jest wymagany?', options: [ { text: 'Nieformalna — lata doświadczenia w pisaniu o prawie', correct: false }, { text: 'Formalna — wpis na listę adwokatów/radców', correct: true }, { text: 'Żadna specjalna — wystarczy dobre copywriting', correct: false }, { text: 'Tylko Experience — bycie stroną w sprawie', correct: false } ], explanation: 'Clear YMYL (prawo) wymaga formalnych uprawnień zawodowych. Nieformalna ekspertyza typu "lata pisania o prawie" nie wystarcza — raterzy zweryfikują uprawnienia, a brak = Low/Lowest.' },
      { question: 'Który z poniższych najbardziej obniży Expertise w oczach Google?', options: [ { text: 'Artykuł bez podpisanego autora', correct: false }, { text: '"dr Anna" przy artykule medycznym, gdzie "dr" to doktorat z literaturoznawstwa', correct: true }, { text: 'Krótki artykuł (500 słów)', correct: false }, { text: 'Brak linków zewnętrznych', correct: false } ], explanation: 'Exaggerated expertise — wprowadzające w błąd claims o kwalifikacjach — to sygnał Low (sekcja 5.6 SQRG). "Dr" przy medycznym artykule sugeruje medycynę, nie literaturoznawstwo.' },
      { question: 'Dla recenzji konsumenckiej robota kuchennego — co jest ważniejsze?', options: [ { text: 'Formalna ekspertyza kulinarna (dyplom szkoły gastronomicznej)', correct: false }, { text: 'Experience — używanie tego robota przez kilka tygodni', correct: true }, { text: 'Authoritativeness — popularność autora w niszy', correct: false }, { text: 'Trust — brak konfliktu interesów', correct: false } ], explanation: 'Dla recenzji produktu konsumenckiego — Experience (faktyczne używanie) jest zazwyczaj ważniejsze niż formalna Expertise. Użytkownik szukający recenzji chce perspektywy osoby, która używała produktu w realnych warunkach.' },
      { question: 'Serwis medyczny deklaruje "Treści weryfikowane przez lekarzy" w stopce, ale przy konkretnych artykułach nie ma podpisu lekarza. Jaka ocena Expertise?', options: [ { text: 'Wysoka — deklaracja wystarcza', correct: false }, { text: 'Niska — deklaracja bez widocznej weryfikacji per artykuł', correct: true }, { text: 'Średnia — zależy od branży', correct: false }, { text: 'Nieaudytowalna', correct: false } ], explanation: 'Ogólna deklaracja "weryfikowane prawnie" lub "przez lekarzy" bez widocznego podpisu przy konkretnych artykułach to sygnał niewystarczającej Expertise. Fix: imienna weryfikacja z datą przy każdym artykule.' },
    ],
  },
  {
    id: 'authoritativeness', number: '05', title: 'Authoritativeness — autorytet w niszy', subtitle: 'Jak mierzyć i budować', duration: '18 min',
    sections: [
      { type: 'heading', content: 'Definicja Authoritativeness' },
      { type: 'paragraph', content: 'Authoritativeness to stopień, w którym autor lub strona jest uznawany za "go-to source" w danym temacie. To pytanie: "do kogo poszlibyśmy po wiarygodną informację w tej sprawie?".' },
      { type: 'callout', style: 'quote', label: 'Z wytycznych SQRG (sekcja 3.4)', content: '"While most topics do not have one official, Authoritative website or content creator, when they do, that website or content creator is often among the most reliable and trustworthy sources."' },
      { type: 'heading', content: 'Nie każdy temat ma authoritative source' },
      { type: 'paragraph', content: 'To ważne rozróżnienie: dla niektórych tematów istnieje jedno, jednoznaczne, autorytatywne źródło (np. GOV.PL dla wniosku paszportowego). Dla innych — kilka uznanych autorytetów (np. onkologia: PTOK, NICE, NCI). Dla wielu — setki równorzędnych źródeł.' },
      { type: 'row-list', items: [
        { label: 'Ultimate authority', value: 'GOV.PL dla paszportów, ZUS dla emerytury, NBP dla kursów walut' },
        { label: 'Recognized authorities', value: 'WHO, PTK, Ministerstwo Zdrowia — kilka uznanych dla tematu medycznego' },
        { label: 'Industry leaders', value: 'Moz, Ahrefs, Semrush — uznani w niszy SEO' },
        { label: 'Local authority', value: 'Lokalna restauracja ma autorytet własnych godzin otwarcia' },
        { label: 'No single authority', value: 'Recenzje restauracji — żadna pojedyncza strona nie jest autorytetem' },
      ] },
      { type: 'heading', content: 'Sygnały Authoritativeness' },
      { type: 'paragraph', content: 'Authoritativeness w dużej mierze dzieje się poza twoją stroną — to, jak cię widzą inni. Sygnały do audytu:' },
      { type: 'bullets', items: [
        'Rozpoznawalność marki w niszy (ankieta, Google Trends, share of voice)',
        'Wzmianki w branżowych mediach (bez względu na link — sam mention buduje autorytet)',
        'Linki z autorytatywnych witryn (organizacje, uczelnie, ministerstwa, renomowane media)',
        'Wystąpienia autora na branżowych konferencjach, podcastach',
        'Nagrody, wyróżnienia, certyfikacje branżowe — widoczne i weryfikowalne',
        'Cytowania w pracach naukowych / publikacjach',
        'Dla lokalnego biznesu: lokalne media, silne GBP, lokalne rankingi',
      ] },
      { type: 'heading', content: 'Authoritativeness w Local SEO' },
      { type: 'paragraph', content: 'Lokalny biznes ma własną wersję autorytetu. Restauracja na osiedlu jest ultimate authority dla własnych godzin otwarcia i menu — nawet Google Maps powinien tam kierować. Dla fraz lokalnych ("pizzeria warszawa ursynów") autorytet lokalny > autorytet ogólny.' },
      { type: 'callout', style: 'example', label: 'Przykład: budowanie autorytetu lokalnego', content: 'Gabinet fizjoterapii w Rzeszowie. Co buduje autorytet lokalny: (1) Google Business Profile kompletny, z 150+ recenzjami i aktywnymi odpowiedziami, (2) wzmianki w rzeszowskich mediach (Nowiny, Sądeczanin), (3) obecność w lokalnych katalogach (Zoom, Dober Medyk), (4) artykuły lokalne ("jak pomagamy sportowcom ze Stali Rzeszów"), (5) udział w lokalnych wydarzeniach (Dni Rzeszowa, zdrowe festiwale).' },
      { type: 'heading', content: 'Authoritativeness jako proces' },
      { type: 'paragraph', content: 'Authoritativeness jest najwolniejszym do zbudowania filarem E-E-A-T. Trust można wdrożyć w tygodniach (dodać dane firmy, HTTPS, regulamin). Experience można pokazać w miesiącach (case studies, zdjęcia). Authoritativeness wymaga lat — to wynik konsekwentnej obecności, digital PR, eksperckich wypowiedzi, wystąpień.' },
      { type: 'callout', style: 'protip', label: 'Pro tip: roadmapa Authoritativeness', content: 'Dla każdego klienta zaplanuj 2-3 letnią strategię budowania autorytetu: (1) rok 1 — eksperckie artykuły gościnne w 5-10 branżowych mediach, (2) rok 1-2 — wystąpienia autora w 10+ podcastach, webinarach, konferencjach, (3) rok 2 — publikacja własnych danych/badań (digital PR), (4) rok 2-3 — uczestnictwo w branżowych radach, jury konkursów. To nie "link building" — to budowanie realnej reputacji.' },
    ],
    quiz: [
      { question: 'Które z poniższych jest ultimate authority (jedyne autorytatywne źródło)?', options: [ { text: 'Blog SEO-wca o SEO', correct: false }, { text: 'Wikipedia o historii Polski', correct: false }, { text: 'GOV.PL o wymaganiach na paszport', correct: true }, { text: 'Forum hydraulików o usterce kotła', correct: false } ], explanation: 'GOV.PL dla wniosku paszportowego to ultimate authority — jest to oficjalne, jednoznaczne źródło. Nie ma "lepszego" miejsca po tę informację.' },
      { question: 'Co NAJBARDZIEJ buduje Authoritativeness?', options: [ { text: 'Dużo artykułów na własnym blogu', correct: false }, { text: 'Regularne publikowanie', correct: false }, { text: 'Wzmianki i cytowania w autorytatywnych branżowych źródłach', correct: true }, { text: 'SEO techniczne (schema, sitemap)', correct: false } ], explanation: 'Authoritativeness buduje się głównie POZA własną stroną — to co mówią o tobie inni. Wzmianki w branżowych mediach, cytowania, linki z autorytatywnych źródeł, wystąpienia.' },
      { question: 'Dla lokalnego biznesu (fizjoterapeuta w Rzeszowie), co buduje autorytet lokalny?', options: [ { text: 'Google Business Profile + lokalne media + lokalne katalogi', correct: true }, { text: 'Linki z międzynarodowych serwisów medycznych', correct: false }, { text: 'Długie artykuły SEO o fizjoterapii', correct: false }, { text: 'Reklamy Google Ads', correct: false } ], explanation: 'Autorytet lokalny wymaga lokalnych sygnałów: GBP kompletny i aktywny, wzmianki w lokalnych mediach, obecność w lokalnych katalogach, udział w lokalnych wydarzeniach.' },
      { question: 'Jak długo trwa typowo zbudowanie Authoritativeness dla nowego klienta?', options: [ { text: '2-3 miesiące przy intensywnym link buildingu', correct: false }, { text: '6 miesięcy przy systematycznej pracy', correct: false }, { text: '2-3 lata konsekwentnej pracy nad digital PR', correct: true }, { text: 'Tydzień przy odpowiednim budżecie', correct: false } ], explanation: 'Authoritativeness to najwolniejszy filar E-E-A-T. Trust można wdrożyć w tygodniach, Experience pokazać w miesiącach, ale realny autorytet w niszy wymaga lat systematycznego budowania.' },
    ],
  },
  {
    id: 'ymyl', number: '06', title: 'E-E-A-T w YMYL', subtitle: 'Wyższy rygor i kiedy Experience > Expertise', duration: '22 min',
    sections: [
      { type: 'heading', content: 'YMYL recap' },
      { type: 'paragraph', content: 'YMYL (Your Money or Your Life) to tematy, na których niedokładna treść może wyrządzić realną szkodę. W SQRG 2025 YMYL został rozbity na cztery kategorie:' },
      { type: 'grid', items: [
        { label: 'Health or Safety', items: ['Zdrowie, leki, terapie, ciąża, BHP, bezpieczeństwo online/offline'] },
        { label: 'Financial Security', items: ['Inwestowanie, kredyty, emerytury, podatki, ubezpieczenia'] },
        { label: 'Government, Civics & Society', items: ['Wybory, prawa obywatelskie, instytucje publiczne'] },
        { label: 'Other', items: ['Welfare społeczeństwa, ważne decyzje życiowe (emigracja, adopcja)'] },
      ] },
      { type: 'heading', content: 'Wyższy rygor E-E-A-T' },
      { type: 'paragraph', content: 'Dla YMYL każdy filar E-E-A-T jest oceniany rygorystyczniej. Sensowne bo konsekwencje błędu są poważniejsze: zła porada o lekach może zaszkodzić zdrowiu, zła porada inwestycyjna może pozbawić oszczędności, zła porada dot. wyborów może wpłynąć na instytucje społeczne.' },
      { type: 'heading', content: 'Experience vs Expertise dla YMYL — kiedy co' },
      { type: 'paragraph', content: 'To kluczowe rozróżnienie z sekcji 3.4.1 SQRG. Dla YMYL niektóre treści wymagają ekspertyzy (formalnej), inne mogą opierać się o osobiste doświadczenie.' },
      { type: 'ymyl-matrix', items: [
        { topic: 'Sen w ciąży', experience: 'Jak użyć poduszek do wygodnego snu (od pacjentek)', expertise: 'Jakie leki nasenne są bezpieczne (od lekarza)' },
        { topic: 'Leczenie raka', experience: 'Forum pacjentów radzących sobie z leczeniem', expertise: 'Opcje leczenia i przewidywana długość życia (onkolog)' },
        { topic: 'Podatki', experience: 'Humorystyczne wideo o frustracji z PITem', expertise: 'Jak wypełnić konkretne pola formularza (księgowa)' },
        { topic: 'Wybory', experience: 'Dlaczego głosowanie w lokalnych wyborach jest ważne (obywatel)', expertise: 'Kto może głosować i jak się zarejestrować (urzędnik)' },
        { topic: 'Inwestowanie', experience: 'Recenzja platformy inwestycyjnej od użytkownika', expertise: 'Jak alokować portfel emerytalny (doradca KNF)' },
      ] },
      { type: 'callout', style: 'warning', label: 'Kluczowa reguła', content: 'Nie mieszaj life experience i eksperckich porad w jednym URL-u. Dla YMYL osobne strony dla aspektu doświadczeniowego (forum, reviews, blog pacjenta) vs eksperckiego (poradnik lekarza). Każdy celuje w inny intent — i Google to rozumie.' },
      { type: 'heading', content: 'YMYL Light — niuansowe przypadki' },
      { type: 'paragraph', content: 'Nie każda strona w branży medycznej to clear YMYL. "Jak spać wygodnie z poduszkami w trzecim trymestrze" to light YMYL (porada dot. komfortu). "Leki bezpieczne w ciąży" to clear YMYL (decyzja medyczna). Audytuj inaczej — clear YMYL wymaga eksperta, light YMYL może opierać się o doświadczenie pacjentów.' },
      { type: 'callout', style: 'example', label: 'Case: sieć gabinetów medycyny estetycznej', content: 'Klient prowadzi sieć gabinetów. Blog ma 400 artykułów: część o zabiegach medycznych (clear YMYL — wymaga lekarza), część o kosmetyce (light YMYL — wystarczy doświadczenie), część o lifestyle (nie-YMYL). Fix: audyt per artykuł, rozdzielenie autorstwa — lekarze podpisują clear YMYL, kosmetyczki z doświadczeniem podpisują light YMYL, lifestyle content bez medycznego spinu.' },
      { type: 'heading', content: 'Accuracy dla YMYL' },
      { type: 'paragraph', content: 'Dla YMYL Trust rozszerza się o specyficzny wymóg — zgodność z well-established expert consensus. Nie tylko "poprawne fakty" — treść musi być zgodna z aktualnym konsensusem ekspertów w dziedzinie (WHO, PTK, KNF, etc.).' },
      { type: 'bullets', items: [
        'Cytowane źródła z autorytatywnych instytucji (WHO, EMA, KNF, NBP, TK)',
        'Data ostatniej aktualizacji widoczna — YMYL wymaga częstej aktualizacji',
        'Disclaimer "ta treść nie zastępuje porady lekarza/prawnika/doradcy"',
        'Przeciwwskazania i ryzyka wspomniane (nie jednostronna narracja)',
        'Dla branż regulowanych — aktualny stan prawny/medyczny',
      ] },
      { type: 'callout', style: 'protip', label: 'Pro tip: klasyfikacja YMYL', content: 'Przed rozpoczęciem audytu każdego URL-a zadaj pytanie: "czy błędna informacja na tej stronie może bezpośrednio zaszkodzić czytelnikowi lub społeczeństwu?". Jeśli tak → clear YMYL, najwyższy rygor. Jeśli raczej nie, ale temat dotyka obszaru YMYL → light YMYL, podwyższony rygor. Jeśli nie → zwykły content, zwykły rygor.' },
    ],
    quiz: [
      { question: 'Dla artykułu "jak spać wygodnie z poduszkami w trzecim trymestrze" — jaki rodzaj E-E-A-T jest najważniejszy?', options: [ { text: 'Formalna Expertise lekarza ginekologa', correct: false }, { text: 'Experience — od pacjentek które przez to przeszły', correct: true }, { text: 'Authoritativeness medycznej instytucji', correct: false }, { text: 'Żaden — to nie YMYL', correct: false } ], explanation: 'To light YMYL — porada dot. komfortu, nie decyzji medycznej. Experience pacjentek jest kluczowe.' },
      { question: 'Która z poniższych par TEMAT + AUTOR jest PROBLEMATYCZNA?', options: [ { text: '"Rak jelita grubego — objawy" / onkolog', correct: false }, { text: '"Jak radzę sobie z leczeniem onkologicznym" / pacjent po chemioterapii', correct: false }, { text: '"Leki onkologiczne — interakcje" / pacjent po chemioterapii', correct: true }, { text: '"Rak jelita grubego — objawy" / ordynator onkologii', correct: false } ], explanation: 'Opcja C to clear YMYL Health — "leki onkologiczne, interakcje" to decyzja medyczna wymagająca Expertise lekarza/farmaceuty.' },
      { question: 'Ile kategorii YMYL wymienia SQRG 2025?', options: [ { text: '2 (finansowe i zdrowotne)', correct: false }, { text: '3 (finansowe, zdrowotne, prawne)', correct: false }, { text: '4 (Health/Safety, Financial, Government/Civics/Society, Other)', correct: true }, { text: '1 (YMYL jest binarne)', correct: false } ], explanation: 'SQRG 2025 dzieli YMYL na 4 kategorie: Health or Safety, Financial Security, Government/Civics & Society, Other.' },
      { question: 'Co jest rozszerzeniem Trust specyficznym dla YMYL?', options: [ { text: 'Wymóg HTTPS', correct: false }, { text: 'Większa liczba backlinków', correct: false }, { text: 'Zgodność z well-established expert consensus', correct: true }, { text: 'Dłuższa treść', correct: false } ], explanation: 'Dla YMYL Trust wymaga nie tylko poprawnych faktów, ale zgodności z aktualnym konsensusem ekspertów w dziedzinie (WHO, PTK, KNF, TK).' },
    ],
  },
  {
    id: 'audit', number: '07', title: 'E-E-A-T w audycie', subtitle: 'Praktyczna checklista i matryca priorytetów', duration: '25 min',
    sections: [
      { type: 'heading', content: 'Kolejność audytu E-E-A-T' },
      { type: 'paragraph', content: 'Właściwa kolejność audytu to klucz do efektywności. Jeśli zaczniesz od niewłaściwego filaru, możesz godzinami doszlifowywać elementy, które i tak nie naprawią problemu.' },
      { type: 'audit-flow', steps: [
        { n: 1, title: 'Lowest Triggers', desc: 'Sprawdź czy nie ma dyskwalifikujących sygnałów (harmful, deceptive, malicious, scaled AI). Jeśli TAK — napraw najpierw.' },
        { n: 2, title: 'YMYL Classification', desc: 'Określ czy i jak bardzo strona jest YMYL. To determinuje rygor dalszej oceny.' },
        { n: 3, title: 'Trust', desc: 'Cztery wymiary: bezpieczeństwo, tożsamość, obsługa, dokładność. Bez Trust — reszta nie ma znaczenia.' },
        { n: 4, title: 'E-E-A-T per typ strony', desc: 'Dla każdego URL określ który filar jest priorytetowy.' },
        { n: 5, title: 'Off-page', desc: 'Reputacja, linki, wzmianki, cytowania w autorytatywnych źródłach.' },
        { n: 6, title: 'Quick wins vs Long-term', desc: 'Podziel rekomendacje na możliwe do wdrożenia w miesiąc vs wymagające lat.' },
      ] },
      { type: 'heading', content: 'Matryca priorytetów E-E-A-T per typ strony' },
      { type: 'paragraph', content: 'Dla każdego typu strony inny filar jest "bramkowy" — bez którego reszta nie pomoże. Używaj tej matrycy jako skrótu:' },
      { type: 'priority-matrix', items: [
        { type: 'E-commerce', priority: 'Trust', why: 'Brak Trust = user nie kupi nawet przy świetnym produkcie' },
        { type: 'Blog YMYL medyczny', priority: 'Expertise', why: 'Bez formalnej ekspertyzy = Low/Lowest' },
        { type: 'Porady prawne', priority: 'Expertise', why: 'Uprawnienia zawodowe weryfikują poprawność' },
        { type: 'Forum pacjentów (YMYL)', priority: 'Experience', why: 'Wartość leży w doświadczeniu przeżywanym' },
        { type: 'Oficjalna strona urzędu', priority: 'Authority', why: 'To JEST źródło — reszta musi się do niego odwołać' },
        { type: 'Blog hobbystyczny', priority: 'Experience', why: 'Autentyczna pasja + nieformalna wiedza' },
        { type: 'Lokalny biznes usługowy', priority: 'Trust', why: 'Reputacja lokalna + transparentność' },
        { type: 'Review produktów', priority: 'Experience', why: 'Czy recenzent rzeczywiście używał produktu' },
        { type: 'SaaS B2B', priority: 'Trust', why: 'Trust techniczny + autorytet w kategorii' },
        { type: 'News site', priority: 'Authority', why: 'Reputacja dziennikarska + accuracy' },
      ] },
      { type: 'heading', content: 'Case study: producent stolarki otworowej' },
      { type: 'paragraph', content: 'Klient: producent okien i drzwi z Podkarpacia. Zobaczmy jak audyt E-E-A-T wygląda w praktyce dla każdego filara.' },
      { type: 'case-study', items: [
        { filar: 'Trust', status: 'OK z małymi fix', details: 'HTTPS ✓, dane firmy ✓, regulamin ✓, RODO ✓. Fix: dodać widoczną politykę reklamacji produktu, oznaczyć warunki gwarancji.' },
        { filar: 'Experience', status: 'Mocny', details: '27 lat na rynku, 14 000 realizacji, galeria z własnymi zdjęciami z montaży, case studies z Osiedla XXV-lecia i willi w Bieszczadach.' },
        { filar: 'Expertise', status: 'Średni', details: 'Brak widocznego autora przy artykułach blogowych. Fix: podpisać każdy artykuł imiennie, dodać krótkie bio z latami doświadczenia.' },
        { filar: 'Authority', status: 'Słabszy', details: 'Lokalnie: GBP aktywny (158 opinii), dobre. Ogólnie: brak wzmianek w branżowych mediach. Fix: plan digital PR na 18 miesięcy.' },
      ] },
      { type: 'callout', style: 'protip', label: 'Pro tip: priorytetyzacja rekomendacji', content: 'Po audycie podziel rekomendacje na 3 kategorie:\n\n• QUICK WINS (1-4 tygodnie): Trust fixes, dodanie autorów do bloga, widoczność kontaktu\n• MEDIUM TERM (1-6 miesięcy): rozbudowa bio, case studies, polepszenie GBP\n• STRATEGIC (6-24 miesięcy): digital PR, konferencje, publikacje branżowe' },
      { type: 'heading', content: 'Komunikacja z klientem' },
      { type: 'paragraph', content: 'Przy komunikowaniu wyników audytu klientowi — zawsze referencuj sekcje SQRG. To buduje zaufanie do agencji i pokazuje, że rekomendacje nie są "naszą opinią", tylko oficjalnymi wytycznymi Google.' },
      { type: 'bullets', items: [
        'Każdy problem → referencja do sekcji SQRG',
        'Przy Lowest triggers — cytuj dokładny fragment wytycznych',
        'Tłumacz różnicę High vs Highest — realistycznie ustawiaj oczekiwania',
        'YMYL audity — zawsze ze wzmianką o wyższym rygorze',
        'Dla niepopularnych rekomendacji — oficjalne źródło jest twoim sojusznikiem',
      ] },
      { type: 'callout', style: 'quote', label: 'Zasada finalna', content: 'SQRG to nie "jeszcze jedno źródło opinii o SEO". To oficjalny dokument Google opisujący, jak oceniana jest jakość. Konsekwentne stosowanie tych wytycznych to różnica między "agencja SEO" a "audytor jakości w oparciu o oficjalne kryteria Google".' },
    ],
    quiz: [
      { question: 'Od czego NAJPIERW zaczyna się audyt E-E-A-T?', options: [ { text: 'Od sprawdzenia E-E-A-T autorów', correct: false }, { text: 'Od Lowest triggers — czy strona nie ma dyskwalifikujących sygnałów', correct: true }, { text: 'Od audytu linkowego', correct: false }, { text: 'Od audytu Core Web Vitals', correct: false } ], explanation: 'Lowest triggers (harmful, deceptive, malicious, scaled AI) to bramka. Jeśli są obecne, cały pozostały audyt E-E-A-T nie pomoże.' },
      { question: 'Dla sklepu e-commerce, który filar E-E-A-T jest najbardziej priorytetowy?', options: [ { text: 'Experience autorów', correct: false }, { text: 'Expertise', correct: false }, { text: 'Trust', correct: true }, { text: 'Authoritativeness', correct: false } ], explanation: 'Dla e-commerce Trust jest bramkowy — bez danych firmy, polityki zwrotów, bezpiecznego procesu zakupu, użytkownik nie kupi.' },
      { question: 'Dla producenta stolarki otworowej z 27-letnią historią i 14 000 realizacji — jak wykorzystać to w E-E-A-T?', options: [ { text: 'Wystarczy dodać do stopki', correct: false }, { text: 'Nie wpływa na E-E-A-T, to tylko historia', correct: false }, { text: 'Eksponować maksymalnie — galeria realizacji, zdjęcia, daty, lokalizacje, nazwiska', correct: true }, { text: 'Ukryć bo "stare firmy wyglądają słabo"', correct: false } ], explanation: 'Długoterminowa historia i duża liczba realizacji to złoto dla Experience. To największa przewaga nad AI-content i zagranicznymi konkurentami.' },
      { question: 'Jak komunikować klientowi niepopularną rekomendację (np. "usuń 400 artykułów AI")?', options: [ { text: 'Nie rekomendować, bo klient się zdenerwuje', correct: false }, { text: 'Zrobić to bez komunikacji', correct: false }, { text: 'Referencja do sekcji 4.6.5 SQRG + cytat — oficjalne źródło jest sojusznikiem', correct: true }, { text: 'Zasugerować tylko zmianę tytułów', correct: false } ], explanation: 'Cytuj konkretną sekcję — to przestaje być "twoja opinia", a staje się "wytyczna Google".' },
    ],
  },
];

// ==========================================================================
// SCORECARD DATA
// ==========================================================================

const SCORECARD_QUESTIONS = {
  trust: { label: 'Trust', weight: 0.40, questions: [
    { q: 'Strona działa na HTTPS z ważnym certyfikatem SSL', weight: 2, fix: 'Wymuś HTTPS, odnów SSL (Let\'s Encrypt za darmo)' },
    { q: 'Pełne dane rejestrowe firmy w stopce (NIP, REGON, adres)', weight: 3, fix: 'Dodaj kompletne dane rejestrowe — to bramka dla e-commerce i YMYL' },
    { q: 'Widoczna polityka zwrotów / reklamacji (dla sklepów) lub SLA (dla usług)', weight: 2, fix: 'Opublikuj jasną politykę — link z głównego menu i stopki' },
    { q: 'Polityka prywatności zgodna z RODO', weight: 2, fix: 'Zaktualizuj polityki prywatności — RODO + szczegóły dot. cookies' },
    { q: 'Strona kontaktowa z co najmniej 2 kanałami (email + telefon)', weight: 2, fix: 'Dodaj widoczny telefon i email w stopce oraz oddzielnej stronie kontakt' },
    { q: 'Regulamin dostępny i aktualny (ostatnia aktualizacja < 18 mies.)', weight: 2, fix: 'Zaktualizuj regulamin z widoczną datą ostatniej zmiany' },
    { q: 'Artykuły mają widoczne daty publikacji i aktualizacji', weight: 1, fix: 'Dodaj daty "opublikowano" i "zaktualizowano" przy każdym artykule' },
    { q: 'Brak dark patterns (ukrytych kosztów, mylących CTA, trudnych do anulowania subskrypcji)', weight: 2, fix: 'Audyt UX pod kątem dark patterns — każdy koszt transparentny przed checkoutem' },
  ] },
  experience: { label: 'Experience', weight: 0.20, questions: [
    { q: 'Galeria realizacji z własnymi zdjęciami (nie stocki, nie zdjęcia producenta)', weight: 3, fix: 'Zacznij robić zdjęcia z każdej realizacji/projektu — to największa przewaga nad AI' },
    { q: 'Case studies z konkretnymi datami, klientami (za zgodą) i mierzalnymi efektami', weight: 2, fix: 'Opublikuj min. 5 case studies z liczbami przed/po' },
    { q: 'Wzmianka o latach doświadczenia lub liczbie zrealizowanych projektów', weight: 2, fix: 'Eksponuj staż — na homepage, w bio, przy artykułach' },
    { q: 'Treści w pierwszej osobie z konkretnymi szczegółami (nie ogólniki)', weight: 2, fix: 'Przepisz ogólnikowe treści na osobiste, konkretne narracje z nazwiskami i datami' },
  ] },
  expertise: { label: 'Expertise', weight: 0.20, questions: [
    { q: 'Każdy artykuł ma podpisanego autora (imię + nazwisko, nie "zespół redakcyjny")', weight: 2, fix: 'Dodaj imienny podpis autora przy każdym URL' },
    { q: 'Strona "O autorze" z rozbudowanym bio i kwalifikacjami', weight: 2, fix: 'Zbuduj strony /o-autorze/imie-nazwisko z credentials, doświadczeniem, publikacjami' },
    { q: 'Dla YMYL: widoczne uprawnienia zawodowe (PWZ, wpis ORA, licencja KNF)', weight: 3, fix: 'Eksponuj uprawnienia — numer PWZ/ORA przy każdym YMYL artykule + w bio' },
    { q: 'Linki do zewnętrznych profili autora (LinkedIn, publikacje, portfolia)', weight: 1, fix: 'Dodaj linki do LinkedIn i publikacji w bio — verification trail' },
  ] },
  authoritativeness: { label: 'Authority', weight: 0.20, questions: [
    { q: 'Wzmianki marki w branżowych mediach w ciągu ostatnich 12 miesięcy', weight: 3, fix: 'Plan digital PR: 1-2 wzmianki miesięcznie w mediach branżowych' },
    { q: 'Kompletny, aktywny Google Business Profile (dla local) lub silna reputacja online', weight: 2, fix: 'Pełne wypełnienie GBP, cotygodniowe posty, odpowiedzi na wszystkie opinie' },
    { q: 'Nagrody, wyróżnienia lub certyfikacje branżowe (widoczne na stronie)', weight: 2, fix: 'Aplikuj o 1-2 branżowe nagrody/certyfikaty rocznie; eksponuj zdobyte' },
    { q: 'Wystąpienia autora/firmy na branżowych konferencjach, podcastach, webinarach', weight: 2, fix: 'Cel: 3-5 wystąpień rocznie; outreach do podcastów w niszy' },
  ] },
};

function calculateScorecard(answers) {
  const pillars = Object.keys(SCORECARD_QUESTIONS);
  const scores = {};
  const recommendations = [];
  pillars.forEach(pk => {
    const p = SCORECARD_QUESTIONS[pk];
    const maxW = p.questions.reduce((a, q) => a + q.weight, 0);
    let w = 0;
    p.questions.forEach((q, i) => {
      const v = answers[`${pk}-${i}`];
      if (v === 'yes') w += q.weight;
      else if (v === 'partial') w += q.weight * 0.5;
      else if (v === 'no') recommendations.push({ pillar: p.label, weight: q.weight, fix: q.fix, question: q.q });
    });
    scores[pk] = Math.round((w / maxW) * 100);
  });
  const overall = Math.round(pillars.reduce((a, k) => a + scores[k] * SCORECARD_QUESTIONS[k].weight, 0));
  recommendations.sort((a, b) => b.weight - a.weight);
  return { scores, overall, recommendations: recommendations.slice(0, 6) };
}

function getScoreInterpretation(overall) {
  if (overall >= 85) return { label: 'Highest / High', desc: 'Solidny fundament E-E-A-T. Skupić się na dalszej budowie autorytetu.', type: 'good' };
  if (overall >= 65) return { label: 'High / Medium', desc: 'Dobra baza z przestrzenią do wzrostu. Adresuj 2-3 największe gaps.', type: 'good' };
  if (overall >= 40) return { label: 'Medium / Low', desc: 'Znaczne luki. Priorytet: Trust i Expertise przed dalszym content marketingiem.', type: 'warn' };
  return { label: 'Low / Lowest', desc: 'Krytyczne braki. Najpierw napraw fundament — HTTPS, dane firmy, autorzy, kontakt.', type: 'bad' };
}

// ==========================================================================
// ROADMAP DATA
// ==========================================================================

const INDUSTRIES = [
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'local', label: 'Local service (B2C)' },
  { id: 'ymyl', label: 'YMYL (medical/legal/finance)' },
  { id: 'saas', label: 'SaaS / B2B' },
  { id: 'publisher', label: 'Content publisher / media' },
];
const BUDGETS = [
  { id: 'micro', label: '< 2 000 PLN/mc' },
  { id: 'small', label: '2 000 – 5 000 PLN/mc' },
  { id: 'mid', label: '5 000 – 15 000 PLN/mc' },
  { id: 'high', label: '> 15 000 PLN/mc' },
];
const LEVELS = [
  { id: 'new', label: 'Nowa marka / brak obecności' },
  { id: 'emerging', label: 'Mamy trochę obecności w niszy' },
  { id: 'established', label: 'Rozpoznawalni, skalujemy' },
];
const SCOPES = [
  { id: 'local', label: 'Lokalny (miasto/region)' },
  { id: 'national', label: 'Krajowy (Polska)' },
  { id: 'intl', label: 'Międzynarodowy' },
];

function generateRoadmap({ industry, budget, level, scope }) {
  const isLocal = scope === 'local' || industry === 'local';
  const isEstablished = level === 'established';
  const tier = budget === 'micro' ? 1 : budget === 'small' ? 2 : budget === 'mid' ? 3 : 4;

  const pool = [
    { q: 1, cat: 'foundation', name: 'Audyt E-E-A-T bazowy', desc: 'Scorecard + rekomendacje per URL', cost: '3-8k PLN jednorazowo', minTier: 1, always: true },
    { q: 1, cat: 'foundation', name: 'Strony "O nas", "O autorze", Kontakt', desc: 'Pełna tożsamość firmy i autorów — fundament Trust', cost: '2-5k PLN', minTier: 1, always: true },
    { q: 1, cat: 'local', name: 'Optymalizacja Google Business Profile', desc: 'Kompletne wypełnienie, kategorie, zdjęcia, cotygodniowe posty', cost: '500-1500 PLN/mc', minTier: 1, when: () => isLocal },
    { q: 1, cat: 'content', name: 'Podpisy autorskie przy wszystkich artykułach', desc: 'Retroaktywne dodanie autorów do archiwum bloga', cost: '1-3k PLN', minTier: 1, always: true },
    { q: 2, cat: 'experience', name: 'Galeria realizacji / case studies', desc: '10-20 case studies z datami, klientami, efektami', cost: '5-15k PLN', minTier: 2, when: () => ['local', 'ecommerce', 'saas'].includes(industry) },
    { q: 2, cat: 'expertise', name: 'Rozbudowa bio autorów z credentials', desc: 'Każdy autor: pełne CV, uprawnienia, publikacje, linki do LinkedIn', cost: '2-4k PLN', minTier: 1, always: true },
    { q: 2, cat: 'local', name: 'Kampania zbierania opinii GBP', desc: 'Cel: 50+ opinii do końca kwartału, system follow-up po usłudze', cost: '1-2k PLN', minTier: 1, when: () => isLocal },
    { q: 2, cat: 'pr', name: 'Pierwszy artykuł ekspercki w branżowym medium', desc: 'Outreach do 10 mediów branżowych, 1 publikacja', cost: '2-5k PLN', minTier: 2 },
    { q: 2, cat: 'content', name: 'Topical authority — hub and spoke', desc: 'Pillar + 8-12 spokes w głównej kategorii', cost: '8-20k PLN', minTier: 3 },
    { q: 3, cat: 'pr', name: 'Wystąpienie w podcaście branżowym', desc: 'Outreach do 15 podcastów, 1-2 publikacje', cost: '1-3k PLN outreach', minTier: 2 },
    { q: 3, cat: 'content', name: 'Własne dane / mini-badanie branżowe', desc: 'Ankieta w niszy + raport PDF — link magnet', cost: '5-15k PLN', minTier: 3 },
    { q: 3, cat: 'local', name: 'Obecność w lokalnych katalogach i mediach', desc: 'Min. 10 lokalnych katalogów NAP + 1 lokalny artykuł PR', cost: '2-4k PLN', minTier: 1, when: () => isLocal },
    { q: 3, cat: 'expertise', name: 'Redakcyjna weryfikacja treści YMYL', desc: 'Każdy YMYL artykuł podpisany imiennie przez specjalistę z datą', cost: '3-8k PLN setup', minTier: 2, when: () => industry === 'ymyl' },
    { q: 3, cat: 'experience', name: 'Video content z autorami "w akcji"', desc: '3-5 krótkich video demonstracji / pracy zespołu', cost: '5-10k PLN', minTier: 3 },
    { q: 4, cat: 'pr', name: 'Aplikacja o 1-2 branżowe nagrody', desc: 'Identyfikacja trafnych konkursów + profesjonalne aplikacje', cost: '2-5k PLN', minTier: 2 },
    { q: 4, cat: 'content', name: 'Aktualizacja top-10 artykułów', desc: 'Odświeżenie najważniejszych treści — świeżość dla YMYL/evergreen', cost: '3-6k PLN', minTier: 2, always: true },
    { q: 4, cat: 'pr', name: 'Digital PR — outreach za własnymi danymi', desc: 'Promocja Q3 badania do 50+ mediów', cost: '5-12k PLN', minTier: 3 },
    { q: 4, cat: 'foundation', name: 'Przegląd E-E-A-T po pierwszym roku', desc: 'Drugi scorecard — porównanie z baseline Q1', cost: '2-4k PLN', minTier: 1, always: true },
    { q: 5, cat: 'pr', name: 'Wystąpienie na branżowej konferencji', desc: 'Aplikacja CFP do 5-10 wydarzeń, cel: 2 wystąpienia w roku 2', cost: '3-10k PLN / wydarzenie', minTier: 2 },
    { q: 5, cat: 'content', name: 'Rozbudowa topical authority — kolejne klastry', desc: '2-3 nowe hub-and-spoke klastry', cost: '10-25k PLN', minTier: 3 },
    { q: 5, cat: 'experience', name: 'User-generated content — program opinii', desc: 'System zbierania recenzji wideo od klientów', cost: '3-8k PLN', minTier: 2, when: () => ['ecommerce', 'local'].includes(industry) },
    { q: 6, cat: 'pr', name: 'Regularne artykuły gościnne — 1/miesiąc', desc: 'System produkcji guest posts w 3-5 stałych mediach branżowych', cost: '3-6k PLN/mc', minTier: 3 },
    { q: 6, cat: 'expertise', name: 'Publikacja książki / obszernego poradnika', desc: 'E-book lub poradnik branżowy jako definitive resource', cost: '15-40k PLN', minTier: 4, when: () => isEstablished || tier >= 3 },
    { q: 7, cat: 'pr', name: 'Drugie własne badanie / raport roczny', desc: 'Budowa serii — "raport X 2026", cykliczność tworzy autorytet', cost: '8-20k PLN', minTier: 3 },
    { q: 7, cat: 'pr', name: 'Udział w jury / komisjach branżowych', desc: 'Outreach do organizatorów konkursów i organizacji branżowych', cost: '1-2k PLN outreach', minTier: 3, when: () => isEstablished || tier >= 3 },
    { q: 8, cat: 'foundation', name: 'Kompleksowy re-audyt E-E-A-T', desc: 'Pełne porównanie: baseline → po 24 mies. Rekomendacje na rok 3.', cost: '5-10k PLN', minTier: 2, always: true },
    { q: 8, cat: 'content', name: 'Konsolidacja: usuwanie thin/duplicate content', desc: 'Audyt per URL — usuwanie tego co obniża średnią jakość domeny', cost: '5-15k PLN', minTier: 2, always: true },
  ];

  const quarters = [1,2,3,4,5,6,7,8].map(n => ({
    q: n,
    items: pool.filter(a => a.q === n).filter(a => a.minTier <= tier).filter(a => a.always || !a.when || a.when()),
  }));

  const kpis = [
    { q: 2, goal: 'Trust score > 80, wszystkie artykuły podpisane' },
    { q: 4, goal: '1 publikacja PR, 5 case studies, +50 opinii GBP (jeśli lokal)' },
    { q: 6, goal: '3-4 publikacje PR, 1 wystąpienie konferencyjne, topical authority w głównej kategorii' },
    { q: 8, goal: 'Overall E-E-A-T > 85, rozpoznawalność w niszy, 10+ mentions/rok' },
  ];

  return { quarters, kpis };
}

// ==========================================================================
// PERSISTENCE
// ==========================================================================

const STORAGE_KEY = 'eeat-course-progress-v3';

async function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { completedModules: [], quizScores: {}, certificateName: '', scorecardResult: null };
}
async function saveProgress(p) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
}

// ==========================================================================
// NAVIGATION HISTORY
// ==========================================================================

function useNavigation() {
  const [history, setHistory] = useState([{ screen: 'landing' }]);
  const current = history[history.length - 1];
  const canGoBack = history.length > 1;

  const navigate = (state) => {
    setHistory(h => [...h, state]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };
  const back = () => {
    setHistory(h => h.length > 1 ? h.slice(0, -1) : h);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };
  const home = () => {
    setHistory([{ screen: 'landing' }]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };
  const replace = (state) => {
    setHistory(h => [...h.slice(0, -1), state]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  return { current, canGoBack, navigate, back, home, replace };
}

// ==========================================================================
// MAIN
// ==========================================================================

export default function EEATCourse() {
  const nav = useNavigation();
  const [progress, setProgress] = useState({ completedModules: [], quizScores: {}, certificateName: '', scorecardResult: null });

  useEffect(() => {
    let mounted = true;
    loadProgress().then(p => { if (mounted && p) setProgress(p); }).catch(() => {});
    return () => { mounted = false; };
  }, []);
  useEffect(() => { saveProgress(progress).catch(() => {}); }, [progress]);

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A', color: '#FAFAFA', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      <GlobalStyles />

      {nav.current.screen === 'landing' && (
        <Landing
          progress={progress}
          onStartModule={(idx) => nav.navigate({ screen: 'module', moduleIdx: idx })}
          onScorecard={() => nav.navigate({ screen: 'scorecard', view: 'form', answers: {}, url: '' })}
          onRoadmap={() => nav.navigate({ screen: 'roadmap', view: 'form', config: {} })}
          onCertificate={() => nav.navigate({ screen: 'certificate' })}
          onReset={async () => {
            if (confirm('Zresetować cały kurs?')) {
              const fresh = { completedModules: [], quizScores: {}, certificateName: '', scorecardResult: null };
              setProgress(fresh);
              await saveProgress(fresh);
            }
          }}
        />
      )}

      {nav.current.screen === 'module' && (
        <ModuleView
          moduleIdx={nav.current.moduleIdx}
          progress={progress}
          setProgress={setProgress}
          onBack={nav.back}
          onHome={nav.home}
          onNextModule={(idx) => nav.navigate({ screen: 'module', moduleIdx: idx })}
          onCertificate={() => nav.navigate({ screen: 'certificate' })}
        />
      )}

      {nav.current.screen === 'certificate' && (
        <Certificate progress={progress} setProgress={setProgress} onBack={nav.back} onHome={nav.home} />
      )}

      {nav.current.screen === 'scorecard' && (
        <ScorecardFlow
          state={nav.current}
          setState={nav.replace}
          navigate={nav.navigate}
          onBack={nav.back}
          onHome={nav.home}
          setProgress={setProgress}
          progress={progress}
        />
      )}

      {nav.current.screen === 'roadmap' && (
        <RoadmapFlow
          state={nav.current}
          setState={nav.replace}
          navigate={nav.navigate}
          onBack={nav.back}
          onHome={nav.home}
        />
      )}
    </div>
  );
}

// ==========================================================================
// GLOBAL STYLES
// ==========================================================================

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      * { box-sizing: border-box; }
      body { margin: 0; background: #0A0A0A; color: #FAFAFA; }
      .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      .mono-label { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #888; }
      .bg-base { background: #0A0A0A; }
      .bg-card { background: #141414; }
      .bg-elev { background: #1F1F1F; }
      .bg-hover:hover { background: #1A1A1A; }
      .border-default { border-color: #2A2A2A; }
      .border-subtle { border-color: #1F1F1F; }
      .text-primary { color: #FAFAFA; }
      .text-muted { color: #888888; }
      .text-dim { color: #555555; }
      .text-accent { color: #D4FF00; }
      .bg-accent { background: #D4FF00; color: #0A0A0A; }
      .border-accent { border-color: #D4FF00; }
      .text-danger { color: #FF3366; }
      .border-danger { border-color: #FF3366; }
      .bg-danger-soft { background: rgba(255, 51, 102, 0.08); }
      .bg-accent-soft { background: rgba(212, 255, 0, 0.08); }
      .hover-accent:hover { border-color: #D4FF00; }
      .hover-accent-text:hover { color: #D4FF00; }
      .glow-accent { box-shadow: 0 0 40px rgba(212, 255, 0, 0.15); }
      .glow-accent-strong { box-shadow: 0 0 60px rgba(212, 255, 0, 0.35); }
      input, button, textarea { font-family: inherit; }
      ::selection { background: #D4FF00; color: #0A0A0A; }
      @media print { body { background: white !important; color: black !important; } .no-print { display: none !important; } }
    `}</style>
  );
}

// ==========================================================================
// HEADER (back button)
// ==========================================================================

function Header({ onBack, onHome, showHome = true, label = 'Wstecz' }) {
  return (
    <div className="no-print sticky top-0 z-30 backdrop-blur-lg" style={{ background: 'rgba(10, 10, 10, 0.8)', borderBottom: '1px solid #1F1F1F' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <button onClick={onBack} className="group inline-flex items-center gap-2 text-sm text-muted hover-accent-text transition">
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition" />
          <span>{label}</span>
        </button>
        {showHome && (
          <button onClick={onHome} className="text-xs mono-label hover-accent-text transition">
            Strona główna
          </button>
        )}
      </div>
    </div>
  );
}

// ==========================================================================
// LANDING
// ==========================================================================

function Landing({ progress, onStartModule, onScorecard, onRoadmap, onCertificate, onReset }) {
  const completed = progress.completedModules.length;
  const total = MODULES.length;
  const percent = Math.round((completed / total) * 100);
  const allDone = completed === total;
  const firstIncomplete = MODULES.findIndex(m => !progress.completedModules.includes(m.id));
  const continueIdx = firstIncomplete === -1 ? 0 : firstIncomplete;

  return (
    <div>
      {/* HERO */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16">
        <div className="mono-label mb-8 flex items-center gap-3">
          <span className="inline-block w-6 h-px" style={{ background: '#D4FF00' }}></span>
          <span>Kurs e-learning · SQRG 2025</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-[0.95] mb-8">
          E-E-A-T<br/>
          <span className="text-accent">odszyfrowane</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl font-light">
          Praktyczny kurs o ocenie jakości stron w oparciu o oficjalne wytyczne Google.
        </p>

        <div className="mt-12 flex flex-wrap gap-2">
          {[
            `${MODULES.length} modułów`,
            `${MODULES.reduce((a, m) => a + m.quiz.length, 0)} pytań`,
            '2 narzędzia',
            '≈ 2.5h',
          ].map((t, i) => (
            <span key={i} className="px-3 py-1.5 mono-label rounded-full border border-default">{t}</span>
          ))}
        </div>

        {completed === 0 && (
          <div className="mt-12">
            <button onClick={() => onStartModule(0)} className="inline-flex items-center gap-2 px-8 py-4 bg-accent rounded-full font-medium hover:opacity-90 transition">
              Rozpocznij kurs <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* PROGRESS */}
      {completed > 0 && (
        <div className="max-w-5xl mx-auto px-6 md:px-10 mb-16">
          <div className="bg-card border border-default rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="mono-label mb-2">Postęp</div>
                <div className="text-3xl font-medium">{completed} <span className="text-muted">/ {total}</span></div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-medium text-accent">{percent}<span className="text-2xl">%</span></div>
              </div>
            </div>
            <div className="w-full h-0.5 bg-elev rounded-full overflow-hidden mb-6">
              <div className="h-full bg-accent transition-all duration-500" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {!allDone && (
                <button onClick={() => onStartModule(continueIdx)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent rounded-full text-sm font-medium hover:opacity-90 transition">
                  Kontynuuj <ArrowRight size={14} />
                </button>
              )}
              {allDone && (
                <button onClick={onCertificate} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent rounded-full text-sm font-medium hover:opacity-90 transition">
                  Certyfikat <Award size={14} />
                </button>
              )}
              <button onClick={onReset} className="inline-flex items-center gap-2 px-5 py-2.5 border border-default rounded-full text-sm text-muted hover-accent transition">
                <RefreshCw size={12} /> Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NARZĘDZIA */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 mb-20">
        <div className="flex items-baseline gap-4 mb-8">
          <div className="mono-label">[02] Narzędzia praktyczne</div>
          <div className="flex-1 h-px bg-subtle"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <ToolCard
            icon={<Gauge size={20} />}
            number="01"
            title="E-E-A-T Scorecard"
            desc="Zaudytuj stronę w 5 minut — 20 pytań, 4 filary, score 0-100, top 6 rekomendacji z fixami."
            meta="~ 5 min · wynik zapisany"
            onClick={onScorecard}
            badge={progress.scorecardResult ? `${progress.scorecardResult.overall}/100` : null}
          />
          <ToolCard
            icon={<Map size={20} />}
            number="02"
            title="Authority Roadmap"
            desc="24-miesięczny plan budowy autorytetu. Podaj branżę, budżet, poziom — dostań plan kwartalny z kosztami i KPI."
            meta="~ 1 min · plan do druku"
            onClick={onRoadmap}
          />
        </div>
      </div>

      {/* MODULES */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 pb-24">
        <div className="flex items-baseline gap-4 mb-8">
          <div className="mono-label">[01] Program kursu</div>
          <div className="flex-1 h-px bg-subtle"></div>
        </div>

        <div className="space-y-2">
          {MODULES.map((m, idx) => {
            const isDone = progress.completedModules.includes(m.id);
            const score = progress.quizScores[m.id];
            return (
              <button key={m.id} onClick={() => onStartModule(idx)} className="group w-full text-left">
                <div className="flex items-start gap-5 p-5 rounded-xl border border-subtle bg-hover hover-accent transition-all">
                  <div className="flex-shrink-0">
                    {isDone ? (
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black"><CheckCircle2 size={18} strokeWidth={2.5} /></div>
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-default flex items-center justify-center font-mono text-sm text-muted">{m.number}</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap mb-1">
                      <h3 className="text-xl font-medium">{m.title}</h3>
                      <span className="mono-label">{m.duration}</span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{m.subtitle}</p>
                    {score && (
                      <div className="mt-2 text-xs text-accent font-mono">
                        Quiz {score.correct}/{score.total}{score.correct === score.total && ' ✦'}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-muted group-hover:text-accent transition"><ChevronRight size={18} /></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-subtle">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 mono-label flex flex-wrap gap-4 justify-between">
          <span>General Guidelines (SQRG), Google — 11.09.2025</span>
          <span>Progress zapisywany automatycznie</span>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ icon, number, title, desc, meta, onClick, badge }) {
  return (
    <button onClick={onClick} className="group text-left bg-card border border-default rounded-2xl p-8 hover-accent transition relative overflow-hidden">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-full bg-elev flex items-center justify-center text-accent border border-default group-hover:bg-accent group-hover:text-black group-hover:border-accent transition">
          {icon}
        </div>
        <span className="mono-label">{number}</span>
      </div>
      <h3 className="text-2xl font-medium mb-3 group-hover:text-accent transition">{title}</h3>
      <p className="text-sm text-muted leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center justify-between">
        <span className="mono-label">{meta}</span>
        {badge && <span className="px-3 py-1 bg-accent-soft text-accent border border-accent rounded-full text-xs font-mono">{badge}</span>}
      </div>
    </button>
  );
}

// ==========================================================================
// MODULE VIEW
// ==========================================================================

function ModuleView({ moduleIdx, progress, setProgress, onBack, onHome, onNextModule, onCertificate }) {
  const module = MODULES[moduleIdx];
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Reset quiz state when module changes
  useEffect(() => { setQuizAnswers({}); setQuizSubmitted(false); }, [moduleIdx]);

  const allAnswered = module.quiz.every((_, qi) => quizAnswers[qi] !== undefined);
  const isLastModule = moduleIdx === MODULES.length - 1;

  const submitQuiz = () => {
    let correct = 0;
    module.quiz.forEach((q, qi) => { if (q.options[quizAnswers[qi]]?.correct) correct++; });
    setProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [module.id]: { correct, total: module.quiz.length } },
      completedModules: prev.completedModules.includes(module.id) ? prev.completedModules : [...prev.completedModules, module.id],
    }));
    setQuizSubmitted(true);
    setTimeout(() => {
      document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const next = () => {
    if (isLastModule) onCertificate();
    else onNextModule(moduleIdx + 1);
  };

  return (
    <div>
      <Header onBack={onBack} onHome={onHome} />
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        {/* Module header */}
        <div className="mb-16">
          <div className="mono-label mb-4 flex items-center gap-3">
            <span>Moduł {module.number}</span>
            <span className="inline-block w-4 h-px bg-muted opacity-40"></span>
            <span>{module.duration}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-5">{module.title}</h1>
          <p className="text-xl text-muted leading-snug">{module.subtitle}</p>
        </div>

        {/* Sections */}
        <div className="space-y-6 mb-20">
          {module.sections.map((s, i) => <SectionRenderer key={i} section={s} />)}
        </div>

        {/* Quiz */}
        <div id="quiz-section" className="mt-20 pt-12 border-t border-subtle">
          <div className="mono-label mb-4 flex items-center gap-2">
            <Target size={12} />
            <span>Quiz sprawdzający</span>
          </div>
          <h2 className="text-4xl font-medium mb-8">Sprawdź się</h2>

          <div className="space-y-4">
            {module.quiz.map((q, qi) => (
              <QuizQuestion key={qi} question={q} qi={qi} selected={quizAnswers[qi]} onSelect={(oi) => { if (!quizSubmitted) setQuizAnswers(p => ({ ...p, [qi]: oi })); }} submitted={quizSubmitted} />
            ))}
          </div>

          {!quizSubmitted ? (
            <div className="mt-8">
              <button onClick={submitQuiz} disabled={!allAnswered} className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition ${allAnswered ? 'bg-accent hover:opacity-90' : 'bg-elev text-dim cursor-not-allowed'}`}>
                Sprawdź odpowiedzi <ArrowRight size={14} />
              </button>
              {!allAnswered && <p className="mono-label mt-3">Odpowiedz na wszystkie pytania ({Object.keys(quizAnswers).length}/{module.quiz.length})</p>}
            </div>
          ) : (
            <QuizResult module={module} answers={quizAnswers} onNext={next} isLast={isLastModule} />
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// SECTION RENDERER
// ==========================================================================

function SectionRenderer({ section }) {
  switch (section.type) {
    case 'heading':
      return <h2 className="text-3xl md:text-4xl font-medium tracking-tight mt-12 mb-2 leading-tight">{section.content}</h2>;
    case 'paragraph':
      return <p className="text-lg leading-[1.75] text-primary">{section.content}</p>;
    case 'definition-list':
      return (
        <dl className="space-y-0 my-6 border border-default rounded-2xl overflow-hidden bg-card">
          {section.items.map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row md:gap-6 p-5 ${i < section.items.length - 1 ? 'border-b border-subtle' : ''}`}>
              <dt className="text-lg font-medium text-accent md:w-52 flex-shrink-0 font-mono">{item.term}</dt>
              <dd className="text-muted leading-relaxed flex-1">{item.def}</dd>
            </div>
          ))}
        </dl>
      );
    case 'callout':
      return <Callout style={section.style} label={section.label} content={section.content} />;
    case 'grid':
      return (
        <div className="grid md:grid-cols-2 gap-3 my-6">
          {section.items.map((item, i) => (
            <div key={i} className="bg-card border border-default rounded-xl p-5">
              <div className="text-base font-medium text-accent mb-3 font-mono">{item.label}</div>
              <ul className="space-y-1.5 text-sm text-muted">
                {item.items.map((t, j) => (
                  <li key={j} className="flex gap-2"><span className="text-dim">·</span><span>{t}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case 'row-list':
      return (
        <div className="my-6 border border-default rounded-2xl overflow-hidden bg-card">
          {section.items.map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row md:items-baseline md:gap-6 p-5 ${i < section.items.length - 1 ? 'border-b border-subtle' : ''}`}>
              <div className="text-base font-medium md:w-56 flex-shrink-0 font-mono text-accent">{item.label}</div>
              <div className="text-muted text-sm leading-relaxed">{item.value}</div>
            </div>
          ))}
        </div>
      );
    case 'comparison':
      return (
        <div className="grid md:grid-cols-2 gap-3 my-6">
          {section.items.map((item, i) => (
            <div key={i} className="bg-card border border-default rounded-xl p-5">
              <div className="text-base font-medium text-accent mb-4 font-mono">{item.label}</div>
              <ul className="space-y-2 text-sm">
                {item.examples.map((ex, j) => (
                  <li key={j} className="flex gap-2 leading-relaxed"><span className="text-dim flex-shrink-0">→</span><span>{ex}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case 'bullets':
      return (
        <ul className="space-y-2 my-6">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed">
              <div className="flex-shrink-0 mt-2.5 w-1 h-1 bg-accent rounded-full"></div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="my-6 border border-default rounded-2xl overflow-hidden bg-card">
          {section.items.map((item, i) => (
            <div key={i} className={`grid md:grid-cols-12 gap-4 p-4 text-sm ${i < section.items.length - 1 ? 'border-b border-subtle' : ''}`}>
              <div className="md:col-span-4 font-medium">{item.a}</div>
              <div className="md:col-span-2">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-mono ${item.b === 'Formalna' ? 'bg-accent text-black' : 'bg-elev text-muted border border-default'}`}>{item.b}</span>
              </div>
              <div className="md:col-span-6 text-muted text-xs leading-relaxed">{item.c}</div>
            </div>
          ))}
        </div>
      );
    case 'ymyl-matrix':
      return (
        <div className="my-6 border border-default rounded-2xl overflow-hidden bg-card">
          <div className="grid md:grid-cols-12 gap-4 p-4 mono-label border-b border-default">
            <div className="md:col-span-3">Temat YMYL</div>
            <div className="md:col-span-4">Life Experience</div>
            <div className="md:col-span-5">Wymaga eksperta</div>
          </div>
          {section.items.map((item, i) => (
            <div key={i} className={`grid md:grid-cols-12 gap-4 p-4 text-sm ${i < section.items.length - 1 ? 'border-b border-subtle' : ''}`}>
              <div className="md:col-span-3 font-medium">{item.topic}</div>
              <div className="md:col-span-4 text-muted leading-relaxed">{item.experience}</div>
              <div className="md:col-span-5 text-muted leading-relaxed">{item.expertise}</div>
            </div>
          ))}
        </div>
      );
    case 'audit-flow':
      return (
        <ol className="space-y-3 my-6">
          {section.steps.map((s, i) => (
            <li key={i} className="flex gap-4 bg-card border border-default rounded-xl p-5">
              <div className="flex-shrink-0 w-9 h-9 bg-accent text-black rounded-full flex items-center justify-center font-mono font-medium">{s.n}</div>
              <div className="flex-1"><div className="text-lg font-medium mb-1">{s.title}</div><div className="text-sm text-muted leading-relaxed">{s.desc}</div></div>
            </li>
          ))}
        </ol>
      );
    case 'priority-matrix':
      return (
        <div className="my-6 border border-default rounded-2xl overflow-hidden bg-card">
          {section.items.map((item, i) => (
            <div key={i} className={`grid md:grid-cols-12 gap-4 p-4 items-baseline ${i < section.items.length - 1 ? 'border-b border-subtle' : ''}`}>
              <div className="md:col-span-4 font-medium">{item.type}</div>
              <div className="md:col-span-3"><span className="inline-block px-2 py-1 bg-accent text-black text-xs rounded-full font-mono">{item.priority}</span></div>
              <div className="md:col-span-5 text-sm text-muted leading-relaxed">{item.why}</div>
            </div>
          ))}
        </div>
      );
    case 'case-study':
      return (
        <div className="space-y-3 my-6">
          {section.items.map((item, i) => {
            const color = item.status.match(/OK|Mocny/i) ? 'text-accent' : item.status.match(/Średni/i) ? 'text-muted' : 'text-danger';
            return (
              <div key={i} className="bg-card border border-default rounded-xl p-5">
                <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                  <div className="text-lg font-medium font-mono text-accent">{item.filar}</div>
                  <div className={`text-sm font-medium ${color}`}>{item.status}</div>
                </div>
                <div className="text-sm text-muted leading-relaxed">{item.details}</div>
              </div>
            );
          })}
        </div>
      );
    default: return null;
  }
}

function Callout({ style, label, content }) {
  const cfg = {
    quote: { border: 'border-default', label: 'text-muted', icon: <Quote size={14} /> },
    warning: { border: 'border-danger', label: 'text-danger', icon: <AlertTriangle size={14} /> },
    example: { border: 'border-default', label: 'text-muted', icon: <Lightbulb size={14} /> },
    protip: { border: 'border-accent', label: 'text-accent', icon: <Target size={14} /> },
  }[style] || {};
  return (
    <div className={`bg-card border-l-2 ${cfg.border || 'border-default'} rounded-r-xl p-6 my-6 ${style === 'warning' ? 'bg-danger-soft' : style === 'protip' ? 'bg-accent-soft' : ''}`}>
      <div className={`inline-flex items-center gap-2 mono-label ${cfg.label || 'text-muted'} mb-3`}>
        {cfg.icon}<span>{label}</span>
      </div>
      <div className={`leading-relaxed whitespace-pre-line ${style === 'quote' ? 'text-lg italic text-primary' : 'text-primary'}`}>
        {content}
      </div>
    </div>
  );
}

// ==========================================================================
// QUIZ COMPONENTS
// ==========================================================================

function QuizQuestion({ question, qi, selected, onSelect, submitted }) {
  return (
    <div className="bg-card border border-default rounded-xl p-6">
      <div className="mono-label mb-3">Pytanie {qi + 1}</div>
      <div className="text-lg font-medium mb-5 leading-snug">{question.question}</div>
      <div className="space-y-2">
        {question.options.map((opt, oi) => {
          const isSelected = selected === oi;
          const showCorrect = submitted && opt.correct;
          const showIncorrect = submitted && isSelected && !opt.correct;
          const classes = showCorrect ? 'border-accent bg-accent-soft text-primary' :
            showIncorrect ? 'border-danger bg-danger-soft text-primary' :
            isSelected ? 'border-accent bg-accent-soft' :
            'border-subtle bg-elev hover-accent';
          return (
            <button key={oi} onClick={() => onSelect(oi)} disabled={submitted} className={`w-full text-left px-5 py-3.5 rounded-lg transition text-sm leading-relaxed border ${classes} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}>
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 ${showCorrect ? 'bg-accent border-accent' : showIncorrect ? 'bg-danger border-danger' : isSelected ? 'bg-accent border-accent' : 'border-default'}`}>
                  {(isSelected || showCorrect) && <CheckCircle2 size={12} className="text-black" strokeWidth={3} />}
                </div>
                <span>{opt.text}</span>
              </div>
            </button>
          );
        })}
      </div>
      {submitted && (
        <div className="mt-5 pt-5 border-t border-subtle">
          <div className="mono-label mb-2">Wyjaśnienie</div>
          <div className="text-sm text-muted leading-relaxed">{question.explanation}</div>
        </div>
      )}
    </div>
  );
}

function QuizResult({ module, answers, onNext, isLast }) {
  let correct = 0;
  module.quiz.forEach((q, qi) => { if (q.options[answers[qi]]?.correct) correct++; });
  const total = module.quiz.length;
  const pct = Math.round((correct / total) * 100);
  const perfect = correct === total;
  const pass = pct >= 60;

  return (
    <div className="mt-8">
      <div className={`rounded-2xl p-8 mb-6 border ${perfect ? 'bg-accent-soft border-accent' : pass ? 'bg-card border-default' : 'bg-danger-soft border-danger'}`}>
        <div className="flex items-baseline gap-6 flex-wrap">
          <div>
            <div className="mono-label mb-1">Twój wynik</div>
            <div className="text-5xl font-medium"><span className={perfect ? 'text-accent' : pass ? '' : 'text-danger'}>{correct}</span><span className="text-muted">/{total}</span></div>
          </div>
          <div className={`text-3xl font-medium ${perfect ? 'text-accent' : pass ? 'text-muted' : 'text-danger'}`}>{pct}%</div>
          <div className="flex-1 md:text-right">
            <div className="text-lg">
              {perfect && '✦ Perfect — wszystko się zgadza.'}
              {!perfect && pass && 'Dobrze — możesz iść dalej.'}
              {!pass && 'Warto wrócić do treści modułu.'}
            </div>
          </div>
        </div>
      </div>
      <button onClick={onNext} className="inline-flex items-center gap-2 px-6 py-3 bg-accent rounded-full text-sm font-medium hover:opacity-90 transition">
        {isLast ? <>Odbierz certyfikat <Award size={14} /></> : <>Następny moduł <ArrowRight size={14} /></>}
      </button>
    </div>
  );
}

// ==========================================================================
// CERTIFICATE
// ==========================================================================

function Certificate({ progress, setProgress, onBack, onHome }) {
  const [name, setName] = useState(progress.certificateName || '');
  const allDone = progress.completedModules.length === MODULES.length;
  const totalQ = MODULES.reduce((a, m) => a + m.quiz.length, 0);
  const totalC = Object.values(progress.quizScores).reduce((a, s) => a + (s?.correct || 0), 0);
  const pct = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;
  const today = new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

  if (!allDone) {
    return (
      <div>
        <Header onBack={onBack} onHome={onHome} />
        <div className="max-w-xl mx-auto text-center py-24 px-6">
          <Award className="mx-auto mb-6 text-dim" size={48} />
          <h1 className="text-3xl font-medium mb-3">Certyfikat po ukończeniu</h1>
          <p className="text-muted mb-8">Aby odebrać certyfikat, ukończ wszystkie {MODULES.length} modułów. Na razie masz {progress.completedModules.length}.</p>
          <button onClick={onBack} className="inline-flex items-center gap-2 px-6 py-3 border border-default rounded-full text-sm hover-accent transition">
            <ArrowLeft size={14} /> Wróć
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header onBack={onBack} onHome={onHome} />
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12">
        <div className="no-print bg-card border border-default rounded-xl p-5 mb-8">
          <label className="block mono-label mb-2">Imię i nazwisko</label>
          <div className="flex gap-2">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="np. Jan Kowalski" className="flex-1 px-4 py-2.5 bg-elev border border-default rounded-lg focus:outline-none focus:border-accent transition" />
            <button onClick={() => setProgress(p => ({ ...p, certificateName: name }))} className="px-5 py-2.5 bg-accent rounded-lg text-sm font-medium hover:opacity-90 transition">Zapisz</button>
          </div>
        </div>

        <div className="bg-card border border-accent rounded-2xl p-10 md:p-16 glow-accent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-10" style={{ background: '#D4FF00' }}></div>

          <div className="relative text-center">
            <div className="inline-flex items-center gap-3 mb-10">
              <div className="w-10 h-px bg-accent"></div>
              <Award className="text-accent" size={20} />
              <div className="w-10 h-px bg-accent"></div>
            </div>
            <div className="mono-label mb-3">Certyfikat ukończenia</div>
            <h2 className="text-4xl md:text-5xl font-medium mb-12 tracking-tight">E-E-A-T <span className="text-accent">odszyfrowane</span></h2>

            <div className="mono-label mb-2">Uczestnik</div>
            <div className="text-3xl md:text-4xl font-medium mb-10 text-accent">{progress.certificateName || name || '________________'}</div>

            <div className="max-w-xl mx-auto text-muted leading-relaxed mb-10">
              ukończył(a) siedmiomodułowy kurs o kryteriach jakości Google w oparciu o Search Quality Rater Guidelines (wrzesień 2025).
            </div>

            <div className="grid grid-cols-3 gap-6 mb-10 max-w-xl mx-auto">
              <div><div className="text-3xl font-medium">{MODULES.length}</div><div className="mono-label mt-1">Modułów</div></div>
              <div><div className="text-3xl font-medium">{totalC}<span className="text-muted">/{totalQ}</span></div><div className="mono-label mt-1">Poprawnych</div></div>
              <div><div className="text-3xl font-medium text-accent">{pct}%</div><div className="mono-label mt-1">Wynik</div></div>
            </div>

            <div className="flex items-center justify-center gap-3 mono-label">
              <span>{today}</span><span className="text-dim">·</span><span>SQRG 2025</span>
            </div>
          </div>
        </div>

        <div className="no-print mt-6 text-center">
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-5 py-2.5 border border-default rounded-full text-sm text-muted hover-accent transition">
            <Printer size={14} /> Drukuj / zapisz PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// SCORECARD FLOW
// ==========================================================================

function ScorecardFlow({ state, setState, navigate, onBack, onHome, setProgress }) {
  if (state.view === 'form') return <ScorecardForm state={state} setState={setState} navigate={navigate} setProgress={setProgress} onBack={onBack} onHome={onHome} />;
  if (state.view === 'results') return <ScorecardResults state={state} onBack={onBack} onHome={onHome} />;
  return null;
}

function ScorecardForm({ state, setState, navigate, setProgress, onBack, onHome }) {
  const [answers, setAnswers] = useState(state.answers || {});
  const [url, setUrl] = useState(state.url || '');

  const pillarKeys = Object.keys(SCORECARD_QUESTIONS);
  const totalQ = pillarKeys.reduce((a, k) => a + SCORECARD_QUESTIONS[k].questions.length, 0);
  const answered = Object.keys(answers).length;
  const allAnswered = answered === totalQ;

  // Keep parent state synced so back/forward preserves
  useEffect(() => { setState({ ...state, answers, url }); }, [answers, url]);

  const handleAnswer = (pk, i, v) => setAnswers(prev => ({ ...prev, [`${pk}-${i}`]: v }));

  const showResults = () => {
    const result = calculateScorecard(answers);
    setProgress(p => ({ ...p, scorecardResult: { overall: result.overall, scores: result.scores, url, date: new Date().toISOString() } }));
    navigate({ screen: 'scorecard', view: 'results', answers, url, result });
  };

  return (
    <div>
      <Header onBack={onBack} onHome={onHome} />
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 pb-32">
        <div className="mb-12">
          <div className="mono-label mb-3 flex items-center gap-2"><Gauge size={12} /><span>Narzędzie 01</span></div>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-4">E-E-A-T <span className="text-accent">Scorecard</span></h1>
          <p className="text-lg text-muted">Zaudytuj stronę w 5 minut — 20 pytań, 4 filary, score 0-100.</p>
        </div>

        <div className="bg-card border border-default rounded-xl p-5 mb-10">
          <label className="block mono-label mb-2">URL strony (opcjonalnie)</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://twoja-strona.pl" className="w-full px-4 py-2.5 bg-elev border border-default rounded-lg focus:outline-none focus:border-accent transition" />
        </div>

        {pillarKeys.map((pk, pidx) => {
          const p = SCORECARD_QUESTIONS[pk];
          return (
            <div key={pk} className="mb-12">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="mono-label text-accent">0{pidx + 1}</span>
                <h2 className="text-2xl font-medium">{p.label}</h2>
                <span className="mono-label">waga {Math.round(p.weight * 100)}%</span>
              </div>

              <div className="space-y-3">
                {p.questions.map((q, i) => {
                  const key = `${pk}-${i}`;
                  const sel = answers[key];
                  return (
                    <div key={i} className="bg-card border border-default rounded-xl p-5">
                      <div className="mb-3 leading-relaxed">{q.q}</div>
                      <div className="flex gap-2">
                        {[
                          { val: 'yes', label: 'Tak' },
                          { val: 'partial', label: 'Częściowo' },
                          { val: 'no', label: 'Nie' },
                        ].map(opt => (
                          <button key={opt.val} onClick={() => handleAnswer(pk, i, opt.val)} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition border ${sel === opt.val ? 'bg-accent text-black border-accent' : 'bg-elev border-default text-muted hover-accent'}`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky footer */}
      <div className="no-print fixed bottom-0 left-0 right-0 z-40 border-t border-default backdrop-blur-lg" style={{ background: 'rgba(10, 10, 10, 0.95)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="mono-label">Postęp</span>
              <span className="text-lg font-medium">{answered}<span className="text-muted">/{totalQ}</span></span>
            </div>
            <div className="w-full h-0.5 bg-elev rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all" style={{ width: `${(answered / totalQ) * 100}%` }}></div>
            </div>
          </div>
          <button onClick={showResults} disabled={!allAnswered} className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition ${allAnswered ? 'bg-accent hover:opacity-90' : 'bg-elev text-dim cursor-not-allowed'}`}>
            Pokaż wynik <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ScorecardResults({ state, onBack, onHome }) {
  const result = state.result || calculateScorecard(state.answers);
  const interp = getScoreInterpretation(result.overall);
  const pillarKeys = Object.keys(SCORECARD_QUESTIONS);
  const chartData = pillarKeys.map(k => ({ pillar: SCORECARD_QUESTIONS[k].label, score: result.scores[k], fullMark: 100 }));

  return (
    <div>
      <Header onBack={onBack} onHome={onHome} label="Wróć do pytań" />
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12">
        <div className="no-print flex items-center justify-end mb-6 gap-2">
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 border border-default rounded-full text-xs text-muted hover-accent transition">
            <Printer size={12} /> Drukuj
          </button>
        </div>

        <div className="mb-10">
          <div className="mono-label mb-3">Wynik audytu E-E-A-T</div>
          {state.url && <div className="text-lg text-accent font-mono mb-4 break-all">{state.url}</div>}
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight">Twój score</h1>
        </div>

        {/* Overall */}
        <div className={`rounded-2xl p-10 mb-8 border ${interp.type === 'good' ? 'border-accent glow-accent bg-accent-soft' : interp.type === 'warn' ? 'border-default bg-card' : 'border-danger bg-danger-soft'}`}>
          <div className="flex items-baseline gap-8 flex-wrap">
            <div>
              <div className="mono-label mb-1">Overall E-E-A-T</div>
              <div className={`text-7xl md:text-8xl font-medium leading-none ${interp.type === 'good' ? 'text-accent' : interp.type === 'bad' ? 'text-danger' : ''}`}>{result.overall}<span className="text-3xl text-muted">/100</span></div>
            </div>
            <div className="flex-1 min-w-64">
              <div className={`text-2xl font-medium mb-2 ${interp.type === 'good' ? 'text-accent' : interp.type === 'bad' ? 'text-danger' : ''}`}>{interp.label}</div>
              <div className="text-muted leading-relaxed">{interp.desc}</div>
            </div>
          </div>
        </div>

        {/* Radar + bars */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="bg-card border border-default rounded-xl p-6">
            <div className="mono-label mb-4">Radar per filar</div>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <RadarChart data={chartData} outerRadius="75%">
                  <PolarGrid stroke="#2A2A2A" />
                  <PolarAngleAxis dataKey="pillar" tick={{ fill: '#FAFAFA', fontSize: 12, fontFamily: 'Space Grotesk' }} />
                  <Radar dataKey="score" stroke="#D4FF00" fill="#D4FF00" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-default rounded-xl p-6">
            <div className="mono-label mb-5">Score per filar</div>
            <div className="space-y-5">
              {pillarKeys.map(k => {
                const p = SCORECARD_QUESTIONS[k];
                const s = result.scores[k];
                return (
                  <div key={k}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <div className="font-medium font-mono">{p.label}</div>
                      <div className="text-xl font-medium">{s}<span className="text-xs text-muted">/100</span></div>
                    </div>
                    <div className="w-full h-1 bg-elev rounded-full overflow-hidden">
                      <div className="h-full bg-accent transition-all" style={{ width: `${s}%` }}></div>
                    </div>
                    <div className="mono-label mt-1">waga {Math.round(p.weight * 100)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {result.recommendations.length > 0 ? (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 mono-label">
              <Target size={12} className="text-accent" /><span>Priorytetowe rekomendacje</span>
            </div>
            <h2 className="text-3xl font-medium mb-2">Top {result.recommendations.length} gaps</h2>
            <p className="text-sm text-muted mb-6">Posortowane wg wagi — zacznij od nich.</p>

            <div className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="bg-card border-l-2 border-accent rounded-r-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-accent text-black rounded-full flex items-center justify-center text-xs font-bold font-mono">{i + 1}</div>
                    <div className="flex-1">
                      <div className="mono-label mb-1 text-accent">{rec.pillar} · waga {rec.weight}</div>
                      <div className="text-base font-medium mb-2">{rec.question}</div>
                      <div className="text-sm text-muted leading-relaxed"><span className="text-accent">Fix:</span> {rec.fix}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-accent-soft border border-accent rounded-2xl p-8 text-center glow-accent">
            <Sparkles size={32} className="mx-auto mb-3 text-accent" />
            <div className="text-2xl font-medium text-accent">Imponujące — brak "Nie" w audycie</div>
            <div className="text-muted mt-2">Skupić się na "częściowo" i budowie autorytetu długoterminowo.</div>
          </div>
        )}

        <div className="mt-10 mono-label text-center">
          Ten scorecard to wstępna samoocena. Pełny audyt E-E-A-T z referencjami do SQRG wymaga analizy konkretnych URL-i.
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// ROADMAP FLOW
// ==========================================================================

function RoadmapFlow({ state, setState, navigate, onBack, onHome }) {
  if (state.view === 'form') return <RoadmapForm state={state} setState={setState} navigate={navigate} onBack={onBack} onHome={onHome} />;
  if (state.view === 'results') return <RoadmapResults state={state} onBack={onBack} onHome={onHome} />;
  return null;
}

function RoadmapForm({ state, setState, navigate, onBack, onHome }) {
  const [config, setConfig] = useState(state.config || {});
  useEffect(() => { setState({ ...state, config }); }, [config]);

  const canGenerate = config.industry && config.budget && config.level && config.scope;

  const generate = () => {
    const roadmap = generateRoadmap(config);
    navigate({ screen: 'roadmap', view: 'results', config, roadmap });
  };

  return (
    <div>
      <Header onBack={onBack} onHome={onHome} />
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">
        <div className="mb-12">
          <div className="mono-label mb-3 flex items-center gap-2"><Map size={12} /><span>Narzędzie 02</span></div>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-4">Authority <span className="text-accent">Roadmap</span></h1>
          <p className="text-lg text-muted">24-miesięczny plan budowy autorytetu dostosowany do branży i budżetu.</p>
        </div>

        <RoadmapPicker label="Branża klienta" options={INDUSTRIES} selected={config.industry} onSelect={(id) => setConfig({ ...config, industry: id })} />
        <RoadmapPicker label="Budżet miesięczny na PR + content" options={BUDGETS} selected={config.budget} onSelect={(id) => setConfig({ ...config, budget: id })} />
        <RoadmapPicker label="Obecny poziom rozpoznawalności" options={LEVELS} selected={config.level} onSelect={(id) => setConfig({ ...config, level: id })} />
        <RoadmapPicker label="Zasięg geograficzny" options={SCOPES} selected={config.scope} onSelect={(id) => setConfig({ ...config, scope: id })} />

        <button onClick={generate} disabled={!canGenerate} className={`mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-medium transition ${canGenerate ? 'bg-accent hover:opacity-90' : 'bg-elev text-dim cursor-not-allowed'}`}>
          Wygeneruj roadmapę <Sparkles size={16} />
        </button>
      </div>
    </div>
  );
}

function RoadmapPicker({ label, options, selected, onSelect }) {
  return (
    <div className="mb-8">
      <div className="mono-label mb-3">{label}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {options.map(opt => {
          const sel = selected === opt.id;
          return (
            <button key={opt.id} onClick={() => onSelect(opt.id)} className={`text-left px-4 py-3 rounded-xl border transition ${sel ? 'bg-accent-soft border-accent' : 'bg-card border-default hover-accent'}`}>
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${sel ? 'bg-accent border-accent' : 'border-default'}`}>
                  {sel && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                </div>
                <div className={sel ? 'text-accent font-medium' : 'text-primary'}>{opt.label}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RoadmapResults({ state, onBack, onHome }) {
  const { config, roadmap } = state;
  const industryLabel = INDUSTRIES.find(i => i.id === config.industry)?.label;
  const budgetLabel = BUDGETS.find(b => b.id === config.budget)?.label;
  const levelLabel = LEVELS.find(l => l.id === config.level)?.label;
  const scopeLabel = SCOPES.find(s => s.id === config.scope)?.label;

  const quarterLabels = {
    1: 'Fundament', 2: 'Experience & Expertise', 3: 'Amplifikacja', 4: 'Zamknięcie roku 1',
    5: 'Skalowanie', 6: 'Systemy cykliczne', 7: 'Pozycja eksperta', 8: 'Konsolidacja',
  };
  const catLabels = {
    foundation: 'Fundament', local: 'Local SEO', experience: 'Experience',
    expertise: 'Expertise', pr: 'Digital PR', content: 'Content',
  };

  return (
    <div>
      <Header onBack={onBack} onHome={onHome} label="Wróć do formularza" />
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12">
        <div className="no-print flex items-center justify-end mb-6">
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 border border-default rounded-full text-xs text-muted hover-accent transition">
            <Printer size={12} /> Drukuj
          </button>
        </div>

        <div className="mb-10">
          <div className="mono-label mb-3">Plan 24-miesięczny</div>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-8">Authority <span className="text-accent">Roadmap</span></h1>

          <div className="bg-card border border-default rounded-xl p-6 grid md:grid-cols-2 gap-6">
            {[
              ['Branża', industryLabel],
              ['Budżet', budgetLabel],
              ['Poziom', levelLabel],
              ['Zasięg', scopeLabel],
            ].map(([k, v], i) => (
              <div key={i}>
                <div className="mono-label mb-1">{k}</div>
                <div className="text-lg">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {roadmap.quarters.map(qr => {
            if (qr.items.length === 0) return null;
            const year = qr.q <= 4 ? 1 : 2;
            const kpi = roadmap.kpis.find(k => k.q === qr.q);
            return (
              <div key={qr.q}>
                <div className="flex items-baseline gap-4 mb-5">
                  <div className="w-14 h-14 bg-accent text-black rounded-full flex items-center justify-center font-mono text-base font-medium">Q{qr.q}</div>
                  <div>
                    <div className="mono-label">Rok {year} · {qr.items.length} {qr.items.length === 1 ? 'aktywność' : 'aktywności'}</div>
                    <h3 className="text-2xl font-medium">{quarterLabels[qr.q]}</h3>
                  </div>
                </div>

                <div className="space-y-2 ml-0 md:ml-18">
                  {qr.items.map((it, i) => (
                    <div key={i} className="bg-card border border-default rounded-xl p-5">
                      <div className="flex items-start gap-4 flex-wrap">
                        <div className="flex-1 min-w-64">
                          <div className="mono-label text-accent mb-2">{catLabels[it.cat]}</div>
                          <div className="text-lg font-medium mb-1.5">{it.name}</div>
                          <div className="text-sm text-muted leading-relaxed">{it.desc}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="mono-label">Koszt</div>
                          <div className="text-sm text-accent font-mono mt-1">{it.cost}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {kpi && (
                  <div className="ml-0 md:ml-18 mt-3 bg-accent-soft border border-accent rounded-xl p-4">
                    <div className="mono-label mb-1 text-accent">KPI na koniec Q{kpi.q}</div>
                    <div className="text-sm">{kpi.goal}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-card border border-default rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lightbulb size={18} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <div className="text-lg font-medium mb-2">Jak używać tej roadmapy</div>
              <div className="text-sm text-muted leading-relaxed space-y-2">
                <p>To framework, nie sztywny plan. Co kwartał wracaj i aktualizuj na podstawie wyników poprzedniego kwartału.</p>
                <p>Koszty to szacunkowe widełki rynkowe 2026 dla Polski — w praktyce zależą od wykonawcy, skali i jakości.</p>
                <p>Authoritativeness buduje się latami. Ta roadmapa to start — realny autorytet w niszy wymaga 2-3 lat konsekwentnej pracy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
