//import library from './export.json' assert {type: 'json'}
//const { default: library } = await import("./export.json", { assert: { type: "json" } })
const response = await fetch('./export.json');
const library = await response.json();
var libObject = {};
library.map(s => libObject[s.sticker_id] = s);
console.log('loading')
var sbeCode = '9a69d207-7514-450b-b7e9-61178fce6010'
var scCode = '7be585f7-f51b-41b7-80ac-a37d0763e26c'
var scAchCodes = ['b6c4b676-7d93-4c17-b26e-0ca94d4a1d85','6f93a3a0-9739-4c20-92e3-ed53bc7e54ff','fa03ff53-1f5f-4e48-9f4d-663c67ce69c8','667421ff-2156-4305-9e75-e948de51cf34','9dfb07a1-6645-4b22-898f-4c7a3f3a2d97','80ccc9e7-f12f-43d6-83dd-5b4e8a0fbf7a','467e59a3-b1bd-470c-801b-8114c1671dc8','797ec3cc-423f-4697-8503-3a8d2902fced','cabb5354-ef67-492f-8709-86f84c7b3d4f','54ce1807-46d8-4666-b148-188e592d0d87','35cfcc09-7c0d-46a3-847f-efd859ef77bc','a928186c-c186-4ae2-b79d-dd3604eb9001']
var ignoreCodes = ['4918ca92-426e-443f-9de8-c3d5105ed5a2','e45790e6-d881-423e-b27f-bafb620d17c2','800cd4f3-2dd6-4e55-bce6-0dc6b07a48b6','c4b21ae3-7267-4459-a93f-8482165ae4db'] //Summer challenge achievements and Back To School welcome variant
//window.addEventListener('load', populate);
document.getElementById('submitButton').addEventListener("click",() => {generate()})
var sbeSelect = document.getElementById(sbeCode);
var scSelect = document.getElementById(scCode);
var sbeSection = document.getElementById('libraryArea_SBE');
var scSection = document.getElementById('libraryArea_SC');
var libSection = document.getElementById('libraryArea');
var outputSection = document.getElementById('output');
var regSubmit = document.getElementById('regSubmit');
var email = ''
var company = ''

document.getElementById('selectionArea').style.display = 'none';
document.getElementById('sbeAlert').style.display = 'none';
document.getElementById('scAlert').style.display = 'none';
document.getElementById('output').style.display = 'none';
document.getElementById("futureAdd").style.display = 'none'

sbeSelect.addEventListener("click", () => {
    if (sbeSelect.checked == true){
        document.getElementById('sbeAlert').style.display = 'none';
        Array.from(sbeSection.getElementsByTagName("input")).forEach((s) => {s.disabled = true; s.checked = true})
    } else {
        document.getElementById('sbeAlert').style.display = 'block';
        Array.from(sbeSection.getElementsByTagName("input")).forEach((s) => {s.disabled = false; s.checked = false})
    }
})

scSelect.addEventListener("click", () => {
    if (scSelect.checked == true){
        document.getElementById('scAlert').style.display = 'none';
        Array.from(scSection.getElementsByTagName("input")).forEach((s) => {s.disabled = true; s.checked = true})
    } else {
        document.getElementById('scAlert').style.display = 'block';
        Array.from(scSection.getElementsByTagName("input")).forEach((s) => {s.disabled = false; s.checked = false})
    }
})

regSubmit.addEventListener("click", () => {
    email = document.getElementById("email").value
    company = document.getElementById("company").value
    document.getElementById('regInfo').style.display = 'none';
    document.getElementById('selectionArea').style.display = 'block';
})
populate();

console.log('loaded')

