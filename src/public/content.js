(function () {
  const POPUP_ID = "tem-dado-extension-popup";
  const BACKDROP_ID = "tem-dado-extension-backdrop";

  const existing = document.getElementById(POPUP_ID);
  if (existing) {
    existing.remove();
    document.getElementById(BACKDROP_ID)?.remove();
    return;
  }

  const popupUrl = chrome.runtime.getURL("popup.html");

  const styles = `
    #${BACKDROP_ID} {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 2147483646;
      animation: tem-dado-fade-in 0.2s ease;
    }
    #${POPUP_ID} {
      position: fixed;
      top: 60px;
      right: 20px;
      width: 420px;
      height: 560px;
      border-radius: 1.5rem;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      z-index: 2147483647;
      animation: tem-dado-scale-in 0.2s ease;
    }
    #${POPUP_ID} iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }
    @keyframes tem-dado-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes tem-dado-scale-in {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  const backdrop = document.createElement("div");
  backdrop.id = BACKDROP_ID;

  const container = document.createElement("div");
  container.id = POPUP_ID;
  const iframe = document.createElement("iframe");
  iframe.src = popupUrl;
  container.appendChild(iframe);

  const styleEl = document.createElement("style");
  styleEl.textContent = styles;

  function close() {
    backdrop.style.opacity = "0";
    container.style.opacity = "0";
    container.style.transform = "scale(0.95)";
    setTimeout(() => {
      backdrop.remove();
      container.remove();
      styleEl.remove();
    }, 200);
  }

  backdrop.addEventListener("click", close);

  document.head.appendChild(styleEl);
  document.body.appendChild(backdrop);
  document.body.appendChild(container);
})();
