(function () {
  const POPUP_ID = "tem-dado-extension-popup";
  const HEADER_ID = "tem-dado-extension-popup-header";
  const PIN_ID = "tem-dado-extension-pin-button";
  const CLOSE_ID = "tem-dado-extension-close-button";
  const PIN_ICON = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 17v5" />
      <path d="M6 3h12" />
      <path d="m8 3 1.5 7-3 3h11l-3-3L16 3" />
    </svg>
  `;
  const UNPIN_ICON = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m2 2 20 20" />
      <path d="M12 17v5" />
      <path d="M6 3h12" />
      <path d="m8 3 1.5 7-3 3h11l-3-3L16 3" />
    </svg>
  `;
  const CLOSE_ICON = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `;

  const existing = document.getElementById(POPUP_ID);
  if (existing) {
    existing.remove();
    return;
  }

  const popupUrl = chrome.runtime.getURL("index.html");

  const styles = `
    #${POPUP_ID} {
      position: fixed;
      top: 60px;
      right: 20px;
      width: 420px;
      height: 596px;
      border-radius: 1.5rem;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: #050505;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      z-index: 2147483647;
      animation: tem-dado-scale-in 0.2s ease;
    }
    #${HEADER_ID} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      height: 36px;
      padding: 0 8px 0 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(14, 14, 14, 0.98);
      user-select: none;
      cursor: default;
    }
    #${HEADER_ID}[data-draggable="true"] {
      cursor: grab;
    }
    #${HEADER_ID}[data-dragging="true"] {
      cursor: grabbing;
    }
    #${HEADER_ID} .tem-dado-title {
      color: rgba(255, 255, 255, 0.85);
      font: 600 12px/1 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }
    #${HEADER_ID} .tem-dado-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    #${HEADER_ID} button {
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      transition: background 0.2s ease;
    }
    #${HEADER_ID} button:hover {
      background: rgba(255, 255, 255, 0.14);
    }
    #${POPUP_ID} iframe {
      width: 100%;
      height: calc(100% - 36px);
      border: none;
      display: block;
    }
    @keyframes tem-dado-scale-in {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  const container = document.createElement("div");
  container.id = POPUP_ID;

  const header = document.createElement("div");
  header.id = HEADER_ID;

  const title = document.createElement("span");
  title.className = "tem-dado-title";
  title.textContent = "Você tem dado?";

  const actions = document.createElement("div");
  actions.className = "tem-dado-actions";

  const pinButton = document.createElement("button");
  pinButton.id = PIN_ID;
  pinButton.type = "button";

  const closeButton = document.createElement("button");
  closeButton.id = CLOSE_ID;
  closeButton.type = "button";
  closeButton.innerHTML = CLOSE_ICON;

  const iframe = document.createElement("iframe");
  iframe.src = popupUrl;
  iframe.setAttribute("allow", "clipboard-read; clipboard-write");
  actions.appendChild(pinButton);
  actions.appendChild(closeButton);
  header.appendChild(title);
  header.appendChild(actions);
  container.appendChild(header);
  container.appendChild(iframe);

  const styleEl = document.createElement("style");
  styleEl.textContent = styles;

  let pinned = true;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  function syncPinState() {
    pinButton.innerHTML = pinned ? UNPIN_ICON : PIN_ICON;
    pinButton.title = pinned ? "Desfixar painel" : "Fixar painel";
    header.setAttribute("data-draggable", pinned ? "false" : "true");
  }

  function close() {
    container.style.opacity = "0";
    container.style.transform = "scale(0.95)";
    setTimeout(() => {
      container.remove();
      styleEl.remove();
    }, 200);
  }

  function startDrag(event) {
    if (pinned) return;
    if (event.target === pinButton || event.target === closeButton) return;
    dragging = true;
    header.setAttribute("data-dragging", "true");
    const rect = container.getBoundingClientRect();
    startX = event.clientX;
    startY = event.clientY;
    startLeft = rect.left;
    startTop = rect.top;
    container.style.left = `${rect.left}px`;
    container.style.top = `${rect.top}px`;
    container.style.right = "auto";
    event.preventDefault();
  }

  function onDrag(event) {
    if (!dragging) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const nextLeft = Math.min(Math.max(startLeft + dx, 0), window.innerWidth - container.offsetWidth);
    const nextTop = Math.min(Math.max(startTop + dy, 0), window.innerHeight - container.offsetHeight);
    container.style.left = `${nextLeft}px`;
    container.style.top = `${nextTop}px`;
  }

  function stopDrag() {
    if (!dragging) return;
    dragging = false;
    header.setAttribute("data-dragging", "false");
  }

  pinButton.addEventListener("click", () => {
    pinned = !pinned;
    if (pinned) {
      container.style.top = "60px";
      container.style.right = "20px";
      container.style.left = "auto";
    }
    syncPinState();
  });

  closeButton.addEventListener("click", close);
  header.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);

  window.addEventListener("message", (event) => {
    if (event.source !== iframe.contentWindow) return;
    if (event.data?.type === "TEM_DADO_CLOSE_POPUP") {
      close();
    }
  });

  syncPinState();
  document.head.appendChild(styleEl);
  document.body.appendChild(container);
})();