function populate(){
    var sbeLibrary = []
    var scLibrary = [[],[],[],[],[]]
    var achLibrary = []
    var placeholderLibrary = []
    var mainLibrary = []

    Object.keys(libObject).forEach(p => {
        var s = libObject[p];
        switch (true){
            case ignoreCodes.includes(s.sticker_id):
                break;
            case s.tags.includes("SB_Sustainable Business Essentials"):
                sbeLibrary.push(s);
                //break; <!-- DO NOT REINSTATE BREAK - by flowing through to the next case this allows for the duplication of stickers between SBE and SC packs -->
            case s.tags.includes("SB_Sustainability Champion"):
                switch (true){
                    case s.tags.includes("SB_SC_Key Topics"):
                        scLibrary[0].push(s);
                        break;
                    case s.tags.includes("SB_SC_Green Skills 101"):
                        scLibrary[1].push(s);
                        break;
                    case s.tags.includes("SB_SC_Applying Sustainability"):
                        scLibrary[2].push(s);
                        break;
                    default:
                        scLibrary[3].push(s);
                    break;
                }    
                break;
            case (s.achievement_id != null || s.chapter == "Achievements"):
            if (!(s.sticker_name.includes("CPD") || s.tags.includes("SB_SC_Achievements"))){
                if (!s.sticker_name.includes("Summer 2024")){
                achLibrary.push(s);}}
                break;
            case s.sticker_id == 'da864fa3-7d90-4405-bc44-de7c3287df91': //Welcome sticker
                achLibrary.push(s);
                break;
            case s.tags.includes("SB Placeholder"):
                placeholderLibrary.push(s);
                break;
            default:
                mainLibrary.push(s);
                break;
            }});

            //sbeLibrary.sort((a, b) => a.sticker_name.localeCompare(b.sticker_name));
            scLibrary.forEach(s => s.sort((a, b) => a.sticker_name.localeCompare(b.sticker_name)));
            //scLibrary = scLibrary.flat();
            mainLibrary.sort((a, b) => a.sticker_name.localeCompare(b.sticker_name)).sort((a, b) => a.chapter.localeCompare(b.chapter));
            placeholderLibrary.sort((a, b) => a.sticker_name.localeCompare(b.sticker_name)).sort((a, b) => a.chapter.localeCompare(b.chapter));
            achLibrary.sort((a, b) => a.sticker_name.localeCompare(b.sticker_name));

    const libraryArea = document.getElementById("libraryArea_Main")
    const libraryAreaSBE = document.getElementById("libraryArea_SBE")
    const libraryAreaSC = document.getElementById("libraryArea_SC")

    const sbeTable = libraryAreaSBE.appendChild(document.createElement("TABLE"));
    buildTable(sbeTable, sbeLibrary, "SBE_Pack", "Sustainable Business Essentials", "Get up to speed on the core topics of sustainability in one hour of high quality learning");
    Array.from(sbeTable.getElementsByTagName("input")).forEach((s) => {s.checked = true; s.disabled = true})


    const sc_keytopics = libraryAreaSC.appendChild(document.createElement("TABLE"));
    buildTable(sc_keytopics, scLibrary[0], "SC_Pack_Key", "Key Topics", "There's a lot of information to get your head around in the world of sustainability. Here's your crash course");
    const sc_greenskills = libraryAreaSC.appendChild(document.createElement("TABLE"));
    buildTable(sc_greenskills, scLibrary[1], "SC_Pack_Green", "Green Skills 101",'This pack provides a quick rundown of  core concepts in sustainability practice and legislation');
    const sc_applying = libraryAreaSC.appendChild(document.createElement("TABLE"));
    buildTable(sc_applying, scLibrary[2], "SC_Pack_Applying", "Applying Sustainability","Scientific and professional knowledge are both vital to creating sustainable change - but so are interpersonal skills");
    const sc_personal = libraryAreaSC.appendChild(document.createElement("TABLE"));
    buildTable(sc_personal, scLibrary[3], "SC_Pack_Personal", "Personal Actions","Big changes start with individual action. This is your springboard to acting and living more sustainably today");
    Array.from(scSection.getElementsByTagName("input")).forEach((s) => {s.disabled = true; s.checked = true})

    const mainTable = libraryArea.appendChild(document.createElement("TABLE"));
    buildTable(mainTable, mainLibrary, "main", "Our content", "Alongside our CPD offering, we have a range of content covering some more specialised topics");

    const placeholderTable = libraryArea.appendChild(document.createElement("TABLE"));
    buildTable(placeholderTable, placeholderLibrary, "placeholder", "Coming soon", "Register your interest now and we will add these stickers to your library upon their release");

    const achTable = libraryArea.appendChild(document.createElement("TABLE"));
    buildTable(achTable, achLibrary, "achievement", "Achievements", "The gamified framework that makes Stickerbook tick. These stickers are automatically included in your library.");
    Array.from(achTable.getElementsByTagName("input")).forEach((s) => {s.checked = true; s.disabled = true})
        console.log('populated')
}

