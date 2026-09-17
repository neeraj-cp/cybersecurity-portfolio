const noteCards = document.querySelectorAll(".noteCard");
const notesDisplay = document.querySelector(".notesDisplay");
const notesGrid = document.querySelector(".notesGrid");
const notesTitle = document.querySelector(".notesDisplayTitle");
const viewMoreButton = document.querySelector(".viewMoreButton");

const notesData = {

    linux: [
        {
            title: "Linux",
            description: "Linux fundamentals, structure, and security concepts.",
            file: "notes/linux/Linux.pdf"
        },
        {
            title: "Linux Commands",
            description: "Common Linux commands and practical usage.",
            file: "notes/linux/Linux_Commands.pdf"
        },
        {
            title: "Linux File Permissions & Security",
            description: "File permissions, ownership, and basic Linux security.",
            file: "notes/linux/Linux_File_Permissions_and_Security.pdf"
        },
        {
            title: "Linux Filesystem Hierarchy",
            description: "Understanding the Linux filesystem structure.",
            file: "notes/linux/Linux_Filesystem_Hierarchy.pdf"
        }
    ],

    networking: [
        {
            title: "Networking",
            description: "Networking fundamentals and essential concepts.",
            file: "notes/networking/Networking.pdf"
        },
        {
            title: "Network Devices & Security",
            description: "Network devices and their security perspectives.",
            file: "notes/networking/Network_Devices_and_Security.pdf"
        },
        {
            title: "OSI Model",
            description: "The seven-layer OSI model and its security relevance.",
            file: "notes/networking/OSI_Model.pdf"
        },
        {
            title: "TCP/IP Model",
            description: "Understanding the TCP/IP networking model.",
            file: "notes/networking/TCP_IP_Model.pdf"
        },
        {
            title: "TCP & UDP",
            description: "Transport-layer protocols and their differences.",
            file: "notes/networking/TCP_UDP.pdf"
        },
        {
            title: "MAC Address, ARP & Spoofing",
            description: "MAC addressing, ARP, and ARP spoofing concepts.",
            file: "notes/networking/MAC_Address_ARP_and_Spoofing.pdf"
        },
        {
            title: "IPv4 & IPv6 Address",
            description: "IPv4 and IPv6 addressing fundamentals.",
            file: "notes/networking/IPv4_and_IPv6_Address.pdf"
        }
    ],

    webSecurity: [],

    ethicalHacking: [],

    cybersecurity: [
        {
            title: "Cybersecurity Fundamentals",
            description: "Core cybersecurity concepts and security principles.",
            file: "notes/cybersecurity/Cybersecurity_Fundamentals.pdf"
        },
        {
            title: "Cybersecurity Teams",
            description: "Different cybersecurity teams and their responsibilities.",
            file: "notes/cybersecurity/Cybersecurity_Teams.pdf"
        },
        {
            title: "Malware",
            description: "Malware types, characteristics, and security concepts.",
            file: "notes/cybersecurity/Malware.pdf"
        },
        {
            title: "Threat, Vulnerability, Risk, Exploit & Payload",
            description: "Understanding important cybersecurity terminology.",
            file: "notes/cybersecurity/Threat_Vulnerability_Risk_Exploit_Payload.pdf"
        },
        {
            title: "Operating System Fundamentals",
            description: "Operating system fundamentals for cybersecurity.",
            file: "notes/cybersecurity/Operating_System_Fundamentals.pdf"
        },
        {
            title: "OS Components & Functions",
            description: "Core operating system components and their functions.",
            file: "notes/cybersecurity/OS_Components_and_Functions.pdf"
        },
        {
            title: "OS Goals & Selection",
            description: "Operating system goals and selection considerations.",
            file: "notes/cybersecurity/OS_Goals_and_Selection.pdf"
        },
        {
            title: "Types of Operating Systems",
            description: "Different types of operating systems.",
            file: "notes/cybersecurity/Types_of_Operating_Systems.pdf"
        },
        {
            title: "Operating System Security",
            description: "Security mechanisms, threats, and protection techniques.",
            file: "notes/cybersecurity/Operating_System_Security.pdf"
        }
    ],

    cloudSecurity: [],

    tools: [
        {
            title: "Nmap",
            description: "Network discovery, port scanning, and security assessment.",
            file: "notes/tools/Nmap.pdf"
        },
        {
            title: "Wireshark",
            description: "Network packet capture and traffic analysis.",
            file: "notes/tools/Wireshark.pdf"
        },
        {
            title: "Metasploit",
            description: "Security testing and exploitation framework fundamentals.",
            file: "notes/tools/Metasploit.pdf"
        },
        {
            title: "Aircrack-ng",
            description: "Wireless network security testing toolkit.",
            file: "notes/tools/Aircrack-ng.pdf"
        },
        {
            title: "VirtualBox",
            description: "Virtualization and cybersecurity lab setup.",
            file: "notes/tools/VirtualBox.pdf"
        }
    ]
};

const notesPerLoad = 10;

let selectedCategory = "";
let visibleNotes = notesPerLoad;


function displayNotes(category) {

    selectedCategory = category;
    visibleNotes = notesPerLoad;

    const notes = notesData[category] || [];

    notesGrid.innerHTML = "";

    if (notes.length === 0) {

        notesDisplay.classList.remove("hidden");

        notesTitle.textContent = getCategoryName(category);

        notesGrid.innerHTML = `
            <p class="notesEmpty">
                Notes coming soon.
            </p>
        `;

        viewMoreButton.classList.add("hidden");

        return;
    }

    notesDisplay.classList.remove("hidden");

    notesTitle.textContent = getCategoryName(category);

    renderNotes(notes);
}


function renderNotes(notes) {

    notesGrid.innerHTML = "";

    const notesToDisplay = notes.slice(0, visibleNotes);

    notesToDisplay.forEach((note) => {

        const noteItem = document.createElement("article");

        noteItem.className = "pdfNote";

        noteItem.innerHTML = `
            <div class="pdfNoteContent">
                <h3>${note.title}</h3>
                <p>${note.description}</p>
            </div>

            <a
                href="${note.file}"
                class="pdfNoteLink"
                target="_blank"
                rel="noopener noreferrer"
            >
                Open ↗
            </a>
        `;

        notesGrid.appendChild(noteItem);
    });

    if (visibleNotes < notes.length) {
        viewMoreButton.classList.remove("hidden");
    } else {
        viewMoreButton.classList.add("hidden");
    }
}


function getCategoryName(category) {

    const categoryNames = {
        linux: "Linux",
        networking: "Networking",
        webSecurity: "Web Security",
        ethicalHacking: "Ethical Hacking",
        cybersecurity: "Cybersecurity",
        cloudSecurity: "Cloud Security",
        tools: "Tools"
    };

    return categoryNames[category] || "Notes";
}


noteCards.forEach((card) => {

    card.addEventListener("click", () => {

        noteCards.forEach((card) => {
            card.classList.remove("active");
        });

        card.classList.add("active");

        const category = card.dataset.category;

        displayNotes(category);

	notesDisplay.scrollIntoView({
    	behavior: "smooth"
});
    });
});


viewMoreButton.addEventListener("click", () => {

    visibleNotes += notesPerLoad;

    renderNotes(notesData[selectedCategory]);
});