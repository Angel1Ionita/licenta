import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {

  articles: string[] = [
    `Recomandari pentru a-ti mentine vederea buna indiferent de varsta
In plus fata de controalele oftalmologice recomandate in functie de varsta, exista o serie de alte lucruri pe care le poti face pentru a-ti mentine ochii sanatosi:

Mananca o dieta sanatoasa si echilibrata care sa-ti protejeze ochii.
Probabil ca ai auzit ca morcovii sunt buni pentru vedere. Cu atat mai mult o dieta care include o multime de fructe si legume te va ajuta sa-ti pastrezi vederea buna cat mai mult timp. Studiile arata ca alimentele bogate in vitaminele C si E, zinc, luteina si zeaxantina si acizi grasi omega-3 si omega-6 reduc riscul de degenerescenta maculara legata de varsta, cataracta si ochi uscati pe masura inaintarii in viata.

Vitamina C. Alimentele care sunt surse bune de vitamina C sunt portocalele, grapefruitul, kiwi, capsunile, rosiile, ardeii rosii si verzi si broccoli.
Vitamina E. Surse sanatoase de vitamina E sunt: migdale, seminte de floarea soarelui, ulei de masline si avocado.
Zinc. Leguminoasele (fasole si linte), semintele, carnea si fructele de mare, lactatele si ouale sunt toate surse bune de zinc.
Luteina si zeaxantina. Acesti nutrienti se gasesc in mod natural la nivelul retinei - tesutul sensibil la lumina care captuseste partea din spate a ochiului. Luteina si zeaxantina - adesea gasite impreuna in multe alimente - fac parte din familia de pigmenti vegetali denumiti „carotenoizi”. Carotenoizii dau culoare multor legume si fructe. Poti gasi luteina si zeaxantina in legumele cu frunze verzi, cum ar fi varza kale, spanac si „sfecla elvetiana” (Swiss chard). Broccoli, sparanghelul si fructele colorate precum zmeura, papaya, piersicile si mango sunt, de asemenea, surse bogate in carotenoizi pentru sanatatea ochilor.
Acizii grasi omega-3 se gasesc in pestele gras (cum ar fi somonul, pastravul si sardinele). Nucile si uleiul de floarea soarelui sunt surse naturale excelente de acizi grasi omega-6. Ambele sunt disponibile ca suplimente orale. Daca ai degenerescenta maculara legata de varsta  (pierderea vederii centrale) sau ochi uscati, intreba medicul oftalmolog daca suplimentele de omega-3 si omega-6 sunt potrivite in cazul tau.
Renunta la fumat.
Multi oameni nu stiu ca exista o legatura intre fumat si afectiunile oftalmologice. Fumatul creste semnificativ riscul de a dezvolta boli la nivelul ochiului, cum ar fi cataracta si degenerescenta maculara legata de varsta. Daca fumezi, renunta la fumat. Indiferent cat de mult ai fumat, niciodata nu este prea tarziu pentru a beneficia de pe urma renuntarii.

Mentine o greutate sanatoasa.
Supraponderea si obezitatea cresc riscul de a dezvolta diabet zaharat, care poate duce la pierderea vederii. Diabetul zaharat, in special cand glicemia nu este controlata, creste riscul de aparitie a  retinopatiei diabetice, cataractei si a glaucomului.

Fa regulat o activitate fizica.
Exercitiile fizice pot ajuta la prevenirea sau controlul greutatii in exces si a diabetului zaharat, hipertensiunii arteriale si colesterolului crescut. Aceste boli se pot complica cu anumite afectiuni oftalmologice.

Afla istoricul medical al familiei tale.
Discuta cu membrii familiei tale despre istoricul lor de afectiuni oftalmologice. Multe boli oftalmologice se transmit in familie, de la diverse vicii de refractie, precum miopia sau hipermetropia la afectiuni mai grave, cum ar fi glaucomul. Sa cunosti care este istoricul medical oftalmologic al parintilor tai, te ajuta sa stii daca ai un risc crescut  de a face o anumita boala oftalmologica si astfel, sa mergi din timp la controlul oftalmologic care sa-i permita medicului sa diagnosticheze boala precoce, inainte ca aceasta sa devina grava.

Fa pauze de vedere regulate.
Cand lucrezi mult timp la ceva care presupune vederea de aproape, cum ar fi la computer, tableta sau smartphone, poti uita sa clipesti si ochii vor obosi, chiar daca ai vederea normala. Urmeaza regula 20/20/20 – la fiecare 20 de minute, priveste ceva la 20 de metri distanta, timp de 20 de secunde. Si nu uita sa clipesti, deoarece asta va ajuta la prevenirea uscaciunii ochilor.

Poarta ochelarii de vedere prescrisi.
Multe tulburari de vedere apar pe masura inaintarii in varsta. Contrar mitului, purtarea ochelarilor de vedere sau a lentilelor de contact nu iti vor inrautati vederea - din contra, ajuta ochii sa functioneze mai eficient.

Daca folosesti lentile de contact, ia masuri pentru a preveni infectia ochiului.
Spala-te bine pe maini inainte de a pune sau scoate lentilele de contact. De asemenea, urmeaza instructiunile despre cum sa cureti corespunzator lentilele si cand acestea trebuie inlocuite.

Poarta ochelari de soare.
Pe langa faptul vederea este mai confortabila atunci cand privesti intr-un mediu cu mult soare, in plus, ochelarii de soare iti protejeaza ochii de razele ultraviolete (UV). Atunci cand alegi perechea potrivita de ochelari de soare, intotdeauna trebuie sa te asiguri ca acestia poarta marcajul CE. Incepand cu anul 2009, marcajul european „CE” precizeaza ca acei ochelari ofera un nivel sigur de protectie solara. Daca marcajul lipseste, ochelarii de soare nu sunt in conformitate cu normativele europene. Exista diferite categorii de ochelari de soare din care poti alege, cu lentile de diverse culori, precum si rame speciale pentru diverse sporturi. Cu cat te expui mai mult la razele ultraviolete UV de la o varsta mai tanara, cu atat efectul cumulativ in timp al razelor UV poate fi mai daunator, asa incat este la fel de important ca si copiii sa poarte ochelari de soare, precum si o palarie cu boruri largi, iar pielea lor sa fie protejata cu crema de protectie solara.

Poarta ochelari de protectie.
Pentru a preveni traumatismul ochilor, este important sa porti de fiecare data ochelari de protectie atunci cand practici anumite sporturi, lucrezi in constructii sau efectuezi reparatii sau alte proiecte de imbunatatire in casa. Ochelarii de protectie sunt special conceputi pentru a oferi protectia adecvata activitatii efectuate. Majoritatea ochelarilor de protectie sunt fabricati din policarbonat, care este de 10 ori mai puternic decat alte materiale plastice.

Evita uscaciunea ochilor.
Ochii devin uscati, obositi si durerosi daca nu se produc suficiente lacrimi sau daca lacrimile sunt de proasta calitate. Incalzirea centrala, aerul conditionat si utilizarea timp indelungat a computerului pot cauza sau agrava ochii uscati. Multi adulti sufera de ochi uscati ca urmare a unei afectiuni oftlamologice sau a reactiilor adverse ale unor medicamente. Picaturile lubrifiante de ochi (lacrimile artificiale) pot calma iritatia si pot reduce disconfortul. De asemenea, medicul oftalmolog poate sa-ti recomande suplimente de omega-3 si omega-6. Bea multa apa si nu uita sa clipesti des, in special cand privesti la calculator sau smartphone. Daca ochii tai sunt uscati in mod constant, mergi la un consult oftalmologic.`,
    `test2`,
    `test3`,
    `test4`,
    `test5`,
  ];
  content!: string;

  constructor(
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    const id: string= this.route.snapshot.paramMap.get('id')!;
    this.content = this.articles[+id - 1];
  }

}
