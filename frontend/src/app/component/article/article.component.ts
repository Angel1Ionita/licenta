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
        `

    <h1>Cum să Alegi Clinica Potrivită pentru Nevoile Tale de Sănătate</h1>

    <p>Alegerea unei clinici medicale este o decizie importantă care poate influența semnificativ calitatea îngrijirii pe care o primești. Indiferent dacă ai nevoie de o consultație de rutină, un tratament specific sau o intervenție chirurgicală, este esențial să te asiguri că alegi clinica potrivită pentru tine. În acest articol, vom discuta câțiva factori cheie de care ar trebui să ții cont atunci când îți selectezi clinica.</p>

    <h2>1. Reputația și Recenziile Clinicii</h2>
    <p>Unul dintre primii pași în alegerea unei clinici este să cercetezi reputația acesteia. Caută recenzii online, întreabă prietenii și familia despre experiențele lor și verifică dacă clinica are certificări sau premii în domeniul medical. O clinică bine cotată este, de obicei, un indicator al calității serviciilor oferite.</p>

    <h2>2. Specializările și Serviciile Oferite</h2>
    <p>Nu toate clinicile sunt la fel, iar unele se specializează în anumite domenii ale medicinei. Asigură-te că clinica pe care o alegi oferă serviciile de care ai nevoie. Dacă ai nevoie de un specialist, verifică dacă aceștia sunt disponibili și dacă au experiență în tratarea afecțiunii tale.</p>

    <h2>3. Locația și Accesibilitatea</h2>
    <p>Locația clinicii este un alt factor important. O clinică situată aproape de tine îți poate economisi timp și poate face mai ușoare vizitele repetate, mai ales dacă este necesar un tratament de lungă durată. Verifică și opțiunile de transport public sau disponibilitatea parcării.</p>

    <h2>4. Echipamente și Tehnologii Medicale</h2>
    <p>O clinică modernă ar trebui să fie echipată cu tehnologie de ultimă generație. Verifică dacă clinica dispune de echipamente moderne care pot oferi diagnostice precise și tratamente eficiente. Acest lucru este deosebit de important în cazul procedurilor complexe.</p>

    <h2>5. Calitatea Echipei Medicale</h2>
    <p>Medicii și personalul clinicii sunt factorii cheie care determină calitatea îngrijirii. Cercetează echipa medicală, verifică experiența și calificările acestora și vezi dacă sunt membri ai unor asociații medicale de renume. De asemenea, evaluează modul în care interacționează cu pacienții și disponibilitatea acestora de a răspunde la întrebări.</p>

    <h2>6. Disponibilitatea și Timpul de Așteptare</h2>
    <p>În unele clinici, timpul de așteptare pentru o programare poate fi foarte lung. Verifică disponibilitatea medicilor și încearcă să afli cât durează, în medie, să obții o consultație. O clinică eficientă va avea procese clare pentru programări rapide și gestionarea eficientă a timpului pacienților.</p>

    <div class="highlight">
        <p><strong>Sfat util:</strong> Înainte de a lua o decizie finală, nu ezita să vizitezi clinica. O vizită te poate ajuta să evaluezi atmosfera, curățenia și modul în care ești tratat de personalul de la recepție.</p>
    </div>

    <h2>7. Costurile și Modalitățile de Plată</h2>
    <p>Costurile serviciilor medicale pot varia semnificativ de la o clinică la alta. Asigură-te că întrebi despre tarifele consultațiilor, tratamentelor și altor servicii, precum și despre opțiunile de plată disponibile. Unele clinici oferă planuri de plată sau acceptă asigurări de sănătate, ceea ce poate reduce semnificativ costurile.</p>

    <h2>8. Părerile Pacienților</h2>
    <p>Nu subestima importanța părerilor altor pacienți. Citește recenziile online și vezi ce au de spus ceilalți despre experiențele lor cu clinica. De asemenea, poți cere referințe de la pacienți care au avut afecțiuni similare.</p>

    <h2>9. Respectarea Standardelor de Siguranță și Igienă</h2>
    <p>Asigură-te că clinica respectă toate normele de siguranță și igienă. Acest lucru este esențial pentru prevenirea infecțiilor și pentru asigurarea unui mediu sigur pentru toți pacienții. Clinica ar trebui să aibă protocoale stricte în ceea ce privește sterilizarea echipamentelor și curățenia generală.</p>

    <h2>10. Comunicarea și Relația cu Pacienții</h2>
    <p>Ultimul, dar nu cel din urmă, este modul în care clinica comunică cu pacienții săi. O bună comunicare este esențială pentru a te simți în siguranță și bine îngrijit. Personalul ar trebui să fie disponibil pentru a răspunde la întrebările tale și să te informeze clar despre opțiunile tale de tratament.</p>

    <p>Alegerea unei clinici medicale este o decizie personală care necesită o analiză atentă. Ținând cont de factorii menționați mai sus, îți vei putea găsi clinica care să corespundă cel mai bine nevoilor tale și să îți ofere îngrijirea medicală de calitate pe care o meriți.</p>
`,
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
        const id: string = this.route.snapshot.paramMap.get('id')!;
        this.content = this.articles[+id - 1];
    }

}
