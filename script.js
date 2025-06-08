const typingContainer = document.getElementById("typing");
const subtitle = document.getElementById("subtitle");
const mainContent = document.getElementById("main-content");

const defaultTitle = "Tisza Coin";
const defaultSubtitle = "kripto a népnek nem a NERnek";

const content = {
  about: `
    <h2>Mi az a Tisza Coin?</h2>
    <p>Magyar mém, magyar düh, magyar kriptó. Ahol a politika véget ér, ott kezdődik a Tisza Coin. Nem bal. Nem jobb. Csak coin.</p>
  `,
  tokenomics: `
    <h2>Miért pont ez?</h2>
    <p>Unod a forintot, félsz az inflációtól? A Tisza Coin legalább őszintén nem ér semmit – és közben még röhögni is lehet.</p>
  `,
  roadmap: `
    <p><strong>Phase 1:</strong> Orbán mémek és Telegram spam.<br>
    <strong>Phase 2:</strong> 1000 tag – Petíció a forint ellen.<br>
    <strong>Phase 3:</strong> Listázás DEX-en, airdrop a legjobb poénért.<br>
    <strong>Phase 4:</strong> A NAV bekopog. Mi elbújunk a Tiszánál.</p>
  `,
  community: `
    <h2>Ez nem csak coin – ez egy üzenet</h2>
    <p>Nem kérünk többet hazugságokat! Itt a kriptó, amit a nép épít, a poén tart fent, és a magyar valóság ihletett.</p>
    <h2">Forint lecserélése?</h2>
    <p>A forint már múlt. A Tisza Coin lehet a jövő – legalább a mémekben. Képzeld el: boltban fizetsz egy kenyeret 50.000 TISZA-val. Mindenki nevet. Még az eladó is.</p>
  `
};

function typeHtmlContent(container, htmlContent, speed = 20) {
container.innerHTML = '';
const tempDiv = document.createElement('div');
tempDiv.innerHTML = htmlContent;

function typeNode(node, parent, callback) {
if (node.nodeType === Node.TEXT_NODE) {
  const text = node.textContent;
  let i = 0;
  const span = document.createElement('span');
  parent.appendChild(span);

  function typeChar() {
    span.textContent += text.charAt(i);
    i++;
    if (i < text.length) {
      setTimeout(typeChar, speed);
    } else {
      callback();
    }
  }
  typeChar();
} else if (node.nodeType === Node.ELEMENT_NODE) {
  const el = document.createElement(node.tagName);
  for (const attr of node.attributes) {
    el.setAttribute(attr.name, attr.value);
  }
  parent.appendChild(el);

  const children = Array.from(node.childNodes);
  let idx = 0;

  function typeNextChild() {
    if (idx < children.length) {
      typeNode(children[idx], el, () => {
        idx++;
        typeNextChild();
      });
    } else {
      callback();
    }
  }

  typeNextChild();
} else {
  callback();
}
}

const nodes = Array.from(tempDiv.childNodes);
let index = 0;

function typeNext() {
if (index < nodes.length) {
  typeNode(nodes[index], container, () => {
    index++;
    typeNext();
  });
}
}

typeNext();
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const section = link.getAttribute("href").substring(1);

    if (content[section]) {
      mainContent.innerHTML = '<div id="inner-content"></div>';
      const inner = document.getElementById("inner-content");
      typeHtmlContent(inner, content[section]);
    } else {
      mainContent.innerHTML = `
        <div class="typing-container" id="typing"></div>
        <div id="subtitle"></div>
      `;
      restartTypingAnimation();
    }
  });
});

function restartTypingAnimation() {
  const typingEl = document.getElementById("typing");
  const subtitleEl = document.getElementById("subtitle");
  let i = 0;
  let j = 0;

  function typeTitle() {
    typingEl.textContent = defaultTitle.substring(0, i);
    if (i < defaultTitle.length) {
      i++;
      setTimeout(typeTitle, 120);
    } else {
      typeSubtitle();
    }
  }

  function typeSubtitle() {
    subtitleEl.textContent = defaultSubtitle.substring(0, j);
    if (j < defaultSubtitle.length) {
      j++;
      setTimeout(typeSubtitle, 50);
    }
  }

  typeTitle();
}

restartTypingAnimation();
const topbar = document.querySelector('.topbar');

// Detect if device has a fine pointer (mouse, trackpad)
const hasCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (hasCursor) {
document.addEventListener('mousemove', (e) => {
  const { innerWidth: w, innerHeight: h } = window;
  const x = e.clientX / w; // 0 to 1
  const y = e.clientY / h;

  // Background shift range: ±15%
  const offsetX = 50 + (x - 0.5) * 30; // 35% to 65%
  const offsetY = 50 + (y - 0.5) * 30;

  topbar.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
});

document.addEventListener('mouseleave', () => {
  topbar.style.backgroundPosition = '50% 50%';
});
}