function generate(){
    var checkboxes = document.getElementsByClassName("stickerSelect");
    var submitLink = document.getElementById('sendRequest');

    var future = [];
    var selected = [];
    var hasSC = false;
    Array.from(checkboxes).forEach((s) => { if (s.checked == true ){
        var sticker = libObject[s.id]
        if (s.classList.contains('placeholder')){
            future.push(sticker)
        } else {
            selected.push(sticker)
            if (s.id == scCode){
                hasSC = true;
            }
        }}
    })
    if (hasSC){scAchCodes.forEach(s => {selected.push(libObject[s])})
    }
    selected = [... new Set(selected)] //removes duplicates in ONE LINE!!!

    document.getElementById("output").style.display = 'block'
    var libTable = document.getElementById("toAddTable")


    while (libTable.rows.length > 1){
        libTable.deleteRow(1)
    }
    selected.forEach(s => {
        var newRow = libTable.appendChild(document.createElement('tr'))
        newRow.appendChild(document.createElement('td')).innerText = s.sticker_name
        newRow.appendChild(document.createElement('td')).innerText = s.chapter
        newRow.appendChild(document.createElement('td')).innerText = s.sticker_id
    })


    if (future.length > 0){
        var futureTable = document.getElementById("futureTable")
        while (futureTable.rows.length > 1){
            futureTable.deleteRow(1)
        }
        document.getElementById("futureAdd").style.display = 'block'
    future.forEach(s => {
        var newRow = futureTable.appendChild(document.createElement('tr'))
        newRow.appendChild(document.createElement('td')).innerText = s.sticker_name
        newRow.appendChild(document.createElement('td')).innerText = s.chapter
        newRow.appendChild(document.createElement('td')).innerText = s.sticker_id
    })}

    var addList =  selected.reduce((acc, curr) => acc + curr.sticker_id + '\n','Please set up our ' + company + ' library with the following stickers: \n')
    var futureList = future.reduce((acc, curr) => acc + curr.sticker_id + '\n','We would also like to register our interest for the following upcoming stickers: \n')

    submitLink.href = submitLink.href.replace('USEREMAIL',email).replace('USERCOMPANY',encodeURIComponent(company)).replace('BODYCONTENT', encodeURI(addList + '\n' + futureList + '\n'))
    document.getElementById("regSubmit").scrollIntoView(false);
    console.log('generated')

}

function buildTable(table, library, tag, label, subtitle){
    table.id = tag;
    table.classList.add('libraryTable');
    table.innerHTML = "<tr><td colspan=2><h2>" + label + "</h2>" + subtitle + "</td><td>Chapter</td><td><input type=checkbox id=\""+ tag + "Master\" class=\"stickerMasterSelect\"></td></tr>";
    var masterCheck = document.getElementById(tag + 'Master').addEventListener("change", () => {
        var boxes = Array.from(document.getElementById(tag).getElementsByClassName("stickerSelect"))
        if (document.getElementById(tag + 'Master').checked == true){
            boxes.forEach(p => p.checked = true)
        } else {boxes.forEach(p => p.checked = false)}
    });
    library.forEach(s =>
        {
            var newRow = table.insertRow(-1);
            newRow.setAttribute("class","libRow")
            s.active_image_url != "" ? newRow.insertCell(-1).innerHTML = "<div class=stickerImgWrap><img class=stickerImg src=https://assets.stickerbook.tech/media/" + s.active_image_url + "></div>" : newRow.insertCell(-1) ;
            newRow.insertCell(-1).innerHTML = "<h4>" + s.sticker_name + "</h4>" + s.description;
            newRow.insertCell(-1).innerText = s.chapter;
            newRow.insertCell(-1).innerHTML = "<input class=\"stickerSelect\" type=checkbox id=" + s.sticker_id + ">"

            var checkbox = document.getElementById(s.sticker_id)
            checkbox.classList.add(tag);

            checkbox.addEventListener("change", () => {
                if (checkbox.checked == false){
        document.getElementById(tag + "Master").checked = false}})
    })
    console.log('built table ' + tag)
}