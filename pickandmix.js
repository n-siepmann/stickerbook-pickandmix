//var library = JSON.parse(document.getElementById('libJSON').innerHTML)
import library from './export.json' assert {type: 'json'}
window.addEventListener('load', populate);
document.getElementById('submitButton').addEventListener("click",() => {generate()})
var scSelect = document.getElementById('7be585f7-f51b-41b7-80ac-a37d0763e26c,b6c4b676-7d93-4c17-b26e-0ca94d4a1d85,6f93a3a0-9739-4c20-92e3-ed53bc7e54ff,fa03ff53-1f5f-4e48-9f4d-663c67ce69c8,667421ff-2156-4305-9e75-e948de51cf34,9dfb07a1-6645-4b22-898f-4c7a3f3a2d97,80ccc9e7-f12f-43d6-83dd-5b4e8a0fbf7a,467e59a3-b1bd-470c-801b-8114c1671dc8,797ec3cc-423f-4697-8503-3a8d2902fced,cabb5354-ef67-492f-8709-86f84c7b3d4f,54ce1807-46d8-4666-b148-188e592d0d87,35cfcc09-7c0d-46a3-847f-efd859ef77bc,a928186c-c186-4ae2-b79d-dd3604eb9001');
var scSection = document.getElementById('libraryArea_SC');
scSection.style.display = 'none';
scSelect.addEventListener("click", () => {
    if (scSelect.checked == true){
        scSection.style.display = 'none';
        Array.from(scSection.getElementsByTagName("input")).forEach((s) => s.checked = true)
    } else {
        scSection.style.display = 'block';
    }
})

function populate(){

    var scLibrary = [[],[],[],[],[]]
    var achLibrary = []
    var placeholderLibrary = []
    var mainLibrary = []

    library.forEach(s => {
        switch (true){
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
                achLibrary.push(s);}
                break;
            case s.tags.includes("SB Placeholder"):
                placeholderLibrary.push(s);
                break;
            default:
                mainLibrary.push(s);
                break;
            }});

            scLibrary.forEach(s => s.sort((a, b) => a.sticker_name.localeCompare(b.sticker_name)));
            //scLibrary = scLibrary.flat();
            mainLibrary.sort((a, b) => a.sticker_name.localeCompare(b.sticker_name)).sort((a, b) => a.chapter.localeCompare(b.chapter));
            placeholderLibrary.sort((a, b) => a.sticker_name.localeCompare(b.sticker_name)).sort((a, b) => a.chapter.localeCompare(b.chapter));
            achLibrary.sort((a, b) => a.sticker_name.localeCompare(b.sticker_name));


    const libraryArea = document.getElementById("libraryArea_Main")
    const libraryAreaSC = document.getElementById("libraryArea_SC")


    const sc_keytopics = libraryAreaSC.appendChild(document.createElement("TABLE"));
    buildTable(sc_keytopics, scLibrary[0], "SC_Pack_Key", "Key Topics", "There's a lot of information to get your head around in the world of sustainability. Here's your crash course");
    const sc_greenskills = libraryAreaSC.appendChild(document.createElement("TABLE"));
    buildTable(sc_greenskills, scLibrary[1], "SC_Pack_Green", "Green Skills 101",'This pack provides a quick rundown of  core concepts in sustainability practice and legislation');
    const sc_applying = libraryAreaSC.appendChild(document.createElement("TABLE"));
    buildTable(sc_applying, scLibrary[2], "SC_Pack_Applying", "Applying Sustainability","Scientific and professional knowledge are both vital to creating sustainable change - but so are interpersonal skills");
    const sc_personal = libraryAreaSC.appendChild(document.createElement("TABLE"));
    buildTable(sc_personal, scLibrary[3], "SC_Pack_Personal", "Personal Actions","Big changes start with individual action. This is your springboard to acting and living more sustainably today");

    const mainTable = libraryArea.appendChild(document.createElement("TABLE"));
    buildTable(mainTable, mainLibrary, "main", "Our content", "Alongside our CPD offering, we have a range of content covering some more specialised topics");

    const placeholderTable = libraryArea.appendChild(document.createElement("TABLE"));
    buildTable(placeholderTable, placeholderLibrary, "placeholder", "Coming soon", "Register your interest now and we will add these stickers to your library upon their release");

    const achTable = libraryArea.appendChild(document.createElement("TABLE"));
    buildTable(achTable, achLibrary, "achievement", "Achievements", "The gamified framework that makes Stickerbook tick");
    Array.from(achTable.getElementsByTagName("input")).forEach((s) => s.disabled = true)
    }

function generate(){
    var checkboxes = document.getElementsByClassName("stickerSelect");
    var selected = [];
    Array.from(checkboxes).forEach((s) => { if (s.checked == true ){
        selected.push(s.id)}
    })
    document.getElementById("output").innerHTML = ''
    var libCodes = document.getElementById("output").appendChild(document.createElement("TEXTAREA"))
    libCodes.value = selected.toString().replaceAll(',','\n')
    libCodes.style.width = (libCodes.scrollWidth * 2) + "px"
    libCodes.style.height = libCodes.scrollHeight + "px"
    libCodes.scrollIntoView(false);
}

function buildTable(table, library, tag, label, subtitle){
    table.id = tag;
    table.classList.add('libraryTable');
    table.innerHTML = "<tr><td colspan=2><h2>" + label + "</h2>" + subtitle + "</td><td>Chapter</td><td><input type=checkbox id=\""+ tag + "Master\" class=\"stickerMasterSelect\" checked></td></tr>";
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
            newRow.insertCell(-1).innerHTML = "<input class=\"stickerSelect\" type=checkbox id=" + s.sticker_id + " checked>"

            var checkbox = document.getElementById(s.sticker_id)
            checkbox.classList.add(tag);

            checkbox.addEventListener("change", () => {
                if (checkbox.checked == false){
        document.getElementById(tag + "Master").checked = false}})
    })
}